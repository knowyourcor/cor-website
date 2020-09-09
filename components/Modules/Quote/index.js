import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import styles from "./quote.module.scss";

const Quote = ({ primary }) => {
  return (
    <Section
      fullScreen
      backgroundColor={primary.background_color}
      align="center"
    >
      <Container>
        <Row align="center" textAlign={{ xs: "center" }}>
          <Column columns={{ xs: 14, sm: 11 }} offsets={{ sm: 1 }}>
            <blockquote>
              {primary.quote[0].text}
              <footer>—{primary.author_name[0].text}</footer>
            </blockquote>
            <img
              src={primary.author_portrait.xxl.url}
              alt={primary.author_portrait.alt}
              className={styles.authorPortrait}
            />
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default Quote;
