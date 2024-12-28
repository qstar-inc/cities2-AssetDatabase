const gameOnscreen = document.querySelector('.game-onscreen');
const gameBgContainer = document.querySelector('.game-bg');
const pauseMenu = document.querySelector('.pause-menu');
disablePauseMenu();
const pauseIcon = document.getElementById('pause-icon')
if (pauseIcon) {
    pauseIcon.addEventListener('click', enablePauseMenu);
}

const pauseButton1 = document.getElementById('pause-button-1');
if (pauseButton1) {
    pauseButton1.addEventListener('click', disablePauseMenu);
}

function enablePauseMenu() {
    if (gameOnscreen) {
        gameOnscreen.style.opacity = "0%";
        gameOnscreen.style.pointerEvents = "none";
    }
    if (gameBgContainer) {
        gameBgContainer.classList.add('blurred');
        gameBgContainer.style.pointerEvents = "none";
    }
    if (pauseMenu) {
        pauseMenu.style.opacity = "100%";
        pauseMenu.style.display = "revert";
    }
}

function disablePauseMenu() {
    if (gameOnscreen) {
        gameOnscreen.style.opacity = "100%";
        gameOnscreen.style.pointerEvents = "auto";
    }
    if (gameBgContainer) {
        gameBgContainer.classList.remove('blurred');
        gameBgContainer.style.pointerEvents = "auto";
    }
    if (pauseMenu) {
        pauseMenu.style.opacity = "0%";
        pauseMenu.style.display = "none";
    }
}

document.querySelectorAll('.top-game-icon-div.unused').forEach((container) => {
    const tooltipLeft = document.querySelector(".tooltip-35.left");
    const tooltipRight = document.querySelector(".tooltip-35.right");

    container.addEventListener('mouseenter', () => {
        const halfWidth = window.innerWidth / 2;
        const bound = container.getBoundingClientRect();
        const side = (bound.left + bound.right) / 2;
        if (halfWidth > side) {
            tooltipLeft.style.display = "block";
            tooltipRight.style.display = "none";
        } else {
            tooltipLeft.style.display = "none";
            tooltipRight.style.display = "block";
        }
    });

    container.addEventListener('mouseleave', () => {
        tooltipLeft.style.display = "none";
        tooltipRight.style.display = "none";
    });
});

document.querySelectorAll(".option-back-icon").forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelectorAll(".options-overlay").forEach((overlay) => {
            closeCredit();
            overlay.style.opacity = 0;
            setTimeout(() => {
                overlay.classList.add("display-none");
            }, 500); 
        });
        const mainMenuLogo = document.querySelector(".mainmenu-logo");
        mainMenuLogo.classList.remove("display-none");
    })
})
