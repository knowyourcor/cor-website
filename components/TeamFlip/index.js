import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { RichText } from "prismic-reactjs";
import Picture from "../Picture";
import { Column, Container, Row } from "../Grid";
import TeamModal from "../TeamModal";

import styles from "./index.module.scss";


const TeamList = ({ name, position, description, image }) => {
  const [activeFlip, setActiveFlip] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut",
  };

  const fadeInVariants = {
    hidden: {
      opacity: 0,
      transition,
    },
    show: {
      opacity: 1,
      transition,
    },
  };

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <Column columns={{ xs: 14, sm: 4 }}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        exit="hidden"
        variants={fadeInVariants}
        className={styles.contentWrap}
      >
        <div
          className={[styles.card, activeFlip && styles.isFlipped].join(" ")}
          onClick={openModal}
        >
          <div
            className={[styles.card__face, styles.card__facefront].join(" ")}
          >
            <div className={styles.portrait}>
              <Picture image={image} className={styles.image} />
            </div>
            <div className={styles.info}>
              <RichText render={name} />
              <RichText render={position} />
              <span className={styles.moreInfo}>
                <Image src="/icons/round-info.svg" height={30} width={30} />
              </span>
            </div>
          </div>
        </div>
        <TeamModal
          modalIsOpen={modalOpen}
          close={closeModal}
          image={image}
          name={name}
          position={position}
          description={description}
        />
      </motion.div>
    </Column>
  );
};

export default function TeamFlip({ fields }) {
  const [userList, setUserList] = useState([]);

  const postsPerPage = 9;
  const ref = useRef(postsPerPage);
  const fieldsLength = fields.length;
  const userLength = userList.length;

  const loopWithSlice = (start, end) => {
    const sliceUser = fields.slice(start, end);
    setUserList([...userList, ...sliceUser]);
  };

  useEffect(() => {
    if (userLength === 0) {
      loopWithSlice(0, postsPerPage);
    }
  }, []);

  const handleShowMoreUser = () => {
    loopWithSlice(ref.current, ref.current + postsPerPage);
    ref.current += postsPerPage;
  };

  return (
    <Container>
      <div className={styles.teamFlip}>
        <Row className={styles.row}>
          {userList.map((item, i) => {
            return <TeamList key={i} {...item} />;
          })}
        </Row>
        {fieldsLength !== userLength && (
          <button className="btn btn--inverted" onClick={handleShowMoreUser}>
            Show More
          </button>
        )}
      </div>
    </Container>
  );
}
