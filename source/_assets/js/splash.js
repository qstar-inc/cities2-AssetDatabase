const referrer = document.referrer;
const currentDomain = window.location.origin;

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

function randomizeCircleAnimation(className) {
  const element = document.querySelector(className);
  const randomDuration = (Math.random() * (3 - 0.6) + 1).toFixed(2) + "s";
  element.style.animation = `loadAnimation ${randomDuration} linear forwards`;
}

randomizeCircleAnimation(".circle-1");
randomizeCircleAnimation(".circle-2");
randomizeCircleAnimation(".circle-3");

let skipSplash = false;
let skipSplash1 = false;
let skipSplash2 = false;
let timeout1, timeout2;

function hideSplashScreens() {
  document.getElementById("preloader-screen").style.display = "none";
  document.getElementById("main-content").style.display = "block";
}

function showNextSplash(currentSplashId, nextSplashId, nextTimeoutFunction) {
  let time;
  if (nextSplashId == "preloader-screen") {
    time = random(3000, 5000);
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

document
  .getElementById("preloader-skip-button")
  .addEventListener("click", function () {
    skipSplash = true;
    hideSplashScreens();
  });

if (referrer && referrer.startsWith(currentDomain)) {
  document.getElementById("splash-screen-1").style.display = "none";
  document.getElementById("splash-screen-2").style.display = "none";
  document.getElementById("preloader-screen").style.display = "flex";
  setTimeout(function () {
    hideSplashScreens();
  }, random(3000, 5000));
  // hideSplashScreens();
} else {
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
        showNextSplash(
          "splash-screen-2",
          "preloader-screen",
          hideSplashScreens
        );
      });
    });

  document
    .getElementById("splash-screen-2")
    .addEventListener("click", function () {
      clearTimeout(timeout2);
      skipSplash2 = true;
      showNextSplash("splash-screen-2", "preloader-screen", hideSplashScreens);
    });
}

window.showNextSplash = showNextSplash;
