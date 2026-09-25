#!/usr/bin/env python3
"""Regenera design/blog/index.html a partir de content/ca/blog/*.md.
Manté el <head> i el CSS del fitxer actual i torna a escriure el <main>."""
import re, glob, os, html

ROOT = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(ROOT, '..'))
OUT = os.path.join(ROOT, 'index.html')
MEDIA = '../assets/'
IMG = {'01': 'blog-wordpress.jpg', '02': 'blog-excel.jpg', '03': 'blog-subscripcio.jpg', '04': 'blog-ia.jpg'}
MESOS = {'01':'Gener','02':'Febrer','03':'Març','04':'Abril','05':'Maig','06':'Juny','07':'Juliol','08':'Agost','09':'Setembre','10':'Octubre','11':'Novembre','12':'Desembre'}

def cap(s): return s[:1].upper() + s[1:]
def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'<a class="link" href="\2" target="_blank" rel="noopener">\1</a>', t)
    return t

def md2html(body):
    out, i, lines = [], 0, body.strip().split('\n')
    while i < len(lines):
        l = lines[i].rstrip()
        if not l: i += 1; continue
        if l.startswith('## '): out.append('<h2>%s</h2>' % inline(l[3:])); i += 1; continue
        if l.startswith('- '):
            items = []
            while i < len(lines) and lines[i].startswith('- '): items.append('<li>%s</li>' % inline(lines[i][2:])); i += 1
            out.append('<ul>%s</ul>' % ''.join(items)); continue
        para = [l]; i += 1
        while i < len(lines) and lines[i].strip() and not lines[i].startswith(('## ', '- ')): para.append(lines[i].rstrip()); i += 1
        out.append('<p>%s</p>' % inline(' '.join(para)))
    return '\n'.join(out)

arts = []
for f in sorted(glob.glob(os.path.join(REPO, 'content/ca/blog/*.md'))):
    raw = open(f, encoding='utf-8').read()
    m = re.match(r'---\n(.*?)\n---\n(.*)', raw, re.S)
    meta = dict(re.findall(r'^(\w+): (.*)$', m.group(1), re.M))
    num = os.path.basename(f)[:2]
    slug = re.sub(r'^\d+-', '', os.path.basename(f))[:-3]
    body = m.group(2)
    words = len(re.findall(r'\w+', body))
    y, mo, d = (meta['data'].split('-') + ['01'])[:3]  # data: AAAA-MM-DD
    mes = MESOS[mo].lower(); data_txt = '%d %s%s de %s' % (int(d), "d'" if mes[0] in 'aeiou' else 'de ', mes, y)
    arts.append(dict(num=num, slug=slug, iso=meta['data'], titol=cap(meta['títol']), pilar=cap(meta['pilar']), entradeta=meta['entradeta'],
                     data=data_txt, img=MEDIA + IMG[num], html=md2html(body), minuts=max(2, round(words / 200))))

arts.sort(key=lambda a: a['iso'], reverse=True)  # del més recent al més antic
def card(a, full=True):
    t = '<p class="text suau">%s</p>' % html.escape(a['entradeta'], quote=False) if full else ''
    return ('<article class="card%s" data-pilar="%s"><a class="thumb" href="#article/%s"><img src="%s" alt="" loading="lazy"></a>'
            '<p class="petit suau">%s · %s</p><h3>%s</h3>%s<a class="btn sec" href="#article/%s">Llegir l\'article <span aria-hidden="true">→</span></a></article>'
            % (' reveal' if full else '', a['pilar'], a['slug'], a['img'], a['data'], a['pilar'], html.escape(a['titol'], quote=False), t, a['slug']))

