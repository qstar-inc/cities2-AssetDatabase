const hofServer = "https://halloffame.cs2.mtq.io/api/v1/screenshots/weighted";

let bgElement =
  document.getElementById("game-bg") ||
  document.getElementsByClassName("mainmenu-bg")[0];
const hof = document.getElementById("hof");

async function updateGameBackground() {
  if (hof_enabled) {
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
            const hofTitle = document.createElement("div");
            hofTitle.id = "hof-title";
            hofTitle.textContent = data.cityName;
            const hofCreator = document.createElement("div");
            hofCreator.id = "hof-creator";
            hofCreator.textContent = data.creator.creatorName;
            const hofLikes = document.createElement("div");
            hofLikes.id = "hof-likes";
            hofLikes.textContent = `${data.favoritesCount} favs`;
            const hofViews = document.createElement("div");
            hofViews.id = "hof-views";
            hofViews.textContent = `${data.viewsCount} views`;
            const hofTime = document.createElement("div");
            hofTime.id = "hof-time";
            hofTime.textContent = data.createdAtFormattedDistance;
            if (!isOptionMenuOpen) {
              hof.style.display = "unset";
              hof.style.opacity = 1;
            }
            bgElement.style.opacity = 1;
            hof.innerHTML = "";
            hof.appendChild(hofTitle);
            hof.appendChild(hofCreator);
            hof.appendChild(hofLikes);
            hof.appendChild(hofViews);
            hof.appendChild(hofTime);
          };
        }, 500);
        isHofBG = true;
      } else {
        console.error("imageUrlFHD not found in the response.");
      }
    } catch (error) {
      console.error("Failed to update the game background:", error);
    }
  } else {
    if (isHofBG) {
      hof.innerHTML = "";
      bgElement.src = `${imageRepoPath}/cities2/mainmenu.jpg`;
      isHofBG = false;
    }
  }
}

$(document).ready(function () {
  updateGameBackground();
});

window.updateGameBackground = updateGameBackground;
