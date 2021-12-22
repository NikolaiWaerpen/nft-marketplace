import AbsoluteContainer from "components/AbsoluteContainer";
import Button from "components/Button";
import { useState } from "react";

export default function Home() {
  const [publicAddress, setPublicAddress] = useState("");

  return (
    <AbsoluteContainer>
      {!publicAddress ? (
        <Button
          onClick={async () => {
            // @ts-ignore
            const publicAddresses = await ethereum.request({
              method: "eth_requestAccounts",
            });
            const publicAddress = publicAddresses[0] as string;

            await setPublicAddress(publicAddress);
          }}
        >
          Connect ethereum
        </Button>
      ) : (
        <div>
          <h1>Logged in as {publicAddress}</h1>
        </div>
      )}
    </AbsoluteContainer>
  );
}
