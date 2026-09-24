# design · pas 3

- `/guia-estils.html` (a l'arrel, es publica a emoloc.com/guia-estils.html): la guia d'estils d'emoloc (colors, tipografia, espai, moviment, components, normes). Pàgina autònoma.
- `prototip-inici.template.html`: el prototip navegable de la portada, amb marcadors `{{NOM}}` per als mitjans.
  El fitxer construït (`prototip-inici.html`, uns 7 MB amb el vídeo i les captures incrustades en base64) no es versiona:
  es genera substituint els marcadors per data URIs de les imatges de `content/` i del vídeo del retrat.

Mitjans que espera la plantilla: DANSA_WEB, DANSA_MOBIL, DANSA_BACKSTAGE, DANSA_FITXA, BRACH_CICLE, BRACH_LANDING, BRACH_ALUMNE, RETRAT, POSTER, VIDEO.

## Escena de presència (v4, alta fidelitat)

- `escena-presencia.template.html`: només l'escena del pilar presència, construïda amb el nivell que ha de tenir la portada final.
  Vídeo d'ambient a pantalla completa que es converteix en la web d'una marca fictícia (Forn Baltà) i un mòbil amb la cerca de Google.
  El fitxer construït (`escena-presencia.html`, uns 12 MB amb el vídeo incrustat) no es versiona.

Mitjans que espera la plantilla: VIDEO (clip Kling 5 s, 16:9), POSTER, HERO, PA, CROISSANT, COCA (fotos Seedream de Forn Baltà) i les llibreries LIB_GSAP, LIB_ST, LIB_LENIS.

## Portada sencera (v4)

- La portada i el blog viuen ara a l'arrel del repositori (`/index.html`, `/blog/`), amb els mitjans a `/assets/` i les llibreries a `/libs/`.

Sense JavaScript o amb "reduir el moviment" activat, la pàgina es mostra en versió estàtica (`html.no-motion`).

Nota de publicació: el vídeo de fons de l'entrada (`media/fons-digital.mp4`, 16 MB) supera el límit de fitxer adjunt de l'artefacte
i es puja com a actiu; a la còpia publicada la ruta se substitueix per l'adreça de l'actiu. Al repositori la referència és la local.

## Blog (v1)

- `blog/build.py` (a l'arrel) regenera el blog a partir de `content/ca/blog/*.md`.