import Footer from "components/Footer";
import Layout from "components/Layout";
import Navigation from "components/Navigation";
import queryClient from "lib/react-query-client";
import { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import { QueryClientProvider } from "react-query";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MoralisProvider
        appId="sCbUKhxmfO1Cs9QVqEBMzH04f9BUi7lB7NdnBlqW"
        serverUrl="https://moyhxx9ddttm.usemoralis.com:2053/server"
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MoralisProvider>
    </QueryClientProvider>
  );
}
