import Link from "next/link";
import { RichText, Date } from "prismic-reactjs";
import slugify from "slugify";
import Picture from "../Picture";
import styles from "./blog.module.scss";

export default function PostPinned({ node }) {
  const { _meta, title, date, excerpt, cover_image } = node;

  const timestamp = Date(date);

  const formattedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(timestamp);

  return (
    <div className={styles.postPinned}>
      <div className={styles.image}>
        <Link href={`/blog/${_meta.uid}`}>
          <a>
            <Picture image={cover_image} />
          </a>
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          {_meta.tags[0] && (
            <Link
              href={`/blog/?filter=${slugify(_meta?.tags[0], { lower: true })}`}
            >
              <a>{_meta.tags[0]}</a>
            </Link>
          )}
          <p className={styles.date}>{formattedDate}</p>
        </div>
        <Link href={`/blog/${_meta.uid}`}>
          <a>
            <h2>{title[0]?.text}</h2>
          </a>
        </Link>
        <RichText render={excerpt} />
      </div>
    </div>
  );
}
