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
    y, mo = meta['data'].split('-')
    arts.append(dict(num=num, slug=slug, titol=cap(meta['títol']), pilar=cap(meta['pilar']), entradeta=meta['entradeta'],
                     data='%s %s' % (MESOS[mo], y), img=MEDIA + IMG[num], html=md2html(body), minuts=max(2, round(words / 200))))

def card(a, full=True):
    t = '<p class="text suau">%s</p>' % html.escape(a['entradeta'], quote=False) if full else ''
    return ('<article class="card%s" data-pilar="%s"><a class="thumb" href="#article/%s"><img src="%s" alt="" loading="lazy"></a>'
            '<p class="petit suau">%s · %s</p><h3>%s</h3>%s<a class="link" href="#article/%s">Llegir l\'article</a></article>'
            % (' reveal' if full else '', a['pilar'], a['slug'], a['img'], a['data'], a['pilar'], html.escape(a['titol'], quote=False), t, a['slug']))

filters = ''.join('<button%s data-f="%s">%s</button>' % (' class="on"' if i == 0 else '', f, f) for i, f in enumerate(['Tots', 'Presència', 'Gestió', 'Venda', 'Comunicació']))
lst = '''  <section class="list" id="list">
    <div class="head"><h1 class="titular">Blog</h1><p class="text suau">Articles curts per a qui té una empresa i no té departament digital. Responen preguntes reals, sense argot, i acaben sempre amb què pots fer demà al matí.</p></div>
    <div class="filters" id="filters">%s</div>
    <div class="grid" id="grid">
      %s
    </div>
  </section>
''' % (filters, '\n      '.join(card(a) for a in arts))

def art(a):
    others = [b for b in arts if b is not a][:3]
    return '''  <section class="art" data-slug="%s">
    <p><a class="link" href="#">Tots els articles</a></p>
    <header style="margin-top:40px"><p class="petit suau">%s · %s</p><h1 class="titular" style="margin-top:12px">%s</h1><p class="lead">%s</p><div class="meta text negreta suau"><span>Xavi Colomé</span><span>·</span><span>%d minuts de lectura</span><span>·</span><span>Ca / es</span></div></header>
    <div class="hero"><img src="%s" alt=""></div>
    <div class="body">
%s
    </div>
    <div class="cta"><div><p class="subtitular" style="font-size:28px">Tens un projecte al cap?</p><p class="text suau" style="margin-top:8px">La primera conversa és sense compromís i serveix per saber si tinc sentit per al que necessites.</p></div><a class="btn" href="../#contacte">Parlem</a></div>
    <div class="more"><p class="subtitular" style="font-size:28px;margin-bottom:8px">Més articles</p><div class="grid">
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
       '<li><a href="../#zero">Inici</a></li><li><a href="../#quefem">Serveis</a></li>'
       '<li><a href="../#presencia">Com ho fem</a></li><li><a href="../#qui">Sobre mi</a></li>'
       '<li><a href="../#projectes">Projectes</a></li><li class="on"><a href="#">Blog</a></li>'
       '<li><a href="../#contacte">Contacte</a></li></ul><a class="parlem" href="../#contacte">Parlem</a></nav>')
head = re.sub(r'<nav class="topnav">.*?</nav>', NAV, head, flags=re.S)
tail = re.sub(r'<ul class="text negreta"><li>Inici</li>.*?</ul>', '<ul class="text negreta"><li>Inici</li><li>Serveis</li><li>Com ho fem</li><li>Sobre mi</li><li>Projectes</li><li>Blog</li><li>Contacte</li></ul>', tail, count=1, flags=re.S)
head = head.replace('.topnav ul .on{border-bottom:2px solid var(--accent)}', '.topnav ul .on{color:var(--accent)}')
head = head.replace('.link{font-weight:600;border-bottom:2px solid var(--accent);padding-bottom:2px}', '.link{font-weight:600}')
head = head.replace('.emoloc{font-weight:800;letter-spacing:.04em;', '.emoloc{font-weight:800;letter-spacing:0;').replace('.emoloc{font-weight:800;letter-spacing:.01em;', '.emoloc{font-weight:800;letter-spacing:0;')
head = head.replace('.emoloc{font-weight:800;letter-spacing:0;', '.emoloc{font-weight:900;letter-spacing:0;').replace('9..40,800;9..40,1000&display', '9..40,800;9..40,900;9..40,1000&display')
tail = re.sub(r'\s*<ul class="text negreta"><li>Linkedin</li><li>Instagram</li><li>Ca / es</li></ul>', '', tail)
head = head.replace('grid-template-columns:1.4fr 1fr 1fr;gap:32px;border-top:1px solid var(--line)', 'grid-template-columns:1.4fr 1fr;gap:32px;border-top:1px solid var(--line)')
tail = tail.replace('<p class="text">Xavi Colomé · Barcelona<br>', '<p class="text">Xavi Colomé<br>')
tail = tail.replace('necessita la teva empresa', 'necessita el teu negoci')
# head meta (idempotent)
if '<link rel="canonical"' not in head:
    head = head.replace('<title>emoloc blog</title>', """<title>Blog · emoloc</title>
<meta name="description" content="Articles curts per a qui té una empresa i no té departament digital: web, gestió, venda en línia i comunicació. Sense argot i amb què fer demà al matí.">
<link rel="canonical" href="https://emoloc.com/blog/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="emoloc">
<meta property="og:title" content="Blog · emoloc">
<meta property="og:description" content="Articles curts per a qui té una empresa i no té departament digital.">
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
open(OUT, 'w', encoding='utf-8').write(head + main + tail)
print('ok', len(arts), 'articles')
