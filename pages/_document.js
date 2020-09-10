import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CorDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-177620776-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-177620776-1');
            `,
            }}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
