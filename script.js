// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initSmoothScrolling();
  initAnimations();
  initMobileMenu();
  initScrollEffects();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Intersection Observer for animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature-card, .screenshot"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });

    // Close menu on window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  }
}

// Scroll effects
function initScrollEffects() {
  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener("scroll", function () {
    let current = "";
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Ensure active link is visible
    const activeLink = document.querySelector(".nav-link.active");
    if (activeLink) {
      activeLink.style.color = "#ff0000";
      activeLink.style.fontWeight = "700";
    }
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization
const debouncedScrollHandler = debounce(function () {
  // Handle scroll events efficiently
}, 16);

window.addEventListener("scroll", debouncedScrollHandler);

// Add loading animation for images
function initImageLoading() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.classList.add("loaded");
    });

    if (img.complete) {
      img.classList.add("loaded");
    }
  });
}

// Initialize image loading
initImageLoading();

// Add CSS for mobile menu and scroll effects
const additionalStyles = `
    .navbar.scrolled {
        background: linear-gradient(135deg, rgba(26, 10, 10, 0.98) 0%, rgba(42, 26, 26, 0.95) 50%, rgba(26, 10, 10, 0.92) 100%);
        box-shadow: 0 4px 30px rgba(255, 0, 0, 0.3), 0 0 20px rgba(255, 0, 0, 0.2);
    }

    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, rgba(26, 10, 10, 0.98) 0%, rgba(42, 26, 26, 0.95) 50%, rgba(26, 10, 10, 0.92) 100%);
        flex-direction: column;
        padding: 1rem;
        border-top: 1px solid rgba(255, 0, 0, 0.3);
        box-shadow: 0 8px 32px rgba(255, 0, 0, 0.3);
    }

    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .nav-link.active {
        color: #ff0000;
        font-weight: 700;
    }

    img {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    img.loaded {
        opacity: 1;
    }

    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Add hover effects for interactive elements
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add click effects to cards
  const cards = document.querySelectorAll(".feature-card, .screenshot");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
});

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
  // Placeholder for analytics tracking
  console.log("Event tracked:", eventName, eventData);
}

// Track download button clicks
document.addEventListener("DOMContentLoaded", function () {
  const downloadButtons = document.querySelectorAll(
    ".download-btn, .btn-primary"
  );
  downloadButtons.forEach((button) => {
    button.addEventListener("click", function () {
      trackEvent("download_clicked", {
        button: this.textContent.trim(),
        section: this.closest("section")?.id || "unknown",
      });
    });
  });
});

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Escape key closes mobile menu
  if (e.key === "Escape") {
    const navMenu = document.querySelector(".nav-menu");
    const navToggle = document.querySelector(".nav-toggle");

    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  }
});

// Add focus management for accessibility
document.addEventListener("DOMContentLoaded", function () {
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid #ff0000";
      this.style.outlineOffset = "2px";
      this.style.boxShadow = "0 0 10px rgba(255, 0, 0, 0.5)";
    });

    element.addEventListener("blur", function () {
      this.style.outline = "";
      this.style.outlineOffset = "";
      this.style.boxShadow = "";
    });
  });
});

// Add error handling for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.style.display = "none";
      console.warn("Failed to load image:", this.src);
    });
  });
});

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", function () {
    setTimeout(function () {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        "Page load time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    }, 0);
  });
}
