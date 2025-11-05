import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  // Activa el modo oscuro basado en la clase 'dark' en el <html>
  darkMode: 'class',

  theme: {
    extend: {
      // 1. Añadimos tu fuente 'Josefin Sans' como fuente por defecto
      fontFamily: {
        sans: ['Josefin Sans', ...defaultTheme.fontFamily.sans],
      },
      // 2. DEFINIMOS TODOS TUS COLORES PERSONALIZADOS
      colors: {
        // Colores para el Modo Claro
        'light-bg': 'hsl(236, 33%, 92%)',
        'light-card': 'hsl(0, 0%, 100%)',
        'light-text': 'hsl(235, 19%, 35%)',
        'light-text-muted': 'hsl(236, 9%, 61%)',
        'light-text-hover': 'hsl(235, 19%, 35%)',
        'light-border': 'hsl(233, 11%, 84%)',

        // Colores para el Modo Oscuro (dark:)
        'dark-bg': 'hsl(235, 21%, 11%)',
        'dark-card': 'hsl(235, 24%, 19%)',
        'dark-text': 'hsl(234, 39%, 85%)',
        'dark-text-muted': 'hsl(234, 11%, 52%)',
        'dark-text-hover': 'hsl(236, 33%, 92%)',
        'dark-border': 'hsl(237, 14%, 26%)',
      }
    }
  }
}
