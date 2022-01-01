import { ACCOUNT_ADDRESS } from "consts";
import { OpenSeaPort } from "opensea-js";
import getAsset from "./get-asset";

export default async function createSellOrder(
  seaport: OpenSeaPort,
  tokenAddress: string,
  tokenId: string,
  pricePerItem: string,
  offerExpiration?: number
) {
  const {
    tokenId: responseTokenId,
    tokenAddress: responseTokenAddress,
    name,
    schemaName,
  } = await getAsset(tokenAddress, tokenId, seaport);

  const fixedPriceSellOrder = await seaport.createSellOrder({
    asset: {
      tokenId: responseTokenId,
      tokenAddress: responseTokenAddress,
    },
    startAmount: 0.08,
    expirationTime: 0,
    accountAddress: ACCOUNT_ADDRESS,
  });

  console.log(
    `Successfully created a fixed-price sell order! ${fixedPriceSellOrder.asset.openseaLink}\n`
  );
}
