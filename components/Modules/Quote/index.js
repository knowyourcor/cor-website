import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import styles from "./quote.module.scss";

const Quote = ({ primary }) => {
  return (
    <Section backgroundColor={primary.background_color} align="center">
      <Container>
        <Row justify="center" textAlign={{ xs: "center", md: "left" }}>
          <Column
            justify="center"
            columns={{ xs: 14, md: 8, lg: 9 }}
            offsets={{ lg: 1 }}
            overlaps={{ lg: 2 }}
            orders={{ xs: 2, md: 1 }}
          >
            <blockquote className={styles.quote}>
              <q>{primary.quote[0].text}</q>
              <footer>—{primary.author_name[0].text}</footer>
            </blockquote>
          </Column>
          <Column
            justify="center"
            columns={{ xs: 8, sm: 6, md: 6, lg: 6 }}
            orders={{ xs: 1, md: 2 }}
          >
            <div className={styles.authorPortrait}>
              <img
                src={primary.author_portrait.xxl.url}
                alt={primary.author_portrait.alt}
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 754 754">
                <path d="M754.001 754h-754V0h754v754zM103.566 465.85a286.381 286.381 0 0040.549 79.672 289.175 289.175 0 0062.294 62.883 286.054 286.054 0 00170.595 56.1v87.5h.029a380.085 380.085 0 0038.313-1.936 374.429 374.429 0 00334.721-334.721 379.967 379.967 0 000-76.684A374.429 374.429 0 00415.346 3.943a380.348 380.348 0 00-76.684 0A374.424 374.424 0 003.941 338.664 380.84 380.84 0 002.001 377a374.716 374.716 0 0018.331 115.891l83.23-27.039z" />
              </svg>
            </div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default Quote;
