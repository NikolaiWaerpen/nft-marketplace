import { AppProps } from "next/app";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { QueryClientProvider } from "react-query";
import queryClient from "lib/react-query-client";
import OfferModal from "components/OfferModal";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MoralisProvider
        appId="sCbUKhxmfO1Cs9QVqEBMzH04f9BUi7lB7NdnBlqW"
        serverUrl="https://moyhxx9ddttm.usemoralis.com:2053/server"
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </QueryClientProvider>
  );
}
