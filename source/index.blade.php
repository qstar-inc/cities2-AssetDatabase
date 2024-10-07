@extends('_layouts.main')

@section('body')
    <div id="main-menu" class="splash-screen" style="display: flex;">
        <div>
            <div class="mainmenu-container">
                <img src="{{ $page->images }}/cities2/mainmenu.jpg" alt="Main Menu" class="mainmenu-bg">
            </div>
            <div class="mainmenu-layout">
                <div class="drop-shadow mainmenu-logo-container">
                    <img src="{{ $page->images }}/cities2/GameLogo.svg" alt="Cities: Skylines II" class="mainmenu-logo" />
                </div>
                <div class="mainmenu-center">
                    <div class="mainmenu-start">
                        <a class="mainmenu-start-button" href="game">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Start Game</span>
                        </a>
                        <button id="mainmenu-button-continue" class="mainmenu-start-button">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Show Loading Screen</span>
                        </button>
                        <button class="mainmenu-start-button" disabled>
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Disabled</span>
                        </button>
                        <button class="mainmenu-start-button" disabled>
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Disabled</span>
                        </button>
                        <button class="mainmenu-start-button" disabled>
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Disabled</span>
                        </button>
                        <button class="mainmenu-start-button" onclick="window.close();">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text">Exit</span>
                        </button>
                    </div>
                    <div class="mainmenu-info">
                        <div class="mainmenu-info-header">
                            <div class="mainmenu-info-header-text">WORK-IN-PROGRESS</div>
                        </div>
                    </div>
                    <div class="mainmenu-notification"></div>
                </div>
                <div class="mainmenu-version">0.0.0 (Nothing Works Edition)</div>
                <button class="mainmenu-top-right">
                    <img class="mainmenu-top-right-img" src="{{ $page->images }}/starq.svg" />
                    <div class="mainmenu-top-right-text">
                        StarQ
                    </div>
                </button>
            </div>
        </div>
    </div>
@endsection

@section('js')
    <script>
        document.getElementById('mainmenu-button-continue').addEventListener('click', function() {
            skipSplash = true;
            showNextSplash('main-content', 'preloader-screen', hideSplashScreens);
        });
    </script>
@endsection
