<?php
/**
 * Mehar Importer & Exporter Co. — enquiry endpoint for Hostinger shared hosting.
 *
 * Validates and sanitizes the enquiry, blocks bots with a honeypot and basic
 * per-IP rate limiting, emails the owner, and replies with JSON. No database.
 *
 * If PHP mail() is unreliable on the host (Gmail often needs SPF/DKIM), swap the
 * send_mail() body for PHPMailer + SMTP, or point the form at Formspree instead.
 */

declare(strict_types=1);

// ── Settings ─────────────────────────────────────────────────────────────────
const RECIPIENT       = 'mehar.zaheer403@gmail.com'; // owner inbox
const SUBJECT_PREFIX  = 'Website enquiry';
const RATE_MAX        = 5;    // max submissions…
const RATE_WINDOW     = 600;  // …per this many seconds, per IP
const MAX_FIELD       = 4000;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void {
	http_response_code($status);
	echo json_encode($body);
	exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
	respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// ── Read input (JSON or form-encoded) ────────────────────────────────────────
$raw = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
	$data = $_POST;
}

function field(array $d, string $key): string {
	$v = isset($d[$key]) ? (string) $d[$key] : '';
	$v = trim($v);
	if (strlen($v) > MAX_FIELD) {
		$v = substr($v, 0, MAX_FIELD);
	}
	return $v;
}

// ── Honeypot: bots fill the hidden "website" field. Pretend success. ──────────
if (field($data, 'website') !== '') {
	respond(200, ['ok' => true]);
}

// ── Rate limit (file-based, per IP) ──────────────────────────────────────────
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip = trim(explode(',', $ip)[0]);
$rateFile = __DIR__ . '/.mehar_rate_' . substr(hash('sha256', $ip), 0, 24) . '.json';
$now = time();
$hits = [];
if (is_readable($rateFile)) {
	$decoded = json_decode((string) file_get_contents($rateFile), true);
	if (is_array($decoded)) {
		$hits = array_filter($decoded, static fn($t) => is_int($t) && ($now - $t) < RATE_WINDOW);
	}
}
if (count($hits) >= RATE_MAX) {
	respond(429, ['ok' => false, 'error' => 'Too many enquiries from this connection. Please try again later or message us on WhatsApp.']);
}

// ── Collect & validate ───────────────────────────────────────────────────────
$name     = field($data, 'name');
$email    = field($data, 'email');
$phone    = field($data, 'phone');
$company  = field($data, 'company');
$country  = field($data, 'country');
$product  = field($data, 'product');
$quantity = field($data, 'quantity');
$message  = field($data, 'message');

$errors = [];
if ($name === '')    $errors[] = 'name';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($product === '') $errors[] = 'product';
if ($message === '') $errors[] = 'message';

if ($errors) {
	respond(422, ['ok' => false, 'error' => 'Please complete the required fields.', 'fields' => $errors]);
}

// Strip CR/LF from header-bound values to prevent header injection.
$clean = static fn(string $v): string => str_replace(["\r", "\n", "%0a", "%0d"], ' ', $v);
$name  = $clean($name);
$email = $clean($email);

// ── Compose & send ───────────────────────────────────────────────────────────
$host = preg_replace('/[^a-z0-9.\-]/i', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$host = preg_replace('/^www\./', '', $host);
$fromAddress = 'no-reply@' . $host;

$subject = SUBJECT_PREFIX . ': ' . $product . ' — ' . $name;

$lines = [
	'New enquiry from the Mehar website',
	'===================================',
	'Name:        ' . $name,
	'Email:       ' . $email,
	'Phone:       ' . ($phone !== '' ? $phone : '—'),
	'Company:     ' . ($company !== '' ? $company : '—'),
	'Country:     ' . ($country !== '' ? $country : '—'),
	'Product(s):  ' . $product,
	'Quantity:    ' . ($quantity !== '' ? $quantity : '—'),
	'',
	'Message:',
	$message,
	'',
	'-----------------------------------',
	'Sent: ' . gmdate('Y-m-d H:i:s') . ' UTC',
	'IP:   ' . $ip,
];
$body = implode("\n", $lines);

$headers = [
	'From: Mehar Website <' . $fromAddress . '>',
	'Reply-To: ' . $name . ' <' . $email . '>',
	'MIME-Version: 1.0',
	'Content-Type: text/plain; charset=UTF-8',
	'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail(RECIPIENT, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$sent) {
	respond(500, ['ok' => false, 'error' => 'We couldn’t send your enquiry right now. Please message us on WhatsApp.']);
}

// Record the hit only on a successful send.
$hits[] = $now;
@file_put_contents($rateFile, json_encode(array_values($hits)), LOCK_EX);

respond(200, ['ok' => true]);
