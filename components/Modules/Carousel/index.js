import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import { useKeenSlider } from "keen-slider/react";

import styles from "./carousel.module.scss";

const Slide = ({ headline, text, image }) => {
  return (
    <div className={styles.tab}>
      <div className={styles.portrait}>
        <img src={image.xxl.url} alt={image.alt} className={styles.image} />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 754 754">
          <path d="M754.001 754h-754V0h754v754zM103.566 465.85a286.381 286.381 0 0040.549 79.672 289.175 289.175 0 0062.294 62.883 286.054 286.054 0 00170.595 56.1v87.5h.029a380.085 380.085 0 0038.313-1.936 374.429 374.429 0 00334.721-334.721 379.967 379.967 0 000-76.684A374.429 374.429 0 00415.346 3.943a380.348 380.348 0 00-76.684 0A374.424 374.424 0 003.941 338.664 380.84 380.84 0 002.001 377a374.716 374.716 0 0018.331 115.891l83.23-27.039z" />
        </svg>
      </div>

      <div className={styles.content}>
        <RichText render={headline} />
        <RichText render={text} />
      </div>
    </div>
  );
};

// $xs: 32rem; // ~512px
// $sm: 48rem; // ~768px
// $md: 64rem; // ~1024px
// $lg: 80rem; // ~1280px
// $xl: 90rem; // ~1440px
// $xxl: 105rem // ~1680px

const Carousel = ({ primary, fields }) => {
  const [sliderRef] = useKeenSlider({
    slidesPerView: 2,
    spacing: 15,
    centered: true,
    breakpoints: {
      "(min-width: 768px)": {
        spacing: 30,
        slidesPerView: 3,
      },
      "(min-width: 1024px)": {
        spacing: 30,
        slidesPerView: 3,
        centered: true,
      },
      "(min-width: 1280px)": {
        spacing: 160,
        slidesPerView: 4,
        centered: true,
      },
    },
  });

  return (
    <Section backgroundColor={primary.background_color} align="center">
      <Container>
        <Row align="center" textAlign={{ xs: "left" }}>
          <Column columns={{ xs: 14, md: 6 }} offsets={{ md: 1 }}>
            {primary.headline[0].text && <RichText render={primary.headline} />}

            {primary.text[0].text && <RichText render={primary.text} />}
          </Column>
        </Row>
      </Container>

      <div
        ref={sliderRef}
        className={["keen-slider", styles.carousel].join(" ")}
      >
        {fields.map((field, index) => {
          return (
            <div className="keen-slider__slide" key={`slide_${index}`}>
              <Slide {...field} />
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Carousel;
