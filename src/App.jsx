import { useState } from "react";
import axios from "axios";
import ErrorMessage from "./components/ErrorMessage";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn";
import SearchBar from "./components/SearchBar";
import ImageModal from "./components/ImageModal";

const accessKey = "nLXpU65IEnYXYYrXgl5KNvbWG5EpA7pnzhQqxRV9ok8";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchImages = async (query, page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: query,
            page: page,
            per_page: 12,
          },
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );

      if (page === 1) {
        setImages(response.data.results);
      } else {
        setImages((prevImages) => [...prevImages, ...response.data.results]);
      }

      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setCurrentPage(1);
    fetchImages(newQuery, 1);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchImages(query, nextPage);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage />}
      <ImageGallery images={images} onImageClick={openModal} />{" "}
      {currentPage < totalPages && !loading && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      {loading && <Loader />}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;
