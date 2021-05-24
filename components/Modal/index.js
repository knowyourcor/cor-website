import { createContext, createRef, useEffect, useContext } from "react";
import { FocusOn } from "react-focus-on";
import { createPortal } from "react-dom";

import styles from "./modal.module.scss";

export default function ModalComponent({ isActive, children, closeModal }) {
  return (
    <>
      {isActive && (
        <Modal onModalClose={() => closeModal()} isActive={isActive}>
          {children}
        </Modal>
      )}
    </>
  );
}

const modalContext = createContext();

function Modal({ children, onModalClose, isActive }) {
  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const modalRef = createRef();
  const handleTabKey = (e) => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([
    [27, onModalClose],
    [9, handleTabKey],
  ]);

  return createPortal(
    <FocusOn enabled={isActive}>
      <div
        className={styles["modal-container"]}
        role="dialog"
        aria-modal="true"
        onClick={onModalClose}
      >
        <div className={styles["modal-content"]} ref={modalRef}>
          <modalContext.Provider value={{ onModalClose }}>
            {children}
          </modalContext.Provider>
        </div>
      </div>
    </FocusOn>,
    document.body
  );
}

export function ModalHeader(props) {
  const { onModalClose } = useContext(modalContext);
  return (
    <div className={styles["modal-header"]}>
      {props.children}
      <button
        className={styles["close-btn"]}
        title="close modal"
        onClick={onModalClose}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 5L45 0L25 20L5 0L0 5L20 25L0 45L5 50L25 30L45 50L50 45L30 25L50 5Z"
            fill="#393F40"
          />
        </svg>
      </button>
    </div>
  );
}

export function ModalBody(props) {
  return <div className={styles["modal-body"]}>{props.children}</div>;
}

// Modal.Footer = function ModalFooter(props) {
//   return <div className={styles["modal-footer"]}>{props.children}</div>;
// };

// Modal.Footer.CloseBtn = function CloseBtn(props) {
//   const { onModalClose } = useContext(modalContext);
//   return (
//     <button
//       {...props}
//       className={styles["close-btn"]}
//       title="close modal"
//       onClick={onModalClose}
//     />
//   );
// };
