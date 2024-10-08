<div id="splash-container">
    <div id="splash-screen-1" class="splash-screen">
        <div class="logo-container">
            <img src="{{ $page->images }}/starq.svg" alt="StarQ" class="splash-logo">
        </div>
    </div>
    <div id="splash-screen-2" class="splash-screen" style="display: none;">
        <div class="logo-container">
            <img src="{{ $page->images }}/cities2/GameLogo.svg" alt="Cities: Skylines II" class="splash-logo">
        </div>
    </div>
    <div id="preloader-screen" class="splash-screen" style="display: none;">
        <div class="preloader-container">
            <img src="{{ $page->images }}/cities2/preloader.png" alt="Preloader" class="preloader-bg">
        </div>
        <div class="preloader-overlays">
            <div class="preloader-logo-container">
                <img class="preloader-logo drop-shadow" src="{{ $page->images }}/cities2/GameLogo.svg" alt="Cities: Skylines II">
            </div>
            <div class="drop-shadow preloader-loading-text-container"><span id="preloader-loading-text">LOADING...</span></div>
            <div class="drop-shadow circle-container">
                <svg class="loading-circle" viewBox="0 0 44 44">
                    <path class="circle-bg outer-circle" d="M22 3a19 19 0 1 1 0 38a19 19 0 1 1 0-38" />
                    <path class="circle circle-1" d="M22 3a19 19 0 1 1 0 38a19 19 0 1 1 0-38" />

                    <path class="circle-bg middle-circle" d="M22 6a16 16 0 1 1 0 32a16 16 0 1 1 0-32" />
                    <path class="circle circle-2" d="M22 6a16 16 0 1 1 0 32a16 16 0 1 1 0-32" />

                    <path class="circle-bg inner-circle" d="M22 9a13 13 0 1 1 0 26a13 13 0 1 1 0-26" />
                    <path class="circle circle-3" d="M22 9a13 13 0 1 1 0 26a13 13 0 1 1 0-26" />
                </svg>
            </div>
            <div class="preloader-tips-container"><span id="preloader-tips-text">Tooltips</span></div>
            <div class="preloader-skip-button-container drop-shadow" id="preloader-skip-button"><button class="preloader-skip-button">SKIP&nbsp;⏭</button></div>
        </div>
    </div>
</div>