filters = ''.join('<button%s data-f="%s">%s</button>' % (' class="on"' if i == 0 else '', f, f) for i, f in enumerate(['Tots', 'Presència', 'Gestió', 'Venda', 'Comunicació']))
lst = '''  <section class="list" id="list">
    <div class="head"><h1 class="subtitular">Blog</h1><p class="text">Articles curts per entendre què pot aportar la transformació digital al teu negoci.</p></div>
    <div class="filters" id="filters">%s</div>
    <div class="grid" id="grid">
      %s
    </div>
  </section>
''' % (filters, '\n      '.join(card(a) for a in arts))

def art(a):
    others = [b for b in arts if b is not a][:3]
    return '''  <section class="art" data-slug="%s">
    <p><a class="btn sec" href="#"><span aria-hidden="true">←</span> Tots els articles</a></p>
    <header style="margin-top:40px"><p class="petit suau">%s · %s</p><h1 class="subtitular">%s</h1><p class="lead">%s</p><div class="meta petit"><span>Xavi Colomé</span><span>·</span><span>%d minuts de lectura</span><span>·</span><span>Ca / es</span></div></header>
    <div class="hero"><img src="%s" alt=""></div>
    <div class="body">
%s
    </div>
    <div class="cta"><div><p class="subtitular">Creus que et podem ajudar?</p><p class="text" style="margin-top:8px">La primera conversa és sense compromís i serveix per veure si t'hi podem ajudar.</p></div><a class="btn" href="../#contacte">Parlem</a></div>
    <div class="more"><p class="subtitular" style="margin-bottom:8px">Més articles</p><div class="grid">
        %s
    </div></div>
  </section>
''' % (a['slug'], a['data'], a['pilar'], html.escape(a['titol'], quote=False), html.escape(a['entradeta'], quote=False), a['minuts'], a['img'], a['html'], '\n        '.join(card(b, False) for b in others))

main = '<main class="wrap">\n' + lst + ''.join(art(a) for a in arts) + '</main>'

cur = open(OUT, encoding='utf-8').read()
head, rest = cur.split('<main class="wrap">', 1)
_, tail = rest.split('</main>', 1)
# nav + footer: es tornen a escriure sempre
NAV = ('<nav class="topnav"><a class="emoloc" href="../"><b>.</b>emoloc</a><ul>'
       '<li><a href="../#zero">Inici</a></li><li><a href="../#quefem">Serveis</a></li><li><a href="../#qui">Sobre mi</a></li>'
       '<li><a href="../#projectes">Projectes</a></li><li class="on"><a href="#">Blog</a></li>'
       '<li><a href="../#contacte">Contacte</a></li></ul><a class="parlem" href="../#contacte">Parlem</a></nav>')
