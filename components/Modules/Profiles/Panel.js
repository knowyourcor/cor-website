import { motion, AnimatePresence } from "framer-motion";
import { RichText } from "prismic-reactjs";
import { Row, Column } from "../../Grid";
import Picture from "../../Picture";
import RoundelMeter from "../../RoundelMeter";

import styles from "./profiles.module.scss";

export default function Panel({
  profile_name,
  profile_description,
  profile_text,
  blood_speed,
  blood_clarity,
  blood_resilience,
  blood_fitness,
  blood_hydration,
  profile_type,
  profile_score,
  image,
}) {
  const panelVariant = {
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  const imageVariant = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildrenChildren",
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  const imageItemVariant = {
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const contentVariant = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        duration: 0.25,
        ease: "easeOut",
      },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildrenChildren",
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  const contentItem = {
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Check if the profile score is - or +. CMS only returns a "-" for negative numbers.
  // Add a "+" for positive numbers.
  const profileScoreSign =
    Math.sign(profile_score) < 0 ? profile_score : `+${profile_score}`;

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={panelVariant}
      >
        <Row align="center">
          <Column columns={{ xs: 14, sm: 7 }} overlaps={{ md: 1 }} zIndex={0}>
            <motion.div
              variants={imageVariant}
              className={styles.imageContainer}
            >
              <div className={styles.profileType}>
                <p>{profile_type[0].text}</p>
              </div>
              <div className={styles.profileScore}>
                <RoundelMeter score={profileScoreSign} />
              </div>
              <Picture image={image} className={styles.profileImage} />
            </motion.div>
          </Column>
          <Column
            columns={{ xs: 14, sm: 6 }}
            zIndex={10}
            alignSelf={{ sm: "center" }}
          >
            <motion.div
              variants={contentVariant}
              className={styles.profileContent}
            >
              <motion.h3 variants={contentItem}>
                {profile_name[0].text}
              </motion.h3>
              <motion.p variants={contentItem}>
                <small>{profile_description[0].text}</small>
              </motion.p>

              <motion.div variants={contentItem}>
                <RichText render={profile_text} />
              </motion.div>

              <ul className={styles.profileStats}>
                {blood_speed[0].text && (
                  <motion.li variants={contentItem}>
                    <div className={styles.profileStatsIcons}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 46.055 46.055"
                      >
                        <g transform="translate(-463.16 -1381)">
                          <circle
                            cx="23.027"
                            cy="23.027"
                            r="23.027"
                            transform="translate(463.16 1381)"
                            fill="#70db8c"
                          />
                          <path
                            d="M482.865 1411.026l6.48-6.554a.577.577 0 000-.807l-6.482-6.639"
                            fill="none"
                            stroke="#24a048"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </g>
                      </svg>
                    </div>
                    <span>
                      <strong>Blood Speed</strong> {blood_speed[0].text}
                    </span>
                  </motion.li>
                )}

                {blood_clarity[0].text && (
                  <motion.li variants={contentItem}>
                    <div className={styles.profileStatsIcons}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 46 46"
                      >
                        <g transform="rotate(-90 -78.011 1029.224)">
                          <circle
                            cx="23"
                            cy="23"
                            r="23"
                            transform="translate(905.213 1107.235)"
                            fill="#00364e"
                          />
                          <path
                            d="M920.355 1137.248l6.539-6.615a.58.58 0 000-.815l-6.542-6.7"
                            fill="none"
                            stroke="#aee1f3"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                          <path
                            d="M928.924 1137.248l6.539-6.615a.58.58 0 000-.815l-6.541-6.7"
                            fill="none"
                            stroke="#aee1f3"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </g>
                      </svg>
                    </div>
                    <span>
                      <strong>Blood Clarity</strong> {blood_clarity[0].text}
                    </span>
                  </motion.li>
                )}

                {blood_resilience[0].text && (
                  <motion.li variants={contentItem}>
                    <div className={styles.profileStatsIcons}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 46 46"
                      >
                        <g transform="translate(-212.4 -1344.4)">
                          <circle
                            cx="23"
                            cy="23"
                            r="23"
                            transform="translate(212.4 1344.4)"
                            fill="#e5e0df"
                          />
                          <path
                            d="M228.122 1360.252l6.373 6.3a.559.559 0 00.785 0l6.457-6.3"
                            fill="none"
                            stroke="#baadab"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                          <path
                            d="M228.122 1368.509l6.373 6.3a.559.559 0 00.785 0l6.457-6.3"
                            fill="none"
                            stroke="#baadab"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </g>
                      </svg>
                    </div>
                    <span>
                      <strong>Blood Resilience</strong>{" "}
                      {blood_resilience[0].text}
                    </span>
                  </motion.li>
                )}

                {blood_fitness[0].text && (
                  <motion.li variants={contentItem}>
                    <div className={styles.profileStatsIcons}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 46 46"
                      >
                        <g transform="translate(-919 -6807)">
                          <circle
                            cx="23"
                            cy="23"
                            r="23"
                            transform="translate(919 6807)"
                            fill="#ff7050"
                          />
                          <path
                            d="M938.934 6836.798l6.293-6.365a.561.561 0 000-.784l-6.3-6.448"
                            fill="none"
                            stroke="#ffccbd"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </g>
                      </svg>
                    </div>
                    <span>
                      <strong>Blood Fitness</strong> {blood_fitness[0].text}
                    </span>
                  </motion.li>
                )}

                {blood_hydration[0].text && (
                  <motion.li variants={contentItem}>
                    <div className={styles.profileStatsIcons}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 46 46"
                      >
                        <g transform="translate(-856.547 -1420.549)">
                          <circle
                            cx="23"
                            cy="23"
                            r="23"
                            transform="translate(856.547 1420.549)"
                            fill="#80deea"
                          />
                          <path
                            d="M876.455 1450.402l6.345-6.417a.565.565 0 000-.79l-6.347-6.5"
                            fill="none"
                            stroke="#0096a6"
                            strokeLinecap="round"
                            strokeWidth="3"
                          />
                        </g>
                      </svg>
                    </div>
                    <span>
                      <strong>Blood Hydration</strong> {blood_hydration[0].text}
                    </span>
                  </motion.li>
                )}
              </ul>
            </motion.div>
          </Column>
        </Row>
      </motion.div>
    </AnimatePresence>
  );
}
