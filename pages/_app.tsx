import Layout from "components/Layout";
import queryClient from "lib/react-query-client";
import { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";

// const { MORALIS_APPLICATION_ID, MORALIS_SERVER_URL } = process.env;

// TODO: Clean this up
const APP_ID = process.env.MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.MORALIS_SERVER_URL;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MoralisProvider
        appId={"sCbUKhxmfO1Cs9QVqEBMzH04f9BUi7lB7NdnBlqW"}
        serverUrl={"https://moyhxx9ddttm.usemoralis.com:2053/server"}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </MoralisProvider>
    </QueryClientProvider>
  );
}