head = re.sub(r'<nav class="topnav">.*?</nav>', NAV, head, flags=re.S)
tail = re.sub(r'<ul class="text negreta"><li>Inici</li>.*?</ul>', '<ul class="text negreta"><li>Inici</li><li>Serveis</li><li>Sobre mi</li><li>Projectes</li><li>Blog</li><li>Contacte</li></ul>', tail, count=1, flags=re.S)
head = head.replace('.topnav ul .on{border-bottom:2px solid var(--accent)}', '.topnav ul .on{color:var(--accent)}')
head = head.replace('.link{font-weight:600;border-bottom:2px solid var(--accent);padding-bottom:2px}', '.link{font-weight:600}')
head = head.replace('.emoloc{font-weight:800;letter-spacing:.04em;', '.emoloc{font-weight:800;letter-spacing:0;').replace('.emoloc{font-weight:800;letter-spacing:.01em;', '.emoloc{font-weight:800;letter-spacing:0;')
head = head.replace('qui té una empresa i no té departament digital', 'qui té un negoci i no té departament digital')
head = head.replace('.emoloc{font-weight:800;letter-spacing:0;', '.emoloc{font-weight:900;letter-spacing:0;').replace('.emoloc{font-weight:900;letter-spacing:0;', '.emoloc{font-weight:1000;letter-spacing:0;').replace('.emoloc{font-weight:1000;letter-spacing:0;', '.emoloc{font-weight:1000;letter-spacing:-.015em;').replace('.emoloc{font-weight:1000;letter-spacing:-.015em;', '.emoloc{font-weight:1000;letter-spacing:-.03em;').replace('9..40,800;9..40,1000&display', '9..40,800;9..40,900;9..40,1000&display')
tail = re.sub(r'\s*<ul class="text negreta"><li>Linkedin</li><li>Instagram</li><li>Ca / es</li></ul>', '', tail)
head = head.replace('grid-template-columns:1.4fr 1fr 1fr;gap:32px;border-top:1px solid var(--line)', 'grid-template-columns:1.4fr 1fr;gap:32px;border-top:1px solid var(--line)')
tail = tail.replace('<p class="text">Xavi Colomé · Barcelona<br>', '<p class="text">Xavi Colomé<br>')
tail = tail.replace('necessita la teva empresa', 'necessita el teu negoci')
tail = tail.replace('<li>Com ho fem</li>', '<li>Serveis</li>')
head = head.replace('>Com ho fem</a>', '>Serveis</a>')
tail = re.sub(r'<p class="text">Xavi Colomé(?: · Barcelona)?<br>xavi@emoloc.com</p>', '', tail)  # sense nom ni correu al peu
tail = tail.replace('<span>Avís legal</span><span>Política de privacitat</span><span>Galetes</span>', '<a href="../avis-legal.html">Avís legal</a><a href="../privacitat.html">Política de privacitat</a><a href="../galetes.html">Galetes</a>')
tail = tail.replace('<p class="text suau">La transformació digital', '<p class="text">La transformació digital')
head = head.replace('<meta name="description" content="Articles curts per a qui té un negoci i no té departament digital: web, gestió, venda en línia i comunicació. Sense argot i amb què fer demà al matí.">', '<meta name="description" content="Articles curts per entendre què pot aportar la transformació digital al teu negoci.">').replace('<meta property="og:description" content="Articles curts per a qui té un negoci i no té departament digital.">', '<meta property="og:description" content="Articles curts per entendre què pot aportar la transformació digital al teu negoci.">')
head = head.replace('.suau{color:var(--muted)}', '.suau{color:inherit}')
# --- mòbil: Text a 1.5 (sense el 1.3 antic); Subtitular mòbil 28 ---
head = head.replace('@media (max-width:820px){.text{line-height:1.3}}', '@media (max-width:820px){.subtitular{font-size:28px}}')
# --- Subtitular a 1.0; Text Bold i Petit Bold amb espaiat −2 % ---
head = head.replace('.subtitular{font-size:clamp(28px,4vw,40px);line-height:1.1;font-weight:1000;letter-spacing:-.015em;text-wrap:balance}', '.subtitular{font-size:clamp(28px,4vw,40px);line-height:1;font-weight:1000;letter-spacing:-.015em;text-wrap:balance}')
head = head.replace('.card h3{font-size:18px;font-weight:800;letter-spacing:0;line-height:1.3;margin:6px 0 8px}', '.card h3{font-size:19px;font-weight:800;letter-spacing:-.04em;line-height:1.3;margin:6px 0 8px}')
head = head.replace('.art .body h2{font-size:18px;font-weight:800;letter-spacing:0;line-height:1.3;margin:36px 0 10px}', '.art .body h2{font-size:19px;font-weight:800;letter-spacing:-.04em;line-height:1.3;margin:36px 0 10px}')
head = head.replace('.art .body strong{font-weight:800}', '.art .body strong{font-weight:800;letter-spacing:-.04em}')
head = head.replace('.text-bold{font-size:18px;line-height:1.3;font-weight:800} .petit-bold{font-size:14px;line-height:1.5;font-weight:800} .negreta{font-weight:800}', '.text-bold{font-size:19px;line-height:1.3;font-weight:800;letter-spacing:-.04em} .petit-bold{font-size:15px;line-height:1.5;font-weight:800;letter-spacing:-.02em} .negreta{font-weight:800;letter-spacing:-.04em} .petit.negreta,.petit .negreta{letter-spacing:-.02em}')
# --- pesos definitius: Text 18/1.3 Regular 300 i Bold 800; Petit 14/1.5 Regular 300 i Bold 800 ---
for f in ['family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,800;9..40,900;9..40,1000']: head = head.replace(f, 'family=DM+Sans:opsz,wght@9..40,200..1000')
head = head.replace('.text{font-size:18px;line-height:1.6;font-weight:400}', '.text{font-size:18px;line-height:1.5;font-weight:300}')
head = head.replace('.petit{font-size:14px;line-height:1.5;font-weight:400}', '.petit{font-size:14px;line-height:1.5;font-weight:300}')
head = head.replace('.negreta{font-weight:600}', '.negreta{font-weight:800}').replace('.negreta{font-weight:800}', '.text-bold{font-size:18px;line-height:1.3;font-weight:800} .petit-bold{font-size:14px;line-height:1.5;font-weight:800} .negreta{font-weight:800}') if '.text-bold{' not in head else head
head = head.replace('.topnav ul{display:flex;gap:28px;font-weight:400;font-size:18px}', '.topnav ul{display:flex;gap:28px;font-weight:300;font-size:18px}')
head = head.replace('font-weight:400;font-size:18px;line-height:1;transition:transform var(--t-fast) var(--ease)}', 'font-weight:300;font-size:18px;line-height:1;transition:transform var(--t-fast) var(--ease)}')
head = head.replace('  .link{font-weight:400;text-decoration:underline;text-underline-offset:3px}', '  .link{font-weight:300;text-decoration:underline;text-underline-offset:3px}')
head = head.replace('.filters button{font:inherit;font-weight:400;font-size:18px;', '.filters button{font:inherit;font-weight:300;font-size:18px;')
head = head.replace('.card h3{font-size:18px;font-weight:600;letter-spacing:0;line-height:1.6;margin:6px 0 8px}', '.card h3{font-size:18px;font-weight:800;letter-spacing:0;line-height:1.3;margin:6px 0 8px}')
head = head.replace('.art .lead{margin-top:20px;font-size:18px;line-height:1.6}', '.art .lead{margin-top:20px;font-size:18px;line-height:1.5;font-weight:300}')
head = head.replace('.art .body p{font-size:18px;line-height:1.6;margin-bottom:20px}', '.art .body p{font-size:18px;line-height:1.5;font-weight:300;margin-bottom:18px}')
head = head.replace('.art .body h2{font-size:18px;font-weight:600;letter-spacing:0;line-height:1.6;margin:40px 0 10px}', '.art .body h2{font-size:18px;font-weight:800;letter-spacing:0;line-height:1.3;margin:36px 0 10px}')
head = head.replace('.art .body li{font-size:18px;line-height:1.6;', '.art .body li{font-size:18px;line-height:1.5;font-weight:300;')
head = head.replace('.art .body strong{font-weight:600}', '.art .body strong{font-weight:800}')
head = head.replace('.topnav .parlem{padding:10px 18px;border-radius:var(--r-pill);background:var(--accent);color:var(--on-accent);font-weight:600;font-size:16px}', '.topnav .parlem{padding:10px 18px;border-radius:var(--r-pill);background:var(--accent);color:var(--on-accent);font-weight:300;font-size:18px}')
# --- quatre estils: Titular 72 (només a l'inici del web), Subtitular 40, Text 18 (Regular/Bold), Petit 14 (Regular/Bold) ---
head = head.replace('.text{font-size:20px;line-height:1.6;font-weight:400}', '.text{font-size:18px;line-height:1.6;font-weight:400}')
head = head.replace('.topnav ul{display:flex;gap:28px;font-weight:600;font-size:16px}', '.topnav ul{display:flex;gap:28px;font-weight:400;font-size:18px}')
head = head.replace('font-weight:600;font-size:20px;line-height:1;transition:transform var(--t-fast) var(--ease)}', 'font-weight:400;font-size:18px;line-height:1;transition:transform var(--t-fast) var(--ease)}')
head = head.replace('  .link{font-weight:600}', '  .link{font-weight:400;text-decoration:underline;text-underline-offset:3px}')
head = head.replace('.filters button{font:inherit;font-weight:600;font-size:20px;', '.filters button{font:inherit;font-weight:400;font-size:18px;')
head = head.replace('.card h3{font-size:clamp(24px,2.4vw,30px);font-weight:1000;letter-spacing:-.015em;line-height:1.1;margin:10px 0 12px}', '.card h3{font-size:18px;font-weight:600;letter-spacing:0;line-height:1.6;margin:6px 0 8px}')
head = head.replace('.art .lead{margin-top:24px;font-size:clamp(22px,2.2vw,26px);line-height:1.4}', '.art .lead{margin-top:20px;font-size:18px;line-height:1.6}')
head = head.replace('.art .body p{font-size:20px;line-height:1.55;margin-bottom:22px}', '.art .body p{font-size:18px;line-height:1.6;margin-bottom:20px}')
head = head.replace('.art .body h2{font-size:clamp(26px,3vw,32px);font-weight:1000;letter-spacing:-.015em;line-height:1.1;margin:48px 0 18px}', '.art .body h2{font-size:18px;font-weight:600;letter-spacing:0;line-height:1.6;margin:40px 0 10px}')
head = head.replace('.art .body li{font-size:20px;line-height:1.55;', '.art .body li{font-size:18px;line-height:1.6;')
head = head.replace('.art header{max-width:860px}', '.art header{max-width:860px} .art header .subtitular{margin-top:12px}')
tail = tail.replace('<ul class="text negreta"><li>Inici</li>', '<ul class="text"><li>Inici</li>')
head = re.sub(r'<a class="parlem" href="[^"]*">Parlem</a>', '', head)  # sense botó Parlem, com a la portada.replace('.art .lead{margin-top:24px;font-size:clamp(22px,2.2vw,26px);line-height:1.4;color:var(--muted)}', '.art .lead{margin-top:24px;font-size:clamp(22px,2.2vw,26px);line-height:1.4}')
head = head.replace('.card{border-top:2px solid var(--ink);padding:20px 0 8px;', '.card{padding:0 0 8px;display:flex;flex-direction:column;align-items:stretch;').replace('  .card .text{margin-bottom:16px}\n', '  .card .text{margin-bottom:16px} .card .btn{align-self:flex-start;margin-top:auto}\n')  # sense ratlles negres; botons al mateix peu
if '.btn.sec{' not in head:
    head = head.replace('  .link{font-weight:600}\n', '  .link{font-weight:600}\n  .btn.sec{background:var(--paper);color:var(--ink);box-shadow:inset 0 0 0 1px var(--line)} .btn.sec:hover{box-shadow:inset 0 0 0 1px var(--ink)}\n')  # botó secundari, com a la portada.replace('.text{font-size:20px;line-height:1.55;font-weight:400}', '.text{font-size:20px;line-height:1.6;font-weight:400}')  # text sempre en tinta, Text 20/1.6
