const moviePopup = document.getElementById("moviePopup");
const closePopup = document.getElementById("closePopup");
const popupImage = document.getElementById("popupImage");
const popupTitele = document.getElementById("popupTitle");
const popupInfo = document.getElementById("popupInfo");

export function openMoviePopup(film) {
  popupImage.src = film.image;
  popupImage.alt = film.title;
  popupTitele.textContent = film.title;
  popupInfo.innerHTML = "";

   Object.entries(film).forEach(([key, value]) => {
    if (["id", "image", "title"].includes(key)) return;

    const line = document.createElement("p");
    const label = document.createElement("strong");

    label.textContent = `${key} : `;

    const text = Array.isArray(value)
      ? value.join(", ")
      : value !== null && typeof value === "object"
        ? JSON.stringify(value)
        : String(value ?? "Non renseigné");

    line.append(label, document.createTextNode(text));
    popupInfo.append(line);
  });

  moviePopup.classList.remove("hidden");
}

function hideMoviePopup() {
  moviePopup.classList.add("hidden");
}

closePopup.addEventListener("click", hideMoviePopup);

moviePopup.addEventListener("click", (event) => {
  if (event.target === moviePopup) {
    hideMoviePopup();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideMoviePopup();
  }
});
