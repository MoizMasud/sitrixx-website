#!/bin/bash
# This creates a simple OG image as base64 PNG
# Since we can't use imagemagick or node canvas, we'll use a simpler approach

# Create a simple SVG that we'll reference
cat > /app/public/og-image-temp.svg << 'EOF'
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="text" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="120" font-weight="900" text-anchor="middle" fill="url(#text)" letter-spacing="-3">SITRIXX</text>
  <text x="600" y="380" font-family="Arial, sans-serif" font-size="32" font-weight="300" text-anchor="middle" fill="#d4d4d4" letter-spacing="-1">Premium Websites with Smart Automation</text>
</svg>
EOF
