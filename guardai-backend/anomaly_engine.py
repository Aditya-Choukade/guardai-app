import json
import os
import re
from typing import Dict, Any, List
from openai import AsyncOpenAI
from models import AnomalyVerdict

# Ensure API key is loaded
token = os.environ.get("GITHUB_TOKEN")
endpoint = "https://models.github.ai/inference"
model_name = "openai/gpt-4o-mini"

client = AsyncOpenAI(
    base_url=endpoint,
    api_key=token,
)

SYSTEM_PROMPT = """You are an anomaly detection engine specializing in Indian
digital scam patterns: UPI fraud, fake KYC, phishing via
WhatsApp/SMS, prize scams, and bank impersonation.

You will receive a JSON object with:
  - "message": the text to analyze
  - "url_scan_results": array of VirusTotal/WHOIS results
                        for any URLs found in the message

Return ONLY a valid JSON object with this exact structure:
{
  "verdict": "Safe" | "Suspicious" | "Dangerous",
  "confidence": <float 0.0-1.0>,
  "explanation": "<2 sentences max. Cite the specific red flag.>",
  "flags": [<flag strings from allowed list only>],
  "action": "<what the user should do next>"
}

Allowed flags: otp_request, urgency_pressure, fake_sender,
suspicious_url, newly_registered_domain, prize_scam,
kyc_fraud, impersonation, malware_link

Rules:
- Dangerous = clear fraud intent OR confirmed malicious URL
- Suspicious = partial signals, not conclusive
- Safe = no threat signals; legitimate communication pattern
- Legitimate OTP from a known bank format → lean Safe
- Never return markdown. Return only valid JSON. No preamble.
"""

async def detect_anomalies_with_ai(message: str, url_scan_results: List[Dict[str, Any]]) -> AnomalyVerdict:
    payload = {
        "message": message,
        "url_scan_results": url_scan_results
    }
    
    try:
        response = await client.chat.completions.create(
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": json.dumps(payload)}
            ],
            model=model_name,
            temperature=0.1,
            max_tokens=512,
            response_format={ "type": "json_object" }
        )
        
        content = response.choices[0].message.content.strip()
        # Strip potential markdown fences just in case
        content = re.sub(r'^```json\s*', '', content)
        content = re.sub(r'\s*```$', '', content)
        
        parsed = json.loads(content)
        return AnomalyVerdict(**parsed)
    except Exception as e:
        # Generic fallback
        return AnomalyVerdict(
            verdict="Suspicious",
            confidence=0.5,
            explanation=f"Analysis failed due to an error: {str(e)}",
            flags=[],
            action="Exercise caution."
        )
