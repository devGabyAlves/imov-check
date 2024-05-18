import million from "million/compiler";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";


export default defineConfig({
  plugins: [million.vite({ auto: true }), react()],
});