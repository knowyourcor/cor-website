import { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import Layout from "../components/Layout";
import "../styles/globals.scss";

function CorWebsite({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  // Layout grid used for alignment while in development
  const [layoutActive, setLayoutGrid] = useState(false);

  const toggleGrid = (e) => {
    if (e.key === "G" && e.shiftKey) {
      setLayoutGrid((prevState) => !prevState);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", toggleGrid);
    return () => {
      window.removeEventListener("keydown", toggleGrid);
    };
  }, []);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <Layout isActive={layoutActive} />
    </ApolloProvider>
  );
}

export default CorWebsite;
