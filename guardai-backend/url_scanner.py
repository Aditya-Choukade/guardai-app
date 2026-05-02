import os
import asyncio
import base64
import datetime
import httpx
import whois
from typing import Dict, Any, Tuple, Optional
from urllib.parse import urlparse

VIRUSTOTAL_API_KEY = os.environ.get("VIRUSTOTAL_API_KEY")
VT_API_URL = "https://www.virustotal.com/api/v3/urls"

def extract_urls(text: str) -> list[str]:
    import re
    # Basic URL extraction regex
    url_pattern = re.compile(r'https?://[^\s<>"]+|www\.[^\s<>"]+')
    return url_pattern.findall(text)

async def check_virustotal(url: str) -> Optional[str]:
    if not VIRUSTOTAL_API_KEY:
        return None
    
    url_id = base64.urlsafe_b64encode(url.encode()).decode().strip("=")
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{VT_API_URL}/{url_id}", headers=headers, timeout=5.0)
            
            if response.status_code == 429:
                return None # Rate limited, fail gracefully
                
            if response.status_code == 200:
                data = response.json()
                stats = data.get("data", {}).get("attributes", {}).get("last_analysis_stats", {})
                malicious = stats.get("malicious", 0)
                suspicious = stats.get("suspicious", 0)
                harmless = stats.get("harmless", 0)
                undetected = stats.get("undetected", 0)
                total = malicious + suspicious + harmless + undetected
                if total > 0:
                    return f"{malicious + suspicious}/{total}"
                return "0/0"
            return None
    except Exception:
        return None

def check_whois(url: str) -> Tuple[Optional[int], Optional[str]]:
    try:
        domain = urlparse(url).netloc
        if not domain:
            return None, None
            
        w = whois.whois(domain)
        creation_date = w.creation_date
        
        if isinstance(creation_date, list):
            creation_date = creation_date[0]
            
        domain_age_days = None
        if isinstance(creation_date, datetime.datetime):
            delta = datetime.datetime.now() - creation_date
            domain_age_days = delta.days
            
        registrar = w.registrar
        return domain_age_days, registrar
    except Exception:
        return None, None

async def scan_url(url: str) -> Dict[str, Any]:
    from cache import url_cache
    
    # Check cache
    cached = url_cache.get(url)
    if cached:
        return cached

    # Run VirusTotal and WHOIS in parallel
    vt_task = asyncio.create_task(check_virustotal(url))
    whois_task = asyncio.to_thread(check_whois, url) # WHOIS is blocking

    vt_score, (domain_age, registrar) = await asyncio.gather(vt_task, whois_task)

    # Determine URL verdict
    verdict = "Safe"
    flags = []
    
    if vt_score:
        parts = vt_score.split('/')
        if len(parts) == 2 and int(parts[0]) > 0:
            if int(parts[0]) >= 5:
                verdict = "Dangerous"
                flags.append("malicious_url")
            else:
                verdict = "Suspicious"
                flags.append("suspicious_url")

    if domain_age is not None and domain_age < 30:
        if verdict == "Safe":
            verdict = "Suspicious"
        flags.append("newly_registered_domain")

    explanation_parts = []
    if domain_age is not None and domain_age < 30:
        explanation_parts.append(f"Domain registered {domain_age} days ago.")
    if vt_score and int(vt_score.split('/')[0]) > 0:
        explanation_parts.append(f"Flagged by {vt_score.split('/')[0]} engines.")
        
    explanation = " ".join(explanation_parts) if explanation_parts else "No significant threats found."

    result = {
        "url": url,
        "virustotal_score": vt_score,
        "domain_age_days": domain_age,
        "registrar": registrar,
        "url_verdict": verdict,
        "flags": flags,
        "explanation": explanation
    }
    
    # Save to cache
    url_cache.set(url, result)
    
    return result
