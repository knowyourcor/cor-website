import { Container, Row, Column } from "../../Grid";
import styles from "./fullWidthImage.module.scss";

const FullWidthImage = ({ primary }) => {
  return (
    <section className={styles.section}>
      <div className={styles.backgroundImage}>
        <img src={primary.image.xxl.url} alt={primary.image.alt} />
      </div>
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

export default FullWidthImage;
