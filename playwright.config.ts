import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  workers: 2,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:4174", channel: process.env.PW_CHANNEL || "chrome", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "mobile", use: { viewport: { width:390,height:844 }, hasTouch:true } },
    { name: "small", use: { viewport: { width:320,height:568 }, hasTouch:true } },
    { name: "desktop", use: { viewport: { width:1440,height:900 } } },
  ],
  webServer: { command: "npx next start --hostname 127.0.0.1 --port 4174", url: "http://127.0.0.1:4174", reuseExistingServer: false, timeout: 60000 },
});
