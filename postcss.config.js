module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    require('postcss-discard-comments')({ removeAll: true }),
  ],
};
