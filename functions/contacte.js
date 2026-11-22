// Formulari de contacte → correu a xavi@emoloc.com, enviat amb Resend des de Cloudflare Pages.
// Cal la variable secreta RESEND_API_KEY al projecte de Pages (Settings → Variables and Secrets).
// Opcionals: CONTACTE_A (destinatari) i CONTACTE_DE (remitent, en un domini verificat a Resend).
const net = v => String(v ?? '').replace(/[\r\n]/g, ' ').trim();
const json = (ok, status = 200) => new Response(JSON.stringify({ ok }), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export async function onRequestPost({ request, env }) {
  let form;
  try { form = await request.formData(); } catch (_) { return json(false, 400); }
  const nom = net(form.get('nom')).slice(0, 120), empresa = net(form.get('empresa')).slice(0, 120);
  const email = net(form.get('email')).slice(0, 160), telefon = net(form.get('telefon')).slice(0, 40);
  const missatge = String(form.get('missatge') ?? '').trim().slice(0, 4000);
  const priv = form.get('privacitat') === '1', honeypot = net(form.get('web')), torn = parseInt(form.get('torn') ?? '0', 10) || 0;

  // anti-spam: honeypot ple o formulari enviat en menys de 3 segons = bot
  if (honeypot !== '' || torn < 3 || !nom || !missatge || !priv || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(false);
  if (!env.RESEND_API_KEY) return json(false, 500);

  const a = env.CONTACTE_A || 'xavi@emoloc.com', de = env.CONTACTE_DE || 'Web xavicolome.com <web@xavicolome.com>';
  const cos = `Nou missatge del formulari de contacte de xavicolome.com\n\nNom: ${nom}\nEmpresa: ${empresa}\nEmail: ${email}\nTelèfon: ${telefon || '-'}\n\nMissatge:\n${missatge}\n`;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: de, to: [a], reply_to: `${nom} <${email}>`, subject: `Consulta web: ${nom}${empresa ? ` (${empresa})` : ''}`, text: cos }),
  });
  return json(r.ok, r.ok ? 200 : 502);
}

export const onRequest = ({ request }) => request.method === 'POST' ? undefined : json(false, 405); // només POST
