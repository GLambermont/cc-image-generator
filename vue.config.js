module.exports = {
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