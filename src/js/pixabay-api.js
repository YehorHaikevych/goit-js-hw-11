const URL = 'https://pixabay.com/api/';
const API_KEY = '45450320-ff41929b7ba9ff08d5fa2120e';

function searchImages(str) {
  return fetch(
    `${URL}?key=${API_KEY}&q=${encodeURIComponent(
      str
    )}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { searchImages };
