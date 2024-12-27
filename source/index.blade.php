@extends('_layouts.main')

@section('body')
    <div id="main-menu" class="splash-screen" style="display: flex;">
        <div>
            <div class="mainmenu-container">
                <img src="{{ $page->images }}/cities2/mainmenu.jpg" alt="Main Menu" class="mainmenu-bg">
            </div>
            <div class="mainmenu-layout">
                @include('_layouts.partials.hof')
                <div class="drop-shadow mainmenu-logo-container">
                    <img src="{{ $page->images }}/cities2/GameLogo.svg" alt="Cities: Skylines II" class="mainmenu-logo" />
                </div>
                <div class="mainmenu-center">
                    <div class="mainmenu-start">
                        <a id="mainmenu-button-1" class="mainmenu-start-button disabled-link round-border" href="game">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Loading....</span>
                        </a>
                        <button id="mainmenu-button-continue" class="mainmenu-start-button round-border">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Loading Screen</span>
                        </button>
                        <button class="mainmenu-start-button disabled-link round-border" disabled>
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Options (WIP)</span>
                        </button>
                        <button class="mainmenu-start-button disabled-link round-border" disabled>
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Legal (WIP)</span>
                        </button>
                        <button class="mainmenu-start-button disabled-link round-border" disabled>
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Credits (WIP)</span>
                        </button>
                        <button class="mainmenu-start-button round-border" onclick="window.close();">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Exit</span>
                        </button>
                    </div>
                    <div class="mainmenu-info">
                        <div class="mainmenu-info-header round-border-top">
                            <div class="mainmenu-info-header-text">WORK-IN-PROGRESS</div>
                        </div>
                    </div>
                    <div class="mainmenu-notification round-border"></div>
                </div>
                <div class="mainmenu-version">1.2.0q1 [Vanilla] (Something Works)</div>
                <a class="mainmenu-top-right" href="https://github.com/qstar-inc" target="_blank">
                    <img class="mainmenu-top-right-img" src="{{ $page->images }}/starq.svg" />
                    <div class="mainmenu-top-right-text">
                        StarQ
                    </div>
                </a>
            </div>
        </div>
    </div>
@endsection

@section('js')
    <script defer src="{{ $page->repo . mix('js/backend.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/db.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/main-menu.js', 'assets/build') }}"></script>
    <script>
        document.getElementById('mainmenu-button-continue').addEventListener('click', function() {
            skipSplash = true;
            showNextSplash('main-content', 'preloader-screen', hideSplashScreens);
        });
    </script>
@endsection
