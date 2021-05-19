import { useState } from "react";
import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";

import styles from "./checklist.module.scss";

// const Checkbox = ({
//   type = "checkbox",
//   name,
//   checked = false,
//   onChange,
//   variants,
// }) => {
//   const { ref, inView } = useInView({
//     threshold: 0.5,
//     rootMargin: "25px 0px",
//     triggerOnce: true,
//   });

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={inView ? "show" : "hidden"}
//       exit="hidden"
//       variants={variants}
//     >
//       <input type={type} name={name} checked={checked} onChange={onChange} />
//       <span className={styles.checkmark}></span>
//     </motion.div>
//   );
// };

const ListItem = ({ item }) => {
  return (
    <li className={styles.item}>
      <div className={styles.checkmark}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
            fill="#6FDA8C"
          />
          <path
            d="M18.8021 26.2805C18.5854 26.2805 18.3713 26.2333 18.1748 26.1421C17.9782 26.0509 17.8039 25.9179 17.664 25.7524L13.273 20.5655C13.1426 20.4166 13.0431 20.2432 12.9803 20.0554C12.9176 19.8677 12.8927 19.6693 12.9074 19.4718C12.9222 19.2744 12.9761 19.0819 13.066 18.9055C13.1559 18.7291 13.2801 18.5724 13.4312 18.4446C13.5824 18.3167 13.7574 18.2201 13.9463 18.1606C14.1351 18.1011 14.3338 18.0799 14.531 18.098C14.7281 18.1161 14.9197 18.1734 15.0945 18.2663C15.2692 18.3593 15.4238 18.4861 15.549 18.6395L18.6971 22.3585L24.372 14.3485C24.4845 14.1868 24.6278 14.0491 24.7938 13.9432C24.9598 13.8373 25.145 13.7652 25.339 13.7313C25.5329 13.6974 25.7316 13.7022 25.9237 13.7455C26.1157 13.7887 26.2973 13.8696 26.458 13.9834C26.6186 14.0973 26.7552 14.2418 26.8597 14.4086C26.9642 14.5755 27.0346 14.7614 27.0669 14.9556C27.0991 15.1498 27.0926 15.3485 27.0477 15.5402C27.0028 15.7319 26.9202 15.9128 26.805 16.0725L20.018 25.6515C19.8866 25.8371 19.7145 25.9901 19.5149 26.099C19.3152 26.2078 19.0933 26.2696 18.8661 26.2795L18.8021 26.2805Z"
            fill="#24a147"
          />
        </svg>
      </div>
      <span>
        <RichText render={item.checklist_item} />
      </span>
    </li>
  );
};

const Paragraph = ({ text, variants }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "25px 0px",
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
    >
      <RichText render={text} />
    </motion.div>
  );
};

export default function Checklist({ primary, fields }) {
  const [checkedItems, setCheckedItems] = useState({});
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "25px 0px",
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

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Section
      className={styles.checklistContainer}
      backgroundColor={primary.background_color}
    >
      <Container>
        <Row align="center">
          <Column columns={{ xs: 14, md: 5 }} offsets={{ md: 1 }}>
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              exit="hidden"
              variants={variants}
            >
              <RichText render={primary.heading} />
            </motion.div>

            <div className={styles.checklist}>
              <div className={styles.item}>
                <div className={styles.listHeader}>
                  <RichText render={primary.program_name} />
                  <RichText render={primary.program_description} />
                </div>
              </div>

              <ul className={styles.checklistItems}>
                {fields.map((item, i) => (
                  <ListItem item={item} key={`list_item_${i}`} />
                ))}
              </ul>
            </div>
          </Column>
          <Column columns={{ xs: 14, md: 6 }} offsets={{ md: 1 }}>
            <div className={styles.image}>
              <Picture image={primary.image} />
            </div>
            <div className={styles.offsetText}>
              <Paragraph {...primary} variants={variants} />
            </div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
}
