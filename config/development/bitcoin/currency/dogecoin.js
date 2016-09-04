module.exports = {
  enable: true,
  maxConfirmations: 2,
  updateInterval: 60,

  client: {
    uri: "http://localhost:4001/rpc/Dogecoin",
    timeout: 300000 // 5 min
  }
};
