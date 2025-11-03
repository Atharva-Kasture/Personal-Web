// Wait until the document is ready
$(document).ready(function () {
  // --------------------
  // Card Hover Expansion
  // --------------------
  $(".rounded").on("mouseenter", function () {
    $(this).addClass("expanded");
  });

  $(".rounded").on("mouseleave", function () {
    $(this).removeClass("expanded");
  });

  // -----------------------------------------
  // Auto-cycle function for any content group
  // -----------------------------------------
  function setupAutoCycle(containerId) {
    const container = $(containerId);
    const sections = container.find(".content-section");
    let current = 0;
    let intervalId = null;

    // Function to show one section and hide others
    function showSection(index) {
      sections.removeClass("active").eq(index).addClass("active");
    }

    // Start cycling on hover
    container.on("mouseenter", function () {
      showSection(current);
      intervalId = setInterval(() => {
        current = (current + 1) % sections.length;
        showSection(current);
      }, 3000);
    });

    // Stop cycling when mouse leaves
    container.on("mouseleave", function () {
      clearInterval(intervalId);
      current = 0;
      sections.removeClass("active");
    });
  }

  // Apply the auto-cycle to both Skills and Contact sections
  setupAutoCycle("#skills");
  setupAutoCycle("#contact");
  setupAutoCycle("#certifications");
  setupAutoCycle("#projects");
});
