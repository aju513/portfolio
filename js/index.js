document.addEventListener("DOMContentLoaded", function () {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const animatedCircle = document.getElementById("animatedCircle");
  const progressLine = document.getElementById("progressLine");
  const timelineWrapper = document.querySelector(".timeline-wrapper");

  let ticking = false;
  let activeItems = new Set();

  // Smooth scroll handler with throttling
  function updateTimeline() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const timelineRect = timelineWrapper.getBoundingClientRect();
    const timelineTop = scrollY + timelineRect.top;
    const timelineHeight = timelineRect.height;

    // Calculate progress (0 to 1)
    const viewportCenter = scrollY + windowHeight / 2;
    const relativeProgress = (viewportCenter - timelineTop) / timelineHeight;
    const progress = Math.max(0, Math.min(1, relativeProgress));

    // Update circle position smoothly
    const circlePosition = progress * timelineHeight;
    animatedCircle.style.top = `${circlePosition}px`;

    // Update progress line
    progressLine.style.height = `${progress * 100}%`;

    // Handle timeline items activation
    timelineItems.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const isInView =
        itemCenter <= windowHeight * 0.7 && itemCenter >= windowHeight * 0.3;

      const dot = item.querySelector(".timeline-dot");
      const date = item.querySelector(".timeline-date");

      if (isInView && !activeItems.has(index)) {
        // Item entering view
        activeItems.add(index);
        item.classList.add("visible");
        dot.classList.add("active");
        date.classList.add("active");

        // Add ripple effect
        createRipple(dot);
      } else if (
        !isInView &&
        activeItems.has(index) &&
        itemCenter > windowHeight
      ) {
        // Item leaving view (scrolled past)
        activeItems.delete(index);
        dot.classList.remove("active");
        date.classList.remove("active");
      }
    });

    ticking = false;
  }

  // Throttled scroll handler
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(updateTimeline);
      ticking = true;
    }
  }

  // Create ripple effect
  function createRipple(dot) {
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const dotRect = dot.getBoundingClientRect();
    const timelineRect = timelineWrapper.getBoundingClientRect();

    ripple.style.width = "20px";
    ripple.style.height = "20px";
    ripple.style.left = `${
      dotRect.left - timelineRect.left + dotRect.width / 2 - 10
    }px`;
    ripple.style.top = `${
      dotRect.top - timelineRect.top + dotRect.height / 2 - 10
    }px`;
    ripple.style.position = "absolute";

    timelineWrapper.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 1000);
  }

  // Enhanced intersection observer for better performance
  const observerOptions = {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    rootMargin: "-10% 0px -10% 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all timeline items
  timelineItems.forEach((item) => {
    observer.observe(item);
  });

  // Add scroll listener
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Initial call
  updateTimeline();
});

// Mobile carousel functionality
const carousel = document.getElementById("mobile-carousel");
const slides = document.querySelectorAll("#mobile-carousel > div");
let currentSlide = 0;
const totalSlides = slides.length;

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

function updateDots() {
  const dots = document.querySelectorAll('[onclick^="goToSlide"]');
  dots.forEach((dot, index) => {
    dot.classList.toggle("bg-blue-600", index === currentSlide);
    dot.classList.toggle("bg-blue-300", index !== currentSlide);
  });
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 5,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});
//image modal functionality
function openModal(src, alt) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const caption = document.getElementById("modalCaption");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modalImg.src = src;
  caption.textContent = alt;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside the image
document.getElementById("imageModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Close modal with ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
