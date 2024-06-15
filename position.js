document.addEventListener("DOMContentLoaded", function () {
  const draggable = document.getElementById("draggable");
  const progress = document.getElementById("progress");
  const container = document.getElementById("gridContainer");

  function updateGridColumns(percentage) {
    let columns;
    if (percentage < 0) {
      columns = 12;
    } else if (percentage < 16) {
      columns = 11;
    } else if (percentage < 32) {
      columns = 10;
    } else if (percentage < 48) {
      columns = 9;
    } else if (percentage < 64) {
      columns = 8;
    } else if (percentage < 80) {
      columns = 7;
    } else if (percentage < 96) {
      columns = 6;
    } else {
      columns = 5;
    }
    container.className = `grid grid-cols-${columns} p-4 transition-all duration-300 dive-height`;
    localStorage.setItem("gridPercentage", percentage); // Save percentage to local storage
  }

  draggable.addEventListener("mousedown", function (event) {
    event.preventDefault();
    const slider = draggable.parentElement;
    const sliderRect = slider.getBoundingClientRect();
    const onMouseMove = (e) => {
      let y = e.clientY - sliderRect.top;
      y = Math.max(0, Math.min(y, sliderRect.height));
      draggable.style.top = y + "px";
      const percentage = (y / sliderRect.height) * 100;
      progress.style.height = percentage + "%";
      updateGridColumns(percentage);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  });

  // Function to set draggable position and progress based on percentage
  function setDraggablePosition(percentage) {
    const slider = draggable.parentElement;
    const sliderRect = slider.getBoundingClientRect();
    const y = (percentage / 100) * sliderRect.height;
    draggable.style.top = y + "px";
    progress.style.height = percentage + "%";
  }

  // Retrieve percentage from local storage and update grid and draggable position
  const savedPercentage = localStorage.getItem("gridPercentage");
  if (savedPercentage !== null) {
    const percentage = parseFloat(savedPercentage);
    setDraggablePosition(percentage);
    updateGridColumns(percentage);
  }
});
function toggleView() {
  const gridContainer = document.getElementById("gridContainer");
  const tableContainer = document.getElementById("tableContainer");
  const zoom = document.getElementById("zoom");

  if (gridContainer.classList.contains("hidden")) {
    gridContainer.classList.remove("hidden");
    tableContainer.classList.add("hidden");
    zoom.classList.remove("hidden");
  } else {
    gridContainer.classList.add("hidden");
    tableContainer.classList.remove("hidden");
    zoom.classList.add("hidden");
  }
}

// Attach the toggle function to the "View" button
document.querySelector(".view-button").addEventListener("click", toggleView);

function toggleDropdown(id) {
  const element = document.getElementById(id);
  element.classList.toggle("hidden");
}

function generateRandomPassword() {
  const passwordField = document.getElementById("password");
  passwordField.value = Math.random().toString(36).slice(-8);
}

function togglePopup(popupId, event) {
  var popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.toggle("hidden");
  } else {
    console.error("Popup with id " + popupId + " not found.");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  // Toggle view functionality
  function toggleView(view) {
    var detailContent = document.getElementById("detailContent");
    var previewContent = document.getElementById("previewContent");
    var panel = document.getElementById("panel");
    var gridContainer = document.getElementById("gridContainer");

    panel.classList.toggle("hidden");

    if (!panel.classList.contains("hidden")) {
      gridContainer.style.marginRight = panel.offsetWidth + "px";
    } else {
      gridContainer.style.marginRight = "0";
    }

    if (view === "detail") {
      detailContent.classList.remove("hidden");
      previewContent.classList.add("hidden");
    } else if (view === "preview") {
      detailContent.classList.add("hidden");
      previewContent.classList.remove("hidden");
    }
  }

  // Resize sidebar functionality
  const resizer = document.querySelector(".resizer");
  const sidebar = document.querySelector(".resizable-sidebar");

  resizer.addEventListener("mousedown", initResize);

  function initResize(e) {
    window.addEventListener("mousemove", startResizing);
    window.addEventListener("mouseup", stopResizing);
  }

  function startResizing(e) {
    let newWidth = window.innerWidth - e.clientX;
    sidebar.style.width = `${newWidth}px`;
    let panel = document.getElementById("panel");

    // Update the grid container's margin based on panel visibility
    if (!panel.classList.contains("hidden")) {
      document.getElementById(
        "gridContainer"
      ).style.marginRight = `${newWidth}px`;
    } else {
      document.getElementById("gridContainer").style.marginRight = "0";
    }
  }

  function stopResizing() {
    window.removeEventListener("mousemove", startResizing);
    window.removeEventListener("mouseup", stopResizing);
  }

  // Expose toggleView to global scope so it can be called from HTML
  window.toggleView = toggleView;
});
