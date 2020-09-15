import Head from "next/head";

const Title = ({ title }) => {
  return (
    <Head>
      <title>{title ? `${title} | COR` : "COR"}</title>
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=10.0,minimal-ui"
      />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="Description"
        content="There’s more to health than steps & weight"
      />
      <meta name="title" property="og:title" content={`${title} | COR`} />
      <meta name="theme-color" content="#f2f2f2" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#f2f2f2" />
    </Head>
  );
};

export default Title;
