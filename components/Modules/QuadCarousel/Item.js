import { motion } from "framer-motion";
import Picture from "../../Picture";
import { RichText } from "prismic-reactjs";
import Roundel from "../../Roundel";
import List from "./List";
import styles from "./quadCarousel.module.scss";

export default function Item({
  name,
  description,
  program_title,
  program_description,
  list,
  meter_number,
  image,
  id,
}) {
  const containerVariants = {
    enter: {
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
    exit: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.33,
        delayChildren: 0.2,
        ease: "easeOut",
        duration: 0.35,
      },
    },
    exit: {
      opacity: 0,
      y: "-8%",
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        ease: "easeOut",
        duration: 0.35,
      },
    },
  };

  const imageVariants = {
    enter: {
      opacity: 1,
      scale: 1,
      transition: { ease: "easeOut", duration: 0.35 },
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      transition: { ease: "easeOut", duration: 0.35 },
    },
  };

  return (
    <>
      <motion.div variants={containerVariants} className={styles.item}>
        <div className={styles.imageBox}>
          <motion.div variants={imageVariants}>
            <Picture image={image} />
          </motion.div>
        </div>

        <div className={[styles.contentBox, styles.contentTitle].join(" ")}>
          <motion.div variants={itemVariants}>
            <RichText render={name} />
            <RichText render={description} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className={styles.roundel}>
              <Roundel score={meter_number} />
            </div>
          </motion.div>
        </div>

        <div className={[styles.contentBox, styles.contentProgram].join(" ")}>
          <motion.div variants={itemVariants}>
            <RichText render={program_title} />
            <RichText render={program_description} />
            <List list={list} id={id} />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
