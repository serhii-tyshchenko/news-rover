# News Rover App Frontend

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/serhii-tyshchenko/news-rover
    ```

2.  Navigate to the project directory:

    ```bash
    cd news-rower/frontend
    ```

3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the application:

    ```bash
    npm start
    ```
    This will run the app in development mode. Open http://127.0.0.1:3000/ to view it in the browser.

## Project Structure

```
config.json             # Icon font configuration
index.html              # Dev HTML entry
package.json            # npm scripts and dependencies
vite.config.mts         # Vite configuration
public/                 # Static assets served in development
    _redirects
    robots.txt
    site.webmanifest
    locales/
build/                  # Production build output
    assets/
src/                    # Source code
    index.tsx             # App bootstrap
    App.tsx               # Root React component
    App.scss              # Global styles
    api/                  # API wrapper and tests
    assets/               # Fonts and images
    components/           # Reusable UI components
    constants/            # App-wide constants
    contexts/             # React context providers
    hooks/                # Custom hooks
    layout/               # Layout and page shells
    pages/                # Page components
    queries/              # Data fetching hooks/queries
    store/                # State management (actions, reducers)
    styles/               # SCSS variables, mixins, themes
    types/                # TypeScript types
    utils/                # Utilities and tests
```

This mirrors the structure used across the project and helps contributors find core pieces of the frontend quickly.
    
---

© 2025 Serhii Tyshchenko