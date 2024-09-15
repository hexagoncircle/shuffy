import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@css": path.resolve(__dirname, "./src/css"),
      "@js": path.resolve(__dirname, "./src/js"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@reducers": path.resolve(__dirname, "./src/reducers"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  plugins: [react(), svgr()],
});
