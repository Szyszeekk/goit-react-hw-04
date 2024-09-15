import css from "../css/ImageGallery.module.css";

import ImageCard from "./ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div className={css.imageGallery}>
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
