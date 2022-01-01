import { ACCOUNT_ADDRESS } from "consts";
import { OpenSeaPort } from "opensea-js";
import { WyvernSchemaName } from "opensea-js/lib/types";
import getAsset from "./get-asset";

export default async function createBuyOrder(
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

  console.log(
    responseTokenId,
    responseTokenAddress,
    name,
    WyvernSchemaName.ERC1155,
    ACCOUNT_ADDRESS,
    offerExpiration,
    parseFloat(pricePerItem)
  );

  const offer = await seaport.createBuyOrder({
    asset: {
      tokenId: responseTokenId,
      tokenAddress: responseTokenAddress,
      name,
      // Only needed for the short-name auction, not ENS names
      // that have been sold once already:
      schemaName: WyvernSchemaName.ERC1155,
    },
    // Your wallet address (the bidder's address):
    accountAddress: ACCOUNT_ADDRESS,
    // Expiration
    // expirationTime: offerExpiration,
    // Value of the offer, in wrapped ETH:
    startAmount: parseFloat(pricePerItem),
  });

  console.log(
    `Successfully created a fixed-price sell order! ${offer.asset.openseaLink}\n`
  );
}
