import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import Section from "../../Section";
import { Column, Container, Row } from "../../Grid";
import Picture from "../../Picture";

import styles from "./index.module.scss";

export const linkResolver = (doc) => {
  // URL for a category type
  if (doc.type === "category") {
    return `/category/${doc.uid}`;
  }

  // URL for a product type
  if (doc.type === "product") {
    return `/product/${doc.uid}`;
  }

  // URL for a page type
  if (doc.type === "page") {
    return `/${doc.uid}`;
  }

  if (doc.type === "shop") {
    return `/${doc.uid}`;
  }

  if (doc.link_type === "Document") {
    return `/${doc.uid}`;
  }

  // Backup for all other types
  return "/";
};

export default function Index({ primary }) {
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

  console.log(primary);

  return (
    <Section className={styles.productSection}>
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          exit="hidden"
          variants={variants}
        >
          <Row align="center">
            <Column
              columns={{ xs: 14, md: 7 }}
              offsets={{ md: 1 }}
              justify="center"
              className="custom__column"
            >
              <div className={styles.productImage}>
                <Picture image={primary.image} classes={styles.image} />
                <Picture
                  image={primary.screenshot}
                  classes={styles.screenshot}
                />
              </div>
            </Column>
            <Column
              columns={{ xs: 14, md: 5 }}
              offsets={{ md: 1 }}
              justify="center"
            >
              <RichText render={primary.product_details} />
              <div className={styles.productPurchase}>
                <div className={styles.productPriceLabel}>
                  <RichText render={primary.product_price_label} />
                </div>
                <div className={styles.productPrice}>
                  <RichText render={primary.product_price} />
                </div>
                <div className={styles.productPriceSecondary}>
                  <RichText render={primary.product_secondary_price} />
                </div>
              </div>
              <div className={styles.button}>
                <RichText render={primary.link} linkResolver={linkResolver} />
              </div>
              <div className={styles.secondaryDescription}>
                <RichText render={primary.secondary_description} />
              </div>
            </Column>
          </Row>
        </motion.div>
      </Container>
    </Section>
  );
}
