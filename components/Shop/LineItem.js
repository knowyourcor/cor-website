import styles from "./cart.module.scss";

export default function LineItem(props) {
  const decrementQuantity = (lineItemId) => {
    const updatedQuantity = props.line_item.quantity - 1;
    props.updateLineItemInCart(lineItemId, updatedQuantity);
  };

  const incrementQuantity = (lineItemId) => {
    const updatedQuantity = props.line_item.quantity + 1;
    props.updateLineItemInCart(lineItemId, updatedQuantity);
  };

  return (
    <li className={styles.lineItem}>
      <div className={styles.lineItemImage}>
        {props.line_item.variant.image ? (
          <img
            src={props.line_item.variant.image.src}
            alt={`${props.line_item.title} product shot`}
          />
        ) : null}
      </div>
      <div className={styles.lineItemContent}>
        <div className={styles.lineItemRow}>
          <div className={styles.lineItemVariantTitle}>
            {props.line_item.variant.title}
          </div>
          <span className={styles.lineItemTitle}>{props.line_item.title}</span>
        </div>
        <div className={styles.lineItemRow}>
          <div className={styles.lineItemQuantityContainer}>
            <button
              className={styles.lineItemQuantityUpdate}
              onClick={() => decrementQuantity(props.line_item.id)}
            >
              -
            </button>
            <span className={styles.lineItemQuantity}>
              {props.line_item.quantity}
            </span>
            <button
              className={styles.lineItemQuantityUpdate}
              onClick={() => incrementQuantity(props.line_item.id)}
            >
              +
            </button>
          </div>
          <span className={styles.lineItemPrice}>
            ${" "}
            {(props.line_item.quantity * props.line_item.variant.price).toFixed(
              2
            )}
          </span>
          <button
            className={styles.lineItemRemove}
            onClick={() => props.removeLineItemInCart(props.line_item.id)}
          >
            ×
          </button>
        </div>
      </div>
    </li>
  );
}
