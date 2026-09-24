# emoloc.com

Web d'emoloc (Xavi Colomé): transformació digital per a empreses petites.

- `index.html`: la portada. HTML estàtic amb GSAP i Lenis (`libs/`), mitjans a `assets/`.
- `blog/index.html`: el blog, generat amb `python3 blog/build.py` a partir de `content/ca/blog/*.md`.
- `contacte.php`: rep el formulari de contacte i l'envia per correu a xavi@emoloc.com.
- `guia-estils.html`: la guia d'estils, publicada a emoloc.com/guia-estils.html.
- `.htaccess`, `404.html`, `robots.txt`, `sitemap.xml`: configuració del servidor.
- `content/`: tots els textos de la web (català i castellà) en Markdown.
- `design/`: guia d'estils i material de disseny; no es publica.

## Publicació

Cada push a `main` sincronitza la web per FTPS a Webempresa amb l'acció de `.github/workflows/deploy.yml`.
Cal tenir quatre secrets al repositori (Settings → Secrets and variables → Actions): `FTP_SERVIDOR`, `FTP_USUARI`, `FTP_CONTRASENYA`, `FTP_CARPETA`.

## Calendari editorial del blog

Un article cada quinze dies, els dies 1 i 15 de cada mes. La data va al camp `data: AAAA-MM-DD` de cada `content/ca/blog/NN-*.md` i el generador la mostra com «1 d'agost de 2026».

- 01 · 1 d'agost de 2026 · Presència · Quan una web de WordPress ja no serveix
- 02 · 15 d'agost de 2026 · Gestió · L'excel que porta el teu negoci
- 03 · 1 de setembre de 2026 · Venda · Vendre coneixement per subscripció
- 04 · 15 de setembre de 2026 · Comunicació · Com et troben Google i ChatGPT
- 05 · **1 d'octubre de 2026 · pendent d'escriure**
