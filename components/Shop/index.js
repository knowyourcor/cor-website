import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
import { parseCookies, setCookie } from "nookies";

import { SHOP_QUERY, BOLD_QUERY } from "../../lib/apolloQueries";

import Product from "./Product";
import Cart from "./Cart";

import ErrorMessage from "../ErrorMessage";
import {
  useCheckoutEffect,
  createCheckout,
  getCheckout,
  checkoutLineItemsAdd,
  checkoutLineItemsUpdate,
  checkoutLineItemsRemove,
  checkoutCustomerAssociate,
} from "./Checkout";

import styles from "./shop.module.scss";

export default function Shopify() {
  const { loading: shopLoading, error: shopError, data: shopData } = useQuery(
    SHOP_QUERY,
    {
      context: { clientName: "shopifyLink" },
      notifyOnNetworkStatusChange: true,
    }
  );

  const { loading: boldLoading, error: boldError, data: boldData } = useQuery(
    BOLD_QUERY,
    {
      context: { clientName: "boldLink" },
      notifyOnNetworkStatusChange: true,
    }
  );

  const [isCartOpen, setCartOpen] = useState(false);
  const [isNewCustomer, setNewCustomer] = useState(false);
  const [isCustomerAuthOpen, setCustomerAuthOpen] = useState(false);
  const [
    showAccountVerificationMessage,
    setAccountVerificationMessage,
  ] = useState(false);
  const [checkout, setCheckout] = useState({ lineItems: { edges: [] } });

  const [customerAccessToken, setCustomerAccessToken] = useState(null);

  const [
    createCheckoutMutation,
    {
      data: createCheckoutData,
      loading: createCheckoutLoading,
      error: createCheckoutError,
    },
  ] = useMutation(createCheckout, {
    context: { clientName: "shopifyLink" },
  });

  const { cor_checkout_id } = parseCookies();

  const {
    loading: getCheckoutLoading,
    error: getCheckoutError,
    data: getCheckoutData,
  } = useQuery(getCheckout, {
    context: { clientName: "shopifyLink" },
    variables: { checkoutId: decodeURI(cor_checkout_id) },
    onCompleted: (checkoutData) => setCheckout(checkoutData.node),
    onError: () => createEmptyCheckout(),
  });

  getCheckoutData && console.log("getCheckoutData: ", getCheckoutData);

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

  const [
    lineItemUpdateMutation,
    {
      data: lineItemUpdateData,
      loading: lineItemUpdateLoading,
      error: lineItemUpdateError,
    },
  ] = useMutation(checkoutLineItemsUpdate, {
    context: { clientName: "shopifyLink" },
  });

  const [
    lineItemRemoveMutation,
    {
      data: lineItemRemoveData,
      loading: lineItemRemoveLoading,
      error: lineItemRemoveError,
    },
  ] = useMutation(checkoutLineItemsRemove, {
    context: { clientName: "shopifyLink" },
  });

  const [
    customerAssociateMutation,
    {
      data: customerAssociateData,
      loading: customerAssociateLoading,
      error: customerAssociateError,
    },
  ] = useMutation(checkoutCustomerAssociate, {
    context: { clientName: "shopifyLink" },
  });

  const storeCheckout = (res) => {
    const { id } = res.data.checkoutCreate.checkout;
    setCookie(res, "cor_checkout_id", id, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  };

  const createEmptyCheckout = () => {
    const variables = { input: {} };
    createCheckoutMutation({ variables }).then(
      (res) => {
        storeCheckout(res);
        console.log("checkout res: ", res);
      },
      (err) => {
        console.log("create checkout error", err);
      }
    );
  };

  useEffect(() => {
    // createEmptyCheckout()
  }, []);

  useCheckoutEffect(createCheckoutData, "checkoutCreate", setCheckout);
  useCheckoutEffect(lineItemAddData, "checkoutLineItemsAdd", setCheckout);
  useCheckoutEffect(lineItemUpdateData, "checkoutLineItemsUpdate", setCheckout);
  useCheckoutEffect(lineItemRemoveData, "checkoutLineItemsRemove", setCheckout);
  useCheckoutEffect(
    customerAssociateData,
    "checkoutCustomerAssociate",
    setCheckout
  );

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const openCustomerAuth = (event) => {
    if (event.target.getAttribute("data-customer-type") === "new-customer") {
      setNewCustomer(true);
      setCustomerAuthOpen(true);
    } else {
      setNewCustomer(false);
      setCustomerAuthOpen(true);
    }
  };

  const accountVerificationMessage = () => {
    setAccountVerificationMessage(true);
    setTimeout(() => {
      setAccountVerificationMessage(false);
    }, 5000);
  };

  const closeCustomerAuth = () => {
    setCustomerAuthOpen(false);
  };

  // properties: {
  //   frequency_num: "3",
  //   frequency_type: "2",
  //   frequency_type_text: "Week(s)",
  //   group_id: "160351",
  //   discounted_price: "$14.21",
  //   _ro_discount_percentage: "5.25",
  //   _ro_unformatted_price: "1421"
  //   }

  // {"frequency_num":"3","frequency_type":"2","frequency_type_text":"Week(s)","group_id":160351,"discounted_price":14.2125,"_ro_discount_percentage":"5.25","_ro_unformatted_price":"1500"}

  // customAttributes: [
  //   { key: "frequency_num", value: "3" },
  //   {
  //     key: "frequency_type",
  //     value: "2",
  //   },
  //   {
  //     key: "frequency_type_text",
  //     value: "Week(s)",
  //   },
  //   {
  //     key: "group_id",
  //     value: "160351",
  //   },
  //   {
  //     key: "discounted_price",
  //     value: "$14.21",
  //   },
  //   {
  //     key: "_ro_discount_percentage",
  //     value: "5.25",
  //   },
  //   {
  //     key: "_ro_unformatted_price",
  //     value: "1421",
  //   },
  // ],

  const addVariantToCart = (variantId, quantity, customAttributes) => {
    console.log("addVariantToCart - customAttributes", customAttributes);
    const variables = {
      checkoutId: checkout.id,
      lineItems: [
        {
          variantId,
          quantity: parseInt(quantity, 10),
          customAttributes: [...customAttributes],
        },
      ],
    };
    // TODO replace for each mutation in the checkout thingy. can we export them from there???
    // create your own custom hook???

    console.log("addVariantToCart variables: ", variables);

    lineItemAddMutation({ variables }).then((res) => {
      setCartOpen(true);
    });
  };

  const updateLineItemInCart = (lineItemId, quantity) => {
    const variables = {
      checkoutId: checkout.id,
      lineItems: [{ id: lineItemId, quantity: parseInt(quantity, 10) }],
    };
    lineItemUpdateMutation({ variables });
  };

  const removeLineItemInCart = (lineItemId) => {
    const variables = { checkoutId: checkout.id, lineItemIds: [lineItemId] };
    lineItemRemoveMutation({ variables });
  };

  const associateCustomerCheckout = (customerAccessToken) => {
    const variables = {
      checkoutId: checkout.id,
      customerAccessToken: customerAccessToken,
    };
    customerAssociateMutation({ variables }).then((res) => {
      setCustomerAuthOpen(false);
    });
  };

  // shopData && console.log("shop data: ", shopData);
  // boldData && console.log("bold data: ", boldData);

  if (shopError) return <ErrorMessage message="Error loading posts." />;
  if (shopLoading) return <div>Loading...</div>;

  return (
    <section>
      <div style={{ marginTop: "100px" }}>
        {!isCartOpen && (
          <button onClick={() => setCartOpen(!isCartOpen)}>Cart</button>
        )}
      </div>

      {shopData.shop.products.edges.map((product) => (
        <Product
          addVariantToCart={addVariantToCart}
          checkout={checkout}
          key={product.node.id.toString()}
          product={product.node}
          subscriptions={boldData}
        />
      ))}

      <Cart
        removeLineItemInCart={removeLineItemInCart}
        updateLineItemInCart={updateLineItemInCart}
        checkout={checkout}
        isCartOpen={isCartOpen}
        handleCartClose={handleCartClose}
        customerAccessToken={customerAccessToken}
      />
    </section>
  );
}
