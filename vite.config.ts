import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/SimpleIndexedDB/index.ts"),
      name: "SimpleIndexedDB",
      fileName: "SimpleIndexedDB",
    },
  },
});
