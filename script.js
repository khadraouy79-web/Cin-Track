import { fetchFilms } from "./api.js";
import { openMoviePopup } from "./modal.js";
import { addFavorite } from "./favorites.js";
import { refreshPagination } from "./cabin.js";

fetchFilms()

  .then(data => {
     if (data === null) return;
  const container = document.querySelector("#cardsContainer");
  const searshBar = document.getElementById("searshBar");
  const Home = document.getElementById("Home");
  const series = document.getElementById("series");
  const Movies = document.getElementById("Movies");

  function displayFilms(films) {
    container.innerHTML="";

    films.forEach(film => {

    const card = document.createElement("article");
    card.className = "card movie-card bg-black/70 text-white rounded-xl overflow-hidden hover:bg-gray-700 transition-transform duration-300 hover:scale-105 cursor-pointer";

    const image = document.createElement("img");
    image.src = film.image;
    image.alt = film.title;
    image.className = "w-full h-80 object-cover";

    const title = document.createElement("h2");
    title.textContent = film.title;
    title.className = "p-2 text-xl font-bold text-center";

    const type = document.createElement("h3");
    type.textContent = film.type;
    type.className = "p-2 text-xl font-bold ";

    const releaseYear = document.createElement("p");
    releaseYear.textContent = film.releaseYear;
    releaseYear.className = "p-2 text-xl font-bold";

    const addfavor = document.createElement("p");
    addfavor.textContent = "add to favorite";
    addfavor.className = "p-2 text-xl font-bold";

    const favorite = document.createElement("button")
    favorite.textContent = "❤️";
    favorite.setAttribute("aria-label", "Ajouter aux favoris");
    favorite.className = "bg-red-600 p-2 text-xl font-bold rounded-xl  hover:bg-red-800 hover:scale-105 active:scale-95";

    const cardInfo = document.createElement("div");
    cardInfo.className = "flex items-center justify-between gap-2 p-2";

     cardInfo.append(type, releaseYear);

    const cardInfoFavor = document.createElement("div");
    cardInfoFavor.className = "flex items-center justify-center gap-2 p-2 ";

    cardInfoFavor.append(favorite, addfavor);

    card.append(image, title, cardInfo, cardInfoFavor);

    container.append(card);

    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;

      openMoviePopup(film);
     });

    favorite.addEventListener("click", (event) => {
    event.stopPropagation();
    addFavorite(film);
    });

    const savedFavorites =
  JSON.parse(localStorage.getItem("favorites")) || [];

  for (const id of savedFavorites) {
  const film = data.find(film => String(film.id) === id);

  if (film) {
    addFavorite(film);
  }
}

  });

 refreshPagination();
}

 displayFilms(data);

  searshBar.addEventListener("input", () => {
    const search = searshBar.value.trim().toLowerCase();

    const results = data.filter(film => {
      return film.title.toLowerCase().includes(search);
    });

    displayFilms(results);
  });

    series.addEventListener("click", () => {
    const results = data.filter(film => {
      return film.type === "series";
    });

    displayFilms(results);
  });

  Movies.addEventListener("click", () => {
  const results = data.filter(film => {
  return film.type === "movie";
  });

    displayFilms(results);
  });

  Home.addEventListener("click", () => {
  displayFilms(data);
  });

  const links = [Home, series, Movies];

for (const link of links) {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    for (const item of links) {
      item.classList.remove("active");
    }

    link.classList.add("active");
  });
}

});
