import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: '/a14u',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      minify: 'esbuild',
      cssMinify: "esbuild",
      sourcemap: false, // 소스맵 생성 비활성화
      chunkSizeWarningLimit: 1000, // 500kB → 1000kB로 상향
          // 빌드 산출물 gzip 계산/리포트 생략(빌드 시 CPU/IO 조금 절약)
      reportCompressedSize: false,
      rollupOptions: {
        maxParallelFileOps: 2,
        output: {
          // node_modules는 vendor 청크로 분리
          manualChunks: {
            vendor: [
              'react',
              'react-dom',
              'three',
              '@react-three/fiber',
              '@react-three/drei',
            ],
          },
        },
      },
    },
  };
});

