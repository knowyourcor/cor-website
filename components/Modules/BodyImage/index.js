import { RichText } from "prismic-reactjs";
import Picture from "../../Picture";
import { Container, Row, Column } from "../../Grid";
import styles from "./bodyImage.module.scss";

const BodyImage = ({ primary }) => {
  return (
    <div className={styles.image}>
      <Container>
        <Row>
          <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
            <div className={styles.container}>
              <Picture image={primary.image} />
            </div>
            <div className={styles.caption}>
              <RichText render={primary.caption} />
            </div>
          </Column>
        </Row>
      </Container>
    </div>
  );
};

export default BodyImage;
