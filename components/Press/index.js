import { RichText, Date } from "prismic-reactjs";
import Section from "../Section";
import { Container, Row, Column } from "../Grid";
import Picture from "../Picture";
import styles from "./press.module.scss";

const Post = ({ post }) => {
  const date = Date(post.date);

  const formattedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);

  return (
    <a
      href={post?.link?.url}
      target={post?.link?.target}
      className={styles.post}
    >
      <div className={styles.card}>
        <div className={styles.borderRadius}>
          <div className={styles.image}>
            <Picture image={post.cover_image} />
          </div>
          <div className={styles.cardContent}>
            <RichText render={post.publisher} />
            <RichText render={post.title} />
            <p className={styles.date}>{formattedDate}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default function Press({ pressData }) {
  return (
    <>
      {pressData.length > 0 && (
        <Section className={styles.press}>
          <Container>
            <Row>
              <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
                <div className={styles.borderBottom}>
                  <h2>Featured Press</h2>
                </div>
              </Column>
            </Row>
            <Row align={{ xs: "center" }}>
              <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
                <div className={styles.pressPosts}>
                  {pressData.map((post) => (
                    <Post post={post.node} key={post.node._meta.uid} />
                  ))}
                </div>
              </Column>
            </Row>
          </Container>
        </Section>
      )}
    </>
  );
}
