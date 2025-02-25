import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/ApolloClient";
import "focus-visible";
import TagManager from "react-gtm-module";
import { hotjar } from 'react-hotjar'
import Layout from "../components/Layout";
import "../styles/globals.scss";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "../styles/swiper.scss";

export default function CorWebsite({ Component, pageProps, router }) {
  // Google Tag Manager
  useEffect(() => {
    // TagManager.initialize({ gtmId: "GTM-NPTLBNX" });
    TagManager.initialize({ gtmId: "GTM-KVLRT2S" });
  }, []);
useEffect(() => {
  hotjar.initialize(2916941, 6)
}, [])
  const getLayout =
    Component.getLayout || ((page) => <Layout children={page} />);
  const apolloClient = useApollo(pageProps);
  return getLayout(
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} key={router.route} />
    </ApolloProvider>
  );
}
