import { TESTNET } from "consts";
import { Network, OpenSeaPort } from "opensea-js";
import * as Web3 from "web3";

const provider = new Web3.providers.HttpProvider(
  TESTNET
    ? "https://rinkeby.infura.io/v3/b545671b128f49a19a503a8ab586616c" // TODO: MOVE TO ENV
    : "https://mainnet.infura.io" // CAN't WRITE TO THIS NODE, ONLY READ
);
const seaport = new OpenSeaPort(provider, {
  networkName: TESTNET ? Network.Rinkeby : Network.Main,
  apiKey: process.env.OPENSEA_API_KEY,
});

export default seaport;
