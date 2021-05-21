import Head from "next/head";

const Title = ({ title, description }) => {
  return (
    <Head>
      {/* General Meta Tags */}
      <title>{title ? `${title} - COR` : "COR"}</title>
      <meta
        name="description"
        content={
          description
            ? description
            : "There’s more to health than steps & weight"
        }
      />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=10.0, minimal-ui, viewport-fit=cover"
      />
      <meta name="theme-color" content="#f4f4f4" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://thecor.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ? `${title} - COR` : "COR"} />
      <meta
        property="og:description"
        content={
          description
            ? description
            : "There’s more to health than steps & weight"
        }
      />
      <meta property="og:image" content="//thecor.com/images/preview.png" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="thecor.com" />
      <meta property="twitter:url" content="https://thecor.com/" />
      <meta name="twitter:title" content={title ? `${title} - COR` : "COR"} />
      <meta
        name="twitter:description"
        content={
          description
            ? description
            : "There’s more to health than steps & weight"
        }
      />
      <meta
        name="twitter:image"
        content="https://thecor.com/images/preview.jpg"
      />
      {/* Search results preview image */}
      <meta
        name="thumbnail"
        content="https://thecor.com/images/thumbnail.jpg"
      />
    </Head>
  );
};

export default Title;
