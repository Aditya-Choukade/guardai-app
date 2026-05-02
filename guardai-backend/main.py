import os
import time
import asyncio
from typing import List
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from dotenv import load_dotenv

load_dotenv()

from models import (
    AnalyzeRequest, 
    AnalyzeResponse, 
    UrlAnalyzeRequest, 
    UrlAnalyzeResponse, 
    ExamplesResponse, 
    HealthResponse,
    UrlScanResult
)
from anomaly_engine import detect_anomalies_with_ai
from url_scanner import scan_url, extract_urls
from examples import EXAMPLES
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="GuardAI - Scam Detection API",
    description="API for detecting anomalies in text messages and URLs (Safe, Suspicious, or Dangerous).",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

start_time = time.time()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "type": "validation_error",
            "title": "Validation Error",
            "status": 422,
            "detail": exc.errors()
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "type": "internal_error",
            "title": "Internal Server Error",
            "status": 500,
            "detail": str(exc)
        }
    )

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    req_start_time = time.time()
    text = request.text.strip()
    
    if not text:
        return JSONResponse(
            status_code=400,
            content={
                "type": "invalid_input",
                "title": "Text field is required",
                "status": 400,
                "detail": "The text field must be a non-empty string."
            }
        )
        
    if len(text) > 4000:
        return JSONResponse(
            status_code=400,
            content={
                "type": "invalid_input",
                "title": "Text too long",
                "status": 400,
                "detail": "The text field must be less than 4000 characters."
            }
        )

    # Extract URLs
    urls = extract_urls(text)
    
    # Run URL scans in parallel
    scan_tasks = [scan_url(url) for url in urls]
    url_scan_results = await asyncio.gather(*scan_tasks)
    
    # Call Claude with a timeout
    try:
        claude_task = asyncio.create_task(detect_anomalies_with_ai(text, url_scan_results))
        claude_result = await asyncio.wait_for(claude_task, timeout=8.0)
    except asyncio.TimeoutError:
        from models import AnomalyVerdict
        claude_result = AnomalyVerdict(
            verdict="Suspicious",
            confidence=0.5,
            explanation="Analysis timed out. Exercise caution.",
            flags=["timeout"],
            action="Proceed with caution."
        )
        
    processing_ms = int((time.time() - req_start_time) * 1000)
    
    # Map to Response models
    mapped_urls = [
        UrlScanResult(
            url=r["url"],
            virustotal_score=r["virustotal_score"],
            domain_age_days=r["domain_age_days"],
            url_verdict=r["url_verdict"]
        ) for r in url_scan_results
    ]
    
    return AnalyzeResponse(
        verdict=claude_result.verdict,
        confidence=claude_result.confidence,
        explanation=claude_result.explanation,
        flags=claude_result.flags,
        urls_found=mapped_urls,
        action=claude_result.action,
        processing_ms=processing_ms
    )

@app.post("/analyze/url", response_model=UrlAnalyzeResponse)
async def analyze_url(request: UrlAnalyzeRequest):
    result = await scan_url(request.url)
    return UrlAnalyzeResponse(
        url=result["url"],
        verdict=result["url_verdict"],
        virustotal_score=result["virustotal_score"],
        domain_age_days=result["domain_age_days"],
        registrar=result["registrar"],
        flags=result["flags"],
        explanation=result["explanation"]
    )

@app.get("/health", response_model=HealthResponse)
async def health():
    uptime = int(time.time() - start_time)
    
    # Optional: Implement actual checks for Claude and VT
    claude_status = "reachable" if os.environ.get("GITHUB_TOKEN") else "unconfigured"
    vt_status = "reachable" if os.environ.get("VIRUSTOTAL_API_KEY") else "unconfigured"
    
    return HealthResponse(
        status="ok",
        claude=claude_status,
        virustotal=vt_status,
        version="1.0.0",
        uptime_seconds=uptime
    )

@app.get("/examples", response_model=ExamplesResponse)
async def examples():
    return ExamplesResponse(examples=EXAMPLES)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
