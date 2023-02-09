require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

const id = "f2f6de9723c64c57a1e4d7427ba47392";
const secret = fs.readFileSync(".secret").toString();

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${id}`,
      accounts: [secret]
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${id}`,
      accounts: [secret]
    }
  }
};
