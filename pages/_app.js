import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/globals.scss";

function CorWebsite({ Component, pageProps }) {
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
    <>
      <Component {...pageProps} />
      <Layout isActive={layoutActive} />
    </>
  );
}

export default CorWebsite;
