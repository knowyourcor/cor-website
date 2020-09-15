import Link from "next/link";
import styles from "./button.module.scss";

const Button = ({ linkData, labelData }) => {
  const WebLink = (link, label) => {
    return (
      <a
        href={link?.url}
        title={label[0].text}
        target={link?.target}
        rel="noopener noreferrer"
        className={styles.cta}
      >
        {label[0].text}
      </a>
    );
  };

  const PageLink = (link, label) => {
    return (
      <Link href="/[slug]" as={`/${link?._meta?.uid}`}>
        <a className={styles.cta}>{label[0].text}</a>
      </Link>
    );
  };

  return (
    <>
      {linkData && linkData._linkType === "Link.web"
        ? WebLink(linkData, labelData)
        : PageLink(linkData, labelData)}
    </>
  );
};

export default Button;
