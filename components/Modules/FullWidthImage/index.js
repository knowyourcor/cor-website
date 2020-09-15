import { Container, Row, Column } from "../../Grid";
import Button from "../../Button";
import styles from "./fullWidthImage.module.scss";

const FullWidthImage = ({ primary }) => {
  return (
    <section className={styles.section}>
      <div className={styles.backgroundImage}>
        <img src={primary.image.xxl.url} alt={primary.image.alt} />
      </div>
      <div className={styles.content}>
        <Container>
          <Row align="center" justify="center" textAlign={{ xs: "center" }}>
            <Column columns={{ xs: 14, sm: 6 }}>
              <h2>{primary.headline[0].text}</h2>
              <Button linkData={primary.link} labelData={primary.link_label} />
            </Column>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default FullWidthImage;
