import Hero from "components/Hero";
import Promotion from "components/Promotion";
import Team from "components/Team";
import Testimonial from "components/Testimonial";
import DappProvider from "providers/DappProvider";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export default function Home() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <>
      <DappProvider>
        <Hero />
        <Testimonial />
        <Promotion />
        <Team />
      </DappProvider>
    </>
  );
}
