#!/bin/bash
# Build script for GitHub Pages deployment

echo "Building static site..."
npm run build

echo "Fixing image and video paths for GitHub Pages basePath..."
# Fix image paths
find out -name "*.html" -exec sed -i '' 's|src="/texflowlogo.png"|src="/TexFlowMKT/texflowlogo.png"|g' {} \;
find out -name "*.html" -exec sed -i '' 's|href="/texflowlogo.png"|href="/TexFlowMKT/texflowlogo.png"|g' {} \;
# Fix video paths
find out -name "*.html" -exec sed -i '' 's|src="/mars-hero.mp4"|src="/TexFlowMKT/mars-hero.mp4"|g' {} \;

echo "Copying files to repository root..."
cp -r out/* .
cp -r out/.well-known .

echo "Build complete! Files are ready for GitHub Pages."
echo "Don't forget to commit and push:"
echo "  git add ."
echo "  git commit -m 'Update static site'"
echo "  git push"
