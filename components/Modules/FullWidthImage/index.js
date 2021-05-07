import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container, Row, Column } from "../../Grid";
import Button from "../../Button";
import Picture from "../../Picture";
import styles from "./fullWidthImage.module.scss";
import { useState } from "react";

const FullWidthImage = ({ primary }) => {
  const [playVideo, setPlayVideo] = useState(true)
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut",
  };

  const variants = {
    hidden: {
      opacity: 0,
      transition,
    },
    show: {
      opacity: 1,
      transition,
    },
  };

  const handlePause = () => {
    const iframe = document.getElementById('video');

    if (playVideo) {
      setPlayVideo(false)
    } else {
      setPlayVideo(true)
    }

    if (!playVideo) {
      iframe.pause();
    } else {
      iframe.play();
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.backgroundImage}>
        <Picture image={primary.image} />
        {primary.video_source && (
          <>
            <video id="video" autoPlay muted loop playsInline>
              <source src={primary.video_source} type="video/mp4" />
            </video>
            <button className={styles.btnPause} onClick={handlePause}>
              <Image src="/icons/pause-icon.svg" height={35} width={35} />
            </button>
          </>
        )}
      </div>
      <div className={styles.content}>
        <Container>
          <Row align="center" justify="center" textAlign={{ xs: "center" }}>
            <Column columns={{ xs: 14, sm: 10 }}>
              <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                exit="hidden"
                variants={variants}
              >
                <h2>{primary.headline[0].text}</h2>
                <Button
                  linkData={primary.link}
                  labelData={primary.link_label}
                />
              </motion.div>
            </Column>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default FullWidthImage;
