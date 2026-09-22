import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Los juegos son builds estáticos dentro de public/ (/portquest y
 * /terminalrally). En producción Vercel sirve solo el index.html de cada
 * carpeta; el servidor de desarrollo de Vite no lo hace y devolvía la landing.
 * Este plugin reescribe la URL de carpeta a su index.html solo en dev.
 */
function staticGameDirs(dirs: string[]): Plugin {
  return {
    name: 'static-game-dirs',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        for (const d of dirs) {
          if (url === `/${d}` || url === `/${d}/`) {
            req.url = `/${d}/index.html`
            break
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), staticGameDirs(['portquest', 'terminalrally'])],
})
