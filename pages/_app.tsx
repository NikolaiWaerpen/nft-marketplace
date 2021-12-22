import { AppProps } from "next/app";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId="sCbUKhxmfO1Cs9QVqEBMzH04f9BUi7lB7NdnBlqW"
      serverUrl="https://moyhxx9ddttm.usemoralis.com:2053/server"
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}
