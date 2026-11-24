# SignalOS

AI-Powered Personal Industry Intelligence Platform.

## Quick Start

### Backend
```bash
pip install -r backend/requirements.txt
python -m uvicorn app.main:app --app-dir backend --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Docker
```bash
docker compose up --build
```
