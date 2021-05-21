import Link from "next/link";

const LinkText = ({ linkData, labelData }) => {
  const WebLink = (link, label) => {
    return (
      <a
        href={link?.url}
        title={label[0].text}
        target={link?.target}
        rel="noopener noreferrer"
      >
        {label[0].text}
      </a>
    );
  };

  const PageLink = (link, label) => {
    return (
      <Link href={`/${link?._meta?.uid}`}>
        <a>{label[0]?.text}</a>
      </Link>
    );
  };

  const LinkByType = ({ link, label }) => {
    if (link?._linkType === "Link.web") {
      return WebLink(link, label);
    } else if (link?._linkType === "Link.document") {
      return PageLink(link, label);
    } else {
      return null;
    }
  };

  return <LinkByType link={linkData} label={labelData} />;
};

export default LinkText;
