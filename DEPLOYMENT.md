# 🚀 Deployment Guide

Complete guide for deploying the Donasi Al-Qur'an transparency platform.

## Quick Deploy (Recommended)

### Vercel (Free Tier - Best Option)

**Why Vercel?**
- ✅ Free tier includes enough for this app
- ✅ Automatic deployments from Git
- ✅ Super fast global CDN
- ✅ Next.js optimized
- ✅ Zero configuration needed

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Donasi Al-Qur'an platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/donasi-alquran.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit https://vercel.com
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Select "Next.js" as framework
   - Configure environment variables:
     ```
     NEXT_PUBLIC_SHEET_ID = your_sheet_id
     NEXT_PUBLIC_SHEET_NAME = Sheet1
     NEXT_PUBLIC_SITE_URL = https://your-domain.vercel.app
     ```
   - Click "Deploy"

3. **Your site is live!**
   - Vercel automatically provides domain: `your-project.vercel.app`
   - Share the link!

---

## Advanced Deployment Options

### 1. Netlify

**Pros:**
- Free tier with generous limits
- Simple deployment from Git

**Steps:**
1. Push to GitHub
2. Visit https://netlify.com
3. Click "Add new site" → "Import existing project"
4. Select your repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables
7. Deploy!

### 2. AWS Amplify

**Pros:**
- Scalable
- AWS ecosystem integration

**Steps:**
1. Push to GitHub
2. Visit AWS Amplify Console
3. Connect GitHub
4. Select repository and branch
5. Configure build settings (auto-detected for Next.js)
6. Add environment variables
7. Deploy!

### 3. GitHub Pages (Static Export)

**Note:** Requires modifications for static export

**Steps:**
1. Update `next.config.js`:
   ```javascript
   const nextConfig = {
     output: 'export',
   };
   module.exports = nextConfig;
   ```
2. Run `npm run build`
3. Deploy `.next/out` folder to GitHub Pages

### 4. Self-Hosted (VPS)

**Requirements:**
- Node.js 18+ installed
- Server (Linode, DigitalOcean, AWS EC2, etc.)

**Steps:**
1. SSH into your server
2. Clone repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/donasi-alquran.git
   cd donasi-alquran
   ```
3. Install dependencies:
   ```bash
   npm install
   npm run build
   ```
4. Set environment variables:
   ```bash
   export NEXT_PUBLIC_SHEET_ID=your_sheet_id
   export NEXT_PUBLIC_SHEET_NAME=Sheet1
   ```
5. Run with PM2 (or your preferred process manager):
   ```bash
   npm install -g pm2
   pm2 start "npm start" --name donasi-alquran
   pm2 startup
   pm2 save
   ```
6. Set up Nginx as reverse proxy
7. Configure SSL with Let's Encrypt

---

## Post-Deployment

### 1. Domain Configuration (Optional)

**For Vercel:**
1. Go to your project settings
2. Domains → Add domain
3. Follow DNS configuration steps

**Custom Domain:**
- Update DNS records to point to your deployment
- SSL certificate auto-configured

### 2. Environment Variables

Make sure to add these in your deployment platform:

```env
NEXT_PUBLIC_SHEET_ID=your_actual_sheet_id
NEXT_PUBLIC_SHEET_NAME=Sheet1
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. Test Your Deployment

1. Visit your live site
2. Check landing page loads
3. Navigate to `/dashboard`
4. Verify data loads from your Google Sheet
5. Test filters and search
6. Check charts render correctly

### 4. Monitor Performance

- **Vercel**: Built-in analytics
- **Netlify**: Built-in analytics  
- **Google Analytics** (optional):
  ```typescript
  // Add to app/layout.tsx
  import Script from 'next/script';
  
  <Script
    strategy="lazyOnload"
    src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID`}
  />
  ```

---

## CI/CD Setup

### Automatic Deployments

**Vercel (Automatic):**
- Every push to main branch = automatic deployment
- Preview deployments for pull requests

**GitHub Actions (Manual)**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Security Checklist

- ✅ Google Sheet is public (read-only)
- ✅ No sensitive data in environment variables
- ✅ HTTPS enforced on custom domain
- ✅ No authentication required (by design)
- ✅ Content Security Policy configured
- ✅ Regular security updates for dependencies

---

## Performance Optimization

### Already Included:
- ✅ Image optimization (Next.js)
- ✅ Code splitting
- ✅ CSS minification
- ✅ JavaScript minification
- ✅ Automatic compression
- ✅ Client-side caching

### Monitor:
- **First Contentful Paint (FCP)**: Target < 2s
- **Largest Contentful Paint (LCP)**: Target < 2.5s
- **Cumulative Layout Shift (CLS)**: Target < 0.1
- **Time to Interactive (TTI)**: Target < 3.8s

Check at:
- PageSpeed Insights: https://pagespeed.web.dev
- WebPageTest: https://www.webpagetest.org

---

## Troubleshooting Deployment

### Build Fails

**Solution:**
1. Check `npm run build` locally
2. Verify all dependencies installed
3. Check for TypeScript errors: `npm run type-check`
4. Review environment variables

### Data Not Loading

**Solution:**
1. Verify SHEET_ID is correct
2. Confirm sheet is publicly shared
3. Check network tab in browser DevTools
4. Verify Google Sheets API accessibility

### Styling Issues

**Solution:**
1. Clear Vercel cache and redeploy
2. Check Tailwind config
3. Verify CSS building correctly
4. Check for missing Tailwind classes

### Slow Performance

**Solution:**
1. Check Google Sheet size (limit to ~10K rows for best performance)
2. Reduce chart update frequency
3. Enable caching in config
4. Optimize images
5. Check API response times

---

## Rollback

### Vercel
- Go to Deployments
- Click three dots on previous version
- Select "Promote to Production"

### GitHub
- Revert commit: `git revert <commit-id>`
- Push to main

### Manual
- Restore from git backup
- Redeploy

---

## Cost Analysis

### Vercel (Free Tier)
- **Price**: FREE
- **Included**:
  - 100GB bandwidth/month
  - Unlimited deployments
  - Edge functions (free tier)
  - Preview deployments
  - Automatic SSL

### Self-Hosted (DigitalOcean Basic)
- **Price**: $4-6/month
- **Included**:
  - 1GB RAM
  - 1 CPU
  - 25GB SSD
  - Enough for 1000+ concurrent users

### Domain (Optional)
- **Price**: $10-15/year
- **Options**:
  - Namecheap
  - GoDaddy
  - Cloudflare

---

## Maintenance

### Regular Tasks

**Monthly:**
- Check deployment logs
- Update dependencies: `npm update`
- Verify Google Sheet still accessible
- Monitor traffic patterns

**Quarterly:**
- Update security patches: `npm audit fix`
- Review and optimize queries
- Test disaster recovery
- Backup Google Sheet

**Annually:**
- Major dependency upgrades
- Security audit
- Performance review
- Plan for next year

---

## Next Steps

1. ✅ Choose deployment platform (Vercel recommended)
2. ✅ Push to GitHub
3. ✅ Deploy
4. ✅ Configure domain (optional)
5. ✅ Share the link!
6. ✅ Monitor and maintain

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Deployment Issues**: Check platform's status page
- **Code Issues**: Review README.md and CONFIG.md

---

**Your app is ready to serve the world!** 🌍
