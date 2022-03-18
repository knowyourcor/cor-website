import { RichText } from "prismic-reactjs";
import Picture from "../../Picture";
import { Container, Row, Column } from "../../Grid";
import styles from "./textMultiVideo.module.scss";
import Section from "../../Section";
import Video from "./Item";


const TextMultiVideo = ({ primary, fields }) => {
  return (
    <div className={styles.image}>
      <Section backgroundColor={primary.background_color}>
        <Container>
          <Row>
            <Column offsets={{ sm: 1 }}>
              <RichText render={primary.text} />
            </Column>
          </Row>
          <Row>
            {fields.map((field, index) => (
              <Column columns={{ xs: 14, md: 6 }} offsets={{ md: index == 0 ? 1 : 0 }}>
                <Video primary={field} key={index} />
              </Column>
            ))}
          </Row>
        </Container>
      </Section>
    </div>
  );
};

export default TextMultiVideo;
