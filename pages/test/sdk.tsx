import AbsoluteContainer from "components/AbsoluteContainer";
import Button from "components/Button";
import Input from "components/Input";
import seaport from "lib/seaport-client";
import {
  OpenSeaAsset,
  OrderSide,
  WyvernSchemaName,
} from "opensea-js/lib/types";
import { useEffect, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";

const network = "testnet";

const publicAddress = "0x74d27fa12f8203170f2e4a43ba7455db906777f2";

export default function sdk() {
  const {
    Moralis,
    user,
    logout,
    authenticate,
    enableWeb3,
    isInitialized,
    isAuthenticated,
    isWeb3Enabled,
  } = useMoralis();

  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenId, setTokenId] = useState("");

  const userAddress = useMemo(
    () => isAuthenticated && user.get("accounts")[0],
    [user, isAuthenticated]
  );

  const getAsset = async () => {
    const asset: OpenSeaAsset = await seaport.api.getAsset({
      tokenAddress, // string
      tokenId, // string | number | null
    });

    console.log(asset);
    return asset;
  };

  const getSellOrder = async () => {
    const sellOrders = await seaport.api.getOrders({
      asset_contract_address: tokenAddress,
      token_id: tokenId,
      side: 0,
    });

    console.log(sellOrders);
  };

  const getBuyOrder = async () => {
    const buyOrders = await seaport.api.getOrders({
      asset_contract_address: tokenAddress,
      token_id: tokenId,
      side: 1,
    });

    console.log(buyOrders);
  };

  const createSellOrder = async () => {
    const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);
    const startAmount = 420;
    const endAmount = 69;

    // await Moralis.Plugins.opensea.createSellOrder({
    //   network,
    //   tokenAddress,
    //   tokenId,
    //   tokenType: "ERC1155",
    //   userAddress,
    //   startAmount,
    //   endAmount,
    //   expirationTime: startAmount > endAmount && expirationTime, // Only set if you startAmount > endAmount
    // });

    await seaport.createSellOrder({
      asset: {
        tokenAddress,
        tokenId,
        schemaName: "ERC1155" as WyvernSchemaName,
      },
      accountAddress: publicAddress,
      startAmount,
      endAmount,
      expirationTime: startAmount > endAmount && expirationTime,
    });

    console.log("Create Sell Order Successful");
  };

  const createBuyOrder = async () => {
    const {
      tokenAddress: assetTA,
      tokenId: assetTI,
      name,
      schemaName,
    } = await getAsset();

    await seaport.createBuyOrder({
      asset: {
        tokenAddress: assetTA,
        tokenId: assetTI,
        name,
        schemaName,
      },
      accountAddress: publicAddress,
      startAmount: 0,
      // startAmount: 0.0,
      // endAmount: 0.0,
      paymentTokenAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
    });

    console.log("Create Buy Order Successful");
  };

  useEffect(() => {
    // if (isInitialized) {
    //   Moralis.initPlugins();
    // }
  }, []);

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled) {
      enableWeb3();
    }
  }, [isAuthenticated]);

  return (
    <AbsoluteContainer>
      <div className="mb-20 grid place-items-center">
        {isAuthenticated ? (
          <div className="gap-2 flex items-center">
            <div>{userAddress}</div>
            <Button onClick={() => logout()}>Logout</Button>
          </div>
        ) : (
          <Button onClick={() => authenticate()}>Metamask</Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Input
            placeholder="Token Address"
            value={tokenAddress}
            onChange={(event) => setTokenAddress(event.target.value)}
          />
          <Input
            placeholder="Token ID"
            value={tokenId}
            onChange={(event) => setTokenId(event.target.value)}
          />
          <Button
            onClick={() => {
              setTokenAddress("0xbae166ac88c878785ec609eb65cbf7ecf638e98c");
              setTokenId("61");
            }}
          >
            Autofill buy
          </Button>
          <Button
            onClick={() => {
              setTokenAddress("0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656");
              setTokenId(
                "52840209186602979145466938514798224023748304968365294380404559583410728730625"
              );
            }}
          >
            Autofill sell
          </Button>
          <Button
            onClick={() => {
              setTokenAddress("");
              setTokenId("");
            }}
          >
            Clear
          </Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={getAsset}>Get Asset</Button>
          <Button onClick={getSellOrder}>Get Sell Orders</Button>
          <Button onClick={getBuyOrder}>Get Buy Orders</Button>
          {isAuthenticated && (
            <>
              <Button onClick={createSellOrder}>Create Sell Order</Button>
              <Button onClick={createBuyOrder}>Create Buy Order</Button>
            </>
          )}
        </div>
      </div>
    </AbsoluteContainer>
  );
}
