import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      input: [
        "index.html",
        "designs/editorial/index.html",
        "designs/meridian/index.html",
        "designs/partnership/index.html",
      ],
    },
  },
});
