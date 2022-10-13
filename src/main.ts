import "./style.css";

interface Response {
  id: string;
  url: string;
  width: number;
  height: number;
}

const URL = "https://api.thedogapi.com/v1/images/search";

const image = document.querySelector<HTMLImageElement>("#image");
const btnRefresh = document.querySelector<HTMLButtonElement>("#refresh");

async function fetchData(urlApi: string): Promise<Response[]> {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}

async function render() {
  const imageSrc: Response[] = await fetchData(URL);
  image!.src = imageSrc[0].url;
}

btnRefresh!.addEventListener("click", () => {
  render();
});

(async () => {
  render();
})();
