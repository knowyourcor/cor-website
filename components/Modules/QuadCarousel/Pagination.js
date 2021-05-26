import styles from "./quadCarousel.module.scss";

export default function Pagination({ items, active, setActive }) {
  return (
    <ul className={styles.pagination}>
      {items.map((item, index) => (
        <li key={`item_${item.id}`}>
          <button
            tabIndex="0"
            role="button"
            className={[
              styles.bullet,
              active === index + 1 ? styles.active : "",
            ].join(" ")}
            onClick={() => setActive(index + 1)}
            aria-label={`Select item number ${index + 1}`}
          >
            <span></span>
          </button>
        </li>
      ))}
    </ul>
  );
}
