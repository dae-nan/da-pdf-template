(function () {
  const scenarioButtons = Array.from(document.querySelectorAll("button[data-scenario]"));
  const scenarios = Array.from(document.querySelectorAll(".scenario"));
  const printBtn = document.getElementById("printBtn");

  function activateScenario(key) {
    scenarioButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.scenario === key);
    });

    scenarios.forEach((section) => {
      const match = section.id === `scenario-${key}`;
      section.classList.toggle("active", match);
    });

    updatePageLabels();
  }

  function updatePageLabels() {
    const activeScenario = document.querySelector(".scenario.active");
    if (!activeScenario) {
      return;
    }

    const pages = Array.from(activeScenario.querySelectorAll(".page"));
    pages.forEach((page, i) => {
      const tag = page.querySelector(".page-no");
      if (tag) {
        tag.textContent = `Page ${i + 1} of ${pages.length}`;
      }
    });
  }

  scenarioButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      activateScenario(this.dataset.scenario);
    });
  });

  printBtn.addEventListener("click", function () {
    updatePageLabels();
    window.print();
  });

  updatePageLabels();
})();

