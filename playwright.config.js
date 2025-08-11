// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: "always" }]],
  use: {
   
    screenshot: "on",

    video: "retain-on-failure",

    trace: "on",
    headless: process.env.CI ? true : false,


    viewport: { width: 1280, height: 720 },

    baseURL: 'https://www.advantageonlineshopping.com/',
  },

  /* Project configurations */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
