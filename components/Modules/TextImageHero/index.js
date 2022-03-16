import { RichText } from "prismic-reactjs";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import styles from "./textImageHero.module.scss";
import Section from "../../Section"

export default function TextImageHero({ primary }) {
  return (
    <Section className={styles.textImageHero}
      backgroundColor={primary.background_color}
    >
      <Container>
        <Row align={{ xs: "center" }}>
          <Column
            className={styles.firstCol}
            columns={{ xs: 14, md: 5, xl: 4 }}
            offsets={{ md: 1 }}
          >
            <RichText render={primary.text} />
          </Column>
          <Column
            className={styles.secondCol}
            columns={{ xs: 14, md: 7, xl: 5}}
            offsets={{ md: 3 }}
          >
            <div className={styles.image}>
                <Picture image={primary.image} />
            </div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
}
