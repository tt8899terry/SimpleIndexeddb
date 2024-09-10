import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/SimpleIndexedDB/index.ts"),
      name: "index",
      // formats: ["es", "cjs"],
      fileName: "index",
    },
  },
  plugins: [
    dts({
      entryRoot: "src/SimpleIndexedDB", // Specify the root directory for entry files
      rollupTypes: true, // This option merges all declarations into one file
    }),
  ],
});
