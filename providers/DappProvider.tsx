import React, { useEffect, useState, createContext } from "react";
import { useMoralis } from "react-moralis";

type DappContextType = {};

export const DappContext = createContext({} as DappContextType);

export default function DappProvider({ children }) {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  const [contractABI, setContractABI] = useState(
    '{"noContractDeployed": true}'
  ); //Smart Contract ABI here
  const [marketAddress, setMarketAddress] = useState(); //Smart Contract Address Here

  useEffect(() => {
    // @ts-ignore
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    // @ts-ignore
    Moralis.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
  }, []);

  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useEffect(
    () =>
      setWalletAddress(
        web3.givenProvider?.selectedAddress || user?.get("ethAddress")
      ),
    [web3, user]
  );

  return (
    <DappContext.Provider
      value={{
        walletAddress,
        chainId,
        marketAddress,
        setMarketAddress,
        contractABI,
        setContractABI,
      }}
    >
      {children}
    </DappContext.Provider>
  );
}
