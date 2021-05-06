import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { RichText } from "prismic-reactjs";
import Picture from "../Picture";
import { Column, Container, Row } from "../Grid";

import styles from "./index.module.scss";

const CloseIcon = () => (
  <svg
    viewBox="0 0 365.696 365.696"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.icon__close}
  >
    <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0" />
  </svg>
);

const TeamList = ({ name, position, description, image }) => {
  const [activeFlip, setActiveFlip] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
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
              <span className={styles.moreInfo} onClick={() => setShowInfo(!showInfo)}><Image src="/icons/round-info.svg" height={30} width={30} /></span>
            </div>
          </div>
        </div>
        {showInfo && 
          <div className={styles.infoModal}>
            <div className={styles.backdrop} onClick={() => setShowInfo(!showInfo)}></div>
            <div className={styles.modalWrapper}>
              <div className={styles.modalHeader}>
                <div className={styles.avatar}>
                  <img src={image.url} />
                </div>
                <div className={styles.info}>
                  <RichText render={name} />
                  <RichText render={position} />
                </div>
                <span className={styles.closeIcon} onClick={() => setShowInfo(!showInfo)}>
                  <Image src="/icons/close.svg" height={25} width={25} />
                </span>
              </div>
              <div className={styles.modalContent}>
                <RichText render={description} />
              </div>
            </div>
          </div>
        }
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
