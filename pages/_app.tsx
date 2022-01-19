import Layout from "components/Layout";
import queryClient from "lib/react-query-client";
import { AppProps } from "next/app";
import MeProvider from "providers/MeProvider";
import { MoralisProvider } from "react-moralis";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* TODO: MOVE THESE TO ENV VARIABLES */}
      {/* <MoralisProvider
        appId="sCbUKhxmfO1Cs9QVqEBMzH04f9BUi7lB7NdnBlqW"
        serverUrl="https://moyhxx9ddttm.usemoralis.com:2053/server"
      > */}
      <MeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </MeProvider>
      {/* </MoralisProvider> */}
    </QueryClientProvider>
  );
}
