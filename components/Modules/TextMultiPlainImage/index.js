import { RichText } from "prismic-reactjs";
import Picture from "../../Picture";
import { Container, Row, Column } from "../../Grid";
import styles from "./textMultiPlainImage.module.scss";
import Section from "../../Section";


const TextMultiPlainImage = ({ primary, fields }) => {
  return (
    <div className={styles.image}>
      <Section
        backgroundColor={primary.background_color}
      >
        <Container>
          <Row>
            <Column  offsets={{ sm: 1 }}>
              <RichText render={primary.text} />
            </Column>
          </Row>
          <Row>
            {fields.map((field) => (
              <Column columns={{ xs: 7, sm: 2 }} offsets={{ sm: 1 }}>
                <div className={styles.container}>
                  <Picture image={field.image} />
                </div>
              </Column>
            ))}
          </Row>
        </Container>
      </Section>
    </div>
  );
};

export default TextMultiPlainImage;
