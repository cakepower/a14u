// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // 템플릿/컴포넌트 파일 경로: JIT가 여기서 쓰인 클래스만 빌드합니다.
  content: [
    "./templates/**/*.html",
    "./src/**/*.{js,ts,tsx,vue}",
    "./static/**/*.js",
  ],
  darkMode: "class",               // <html class="dark">일 때 dark: 변형 활성화
  theme: {
    extend: {
      fontFamily: {
        'gmarket': ['GmarketSans', 'sans-serif'],
      },
      fontSize: {
        '4xl-mobile': '2.125rem', // 34px
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(0,0,0,0.25)", // -> class: shadow-soft
      },
      // (원하면 colors, spacing, keyframes 등 더 확장 가능)
    },
  },
  plugins: [],
};

