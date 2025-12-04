# 🚀 Sitrixx Deployment Guide

Deploy your Sitrixx website to **sitrixx.com** using Cloudflare Workers.

---

## 📋 Prerequisites

1. ✅ Domain registered: **sitrixx.com**
2. ✅ Cloudflare account: [Sign up here](https://dash.cloudflare.com/sign-up)
3. ✅ Domain added to Cloudflare (nameservers updated)
4. ✅ Node.js installed on your local machine

---

## 🔧 Step-by-Step Deployment

### **Step 1: Prepare Your Domain on Cloudflare**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **"Add a Site"** and enter `sitrixx.com`
3. Choose the **Free** plan (or higher)
4. Copy the **two nameservers** Cloudflare provides (e.g., `brad.ns.cloudflare.com`)
5. Go to your domain registrar (GoDaddy, Namecheap, etc.)
6. Replace the existing nameservers with Cloudflare's nameservers
7. Wait 5-30 minutes for DNS to propagate
8. Return to Cloudflare - it will show "Active" when ready

---

### **Step 2: Build Your Application**

From your project directory, run:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

---

### **Step 3: Login to Cloudflare via Wrangler**

```bash
npx wrangler login
```

This will:
- Open your browser
- Ask you to authorize Wrangler
- Save your credentials locally

---

### **Step 4: Deploy to Cloudflare Workers**

```bash
npx wrangler deploy
```

After deployment, you'll see:
```
✨ Uploaded sitrixx
✨ Published sitrixx
   https://sitrixx.YOUR-SUBDOMAIN.workers.dev
```

**Note:** Your app is now live on a temporary Cloudflare URL!

---

### **Step 5: Connect Your Custom Domain**

#### **Option A: Via Cloudflare Dashboard (Recommended)**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your **sitrixx.com** domain
3. Go to **Workers & Pages** in the left sidebar
4. Click on your **sitrixx** worker
5. Go to **Settings** → **Domains & Routes**
6. Click **"Add Custom Domain"**
7. Enter: `sitrixx.com` and click **Add Custom Domain**
8. Repeat for `www.sitrixx.com`

Cloudflare will automatically:
- Create DNS records
- Provision SSL certificate
- Route traffic to your Worker

**Done!** Your site will be live at `https://sitrixx.com` in ~2 minutes! 🎉

#### **Option B: Via Command Line**

```bash
# Add root domain
npx wrangler domains add sitrixx.com

# Add www subdomain
npx wrangler domains add www.sitrixx.com
```

---

## 🔐 Environment Variables & Secrets

Your Formspree integration doesn't require secrets (it's client-side), but if you add backend features:

```bash
# Add a secret (for sensitive data)
npx wrangler secret put MY_SECRET_KEY

# Add environment variables (for non-sensitive config)
# Edit wrangler.jsonc and add:
# "vars": { "MY_VAR": "production_value" }
```

---

## 🔄 Future Deployments

Whenever you make changes:

```bash
# 1. Build the app
npm run build

# 2. Deploy to Cloudflare
npx wrangler deploy
```

Changes go live in ~30 seconds!

---

## 📊 Monitoring & Analytics

1. Go to **Cloudflare Dashboard** → **Workers & Pages**
2. Click on **sitrixx**
3. View:
   - Request analytics
   - Error logs
   - Performance metrics
   - Edge locations serving traffic

---

## 🌐 DNS Settings (Automatic)

When you add a custom domain, Cloudflare automatically creates:

```
Type    Name    Content
------  ------  ---------------------------
CNAME   @       sitrixx.YOUR-SUBDOMAIN.workers.dev
CNAME   www     sitrixx.YOUR-SUBDOMAIN.workers.dev
```

SSL/TLS is automatically provisioned (usually within 1-2 minutes).

---

## ✅ Verify Deployment

After deployment, test:

1. **Root domain:** https://sitrixx.com
2. **WWW subdomain:** https://www.sitrixx.com
3. **All pages:**
   - Home: https://sitrixx.com
   - Services: https://sitrixx.com/services
   - About: https://sitrixx.com/about
   - Contact: https://sitrixx.com/contact
4. **Contact form:** Submit a test message and check sitrixx1@gmail.com

---

## 🐛 Troubleshooting

### **Issue: "Domain not found"**
- Ensure nameservers are updated at your registrar
- Wait for DNS propagation (use [whatsmydns.net](https://www.whatsmydns.net))

### **Issue: "SSL certificate pending"**
- Wait 2-5 minutes after adding custom domain
- Cloudflare auto-provisions Let's Encrypt certificates

### **Issue: "Worker not found"**
- Make sure you deployed: `npx wrangler deploy`
- Check worker name in wrangler.jsonc matches dashboard

### **Issue: "404 errors on pages"**
- Check that baseUrl is configured correctly in `src/lib/base-url.ts`
- Ensure all routes are in `src/pages/` directory

### **Issue: Form not sending emails**
- Verify Formspree form ID in `src/components/ContactPage.tsx`
- Check browser console for errors
- Test form manually at https://formspree.io/forms

---

## 💰 Cost

**Cloudflare Workers Free Tier:**
- ✅ 100,000 requests per day
- ✅ Unlimited bandwidth
- ✅ Free SSL certificates
- ✅ Global CDN (300+ locations)

For most small-to-medium websites, the **free tier is sufficient**.

If you exceed limits, Cloudflare Workers costs $5/month for 10 million requests.

---

## 📚 Additional Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [Astro + Cloudflare Guide](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Custom Domains Guide](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

---

## 🎉 You're Live!

Once deployed, your professional portfolio will be live at:

**🌐 https://sitrixx.com**

Share it with clients and start receiving inquiries through your contact form!

---

**Questions?** Check the Cloudflare dashboard or contact support at support@cloudflare.com
