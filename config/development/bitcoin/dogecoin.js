module.exports = {
  enable: true,
  maxConfirmations: 2,

  client: {
    uri: "http://localhost:4001/rpc/dogecoin",
    timeout: 300000 // 5 min
  }
};