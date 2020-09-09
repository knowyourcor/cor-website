import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import { useKeenSlider } from "keen-slider/react";

import styles from "./carousel.module.scss";

const Slide = ({ headline, text, image }) => {
  return (
    <div className={styles.tab}>
      <img src={image.xxl.url} alt={image.alt} className={styles.image} />
      <RichText render={headline} />
      <RichText render={text} />
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
      "(min-width: 1280px)": {
        spacing: 45,
        slidesPerView: 4,
        centered: true,
      },
    },
  });

  return (
    <Section
      fullScreen
      backgroundColor={primary.background_color}
      align="center"
    >
      <Container>
        <Row align="center" textAlign={{ xs: "left" }}>
          <Column columns={{ xs: 14, md: 6 }} offsets={{ md: 1 }}>
            {primary.headline && <RichText render={primary.headline} />}
            {primary.text && <RichText render={primary.text} />}
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
