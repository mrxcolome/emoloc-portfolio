# xavicolome.com

Web d'emoloc (Xavi Colomé): transformació digital per a empreses petites.

- `index.html`: la portada. HTML estàtic amb GSAP i Lenis (`libs/`), mitjans a `assets/`.
- `blog/index.html`: el blog, generat amb `python3 blog/build.py` a partir de `content/ca/blog/*.md`.
- `contacte.php`: rep el formulari de contacte i l'envia per correu a xavi@emoloc.com.
- `guia-estils.html`: la guia d'estils, publicada a xavicolome.com/guia-estils.html.
- `.htaccess`, `404.html`, `robots.txt`, `sitemap.xml`: configuració del servidor.
- `content/`: tots els textos de la web (català i castellà) en Markdown.
- `design/`: guia d'estils i material de disseny; no es publica.

## Publicació

La web viu a Cloudflare Pages, al domini xavicolome.com. Cada push a `main` la publica amb l'acció de `.github/workflows/deploy.yml`:
`scripts/dist.sh` prepara la carpeta `dist/` només amb els fitxers que es publiquen i Wrangler la puja al projecte de Pages `xavicolome`.

Per posar-ho en marxa (un sol cop):

1. **Secrets al repositori** (Settings → Secrets and variables → Actions): `CLOUDFLARE_API_TOKEN` (token d'API amb el permís «Cloudflare Pages: Edit») i `CLOUDFLARE_ACCOUNT_ID`.
2. **Projecte de Pages**: al tauler de Cloudflare, Workers & Pages → Create → Pages → «Upload assets», amb el nom `xavicolome`. Es pot crear buit; el primer push l'omple.
3. **Domini**: al projecte, Custom domains → afegir `xavicolome.com` i `www.xavicolome.com` (el `_redirects` envia www a l'arrel).
4. **Formulari de contacte**: `functions/contacte.js` envia el correu amb Resend. Al projecte de Pages, Settings → Variables and Secrets, afegir `RESEND_API_KEY` (clau de resend.com, amb el domini del remitent verificat). Opcionals: `CONTACTE_A` (destinatari; per defecte xavi@emoloc.com) i `CONTACTE_DE` (remitent; per defecte web@xavicolome.com).

`_headers` i `_redirects` fan la feina que abans feia l'`.htaccess`: HTML sempre fresc, mitjans amb caché llarga, www cap a l'arrel. La pàgina `404.html` la serveix Pages automàticament.

## Calendari editorial del blog

Un article cada quinze dies com a mínim, al voltant dels dies 1 i 15 de cada mes; el número del fitxer és l'ordre d'escriptura i el blog ordena per data. La data va al camp `data: AAAA-MM-DD` de cada `content/ca/blog/NN-*.md` i el generador la mostra com «1 d'agost de 2026».

- 01 · 1 d'agost de 2026 · Presència · Quan una web de WordPress ja no serveix
- 02 · 15 d'agost de 2026 · Gestió · L'excel que porta el teu negoci
- 03 · 1 de setembre de 2026 · Venda · Vendre coneixement per subscripció
- 07 · 6 de setembre de 2026 · Venda · Vendre per internet sense muntar una gran botiga online
- 04 · 15 de setembre de 2026 · Comunicació · Com et troben Google i ChatGPT
- 08 · 21 de setembre de 2026 · Comunicació · Escriure als clients sense molestar
- 05 · 2 d'octubre de 2026 · Presència · La fitxa de Google del teu negoci
- 06 · 14 d'octubre de 2026 · Gestió · Les tasques que fas cada setmana i que es poden fer soles
- 07 · **1 de novembre de 2026 · Venda · pendent d'escriure**
