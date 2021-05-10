import { useEffect } from "react";
import Modal from 'react-modal';
import Image from "next/image";
import { RichText } from "prismic-reactjs";

import styles from "./index.module.scss";

const customModalInfo = {
  overlay : {
    zIndex: '1000',
  },
};

export default function TeamModal({ modalIsOpen, close, image, name, position, description }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement(document.getElementById('#modalInfo'));
    }
  }, [])

  return (
    <Modal
      id="#modalInfo"
      className={styles.modalInfo}
      style={customModalInfo}
      isOpen={modalIsOpen}
      onRequestClose={close}
      contentLabel="Info Modal"
      ariaHideApp={false}
    >
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <div className={styles.avatar}>
            <img src={image.url} />
          </div>
          <div className={styles.info}>
            <RichText render={name} />
            <RichText render={position} />
          </div>
          <span
            className={styles.closeIcon}
            onClick={close}
          >
            <Image src="/icons/close.svg" height={25} width={25} />
          </span>
        </div>
        <div className={styles.modalContent}>
          <RichText render={description} />
        </div>
      </div>
    </Modal>
  );
}
