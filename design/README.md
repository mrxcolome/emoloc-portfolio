# design · pas 3

- `guia-estils.html`: la guia d'estils d'emoloc (colors, tipografia, espai, moviment, components, normes). Pàgina autònoma.
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

- `portada/index.html`: la portada completa amb el motor d'escenes. Pantalla zero amb el vídeo del Xavi, la frase que creix i els quatre pilars,
  una escena per pilar (vídeo a pantalla completa que es converteix en la pantalla d'un dispositiu del Forn Baltà, marca fictícia) i, després,
  com treballo, projectes, qui hi ha darrere, blog, formulari i peu.
- `portada/libs/`: GSAP, ScrollTrigger i Lenis.
- `portada/media/`: vídeos i fotos (no es versionen, uns 40 MB). Es publiquen com a fitxers adjunts de l'artefacte.

Sense JavaScript o amb "reduir el moviment" activat, la pàgina es mostra en versió estàtica (`html.no-motion`).

Nota de publicació: el vídeo de fons de l'entrada (`media/fons-digital.mp4`, 16 MB) supera el límit de fitxer adjunt de l'artefacte
i es puja com a actiu; a la còpia publicada la ruta se substitueix per l'adreça de l'actiu. Al repositori la referència és la local.

## Blog (v1)

- `blog/index.html`: llistat d'articles amb filtre per pilar i la pàgina d'article (el primer, amb el text real), en una sola pàgina
  amb dues vistes. Els textos surten dels fitxers de `content/ca/blog/`.
