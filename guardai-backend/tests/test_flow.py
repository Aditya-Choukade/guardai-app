from fastapi.testclient import TestClient
import json
import sys
import os

# Add parent to path to import main
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__) + '/..'))
from main import app

client = TestClient(app)

def run_tests():
    print("1. Testing GET /health")
    response = client.get("/health")
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print("-" * 40)

    print("2. Testing GET /examples")
    response = client.get("/examples")
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2)[:200] + "...\n}") 
    print("-" * 40)

    print("3. Testing POST /analyze (Safe message, no URL)")
    payload = {
        "text": "Hi, can we reschedule our meeting to 4pm tomorrow?"
    }
    response = client.post("/analyze", json=payload)
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print("-" * 40)

    print("4. Testing POST /analyze (Dangerous message with URL)")
    payload = {
        "text": "Your UPI is blocked. Verify at http://upi-verify-now.com or lose access."
    }
    response = client.post("/analyze", json=payload)
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print("-" * 40)

    print("5. Testing POST /analyze/url (Standalone URL Scanner)")
    payload = {
        "url": "http://sbi-kyc-portal.xyz"
    }
    response = client.post("/analyze/url", json=payload)
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print("-" * 40)

if __name__ == "__main__":
    run_tests()
