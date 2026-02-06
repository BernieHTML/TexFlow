# Diagnostic Steps for GitHub Pages 404 Errors

## Step 1: Verify Files Are Actually on GitHub

1. Open: https://github.com/BernieHTML/TexFlowMKT/tree/live-site-static
2. Check these files exist:
   - ✅ `index.html` 
   - ✅ `_next/static/css/db3a1f04c3723af7.css`
   - ✅ `texflowlogo.png`
   - ✅ `mars-hero.mp4`
   - ✅ `.nojekyll`

## Step 2: Test Direct URLs

Try accessing these URLs directly in your browser:

- https://berniehtml.github.io/TexFlowMKT/index.html
- https://berniehtml.github.io/TexFlowMKT/_next/static/css/db3a1f04c3723af7.css
- https://berniehtml.github.io/TexFlowMKT/texflowlogo.png
- https://berniehtml.github.io/TexFlowMKT/mars-hero.mp4

**If these work:** The files are deployed correctly, but the HTML might have wrong paths.
**If these 404:** The files aren't deployed or GitHub Pages hasn't updated yet.

## Step 3: Check GitHub Pages Settings

1. Go to: https://github.com/BernieHTML/TexFlowMKT/settings/pages
2. Verify:
   - Source: `live-site-static` branch
   - Folder: `/ (root)`
   - Look for any error messages or warnings

## Step 4: Force a Rebuild

If files are correct but still 404, force GitHub Pages to rebuild:

```bash
# Make a tiny change to trigger rebuild
echo "<!-- rebuild -->" >> index.html
git add index.html
git commit -m "Force GitHub Pages rebuild"
git push origin live-site-static
```

Then wait 10-15 minutes.

## Step 5: Clear Browser Cache

The browser might be caching old files:

1. **Hard Refresh:** `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. **Or use Incognito/Private mode**
3. **Or clear browser cache completely**

## Step 6: Check Browser Console

Open browser DevTools (F12) and check:
1. **Network tab** - See the exact URLs being requested
2. **Console tab** - See any JavaScript errors
3. Look at the **failed requests** - what exact URL is being requested?

The errors show paths like `db3a1f04c3723af7.css` without prefix - this suggests either:
- Browser cache (most likely)
- GitHub Pages serving old version
- JavaScript dynamically loading without basePath

## Most Likely Cause

Based on your errors, this is **most likely a GitHub Pages cache issue**. The CDN can take 10-15 minutes to update after a push.

**Try this:**
1. Wait 15 minutes from your last push
2. Use incognito mode
3. Visit: https://berniehtml.github.io/TexFlowMKT/?nocache=12345

If it still doesn't work after 15 minutes, check the direct URLs in Step 2 to see if files are actually deployed.
