import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import styles from "./carouselHero.module.scss";

// primary {
//   headline
//   text
// }
// fields {
//   image
//   headline
//   text
// }

// TO DO: add link

const Slide = ({ image, headline, number, video_source }) => {
  return (
    <div className={styles.slide}>
      <Row align="center" textAlign={{ xs: "center" }}>
        <Column columns={{ xs: 14, sm: 7 }}>
          {image && <img src={image.xxl.url} alt={image.alt} />}
        </Column>
        <Column columns={{ xs: 14, sm: 7 }}>
          {headline && <RichText render={headline} />}
          {number && number}
          {video_source && video_source}
        </Column>
      </Row>
    </div>
  );
};

const CarouselHero = ({ primary, fields }) => {
  return (
    <Section
      fullScreen
      backgroundColor={primary.background_color}
      align="center"
    >
      <Container>
        {fields.map((field, index) => {
          return <Slide {...field} key={`slide_${index}`} />;
        })}
      </Container>
    </Section>
  );
};

export default CarouselHero;
