module.exports = {
  enable: true,
  maxConfirmations: 2,
  updateInterval: 60,

  client: {
    uri: "http://10.168.0.55:4001/rpc/Dogecoin",
    timeout: 300000 // 5 min
  }
};
