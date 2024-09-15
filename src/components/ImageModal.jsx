import { useState, useEffect } from "react";
import Modal from "react-modal";
import css from "../css/ImageModal.module.css";

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image.urls.regular;
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
      };
    }
  }, [image]);

  if (!image) return null;

  const aspectRatio = imageSize.width / imageSize.height;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={css.imageModal}
      overlayClassName={css.imageModalOverlay}
      style={{
        content: {
          width: "auto",
          height: "auto",
          maxWidth: "90vw",
          maxHeight: "90vh",
          aspectRatio: aspectRatio,
        },
      }}>
      <img
        src={image.urls.regular}
        alt={image.alt_description || "Image"}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </Modal>
  );
};

export default ImageModal;
