import { useKeenSlider } from "keen-slider/react"

import Image from "../Image"
import Paragraph from "../Paragraph"

import styles from "./carousel.module.scss"

const Slide = ({ name, position, text, image }) => {
  return (
    <div className={styles.container}>
      <div className={styles.portrait}>
        <Image image={image} width={495} height={580} />
      </div>

      <div className={styles.content}>
        <h5 className={[styles.text, styles.tName].join(" ")}>{name}</h5>
        <h6 className={[styles.text, styles.tPosition].join(" ")}>{position}</h6>
        <Paragraph className={styles.tInfo} text={text} />
      </div>
    </div>
  );
};

const Carousel = ({ fields }) => {
  const [sliderRef] = useKeenSlider({
    slidesPerView: 3,
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
        centered: true,
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
