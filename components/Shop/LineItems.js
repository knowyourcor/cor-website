import { useMutation } from "@apollo/react-hooks";
import { useCart } from "../../context/CartContext";
import LineItem from "./LineItem";
import {
  useCheckoutEffect,
  checkoutLineItemsUpdate,
  checkoutLineItemsRemove,
} from "./Checkout";

import styles from "./cart.module.scss";

export default function LineItems({ lineItems }) {
  // Define cart context for global data storage
  const { cartContext, setCartContext } = useCart();

  // Update item
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

  const updateLineItemInCart = (lineItemId, quantity) => {
    const variables = {
      checkoutId: cartContext.id,
      lineItems: [{ id: lineItemId, quantity: parseInt(quantity, 10) }],
    };
    lineItemUpdateMutation({ variables });
  };

  useCheckoutEffect(
    lineItemUpdateData,
    "checkoutLineItemsUpdate",
    setCartContext
  );

  // Remove line item
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

  const removeLineItemInCart = (lineItemId) => {
    const variables = { checkoutId: cartContext.id, lineItemIds: [lineItemId] };
    lineItemRemoveMutation({ variables });
  };

  useCheckoutEffect(
    lineItemRemoveData,
    "checkoutLineItemsRemove",
    setCartContext
  );

  return (
    <ul className={styles.lineItems}>
      {cartContext.lineItems.edges.map((line_item) => {
        return (
          <LineItem
            removeLineItemInCart={removeLineItemInCart}
            updateLineItemInCart={updateLineItemInCart}
            key={line_item.node.id.toString()}
            line_item={line_item.node}
          />
        );
      })}
    </ul>
  );
}
