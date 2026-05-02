from typing import List, Optional, Literal
from pydantic import BaseModel, Field

class AnalyzeRequest(BaseModel):
    text: str = Field(..., max_length=4000, description="The message to analyze")

class UrlScanResult(BaseModel):
    url: str
    virustotal_score: Optional[str] = None
    domain_age_days: Optional[int] = None
    url_verdict: Literal["Safe", "Suspicious", "Dangerous"]

class AnalyzeResponse(BaseModel):
    verdict: Literal["Safe", "Suspicious", "Dangerous"]
    confidence: float
    explanation: str
    flags: List[str]
    urls_found: List[UrlScanResult] = []
    action: str
    processing_ms: int

class UrlAnalyzeRequest(BaseModel):
    url: str

class UrlAnalyzeResponse(BaseModel):
    url: str
    verdict: Literal["Safe", "Suspicious", "Dangerous"]
    virustotal_score: Optional[str] = None
    domain_age_days: Optional[int] = None
    registrar: Optional[str] = None
    flags: List[str]
    explanation: str

class Example(BaseModel):
    id: str
    label: str
    text: str

class ExamplesResponse(BaseModel):
    examples: List[Example]

class HealthResponse(BaseModel):
    status: str
    claude: str
    virustotal: str
    version: str
    uptime_seconds: int

# Claude JSON output format schema
class AnomalyVerdict(BaseModel):
    verdict: Literal["Safe", "Suspicious", "Dangerous"]
    confidence: float
    explanation: str
    flags: List[str]
    action: str
