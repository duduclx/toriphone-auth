import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  define: {global: 'window'},
  build: {
    lib: {
      entry: 'src/index.jsx', // Point d'entrée principal
      name: 'toriphone-auth',
      fileName: (format) => `index.${format}.js`,
      formats: ['esm'], // Génère un bundle au format ESM
    },
    rollupOptions: {
      external: ['react', 'react-dom', "@chakra-ui/react", "@emotion/react", "next-themes"], // Exclut React et ReactDOM
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          "@chakra-ui/react": "ChakraUI",
        },
      },
    },
  },
});
