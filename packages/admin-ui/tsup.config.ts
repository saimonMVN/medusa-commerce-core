import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.tsx"],
  dts: true,
  skipNodeModulesBundle: true,
  sourcemap: true,
  minify: true,
  clean: true,
  format: ["cjs", "esm"],
})
