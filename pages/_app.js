import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/ApolloClient";
import "focus-visible";
import TagManager from "react-gtm-module";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "../styles/swiper.scss";

export default function CorWebsite({ Component, pageProps, router }) {
  // Google Tag Manager
  useEffect(() => {
    TagManager.initialize({ gtmId: "UA-177620776-1" });
  }, []);
  const getLayout =
    Component.getLayout || ((page) => <Layout children={page} />);
  return getLayout(
    <ApolloProvider client={client}>
      <Component {...pageProps} key={router.route} />
    </ApolloProvider>
  );
}
