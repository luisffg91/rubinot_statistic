import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Testes de domínio são puros (sem rede/DOM) — ambiente node basta (Princípio IV).
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
