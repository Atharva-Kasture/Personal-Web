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
  const aboutBox = $("#about");
  const aboutSpan = $("#about span");
  const aboutHint = $("#about .hover-hint");
  const aboutImages = $("#about img"); // All project images preloaded inside About box
  const aboutTitle = $("<h5 id='about-project-title'></h5>")
    .css({
      display: "none",
      textAlign: "center",
      color: "rgb(201,162,46)",
      marginBottom: "10px",
    })
    .appendTo(aboutBox);

  const projectSections = $("#projects .content-section");
  let currentProject = 0;

  // Add arrows for project box
  const projects = $("#projects");
  addArrows(projects);

  // Helper to show specific project + image
  function showProject(index) {
    projectSections.removeClass("active").eq(index).addClass("active");
    aboutImages.hide().eq(index).fadeIn(300); // show matching image
    const title = projectSections.eq(index).find("h5").text();
    aboutTitle.text(title).fadeIn(200);
  }

  // When hovering over Projects box
  projects.on("mouseenter", function () {
    currentProject = 0;
    aboutBox.addClass("expanded");
    aboutSpan.hide();
    aboutHint.hide();
    showProject(currentProject);
  });

  // Click arrows for Projects
  projects.find(".arrow.left").on("click", function (e) {
    e.stopPropagation();
    currentProject = (currentProject - 1 + projectSections.length) % projectSections.length;
    showProject(currentProject);
  });

  projects.find(".arrow.right").on("click", function (e) {
    e.stopPropagation();
    currentProject = (currentProject + 1) % projectSections.length;
    showProject(currentProject);
  });

  // When leaving Projects box
  projects.on("mouseleave", function () {
    projectSections.removeClass("active");
    aboutImages.hide();
    aboutTitle.hide();

    // Reset About box only if not hovered directly
    if (!aboutBox.is(":hover")) {
      aboutBox.removeClass("expanded");
      aboutSpan.show();
      aboutHint.show();
    }
  });

  // When hovering directly on About box (reset to default)
  aboutBox.on("mouseenter", function () {
    aboutImages.hide();
    aboutTitle.hide();
    aboutSpan.show();
    aboutHint.show();
  }).on("mouseleave", function () {
    $(this).removeClass("expanded");
  });
});
