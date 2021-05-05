import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import Section from "../../Section";
import { Column, Container, Row } from "../../Grid";
import Picture from "../../Picture";

import styles from "./index.module.scss";

export default function Index({ primary }) {
  const Actions = ({ sku, price }) => {
    let priceNonComma = price.replace(/,/g, "");
    const tempPrices = {
      [sku]: priceNonComma,
    };

    return (
      <div className={styles.shopActions}>
        <span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          })
            .format(tempPrices[sku])
            .replace(/\D00(?=\D*$)/, "")}
        </span>
      </div>
    );
  };

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
                  image={primary.overflow_image}
                  classes={styles.overflowImage}
                />
              </div>
            </Column>
            <Column
              columns={{ xs: 14, md: 5 }}
              offsets={{ md: 1 }}
              justify="center"
            >
              <RichText render={primary.product_details} />
              <div className={styles.productPrice}>
                <Actions
                  sku={primary.product_sku}
                  price={primary.product_price[0].text}
                />
                <div className={styles.discountNote}>
                  <RichText render={primary.product_discount_note} />
                </div>
              </div>
              <button className={styles.addToCart}>Buy Now</button>
            </Column>
          </Row>
        </motion.div>
      </Container>
    </Section>
  );
}
