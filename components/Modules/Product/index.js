import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Section from "../../Section";
import { Column, Container, Row } from "../../Grid";
import Picture from "../../Picture";
import Button from "../../Button";
import { fadeIn } from "../../../lib/variants";

import styles from "./product.module.scss";

export default function Index({ primary }) {
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  return (
    <Section className={styles.productSection}>
      <Container ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={fadeIn}
        >
          <Row alig={{ xs: "center" }}>
            <Column columns={{ xs: 14, md: 6 }} offsets={{ md: 1 }}>
              <div className={styles.productImage}>
                <Picture image={primary.image} classes={styles.image} />
                <Picture
                  image={primary.screenshot}
                  classes={styles.screenshot}
                />
              </div>
            </Column>
            <Column columns={{ xs: 14, md: 5 }} offsets={{ md: 1 }}>
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
                <Button
                  linkData={primary.link}
                  labelData={primary.link_label}
                />
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
