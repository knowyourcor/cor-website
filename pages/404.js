import { useState } from "react";
import Head from "../components/Head";
import Link from "next/link";
import { getLayout } from "../components/Layout/PageLayout";
import { Container, Row, Column } from "../components/Grid";
import { getMenuData } from "../lib/api";
import Button from "../components/Button";
import RoundelContainer from "../components/RoundelContainer";
import { useDebounceCallback } from "@react-hook/debounce";
import styles from "../styles/Error.module.scss";

const useCallback = (initialState, wait, leading) => {
  // this is the same code useDebounce() uses to debounce setState
  const [state, setState] = useState(initialState);
  return [state, useDebounceCallback(setState, wait, leading)];
};

export default function Error() {
  const [index, setIndex] = useCallback(0, 150);
  const handelIndex = () => {
    setIndex((prev) => prev + 1);
  };
  return (
    <>
      <Head title="Error" />
      <section className={styles.error}>
        <button onClick={handelIndex} className={styles.roundelButton}>
          <RoundelContainer index={index} />
        </button>
        <Container>
          <Row justify={{ xs: "center" }}>
            <Column columns={{ xs: 14, sm: 6 }}>
              <h3>We can't find that page.</h3>
              <p>
                If you have any questions please contact us at{" "}
                <a href="mailto:help@thecor.com">help@thecor.com</a>.
              </p>
            </Column>
          </Row>
        </Container>
      </section>
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  return {
    props: {
      preview,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1, // In seconds
  };
}

Error.getLayout = getLayout;
