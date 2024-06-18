document.addEventListener("DOMContentLoaded", function () {
  const draggable = document.getElementById("draggable");
  const progress = document.getElementById("progress");
  const container = document.getElementById("gridContainer");
  const tableContainer = document.getElementById("tableContainer");
  const zoom = document.getElementById("zoom");
  const detailContent = document.getElementById("detailContent");
  const previewContent = document.getElementById("previewContent");
  const panel = document.getElementById("panel");
  const gridContainer = document.getElementById("gridContainer");
  const resizer = document.querySelector(".resizer");
  const sidebar = document.querySelector(".resizable-sidebar");

  const updateGridColumns = (percentage) => {
    const columns = Math.max(5, 12 - Math.floor(percentage / 16));
    container.className = `grid grid-cols-${columns} p-4 transition-all duration-300 dive-height`;
    localStorage.setItem("gridPercentage", percentage); // Save percentage to local storage
  };

  const setDraggablePosition = (percentage) => {
    const y = (percentage / 100) * 150;
    progress.style.height = percentage + "%";
    draggable.style.top = y + "px";
  };

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

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
  });

  // Initial setup on page load
  window.addEventListener("load", () => {
    const savedPercentage = localStorage.getItem("gridPercentage");
    if (savedPercentage !== null) {
      const percentage = parseFloat(savedPercentage);
      setDraggablePosition(percentage);
      updateGridColumns(percentage); // Ensure grid columns are updated initially
    }
  });

  const toggleView = () => {
    gridContainer.classList.toggle("hidden");
    tableContainer.classList.toggle("hidden");
    zoom.classList.toggle("hidden");
  };

  const togglePopup = (popupId) => {
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.classList.toggle("hidden");
    } else {
      console.error("Popup with id " + popupId + " not found.");
    }
  };

  const togglePanel = (view) => {
    const isPanelHidden = panel.classList.contains("hidden");

    if (view === "detail") {
      if (isPanelHidden || detailContent.classList.contains("hidden")) {
        panel.classList.remove("hidden");
        detailContent.classList.remove("hidden");
        previewContent.classList.add("hidden");
        gridContainer.style.marginRight =
          tableContainer.style.marginRight = `${panel.offsetWidth}px`;
      } else {
        panel.classList.add("hidden");
        gridContainer.style.marginRight = tableContainer.style.marginRight =
          "0";
      }
    } else if (view === "preview") {
      if (isPanelHidden || previewContent.classList.contains("hidden")) {
        panel.classList.remove("hidden");
        previewContent.classList.remove("hidden");
        detailContent.classList.add("hidden");
        gridContainer.style.marginRight =
          tableContainer.style.marginRight = `${panel.offsetWidth}px`;
      } else {
        panel.classList.add("hidden");
        gridContainer.style.marginRight = tableContainer.style.marginRight =
          "0";
      }
    }
  };

  const initResize = (e) => {
    window.addEventListener("mousemove", startResizing);
    window.addEventListener("mouseup", stopResizing);
  };

  const startResizing = (e) => {
    const minWidth = 288; // Set your minimum width here
    const maxWidth = 600; // Set your maximum width here
    let newWidth = window.innerWidth - e.clientX;

    // Ensure the new width is within the specified range
    if (newWidth < minWidth) {
      newWidth = minWidth;
    } else if (newWidth > maxWidth) {
      newWidth = maxWidth;
    }

    sidebar.style.width = `${newWidth}px`;

    const margin = !panel.classList.contains("hidden") ? `${newWidth}px` : "0";
    document.getElementById("gridContainer").style.marginRight = margin;
    document.getElementById("tableContainer").style.marginRight = margin;
  };

  const stopResizing = () => {
    window.removeEventListener("mousemove", startResizing);
    window.removeEventListener("mouseup", stopResizing);
  };

  resizer.addEventListener("mousedown", initResize);

  // const ContextMenu = document.getElementById("context-menu");
  // const group = document.querySelector(".group");

  // // Function to position a menu and make it visible
  // function positionAndShowMenu(menu, event, container) {
  //   const menuWidth = menu.offsetWidth;
  //   const menuHeight = menu.offsetHeight;
  //   const containerRect = container.getBoundingClientRect();
  //   let top = event.clientY;
  //   let left = event.clientX;

  //   if (event.clientY + menuHeight > containerRect.bottom) {
  //     top = containerRect.bottom - menuHeight;
  //   }
  //   if (event.clientX + menuWidth > containerRect.right) {
  //     left = containerRect.right - menuWidth;
  //   }

  //   if (top < containerRect.top) {
  //     top = containerRect.top;
  //   }
  //   if (left < containerRect.left) {
  //     left = containerRect.left;
  //   }

  //   menu.style.top = `${top}px`;
  //   menu.style.left = `${left}px`;
  //   menu.classList.remove("hidden");
  // }

  // // Right-click on Dashboard to show Dashboard Context Menu
  // group.addEventListener("contextmenu", (event) => {
  //   const target = event.target;
  //   if (!target.classList.contains("app") && !target.closest(".app")) {
  //     event.preventDefault();
  //     positionAndShowMenu(ContextMenu, event, group);
  //   }
  // });

  // // Click anywhere to hide menus
  // document.addEventListener("click", () => {
  //   ContextMenu.classList.add("hidden");
  // });

  window.togglePanel = togglePanel;
  window.togglePopup = togglePopup;
  window.toggleView = toggleView;
});
