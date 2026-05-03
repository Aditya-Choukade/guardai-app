<div align="center">

```
   ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗  █████╗ ██╗
  ██╔════╝ ██║   ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║
  ██║  ███╗██║   ██║███████║██████╔╝██║  ██║███████║██║
  ██║   ██║██║   ██║██╔══██║██╔══██╗██║  ██║██╔══██║██║
  ╚██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝██║  ██║██║
   ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝
```

**AI-powered cyber fraud detection that intercepts threats before they land.**

[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Claude](https://img.shields.io/badge/Claude-Sonnet_4-7F77DD?style=flat-square)](https://anthropic.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=google-chrome&logoColor=white)](https://developer.chrome.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Built for Antigravity Hackathon · Problem Statement: Cyber Safety & Fraud Detection Agent**

[Live Demo](#) · [API Docs](#api-reference) · [Business Model](guardai-business-model.html) · [Backend PRD](GuardAI_Backend_PRD.docx)

</div>

---

## The Problem

India loses **₹1,700 crore annually** to cyber fraud. WhatsApp forwards, fake UPI alerts, phishing SMS — 3.4 billion fraudulent messages hit Indian users every day. Existing tools fail on two counts:

1. **Detection gap** — URL scanners only catch known threats by hash. They miss novel phishing domains, WhatsApp text-only attacks, and regional-language fraud with no URL.
2. **Explanation gap** — Even when a tool detects a threat, it returns a binary result ("Suspicious — 3/72 engines flagged") that 600M+ vernacular internet users cannot act on.

GuardAI solves both. It detects. It explains. And critically — **it intercepts before the user clicks**.

---

## What Makes GuardAI Different

### The Core USP — Proactive Link Interception

> Every competitor makes users bring the threat to the tool. GuardAI stands between the user and the threat automatically.

When a user clicks any link on any webpage, the Chrome extension intercepts the click, scans the URL in real time via Claude AI, and shows a full-page warning overlay **before the malicious page loads** — exactly like Chrome's built-in phishing warning, but powered by AI and specific about *why* the link is dangerous.

```
User clicks link  →  GuardAI intercepts  →  Claude analyzes (300–800ms)
                                              ↓
                              Safe? → Navigate normally (zero friction)
                              Suspicious/Dangerous? → Warning overlay with
                                                       explanation + action
```

### Three Defensible Advantages

| USP | What it means | Why competitors can't copy it |
|-----|--------------|-------------------------------|
| **Proactive interception** | Passive shield — requires zero user effort | Requires extension + real-time API + <5s latency. Hard to match without the infra. |
| **Explainable AI verdicts** | "This message asks for your OTP — no real bank ever does this" vs "14/72 flagged" | Claude's reasoning quality. Fine-tuning on Indian scam corpus takes months of data. |
| **Multi-signal fusion** | Message content + URL reputation + domain age → one verdict | Single-prompt architecture sends all signals to Claude simultaneously, not separately. |

---

## Features

### Core Analyzer
- **Paste-and-check web UI** — paste any SMS, WhatsApp forward, or email snippet and get a verdict in under 5 seconds
- **Three-class verdict engine** — `Safe` / `Suspicious` / `Dangerous` with confidence score (0–100%)
- **Specific explanation** — Claude cites the exact red flag ("This message requests an OTP — no legitimate bank does this")
- **Structured threat flags** — `otp_request` · `urgency_pressure` · `fake_sender` · `suspicious_url` · `prize_scam` · `kyc_fraud` · `impersonation` · `malware_link`
- **Actionable next step** — "Block this sender and report at cybercrime.gov.in"

### URL Intelligence
- **Auto URL extraction** — regex scans pasted text for embedded links, no manual input needed
- **VirusTotal integration** — 72+ antivirus engine lookup per URL
- **WHOIS domain age check** — domains registered < 30 days flagged automatically
- **Claude fallback** — if VirusTotal returns no data, Claude reasons about URL structure independently

### Chrome Extension
- **Right-click analyzer** — select any text on any page → "Check with GuardAI" → verdict popup
- **Live link interceptor (USP)** — automatically intercepts every link click, scans in background, proceeds if safe, warns if dangerous
- **Full-page warning overlay** — verdict badge, plain-English explanation, threat flags, "Go back" / "Proceed anyway" buttons
- **Fail-open design** — if the API is unreachable, navigation proceeds normally; never blocks the user on error

### Demo Experience
- **Three example chips** — "Fake UPI Alert", "Prize Scam", "Phishing URL" — pre-fill the analyzer for judge demos without needing a real scam message
- **`GET /health`** — live backend status endpoint judges can hit to verify the stack is running

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER LAYER                        │
│  ┌──────────────────┐          ┌────────────────────────┐   │
│  │   React SPA      │          │   Chrome Extension     │   │
│  │  (Vite + Tailwind│          │  manifest.json         │   │
│  │  Analyzer.jsx    │          │  background.js         │   │
│  │  VerdictCard.jsx │          │  content.js  ← USP     │   │
│  │  FlagChips.jsx   │          │  popup.html            │   │
│  └────────┬─────────┘          └───────────┬────────────┘   │
└───────────┼────────────────────────────────┼────────────────┘
            │  POST /analyze                 │  POST /analyze/url
            ▼                                ▼
┌─────────────────────────────────────────────────────────────┐
│                       BACKEND LAYER                         │
│                      FastAPI (Python)                       │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  main.py    │  │ classifier.py│  │  url_scanner.py  │   │
│  │  Routes     │  │ Claude prompt│  │  VirusTotal API  │   │
│  │  CORS       │  │ Verdict JSON │  │  WHOIS lookup    │   │
│  │  Validation │  │ Flag taxonomy│  │  Domain age      │   │
│  └──────┬──────┘  └──────┬───────┘  └────────┬─────────┘   │
│         │                │                    │             │
│         └────────────────┴────────────────────┘             │
│                          │                                  │
│               asyncio.gather() — parallel                   │
└──────────────────────────┼──────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            ▼                             ▼
   ┌─────────────────┐          ┌──────────────────┐
   │  Anthropic API  │          │  VirusTotal API  │
   │  Claude Sonnet  │          │  (free tier)     │
   │  claude-sonnet  │          │  + python-whois  │
   │  -4-20250514    │          │  (no key needed) │
   └─────────────────┘          └──────────────────┘
```

### Request Processing Order

Every `POST /analyze` call runs this sequence internally:

```
1. Input validation   → reject empty, strip whitespace, enforce 4000-char max
2. URL extraction     → regex scan for all http/https URLs in message text
3. Parallel intel     → asyncio.gather(virustotal_scan, whois_lookup) per URL
4. Unified Claude     → send message text + all URL scan results in ONE prompt
5. Response assembly  → merge Claude JSON + raw URL data into final shape
6. Return             → within 5s SLA, include processing_ms
```

**Why one Claude call for everything:** Claude sees message content + URL reputation + domain age simultaneously. A 3-day-old domain + urgency language + OTP request = `Dangerous` — even when each signal alone would only be `Suspicious`. Separate calls lose this reasoning.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| AI brain | Claude Sonnet 4 (`claude-sonnet-4-20250514`) | Best accuracy on ambiguous threat signals; structured JSON output; Indian fraud pattern knowledge |
| Backend | FastAPI 0.111 (Python 3.11) | Async-native; auto OpenAPI docs; zero config; demo-ready |
| URL intel | VirusTotal free API | 72+ antivirus engines; free tier sufficient for demo volume |
| Domain check | python-whois | Domain age < 30 days flagged; no API key needed |
| HTTP client | httpx (async) | Parallel VirusTotal + WHOIS without blocking |
| Validation | Pydantic v2 | Strict type enforcement; clean 422 error messages |
| Frontend | React 18 + Tailwind via Vite | Single-page; mobile-responsive; fast dev loop |
| Extension | Chrome Manifest V3 | Modern extension standard; service worker architecture |
| Deploy | Railway (backend) + Vercel (frontend) | Zero-config; free tier; live HTTPS URL for judges |
| Dev tool | GitHub Copilot | Used throughout for boilerplate, schemas, regex, and API wiring |

---

## Project Structure

```
guardai/
├── backend/
│   ├── main.py                  # FastAPI app, routes, CORS
│   ├── models.py                # Pydantic request/response schemas
│   ├── classifier.py            # Claude prompt architecture + verdict parsing
│   ├── url_scanner.py           # VirusTotal + WHOIS integration
│   ├── cache.py                 # In-memory URL result cache (15-min TTL)
│   ├── examples.py              # Hardcoded demo example data
│   ├── tests/
│   │   ├── corpus.json          # 20 labelled scam test messages
│   │   └── validate.py          # Accuracy checker — run before UI work
│   ├── requirements.txt
│   └── .env                     # ANTHROPIC_API_KEY, VIRUSTOTAL_API_KEY
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Analyzer.jsx         # Textarea + analyze button + example chips
│   │   ├── VerdictCard.jsx      # Safe/Suspicious/Dangerous verdict display
│   │   ├── FlagChips.jsx        # Threat flag tag rendering
│   │   └── api.js               # fetch wrapper for /analyze
│   ├── public/
│   └── package.json
│
├── extension/
│   ├── manifest.json            # Manifest V3, permissions, host_permissions
│   ├── background.js            # Context menu + API call + storage
│   ├── content.js               # Link interceptor (USP) + text highlight
│   ├── popup.html               # Verdict popup UI (self-contained)
│   └── icons/                   # 16px, 48px, 128px shield icons
│
├── demo/
│   ├── script.md                # 3-minute demo walkthrough
│   └── fallback.mp4             # Recorded backup if live demo fails
│
└── README.md
```

---

## API Reference

**Base URL:** `https://api.guardai.app` · **Local:** `http://localhost:8000`

### `POST /analyze`

The single endpoint everything calls. Accepts message text, extracts URLs, runs parallel intel, calls Claude once with all signals, returns unified verdict.

**Request**
```json
{
  "text": "Congratulations! You won Rs 50,000. Click http://icici-kyc-verify.xyz to claim."
}
```

**Response — Dangerous**
```json
{
  "verdict": "Dangerous",
  "confidence": 0.96,
  "explanation": "This message claims you won a prize and requests action via a link — a classic advance-fee scam. The linked domain was registered 3 days ago and flagged by 14 antivirus engines.",
  "flags": ["prize_scam", "suspicious_url", "urgency_pressure", "newly_registered_domain"],
  "urls_found": [
    {
      "url": "http://icici-kyc-verify.xyz",
      "virustotal_score": "14/72",
      "domain_age_days": 3,
      "url_verdict": "Dangerous"
    }
  ],
  "action": "Do not click any links. Block this sender. Report at cybercrime.gov.in",
  "processing_ms": 1840
}
```

**Response — Safe**
```json
{
  "verdict": "Safe",
  "confidence": 0.91,
  "explanation": "This appears to be a standard OTP from a known bank sender pattern. No suspicious links, no OTP requests from third parties, no urgency pressure.",
  "flags": [],
  "urls_found": [],
  "action": "No action needed. This message looks legitimate.",
  "processing_ms": 920
}
```

### `POST /analyze/url`

Standalone URL scanner. Called internally by `/analyze` and directly by the Chrome extension link interceptor.

```json
// Request
{ "url": "http://sbi-kyc-portal.xyz" }

// Response
{
  "url": "http://sbi-kyc-portal.xyz",
  "verdict": "Dangerous",
  "virustotal_score": "9/72",
  "domain_age_days": 7,
  "registrar": "NameCheap",
  "flags": ["suspicious_url", "newly_registered_domain"],
  "explanation": "Domain registered 7 days ago. Flagged by 9 antivirus engines."
}
```

### `GET /health`

Liveness check with dependency status. Show judges this endpoint during demo to prove the stack is live.

```json
{
  "status": "ok",
  "claude": "reachable",
  "virustotal": "reachable",
  "version": "1.0.0",
  "uptime_seconds": 3842
}
```

### `GET /examples`

Pre-built demo examples that power the home screen chips. Hardcoded on the backend so the frontend never needs updating.

```json
{
  "examples": [
    { "id": "fake_upi",    "label": "Fake UPI Alert", "text": "Your UPI is blocked. Verify at http://upi-verify-now.com or lose access." },
    { "id": "prize_scam",  "label": "Prize Scam",     "text": "You won Rs 1,00,000! Share OTP to claim prize." },
    { "id": "phishing_url","label": "Phishing URL",   "text": "KYC pending. Update now: http://sbi-kyc-portal.xyz" }
  ]
}
```

### Threat Flag Taxonomy

Claude returns flags from this fixed set only. Restricting to known values prevents Claude from inventing inconsistent labels.

| Flag | Trigger |
|------|---------|
| `otp_request` | Message asks for OTP, PIN, or password |
| `urgency_pressure` | Artificial time pressure ("act now", "expires today") |
| `fake_sender` | Impersonates a bank, government body, or known brand |
| `suspicious_url` | URL flagged by VirusTotal or has anomalous characteristics |
| `newly_registered_domain` | Domain registered within last 30 days |
| `prize_scam` | Claims user won a lottery, prize draw, or cashback |
| `kyc_fraud` | Falsely claims KYC verification is required or expired |
| `impersonation` | Pretends to be person of authority |
| `malware_link` | URL confirmed malicious by 5+ VirusTotal engines |

### Error Handling

All errors follow RFC 7807 Problem Details. VirusTotal 429 rate limits degrade silently to Claude-only verdict — never surface a rate limit error to the client.

| HTTP | Type | When |
|------|------|------|
| 400 | `invalid_input` | Empty text, text > 4000 chars |
| 422 | `validation_error` | Pydantic schema violation |
| 429 | `rate_limited` | VT limit hit — Claude-only fallback returned |
| 503 | `claude_unavailable` | Anthropic API unreachable |
| 500 | `internal_error` | Unexpected exception — safe fallback, full trace logged |

---

## Claude Prompt Architecture

The quality of every verdict depends entirely on this prompt. It was the first thing built and the last thing refined.

```
System:
You are a cyber-fraud detection expert specializing in Indian digital scam
patterns: UPI fraud, fake KYC, phishing via WhatsApp/SMS, prize scams,
and bank impersonation.

Given a JSON object with "message" and "url_scan_results", return ONLY
a valid JSON object:
{
  "verdict": "Safe" | "Suspicious" | "Dangerous",
  "confidence": 0.0–1.0,
  "explanation": "<2 sentences max. Cite the specific red flag.>",
  "flags": [<from allowed list only>],
  "action": "<what the user should do next>"
}

Rules:
- Dangerous = clear fraud intent OR confirmed malicious URL
- Suspicious = partial signals, not conclusive
- Safe = no threat signals; legitimate communication pattern
- Legitimate OTP from known bank format → lean Safe
- Never return markdown. Return only valid JSON. No preamble.
```

**Why this works:** Claude sees message text AND URL scan results in a single call. It can reason that "urgency language + newly registered domain + OTP request = Dangerous" even when each signal alone would only be Suspicious. This combined reasoning is the core intelligence advantage.

---

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- `ANTHROPIC_API_KEY` from [console.anthropic.com](https://console.anthropic.com)
- `VIRUSTOTAL_API_KEY` from [virustotal.com](https://virustotal.com) (free tier)

### 1. Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Add your API keys to .env:
#   ANTHROPIC_API_KEY=sk-ant-...
#   VIRUSTOTAL_API_KEY=...

# Run accuracy test on 20-message corpus BEFORE starting the server
python tests/validate.py
# Target: 85%+ accuracy. Fix prompt in classifier.py if below this.

# Start the server
uvicorn main:app --reload --port 8000
```

Server runs at `http://localhost:8000`. OpenAPI docs at `http://localhost:8000/docs`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

UI runs at `http://localhost:5173`. Calls backend at `http://localhost:8000` by default.

### 3. Chrome Extension

```bash
cd extension

# Generate icons (requires canvas package)
npm install canvas
node generate-icons.js
```

Load in Chrome:
1. Open `chrome://extensions`
2. Toggle **Developer mode** ON
3. Click **Load unpacked** → select `extension/` folder
4. Pin GuardAI from the extensions puzzle icon
5. Navigate to any page → right-click text → "Check with GuardAI"

### 4. Switch to Production Backend

In `extension/background.js` and `extension/content.js`:
```javascript
// Development
const API_BASE = "http://localhost:8000";

// Production — update this before the demo
const API_BASE = "https://api.guardai.app";
```

Also update `host_permissions` in `manifest.json` to include your production URL.

### Backend requirements.txt

```
fastapi==0.111.0
uvicorn[standard]==0.29.0
anthropic==0.26.0
httpx==0.27.0
python-whois==0.9.4
pydantic==2.7.0
python-dotenv==1.0.1
```

---

## Performance

| Metric | Target | Notes |
|--------|--------|-------|
| P95 response time | < 5 seconds | End-to-end including Claude call |
| URL scan parallelism | asyncio.gather() | VirusTotal + WHOIS run concurrently, not sequentially |
| Claude timeout | 8 seconds hard | Returns `Suspicious` fallback if exceeded |
| URL cache TTL | 15 minutes | In-memory, keyed by URL hash — prevents VT rate limits during demos |
| Max input | 4000 characters | 400 error above this |
| Concurrent requests | 10 | On Railway free tier |
| Classifier accuracy | > 92% precision | Measured on 20-message labelled corpus |
| False positive rate | < 1% | Legitimate OTPs must not be flagged as Dangerous |

---

## Test Corpus

Run `python tests/validate.py` before building any UI. If accuracy is below 85%, fix the prompt in `classifier.py` first.

| # | Message | Expected | Tests |
|---|---------|----------|-------|
| 1 | "Your UPI is blocked. Verify at http://upi-verify-now.com" | Dangerous | Urgency + URL |
| 2 | "You won Rs 1,00,000. Share OTP to claim prize." | Dangerous | Prize + OTP |
| 3 | "KYC expires today. Click http://sbi-kyc-portal.xyz" | Dangerous | KYC + new domain |
| 4 | "ICICI Bank: Your OTP is 847291. Do not share." | **Safe** | False positive check |
| 5 | "Hi, can we reschedule our meeting to 4pm?" | **Safe** | Normal message |
| 6 | "Your Amazon order has been dispatched. Track at amzn.in/track" | **Safe** | Legit brand URL |
| 7 | "HDFC lucky draw winner. Call 9876543210 to claim." | Dangerous | Prize + impersonation |
| 8 | "Your electricity bill of Rs 2340 is due. Pay at mahadiscom.in" | **Safe** | Legit bill notice |
| 9 | "FREE RECHARGE! Confirm your bank PIN to activate." | Dangerous | PIN request |
| 10 | "Income Tax: File ITR or face penalty. Visit incometax.gov.in" | Suspicious | Legit URL, urgency tone |

---

## Business Model (Summary)

| Tier | Price | Target | Revenue driver |
|------|-------|--------|----------------|
| Basic (Free) | ₹0/mo | Individual users | Conversion funnel, word-of-mouth |
| Guardian (Pro) | ₹199/mo | Power users, families | Core MRR, family sharing |
| Shield (Enterprise) | ₹4,999/mo | Banks, fintechs, telcos | API licensing, high LTV |

**Revenue streams (Year 2 mix):**
- 55% B2C subscriptions
- 30% B2B API licensing
- 10% Government / CERT-In contracts
- 5% Threat intelligence reports

**18-month target:** ₹45L MRR · 2,300 paying users · 10 enterprise clients

**The moat:** Proprietary India-specific scam corpus that grows with every user. Month 6 GuardAI sees fraud patterns that a new entrant's model never will.

---

## Hackathon Alignment

### Problem Statement Coverage

| PS Requirement | GuardAI Component | Status |
|---------------|-------------------|--------|
| Anomaly detection system | Claude classifier — detects deviations from normal message patterns | ✅ Core |
| Generate classifiers | 3-class verdict engine with 9-flag taxonomy, confidence scoring | ✅ Core |
| Browser / email tools | Chrome extension with right-click + live link interceptor | ✅ Built |
| Alert systems | Verdict card + full-page warning overlay + action CTA | ✅ Built |

### GitHub Copilot Usage

Copilot was the development tool used throughout the build:
- FastAPI boilerplate and route definitions
- Pydantic schema generation from JSON examples
- Regex URL extraction from message text
- asyncio.gather parallel call patterns
- React component scaffolding and state management
- Chrome extension manifest V3 service worker setup

---

## Demo Script (3 minutes)

**0:00 — Context (30s)**
> "India loses ₹1,700 crore to cyber fraud every year. 600 million users receive scam messages daily and can't tell what's dangerous. Existing tools only flag URLs — they miss WhatsApp text attacks entirely, and they never explain *why* something is dangerous."

**0:30 — Paste-and-check demo (45s)**
> Open the web UI. Tap "Fake UPI Alert" example chip. Hit Analyze.
> "Within 5 seconds — verdict, confidence score, the specific red flag, and what to do next."

**1:15 — The USP moment (60s)**
> Open a new browser tab. Navigate to any webpage. Click a planted phishing link.
> "Watch what happens."
> [GuardAI full-page overlay appears]
> "The user never reached the malicious site. GuardAI intercepted the click, analyzed the URL in real time, and showed exactly why it's dangerous — all before the page loaded. This is passive protection for people who don't know they need it."

**2:15 — Technical depth (30s)**
> Show the `/health` endpoint returning `claude: reachable`. Mention the 20-message test corpus and 92%+ accuracy.
> "We built the classifier before we wrote a single line of UI. Accuracy first, demo second."

**2:45 — Business case (15s)**
> "₹199/month Guardian plan. B2B API licensing to banks at ₹4,999/month. The moat is data — every scan makes the classifier smarter. Target: ₹45L MRR at month 18."

---

## Known Limitations & Mitigations

| Risk | Mitigation |
|------|-----------|
| VirusTotal rate limit (4 req/min free tier) | 15-min in-memory cache; silent fallback to Claude-only verdict on 429 |
| Claude API cold start | `/health` polling; warm instance before demo |
| Railway free tier spin-down | Ping cron on free tier; wake instance 5 min before demo |
| Claude returns malformed JSON | Strip markdown fences; retry once; fallback to `Suspicious` verdict |
| WHOIS lookup timeout | 2-second hard timeout; treat as `domain_age_days: null`; never fail request |
| False positives on legit OTPs | Corpus includes 5 legitimate OTP test cases; prompt explicitly instructs lean-Safe on known bank patterns |

---

## Contributing

This project was built during a hackathon. If you're extending it post-event:

1. Fork the repo
2. Run the test corpus first: `python tests/validate.py`
3. Any new scam patterns → add to `tests/corpus.json` with expected verdict
4. Prompt changes → re-run corpus before submitting PR
5. Never reduce corpus accuracy below 85%

---

## Team

Built at **Antigravity Hackathon** · Problem Statement: *Cyber Safety & Fraud Detection Agent*

**GitHub Copilot** was used as the development accelerator throughout the build session.

**Claude Sonnet 4** powers the intelligence layer — classification, explanation, and threat reasoning.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

**GuardAI** · Powered by Claude AI · Built with GitHub Copilot

*"Other tools tell you a message is dangerous. We tell you why — and stop you before you get there."*

</div>