/* global Module */

Module.register("MMM-ClickToNavigate", {
  defaults: {
    mappings: {
      // Map CSS classes to page numbers
      "weather_current": 1,  // Click weather -> go to page 1 (Weather page)
      "clock": 2             // Click clock -> go to page 2 (Timer page)
    },
    debug: false
  },

  start() {
    this.log("MMM-ClickToNavigate started");
    // Delay adding click handlers until DOM is ready
    setTimeout(() => {
      this.addClickHandlers();
    }, 3000);
  },

  log(message) {
    if (this.config.debug) {
      console.log("[MMM-ClickToNavigate]", message);
    }
  },

  addClickHandlers() {
    this.log("Adding click handlers");

    // Add click handlers for each mapped class
    Object.keys(this.config.mappings).forEach((className) => {
      const pageNumber = this.config.mappings[className];
      const elements = document.querySelectorAll(`.${className}`);

      this.log(`Found ${elements.length} elements for class: ${className}`);

      elements.forEach((element) => {
        element.style.cursor = "pointer";

        element.addEventListener("click", (event) => {
          this.log(`Clicked on ${className}, navigating to page ${pageNumber}`);

          // Send PAGE_CHANGED notification to MMM-pages
          this.sendNotification("PAGE_CHANGED", pageNumber);

          // Prevent event bubbling
          event.stopPropagation();
        });
      });
    });
  },

  getDom() {
    // This module is invisible
    const wrapper = document.createElement("div");
    wrapper.style.display = "none";
    return wrapper;
  },

  notificationReceived(notification, payload, sender) {
    // Re-add handlers when modules are shown/hidden
    if (notification === "MODULE_DOM_CREATED" || notification === "ALL_MODULES_STARTED") {
      setTimeout(() => {
        this.addClickHandlers();
      }, 1000);
    }
  }
});
