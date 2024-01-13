import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { stylexPlugin } from "vite-plugin-stylex-dev";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stylexPlugin()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 8000,
  },
});
