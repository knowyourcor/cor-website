import Link from "../Link";
import styles from "./menu.module.scss";

const Menu = ({ active, toggle, mainMenuData }) => {
  const isActive = active ? styles["menu--active"] : "";
  return (
    <div
      className={[styles.menu, isActive].join(" ")}
      style={{ transform: "translateX(-100%)" }}
    >
      <Link href="/">
        <a className={styles.mark}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22.393"
            height="22.393"
          >
            <path
              data-name="Path 40"
              d="M19.36 8.544a8.584 8.584 0 11-8.164-5.931V.003a11.194 11.194 0 1010.649 7.736z"
            />
            <path
              data-name="Path 41"
              d="M16.875 9.35l2.485-.807a8.586 8.586 0 00-8.164-5.935V5.22a5.973 5.973 0 015.679 4.126"
            />
          </svg>
        </a>
      </Link>
      <button className={styles.close} onClick={() => toggle()}>
        Close
      </button>
      <ul>
        {mainMenuData?.menu_links.map((link, index) => {
          return (
            <li key={`${link.link._meta.uid}_${index}`}>
              {link.link._meta.type === "page" ? (
                <Link
                  activeClassName={styles.active}
                  href="/[slug]"
                  as={`/${link.link._meta.uid}`}
                >
                  <a>{link.label[0].text}</a>
                </Link>
              ) : (
                <Link
                  activeClassName={styles.active}
                  href={`/${link.link._meta.uid}`}
                >
                  <a>{link.label[0].text}</a>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
