import { gql } from "@apollo/client";

export const SHOPIFY_QUERY = gql`
  {
    shop {
      name
      description
      products(first: 20) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            options {
              id
              name
              values
            }
            variants(first: 25) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    src
                  }
                  price
                }
              }
            }
            images(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const BOLD_QUERY = gql`
  query {
    groups @rest(type: "Groups", path: "/", method: "GET") {
      subscription_groups @type(name: "Group") {
        id
        group_name
        group_discount
        max_number
        subscription_only
        is_subscription_default_on_widget
        affected_products @type(name: "Products") {
          id
          variant_id
        }
        intervals @type(name: "Intervals") {
          interval_id
        }
      }
    }
  }
`;
