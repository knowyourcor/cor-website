import { useState, useEffect } from "react";

import VariantSelector from "./VariantSelector";
import SubscriptionProduct from "./SubscriptionProduct";
import RadioGroup from "./RadioButton";

import styles from "./product.module.scss";

export default function Product({ product, subscriptions, addVariantToCart }) {
  const [purchaseType, setPurchaseType] = useState(false);

  let defaultOptionValues = {};
  product.options.forEach((selector) => {
    defaultOptionValues[selector.name] = selector.values[0];
  });

  const [selectedOptions, setSelectedOptions] = useState(defaultOptionValues);

  const [variantImage, setVariantImage] = useState(
    product.images.edges[0].node
  );
  const [variant, setVariant] = useState(product.variants.edges[0].node);
  const [variantQuantity, setVariantQuantity] = useState(1);

  const [subscriptionFrequency, setSubscriptionFrequency] = useState({
    frequency_num: "",
    frequency_type: "",
    frequency_type_text: "",
  });

  const handleOptionChange = (event) => {
    const target = event.target;
    selectedOptions[target.name] = target.value;

    const selectedVariant = product.variants.edges.find((variant) => {
      return variant.node.selectedOptions.every((selectedOption) => {
        return selectedOptions[selectedOption.name] === selectedOption.value;
      });
    }).node;

    setVariant(selectedVariant);
    setVariantImage(selectedVariant.image);
  };

  const handleQuantityChange = (event) => {
    setVariantQuantity(event.target.value);
  };

  const handleFrequencyChange = (frequencyObj) => {
    setSubscriptionFrequency(frequencyObj);
  };

  let variantSelectors = product.options.map((option) => {
    return (
      <VariantSelector
        handleOptionChange={handleOptionChange}
        key={option.id.toString()}
        option={option}
      />
    );
  });

  // Subscriptions

  // Get Subscriptions group object
  const subscriptionGroups = subscriptions.groups.subscription_groups;

  // TODO: find out if THIS product has a subscription
  // TODO: find out if THIS product has one-time option, create toggle to switch between

  // Base64 decode Shopify variant IDs
  // Return ID number
  const productVariantIds = product.variants.edges.map((variant) => {
    const decodeID = atob(variant.node.id);
    const getID = decodeID.replace("gid://shopify/ProductVariant/", "");
    return getID;
  });

  // Find match by variant id in subscriptionGroups data
  // const productSubscription = subscriptionGroups.filter((group) =>
  //   group.affected_products.some((product) => {
  //     return productVariantIds.includes(product.variant_id.toString());
  //   })
  // );

  const [productSubscription, setProductSubscription] = useState(
    subscriptionGroups.filter((group) =>
      group.affected_products.some((product) => {
        return productVariantIds.includes(product.variant_id.toString());
      })
    )
  );

  const customAttributes = [
    { key: "frequency_num", value: `${subscriptionFrequency.frequency_num}` },
    {
      key: "frequency_type",
      value: `${subscriptionFrequency.frequency_type}`,
    },
    {
      key: "frequency_type_text",
      value: `${subscriptionFrequency.frequency_type_text}`,
    },
    {
      key: "group_id",
      value: `${productSubscription[0]?.id}`,
    },
    {
      key: "discounted_price",
      value: `$${Math.abs(
        Number(variant.price) *
          Number(productSubscription[0]?.group_discount) *
          0.01 -
          Number(variant.price)
      ).toFixed(2)}`,
    },
    {
      key: "_ro_discount_percentage",
      value: "5.25",
    },
    {
      key: "_ro_unformatted_price",
      value: `${Math.abs(
        Number(variant.price) *
          Number(productSubscription[0]?.group_discount) *
          0.01 -
          Number(variant.price)
      )
        .toFixed(2)
        .split(".")
        .join("")}`,
    },
  ];

  // Check if there is subscription data for this product
  const subscriptionAvailable = productSubscription.length > 0;

  const productCustomAttributes =
    subscriptionAvailable && purchaseType === "subscription"
      ? customAttributes
      : [];

  // Is this product subscription only?
  const subscriptionOnly = productSubscription[0]?.subscription_only === 1;

  // Is subscription the default purchase option?
  const defaultPurchaseSubscription =
    productSubscription[0]?.is_subscription_default_on_widget;

  // Does this product have a discount?
  const productDiscount = Number(productSubscription[0]?.group_discount);
  const productDiscountValue = productDiscount.toFixed(2);

  useEffect(() => {
    if (subscriptionAvailable && defaultPurchaseSubscription) {
      setPurchaseType("subscription");
      // purchaseType, setPurchaseType
    } else if (subscriptionAvailable && !defaultPurchaseSubscription) {
      setPurchaseType("one-time:");
    }
  }, []);

  return (
    <div className={styles.product}>
      {product.images.edges.length ? (
        <img
          src={variantImage.src}
          alt={`${product.title} product shot`}
          width="250"
        />
      ) : null}
      <h5 className={styles.productTitle}>{product.title}</h5>
      <span className={styles.productPrice}>${variant.price}</span>
      {variantSelectors}

      {subscriptionAvailable && (
        <div className={styles.purchaseType}>
          <RadioGroup
            defaultValue={
              defaultPurchaseSubscription ? "subscription" : "one-time"
            }
            onChange={(value) => setPurchaseType(value)}
          >
            {!subscriptionOnly && (
              <RadioGroup.RadioButton value="one-time">
                <span aria-label="one-time">One-time purchase</span>
              </RadioGroup.RadioButton>
            )}

            <RadioGroup.RadioButton value="subscription">
              <span aria-label="subscription">
                Subscribe{" "}
                {productDiscount > 0 && `& Save ${productDiscountValue}% off`}
              </span>
            </RadioGroup.RadioButton>
          </RadioGroup>

          {productSubscription.length > 0 &&
            purchaseType === "subscription" && (
              <SubscriptionProduct
                {...productSubscription[0]}
                handleFrequencyChange={(values) =>
                  handleFrequencyChange(values)
                }
              />
            )}
        </div>
      )}

      <label className={styles.productOption}>
        Quantity
        <input
          min="1"
          type="number"
          defaultValue={variantQuantity}
          onChange={handleQuantityChange}
          className={styles.productQuantity}
        ></input>
      </label>
      <button
        className={styles.button}
        onClick={() =>
          addVariantToCart(variant.id, variantQuantity, productCustomAttributes)
        }
      >
        Add to Cart
      </button>
    </div>
  );
}
