// Load and display blogs from localStorage
function loadBlogs() {
  const blogs = JSON.parse(localStorage.getItem("mariaBlogs")) || [];
  const container = document.getElementById("blogContainer");
  container.innerHTML = "";

  blogs.forEach(blog => {
    const div = document.createElement("div");
    div.className = "blog-card";
    div.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.content.slice(0, 100)}...</p>
      <button onclick="openBlogModal('${blog.title}', \`${blog.content.replace(/`/g, '\\`')}\`)">Read More</button>
    `;
    container.appendChild(div);
  });
}

// Open full blog in a dreamy modal
function openBlogModal(title, content) {
  document.getElementById("modalBlogTitle").innerText = title;
  document.getElementById("modalBlogContent").innerText = content;
  document.getElementById("blogModal").classList.remove("hidden");
}

function closeBlogModal() {
  document.getElementById("blogModal").classList.add("hidden");
}

// Load artworks from localStorage
let allArtworks = [];

function loadArtCraft() {
  allArtworks = JSON.parse(localStorage.getItem("mariaArtGallery")) || [];
}

// Open Art Modal with category-specific images
function openArtCategoryModal(category) {
  const modal = document.getElementById("categoryArtModal");
  const modalTitle = document.getElementById("modalCategoryTitle");
  const modalImageContainer = document.getElementById("modalImageContainer");

  const displayName = {
    coasters: "Coasters",
    magnets: "Fridge Magnets",
    bookmarks: "Bookmarks",
    paintings: "Paintings & Sketches"
  };

  const filteredImages = allArtworks.filter(img => img.section === category);

  modalTitle.innerText = displayName[category] || "Gallery";
  modalImageContainer.innerHTML = "";

  filteredImages.forEach(art => {
    const img = document.createElement("img");
    img.src = art.img;
    img.alt = art.section;
    modalImageContainer.appendChild(img);
  });

  modal.classList.remove("hidden");
}

// Close Art Modal
function closeArtModal() {
  document.getElementById("categoryArtModal").classList.add("hidden");
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  loadBlogs();
  loadArtCraft();
});
