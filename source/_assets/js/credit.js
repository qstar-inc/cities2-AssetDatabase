const overlay = document.getElementById('credit-overlay');
const creditText = overlay.querySelector('.credit-text');
const mainMenu = document.querySelector(".pause-menu-container") || document.querySelector(".mainmenu-layout");

document.getElementById('credit-button').addEventListener('click', () => {
    overlay.classList.remove('display-none');
    overlay.style.opacity = 1;
    
    overlay.style.opacity = 1;
    mainMenu.style.opacity = 0;
    setTimeout(() => {
        mainMenu.classList.add('display-none');
        overlay.classList.remove('display-none');
    }, 500);

    creditText.style.animationPlayState = 'running';
    const duration = parseFloat(getComputedStyle(creditText).animationDuration) * 1000;
    setTimeout(() => {
        closeCredit();
    }, duration);
});

function closeCredit() {
    setTimeout(() => {
        overlay.style.opacity = 0;
        mainMenu.style.opacity = 1;
        overlay.classList.add('display-none');
        mainMenu.classList.remove('display-none');
        creditText.style.animationPlayState = 'paused';
    }, 500);
}

window.closeCredit = closeCredit