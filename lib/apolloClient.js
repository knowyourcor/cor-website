import { useMemo } from "react";
import { ApolloLink } from "apollo-link";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { onError } from "apollo-link-error";
import { concatPagination } from "@apollo/client/utilities";

let apolloClient;

const boldLink = new RestLink({
  uri: "https://api-fetch.vercel.app/api/fetch",
});

const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      console.error(graphQLErrors);
    }
    if (networkError) {
      console.warn(networkError);
    }
    forward(operation);
  }
);

const shopifyLink = new HttpLink({
  uri: "https://the-cor-store.myshopify.com/api/graphql",
  credentials: "same-origin",
  headers: {
    "X-Shopify-Storefront-Access-Token": "7a1639b70e16240932e5a3c4e090d7cf",
  },
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([errorLink, boldLink, shopifyLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
