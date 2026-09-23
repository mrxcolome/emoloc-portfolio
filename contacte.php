<?php
// Formulari de contacte d'emoloc.com → xavi@emoloc.com
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }

// neteja per a valors que van a capçaleres (anti header-injection)
function neteja($v) { return trim(str_replace(["\r", "\n"], ' ', $v ?? '')); }

$nom      = mb_substr(neteja($_POST['nom'] ?? ''), 0, 120);
$empresa  = mb_substr(neteja($_POST['empresa'] ?? ''), 0, 120);
$email    = mb_substr(neteja($_POST['email'] ?? ''), 0, 160);
$telefon  = mb_substr(neteja($_POST['telefon'] ?? ''), 0, 40);
$missatge = mb_substr(trim($_POST['missatge'] ?? ''), 0, 4000);
$pilars   = array_slice(array_map('neteja', (array) ($_POST['p'] ?? [])), 0, 5);
$priv     = ($_POST['privacitat'] ?? '') === '1';
$honeypot = $_POST['web'] ?? '';
$torn     = (int) ($_POST['torn'] ?? 0);

// anti-spam: honeypot ple o formulari enviat en menys de 3 segons = bot
if ($honeypot !== '' || $torn < 3 || $nom === '' || $missatge === '' || !$priv || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo '{"ok":false}';
    exit;
}

$noms = ['presencia' => 'presència', 'gestio' => 'gestió', 'venda' => 'venda', 'comunicacio' => 'comunicació', 'nose' => 'no ho sap'];
$pil = implode(', ', array_map(fn($k) => $noms[$k] ?? $k, $pilars));

$cos = "Nou missatge del formulari de contacte d'emoloc.com\n\n"
     . "Nom: $nom\n"
     . "Empresa: $empresa\n"
     . "Email: $email\n"
     . "Telèfon: " . ($telefon !== '' ? $telefon : '-') . "\n"
     . "On li fa mal: " . ($pil !== '' ? $pil : '-') . "\n\n"
     . "Missatge:\n$missatge\n";

$capceleres = "From: Web emoloc.com <xavi@emoloc.com>\r\n"
            . 'Reply-To: ' . mb_encode_mimeheader($nom, 'UTF-8') . " <$email>\r\n"
            . "Content-Type: text/plain; charset=utf-8\r\n"
            . "Content-Transfer-Encoding: 8bit\r\n";

$assumpte = mb_encode_mimeheader("Consulta web: $nom" . ($empresa !== '' ? " ($empresa)" : ''), 'UTF-8');
$ok = mail('xavi@emoloc.com', $assumpte, $cos, $capceleres);
echo json_encode(['ok' => (bool) $ok]);
