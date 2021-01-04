module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz',
        changeOrigin: true
      }
    }
  }
}
