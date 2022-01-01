import { OpenSeaAsset } from "opensea-js/lib/types";

export default async function getAsset(
  tokenAddress: string,
  tokenId: string,
  seaport: any
) {
  const asset: OpenSeaAsset = await seaport.api.getAsset({
    tokenAddress,
    tokenId,
  });

  console.log(asset);
  return asset;
}
