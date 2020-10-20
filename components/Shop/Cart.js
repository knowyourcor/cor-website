import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { parseCookies, setCookie } from "nookies";
import { useCart } from "../../context/CartContext";
import { redirectPost, priceStringToNumber } from "../../lib/shopUtilities";
import LineItems from "./LineItems";
import { useCheckoutEffect, createCheckout, getCheckout } from "./Checkout";
import styles from "./cart.module.scss";

export default function Cart(props) {
  // Define cart context for global data storage
  const { cartContext, setCartContext, isCartOpen, setCartOpen } = useCart();

  // Cookie: cor_checkout_id
  // Get Shopify checkout ID
  const { cor_checkout_id } = parseCookies();

  // Query
  // Get checkout data from "cor_checkout_id" cookie
  const {
    loading: getCheckoutLoading,
    error: getCheckoutError,
    data: getCheckoutData,
  } = useQuery(getCheckout, {
    context: { clientName: "shopifyLink" },
    variables: { checkoutId: decodeURI(cor_checkout_id) },
    onCompleted: (data) => setCartContext(data.node),
    onError: () => createEmptyCheckout(),
  });

  // Mutation
  // Create new checkout
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

  const openShopifyCheckout = () => {
    window.open(cartContext.webUrl);
  };

  const openBoldCheckout = () => {
    const { id, totalPrice, lineItems } = cartContext;

    // Shopify checkout token from Base64 encoded id
    const shopifyCheckoutToken = atob(id).split("key=")[1];

    // Sum item quantity
    const totalQuantity = lineItems.edges.reduce(
      (currentValue, item) => currentValue + item.node.quantity,
      0
    );

    const cartItems = lineItems.edges.map((item) => {
      const {
        title,
        quantity,
        id,
        customAttributes,
        price,
        variant,
      } = item.node;

      // Merge customAttributes into a properties object
      const attributesMap = new Map();
      customAttributes.map((attribute) =>
        attributesMap.set(attribute.key, attribute.value)
      );
      const attributesObj = Object.fromEntries(attributesMap);
      return {
        id: Number(
          atob(variant.id).replace("gid://shopify/ProductVariant/", "")
        ),
        properties: { ...attributesObj },
        quantity: quantity,
        variant_id: Number(
          atob(variant.id).replace("gid://shopify/ProductVariant/", "")
        ),
        key: atob(variant.id).replace("gid://shopify/ProductVariant/", ""),
        title: title,
        price: priceStringToNumber(variant.price),
        original_price: priceStringToNumber(variant.price),
        discounted_price: priceStringToNumber(variant.price),
        line_price: priceStringToNumber(variant.price),
        original_line_price: priceStringToNumber(variant.price),
        total_discount: 0,
        discounts: [],
        sku: "",
        grams: 907,
        vendor: "The COR Store",
        taxable: true,
        product_id: Number(
          atob(variant.product.id).replace("gid://shopify/Product/", "")
        ),
        product_has_only_default_variant: false,
        gift_card: false,
        final_price: priceStringToNumber(variant.price),
        final_line_price: priceStringToNumber(variant.price),
        url: variant.product.onlineStoreUrl,
        featured_image: {
          aspect_ratio: 1.499,
          alt: title,
          height: 667,
          url: variant.image.src,
          width: 1000,
        },
        image: variant.image.src,
        handle: variant.product.handle,
        requires_shipping: true,
        product_type: "",
        product_title: title,
        product_description: "",
        variant_title: variant.title,
        variant_options: [variant.selectedOptions[0].value],
        options_with_values: [
          {
            [variant.selectedOptions[0].key]: variant.selectedOptions[0].value,
          },
        ],
        line_level_discount_allocations: [],
        line_level_total_discount: 0,
      };
    });

    const cartData = {
      token: shopifyCheckoutToken,
      note: "",
      attributes: {},
      original_total_price: priceStringToNumber(totalPrice),
      total_price: priceStringToNumber(totalPrice),
      total_discount: 0,
      total_weight: 907.1847,
      item_count: totalQuantity,
      items: cartItems,
      requires_shipping: true,
      currency: "USD",
      items_subtotal_price: 1500,
      cart_level_discount_applications: [],
    };

    const shopifyCart = {
      csrf_bold_token: "c55b60928454436fb60ab78e1db0b6b8",
      frequency_type: null,
      billing_plan: null,
      frequency_num: 1,
      frequency_type_text: "",
      shopify_customer_id: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      company: "",
      country: "",
      first_name: "",
      last_name: "",
      phone: "",
      province: "",
      zip: "",
      pickup_enabled: 0,
      shopify_cart: JSON.stringify(cartData),
      convertible_products: undefined,
    };

    const boldCheckoutURL =
      "https://recurringcheckout.com/s/the-cor-store/checkout/recurring/undefined?shop_url=the-cor-store.myshopify.com";

    redirectPost(boldCheckoutURL, shopifyCart);
  };

  // Are there items in the cart?
  const [checkoutAvailable, setCheckoutAvailable] = useState(
    cartContext && cartContext.lineItems.edges.length > 0
  );

  // Are any of those items subscription products?
  const [subscriptionPurchase, setSubscriptionPurchase] = useState(false);

  const hasProductSubscription =
    cartContext &&
    cartContext.lineItems.edges.map((item) => {
      if (item.node.customAttributes.length > 0) {
        return true;
      } else {
        return false;
      }
    });

  // Cookie: cor_checkout_id
  // Store Shopify checkout ID
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
    // TODO: Test if these is needed here
    // createEmptyCheckout();
  }, []);

  useEffect(() => {
    // Are there items in the cart?
    cartContext && setCheckoutAvailable(cartContext.lineItems.edges.length > 0);

    // Are any of those items subscription products?
    const purchaseType =
      hasProductSubscription &&
      hasProductSubscription.find((element) => element === true);

    hasProductSubscription && setSubscriptionPurchase(purchaseType);
  }, [hasProductSubscription]);

  // Checkout specific useEffects
  useCheckoutEffect(createCheckoutData, "checkoutCreate", setCartContext);

  return (
    <>
      {cartContext && (
        <div className={[styles.cart, isCartOpen ? styles.open : ""].join(" ")}>
          <header>
            <p>Your cart</p>
            <button onClick={() => setCartOpen(false)} className={styles.close}>
              ×
            </button>
          </header>

          <LineItems />

          <footer>
            <div className={styles.info}>
              <div className={styles.total}>Subtotal</div>
              <div className={styles.pricing}>
                $ {cartContext.subtotalPrice}
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.total}>Taxes</div>
              <div className={styles.pricing}>$ {cartContext.totalTax}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.total}>Total</div>
              <div className={styles.pricing}>$ {cartContext.totalPrice}</div>
            </div>

            <button
              className={[styles.checkout, styles.button].join(" ")}
              onClick={
                subscriptionPurchase ? openBoldCheckout : openShopifyCheckout
              }
              disabled={checkoutAvailable ? false : true}
            >
              Checkout
            </button>
          </footer>
        </div>
      )}
    </>
  );
}
