# cas · brachfield academy

> Vistiplau del Pere Brachfield rebut (setembre 2026).
> Fora del text públic, a propòsit: la llista de passos pendents del propietari. Es presenta com "en prellançament".

## fitxa
- **client:** Brachfield Academy · Pere Brachfield
- **sector:** formació B2B en línia · credit management
- **període:** 2026 · en prellançament
- **abast:** lloc públic i identitat · registre i pagament recurrent · zona d'alumnes · actualitat automàtica amb IA · sala de professors i administració
- **pilars:** venda · presència · comunicació
- **web:** brachfieldacademy.com
- **imatge de portada:** portada amb el retrat del Pere i el botó "Quiero ser alumno"

## titular

### una escola en línia de credit management, per subscripció.

Pere Brachfield, referència del credit management amb més de 35 anys d'experiència i 32 llibres publicats, volia una acadèmia en línia per a responsables financers i de cobraments. Vam construir la plataforma sencera: lloc públic, pagaments, zona d'alumnes, un tauler de notícies que s'alimenta sol i una sala perquè l'equip publiqui sense tocar res tècnic.

## xifres de capçalera
- **+35** anys d'experiència del Pere en morositat i crèdit
- **32** llibres publicats sobre la matèria
- **10** tipologies de contingut: el curs i nou peces més
- **39 €** al mes, un sol pla, tot inclòs

## el punt de partida

Pere Brachfield és una de les veus més reconegudes del credit management a Espanya: prevenir impagaments, gestionar el crèdit i cobrar el que et deuen. Volia convertir aquest coneixement en una escola en línia per a credit managers, responsables financers i de cobraments.

El model havia de ser senzill: un únic pla de 39 € al mes amb IVA, sense permanència, i tres feines per a l'alumne. Aprendre amb cursos, consultar guies i plantilles, i estar al dia amb notícies del sector i sessions en directe amb el Pere.

I una condició: que el Pere i el seu equip poguessin publicar contingut sense dependre de ningú.

## el lloc públic
*la cara comercial · pilar: presència*

### un lloc que demostra que l'acadèmia és viva.

Presenta el Pere amb el seu retrat d'estudi i els seus sis llibres de referència, i porta a un únic botó: "Quiero ser alumno". La portada ensenya les últimes notícies reals del tauler i es regenera sola cada hora, així que sempre sembla acabada de fer.

L'alta té verificació per email, pagament amb Stripe i accés immediat. L'alumne aterra en un recorregut de benvinguda de quatre passos que personalitza les seves recomanacions.

La identitat és tancada: paleta, escala tipogràfica de quatre mides i components documentats en una guia d'estils.

*imatge:* la roda del cicle de vida del crèdit ("les set etapes cobertes, dibuixades com el cicle que són")

## la zona d'alumnes
*pilar: venda*

### aprendre, consultar i estar al dia.

Menú de sis entrades, cercador global i un tour guiat a la primera visita. Cursos amb progrés i "continua on ho vas deixar", un catàleg amb jerarquia clara (cursos en gran, i a sota consells, articles, entrevistes, guies, plantilles i casos), sessions en directe amb reserva de plaça i recordatori el dia abans, favorits i descàrregues llestes per adaptar.

El cercador entén el que busques encara que no posis accents: "buro" troba "burofax".

*imatge:* inici de la zona d'alumnes ("el primer aterratge: la benvinguda amb el tour guiat sobre el menú real")

## l'actualitat
*el tauler que s'alimenta sol · pilar: comunicació*

### contingut nou cada dia, sense feina editorial.

Cada matí a les 7:30 un procés automàtic llegeix la premsa econòmica espanyola i un curador amb intel·ligència artificial, amb criteri de credit manager, tria la notícia o dues que de debò afecten qui gestiona el cobrament.

Cada notícia surt amb la seva imatge real, l'etiqueta temàtica, una frase didàctica ("la clave para ti") i, si escau, el contingut de l'acadèmia que ajuda a aprofundir. L'històric es conserva i es pot filtrar per tema. És la clau contra les baixes: l'acadèmia sempre té alguna cosa nova.

*imatge:* la retícula de notícies ("imatge, tema, la clave para ti i enllaç a la font")

## la sala de professors i l'administració
*pilar: gestió*

### publicar sense tocar el gestor tècnic.

La Sala és un assistent pas a pas: crear un curs (títol, lliçons, portada, publicar) o una peça de qualsevol de les nou tipologies, amb el vídeo pujat directament des del navegador. Si hi ha alumnes amb progrés o favorits, avisa amb la xifra abans d'esborrar res. Tot queda registrat, i el gestor complet segueix disponible com a "mode expert".

El panell d'administració mostra alumnes actius, altes, descàrregues, reserves, la cua de "pregunta al Pere" i les cerques més freqüents i les que no troben res: idees de contingut servides en safata.

*imatge:* la Sala ("crear, editar, publicar, retirar i esborrar cursos i peces, en mode concentració")

## sota el capó

Tecnologia moderna i de cost contingut, explicada en una línia per peça.

| peça | què fa |
|---|---|
| Vercel + Next.js | La web i el seu servidor. Cada millora es publica sola en desar-se. |
| Neon (Postgres) | La base de dades: alumnes, subscripcions, progrés, favorits, notícies. |
| Payload CMS | El magatzem editorial sota la Sala de professors i el mode expert. |
| Stripe | Cobraments de la membresia, factures i portal del client. |
| Cloudflare | El domini, els fitxers descarregables i el vídeo en streaming. |
| Resend | Els emails: verificació, confirmacions i recordatoris de directes. |
| Claude (IA) | El curador del tauler de notícies: selecciona, etiqueta i escriu "la clave para ti". |
| PostHog + Sentry | Analítica d'ús sense galetes de rastreig i alertes si alguna cosa falla. |
| Qualitat | 73 proves automàtiques (54 unitàries i 19 de recorregut complet, accessibilitat inclosa) abans de cada publicació. |

## estat del projecte

**Construït i funcionant.** Lloc públic, registre, pagament i benvinguda, zona d'alumnes sencera, tauler automàtic de notícies, Sala de professors, panell d'administració, emails, analítica i proves automàtiques. Domini i correu propis connectats, i contingut de demostració carregat per ensenyar el producte.

**En prellançament.** La plataforma està completa. L'obertura al públic depèn del contingut real del Pere i dels últims passos de posada en marxa: pagaments en mode real, textos legals i indexació a Google.

## tancament de pàgina

### vols vendre coneixement per subscripció?
[botó] explica'm el teu projecte

(enllaç al cas anterior: Escola de dansa Cristina Colomé)
