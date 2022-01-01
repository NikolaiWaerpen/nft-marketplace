import { ACCOUNT_ADDRESS } from "consts";
import seaport from "lib/seaport-client";
import { NextApiRequest, NextApiResponse } from "next";
import { OpenSeaAsset } from "opensea-js/lib/types";

async function getAsset(tokenAddress: string, tokenId: string) {
  const asset: OpenSeaAsset = await seaport.api.getAsset({
    tokenAddress,
    tokenId,
  });

  console.log(asset);
  return asset;
}

async function createBuyOrder(
  tokenAddress: string,
  tokenId: string,
  pricePerItem: string,
  quantity?: string,
  offerExpiration?: string
) {
  const {
    tokenId: responseTokenId,
    tokenAddress: responseTokenAddress,
    name,
  } = await getAsset(tokenAddress, tokenId);

  const offer = await seaport.createBuyOrder({
    asset: {
      tokenId: responseTokenId,
      tokenAddress: responseTokenAddress,
      name,
      // Only needed for the short-name auction, not ENS names
      // that have been sold once already:
      // schemaName: "ENSShortNameAuction"
    },
    // Your wallet address (the bidder's address):
    accountAddress: ACCOUNT_ADDRESS,
    // Value of the offer, in wrapped ETH:
    startAmount: parseInt(pricePerItem),
  });

  console.log("offer", offer);
  console.log("offer created successfully");
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tokenAddress, tokenId } = req.query;

  if (!tokenAddress ?? !tokenId)
    return res.status(400).json({ error: "invalid request" });

  createBuyOrder(tokenAddress as string, tokenId as string, "0.00001");

  res.status(200).json({ message: "buy order successful" });
}
