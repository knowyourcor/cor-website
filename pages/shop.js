import Head from "../components/Head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Modules from "../components/Modules";
import Alert from "../components/Alert";
import { getShopData, getMenuData } from "../lib/api";

export default function Shop({
  preview,
  pageData,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
}) {
  return (
    <>
      <Head title={pageData.meta_title} />
      <Alert preview={preview} />
      <main>
        <Navigation mainMenuData={mainMenuData} />
        <Modules pageData={pageData} />
      </main>
      <Footer
        footerMenuData={footerMenuData}
        tertiaryMenuData={tertiaryMenuData}
      />
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const pageData = await getShopData(previewData);
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  return {
    props: {
      preview,
      pageData,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1, // In seconds
  };
}
