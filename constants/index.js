exports.DEV = 'development';
exports.PROD = 'production';
exports.PATHS = {
  root: './',
  src: './src/assets/',
  dest: './dist/assets/',
  build: {
    publicPath: '/assets',
    dest: './dist/',
    scripts: {
      publicPath: '/assets/scripts/',
    },
  },
  sources: {
    html: {
      paths: ['./src/views/'],
      src: './src/views/pages/*.*',
      watch: './src/views/**/*.*',
    },
    scripts: {
      src: './src/assets/scripts/main.ts',
      dest: './dist/assets/scripts/',
      watch: './src/assets/scripts/**/*.*',
      doc: './src/assets/scripts/**/*.{js,ts}',
    },
    styles: {
      src: './src/assets/styles/main.{scss,sass}',
      dest: './dist/assets/styles/',
      watch: './src/assets/styles/**/*.*',
    },
    images: {
      src: './src/assets/images/**/*.{jpg,png}',
      dest: './dist/assets/images/',
      watch: './src/assets/images/**/*.*',
      og_src: './src/assets/images/og/*.*',
      og_dest: './dist/assets/images/og/',
    },
    fonts: {
      src: './src/assets/fonts/**/*.*',
      dest: './dist/assets/fonts/',
      watch: './src/assets/fonts/**/*.*',
    },
    icons: {
      src: './src/assets/icons/**/*.*',
      dest: './dist/assets/icons/',
      watch: './src/assets/icons/**/*.*',
    },
    root: {
      src: './src/public/**/*.*',
      dest: './dist/',
      watch: './src/public/**/*.*',
    },
  },
  preloads: {
    fonts: [
      '/assets/fonts/noto-sans-mono-v21-latin-700.woff2',
      '/assets/fonts/noto-sans-mono-v21-latin-regular.woff2',
      '/assets/fonts/noto-sans-v27-latin-700.woff2',
      '/assets/fonts/noto-sans-v27-latin-700italic.woff2',
      '/assets/fonts/noto-sans-v27-latin-italic.woff2',
      '/assets/fonts/noto-sans-v27-latin-regular.woff2',
      '/assets/fonts/noto-serif-v21-latin-700.woff2',
      '/assets/fonts/noto-serif-v21-latin-700italic.woff2',
      '/assets/fonts/noto-serif-v21-latin-italic.woff2',
    ],
    scripts: ['/assets/scripts/main.js'],
    styles: ['/assets/styles/main.css'],
  },
};

exports.META = {
  author: 'Michael Michel',
  year: 2023,
};

exports.NAV = [
  { id: 'home', label: 'Home', url: '/' },
  { id: 'about', label: 'About', url: '/about.html' },
];
