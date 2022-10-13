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
    const image = document.createElement("img");
    image.src = item.url;
    image.className = "max-w-sm mt-4";

    images!.append(image);
  });
}

btnRefresh!.addEventListener("click", () => {
  reload();
});

reload();
