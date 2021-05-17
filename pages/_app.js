import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/ApolloClient";
import "focus-visible";
import TagManager from "react-gtm-module";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import "../styles/pages.scss";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "../styles/swiper.scss";

export default function CorWebsite({ Component, pageProps, router }) {
  // Google Tag Manager
  useEffect(() => {
    // TODO: replace GTM-123456 with COR's GTM ID
    // TagManager.initialize({ gtmId: "GTM-123456" });
  }, []);

  const getLayout =
    Component.getLayout || ((page) => <Layout children={page} />);
  return getLayout(
    <ApolloProvider client={client}>
      <Component {...pageProps} key={router.route} />
    </ApolloProvider>
  );
}
