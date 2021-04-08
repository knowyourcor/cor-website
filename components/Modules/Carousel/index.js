import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import { useKeenSlider } from "keen-slider/react";

import styles from "./carousel.module.scss";

const Mask = ({ path }) => {
  const maskPaths = [
    "M256 256H0V0h256v256zm-80.751-42.757l19.4 26.7a141.286 141.286 0 0051.391-158.17l-31.393 10.2a108.454 108.454 0 10-39.4 121.269z",
    "M256 256H0V0h256v256zM128 3a125.916 125.916 0 00-25.192 2.54 124.314 124.314 0 00-44.7 18.809 125.371 125.371 0 00-45.289 55 124.371 124.371 0 00-7.284 23.464 126.215 126.215 0 000 50.383 124.314 124.314 0 0018.809 44.7 125.366 125.366 0 0055 45.288 124.371 124.371 0 0023.464 7.284 126.221 126.221 0 0050.384 0 124.314 124.314 0 0044.7-18.808 125.362 125.362 0 0045.288-55 124.376 124.376 0 007.283-23.464 125.58 125.58 0 00-3.571-63.822l-27.742 9.013A95.709 95.709 0 00128 32.165z",
  ];
  const randomNumber = Math.floor(Math.random() * Math.floor(2));
  const randomDegree = Math.floor(Math.random() * Math.floor(360));
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      style={{ transform: `rotate(${randomDegree}deg)` }}
    >
      <path d={maskPaths[randomNumber]} fill="#fff" />
    </svg>
  );
};

const Slide = ({ headline, text, image }) => {
  return (
    <div className={styles.container}>
      <div className={styles.portrait}>
        <Picture image={image} className={styles.image} />
      </div>

      <div className={styles.content}>
        <RichText render={headline} />
        {text && <RichText render={text} />}
        {/* <RichText render={position_value} /> */}
      </div>
    </div>
  );
};

const Carousel = ({ primary, fields }) => {
  const [sliderRef] = useKeenSlider({
    slidesPerView: 2.5,
    spacing: 20,
    centered: true,
    breakpoints: {
      "(min-width: 320px)": {
        slidesPerView: 1.5,
        spacing: 20,
        centered: false,
      },
      "(min-width: 768px)": {
        slidesPerView: 2.5,
        spacing: 50,
        centered: false,
      },
      "(min-width: 1024px)": {
        spacing: 60,
        slidesPerView: 2.5,
        centered: true,
      },
      "(min-width: 1280px)": {
        spacing: 30,
        slidesPerView: 2.5,
        centered: true,
      },
      "(min-width: 1440px)": {
        spacing: 55,
        slidesPerView: 2.5,
        centered: true,
      },
      "(min-width: 1680px)": {
        spacing: 100,
        slidesPerView: 2.5,
        centered: true,
      },
    },
  });

  return (
    <Section className={styles.carouselWrap} backgroundColor={primary.background_color} align="center">
      <Container>
        <Row align="center" textAlign={{ xs: "left" }}>
          <Column columns={{ xs: 14, md: 5 }} offsets={{ md: 1 }} className="custom__column">
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
