import Section from "../../Section"
import { Container, Row, Column } from "../../Grid";
import EmailSignup from "../../EmailSignup";

import styles from "./index.module.scss";

export default function Newsletter({ primary }) {
  return (
    <Section className={styles.newsletterSection}>
      <Container>
        <Row justify="center">
          <Column
            className={styles.firstCol}
            columns={{ xs: 14, sm: 12, md: 5 }}
          >
            <h2 className={styles.title}>{primary.title[0].text}</h2>
            <p className={styles.desc}>{primary.description[0].text}</p>
          </Column>
          <Column
            columns={{ xs: 14, sm: 12, md: 6 }}
            justify="center"
            offsets={{ sm: 0, md: 1 }}
          >
            <EmailSignup 
              className={styles.newsletterForm}
              inputPlaceholder={primary.input_placeholder[0].text}
              buttonText={primary.button_name[0].text}
            />
          </Column>
        </Row>
      </Container>
    </Section>
  )
}
