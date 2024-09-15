import css from "../css/ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div className={css.imageCard} onClick={onClick}>
      <img src={image.urls.small} alt={image.alt_description || "Image"} />
    </div>
  );
};

export default ImageCard;
