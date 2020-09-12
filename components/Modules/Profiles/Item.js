import styles from "./profiles.module.scss";

export default function Item({ label, isOpen, openTab }) {
  const activeTabClass = isOpen ? styles.activeTab : "";
  return (
    <li className={[styles.tab, activeTabClass].join(" ")} onClick={openTab}>
      {label}
    </li>
  );
}
