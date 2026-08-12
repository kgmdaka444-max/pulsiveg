import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // relative base so the build works at any URL (GitHub Pages subpath or custom domain)
  base: "./",
  plugins: [react(), tailwindcss()],
  // dev-only: the local workspace path contains a colon, which breaks
  // Vite's fs allow-list matching; harmless for production builds
  server: { fs: { strict: false } },
});
