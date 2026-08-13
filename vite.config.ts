import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // served from GitHub Pages project path; change to "/" for a custom domain
  base: "/pulsiveg/",
  plugins: [react(), tailwindcss()],
  // dev-only: the local workspace path contains a colon, which breaks
  // Vite's fs allow-list matching; harmless for production builds
  server: { fs: { strict: false } },
});
