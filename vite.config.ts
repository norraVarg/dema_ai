import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['module:@preact/signals-react-transform']],
      },
    }),
  ],
})
