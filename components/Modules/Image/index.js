import { Container, Row, Column } from "../../Grid";
import styles from "./image.module.scss";

const Image = ({ content, image }) => {
  return (
    <section
      className={styles.section}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.content}>
        <Container>
          <Row align="center" textAlign={{ xs: "center" }}>
            <Column columns={{ xs: 14, sm: 11 }} offsets={{ sm: 1 }}>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </Column>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Image;
