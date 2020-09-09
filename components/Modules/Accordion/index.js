import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import styles from "./accordion.module.scss";

const Item = ({ title, text }) => {
  return (
    <div className={styles.item}>
      <Row align="center" textAlign={{ xs: "center" }}>
        <Column columns={{ xs: 14 }}>
          <RichText render={title} />
          <RichText render={text} />
        </Column>
      </Row>
    </div>
  );
};

const Accordion = ({ primary, fields }) => {
  return (
    <Section
      fullScreen
      backgroundColor={primary.background_color}
      align="center"
    >
      <Container>
        <Row align="center" textAlign={{ xs: "center" }}>
          <Column columns={{ xs: 14, sm: 11 }} offsets={{ sm: 1 }}>
            <RichText render={primary.headline} />
          </Column>
        </Row>

        {fields.map((field, index) => {
          return <Item {...field} key={`item_${index}`} />;
        })}
      </Container>
    </Section>
  );
};

export default Accordion;
