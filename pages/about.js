import Layout from "../components/Layout"
import Modules from "../components/Modules";

import { getPageData, getMenuData } from "../lib/api";

// import styles from "../styles/about.module.scss"

export default function About({
  preview,
  pageData,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
}) {
  return (
    <Layout
      classNameVal="about"
      title={pageData?.meta_title}
      preview={preview}
      mainMenuData={mainMenuData}
      footerMenuData={footerMenuData}
      tertiaryMenuData={tertiaryMenuData}
    >
      <Modules pageData={pageData} />
    </Layout>
  )
}

export async function getStaticProps({ preview = false, previewData }) {
  const pageData = await getPageData("about", previewData);
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
    revalidate: 5,
  };
}