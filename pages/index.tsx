import AbsoluteContainer from "components/AbsoluteContainer";
import Button from "components/Button";
import Input from "components/Input";
import { useEffect, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";

const network = "testnet";

export default function Home() {
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
    const res = await Moralis.Plugins.opensea.getAsset({
      network,
      tokenAddress,
      tokenId,
    });
    console.log(res);
  };

  const getSellOrder = async () => {
    const res = await Moralis.Plugins.opensea.getOrders({
      network,
      tokenAddress,
      tokenId,
      orderSide: 1,
      page: 1, // pagination shows 20 orders each page
    });
    console.log(res);
  };

  const getBuyOrder = async () => {
    const res = await Moralis.Plugins.opensea.getOrders({
      network,
      tokenAddress,
      tokenId,
      orderSide: 0,
      page: 1, // pagination shows 20 orders each page
    });
    console.log(res);
  };

  const createSellOrder = async () => {
    const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);
    const startAmount = 1;
    const endAmount = 1;

    await Moralis.Plugins.opensea.createSellOrder({
      network,
      tokenAddress,
      tokenId,
      tokenType: "ERC1155",
      userAddress,
      startAmount,
      endAmount,
      expirationTime: startAmount > endAmount && expirationTime, // Only set if you startAmount > endAmount
    });

    console.log("Create Sell Order Successful");
  };

  const createBuyOrder = async () => {
    await Moralis.Plugins.opensea.createBuyOrder({
      network,
      tokenAddress,
      tokenId,
      tokenType: "ERC721",
      amount: 0.0,
      userAddress,
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
            Autofill
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
