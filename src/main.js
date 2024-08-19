import { searchImages } from './js/pixabay-api';
import { showSearchResults } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const elements = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

const photosGallery = new simpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

elements.form.addEventListener('submit', searchHandler);

function searchHandler(event) {
  event.preventDefault();
  elements.gallery.innerHTML = '';
  const searchString = elements.input.value.trim();
  if (searchString === '') {
    return iziToast.error({
      message: 'Search field can not be empty!',
      position: 'topCenter',
      timeout: 3000,
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      iconUrl: './error.svg',
      progressBarColor: '#b51b1b',
      maxWidth: '432px',
    });
  }
  elements.loader.classList.remove('visually-hidden');
  searchImages(searchString)
    .then(data => {
      elements.input.value = '';
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 3000,
          messageColor: '#fafafb',
          backgroundColor: '#ef4040',
          iconUrl: './error.svg',
          progressBarColor: '#b51b1b',
          maxWidth: '432px',
        });
      } else {
        elements.gallery.innerHTML = showSearchResults(data.hits);
        photosGallery.refresh();
      }
    })
    .catch(err => {
      console.log(err);
      iziToast.error({
        message: `Something went wrong... Error: ${err}`,
        position: 'topCenter',
        timeout: 3000,
        messageColor: '#fafafb',
        backgroundColor: '#ef4040',
        iconUrl: './error.svg',
        progressBarColor: '#b51b1b',
        maxWidth: '432px',
      });
    })
    .finally(() => elements.loader.classList.add('visually-hidden'));
}
