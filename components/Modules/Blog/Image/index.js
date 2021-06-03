import Picture from "../../../Picture";
import { Container, Row, Column } from "../../../Grid";
import styles from "./image.module.scss";

export default function Image({ primary }) {
  const imageColumns =
    primary?.width === "half" ? { xs: 14, md: 6 } : { xs: 14, md: 12 };
  const imageOffsets = primary?.width === "half" ? { md: 6 } : { md: 1 };
  return (
    <>
      {primary.image && (
        <div className={styles.image}>
          <Container>
            <Row>
              <Column columns={imageColumns} offsets={imageOffsets}>
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
