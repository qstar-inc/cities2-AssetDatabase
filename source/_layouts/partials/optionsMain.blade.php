<div id="options-div">
    <div class="option-header">
        <a href="#" class="option-back-icon">
            <div class="option-back-arrow" style="mask-image: url({{ $page->imgRepo }}/cities2/Media/Glyphs/TriangleArrowLeft.svg)"></div>
        </a>
        <div class="option-title">
            <span data-lang-game="Menu.OPTIONS"></span>
        </div>
    </div>
    <div id="options-main">
        <div id="options-left" class="options-layout options-left-layout">
            <button class="options-left-list-button" id="option-interface-btn">
                <div class="options-left-list">
                    <span data-lang-game="Options.SECTION[Interface]"></span>
                </div>
            </button>
            <hr class="options-divider" />
            <button class="options-left-list-button" id="option-hof-btn">
                <div class="options-left-list">
                    <span data-lang="hof"></span>
                </div>
            </button>
            <hr class="options-divider" />
            <button class="options-left-list-button" id="option-coming-soon-btn">
                <div class="options-left-list">
                    <span data-lang="coming_soon"></span>
                </div>
            </button>
        </div>
        <div id="options-right" class="options-layout options-right-layout">
            <div class="option-right-main">
                <div class="option-right-main-data" id="option-interface">
                    <div class="options-item options-dropdown-item" id="option-interface-language">
                        <div class="options-label" data-lang-game="Options.OPTION[InterfaceSettings.currentLocale]"></div>
                        <div class="options-dropdown">
                            <div class="options-dropdown-trigger">
                                <div class="options-dropdown-trigger-text"></div>
                                <div class="options-dropdown-trigger-arrow" style="mask-image:url({{ $page->imgRepo }}/cities2/Media/Glyphs/StrokeArrowDown.svg);"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="option-right-main-data" id="option-hof">
                    <div class="options-item options-checkbox-item" id="option-hof-enable">
                        <div class="options-label" data-lang="enable"></div>
                        <div class="options-checkbox">
                            <div id="option-hof-enable-checkbox"></div>
                        </div>
                    </div>
                </div>
                <div class="option-right-main-data" id="option-coming-soon">
                    <div class="options-item options-checkbox-item">
                        <div class="options-label">
                            <h1>Planned Features:</h1>
                            <ul style="list-style: inside;">
                                <li>Search / Find It</li>
                                <li>Mod Details</li>
                                <li>Skyve Integration</li>
                                <li>Hall of Fame UI and Options</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="option-right-sub">
                <span id="option-right-sub-title"></span>
                <p id="option-right-sub-details"></p>
            </div>
        </div>
    </div>
</div>
<div class="block-everything" id="option-dropdown-select-lang-block-everything">
    <div class="options-dropdown-select" id="option-dropdown-select-lang">
        <div class="option-dropdown-item" data-val="de-DE">Deutsch</div>
        <div class="option-dropdown-item" data-val="en-US">English</div>
        <div class="option-dropdown-item" data-val="es-ES">Español</div>
        <div class="option-dropdown-item" data-val="fr-FR">Français</div>
        <div class="option-dropdown-item" data-val="it-IT">Italiano</div>
        <div class="option-dropdown-item" data-val="ja-JP">日本語</div>
        <div class="option-dropdown-item" data-val="ko-KR">한국어</div>
        <div class="option-dropdown-item" data-val="pl-PL">Polski</div>
        <div class="option-dropdown-item" data-val="pt-BR">Português brasileiro</div>
        <div class="option-dropdown-item" data-val="ru-RU">Русский</div>
        <div class="option-dropdown-item" data-val="zh-HANS">汉语</div>
        <div class="option-dropdown-item" data-val="zh-HANT">繁体中文</div>
    </div>
</div>
