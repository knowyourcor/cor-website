import styles from "./quadCarousel.module.scss";

export default function Pagination({ items, active, setActive }) {
  return (
    <ul className={styles.pagination}>
      {items.map((item, index) => (
        <li key={`item_${item.id}`}>
          <button
            className={active === index + 1 ? styles.active : ""}
            onClick={() => setActive(index + 1)}
            aria-label={`Select item number ${index + 1}`}
          ></button>
        </li>
      ))}
    </ul>
  );
}
