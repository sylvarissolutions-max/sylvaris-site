# Sylvaris Solutions - Vercel Deployment

## Step 1: Create GitHub Repo

Run these from PowerShell in C:\agentchain\sylvaris-site\:

```powershell
cd C:\agentchain\sylvaris-site
git init
git add .
git commit -m "feat: sylvaris solutions landing page"
```

Then create the repo on GitHub (pick ONE method):

**Method A: GitHub CLI (if gh is installed)**
```powershell
gh repo create sylvaris-site --public --source=. --push
```

**Method B: Manual**
1. Go to github.com/new
2. Create repo named "sylvaris-site" (public)
3. Do NOT initialize with README
4. Run:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/sylvaris-site.git
git branch -M main
git push -u origin main
```

## Step 2: Connect to Vercel

1. Go to vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import "sylvaris-site" repo
5. Framework Preset: select "Other"
6. Root Directory: leave as "./"
7. Click "Deploy"

Vercel auto-detects the static site from vercel.json. No build step needed.

## Step 3: Custom Domain (optional but recommended)

1. In Vercel dashboard, go to your project Settings > Domains
2. Add: sylvarissolutions.com
3. Vercel shows DNS records to add at your domain registrar:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com
4. Add those records at your registrar (Namecheap, GoDaddy, Cloudflare, etc.)
5. Wait 5-10 minutes for DNS propagation
6. Vercel auto-provisions HTTPS via Let's Encrypt

## Step 4: Verify

- https://sylvaris-site.vercel.app (immediate, free subdomain)
- https://sylvarissolutions.com (after domain setup)

## What Gets Deployed

```
sylvaris-site/
    index.html      - Full landing page (responsive, dark theme, pricing, CTA)
    vercel.json     - Routing, headers, security
    robots.txt      - Search engine crawling rules
    DEPLOY.md       - This file (not served)
```

## Updating the Site

After making changes to index.html:

```powershell
cd C:\agentchain\sylvaris-site
git add .
git commit -m "update: description of change"
git push
```

Vercel auto-deploys on every push to main. Takes ~10 seconds.

## Cost

Vercel free tier includes:
- 100GB bandwidth/month
- Automatic HTTPS
- Global CDN (edge network)
- Unlimited deployments
- Custom domain support
- Analytics (basic)

No credit card required. Free tier is sufficient until you hit 100K+ monthly visitors.