# head meta (idempotent)
if '<link rel="canonical"' not in head:
    head = head.replace('<title>emoloc blog</title>', """<title>Blog · emoloc</title>
<meta name="description" content="Articles curts per entendre què pot aportar la transformació digital al teu negoci.">
<link rel="canonical" href="https://emoloc.com/blog/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="emoloc">
<meta property="og:title" content="Blog · emoloc">
<meta property="og:description" content="Articles curts per entendre què pot aportar la transformació digital al teu negoci.">
<meta property="og:url" content="https://emoloc.com/blog/">
<meta property="og:image" content="https://emoloc.com/assets/og.jpg">
<meta property="og:locale" content="ca_ES">
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">""")
# CSS for thumbs / hero (idempotent)
css = '''  .card .thumb{display:block;aspect-ratio:3/2;border-radius:12px;overflow:hidden;margin-bottom:14px;background:var(--surface)} .card .thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform var(--t-slow) var(--ease)} .card:hover .thumb img{transform:scale(1.04)}
  .art .hero{margin-top:40px;border-radius:var(--r-m);overflow:hidden;aspect-ratio:21/9;max-width:1120px} .art .hero img{width:100%;height:100%;object-fit:cover;display:block}
  @media (max-width:820px){.art .hero{aspect-ratio:3/2;margin-top:24px}}
'''
if '.card .thumb{' not in head:
    head = head.replace('  .card.hide{display:none}\n', '  .card.hide{display:none}\n' + css)
