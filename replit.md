# Lumen Full Project - Replit Configuration

## Overview
Lumen is an emotionally-aware conversational AI interface that combines intelligence, emotion, light, and sound into a unified harmonic system. This project uses React, Vite, Express, and TypeScript to create an immersive AI chat experience.

## Project Structure
```
/api            → Express API routes (chat, turn evaluation, session end)
/client         → React frontend UI with Vite
  /components   → UI components (Chat, MessageBubble, ReasoningPanel, etc.)
  /hooks        → React hooks (useLumenChat, useResonance, useEFV)
  /styles       → CSS styles for different visual modes
  /utils        → Utility functions (emotion colors, harmonics, synesthesia)
/core           → Core logic (reasoning engine, metrics, recovery)
/db             → Database schema and client (Drizzle ORM + Postgres)
/docs           → API documentation
server.ts       → Main Express server with Vite integration
```

## Tech Stack
- **Frontend**: React 19 + Vite 5 + TailwindCSS
- **Backend**: Express + TypeScript (ESM)
- **Database**: PostgreSQL (via Replit database) + Drizzle ORM
- **AI**: OpenRouter API (Qwen and GLM models)
- **Build**: TypeScript + concurrent dev servers

## Configuration

### Development Mode
- Frontend (Vite): `http://0.0.0.0:5000`
- Backend API: `http://localhost:3001`
- Workflow: `npm run dev:full` (runs both concurrently)

### Production Mode
- Single server on port 5000 (0.0.0.0)
- Serves static frontend files
- API routes available at `/api/*`

### Environment Variables
- `OPENROUTER_API_KEY` - Required for AI chat functionality (stored in Replit Secrets)
- `DATABASE_URL` - PostgreSQL connection string (auto-configured by Replit)
- `NODE_ENV` - Set to "production" for deployment
- `PORT` - Server port (5000 in production, 3001 in dev)

## Recent Changes (October 24, 2025)

### Replit Environment Setup
1. **API Key Migration**: Changed from `OPENAI_API_KEY` to `OPENROUTER_API_KEY` to match the actual API service used
2. **Port Configuration**:
   - Frontend configured for port 5000 (Replit requirement)
   - Backend dev server on port 3001 to avoid conflicts
   - Production server auto-detects and uses port 5000
3. **Vite Configuration**:
   - Host set to `0.0.0.0` for Replit proxy access
   - `allowedHosts: true` to bypass host header verification
4. **Server Configuration**:
   - Development: localhost:3001 for backend
   - Production: 0.0.0.0:5000 for all traffic
5. **Deployment**: Configured for autoscale deployment with build and start scripts

### Dependencies Installed
All npm packages installed successfully (319 packages)

## User Preferences
- None specified yet

## Database
The application uses PostgreSQL with Drizzle ORM. Database schema includes:
- `rounds` - EFV snapshots for each turn
- `matches` - Session finalization and metrics
- `ratings` - Aggregated client statistics (ELO, wins, losses)

Database connection is optional - the app will run without it but won't persist telemetry data.

## Deployment
Configured for Replit autoscale deployment:
- Build: `npm run build` (compiles TypeScript + builds Vite frontend)
- Run: `npm start` (runs production server)
- The server automatically serves static files in production mode

## API Endpoints
- `POST /api/chat` - Main chat endpoint with LLM reasoning
- `POST /api/turn_eval` - Turn-by-turn evaluation metrics
- `POST /api/session_end` - Session finalization
- `GET /healthz` - Health check endpoint

## Notes
- The application uses OpenRouter for AI models (free tier models by default)
- Emotional recovery system activates if primary/fallback models fail
- Visual interface includes ambient fields, sound pulses, and synesthetic effects
- All PII is privacy-protected (zero logs principle)
