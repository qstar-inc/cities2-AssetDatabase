<div class="main-menu pause-menu">
    <div class="mainmenu-layout">
        <div class="drop-shadow mainmenu-logo-container">
            <img src="{{ $page->images }}/cities2/GameLogo.svg" alt="Cities: Skylines II" class="mainmenu-logo" />
        </div>
        <div class="mainmenu-center">
            <div class="mainmenu-start display-grid">
                <a id="pause-button-1" class="mainmenu-start-button round-border" href="#">
                    <div class="mainmenu-start-icon"></div>
                    <span class="mainmenu-start-text">Resume</span>
                </a>
                <button class="mainmenu-start-button round-border" onclick="clearCacheAndRedirect()">
                    <div class="mainmenu-start-icon"></div>
                    <span class="mainmenu-start-text">Reload Database</span>
                </button>
                <button id="options-button" class="mainmenu-start-button round-border disabled-link" disabled>
                    <div class="mainmenu-start-icon"></div>
                    <span class="mainmenu-start-text">No Options Yet</span>
                </button>
                <a class="mainmenu-start-button round-border" href="https://mods.paradoxplaza.com/games/cities_skylines_2/" target="_blank">
                    <div class="mainmenu-start-icon"></div>
                    <span class="mainmenu-start-text">Paradox Mods</span>
                </a>
                <button id="credit-button" class="mainmenu-start-button round-border">
                    <div class="mainmenu-start-icon"></div>
                    <span class="mainmenu-start-text">Credits</span>
                </button>
                <a class="mainmenu-start-button round-border" href="/">
                    <div class="mainmenu-start-icon"></div>
                    <span class="mainmenu-start-text">Back to Main Menu</span>
                </a>
            </div>
            <div class="mainmenu-info">
                <div class="mainmenu-info-header round-border-top">
                    <div class="mainmenu-info-header-text">WORK-IN-PROGRESS</div>
                </div>
            </div>
            <div class="mainmenu-notification round-border"></div>
        </div>
        <div class="mainmenu-version">1.2.0q1 [Vanilla] (Something Works)</div>
    </div>
</div>
