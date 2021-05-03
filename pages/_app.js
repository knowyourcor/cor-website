import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import "focus-visible";
import "../styles/globals.scss";
import "../styles/pages.scss";
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import '../styles/swiper.scss'

function CorWebsite({ Component, pageProps }) {
  // Google Tag Manager
  useEffect(() => {
    // TODO: replace GTM-123456 with COR's GTM ID
    // TagManager.initialize({ gtmId: "GTM-123456" });
  }, []);
  return (
    <>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
    </>
  );
}

export default CorWebsite;
