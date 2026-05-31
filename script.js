/* =========================
   NAVBAR TOGGLE
========================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* =========================
   MODE BUTTON TEXT
========================= */

const mode = document.body.dataset.mode;

const mainBtn = document.querySelector(".main-btn");
const extraBtn = document.querySelector(".extra-btn");

if (mode === "takeaway" && mainBtn && extraBtn) {
  mainBtn.innerText = "Order";
  extraBtn.innerText = "Menu";
}

if (mode === "barber" && mainBtn && extraBtn) {
  mainBtn.innerText = "Book";
  extraBtn.innerText = "Services";
}

if (mode === "gym" && mainBtn && extraBtn) {
  mainBtn.innerText = "Join";
  extraBtn.innerText = "Plans";
}

/* =========================
   MENU COLLAPSE SECTIONS
========================= */

const toggleButtons = document.querySelectorAll(".toggle-section");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const section = button.closest(".menu-section");
    if (!section) return;

    section.classList.toggle("collapsed");

    const text = button.querySelector(".toggle-text");

    if (text) {
      text.textContent = section.classList.contains("collapsed")
        ? "Expand"
        : "Collapse";
    }
  });
});

/* =========================
   REVIEWS TOGGLE
========================= */

document.querySelectorAll(".toggle-review").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".testimonial-card");
    if (!card) return;

    card.classList.toggle("expanded");

    button.textContent = card.classList.contains("expanded")
      ? "Read less"
      : "Read more";
  });
});

/* =========================
   CUSTOM CONTACT SECTION
========================= */

const customOrderBtn = document.getElementById("custom-order-btn");
const customContactSection = document.getElementById("custom-contact-section");

function setCustomContact(open) {
  if (!customContactSection || !customOrderBtn) return;

  if (open) {
    customContactSection.classList.add("active");
    customOrderBtn.textContent = "Hide Enquiry Form";
  } else {
    customContactSection.classList.remove("active");
    customOrderBtn.textContent = "Enquire About Custom Orders";
  }
}

if (customOrderBtn && customContactSection) {
  customOrderBtn.addEventListener("click", () => {
    const isOpen = customContactSection.classList.contains("active");
    setCustomContact(!isOpen);
  });
}

/* open from index.html link via hash */
document.addEventListener("DOMContentLoaded", () => {
  if (!customContactSection || !customOrderBtn) return;

  if (window.location.hash === "#custom-contact-section") {
    setCustomContact(true);

    setTimeout(() => {
      customContactSection.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }
});

/* =========================
   GALLERY LIGHTBOX
========================= */

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxVideo = document.getElementById("lightbox-video");
const lightboxClose = document.getElementById("lightbox-close");
const nextButton = document.getElementById("lightbox-next");
const prevButton = document.getElementById("lightbox-prev");

let currentIndex = 0;

/* =========================
   HOVER VIDEO PLAY
========================= */

galleryItems.forEach((item) => {
  const video = item.querySelector("video");

  if (video) {
    item.addEventListener("mouseenter", () => video.play());
    item.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  }
});

/* =========================
   SHOW LIGHTBOX ITEM
========================= */

function showItem(index) {
  if (!lightbox) return;

  currentIndex = index;

  const item = galleryItems[index];
  const img = item.querySelector("img");
  const video = item.querySelector("video");

  lightbox.classList.add("active");

  if (lightboxImage) {
    lightboxImage.classList.remove("active");
    lightboxImage.src = "";
  }

  if (lightboxVideo) {
    lightboxVideo.classList.remove("active");
    lightboxVideo.pause();
    lightboxVideo.src = "";
  }

  if (img && lightboxImage) {
    lightboxImage.src = img.src;
    lightboxImage.classList.add("active");
  }

  if (video && lightboxVideo) {
    lightboxVideo.src = video.src;
    lightboxVideo.classList.add("active");
    lightboxVideo.play();
  }
}

/* =========================
   OPEN LIGHTBOX
========================= */

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => showItem(index));
});

/* =========================
   NEXT / PREV
========================= */

function nextItem() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  showItem(currentIndex);
}

function prevItem() {
  currentIndex =
    (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showItem(currentIndex);
}

if (nextButton) nextButton.addEventListener("click", nextItem);
if (prevButton) prevButton.addEventListener("click", prevItem);

/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove("active");

  if (lightboxVideo) {
    lightboxVideo.pause();
    lightboxVideo.src = "";
  }
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (e) => {
  if (!lightbox || !lightbox.classList.contains("active")) return;

  if (e.key === "ArrowRight") nextItem();
  if (e.key === "ArrowLeft") prevItem();
  if (e.key === "Escape") closeLightbox();
});


// =========================
// AUTOCOMPLETE SEARCH DROPDOWN
// =========================

const searchInput = document.getElementById("menu-search");
const dropdown = document.getElementById("search-dropdown");
const items = document.querySelectorAll(".menu-item");

function getAllProducts() {
  return Array.from(items).map((item) => {
    const titleEl = item.querySelector("h3");
    const descEl = item.querySelector("p");

    return {
      element: item,
      title: titleEl ? titleEl.textContent : "",
      description: descEl ? descEl.textContent : ""
    };
  });
}

const products = getAllProducts();

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();

  dropdown.innerHTML = "";

  if (query.length === 0) {
    dropdown.style.display = "none";
    return;
  }

  const matches = products.filter((p) =>
    p.title.toLowerCase().startsWith(query)
  );

  if (matches.length === 0) {
    dropdown.style.display = "none";
    return;
  }

  matches.forEach((match) => {
    const div = document.createElement("div");
    div.classList.add("search-item");

    div.innerHTML = `
      <span>${match.title}</span>
      <small>${match.description}</small>
    `;

    div.addEventListener("click", () => {
      match.element.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      match.element.style.outline = "3px solid #e4087f";

      setTimeout(() => {
        match.element.style.outline = "none";
      }, 1500);

      dropdown.style.display = "none";
      searchInput.value = "";
    });

    dropdown.appendChild(div);
  });

  dropdown.style.display = "flex";
});