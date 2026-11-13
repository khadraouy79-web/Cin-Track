export function addFavorite(film) {
  const favorCard = document.getElementById("favoriteCard")

for (const favorite of favorCard.children) {
  if (favorite.dataset.id === String(film.id)) {
    return;
  }
}

  const card = document.createElement("article");

  card.dataset.id = film.id;

  card.className = "relative card flex bg-black/70 text-white rounded-xl overflow-hidden hover:bg-gray-700 transition-transform duration-300 cursor-pointer";

    const image = document.createElement("img");
    image.src = film.image;
    image.alt = film.title;
    image.className = "w-20 h-20 object-cover";

    const title = document.createElement("h2");
    title.textContent = film.title;
    title.className = "p-2 text-sm  text-center";

    const remove = document.createElement("button");
    remove.textContent = "X";
    remove.className = "absolute top-0 right-0 bg-gray-600 text-xl font-bold rounded-bl-xl hover:text-red-800 w-6 h-6 flex items-center justify-center" ;

    remove.addEventListener("click", function(event){
    event.stopPropagation();
    card.remove();
    saveFavorites();
    });

    card.append(image, title, remove);
    favorCard.append(card);
    saveFavorites();

}

function saveFavorites() {
  const favorCard = document.getElementById("favoriteCard");
  const favorites = [];

  for (const card of favorCard.children) {
    favorites.push(card.dataset.id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}
