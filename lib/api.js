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
  try {
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

    const json = await res.json();
    if (res.status !== 200 || json.errors) throw new Error(json.errors);

    return json.data;
  } catch (error) {
    console.error(error)
  }
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
            featured_press
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
              ... on PageBodyText___downloader {
                type
                primary {
                  background_color
                  heading
                  text
                  card_details
                  file {
                    __typename
                    ... on _FileLink{
                      name
                      url
                      size
                    }
                  }
                  card_note
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
                  link_label
                }
              }
              ... on HomepageBodyQuadcarousel {
                type
                primary {
                  heading
                  paragraph
                  background_color
                }
                fields {
                  image
                  name
                  meter_number
                  heading
                  list
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
                  meter_color
                  title
                  text
                }
              }
              ... on HomepageBodyCarousel {
                type
                primary {
                  headline
                  text
                  carousel_type
                  text_alignment,
                  link_label
                }
                fields {
                  image
                  headline
                  text
                  position
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
                  variant
                  image
                  headline
                  video_source
                }
              }
              ... on HomepageBodyChecklist {
                type
                primary {
                  heading
                  image
                  text
                  heading3
                  background_color
                }
                fields {
                  checklist_item
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
              ... on ShopBodyProduct {
                type
                primary {
                  image
                  overflow_image
                  product_details
                  product_price
                  product_discount_note
                  product_sku
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
              ... on ShopBodyText___background_image {
                type
                primary {
                  heading
                  text
                  background_color
                  background_image
                }
              }
              ... on ShopBodyShop_checklist {
                type
                primary {
                  heading
                  text
                  image
                }
                fields {
                  icon
                  item
                }
              }
              ... on ShopBodyDualdatagrid {
                type
                primary {
                  background_color
                  tag
                  heading
                  text_heading
                  text
                  big_image
                  overflow_image
                }
              }
              ... on ShopBodyNewsletter {
                type
                primary {
    							title
                  description
                  input_placeholder
                  button_name
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

export async function getBlogData(previewData) {
  const data = await fetchAPI(
    `{
      posts: allBlog_posts(where: {featured_post: false}, first: 3) {
        edges {
          node {
            featured_post
            title
            category
            date
            excerpt
            _meta {
              uid
            }
            content {
              image
              heading
              paragraph
              quote
            }
          }
        }
      }

      featuredPost: allBlog_posts(where: {featured_post: true}) {
        edges {
          node {
            featured_post
            title
            category
            date
            excerpt
            _meta {
              uid
            }
            content {
              image
              heading
              paragraph
              quote
            }
          }
        }
      }
    }
  `,
    {
      previewData,
    }
  );

  return data;
}

export async function getCategoryBlogData(after, previewData) {
  const data = await fetchAPI(
    `query ($after: String!) {
      categories: allBlog_posts (after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            category
          }
          cursor
        }
      }

      categoriesData: allBlog_posts(first: 100) {
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          node {
            featured_post
            title
            category
            date
            excerpt
            _meta {
              uid
            }
            content {
              image
              heading
              paragraph
              quote
            }
          }
          cursor
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        after
      }
    }
  );

  return data;
}

export async function getBlogPostData(id, previewData) {
  const data = await fetchAPI(
    `query PageDataBySlug($id: String!){
      allBlog_posts(uid: $id, lang:"en-us") {
        edges {
          node {
            background_color
            title
            category
            date
            _meta {
              uid
            }
            content {
              image
              embed_media
              heading
              paragraph
              quote
            }
          }
        }
      }
    }          
  `,
    {
      previewData,
      variables: {
        id,
      },
    }
  );

  return data.allBlog_posts.edges[0].node;
}
