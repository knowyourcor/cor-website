import Head from "../components/Head";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Modules from "../components/Modules";
import { homepage } from "../data/temp";

import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head title="Welcome" />
      <main>
        <Topbar />
        <Modules data={homepage} />
      </main>
      <Footer />
    </>
  );
}
