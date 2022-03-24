import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { RichText } from "prismic-reactjs";
import Button from "../../Button";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import styles from "./carousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { fadeIn } from "../../../lib/variants";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, {
  A11y,
  Keyboard,
  Pagination,
  Navigation,
} from "swiper/core";

// install Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation, A11y]);

const Slide = ({ headline, text, image }) => {
  const hasContent = headline || text;
  return (
    <div className={styles.container}>
      <div className={styles.portrait}>
        <Picture image={image} className={styles.image} />
      </div>

      {hasContent && (
        <div className={styles.content}>
          {headline && <RichText render={headline} />}
          {text && <RichText render={text} />}
        </div>
      )}
    </div>
  );
};

export default function Carousel({ primary, fields }) {
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  return (
    <motion.section
      className={styles.carousel}
      backgroundColor={primary.background_color}
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={fadeIn}
    >
      <div className={styles.contentContainer}>
        <Container>
          <Row>
          <Column offsets={{ md: 1 }}>
              <RichText render={primary.headline} />
            </Column>
          </Row>
          <Row justify={{ xs: "center" }}>
          <Column offsets={{ md: 1 }}>
              <RichText render={primary.text} />
              <Button labelData={primary.link_label} linkData={primary.link} />
            </Column>
          </Row>
        </Container>
      </div>
      <div className={styles.swiper}>
        <Swiper
          slidesPerView={1.5}
          spaceBetween={20}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          watchOverflow={true}
          navigation={false}
          centerInsufficientSlides={true}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {fields.map((field, index) => {
            return (
              <SwiperSlide
                className={[styles.slide, styles.card].join(" ")}
                key={`slide_${index}`}
              >
                <Slide {...field} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </motion.section>
  );
}
