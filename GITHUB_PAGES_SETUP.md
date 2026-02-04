# GitHub Pages Setup Instructions

## The Problem
GitHub Pages is likely serving from a different branch than `live-site-static`. The errors show files aren't being found, which means GitHub Pages is looking at the wrong branch.

## Solution: Configure GitHub Pages Branch

### Option 1: Change GitHub Pages to use `live-site-static` branch (Recommended)

1. Go to your repository on GitHub: https://github.com/BernieHTML/TexFlowMKT
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch**: `live-site-static`
   - **Folder**: `/ (root)`
5. Click **Save**
6. Wait 1-5 minutes for GitHub Pages to rebuild

### Option 2: Merge `live-site-static` into `main` branch

If GitHub Pages is configured to serve from `main`, merge your changes:

```bash
git checkout main
git merge live-site-static
git push origin main
```

Then wait for GitHub Pages to rebuild.

## Verify Files Are Pushed

Make sure all files are pushed to the remote:

```bash
git push origin live-site-static
```

## Check What Branch GitHub Pages Is Using

1. Go to: https://github.com/BernieHTML/TexFlowMKT/settings/pages
2. Check which branch is selected under "Source"
3. Make sure that branch has all your files

## After Configuration

Once GitHub Pages is configured correctly:
- Visit: https://berniehtml.github.io/TexFlowMKT/
- All assets should load correctly
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R) to clear cache

## Troubleshooting

If files still don't load:
1. Check the browser console for exact 404 URLs
2. Verify the files exist in the correct branch on GitHub
3. Check that `.nojekyll` file is in the root
4. Wait 5-10 minutes for GitHub Pages CDN to update
