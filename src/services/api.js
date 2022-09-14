import axios from 'axios';
import PropTypes from 'prop-types';

const KEY = `24403599-f84531e333bd81f07832587e9`;
const perPage = 24;
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  const { hits } = response.data;
  return { hits };
};

fetchImages.PropTypes = {
  query: PropTypes.string,
  page: PropTypes.number,
};