# routing by slug
tail = tail.replace('''  const list = document.getElementById('list'), art = document.getElementById('art');''',
'''  const list = document.getElementById('list'), arts = [...document.querySelectorAll('.art')];''').replace(
'''    const isArt = location.hash.startsWith('#article');
    art.classList.toggle('on', isArt); list.classList.toggle('off', isArt);''',
'''    const slug = (location.hash.match(/^#article\\/([\\w-]+)/) || [])[1];
    const cur = arts.find(a => a.dataset.slug === slug); const isArt = !!cur;
    arts.forEach(a => a.classList.toggle('on', a === cur)); list.classList.toggle('off', isArt);''')
# --- normalització tipogràfica final (idempotent): els set estils, escriptori i mòbil ---
head = re.sub(r'\.text\{font-size:\d+px;line-height:[\d.]+;font-weight:\d+\}', '.text{font-size:18px;line-height:1.5;font-weight:300}', head)
head = re.sub(r'\.text-bold\{[^}]*\}', '.text-bold{font-size:19px;line-height:1.3;font-weight:800;letter-spacing:-.04em}', head)
head = re.sub(r'\.card h3\{[^}]*\}', '.card h3{font-size:19px;font-weight:800;letter-spacing:-.04em;line-height:1.3;margin:6px 0 8px}', head)
head = re.sub(r'\.art \.body h2\{[^}]*\}', '.art .body h2{font-size:19px;font-weight:800;letter-spacing:-.04em;line-height:1.3;margin:36px 0 10px}', head)
head = re.sub(r'\.art \.lead\{[^}]*\}', '.art .lead{margin-top:20px;font-size:18px;line-height:1.5;font-weight:300}', head)
head = re.sub(r'\.art \.body p\{[^}]*\}', '.art .body p{font-size:18px;line-height:1.5;font-weight:300;margin-bottom:18px}', head)
head = re.sub(r'\.art \.body li\{font-size:\d+px;line-height:[\d.]+;(?:font-weight:\d+;)?', '.art .body li{font-size:18px;line-height:1.5;font-weight:300;', head)
MOB = ('@media (max-width:820px){.subtitular{font-size:29px;letter-spacing:-.04em} '
       '.text,.topnav ul,.btn,.filters button,.art .lead,.art .body p,.art .body li,.cta .text{font-size:20px} '
       '.text,.art .lead,.art .body p,.art .body li{line-height:1.3} '
       '.text-bold,.card h3,.art .body h2{font-size:21px}} /* Tipografia mòbil: Subtitular 29 / −4 %; Text 20 / 1.3; Text Bold 21 */')
head = re.sub(r'[ \t]*@media \(max-width:820px\)\{\.subtitular\{font-size:2[89]px[^\n]*\n', '', head)  # fora la línia antiga
head = head.replace('</style>', '  ' + MOB + '\n</style>', 1)  # al final del CSS perquè guanyi a les regles d'escriptori
open(OUT, 'w', encoding='utf-8').write(head + main + tail)
print('ok', len(arts), 'articles')
