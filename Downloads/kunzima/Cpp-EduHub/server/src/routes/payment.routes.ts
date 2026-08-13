/**
 * Infinity Code - Payment & Subscription Routes
 * Handles premium subscriptions via PayFast
 * Premium price: R29.99/month
 */

import { Router, Request, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import crypto from 'crypto';
import { db } from '../db/index.js';
import { subscriptions, payments, users } from '../db/schema/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { env } from '../config/env.js';

const router = Router();

// PayFast configuration from environment variables
// These can be updated in .env without rebuilding the application
const PAYFAST_MERCHANT_ID = env.PAYFAST_MERCHANT_ID || '';
const PAYFAST_MERCHANT_KEY = env.PAYFAST_MERCHANT_KEY || '';
const PAYFAST_SANDBOX = env.PAYFAST_SANDBOX === 'true';
const PAYFAST_PASSPHRASE = env.PAYFAST_PASSPHRASE || '';
const PREMIUM_PRICE = 29.99;
const CURRENCY = 'ZAR';

const PAYFAST_URL = PAYFAST_SANDBOX
  ? 'https://sandbox.payfast.co.za/eng/process'
  : 'https://www.payfast.co.za/eng/process';

// Webhook route should NOT require JWT auth - it uses PayFast signature verification
// So we register it before the authenticate middleware
router.post('/webhook', (req: Request, res: Response) => {
  try {
    // Verify PayFast signature
    const { signature, ...params } = req.body;

    // Build the signature string from parameters
    const paramStr = Object.keys(params)
      .sort()
      .map((key) => `${key}=${encodeURIComponent(params[key].toString().trim())}`)
      .join('&');

    const signatureString = PAYFAST_PASSPHRASE
      ? `${paramStr}&passphrase=${encodeURIComponent(PAYFAST_PASSPHRASE)}`
      : paramStr;

    const computedSignature = crypto
      .createHash('md5')
      .update(signatureString)
      .digest('hex');

    // Verify signature
    if (signature !== computedSignature) {
      console.error('PayFast webhook: Invalid signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Check payment status
    const paymentStatus = params.payment_status;
    const paymentId = params.pf_payment_id;
    const mPaymentId = params.m_payment_id;
    const amountGross = parseFloat(params.amount_gross);

    if (paymentStatus === 'COMPLETE') {
      // Payment successful - update user subscription
      // Extract user ID from m_payment_id (format: IC-<userId8>-<timestamp>)
      const parts = mPaymentId.split('-');
      if (parts.length >= 2) {
        // Find user by payment reference and update subscription
        // In production, use a service role key for this operation
        console.log(`PayFast payment complete: ${paymentId}, ref: ${mPaymentId}, amount: ${amountGross}`);

        // Record the payment and update subscription status
        // This would be done with service role key in production
      }

      return res.status(200).json({ received: true, status: 'complete' });
    } else if (paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED') {
      // Payment failed or cancelled - do NOT upgrade the account
      console.log(`PayFast payment ${paymentStatus}: ${paymentId}, ref: ${mPaymentId}`);
      return res.status(200).json({ received: true, status: paymentStatus.toLowerCase() });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('PayFast webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// All other payment routes require authentication
router.use(authenticate);

/**
 * GET /api/payments/plans
 * Get available subscription plans
 */
router.get('/plans', (_req: Request, res: Response) => {
  res.json({
    plans: [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        currency: CURRENCY,
        interval: 'month',
        features: [
          'Access to free courses',
          'Community access',
          'Basic AI assistant (5 queries/day)',
          'Progress tracking',
        ],
      },
      {
        id: 'premium-monthly',
        name: 'Premium Monthly',
        price: PREMIUM_PRICE,
        currency: CURRENCY,
        interval: 'month',
        features: [
          'Unlimited access to all premium courses',
          'Unlimited AI coding assistant',
          'Digital certificates of completion',
          'Downloadable resources & PDFs',
          'Advanced coding challenges & projects',
          'Premium learning paths',
          'Priority support',
        ],
      },
    ],
  });
});

/**
 * GET /api/payments/subscription
 * Get current user's subscription
 */
router.get('/subscription', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    const subscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userId),
    });

    res.json({
      status: user?.subscriptionStatus || 'free',
      subscription,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/payments/checkout
 * Create a PayFast checkout redirect
 */
router.post('/checkout', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { planId } = z.object({
      planId: z.string(),
    }).parse(req.body);

    if (planId !== 'premium-monthly') {
      throw new AppError('Invalid plan selected', 400);
    }

    // Generate unique payment reference
    const paymentRef = `IC-${userId.slice(0, 8)}-${Date.now()}`;

    // Build PayFast parameters
    const payfastParams: Record<string, string> = {
      merchant_id: PAYFAST_MERCHANT_ID,
      merchant_key: PAYFAST_MERCHANT_KEY,
      return_url: `${env.FRONTEND_URL}/subscription?status=success`,
      cancel_url: `${env.FRONTEND_URL}/subscription?status=cancelled`,
      notify_url: `${env.FRONTEND_URL}/api/payments/webhook`,
      m_payment_id: paymentRef,
      amount: PREMIUM_PRICE.toFixed(2),
      item_name: 'Infinity Code Premium Monthly',
      item_description: 'Unlimited access to all premium courses and features',
      custom_str1: userId,
      custom_str2: planId,
    };

    // Generate signature
    const paramStr = Object.keys(payfastParams)
      .sort()
      .map((key) => `${key}=${encodeURIComponent(payfastParams[key].toString().trim())}`)
      .join('&');

    const signatureString = PAYFAST_PASSPHRASE
      ? `${paramStr}&passphrase=${encodeURIComponent(PAYFAST_PASSPHRASE)}`
      : paramStr;

    const signature = crypto
      .createHash('md5')
      .update(signatureString)
      .digest('hex');

    payfastParams.signature = signature;

    // Create pending payment record
    await db.insert(payments).values({
      userId,
      amount: PREMIUM_PRICE.toFixed(2),
      currency: CURRENCY,
      status: 'pending',
      type: 'subscription',
      description: 'Infinity Code Premium Monthly Subscription',
      metadata: { transaction_ref: paymentRef, provider: 'payfast', planId },
    });

    res.json({
      checkoutUrl: `${PAYFAST_URL}?${new URLSearchParams(payfastParams).toString()}`,
      paymentRef,
      planId,
      amount: PREMIUM_PRICE,
      currency: CURRENCY,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
});

/**
 * POST /api/payments/cancel
 * Cancel subscription
 */
router.post('/cancel', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    // Update subscription status to free
    await db.update(users)
      .set({ subscriptionStatus: 'free', updatedAt: new Date() })
      .where(eq(users.id, userId));

    // Cancel active subscription
    const activeSub = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userId),
    });

    if (activeSub) {
      await db.update(subscriptions)
        .set({ status: 'canceled', canceledAt: new Date() })
        .where(eq(subscriptions.id, activeSub.id));
    }

    res.json({ message: 'Subscription canceled successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/payments/history
 * Get payment history for the authenticated user
 */
router.get('/history', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const userPayments = await db.query.payments.findMany({
      where: eq(payments.userId, userId),
    });

    res.json(userPayments);
  } catch (error) {
    next(error);
  }
});

export default router;