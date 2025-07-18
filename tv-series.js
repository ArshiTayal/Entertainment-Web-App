let data = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((res) => res.json())
    .then((json) => {
      data = json.filter((item) => item.category === "TV Series");
      renderTV(data);
    });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = data.filter((tv) =>
      tv.title.toLowerCase().includes(query)
    );
    renderTV(filtered);
  });
});
function renderTV(shows) {
  const container = document.getElementById("tvSeriesContainer");
  container.innerHTML = "";
  shows.forEach((show) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";
    col.innerHTML = `
      <div class="card bg-secondary text-white h-100">
        <img src="${show.thumbnail}" class="card-img-top" alt="${show.title}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <p class="card-text small">${show.year} • ${show.category} • ${
      show.rating
    }</p>
            <h5 class="card-title">${show.title}</h5>
          </div>
          <button class="btn btn-outline-light btn-sm mt-2 bookmark-btn">
            <i class="bi ${
              show.isBookmarked ? "bi-bookmark-fill" : "bi-bookmark"
            }"></i>
          </button>
        </div>
      </div>
    `;

    col.querySelector(".bookmark-btn").addEventListener("click", () => {
      show.isBookmarked = !show.isBookmarked;
      saveBookmarks();
      renderTV(data);
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