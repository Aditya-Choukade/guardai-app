import time
from typing import Dict, Any, Optional

class CacheEntry:
    def __init__(self, data: Dict[str, Any], ttl_seconds: int):
        self.data = data
        self.expires_at = time.time() + ttl_seconds

    def is_expired(self) -> bool:
        return time.time() > self.expires_at

class UrlCache:
    def __init__(self, ttl_minutes: int = 15):
        self.cache: Dict[str, CacheEntry] = {}
        self.ttl_seconds = ttl_minutes * 60

    def get(self, url: str) -> Optional[Dict[str, Any]]:
        entry = self.cache.get(url)
        if entry:
            if entry.is_expired():
                del self.cache[url]
                return None
            return entry.data
        return None

    def set(self, url: str, data: Dict[str, Any]):
        self.cache[url] = CacheEntry(data, self.ttl_seconds)

# Singleton instance for the app
url_cache = UrlCache()
