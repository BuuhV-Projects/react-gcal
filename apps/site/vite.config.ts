import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { IncomingMessage, ServerResponse } from "http";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Plugin customizado para garantir fallback em todas as rotas
    {
      name: "spa-fallback",
      configureServer(server: ViteDevServer) {
        return () => {
          server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
            // Se não for um arquivo estático e não for uma rota de API, serve index.html
            if (req.url && !req.url.includes(".") && !req.url.startsWith("/api")) {
              req.url = "/index.html";
            }
            next();
          });
        };
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: [
      {
        find: "react-gcal/styles",
        replacement: path.resolve(__dirname, "../../packages/react-gcal/src/styles/styles.scss"),
      },
      {
        find: "react-gcal",
        replacement: path.resolve(__dirname, "../../packages/react-gcal/src"),
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
  preview: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
}));
