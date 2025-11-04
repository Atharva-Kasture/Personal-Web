$(document).ready(function () {
  // Card hover expansion
  $(".rounded").on("mouseenter", function () {
    $(this).addClass("expanded");
  }).on("mouseleave", function () {
    $(this).removeClass("expanded");
  });

  // Shared function for creating navigation arrows
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

  // Generic navigation setup
  function setupManualNavigation(containerId) {
    const container = $(containerId);
    const sections = container.find(".content-section");
    let current = 0;

    addArrows(container);

    function showSection(index) {
      sections.removeClass("active").eq(index).addClass("active");
    }

    container.on("mouseenter", function () {
      showSection(current);
    });

    container.find(".arrow.left").on("click", function (e) {
      e.stopPropagation();
      current = (current - 1 + sections.length) % sections.length;
      showSection(current);
    });

    container.find(".arrow.right").on("click", function (e) {
      e.stopPropagation();
      current = (current + 1) % sections.length;
      showSection(current);
    });
  }

  // Apply to each group
  setupManualNavigation("#skills");
  setupManualNavigation("#contact");
  setupManualNavigation("#certifications");

  // -----------------------------------------
  // Projects ↔ About synchronization
  // -----------------------------------------
  const aboutBox = $("#about");
  const aboutSpan = $("#about span");
  const aboutHint = $("#about .hover-hint");
  const projectSections = $("#projects .content-section");

  if (!$("#about-project-title").length)
    aboutBox.append('<h5 id="about-project-title" style="display:none;text-align:center;color:rgb(201,162,46);margin-bottom:10px;"></h5>');
  if (!$("#about-sync-image").length)
    aboutBox.append('<img id="about-sync-image" style="display:none;width:250px;border-radius:10px;box-shadow:0 0 15px rgba(201,162,46,0.4);margin:10px auto;">');

  const aboutImage = $("#about-sync-image");
  const aboutTitle = $("#about-project-title");
  let current = 0;
  let projectImages = [];
  let projectTitles = [];

  function rebuildProjectData() {
    projectTitles = projectSections.map(function () {
      return $(this).find("h5").first().text().trim();
    }).get();

    projectImages = $("#projects .content-item img").map(function () {
      const src = $(this).attr("src") || "";
      return src.includes("icons/") ? null : src;
    }).get().filter(Boolean);
  }

  function showProject(index) {
    projectSections.removeClass("active").eq(index).addClass("active");
    const imgSrc = projectImages[index];
    const title = projectTitles[index] || "";

    aboutTitle.text(title).fadeIn(200);
    imgSrc ? aboutImage.attr("src", imgSrc).fadeIn(250) : aboutImage.hide();
  }

  // Manual navigation for projects
  const projects = $("#projects");
  addArrows(projects);

  projects.on("mouseenter", function () {
    rebuildProjectData();
    current = 0;
    aboutBox.addClass("expanded");
    aboutSpan.hide();
    aboutHint.hide();
    showProject(current);
  });

  projects.find(".arrow.left").on("click", function (e) {
    e.stopPropagation();
    current = (current - 1 + projectSections.length) % projectSections.length;
    showProject(current);
  });

  projects.find(".arrow.right").on("click", function (e) {
    e.stopPropagation();
    current = (current + 1) % projectSections.length;
    showProject(current);
  });

  projects.on("mouseleave", function () {
    projectSections.removeClass("active");
    aboutImage.hide();
    aboutTitle.hide();

    if (!aboutBox.is(":hover")) {
      aboutBox.removeClass("expanded");
      aboutSpan.show();
      aboutHint.show();
    }
  });

  aboutBox.on("mouseenter", function () {
    aboutImage.hide();
    aboutTitle.hide();
    aboutSpan.show();
    aboutHint.show();
  }).on("mouseleave", function () {
    $(this).removeClass("expanded");
  });
});
