module.exports = {
  enable: true,
  maxConfirmations: 2,
  updateInterval: 60,

  client: {
    uri: "http://localhost:4001/rpc/dogecoin",
    timeout: 300000 // 5 min
  }
};