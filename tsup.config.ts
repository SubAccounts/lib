import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "src/crypto"],
  format: ["esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: false,
  clean: true,
  tsconfig: "tsconfig.build.json",
});
