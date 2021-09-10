import { Fragment } from "react";
import Link from "next/link";
import { Container, Row, Column } from "../Grid";
import EmailSignup from "../EmailSignup";

import styles from "./footer.module.scss";

const Footer = ({ footerMenuData, tertiaryMenuData }) => {
  // Divide array into chunks
  // @param {array} array to divide
  // @param {number} size to divide by
  function chunk(array, size) {
    const chunked_arr = [];
    let copied = [...array]; // ES6 destructuring
    const numOfChild = Math.ceil(copied.length / size); // Round up to the nearest integer
    for (let i = 0; i < numOfChild; i++) {
      chunked_arr.push(copied.splice(0, size));
    }
    return chunked_arr;
  }

  // Divide internalLinks array into two even arrays
  const internalLinksToColumn =
    footerMenuData?.menu_links &&
    chunk(
      footerMenuData?.menu_links,
      Math.ceil(footerMenuData?.menu_links?.length / 2)
    );

  const PageLink = (link) => {
    return (
      <li>
        <Link
          activeClassName={styles.active}
          href={`/${link.link?._meta?.uid}`}
        >
          <a>{link.label[0].text}</a>
        </Link>
      </li>
    );
  };

  const WebLink = (item) => {
    return (
      <li>
        <a href={`${item?.link.url}`} target={`/${item?.link.target}`}>
          {item.label[0].text}
        </a>
      </li>
    );
  };
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Column columns={{ xs: 14, sm: 8, md: 8, lg: 10 }}>
            <div className={styles.secondary}>
              <Link href="/">
                <a aria-label="Return to homepage">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.logo}
                  >
                    <path
                      d="M86.4755 61.8365C88.9735 54.1334 88.9684 45.8372 86.4611 38.1371L97.5524 34.5478C100.816 44.5896 100.816 55.4066 97.5535 65.4487C94.2911 75.4908 87.9333 84.2425 79.3915 90.4492C70.8497 96.656 60.5622 99.9992 50.0034 99.9999C39.4447 100.001 29.1568 96.6589 20.6141 90.4533C12.0714 84.2478 5.71251 75.4971 2.44871 65.4554C-0.815086 55.4138 -0.816293 44.5967 2.44543 34.5543C5.70715 24.512 12.0643 15.7601 20.6058 9.55276C29.1472 3.34544 39.4344 0.00144811 49.9932 0V11.6655C41.8951 11.6673 34.0056 14.233 27.4555 18.9947C20.9054 23.7565 16.0311 30.4697 13.5312 38.1721C11.0313 45.8746 11.0342 54.1709 13.5395 61.8716C16.0449 69.5723 20.9239 76.2821 27.4774 81.0391C34.0309 85.7962 41.9223 88.3564 50.0203 88.3525C58.1183 88.3486 66.0071 85.7809 72.556 81.0175C79.1049 76.2541 83.9776 69.5397 86.4755 61.8365Z"
                      fill="black"
                    />
                    <path
                      d="M86.4616 38.1675L75.3615 41.7568V41.7344C73.6197 36.3778 70.2275 31.7099 65.6707 28.3991C61.1139 25.0883 55.6262 23.3044 49.9936 23.3029V11.6374C58.095 11.6416 65.9871 14.211 72.5384 18.9769C79.0896 23.7429 83.9636 30.4608 86.4616 38.1675Z"
                      fill="black"
                    />
                  </svg>
                </a>
              </Link>
              {footerMenuData && (
                <>
                  {internalLinksToColumn.map((set, index) => {
                    return (
                      <ul key={`colum_${index}`}>
                        {set.map((item, index) => (
                          <Fragment key={`link_${index}`}>
                            {item.link._linkType === "Link.web" &&
                              WebLink(item, index)}
                            {item.link._linkType === "Link.document" &&
                              PageLink(item, index)}
                          </Fragment>
                        ))}
                      </ul>
                    );
                  })}
                </>
              )}
            </div>
          </Column>
          <Column columns={{ xs: 14, sm: 6, md: 6, lg: 4 }}>
            <EmailSignup
              buttonLabel="Join Waitlist"
              inputPlaceholder="email"
              mailchimpUrl="https://knowyourcor.us12.list-manage.com/subscribe/post?u=dae943d68d00c841aef8185af&amp;id=2734a56df9"
            />
          </Column>
        </Row>

        <Row>
          <Column columns={{ xs: 14 }}>
            <div className={styles.tertiary}>
              <p>©{new Date().getFullYear()} Nueon Inc.</p>
              <ul className={styles.tertiaryMenu}>
                {tertiaryMenuData && (
                  <>
                    {tertiaryMenuData?.menu_links.map((link, index) => {
                      return (
                        <li key={`${link.link?._meta?.uid}_${index}`}>
                          <Link
                            activeClassName={styles.active}
                            href={`/${link.link?._meta?.uid}`}
                          >
                            <a>{link.label[0].text}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </>
                )}
              </ul>
            </div>
          </Column>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
