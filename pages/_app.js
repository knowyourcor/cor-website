import { useEffect } from "react";
import TagManager from "react-gtm-module";
import "../styles/globals.scss";

function CorWebsite({ Component, pageProps }) {
  // Google Tag Manager
  useEffect(() => {
    // TODO: replace GTM-123456 with COR's GTM ID
    // TagManager.initialize({ gtmId: "GTM-123456" });
  }, []);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default CorWebsite;
