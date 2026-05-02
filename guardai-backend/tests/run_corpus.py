import asyncio
import json
import os
import sys
from dotenv import load_dotenv

# Load env before importing anything else
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

# Add parent to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from anomaly_engine import detect_anomalies_with_ai

async def run_corpus():
    with open(os.path.join(os.path.dirname(__file__), 'test_corpus.json'), 'r') as f:
        corpus = json.load(f)

    correct = 0
    total = len(corpus)

    for item in corpus:
        print(f"Testing ID {item['id']}: {item['message']}")
        result = await detect_anomalies_with_ai(item["message"], item.get("url_scan_results", []))
        
        if result.verdict == item["expected_verdict"]:
            print(f"  [PASS] Expected: {item['expected_verdict']} | Got: {result.verdict}")
            correct += 1
        else:
            print(f"  [FAIL] Expected: {item['expected_verdict']} | Got: {result.verdict}")
            print(f"  Explanation: {result.explanation}")
        print("-" * 40)

    print(f"Accuracy: {correct}/{total} ({(correct/total)*100:.1f}%)")

if __name__ == "__main__":
    if not os.environ.get("GITHUB_TOKEN"):
        print("Error: GITHUB_TOKEN not found in .env")
        sys.exit(1)
    asyncio.run(run_corpus())
