import { defineConfig } from "vite";
import honox from "honox/vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      // for island component
      build: {
        rollupOptions: {
          input: ["/app/client.ts"],
        },
      },
    };
  }

  return {
    plugins: [honox()],
    ssr: {
      external: ["@simplewebauthn/server"],
    },
  };
});
