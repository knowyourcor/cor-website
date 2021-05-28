import Picture from "../../../Picture";
import { Container, Row, Column } from "../../../Grid";
import styles from "./image.module.scss";

export default function Image({ primary }) {
  return (
    <>
      {primary.image && (
        <div className={styles.image}>
          <Container>
            <Row>
              <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
                <div className={styles.container}>
                  <Picture image={primary.image} />
                </div>
              </Column>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}
