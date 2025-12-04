# 🔗 Connect Your Sitrixx Project to GitHub

## Why GitHub?
- ✅ Easy code backup and version control
- ✅ Deploy directly from GitHub to Cloudflare
- ✅ Collaborate with team members
- ✅ Track changes over time

---

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and login (or sign up)
2. Click the **"+"** icon → **"New repository"**
3. Name it: `sitrixx-website`
4. Set to **Private** (recommended)
5. **DO NOT** initialize with README
6. Click **"Create repository"**

---

## Step 2: Get Your Code into GitHub

GitHub will show you commands. Use these:

### If starting fresh:
```bash
git init
git add .
git commit -m "Initial Sitrixx website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/sitrixx-website.git
git push -u origin main
```

### Important Files to Exclude:
Make sure `.gitignore` includes:
```
node_modules/
dist/
.env
.DS_Store
```

---

## Step 3: Deploy from GitHub to Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages**
3. Click **"Create Application"** → **"Pages"**
4. Click **"Connect to Git"**
5. Authorize Cloudflare to access GitHub
6. Select your `sitrixx-website` repository
7. Configure build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
8. Click **"Save and Deploy"**

**Benefits:**
- ✅ Auto-deploy on every push to main branch
- ✅ Preview deployments for branches
- ✅ Rollback to previous versions easily
- ✅ Free SSL and CDN included

---

## Step 4: Add Custom Domain

After deployment:
1. In Cloudflare Pages, go to your project
2. Click **"Custom domains"**
3. Add `sitrixx.com` and `www.sitrixx.com`
4. Cloudflare automatically configures DNS

**Done!** Your site is live and auto-deploys on every code change! 🎉

---

## Future Updates

To update your site:
```bash
# Make your changes
git add .
git commit -m "Updated homepage design"
git push

# Cloudflare automatically rebuilds and deploys!
```

