# GuardAI Backend

AI-powered scam detection API — English MVP.

## Setup

1. Create a virtual environment and install dependencies:
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

2. Configure environment variables. Add your API keys to the `.env` file:
```
GITHUB_TOKEN=your_github_token
VIRUSTOTAL_API_KEY=your_virustotal_api_key
```

## Running the API

Start the development server:
```bash
uvicorn main:app --reload
```

The API will run at http://localhost:8000
Swagger UI docs available at http://localhost:8000/docs

## Validation

Before deploying or using the API in production, run the test corpus to validate the Anomaly Engine prompt logic:

```bash
python tests/run_corpus.py
```
This script will test 10 hardcoded test messages to ensure >85% accuracy.
