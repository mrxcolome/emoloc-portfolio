# caso · brachfield academy

> Visto bueno de Pere Brachfield recibido (septiembre 2026).
> Fuera del texto público, a propósito: la lista de pasos pendientes del propietario. Se presenta como "en prelanzamiento".

## ficha
- **cliente:** Brachfield Academy · Pere Brachfield
- **sector:** formación B2B en línea · credit management
- **periodo:** 2026 · en prelanzamiento
- **alcance:** sitio público e identidad · registro y pago recurrente · zona de alumnos · actualidad automática con IA · sala de profesores y administración
- **pilares:** venta · presencia · comunicación
- **web:** brachfieldacademy.com
- **imagen de portada:** portada con el retrato de Pere y el botón "Quiero ser alumno"

## titular

### una escuela en línea de credit management, por suscripción.

Pere Brachfield, referencia del credit management con más de 35 años de experiencia y 32 libros publicados, quería una academia en línea para responsables financieros y de cobros. Construimos la plataforma entera: sitio público, pagos, zona de alumnos, un tablón de noticias que se alimenta solo y una sala para que el equipo publique sin tocar nada técnico.

## cifras de cabecera
- **+35** años de experiencia de Pere en morosidad y crédito
- **32** libros publicados sobre la materia
- **10** tipologías de contenido: el curso y nueve piezas más
- **39 €** al mes, un solo plan, todo incluido

## el punto de partida

Pere Brachfield es una de las voces más reconocidas del credit management en España: prevenir impagos, gestionar el crédito y cobrar lo que te deben. Quería convertir ese conocimiento en una escuela en línea para credit managers, responsables financieros y de cobros.

El modelo tenía que ser sencillo: un único plan de 39 € al mes con IVA, sin permanencia, y tres tareas para el alumno. Aprender con cursos, consultar guías y plantillas, y estar al día con noticias del sector y sesiones en directo con Pere.

Y una condición: que Pere y su equipo pudieran publicar contenido sin depender de nadie.

## el sitio público
*la cara comercial · pilar: presencia*

### un sitio que demuestra que la academia está viva.

Presenta a Pere con su retrato de estudio y sus seis libros de referencia, y lleva a un único botón: "Quiero ser alumno". La portada muestra las últimas noticias reales del tablón y se regenera sola cada hora, así que siempre parece recién hecha.

El alta tiene verificación por email, pago con Stripe y acceso inmediato. El alumno aterriza en un recorrido de bienvenida de cuatro pasos que personaliza sus recomendaciones.

La identidad es cerrada: paleta, escala tipográfica de cuatro tamaños y componentes documentados en una guía de estilos.

*imagen:* la rueda del ciclo de vida del crédito ("las siete etapas cubiertas, dibujadas como el ciclo que son")

## la zona de alumnos
*pilar: venta*

### aprender, consultar y estar al día.

Menú de seis entradas, buscador global y un tour guiado en la primera visita. Cursos con progreso y "continúa donde lo dejaste", un catálogo con jerarquía clara (cursos en grande, y debajo consejos, artículos, entrevistas, guías, plantillas y casos), sesiones en directo con reserva de plaza y recordatorio el día antes, favoritos y descargas listas para adaptar.

El buscador entiende lo que buscas aunque no pongas acentos: "buro" encuentra "burofax".

*imagen:* inicio de la zona de alumnos ("el primer aterrizaje: la bienvenida con el tour guiado sobre el menú real")

## la actualidad
*el tablón que se alimenta solo · pilar: comunicación*

### contenido nuevo cada día, sin trabajo editorial.

Cada mañana a las 7:30 un proceso automático lee la prensa económica española y un curador con inteligencia artificial, con criterio de credit manager, elige la noticia o dos que de verdad afectan a quien gestiona el cobro.

Cada noticia sale con su imagen real, la etiqueta temática, una frase didáctica ("la clave para ti") y, si procede, el contenido de la academia que ayuda a profundizar. El histórico se conserva y se puede filtrar por tema. Es la clave contra las bajas: la academia siempre tiene algo nuevo.

*imagen:* la retícula de noticias ("imagen, tema, la clave para ti y enlace a la fuente")

## la sala de profesores y la administración
*pilar: gestión*

### publicar sin tocar el gestor técnico.

La Sala es un asistente paso a paso: crear un curso (título, lecciones, portada, publicar) o una pieza de cualquiera de las nueve tipologías, con el vídeo subido directamente desde el navegador. Si hay alumnos con progreso o favoritos, avisa con la cifra antes de borrar nada. Todo queda registrado, y el gestor completo sigue disponible como "modo experto".

El panel de administración muestra alumnos activos, altas, descargas, reservas, la cola de "Pregunta a Pere" y las búsquedas más frecuentes y las que no encuentran nada: ideas de contenido servidas en bandeja.

*imagen:* la Sala ("crear, editar, publicar, retirar y borrar cursos y piezas, en modo concentración")

## debajo del capó

Tecnología moderna y de coste contenido, explicada en una línea por pieza.

| pieza | qué hace |
|---|---|
| Vercel + Next.js | La web y su servidor. Cada mejora se publica sola al guardarse. |
| Neon (Postgres) | La base de datos: alumnos, suscripciones, progreso, favoritos, noticias. |
| Payload CMS | El almacén editorial bajo la Sala de profesores y el modo experto. |
| Stripe | Cobros de la membresía, facturas y portal del cliente. |
| Cloudflare | El dominio, los ficheros descargables y el vídeo en streaming. |
| Resend | Los emails: verificación, confirmaciones y recordatorios de directos. |
| Claude (IA) | El curador del tablón de noticias: selecciona, etiqueta y escribe "la clave para ti". |
| PostHog + Sentry | Analítica de uso sin cookies de rastreo y alertas si algo falla. |
| Calidad | 73 pruebas automáticas (54 unitarias y 19 de recorrido completo, accesibilidad incluida) antes de cada publicación. |

## estado del proyecto

**Construido y funcionando.** Sitio público, registro, pago y bienvenida, zona de alumnos entera, tablón automático de noticias, Sala de profesores, panel de administración, emails, analítica y pruebas automáticas. Dominio y correo propios conectados, y contenido de demostración cargado para enseñar el producto.

**En prelanzamiento.** La plataforma está completa. La apertura al público depende del contenido real de Pere y de los últimos pasos de puesta en marcha: pagos en modo real, textos legales e indexación en Google.

## cierre de página

### ¿quieres vender conocimiento por suscripción?
[botón] cuéntame tu proyecto

(enlace al caso anterior: Escuela de danza Cristina Colomé)
