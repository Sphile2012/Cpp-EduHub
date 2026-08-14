# Cpp-EduHub Deployment Guide

This guide covers deploying both the frontend and backend of the Infinity Code platform.

## Quick Summary

✅ **Build Status**: Both frontend and backend build successfully  
✅ **Configuration**: Environment variables properly configured  
✅ **Security**: .gitignore excludes sensitive files  
✅ **Netlify**: Frontend deployment configuration ready  

## Frontend Deployment (Netlify)

The frontend is configured for deployment to Netlify via `netlify.toml`.

### Automatic Deployment

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect the `netlify.toml` configuration
3. Set the following environment variables in Netlify:
   - `VITE_API_URL` - Your production API URL (e.g., `https://api.yourdomain.com`)
   - `VITE_SUPABASE_URL` - (Optional) Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - (Optional) Your Supabase anon key

### Manual Deployment

```bash
# Build the frontend
npm run build:client

# Deploy to Netlify (requires Netlify CLI)
netlify deploy --prod
```

### Build Output
- **Publish Directory**: `artifacts/cpp-learn/dist`
- **Build Command**: `npm run build:client`
- **SPA Routing**: Configured with redirects

## Backend Deployment

The backend can be deployed to any Node.js hosting platform (Heroku, Railway, Render, DigitalOcean, etc.).

### 1. Prepare Production Environment

Update `server/.env` for production:

```env
NODE_ENV=production
PORT=5000  # or use $PORT environment variable

# Use a strong, random JWT secret
JWT_SECRET=your-production-jwt-secret-here

# Database URL (production PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/infinity_code

# CORS - update to your production frontend URL
CORS_ORIGIN=https://your-frontend-domain.com

# Frontend URL for redirects
FRONTEND_URL=https://your-frontend-domain.com

# PayFast production settings
PAYFAST_SANDBOX=false
PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_MERCHANT_KEY=your_merchant_key
```

### 2. Database Setup

```bash
# Install PostgreSQL (if not already installed)
# Create database
createdb infinity_code

# Run migrations
npm run db:push

# (Optional) Seed sample data
npm run seed
```

### 3. Deploy Options

#### Option A: Railway.app
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Option B: Render.com
```bash
# Install Render CLI
npm i -g render-cli

# Deploy
render deploy
```

#### Option C: Heroku
```bash
# Install Heroku CLI
npm i -g heroku

# Create and deploy
heroku create infinity-code-api
git push heroku main
heroku addons:create heroku-postgresql:mini
```

#### Option D: DigitalOcean App Platform
1. Connect your GitHub repository
2. Configure build command: `npm run build:server`
3. Set run command: `npm run start:server`
4. Add PostgreSQL database
5. Configure environment variables

### 4. Environment Variables (Production)

Set these in your hosting platform's environment:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://...` |
| `JWT_SECRET` | JWT signing secret | Random 32+ char string |
| `CORS_ORIGIN` | Allowed origins | `https://yourdomain.com` |
| `PAYFAST_MERCHANT_ID` | PayFast merchant ID | Your ID |
| `PAYFAST_MERCHANT_KEY` | PayFast merchant key | Your key |

## Full-Stack Deployment Checklist

- [ ] Frontend builds successfully (`npm run build:client`)
- [ ] Backend builds successfully (`npm run build:server`)
- [ ] Environment variables configured for production
- [ ] PostgreSQL database set up and migrated
- [ ] CORS origins updated to production URLs
- [ ] JWT_SECRET changed to a strong random value
- [ ] PayFast credentials configured (if using payments)
- [ ] Frontend deployed to Netlify (or similar)
- [ ] Backend deployed to hosting platform
- [ ] API health check accessible (`/api/health`)
- [ ] Frontend can communicate with backend API
- [ ] SSL certificates configured (HTTPS)

## Testing Production Build Locally

```bash
# Build both frontend and backend
npm run build

# Test frontend production build
npm run start:client

# Test backend production build
npm run start:server
```

## Troubleshooting

### Frontend Issues
- **Build fails**: Check Node.js version (requires 18+)
- **API calls fail**: Verify `VITE_API_URL` is correct
- **Routing issues**: Ensure Netlify redirects are configured

### Backend Issues
- **Database connection fails**: Verify `DATABASE_URL` format
- **CORS errors**: Update `CORS_ORIGIN` to include frontend URL
- **Port in use**: Change `PORT` environment variable

## Support

For issues or questions:
1. Check the main README.md
2. Review environment variable examples in `.env.example` files
3. Check server logs for error messages
4. Verify all dependencies are installed: `npm run install:all`