import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { stylexPlugin } from "vite-plugin-stylex-dev";
import { checker } from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stylexPlugin(), checker({ typescript: true })],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 8000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
