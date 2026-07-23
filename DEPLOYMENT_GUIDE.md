# 🚀 Deployment Guide - Master C++ with uPhumeh

## Production Deployment Instructions

This guide explains how to deploy your C++ learning platform to production so users worldwide can access and install it.

---

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Backend API running without errors
- [ ] Frontend building successfully
- [ ] PWA icons generated
- [ ] Domain name acquired (optional but recommended)
- [ ] SSL certificate ready (automatic with most platforms)

---

## 🏗️ Build for Production

### 1. Build the Frontend

```bash
cd artifacts/cpp-learn
$env:PORT='3000'; $env:BASE_PATH='/'; pnpm build
```

This creates optimized files in `artifacts/cpp-learn/dist/public/`

### 2. Build the Backend (if needed)

```bash
cd artifacts/api-server
pnpm build
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended for Frontend)

**Best for:** Fast, free hosting with automatic HTTPS

1. **Install Vercel CLI:**
   ```bash
   pnpm add -g vercel
   ```

2. **Deploy Frontend:**
   ```bash
   cd artifacts/cpp-learn
   vercel
   ```

3. **Follow prompts:**
   - Link to your Vercel account
   - Set project name: `cpp-eduhub`
   - Choose settings (usually auto-detected)

4. **Set Environment Variables:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add: `PORT=3000`, `BASE_PATH=/`
   - Add: `VITE_API_URL=https://your-api-url.com`

5. **Deploy:**
   ```bash
   vercel --prod
   ```

**Your app will be live at:** `https://cpp-eduhub.vercel.app`

---

### Option 2: Netlify (Alternative Frontend)

**Best for:** Simple drag-and-drop deployment

1. **Build the app:**
   ```bash
   cd artifacts/cpp-learn
   pnpm build
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist/public` folder to Netlify
   - Or connect your GitHub repository for auto-deployment

3. **Configure:**
   - Build command: `pnpm build`
   - Publish directory: `dist/public`
   - Environment variables: `PORT=3000`, `BASE_PATH=/`

---

### Option 3: Railway/Render (Full Stack)

**Best for:** Deploying both frontend and backend together

#### Railway:
1. Go to [railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select your repository
4. Railway auto-detects and deploys both services
5. Set environment variables in Railway dashboard

#### Render:
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect repository
4. Configure:
   - **Frontend:** Static Site, build: `pnpm build`, publish: `dist/public`
   - **Backend:** Web Service, build: `pnpm install`, start: `pnpm start`

---

### Option 4: Traditional VPS (DigitalOcean, AWS, etc.)

**Best for:** Full control and custom setup

1. **Set up server:**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js and pnpm:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pnpm
   ```

3. **Clone repository:**
   ```bash
   git clone https://github.com/yourusername/Cpp-EduHub.git
   cd Cpp-EduHub
   pnpm install
   ```

4. **Build applications:**
   ```bash
   cd artifacts/cpp-learn
   pnpm build
   cd ../api-server
   pnpm build
   ```

5. **Set up Nginx as reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           root /path/to/cpp-learn/dist/public;
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Set up SSL with Let's Encrypt:**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

7. **Set up PM2 for process management:**
   ```bash
   npm install -g pm2
   cd artifacts/api-server
   pm2 start dist/index.js --name cpp-api
   pm2 startup
   pm2 save
   ```

---

## 🔒 Security Checklist

Before going live:

- [ ] Environment variables are set correctly
- [ ] API keys are not in source code
- [ ] HTTPS is enabled (required for PWA)
- [ ] CORS is configured properly
- [ ] Rate limiting is implemented on API
- [ ] Database credentials are secure
- [ ] Error messages don't leak sensitive info

---

## 🎨 PWA Configuration for Production

### Update Service Worker (if needed):

In `vite.config.ts`, ensure:
```typescript
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/your-api-domain\.com\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 // 24 hours
          }
        }
      }
    ]
  }
})
```

---

## 📱 Testing PWA After Deployment

1. **Lighthouse Audit:**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit for PWA
   - Ensure score is 90+

2. **Test Installation:**
   - Visit your deployed URL on desktop
   - Click install button
   - Verify app opens in standalone window

3. **Test on Mobile:**
   - Visit URL on Android/iOS
   - Add to home screen
   - Test offline functionality

4. **Check Manifest:**
   - Visit: `https://yourdomain.com/manifest.webmanifest`
   - Verify all fields are correct

---

## 🌍 Custom Domain Setup

### Using Vercel/Netlify:
1. Go to project settings
2. Add custom domain: `yourdomain.com`
3. Update DNS records (provided by platform):
   - A record: Points to platform's IP
   - CNAME: `www` points to platform

### Using Cloudflare (Recommended):
1. Add domain to Cloudflare
2. Update nameservers at domain registrar
3. Enable HTTPS (SSL) in Cloudflare
4. Set up page rules for caching

---

## 📊 Monitoring & Analytics

### Add Analytics (Optional):

1. **Google Analytics:**
   ```typescript
   // In main.tsx
   import ReactGA from 'react-ga4';
   ReactGA.initialize('YOUR-GA-ID');
   ```

2. **Error Tracking (Sentry):**
   ```bash
   pnpm add @sentry/react
   ```
   ```typescript
   import * as Sentry from "@sentry/react";
   Sentry.init({ dsn: "YOUR-DSN" });
   ```

---

## 🔄 Continuous Deployment

### GitHub Actions (Auto-deploy on push):

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🎉 Post-Deployment

After deployment:

1. **Test Everything:**
   - All pages load correctly
   - API endpoints work
   - PWA installs successfully
   - Offline mode works
   - Mobile responsiveness

2. **Share Your App:**
   - Create QR code for easy mobile access
   - Share on social media
   - Add to app directories

3. **Monitor Performance:**
   - Check server logs
   - Monitor API response times
   - Track user installations
   - Gather feedback

---

## 📝 Environment Variables Reference

### Frontend (.env):
```
PORT=3000
BASE_PATH=/
VITE_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

### Backend (.env):
```
PORT=3001
NODE_ENV=production
DATABASE_URL=your-database-url
JWT_SECRET=your-secret-key
```

---

## 🆘 Troubleshooting

**PWA not installing?**
- Ensure HTTPS is enabled
- Check service worker is registered
- Verify manifest.webmanifest is accessible
- Check browser console for errors

**API not connecting?**
- Verify CORS is configured
- Check API URL in frontend config
- Test API endpoints directly
- Check server logs

**Images not loading?**
- Verify image paths are correct
- Check CDN configuration
- Ensure images are in public folder

---

## 📞 Support

Need help deploying? Contact uPhumeh or refer to the platform-specific documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)

---

**🚀 Ready to launch! Good luck with your deployment!**
