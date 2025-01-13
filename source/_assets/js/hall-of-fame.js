const hofServer =
  "https://halloffame.cs2.mtq.io/api/v1/screenshots/weighted";

let bgElement =
  document.getElementById("game-bg") ||
  document.getElementsByClassName("mainmenu-bg")[0];
const hof = document.getElementById("hof");
const hofTitle = document.getElementById("hof-title");
const hofCreator = document.getElementById("hof-creator");
const hofLikes = document.getElementById("hof-likes");
const hofViews = document.getElementById("hof-views");
const hofTime = document.getElementById("hof-time");

async function updateGameBackground() {
  try {
    const response = await fetch(hofServer);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const imageUrlFHD = data.imageUrlFHD;
    if (imageUrlFHD) {
      bgElement.style.opacity = 0.5;
      hof.style.opacity = 0;
      setTimeout(() => {
        bgElement.src = imageUrlFHD;

        bgElement.onload = () => {
          hofTitle.textContent = data.cityName;
          hofCreator.textContent = data.creator.creatorName;
          hofLikes.textContent = `${data.favoritesCount} favs`;
          hofViews.textContent = `${data.viewsCount} views`;
          hofTime.textContent = data.createdAtFormattedDistance;
          hof.style.display = "unset";
          hof.style.opacity = 1;
          bgElement.style.opacity = 1;
        };
      }, 500);
    } else {
      console.error("imageUrlFHD not found in the response.");
    }
  } catch (error) {
    console.error("Failed to update the game background:", error);
  }
}

$(document).ready(function () {
  updateGameBackground();
});
