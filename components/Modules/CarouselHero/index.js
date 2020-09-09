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
      <div className={styles.slideLeft}>
        {image && <img src={image.xxl.url} alt={image.alt} />}
      </div>
      <div className={styles.slideRight}>
        {headline && (
          <div className={styles.headline}>
            <RichText render={headline} />
          </div>
        )}
        {number && number}
        {video_source && video_source}
      </div>
    </div>
  );
};

const CarouselHero = ({ primary, fields }) => {
  return (
    <Section
      fullScreen
      backgroundColor={primary.background_color}
      align="center"
      noPadding
    >
      {fields.map((field, index) => {
        return <Slide {...field} key={`slide_${index}`} />;
      })}
    </Section>
  );
};

export default CarouselHero;
