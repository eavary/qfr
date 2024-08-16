import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080, // 3000 ? This is the port which we will use in docker
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
    // Thanks @sergiomoura for the window fix
    // add the next lines if you're using windows and hot reload doesn't work
    // watch: {
    //   usePolling: true
    //   run a build and put it somewhere
    // }
  }
})
