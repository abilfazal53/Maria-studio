// === BLOG MANAGEMENT ===
function saveBlog() {
  const title = document.getElementById("blogTitle").value.trim();
  const preview = document.getElementById("blogPreview").value.trim();
  const content = document.getElementById("blogContent").value.trim();

  if (!title || !preview || !content) {
    alert("Please fill all blog fields.");
    return;
  }

  const newBlog = { title, preview, content };
  const savedBlogs = JSON.parse(localStorage.getItem("mariaBlogs")) || [];

  savedBlogs.unshift(newBlog);
  localStorage.setItem("mariaBlogs", JSON.stringify(savedBlogs));

  document.getElementById("blogTitle").value = "";
  document.getElementById("blogPreview").value = "";
  document.getElementById("blogContent").value = "";

  loadBlogs();
}

function loadBlogs() {
  const blogList = document.getElementById("blogList");
  const blogs = JSON.parse(localStorage.getItem("mariaBlogs")) || [];

  blogList.innerHTML = "";

  blogs.forEach((blog, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${blog.title}</span>
      <button onclick="deleteBlog(${index})">Delete</button>
    `;
    blogList.appendChild(li);
  });
}

function deleteBlog(index) {
  const blogs = JSON.parse(localStorage.getItem("mariaBlogs")) || [];
  blogs.splice(index, 1);
  localStorage.setItem("mariaBlogs", JSON.stringify(blogs));
  loadBlogs();
}

function clearBlogs() {
  if (confirm("Clear all blogs? This cannot be undone.")) {
    localStorage.removeItem("mariaBlogs");
    loadBlogs();
  }
}

// === ARTWORK MANAGEMENT ===
function saveArt() {
  const fileInput = document.getElementById("artFile");
  const section = document.getElementById("artSection").value;
  const file = fileInput.files[0];

  if (!file || !section) {
    alert("Please select an image and a section.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const base64Image = event.target.result;

    // Optional: Resize image to avoid huge base64 strings
    resizeImage(base64Image, 600, function (resizedImage) {
      const newArt = { img: resizedImage, section };
      const savedArt = JSON.parse(localStorage.getItem("mariaArtGallery")) || [];

      savedArt.unshift(newArt);
      localStorage.setItem("mariaArtGallery", JSON.stringify(savedArt));

      fileInput.value = "";
      document.getElementById("previewContainer").innerHTML = "";
      loadArt();
    });
  };

  reader.readAsDataURL(file);
}

function loadArt() {
  const artList = document.getElementById("artList");
  const artItems = JSON.parse(localStorage.getItem("mariaArtGallery")) || [];

  artList.innerHTML = "";

  artItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.section.toUpperCase()}</span>
      <button onclick="deleteArt(${index})">Delete</button>
    `;
    artList.appendChild(li);
  });
}

function deleteArt(index) {
  const artItems = JSON.parse(localStorage.getItem("mariaArtGallery")) || [];
  artItems.splice(index, 1);
  localStorage.setItem("mariaArtGallery", JSON.stringify(artItems));
  loadArt();
}

function clearArt() {
  if (confirm("Clear all artwork? This cannot be undone.")) {
    localStorage.removeItem("mariaArtGallery");
    loadArt();
  }
}

// === Resize Image Before Saving ===
function resizeImage(base64, maxSize, callback) {
  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement("canvas");
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    callback(canvas.toDataURL("image/jpeg", 0.8));
  };
  img.src = base64;
}

// === Image Preview on File Select ===
document.getElementById("artFile").addEventListener("change", function () {
  const file = this.files[0];
  const preview = document.getElementById("previewContainer");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.innerHTML = `<img src="${e.target.result}" style="max-width: 150px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"/>`;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = "";
  }
});

// === INITIAL LOAD ===
window.addEventListener("DOMContentLoaded", () => {
  loadBlogs();
  loadArt();

  // Optional: add clear all button for blogs
  const blogSection = document.querySelectorAll(".form-section")[2];
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear All Blogs";
  clearBtn.style.cssText = "margin-top: 1rem; background: #d95372; color: white;";
  clearBtn.onclick = clearBlogs;
  blogSection.appendChild(clearBtn);
});
