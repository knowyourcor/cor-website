import Head from "../components/Head";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Modules from "../components/Modules";
import Alert from "../components/Alert";

import { getHomepageData, getMenuData } from "../lib/api";

export default function Index({
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
        <Topbar mainMenuData={mainMenuData} transparent />
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
  const pageData = await getHomepageData(previewData);
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
