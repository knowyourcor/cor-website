import { RichText } from "prismic-reactjs";
import { useKeenSlider } from "keen-slider/react"

import styles from "./carousel.module.scss"

const Slide = ({ name, position, description, image }) => {
  return (
    <div className={styles.container}>
      <div className={styles.portrait}>
        <img
          src={image.url}
        />
      </div>

      <div className={styles.content}>
        <RichText render={name} />
        <RichText render={position} />
        <RichText render={description} />
      </div>
    </div>
  );
};

const Carousel = ({ fields }) => {
  const [sliderRef] = useKeenSlider({
    slidesPerView: 2,
    spacing: 20,
    centered: true,
    breakpoints: {
      "(min-width: 768px)": {
        slidesPerView: 2,
        spacing: 50,
        centered: false,
      },
      "(min-width: 1024px)": {
        spacing: 60,
        slidesPerView: 3,
        centered: false,
      },
      "(min-width: 1280px)": {
        spacing: 30,
        slidesPerView: 4,
        centered: true,
      },
      "(min-width: 1440px)": {
        spacing: 55,
        slidesPerView: 4,
        centered: true,
      },
      "(min-width: 1680px)": {
        spacing: 100,
        slidesPerView: 4,
        centered: true,
      },
    },
  });

  return (
    <div className={styles.customContainer}>
      <div
        ref={sliderRef}
        className={["keen-slider"].join(" ")}
      >
        {fields.map((field, index) => {
          return (
            <div className="keen-slider__slide" key={`slide_${index}`}>
              <Slide {...field} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
