let data = [];
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("bookmarkedData");
  if (saved) {
    data = JSON.parse(saved);
  }
  const bookmarked = data.filter(item => item.isBookmarked);
  renderBookmarks(bookmarked);
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = bookmarked.filter(item =>
      item.title.toLowerCase().includes(query)
    );
    renderBookmarks(filtered);
  });
});
function renderBookmarks(items) {
  const movieContainer = document.getElementById("bookmarkedMovies");
  const seriesContainer = document.getElementById("bookmarkedSeries");
  movieContainer.innerHTML = "";
  seriesContainer.innerHTML = "";
  items.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";
    col.innerHTML = `
      <div class="card bg-secondary text-white h-100">
        <img src="${item.thumbnail}" class="card-img-top" alt="${item.title}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <p class="card-text small">${item.year} • ${item.category} • ${item.rating}</p>
            <h5 class="card-title">${item.title}</h5>
          </div>
          <button class="btn btn-outline-light btn-sm mt-2 bookmark-btn">
            <i class="bi bi-bookmark-fill"></i>
          </button>
        </div>
      </div>
    `;
    col.querySelector(".bookmark-btn").addEventListener("click", () => {
      item.isBookmarked = false;
      saveBookmarks();
      renderBookmarks(data.filter(i => i.isBookmarked));
    });
    if (item.category === "Movie") {
      movieContainer.appendChild(col);
    } else if (item.category === "TV Series") {
      seriesContainer.appendChild(col);
    }
  });
}
function saveBookmarks() {
  localStorage.setItem("bookmarkedData", JSON.stringify(data));
}