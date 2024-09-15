import css from "../css/LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.button}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
