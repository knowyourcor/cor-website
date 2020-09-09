import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import styles from "./carousel.module.scss";

const Slide = ({ headline, text, image }) => {
  return (
    <div className={styles.tab}>
      <Row align="center" textAlign={{ xs: "center" }}>
        <Column columns={{ xs: 14, sm: 7 }}>
          <RichText render={headline} />
          <RichText render={text} />
        </Column>
        <Column columns={{ xs: 14, sm: 7 }}>
          <img src={image.xxl.url} alt={image.alt} className={styles.image} />
        </Column>
      </Row>
    </div>
  );
};

const Carousel = ({ primary, fields }) => {
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
            {primary.text && <RichText render={primary.text} />}
          </Column>
        </Row>

        {fields.map((field, index) => {
          return <Slide {...field} key={`slide_${index}`} />;
        })}
      </Container>
    </Section>
  );
};

export default Carousel;
