module.exports = {
  getDevServerPort(){
    return +(process.env.DEV_PORT || 9527)
  }
}