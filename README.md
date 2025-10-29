# local-first-collab-starter

A tiny, industry-standard local‑first starter showing two collaborative checkboxes — **Approved** and **Rejected** — built with Angular + Yjs. Changes sync via a single WebSocket (no per‑change REST). State is cached in IndexedDB for offline use.

## Stack

- **Yjs** (CRDT for conflict-free collaboration)
- **y-indexeddb** for local persistence
- **y-websocket** for one persistent realtime connection
- **Angular 17+** with standalone components and signals
- **Node.js WebSocket relay** (Docker or local)

## Quickstart

### 1. Start the relay

```bash
docker compose up --build
```

The relay runs at `ws://localhost:1234` (use `wss://` + TLS in production)

### 2. Run the Angular app

```bash
cd client
npm install
npm run dev
```

### 3. Test collaboration

Open the app in two browser windows (or two different machines). Toggle **Approved** / **Rejected** — they sync instantly, even offline → online.

## Project Structure

```
local-first-collab-starter/
├─ client/                     # Angular app
│  ├─ src/app/
│  │  ├─ collaboration.service.ts
│  │  ├─ approval-flags.component.ts
│  │  └─ app.component.ts
│  ├─ src/main.ts
│  ├─ src/index.html
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ angular.json
├─ relay/                      # Yjs websocket relay
│  ├─ package.json
│  └─ server.mjs
├─ docker-compose.yml
└─ README.md
```

## How It Works

### CollaborationService

The service creates a shared Yjs document that holds a map of boolean flags. It automatically:
- Persists state to IndexedDB for offline support
- Connects to the WebSocket relay for realtime sync
- Initializes default values on first load

### ApprovalFlagsComponent

A standalone Angular component with signals that:
- Displays two checkboxes bound to the shared state
- Observes Yjs changes from local or remote updates
- Updates signals reactively when changes occur

### Relay Server

A minimal WebSocket server that forwards CRDT updates between peers in the same room. No state is stored on the server — it's just a message relay.

## Next Steps (Optional)

### Authentication

- Have your backend mint short‑lived JWTs (room‑scoped)
- Pass as params to `WebsocketProvider`
- Validate in the relay before allowing connections

### Persistence

- Append Yjs updates to S3 from the relay
- Load into your data warehouse via streaming ingestion
- Create periodic snapshots for fast cold starts

### Presence

- Add cursors/avatars as ephemeral WebSocket messages
- Don't persist presence data to keep it lightweight

### Production Deployment

- Use `wss://` with TLS for secure connections
- Add rate limiting and connection throttling
- Implement room-based access control
- Set up monitoring and logging

### Peer-to-Peer

- Replace `y-websocket` with `y-webrtc` for direct peer connections
- Keep a TURN server for corporate NATs

## Why Yjs?

Yjs is the modern standard for local‑first collaboration (used by Notion/Figma‑style systems). You get:
- Offline-first architecture
- Conflict-free merges (CRDT)
- Single persistent WebSocket instead of API spam
- Deterministic sync across all peers

## License

MIT

