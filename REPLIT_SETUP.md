# Replit Setup Instructions

## Quick Start

1. **Create new Repl**: Choose "Node.js" template
2. **Upload all files** from this project
3. **Run**: Click the "Run" button or type `npm run serve`

## What I've Created

### Single-File Server Approach
- `server.js` - Express server that serves the Angular app + WebSocket relay
- `server-package.json` - Dependencies for the server
- `.replit` - Replit configuration
- `replit.nix` - Nix environment setup

### Key Changes Made
1. **WebSocket URL**: Now uses `wss://${window.location.host}` (works with Replit's domain)
2. **Combined Server**: Express serves Angular app + WebSocket relay in one process
3. **Auto-build**: Server serves the built Angular app from `client/dist/`

## How to Deploy

### Option 1: Use the Combined Server (Recommended)
```bash
# Build the Angular app first
cd client && npm install && npm run build

# Install server dependencies
npm install

# Start the combined server
npm run serve
```

### Option 2: Development Mode
```bash
# Install all dependencies
npm run install-all

# Start both relay and Angular dev server
npm run start
```

## Testing

1. **Open the app** in your Replit browser
2. **Open another tab** with the same URL
3. **Toggle checkboxes** - they sync instantly!
4. **Test offline**: Close one tab, make changes, reopen - it syncs!

## Production Notes

- The app will be available at: `https://your-repl-name.your-username.repl.co`
- WebSocket connections use the same domain (secure)
- IndexedDB works in browsers for offline persistence
- All users in the same room see the same shared state

## Troubleshooting

If you see connection errors:
1. Make sure you built the Angular app: `cd client && npm run build`
2. Check that the server is running: `npm run serve`
3. Look at the browser console for WebSocket connection errors

The app is now ready for Replit! 🚀
