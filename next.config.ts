import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Fixa a raiz do workspace neste projeto (há um package-lock.json na home do usuário
  // que confundia a inferência automática do Next).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
