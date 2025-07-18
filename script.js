let data = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then(res => res.json())
    .then(json => {
      const saved = localStorage.getItem("bookmarkedData");
      data = saved ? JSON.parse(saved) : json;

      renderPage(data); // full data

      // Search functionality
      const searchInput = document.getElementById("searchInput");
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = data.filter(item =>
          item.title.toLowerCase().includes(query)
        );
        renderPage(filtered); // filtered data
      });
    });
});

function renderPage(filteredData) {
  renderSection(filteredData, item => item.isTrending, "trendingContainer");
  renderSection(filteredData, item => !item.isTrending, "recommendedContainer");
}

function renderSection(allItems, filterFn, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const sectionItems = allItems.filter(filterFn);
  sectionItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4 col-lg-3";
    card.innerHTML = createCardHTML(item);
    container.appendChild(card);

    // Bookmark functionality
    const btn = card.querySelector(".bookmark-btn");
    btn.addEventListener("click", () => {
      const index = data.findIndex(d => d.title === item.title);
      if (index !== -1) {
        data[index].isBookmarked = !data[index].isBookmarked;
        localStorage.setItem("bookmarkedData", JSON.stringify(data));
        renderPage(data); // re-render full data so icons update
      }
    });
  });
}

function createCardHTML(item) {
  const iconClass = item.isBookmarked ? "bi-bookmark-fill" : "bi-bookmark";
  return `
    <div class="card bg-secondary text-white h-100">
      <img src="${item.thumbnail}" class="card-img-top" alt="${item.title}">
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <p class="card-text small">${item.year} • ${item.category} • ${item.rating}</p>
          <h5 class="card-title">${item.title}</h5>
        </div>
        <button class="btn btn-outline-light btn-sm mt-2 bookmark-btn">
          <i class="bi ${iconClass}"></i>
        </button>
      </div>
    </div>
  `;
}
