#!/usr/bin/env bash
# Prepara la carpeta dist/ amb només els fitxers que es publiquen (sense fonts de contingut, generador ni documentació).
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf dist && mkdir -p dist/blog
cp index.html 404.html avis-legal.html privacitat.html galetes.html guia-estils.html robots.txt sitemap.xml _headers _redirects dist/
cp blog/index.html dist/blog/
cp -R assets libs dist/
echo "dist/: $(find dist -type f | wc -l) fitxers"
