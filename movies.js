let data = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((res) => res.json())
    .then((json) => {
      data = json.filter((item) => item.category === "Movie");
      renderMovies(data);
    });
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = data.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
    renderMovies(filtered);
  });
});
function renderMovies(movies) {
  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";

  movies.forEach((movie) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card bg-secondary text-white h-100">
        <img src="${movie.thumbnail}" class="card-img-top" alt="${movie.title}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <p class="card-text small">${movie.year} • ${movie.category} • ${
      movie.rating
    }</p>
            <h5 class="card-title">${movie.title}</h5>
          </div>
          <button class="btn btn-outline-light btn-sm mt-2 bookmark-btn">
            <i class="bi ${
              movie.isBookmarked ? "bi-bookmark-fill" : "bi-bookmark"
            }"></i>
          </button>
        </div>
      </div>
    `;
    col.querySelector(".bookmark-btn").addEventListener("click", () => {
      movie.isBookmarked = !movie.isBookmarked;
      saveBookmarks();
      renderMovies(data);
    });
    container.appendChild(col);
  });
}
function saveBookmarks() {
  const saved = localStorage.getItem("bookmarkedData");
  let allData = [];
  if (saved) {
    allData = JSON.parse(saved);
    allData = allData.map((item) => {
      const updated = data.find((d) => d.title === item.title);
      return updated || item;
    });
    data.forEach((item) => {
      if (!allData.find((d) => d.title === item.title)) {
        allData.push(item);
      }
    });
  } else {
    allData = [...data];
  }
  localStorage.setItem("bookmarkedData", JSON.stringify(allData));
}