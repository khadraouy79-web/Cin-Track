export async function fetchFilms() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json"
    );

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    const container = document.getElementById("cardsContainer");

    container.textContent =
      "Impossible de charger les films. Veuillez réessayer.";

    container.classList.add("text-red-500", "text-center");

    console.error(error);
    return null;
  }
}
