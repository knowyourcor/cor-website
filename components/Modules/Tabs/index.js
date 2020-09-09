import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import styles from "./tabs.module.scss";

const Tab = ({ tab_name, text, image }) => {
  return (
    <div className={styles.tab}>
      <Row align="center" textAlign={{ xs: "center" }}>
        <Column columns={{ xs: 14, sm: 7 }}>
          <RichText render={tab_name} />
          <RichText render={text} />
        </Column>
        <Column columns={{ xs: 14, sm: 7 }}>
          <img src={image.xxl.url} alt={image.alt} className={styles.image} />
        </Column>
      </Row>
    </div>
  );
};

const Tabs = ({ primary, fields }) => {
  return (
    <Section
      fullScreen
      backgroundColor={primary.background_color}
      align="center"
    >
      <Container>
        <Row align="center" textAlign={{ xs: "center" }}>
          <Column columns={{ xs: 14 }}>
            {primary.headline && <RichText render={primary.headline} />}
          </Column>
        </Row>

        {fields.map((field, index) => {
          return <Tab {...field} key={`tab_${index}`} />;
        })}
      </Container>
    </Section>
  );
};

export default Tabs;
