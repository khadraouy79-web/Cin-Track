
fetch("https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    return response.json();
  })
  .then(data => {
  const container = document.querySelector("#cardsContainer");
  const searshBar = document.getElementById("searshBar");

  function displayFilms(films) {
    container.innerHTML="";

    films.forEach(film => {

    const card = document.createElement("article");
    card.className = "card bg-black/70 text-white rounded-xl overflow-hidden hover:bg-gray-700 overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer";

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

    const favorite = document.createElement("button")
    favorite.textContent ="Add to Favorite";
    favorite.className = "bg-red-600 p-2 text-xl font-bold rounded-xl  hover:bg-red-800";

    const cardInfo = document.createElement("div");
    cardInfo.className = "flex items-center justify-between gap-2 p-2";

     cardInfo.append(type, releaseYear);

    const cardInfoFavor = document.createElement("div");
    cardInfoFavor.className = "flex items-center justify-center gap-2 p-2 ";

    cardInfoFavor.append(favorite);

    card.append(image, title, cardInfo, cardInfoFavor);
    
    container.append(card);

    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;

      openMoviePopup(film);
    });
  });
}

 displayFilms(data);

const paginationScript = document.createElement("script");
paginationScript.src = "./cabin.js";
document.body.append(paginationScript);

  searshBar.addEventListener("input", () => {
    const search = searshBar.value.trim().toLowerCase();

    const results = data.filter(film => {
      return film.title.toLowerCase().includes(search);
    });

    displayFilms(results);
  });
})



const moviePopup = document.getElementById("moviePopup");
const closePopup = document.getElementById("closePopup");
const popupImage = document.getElementById("popupImage");
const popupTitele = document.getElementById("popupTitle");
const popupInfo = document.getElementById("popupInfo");

function openMoviePopup(film) {
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




// const ul = document.querySelector('.pagination ul');

// const handlePagination = () => {

//   let pageNumbers = generatePageNumber(12, 5);

//   ul.innerHTML = "";
//   let li = "";
//   li += `<li class="page"><span class="icon">&lt;</span></li>` ;
//   for(let pageNumber of pageNumbers) {
//     li += `<li class="page ${5 == pageNumber ? 'active': ""}">${pageNumber}</li>`;
//   }
//   li += `<li class="page"><span class="icon">&lt;</span></li>` ;

//   ul.innerHTML = li;
// };
// handlePagination
// const generatePageNumber = (totalPages,currentPage)=> {
// let pagination = [],
//     pageNo = 1;

// while (pageNo <= totalPages) {
//   let isFirstPage = pageNo <= 1,
//       isLastPage = pageNo == totalPages,
//       isMiddlePage = pageNo >= currentPage - 1 && pageNo <= currentPage + 1
//   if(isFirstPage || isLastPage || isMiddlePage) {
//     pagination.push(pageNo);
//      pageNo++
//   }else{
//     pagination.push("...");
//     pageNo = pageNo < currentPage ? currentPage-1
//   }
 
// } 
// return pagination;
// }
// generatePageNumber(12, 5);




// const limit = 6;
// function paginate(number_page) {
//     const list = document.getElementById("pagination")
//     list.innerHTML = "";
//     const start = (number_page - 1) * limit,
//     end = number_page * limit,
//     paginate_item = items.slice(start, end).map(
//         (elem) => {
//             return "<li>${elem}<li>";
//         });
    
//    list.insertAdjacentHTML("beforeend", paginate_item.join("")); 
    
// }
// paginate(1);

// const buttons = [...Array(Math.ceil(items.length/limit)).keys()].map(
//   (elem) => {
//     return `<li onclick ='paginate(${elem + 1})'>$
//     {elem + 1}</li>`;
//   }
// );
// document
// .getElementById("cardsContainer")
// .insertAdjacentHTML("beforeend", buttons.join(""));