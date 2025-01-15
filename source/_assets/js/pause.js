const overlay = document.getElementById('options-overlay');
const optionsTitle = overlay.querySelector('.option-title');
const gameOnscreen = document.querySelector('.game-onscreen');
const mainMenu = document.querySelector(".pause-menu-container") || document.querySelector(".mainmenu-layout");
const mainBgContainer = document.querySelector('.mainmenu-bg');
const gameBgContainer = document.querySelector('.game-bg');
const pauseMenu = document.querySelector('.pause-menu');
const optionRightSubTitle = document.getElementById("option-right-sub-title");
const optionRightSubDesc = document.getElementById("option-right-sub-details");
const hof = document.getElementById("hof");
disablePauseMenu();
const pauseIcon = document.getElementById('pause-icon')
if (pauseIcon) {
    pauseIcon.addEventListener('click', enablePauseMenu);
}
// let isLangPickerOpen = false;

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
    if (mainBgContainer) {
        mainBgContainer.classList.add('blurred');
        mainBgContainer.style.pointerEvents = "none";
    }
    if (pauseMenu) {
        pauseMenu.style.opacity = "100%";
        pauseMenu.style.display = "revert";
    }
    if (hof) {
        hof.style.opacity = "0%";
        hof.style.pointerEvents = "none";
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
    if (hof) {
        if (isHofBG) {
            hof.style.opacity = "1";
            hof.style.pointerEvents = "auto";
        } else {
            hof.style.opacity = "0";
            hof.style.pointerEvents = "none";
        }
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

// const langIcon = document.getElementById("language-top-icon");
// if (langIcon) {
//     langIcon.addEventListener('click', () => {
//         toggleLangPicker();
//     })
// }

// function toggleLangPicker() {
//     const langList = document.querySelector(".lang-picker");
//     if (isLangPickerOpen && langList) {
//         langList.classList.remove("active");
//         langList.classList.add("inactive");
//         isLangPickerOpen = false;
//     } else {
//         if (langList) {
//             langList.classList.remove("inactive");
//             langList.classList.add("active");
//             isLangPickerOpen = true;
//         }
//     }
// }

// const buttons = document.querySelectorAll(".lang-picker-button");
// if (buttons) {
//     buttons.forEach((button) => {
//         if (language == button.dataset.val) {
//             button.classList.add("active");
//         }
//         button.addEventListener('click', async () => {
//             buttons.forEach(buttonX => {
//                 buttonX.classList.remove("active");
//             });
//             language = button.dataset.val;
//             button.classList.add("active");
//             await reloadLang(language);
//             processAssetGroup();
//             toggleLangPicker();
//             localStorage.setItem("language", JSON.stringify(language));
//         })
//     })
// }

const back = document.querySelectorAll(".option-back-icon")
back.forEach((button) => {
    button.addEventListener('click', () => {
    document.querySelectorAll(".options-overlay").forEach((overlay) => {
        closeCredit();
        if (mainBgContainer) {
            mainBgContainer.classList.remove('blurred');
            mainBgContainer.style.pointerEvents = "auto";
            if (hof) {
                if (isHofBG) {
                    hof.style.opacity = "1";
                    hof.style.pointerEvents = "auto";
                } else {
                    hof.style.opacity = "0";
                    hof.style.pointerEvents = "none";
                }
            }
        } else {
            if (hof) {
                if (!isHofBG) {
                    hof.style.opacity = "0";
                    hof.style.pointerEvents = "none";
                }
            }
        }
        mainMenu.style.opacity = 1;
        mainMenu.classList.remove('display-none');
        overlay.style.opacity = 0;
        setTimeout(() => {
            overlay.classList.add("display-none");
        }, 500);
    });
    const mainMenuLogo = document.querySelector(".mainmenu-logo");
    mainMenuLogo.classList.remove("display-none");
    })
})

const optionsButton = document.getElementById("options-button");
if (optionsButton) {
    optionsButton.addEventListener('click', () => {
        enablePauseMenu();
        isOptionMenuOpen = true;
        overlay.classList.remove('display-none');
        overlay.style.opacity = 1;
    
        overlay.style.opacity = 1;
        mainMenu.style.opacity = 0;
        
        startInterface();
        setTimeout(() => {
            mainMenu.classList.add('display-none');
            overlay.classList.remove('display-none');
        }, 500);
    })
}

function hideAll() {
    const divs = document.querySelectorAll(".option-right-main-data");
    divs.forEach(div => {
        div.style.display = "none";
    });
}

const optionInterfaceButton = document.getElementById("option-interface-btn");
if (optionInterfaceButton) {
    optionInterfaceButton.addEventListener('click', () => {
        startInterface();
    })
}

async function startInterface() {
    hideAll();
    const div = document.getElementById("option-interface");
    div.style.display = "flex";
    document.querySelector(".options-dropdown-trigger-text").innerText = await getLangData("lang_title");
}

const optionInterfaceLanguage = document.getElementById("option-interface-language");
if (optionInterfaceLanguage && optionRightSubTitle && optionRightSubDesc) {
    optionInterfaceLanguage.addEventListener('mouseover', () => {
        optionRightSubTitle.innerText = getTranslation("language");
        optionRightSubDesc.innerText = getTranslation("language_description");
    });
    optionInterfaceLanguage.addEventListener('mouseout', () => {
        optionRightSubTitle.innerText = "";
        optionRightSubDesc.innerText = "";
    });
}

const optionDropdownTrigger = document.querySelector(".options-dropdown-trigger");
if (optionDropdownTrigger) {
    const blockEverything = document.getElementById("option-dropdown-select-lang-block-everything");
    const langMenu = document.getElementById("option-dropdown-select-lang");
    const arrow = document.querySelector(".options-dropdown-trigger-arrow");
    optionDropdownTrigger.addEventListener('click', () => {
        arrow.style.maskImage = `url(${imageRepoPath}/cities2/Media/Glyphs/StrokeArrowDown.svg)`;
        blockEverything.style.display = "block";
        blockEverything.addEventListener('click', () => {
            langMenu.style.display = "none";
            blockEverything.style.display = "none";
        })
        langMenu.style.display = "block";
        const rect = optionDropdownTrigger.parentElement.getBoundingClientRect();
        langMenu.style.top = `${rect.bottom}px`;
        langMenu.style.width = `${rect.width}px`;
        langMenu.style.left = `${rect.left}px`;
    })
    const langButtons = langMenu.children;
    if (langButtons) {
        for (const button of langButtons) {
            button.addEventListener('click', async () => {
                language = button.dataset.val;
                await reloadLang(language);
                if (typeof processAssetGroup == "function") {
                    processAssetGroup();
                }
                langMenu.style.display = "none";
                blockEverything.style.display = "none";
                localStorage.setItem("language", JSON.stringify(language));
                document.querySelector(".options-dropdown-trigger-text").innerText = language;
            })
        }
    }
}

const hofButton = document.getElementById("option-hof-btn");
if (hofButton) {
    hofButton.addEventListener('click', () => {
        startHofOptions();
    })
}

function startHofOptions() {
    hideAll();
    const div = document.getElementById("option-hof");
    div.style.display = "flex";
}

const optionHofEnable = document.getElementById("option-hof-enable");
if (optionHofEnable && optionRightSubTitle && optionRightSubDesc) {
    
    optionHofEnable.addEventListener('mouseover', () => {
        optionRightSubTitle.innerText = getTranslation("enable");
        optionRightSubDesc.innerText = getTranslation("enable_hof");
    });
    optionHofEnable.addEventListener('mouseout', () => {
        optionRightSubTitle.innerText = "";
        optionRightSubDesc.innerText = "";
    });
    const optionHofEnableCheckbox = document.getElementById("option-hof-enable-checkbox");
    checkHof(optionHofEnableCheckbox, true);
    if (optionHofEnableCheckbox) {
        optionHofEnable.addEventListener('click', () => {
            toggleHof(optionHofEnableCheckbox);
        })
    }
}

function toggleHof(optionHofEnableCheckbox) {
    if (hof_enabled) {
        optionHofEnableCheckbox.style.maskImage = "none";
        optionHofEnableCheckbox.style.backgroundColor = "unset";
        hof_enabled = false;
    } else {
        optionHofEnableCheckbox.style.maskImage = `url(${imageRepoPath}/cities2/Media/Glyphs/Checkmark.svg)`;
        optionHofEnableCheckbox.style.backgroundColor = "aliceblue";
        hof_enabled = true;
    }
    localStorage.setItem("hof_enabled", JSON.stringify(hof_enabled));
    updateGameBackground();
    hof.style.opacity = "0";
    hof.style.pointerEvents = "none";
}

function checkHof(optionHofEnableCheckbox) {
    if (hof_enabled) {
        optionHofEnableCheckbox.style.maskImage = `url(${imageRepoPath}/cities2/Media/Glyphs/Checkmark.svg)`;
        optionHofEnableCheckbox.style.backgroundColor = "aliceblue";
    } else {
        optionHofEnableCheckbox.style.maskImage = "none";
        optionHofEnableCheckbox.style.backgroundColor = "unset";
    }
}