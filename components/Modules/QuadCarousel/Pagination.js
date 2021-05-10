import styles from "./quadCarousel.module.scss";

export default function Pagination({ items, active, setActive }) {
  return (
    <ul className={styles.pagination}>
      {items.map((item, index) => (
        <li
          className={active === index + 1 ? styles.active : ""}
          onClick={() => setActive(index + 1)}
          key={`item_${item.id}`}
        >
          <span></span>
        </li>
      ))}
    </ul>
  );
}
