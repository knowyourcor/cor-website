import Head from "../components/Head";
import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

import Modules from "../components/Modules";
import { shop } from "../data/temp";

// import styles from "../styles/Shop.module.scss";

export default function Shop() {
  return (
    <>
      <Head title="Shop" />
      <main>
        <Topbar />
        <Modules data={shop} />
      </main>
      <Footer />
    </>
  );
}
