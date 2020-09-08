import Prismic from "prismic-javascript";

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;
export const API_TOKEN = process.env.PRISMIC_API_TOKEN;
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE;

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
});

async function fetchAPI(query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi();
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        "Prismic-Ref": previewData?.ref || prismicAPI.masterRef.ref,
        "Content-Type": "application/json",
        "Accept-Language": API_LOCALE,
        Authorization: `Token ${API_TOKEN}`,
      },
    }
  );

  if (res.status !== 200) {
    console.log(await res.text());
    throw new Error("Failed to fetch API");
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getHomepageData(previewData) {
  const data = await fetchAPI(
    `
    query {
      allHomepages(uid: "homepage") {
        edges {
          node {
            meta_title
            meta_description
            page_title
            _linkType
            body {
              ... on HomepageBodyText {
                type
                primary {
                  text
                }
              }
              ... on HomepageBodyImage {
                type
                primary {
                  image
                  headline
                  link_text
                }
              }
              ... on HomepageBodyText_image {
                type
                primary {
                  headline
                  text
                  image
                  background_color
                  alignment
                  overlap_text_and_image
                }
              }
              ... on HomepageBodyTabs {
                type
                primary {
                  headline
                }
              }
              ... on HomepageBodyAccordion {
                type
                primary {
                  headline
                }
              }
              ... on HomepageBodyProfiles {
                type
                primary {
                  headline
                }
              }
              ... on HomepageBodyQuote {
                type
                primary {
                  quote
                  name_of_the_author
                  portrait_author
                }
              }
              ... on HomepageBodyCarousel {
                type
                primary {
                  headline
                }
              }
              ... on HomepageBodyHero_carousel {
                type
                primary {
                  headline
                }
              }
              ... on HomepageBodyShop {
                type
                primary {
                  headline
                }
              }
            }
          }
        }
      }
    }    
  `,
    { previewData }
  );

  return data.allHomepages.edges[0].node;
}
