import Head from "../Head";
import { Container, Row, Column } from "../Grid";
import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <>
      <Head title="Loading..." />
      <div className={styles.container}>
        <Container>
          <Row>
            <Column columns={{ xs: 14, md: 12 }} offsets={{ sm: 1 }}>
              <h2>Loading...</h2>
            </Column>
          </Row>
        </Container>
      </div>
    </>
  );
}
