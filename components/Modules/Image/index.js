import { Container, Row, Column } from "../../Grid";
import styles from "./image.module.scss";

const Image = ({ primary }) => {
  return (
    <section
      className={styles.section}
      style={{ backgroundImage: `url(${primary.image.xxl.url})` }}
    >
      <div className={styles.content}>
        <Container>
          <Row align="center" textAlign={{ xs: "center" }}>
            <Column columns={{ xs: 14, sm: 11 }} offsets={{ sm: 1 }}>
              <h2>{primary.headline[0].text}</h2>
            </Column>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Image;
