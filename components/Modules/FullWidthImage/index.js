import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Container, Row, Column } from "../../Grid";
import Button from "../../Button";
import PlayPauseToggle from "../../PlayPauseToggle";
import Picture from "../../Picture";
import { fadeIn } from "../../../lib/variants";
import styles from "./fullWidthImage.module.scss";

const FullWidthImage = ({ primary }) => {
  const videoRef = useRef();
  const [playVideo, setPlayVideo] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handlePause = () => {
    if (playVideo) {
      setPlayVideo(false);
      videoRef.current.pause();
    } else {
      setPlayVideo(true);
      videoRef.current.play();
    }
  };

  return (
    <section className={styles.section} ref={ref}>
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={fadeIn}
        className={styles.backgroundImage}
      >
        <Picture image={primary.image} />
        {primary.video_source && (
          <>
            <video ref={videoRef} autoPlay muted loop playsInline>
              <source src={primary.video_source} type="video/mp4" />
            </video>
          </>
        )}
      </motion.div>
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={fadeIn}
        className={styles.content}
      >
        <Container>
          <Row align={{ xs: "center" }} justify={{ xs: "center" }}>
            <Column columns={{ xs: 14, sm: 10 }}>
              <h2>{primary.headline[0].text}</h2>
              <Button linkData={primary.link} labelData={primary.link_label} />
            </Column>
          </Row>
        </Container>
      </motion.div>
      {primary.video_source && (
        <div className={styles.toggle}>
          <PlayPauseToggle isPlaying={playVideo} toggle={handlePause} />
        </div>
      )}
    </section>
  );
};

export default FullWidthImage;
