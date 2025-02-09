const creditOverlay = document.getElementById("credit-overlay");
const mainMenu =
  document.querySelector(".pause-menu-container") ||
  document.querySelector(".mainmenu-layout");

if (creditOverlay) {
  const creditText = creditOverlay.querySelector(".credit-text");
  const creditButton = document.getElementById("credit-button");
  if (creditButton) {
    creditButton.addEventListener("click", () => {
      creditOverlay.classList.remove("d-none");
      creditOverlay.style.opacity = 1;

      creditOverlay.style.opacity = 1;
      mainMenu.style.opacity = 0;
      setTimeout(() => {
        mainMenu.classList.add("d-none");
        creditOverlay.classList.remove("d-none");
      }, 500);

      creditText.style.animationPlayState = "running";
      const duration =
        parseFloat(getComputedStyle(creditText).animationDuration) * 1000;
      setTimeout(() => {
        resetToMainOrPause();
      }, duration);
    });
  }
}

function closeCredit() {
  const creditText = creditOverlay.querySelector(".credit-text");
  if (creditOverlay && creditText) {
    creditOverlay.style.opacity = 0;
    creditOverlay.classList.add("d-none");
    creditText.style.animationPlayState = "paused";
  }
}

window.closeCredit = closeCredit;
