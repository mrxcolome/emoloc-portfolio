# design · pas 3

- `guia-estils.html`: la guia d'estils d'emoloc (colors, tipografia, espai, moviment, components, normes). Pàgina autònoma.
- `prototip-inici.template.html`: el prototip navegable de la portada, amb marcadors `{{NOM}}` per als mitjans.
  El fitxer construït (`prototip-inici.html`, uns 7 MB amb el vídeo i les captures incrustades en base64) no es versiona:
  es genera substituint els marcadors per data URIs de les imatges de `content/` i del vídeo del retrat.

Mitjans que espera la plantilla: DANSA_WEB, DANSA_MOBIL, DANSA_BACKSTAGE, DANSA_FITXA, BRACH_CICLE, BRACH_LANDING, BRACH_ALUMNE, RETRAT, POSTER, VIDEO.
