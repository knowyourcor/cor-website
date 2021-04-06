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
    // console.log(await res.text());
    throw new Error("Failed to fetch API");
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getMenuData(uid, previewData) {
  const LinkFragment = `
    
  `;

  const data = await fetchAPI(
    `
    query MenuDataByUid($uid: String!) {
      allMenus(uid: $uid) {
        edges {
          node {
            menu_links {
              ...LinkFragment
            }
          }
        }
      }
    }
    
    fragment LinkFragment on MenuMenu_links {
      link {
        _linkType
        ... on _ExternalLink {
          url
          target
        }
        ... on _FileLink {
          name
          url
          size
        }
        ... on _Document {
          _meta {
            uid
            type
          }
        }
      }
      label
    }                
  `,
    {
      previewData,
      variables: {
        uid,
      },
    }
  );
  return data.allMenus.edges[0].node;
}

export async function getAllPagesWithSlug() {
  const data = await fetchAPI(`
    {
      allPages {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `);
  return data?.allPages?.edges;
}

export async function getPageData(slug, previewData) {
  const data = await fetchAPI(
    `
    query PageDataBySlug($slug: String!) {
      allPages(uid: $slug) {
        edges {
          node {
            _meta {
              uid
            }
            meta_title
            meta_description
            page_title
            _linkType
            body {
              ... on PageBodyBody_text {
                type
                primary {
                  text
                }
              }
              ... on PageBodyBody_image {
                type
                primary {
                  image
                  caption
                }
              }
              ... on PageBodyText_description_image {
                type
                primary {
                  heading
                  sub_heading
                  image
                  description
                }
              }
              ... on PageBodyDual_grid {
                type
                primary {
                  image
                  heading
                  description
                }
              }
              ... on PageBodyText___carousel {
                type
                primary {
                  heading
                  text
                  background_color
                }
                fields {
                  name
                  position
                  description
                  image
                }
              }
              ... on PageBodyFeatured_press {
                type
                primary {
                  heading
                }
                fields {
                  date
                  heading
                  link_label
                  image
                }
              }
            }
          }
        }
      }
    }       
  `,
    {
      previewData,
      variables: {
        slug,
      },
    }
  );
  return data.allPages.edges[0].node;
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
              ... on HomepageBodyFull_width_image {
                type
                primary {
                  image
                  video_source
                  headline
                  link {
                    _linkType
                    ... on _Document {
                      _meta {
                        uid
                        type
                      }
                    }
                  }
                  link_label
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
                fields {
                  image
                  tab_name
                  text
                }
              }
              ... on HomepageBodyAccordion {
                type
                primary {
                  headline
                  image
                  background_color
                }
                fields {
                  title
                  text
                }
              }
              ... on HomepageBodyProfiles {
                type
                primary {
                  headline
                }
                fields {
                  image
                  tab_name
                  profile_name
                  profile_description
                  profile_text
                  blood_speed
                  blood_clarity
                  blood_resilience
                  blood_fitness
                  blood_hydration
                  profile_type
                  profile_score
                }
              }
              ... on HomepageBodyQuote {
                type
                primary {
                  quote
                  author_name
                  author_portrait
                }
              }
              ... on HomepageBodyCarousel {
                type
                primary {
                  headline
                  text
                }
                fields {
                  image
                  headline
                  text
                }
              }
              ... on HomepageBodyHero_carousel {
                type
                primary {
                  background_color
                  link {
                    _linkType
                    ... on _Document {
                      _meta {
                        uid
                        type
                      }
                    }
                    ... on _ExternalLink {
                      url
                      target
                    }
                  }
                  link_label
                }
                fields {
                  image
                  headline
                  number
                  video_source
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

export async function getShopData(previewData) {
  const data = await fetchAPI(
    `{
      allShops(uid: "shop") {
        edges {
          node {
            meta_title
            meta_description
            page_title
            body {
              ... on ShopBodyText {
                type
                primary {
                  text
                }
              }
              ... on ShopBodyShop_accordion {
                type
                primary {
                  image
                  headline
                  background_color
                }
                fields {
                  image
                  title
                  text
                }
              }
              ... on ShopBodyText_accordion {
                type
                primary {
                  headline
                  background_color
                  expand_first_item
                }
                fields {
                  title
                  text
                }
              }
              ... on ShopBodyShop_text_image {
                type
                primary {
                  headline
                  text
                  image
                  background_color
                  alignment
                }
              }
              ... on ShopBodyShop {
                type
                fields {
                  image
                  tab_name
                  text
                  product_sku
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

  return data.allShops.edges[0].node;
}
