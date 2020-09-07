import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import styles from "./homepageHero.module.scss";

const HomepageHero = ({ content }) => {
  return (
    <Section>
      <Container>
        <Row align="center" textAlign={{ xs: "center" }}>
          <Column columns={{ xs: 14, sm: 11 }} offsets={{ sm: 1 }}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default HomepageHero;
