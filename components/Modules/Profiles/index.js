import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import styles from "./profiles.module.scss";

const Tab = (tabData) => {
  return (
    <div className={styles.tab}>
      <Row align="center" textAlign={{ xs: "center" }}>
        <Column columns={{ xs: 14, sm: 7 }}>
          <RichText render={tabData.tab_name} />
          <RichText render={tabData.profile_name} />
          <RichText render={tabData.profile_description} />
          <RichText render={tabData.profile_text} />
          <RichText render={tabData.profile_type} />
          <p>{tabData.profile_score}</p>
        </Column>
        <Column columns={{ xs: 14, sm: 7 }}>
          <img
            src={tabData.image.xxl.url}
            alt={tabData.image.alt}
            className={styles.image}
          />
        </Column>
      </Row>
    </div>
  );
};

const Profiles = ({ primary, fields }) => {
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

export default Profiles;
