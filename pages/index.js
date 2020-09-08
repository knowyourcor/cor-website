import Head from "../components/Head";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Modules from "../components/Modules";
import { homepage } from "../data/temp";
import Alert from "../components/alert";

import { getHomepageData } from "../lib/api";

import styles from "../styles/Home.module.scss";

export default function Index({ preview, data }) {
  return (
    <>
      <Head title={data.meta_title} />
      <Alert preview={preview} />
      <main>
        <Topbar />
        <Modules data={homepage} />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const data = await getHomepageData(previewData);
  return {
    props: { preview, data },
    revalidate: 1, // In seconds
  };
}
