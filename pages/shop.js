import Head from "../components/Head";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { initializeApollo } from "../lib/apolloClient";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Modules from "../components/Modules";
import Alert from "../components/Alert";
import Product from "../components/Shop/Product";
import {
  useCheckoutEffect,
  createCheckout,
  getCheckout,
  checkoutLineItemsAdd,
  checkoutLineItemsUpdate,
  checkoutLineItemsRemove,
  checkoutCustomerAssociate,
} from "../components/Shop/Checkout";
import ErrorMessage from "../components/ErrorMessage";

import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";

import { getShopData, getMenuData } from "../lib/api";
import { SHOPIFY_QUERY, BOLD_QUERY } from "../lib/apolloQueries";

import { useCart } from "../context/CartContext";

import styles from "../styles/Shop.module.scss";

export default function Shop({
  preview,
  pageData,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
}) {
  // Define cart context for global data storage
  const { cartContext, setCartContext, setCartOpen } = useCart();

  // Query
  // Shopify data
  const { loading: shopLoading, error: shopError, data: shopData } = useQuery(
    SHOPIFY_QUERY,
    {
      context: { clientName: "shopifyLink" },
      notifyOnNetworkStatusChange: true,
    }
  );

  // Query
  // Bold REST data
  const { loading: boldLoading, error: boldError, data: boldData } = useQuery(
    BOLD_QUERY,
    {
      context: { clientName: "boldLink" },
      notifyOnNetworkStatusChange: true,
    }
  );

  // Mutation
  // Add line item to cart
  const [
    lineItemAddMutation,
    {
      data: lineItemAddData,
      loading: lineItemAddLoading,
      error: lineItemAddError,
    },
  ] = useMutation(checkoutLineItemsAdd, {
    context: { clientName: "shopifyLink" },
  });

  // Add variant to cart
  const addVariantToCart = (variantId, quantity, customAttributes) => {
    console.log("addVariantToCart - customAttributes", customAttributes);
    const variables = {
      checkoutId: cartContext.id,
      lineItems: [
        {
          variantId,
          quantity: parseInt(quantity, 10),
          customAttributes: [...customAttributes],
        },
      ],
    };
    lineItemAddMutation({ variables }).then((res) => {
      setCartOpen(true);
    });
  };

  useCheckoutEffect(lineItemAddData, "checkoutLineItemsAdd", setCartContext);

  if (shopError) return <ErrorMessage message="Error loading posts." />;
  if (shopLoading) return <div>Loading...</div>;

  return (
    <>
      <Head title={pageData.meta_title} />
      <Alert preview={preview} />
      <main>
        <Topbar mainMenuData={mainMenuData} />
        <Section>
          <Container>
            <Row>
              <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
                <div className={styles.products}>
                  {shopData.shop.products.edges.map((product) => (
                    <Product
                      addVariantToCart={addVariantToCart}
                      key={product.node.id.toString()}
                      product={product.node}
                      subscriptions={boldData}
                    />
                  ))}
                </div>
              </Column>
            </Row>
          </Container>
        </Section>
        .
        <Modules pageData={pageData} />
      </main>
      <Footer
        footerMenuData={footerMenuData}
        tertiaryMenuData={tertiaryMenuData}
      />
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SHOPIFY_QUERY,
    query: BOLD_QUERY,
  });
  const pageData = await getShopData(previewData);
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  return {
    props: {
      preview,
      pageData,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1, // In seconds
  };
}
