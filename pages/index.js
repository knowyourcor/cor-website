import Head from "../components/Head";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Modules from "../components/Modules";
import { homepage } from "../data/temp";
import Alert from "../components/alert";

import { getHomepageData } from "../lib/api";

import styles from "../styles/Home.module.scss";

export default function Index({ preview, pageData }) {
  return (
    <>
      <Head title={pageData.meta_title} />
      <Alert preview={preview} />
      <main>
        <Topbar />
        <Modules pageData={pageData} />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const pageData = await getHomepageData(previewData);
  return {
    props: { preview, pageData },
    revalidate: 1, // In seconds
  };
}
