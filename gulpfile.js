const { src, dest, series, parallel, watch } = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const gulpif = require('gulp-if');
const cssNano = require('gulp-cssnano');
const prettier = require('gulp-prettier').default;
const htmlmin = require('gulp-htmlmin');
const rimraf = require('gulp-rimraf');
const ignore = require('gulp-ignore');
const postcss = require('gulp-postcss');
const sharpResponsive = require('gulp-sharp-responsive');
const browserSync = require('browser-sync').create();
const { gulpEsbuild } = require('gulp-esbuild');
const { PATHS, DEV, PROD, META, NAV } = require('./constants');

const env = process.env.NODE_ENV || DEV;
const isProduction = env === PROD;

const buildHtml = () =>
  src(PATHS.sources.html.src)
    .pipe(
      nunjucksRender({
        path: PATHS.sources.html.paths,
        data: {
          ...META,
          preloads: PATHS.preloads,
          nav: NAV,
        },
      })
    )
    .pipe(gulpif(isProduction, htmlmin({ collapseWhitespace: true }), prettier()))
    .pipe(dest(PATHS.build.dest));

const buildStyles = () => src(PATHS.sources.styles.src).pipe(postcss()).pipe(gulpif(isProduction, cssNano())).pipe(dest(PATHS.sources.styles.dest));

const buildScripts = () =>
  src(PATHS.sources.scripts.src)
    .pipe(
      gulpEsbuild({
        outfile: 'main.js',
        bundle: true,
        loader: {
          '.ts': 'ts',
        },
      })
    )
    .pipe(dest(PATHS.sources.scripts.dest));

const images = () =>
  src(PATHS.sources.images.src, { encoding: false })
    .pipe(
      sharpResponsive({
        formats: [
          { width: 600, rename: { suffix: '-og' } },
          { width: 480, rename: { suffix: '-xs' } },
          { width: 640, rename: { suffix: '-sm' } },
          { width: 1024, rename: { suffix: '-lg' } },
          { width: 1280, rename: { suffix: '-xl' } },
          { width: 1440, rename: { suffix: '-2xl' } },
          { width: 1680, rename: { suffix: '-3xl' } },
        ],
      })
    )
    .pipe(dest(PATHS.sources.images.dest));

const copyImages = () => src(PATHS.sources.images.src, { encoding: false }).pipe(dest(PATHS.sources.images.dest));

const copyFonts = () => src(PATHS.sources.fonts.src, { encoding: false }).pipe(dest(PATHS.sources.fonts.dest));

const copyIcons = () => src(PATHS.sources.icons.src, { encoding: false }).pipe(dest(PATHS.sources.icons.dest));

const copyRoot = () => src(PATHS.sources.root.src, { encoding: false }).pipe(dest(PATHS.sources.root.dest));

const copyStaticAssets = parallel(copyImages, copyFonts, copyIcons, copyRoot);

const reload = cb => {
  browserSync.reload();
  cb();
};

const watchFiles = () => {
  watch(PATHS.sources.html.watch, series(buildHtml, reload));
  watch(PATHS.sources.styles.watch, series(buildStyles, reload));
  watch(PATHS.sources.scripts.watch, series(buildScripts, reload));
};

const serve = cb => {
  browserSync.init(
    {
      server: PATHS.build.dest,
      port: 3000,
      host: '0.0.0.0',
    },
    cb
  );
};

const clean = () => src('./dist/**/*.*', { read: false }).pipe(ignore('node_modules/**')).pipe(rimraf());

const devTasks = series(clean, images, parallel(buildHtml, buildStyles, buildScripts, copyStaticAssets), parallel(serve, watchFiles));
const prodTasks = series(clean, images, parallel(buildHtml, buildStyles, buildScripts, copyStaticAssets));

exports.default = isProduction ? prodTasks : devTasks;
exports.clean = clean;
exports.buildHtml = buildHtml;
exports.buildStyles = buildStyles;
exports.buildScripts = buildScripts;
exports.copyStaticAssets = copyStaticAssets;
exports.images = images;
