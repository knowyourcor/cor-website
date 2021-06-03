import Link from "next/link";
import { RichText, Date } from "prismic-reactjs";
import slugify from "slugify";
import { Container, Row, Column } from "../Grid";
import Modules from "../Modules/Blog";
import styles from "./blog.module.scss";
import isEmpty from "lodash/isEmpty";

export default function Post({ data }) {
  const timestamp = Date(data?.date);

  const formattedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(timestamp);

  return (
    <>
      {!isEmpty(data) && (
        <div className={styles.blogPost}>
          <Container>
            <Row>
              <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
                {/* Post meta - date & category */}
                <div className={styles.meta}>
                  {data._meta?.tags.length > 0 && (
                    <p>
                      <Link
                        href={`/blog/?filter=${slugify(data._meta.tags[0], {
                          lower: true,
                        })}`}
                      >
                        <a>{data._meta.tags[0]}</a>
                      </Link>
                    </p>
                  )}
                  {data?.date && <p className={styles.date}>{formattedDate}</p>}
                </div>
                {/* Post title */}
                {data?.title && <RichText render={data?.title} />}
              </Column>
            </Row>
          </Container>
          {/* Post Modules */}
          {data?.body && <Modules postData={data?.body} />}
        </div>
      )}
    </>
  );
}
