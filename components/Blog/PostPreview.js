import Link from "next/link";
import { RichText, Date } from "prismic-reactjs";
import Picture from "../Picture";
import styles from "./blog.module.scss";

export default function PostPreview({ node }) {
  const { _meta, title, date, excerpt, cover_image } = node;

  const timestamp = Date(date);

  const formattedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(timestamp);

  const tagToCategorySlug = (tag) => tag?.toLowerCase().replace(" ", "-");

  return (
    <div className={styles.postPreview}>
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
            <Link href={`/blog/category/${tagToCategorySlug(_meta.tags[0])}`}>
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
