import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import { TESTNET } from "consts";

const provider = new Web3.providers.HttpProvider(
  TESTNET ? "https://rinkeby.infura.io" : "https://mainnet.infura.io"
);
const seaport = new OpenSeaPort(provider, {
  networkName: TESTNET ? Network.Rinkeby : Network.Main,
  apiKey: process.env.OPENSEA_API_KEY,
});

export default seaport;
