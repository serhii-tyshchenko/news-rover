# Integration Tests (Playwright)

This folder contains standalone Playwright integration tests for News Rover.

## Prerequisites

- Node.js installed
- Frontend and backend dependencies installed (`frontend/`, `backend/`)

## Setup

```bash
cd integration-tests
npm install
npm run install:browsers
```

## Run tests

```bash
npm test
```

Useful commands:

```bash
npm run test:smoke
npm run test:headed
npm run test:ui
npm run report
```

## How startup works

Playwright starts both apps automatically from this folder:

- Backend: `npm run start --prefix ../backend` (port `4000`)
- Frontend: `npm run start --prefix ../frontend` (port `3000`)

`VITE_API_URL` is injected for the frontend dev server as `http://127.0.0.1:4000/`.
