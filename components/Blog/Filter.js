import Link from "next/link";
import styles from "./blog.module.scss";

const Filter = ({ filters, viewAll }) => {
  const names = [];

  filters.map((filter) => {
    filter.node._meta.tags.map((tag) => {
      if (!names.includes(tag)) {
        names.push(tag);
      }
    });
  });

  return (
    <div className={styles.filter}>
      <span className={styles.label}>Categories: </span>
      {names.map((name) => {
        const lowerCaseName = name.toLowerCase();
        return (
          <Link href={`/blog/category/${lowerCaseName}`} key={lowerCaseName}>
            <a>{name}</a>
          </Link>
        );
      })}
      {viewAll && (
        <Link href="/blog/">
          <a className="">View All</a>
        </Link>
      )}
    </div>
  );
};

export default Filter;
