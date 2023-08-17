require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
const INFURA_API_KEY = "d702fa64939949d89c299b5795d68ad2";

const SEPOLIA_PRIVATE_KEY = "492be60f389f9f47aa78b3d20ac2a1d99aea7fbd7e2d473bb212c0bb0326d854";

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
}