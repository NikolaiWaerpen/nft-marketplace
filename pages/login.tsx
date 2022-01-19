import Button from "components/Button";
import FullscreenContainer from "components/FullscreenContainer";
import useMe from "hooks/useMe";

// TODO: fix this with provider
export default function Login() {
  const { me, setMe } = useMe();

  return (
    <FullscreenContainer>
      {!me ? (
        <Button
          onClick={async () => {
            // @ts-ignore
            const publicAddresses = await ethereum.request({
              method: "eth_requestAccounts",
            });
            const publicAddress = publicAddresses[0] as string;

            await setMe(publicAddress);
          }}
        >
          Connect to metamask
        </Button>
      ) : (
        <div>{me}</div>
      )}
    </FullscreenContainer>
  );
}
