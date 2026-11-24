# SignalOS System Architecture

## Overview
SignalOS is structured as a modular monolith:

1. **Frontend**: Vite + React 18 + TypeScript + Tailwind CSS.
2. **Backend**: FastAPI + Pydantic v2 + SQLite/PostgreSQL.
3. **Intelligence Layer**: Provider-agnostic LLM interface for summaries and briefings.

## Key Endpoints
- `GET /health`
- `GET /api/v1/industries`
- `GET /api/v1/topics`
- `GET /api/v1/intelligence`
- `GET /api/v1/briefings`
- `GET /api/v1/profile`
- `PUT /api/v1/profile`
- `POST /api/v1/topics/{topic_id}/toggle-follow`
