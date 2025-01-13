const gameOnscreen = document.querySelector('.game-onscreen');
const gameBgContainer = document.querySelector('.game-bg');
const pauseMenu = document.querySelector('.pause-menu');
disablePauseMenu();
const pauseIcon = document.getElementById('pause-icon')
if (pauseIcon) {
    pauseIcon.addEventListener('click', enablePauseMenu);
}
let isLangPickerOpen = false;

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

const langIcon = document.getElementById("language-top-icon");
langIcon.addEventListener('click', () => {
    toggleLangPicker();
})

function toggleLangPicker() {
    const langList = document.querySelector(".lang-picker");
    if (isLangPickerOpen && langList) {
        langList.classList.remove("active");
        isLangPickerOpen = false;
    } else {
        if (langList) {
            langList.classList.add("active");
            isLangPickerOpen = true;
        }
    }
}

buttons = document.querySelectorAll(".lang-picker-button");
buttons.forEach((button) => {
    if (language == button.dataset.val) {
        button.classList.add("active");
    }
    button.addEventListener('click', () => {
        buttons.forEach(buttonX => {
            buttonX.classList.remove("active");
        });
        language = button.dataset.val;
        button.classList.add("active");
        processAssetGroup();
        toggleLangPicker();
        localStorage.setItem("language", JSON.stringify(language));
  })
})