import { defineConfig, devices } from '@playwright/test';

const FRONTEND_PORT = 3000;
const BACKEND_PORT = 4000;
const FRONTEND_URL = `http://127.0.0.1:${FRONTEND_PORT}`;
const BACKEND_URL = `http://127.0.0.1:${BACKEND_PORT}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: FRONTEND_URL,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: [
    {
      command: 'npm run start --prefix ../backend',
      url: BACKEND_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      command:
        'cross-env VITE_API_URL=http://127.0.0.1:4000/ npm run start --prefix ../frontend -- --host 127.0.0.1 --port 3000 --open false',
      url: FRONTEND_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
