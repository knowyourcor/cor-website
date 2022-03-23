import Link from "next/link";
import styles from "./button.module.scss";
import { Elements, RichTextBlock } from "prismic-reactjs";

const Button = ({ linkData, labelData }: {
  linkData: any;
  labelData: RichTextBlock[];
}) => {

  if (!Array.isArray(labelData) || labelData.length == 0) {
    return null
  }

  const text = labelData[0].text;
  var processedText = text;

  if (labelData[0].spans?.length > 0) {
    const span = labelData[0].spans[0];
    if (span.type == Elements.label && span.data && span.data.label) {
      const label = span.data.label;
      const textToApplySpan = text.substring(span.start, span.end);
      
      processedText = "<span>" + text.substring(0, span.start) + `<span class=${label}>${textToApplySpan}</span>` + text.substring(span.end) + "</span>"
    }
  }
  
  const WebLink = (link, label: RichTextBlock[]) => {
    return (
      <a
        href={link?.url}
        title={label[0].text}
        target={link?.target}
        rel="noopener noreferrer"
        className={styles.button}
        dangerouslySetInnerHTML={{ __html: processedText }}
      >    
      </a>
    );
  };

  const PageLink = (link, label) => {
    // replace all occurences from uid _ to / to suuport nested paths
    return (
      <Link href={`/${link?._meta?.uid?.replace(new RegExp("_", "g"), "/")}`}>
        <a className={styles.button}
           dangerouslySetInnerHTML={{ __html: processedText }}></a>
      </Link>
    );
  };

  const ButtonByType = ({ link, label }) => {
    if (link?._linkType === "Link.web") {
      return WebLink(link, label);
    } else if (link?._linkType === "Link.document") {
      return PageLink(link, label);
    } else {
      return null;
    }
  };

  return <ButtonByType link={linkData} label={labelData} />;
};

export default Button;
