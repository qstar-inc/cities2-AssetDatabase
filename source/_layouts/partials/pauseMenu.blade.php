<div class="main-menu pause-menu">
    <div class="mainmenu-layout">
        <div class="drop-shadow mainmenu-logo-container">
            <img src="{{ $page->imgRepo }}/cities2/GameLogo.svg" alt="Cities: Skylines II" class="mainmenu-logo" />
        </div>
        <div class="mainmenu-center">
            <div class="mainmenu-start display-grid">
                <a id="pause-button-1" class="mainmenu-start-button round-border" href="#">
                    <div class="mainmenu-start-icon" style="mask-image: url({{ $page->imgRepo }}/cities2/Media/Glyphs/Progress.svg)"></div>
                    <span class="mainmenu-start-text" data-lang="resume"></span>
                </a>
                <button class="mainmenu-start-button round-border" onclick="deleteIndexedDB()">
                    <div class="mainmenu-start-icon" style="mask-image: url({{ $page->imgRepo }}/cities2/Media/Glyphs/Close.svg)"></div>
                    <span class="mainmenu-start-text" data-lang="reload_db"></span>
                </button>
                <button id="options-button" class="mainmenu-start-button round-border">
                    <div class="mainmenu-start-icon" style="mask-image: url({{ $page->imgRepo }}/cities2/Media/Glyphs/Gear.svg)"></div>
                    <span class="mainmenu-start-text" data-lang="options"></span>
                </button>
                <a class="mainmenu-start-button round-border" href="https://mods.paradoxplaza.com/games/cities_skylines_2/" target="_blank">
                    <div class="mainmenu-start-icon" style="mask-image: url({{ $page->imgRepo }}/cities2/Media/Glyphs/ParadoxMods.svg)"></div>
                    <span class="mainmenu-start-text" data-lang="pdx_mods"></span>
                </a>
                <button id="credit-button" class="mainmenu-start-button round-border">
                    <div class="mainmenu-start-icon" style="mask-image: url({{ $page->imgRepo }}/cities2/Media/Glyphs/Credits.svg)"></div>
                    <span class="mainmenu-start-text" data-lang="credits"></span>
                </button>
                <a class="mainmenu-start-button round-border" href="{{ $page->baseUrl }}">
                    <div class="mainmenu-start-icon" style="mask-image: url({{ $page->imgRepo }}/cities2/Media/Glyphs/OnOff.svg)"></div>
                    <span class="mainmenu-start-text" data-lang="back_to_main_menu"></span>
                </a>
            </div>
            {{-- <div class="mainmenu-info">
                <div class="mainmenu-info-header round-border-top">
                    <div class="mainmenu-info-header-text">STILL NOTHING</div>
                </div>
            </div>
            <div class="mainmenu-notification round-border"></div> --}}
        </div>
        <div class="mainmenu-version">{{ $page->version }}</div>
    </div>
</div>
