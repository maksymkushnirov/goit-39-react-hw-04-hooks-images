import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as api from 'services/api';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [loading, setLoading] = useState(false);

  const perPage = 12;

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);

    const fetchData = async () => {
      try {
        const images = await api.fetchImages(query, page);
        if (images.hits.length) {
          setImages(prevState => [...prevState, ...images.hits]);
          setLoading(true);
        } else {
          toast.error(
            `Sorry, there are no images matching your search query. Please try again.`,
            {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            }
          );
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setLargeImage('');
  };

  const openModal = largeImage => {
    setLargeImage(largeImage);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={handleSubmit} />
      <ToastContainer />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {images.length < perPage ? null : (
        <Button onLoadMoreClick={onLoadMoreClick}></Button>
      )}
      {largeImage && (
        <Modal largeImage={largeImage} onCloseModal={closeModal} />
      )}
    </div>
  );
};