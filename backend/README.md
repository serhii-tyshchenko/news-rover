# News Rover App Backend

## Overview

This project provides a backend API for aggregating and serving RSS news feeds and provider information. It is built with Node.js, TypeScript, native ESM imports, and Express. It supports fetching RSS feeds, listing providers from a Google Spreadsheet, and serving OpenAPI documentation.

## Features

- Fetch and normalize RSS feeds from any URL
- List news providers from a Google Spreadsheet
- OpenAPI (Swagger) documentation at `/api-docs`
- CORS enabled for cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v24+ recommended)
- npm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/serhii-tyshchenko/news-rover.git
   ```

2. Navigate to the project directory:

   ```bash
   cd news-rower/backend
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Copy `.env.example` to `.env` and fill in your Google Sheets credentials:
   ```
   GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
   GOOGLE_SERVICE_EMAIL=your_service_account_email
   GOOGLE_PRIVATE_KEY=your_private_key
   ```

### Running the Server

- Start the server:
  ```sh
  npm start
  ```
- For development with auto-reload:

  ```sh
  npm run dev
  ```

- Run tests:

  ```sh
  npm test
  ```

- Run type check:
  ```sh
  npm run typecheck
  ```

The server will start on `http://localhost:4000` by default.

## API Endpoints

### GET `/providers`

Returns a list of news providers.

- `search` (optional): Search term to filter providers by any field (case-insensitive)

### GET `/rss?url=<rss_url>&limit=<number>`

Fetches and normalizes RSS feed items from the specified URL.

- `url` (required): The RSS feed URL (must be URL-encoded)
- `limit` (optional): Maximum number of posts to return

### GET `/api-docs`

Swagger UI for API documentation.

## Project Structure

```
src/
  app.ts                # Main Express app
  parse.ts              # RSS parsing logic
  common/
    constants.ts        # Shared constants
    utils.ts            # Data transformation utilities
  controllers/
    providers.ts        # Providers controller
    categories.ts       # Categories controller
    rss.ts              # RSS controller
  docs/
    swaggerDef.ts       # Swagger definition
    components/
      paths/            # OpenAPI path definitions
      schemas/          # OpenAPI schemas
  routes/
    index.ts            # Root route
    providers.ts        # Providers route
    categories.ts       # Categories route
    rss.ts              # RSS route
  services/
    db.ts               # Google Sheets data access
```

## Deployment

This project is ready for deployment on [Vercel](https://vercel.com/) using the provided `vercel.json` configuration.

## License

ISC

---

© 2025 Serhii Tyshchenko
