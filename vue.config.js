module.exports = {
  pages: {
    app: {
      entry: 'src/js/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    }
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `
          @import '~open-color/open-color.scss';
          @import '@/scss/_vars.scss';
          @import '@/scss/_mixins.scss';
          @import '@/scss/_extends.scss';
          @import '@/scss/_functions.scss';
        `
      }
    }
  }
}