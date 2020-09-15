import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import styles from "./textImage.module.scss";

const TextImage = ({ primary }) => {
  return (
    <Section backgroundColor={primary.background_color} align="center">
      <Container>
        {primary.headline[0].text && (
          <Row align="center" textAlign={{ xs: "center" }}>
            <Column columns={{ xs: 14, md: 10 }} offsets={{ md: 2 }}>
              <RichText render={primary.headline} />
            </Column>
          </Row>
        )}
        <Row align="center" textAlign={{ xs: "left" }}>
          <Column
            columns={{ xs: 14, md: 6 }}
            offsets={{ md: 1 }}
            overlaps={primary.overlap_text_and_image ? { md: 2 } : ""}
            orders={{ xs: 2, md: 1 }}
            justify="center"
          >
            <RichText render={primary.text} />
          </Column>
          <Column
            columns={
              primary.overlap_text_and_image
                ? { xs: 14, md: 9 }
                : { xs: 14, md: 6 }
            }
            orders={{ xs: 1, md: 2 }}
          >
            <Picture {...primary} classes={styles.image} />
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default TextImage;
