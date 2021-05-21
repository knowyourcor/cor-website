import { useState, useRef, useEffect } from "react";
import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Picture from "../../Picture";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Modal, { ModalHeader, ModalBody } from "../../Modal";
import styles from "./team.module.scss";

export default function Team({ primary, fields }) {
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

  const Profile = ({ description, image, name, job_title }) => {
    const [modalActive, setModalActive] = useState(false);
    const ref = useRef();

    const handelModalClose = () => {
      setModalActive(false);
      ref.current.focus();
    };

    return (
      <>
        <button
          ref={ref}
          className={styles.card}
          onClick={() => setModalActive(true)}
        >
          <div className={styles.borderRadius}>
            <Picture image={image} />
            <div
              className={[styles.profileContent, styles.cardContent].join(" ")}
            >
              {name && <RichText render={name} />}
              {job_title && <RichText render={job_title} />}
            </div>
          </div>
        </button>
        <Modal isActive={modalActive} closeModal={handelModalClose}>
          <ModalHeader>
            <div className={styles.profileContent}>
              <div className={styles.avatar}>
                <img
                  src="/images/quotes-thumbnail.jpg"
                  alt={name && name[0].text}
                />
              </div>
              <div>
                {name && <RichText render={name} />}
                {job_title && <RichText render={job_title} />}
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className={styles.description}>
              <RichText render={description} />
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  };

  return (
    <Section
      style={{ backgroundColor: primary.background_color }}
      className={styles.textCarousel}
    >
      <Container ref={ref}>
        <Row>
          <Column columns={{ xs: 14, sm: 14, md: 4 }} offsets={{ md: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={variants}
            >
              <RichText render={primary.headline} />
            </motion.div>
          </Column>
          <Column columns={{ xs: 14, sm: 10, md: 7 }} offsets={{ lg: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={variants}
            >
              <RichText render={primary.text} />
            </motion.div>
          </Column>
        </Row>

        <Row>
          <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
            <div className={styles.teamProfiles}>
              {fields.map((field, index) => (
                <motion.div
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  variants={variants}
                  className={styles.profile}
                  key={`profile_${index}`}
                >
                  <Profile {...field} />
                </motion.div>
              ))}
            </div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
}
