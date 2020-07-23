const APIKEY = "mL5OYkRmJrdpSTr4xqCqaswySn95yN_m38YtI8rw1Uk";

const getRandomPhotos = async (
  count = 8,
  orientation = "landscape",
  size = "small"
) => {
  const url = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${count}&orientation=${orientation}`;

  const imageUrlPromise = await fetch(url);
  const imageData = await imageUrlPromise.json();
  return imageData.map((image) => image.urls[size]);
};

const searchPhoto = async (query, size, count) => {
  const url = `https://api.unsplash.com/search/photos/?client_id=${APIKEY}&per_page=${count}&query=${query}&orientation=landscape`;
  const imageUrlPromise = await fetch(url);
  const imageData = await imageUrlPromise.json();
  return imageData.results.map((image) => image.urls[size]);
};
export const UnsplashService = {
  getRandomPhotos,
  searchPhoto,
};
