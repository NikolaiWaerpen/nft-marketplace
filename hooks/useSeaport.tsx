import { TESTNET } from "consts";
import { Network, OpenSeaPort } from "opensea-js";

export default function useSeaport() {
  //@ts-ignore
  const seaport = new OpenSeaPort(ethereum, {
    networkName: TESTNET ? Network.Rinkeby : Network.Main,
    apiKey: process.env.OPENSEA_API_KEY,
  });

  return seaport;
}
