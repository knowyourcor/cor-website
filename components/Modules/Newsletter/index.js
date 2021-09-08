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
            columns={{ xs: 14, sm: 12, md: 5, lg: 4 }}
            offsets={{ md: 2 }}
          >
            <RichText render={primary.text} />
          </Column>
          <Column
            columns={{ xs: 14, sm: 12, md: 5, lg: 4 }}
            offsets={{ md: 1 }}
          >
            <EmailSignup
              className={styles.newsletterForm}
              inputPlaceholder={primary.input_placeholder[0].text}
              mailchimpUrl={primary.mailchimpUrl && primary.mailchimpUrl[0].text}
              buttonLabel={primary.button_label[0].text}
            />
          </Column>
        </Row>
      </Container>
    </section>
  );
}
