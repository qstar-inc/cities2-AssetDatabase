<div id="options-div">
    <div class="option-header">
        <a href="#" class="option-back-icon">
            <div class="option-back-arrow" style="mask-image: url({{ $page->imgRepo }}/cities2/Media/Glyphs/TriangleArrowLeft.svg)"></div>
        </a>
        <div class="option-title">
            <span data-lang="options"></span>
        </div>
    </div>
    <div id="options-main">
        <div id="options-left" class="options-layout options-left-layout">
            <button class="options-left-list-button" id="option-interface-btn">
                <div class="options-left-list">
                    <span>Interface</span>
                </div>
            </button>
            <hr class="options-divider" />
            <button class="options-left-list-button" id="option-hof-btn">
                <div class="options-left-list">
                    <span data-lang="hof"></span>
                </div>
            </button>
        </div>
        <div id="options-right" class="options-layout options-right-layout">
            <div class="option-right-main">
                <div class="option-right-main-data" id="option-interface">
                    <div class="options-item options-dropdown-item" id="option-interface-language">
                        <div class="options-label" data-lang="language"></div>
                        <div class="options-dropdown">
                            <div class="options-dropdown-trigger">
                                <div class="options-dropdown-trigger-text"></div>
                                <div class="options-dropdown-trigger-arrow" style="mask-image:url({{ $page->imgRepo }}/cities2/Media/Glyphs/StrokeArrowDown.svg);"></div>
                            </div>
                        </div>
                        <div class="block-everything" id="option-dropdown-select-lang-block-everything">
                            <div class="options-dropdown-select" id="option-dropdown-select-lang">
                                <div class="option-dropdown-item" data-val="enUS">en-US</div>
                                <div class="option-dropdown-item" data-val="deDE">de-DE</div>
                                <div class="option-dropdown-item" data-val="esES">es-ES</div>
                                <div class="option-dropdown-item" data-val="frFR">fr-FR</div>
                                <div class="option-dropdown-item" data-val="itIT">it-IT</div>
                                <div class="option-dropdown-item" data-val="jaJP">ja-JP</div>
                                <div class="option-dropdown-item" data-val="koKR">ko-KR</div>
                                <div class="option-dropdown-item" data-val="plPL">pl-PL</div>
                                <div class="option-dropdown-item" data-val="ptBR">pt-BR</div>
                                <div class="option-dropdown-item" data-val="ruRU">ru-RU</div>
                                <div class="option-dropdown-item" data-val="zhHANS">zh-HANS</div>
                                <div class="option-dropdown-item" data-val="zhHANT">zh-HANT</div>
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
            </div>
            <div class="option-right-sub">
                <span id="option-right-sub-title"></span>
                <p id="option-right-sub-details"></p>
            </div>
        </div>
    </div>
</div>
