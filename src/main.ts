import "./style.css";

interface Response {
  id: string;
  url: string;
  width: number;
  height: number;
}

const API_URL = "https://api.thedogapi.com/v1/images/search";
const API_KEY =
  "live_IVjVVgYeA58x2gmhfJFPm2GR24g5jk8N6FHHuPLyjeC7AKKHo9NQKvjqEyx0fAfs";

const images = document.querySelector<HTMLDivElement>("#images");
const imagesFavorites =
  document.querySelector<HTMLDivElement>("#imagesFavorites");
const btnRefresh = document.querySelector<HTMLButtonElement>("#refresh");

async function fetchData(urlApi: string): Promise<Response[]> {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}

// async function reload() {
//   const imageSrc: Response[] = await fetchData(API_URL);
//   image!.src = imageSrc[0].url;
// }

async function reload() {
  images!.innerHTML = "";

  const imagesSrc: Response[] = await fetchData(
    `${API_URL}?limit=3&api_key=${API_KEY}&`
  );

  imagesSrc.forEach((item) => {
    const wrapImage = document.createElement("div");
    wrapImage.className = "flex flex-col items-start mt-4";

    const image = document.createElement("img");
    image.src = item.url;
    image.className = "max-w-sm mt-2";

    const btnFavorite = document.createElement("button");
    btnFavorite.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg><span>Guardar en favoritos</span>`;
    btnFavorite.className =
      "bg-green-500 px-2 py-1 rounded-md flex justify-center gap-2";
    btnFavorite.addEventListener("click", () => {
      favorites.push(item);
      loadFavorites();
    });

    wrapImage.append(btnFavorite, image);

    images!.append(wrapImage);
  });
}

let favorites: Response[] = [];

async function loadFavorites() {
  imagesFavorites!.innerHTML = "";

  favorites.forEach((item) => {
    const wrapImage = document.createElement("div");
    wrapImage.className = "flex flex-col items-start mt-4";

    const image = document.createElement("img");
    image.src = item.url;
    image.className = "max-w-sm mt-2";

    const btnFavorite = document.createElement("button");
    btnFavorite.innerHTML = `<span>Dejar en favoritos</span>`;
    btnFavorite.className =
      "bg-red-500 px-2 py-1 rounded-md flex justify-center gap-2";

    wrapImage.append(btnFavorite, image);

    imagesFavorites!.append(wrapImage);
  });
}

btnRefresh!.addEventListener("click", () => {
  reload();
});

reload();
