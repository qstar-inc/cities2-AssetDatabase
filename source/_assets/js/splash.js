let skipSplash = false;
let skipSplash1 = false;
let skipSplash2 = false;
let timeout1, timeout2;

function showNextSplash(currentSplashId, nextSplashId, nextTimeoutFunction) {
  let time;
  if (nextSplashId == "preloader-screen") {
    time = 5000;
  } else {
    time = 3000;
  }
  document.getElementById(currentSplashId).style.display = "none";
  document.getElementById(nextSplashId).style.display = "flex";
  if (!skipSplash) {
    timeout2 = setTimeout(function () {
      nextTimeoutFunction();
    }, time);
  }
}

function hideSplashScreens() {
  document.getElementById("preloader-screen").style.display = "none";
  document.getElementById("main-content").style.display = "block";
}

timeout1 = setTimeout(function () {
  if (!skipSplash1) {
    skipSplash1 = true;
    showNextSplash("splash-screen-1", "splash-screen-2", function () {
      if (skipSplash2 == false) {
        skipSplash2 = true;
        showNextSplash(
          "splash-screen-2",
          "preloader-screen",
          hideSplashScreens
        );
      }
    });
  }
}, 3000);

document
  .getElementById("splash-screen-1")
  .addEventListener("click", function () {
    clearTimeout(timeout1);
    skipSplash1 = true;
    showNextSplash("splash-screen-1", "splash-screen-2", function () {
      clearTimeout(timeout2);
      showNextSplash("splash-screen-2", "preloader-screen", hideSplashScreens);
    });
  });

document
  .getElementById("splash-screen-2")
  .addEventListener("click", function () {
    clearTimeout(timeout2);
    skipSplash2 = true;
    showNextSplash("splash-screen-2", "preloader-screen", hideSplashScreens);
  });

document
  .getElementById("preloader-skip-button")
  .addEventListener("click", function () {
    skipSplash = true;
    hideSplashScreens();
  });

document.addEventListener("DOMContentLoaded", function () {
  const tips = [
    "Save your game frequently to avoid losing progress.",
    "You can zoom in by scrolling your mouse wheel.",
    "Right-click to deselect any tool.",
    "Keybinds help speed up your workflow.",
    "You cannot undo most actions.",
  ];

  function randomTipSelector() {
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
  }
  document.getElementById("preloader-tips-text").innerText =
    randomTipSelector();
});
