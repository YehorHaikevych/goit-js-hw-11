const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallary');
const createGalleryCardTemplate = imgInfo => {
  return `
  <li class="gallery-card">
    <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" width="100%" height="200px"/>
  </li>`;
};

const onSearchFormSubmit = event => {
  event.preventDefault();

  const searchedValue = searchFormEl.elements.user_query.value;
  fetch(
    `https://pixabay.com/api/?key=45450320-ff41929b7ba9ff08d5fa2120e&q=${searchedValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=9`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const galleryCardsTemplate = data.hits
        .map(imgDetals => createGalleryCardTemplate(imgDetals))
        .join('');
      galleryEl.innerHTML = galleryCardsTemplate;
    })
    .catch(err => {
      console.log(err);
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
