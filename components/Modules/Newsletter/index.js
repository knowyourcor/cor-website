import { RichText } from "prismic-reactjs";
import { Container, Row, Column } from "../../Grid";
import EmailSignup from "../../EmailSignup";

import styles from "./newsletter.module.scss";

export default function Newsletter({ primary }) {
  return (
    <section className={styles.newsletter}>
      <Container>
        <Row align={{ xs: "center" }}>
          <Column
            className={styles.firstCol}
            columns={{ xs: 14, sm: 12, md: 4 }}
            offsets={{ md: 2 }}
          >
            <RichText render={primary.title} />
            <RichText render={primary.description} />
          </Column>
          <Column columns={{ xs: 14, sm: 12, md: 4 }} offsets={{ md: 2 }}>
            <EmailSignup
              className={styles.newsletterForm}
              inputPlaceholder={primary.input_placeholder[0].text}
              buttonText={primary.button_name[0].text}
            />
          </Column>
        </Row>
      </Container>
    </section>
  );
}
