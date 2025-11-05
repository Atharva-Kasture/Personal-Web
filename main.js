$(document).ready(function () {
  /* =========================================
     BOX EXPANSION ON HOVER
  ========================================= */
  $(".rounded").on("mouseenter", function () {
    $(this).addClass("expanded");
  }).on("mouseleave", function () {
    $(this).removeClass("expanded");
  });

  /* =========================================
     ADD NAVIGATION ARROWS (IF NOT PRESENT)
  ========================================= */
  function addArrows(container) {
    if (!container.find(".nav-arrows").length) {
      container.append(`
        <div class="nav-arrows">
          <span class="arrow left">&#9664;</span>
          <span class="arrow right">&#9654;</span>
        </div>
      `);
    }
  }

  /* =========================================
     GENERIC MANUAL NAVIGATION (SKILLS, CERTS, CONTACT)
  ========================================= */
  function setupManualNavigation(containerId) {
    const container = $(containerId);
    const sections = container.find(".content-section");
    let current = 0;

    addArrows(container);

    function showSection(index) {
      sections.removeClass("active").eq(index).addClass("active");
    }

    // Show first section on hover
    container.on("mouseenter", function () {
      showSection(current);
    });

    // Left arrow
    container.find(".arrow.left").on("click", function (e) {
      e.stopPropagation();
      current = (current - 1 + sections.length) % sections.length;
      showSection(current);
    });

    // Right arrow
    container.find(".arrow.right").on("click", function (e) {
      e.stopPropagation();
      current = (current + 1) % sections.length;
      showSection(current);
    });
  }

  setupManualNavigation("#skills");
  setupManualNavigation("#contact");
  setupManualNavigation("#certifications");

  /* =========================================
     PROJECT ↔ ABOUT BOX SYNC BEHAVIOR
  ========================================= */
/* =========================================
   PROJECT ↔ ABOUT BOX SYNC BEHAVIOR
========================================= */
const aboutBox = $("#about");
const aboutSpan = $("#about span");
const aboutHint = $("#about .hover-hint");
const aboutTitle = $("<h5 id='about-project-title'></h5>")
  .css({
    display: "none",
    textAlign: "center",
    color: "rgb(201,162,46)",
    marginBottom: "10px",
  })
  .appendTo(aboutBox);

// Only select project images (not profile image)
const aboutImages = $("#about-images .about-image");
const projectSections = $("#projects .content-section");
let currentProject = 0;

// Add arrows to Projects box
const projects = $("#projects");
addArrows(projects);

// Helper to show specific project + matching image
function showProject(index) {
  projectSections.removeClass("active").eq(index).addClass("active");
  aboutImages.removeClass("active").eq(index).addClass("active");
  const title = projectSections.eq(index).find("h5").text();
  aboutTitle.text(title).fadeIn(200);
}

// Hovering over Projects box
projects.on("mouseenter", function () {
  currentProject = 0;
  aboutBox.addClass("expanded");
  aboutSpan.hide();
  aboutHint.hide();

  // Hide About Me content
  $("#about-me").hide();

  showProject(currentProject);
});

// Left arrow click
projects.find(".arrow.left").on("click", function (e) {
  e.stopPropagation();
  currentProject = (currentProject - 1 + projectSections.length) % projectSections.length;
  showProject(currentProject);
});

// Right arrow click
projects.find(".arrow.right").on("click", function (e) {
  e.stopPropagation();
  currentProject = (currentProject + 1) % projectSections.length;
  showProject(currentProject);
});

// Leaving Projects box
projects.on("mouseleave", function () {
  projectSections.removeClass("active");
  aboutImages.removeClass("active");
  aboutTitle.hide();

  // Reset About box only if not hovered directly
  if (!aboutBox.is(":hover")) {
    aboutBox.removeClass("expanded");
    aboutSpan.show();
    aboutHint.show();

    // Hide About Me to restore default Welcome text
    $("#about-me").hide();
  }
});


// Hovering directly on About box (shows About Me)
aboutBox.on("mouseenter", function () {
  aboutImages.removeClass("active");
  aboutTitle.hide();
  aboutSpan.show();
  aboutHint.show();
  $("#about-me").show(); // Ensure About Me content visible
}).on("mouseleave", function () {
  $(this).removeClass("expanded");
});

});
