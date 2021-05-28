import Link from "next/link";
import { RichText, Date } from "prismic-reactjs";
import slugify from "slugify";
import { Container, Row, Column } from "../Grid";
import Modules from "../Modules/Blog";
import styles from "./blog.module.scss";

export default function Post({ data }) {
  const { _meta, title, date, body } = data;

  const timestamp = Date(date);

  const formattedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(timestamp);

  return (
    <div className={styles.blogPost}>
      <Container>
        <Row>
          <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
            {/* Post meta - date & category */}
            <div className={styles.meta}>
              {_meta?.tags[0] && (
                <p>
                  <Link
                    href={`/blog/?filter=${slugify(_meta?.tags[0], {
                      lower: true,
                    })}`}
                  >
                    <a>{_meta?.tags[0]}</a>
                  </Link>
                </p>
              )}
              {date && <p className={styles.date}>{formattedDate}</p>}
            </div>
            {/* Post title */}
            <RichText render={title} />
          </Column>
        </Row>
      </Container>

      {/* Post Data */}
      <Modules postData={body} />
    </div>
  );
}
