@extends('_layouts.main')

@section('style')
    <link rel="stylesheet" href="{{ $page->repo . mix('css/credit.css', 'assets/build') }}">
    <link rel="stylesheet" href="{{ $page->repo . mix('css/pause.css', 'assets/build') }}">
@endsection

@section('body')
    @include('_layouts.partials.options')
    <div id="main-menu" class="splash-screen" style="display: flex;">
        <div>
            <div class="mainmenu-container">
                <img src="{{ $page->imgRepo }}/cities2/mainmenu.jpg" alt="Main Menu" class="mainmenu-bg">
            </div>
            <div class="mainmenu-layout">
                @include('_layouts.partials.hof')
                <div class="drop-shadow mainmenu-logo-container">
                    <img src="{{ $page->imgRepo }}/cities2/GameLogo.svg" alt="Cities: Skylines II" class="mainmenu-logo" />
                </div>
                <div class="mainmenu-center">
                    <div class="mainmenu-start">
                        <a id="mainmenu-button-1" class="mainmenu-start-button disabled-link round-border" href="game">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text" data-lang="loading"></span>
                        </a>
                        <button id="mainmenu-button-continue" class="mainmenu-start-button round-border">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text" data-lang="loading_screen"></span>
                        </button>
                        <button id="options-button" class="mainmenu-start-button round-border">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text" data-lang="options"></span>
                        </button>
                        <a class="mainmenu-start-button round-border" href="https://mods.paradoxplaza.com/games/cities_skylines_2/" target="_blank">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text" data-lang="pdx_mods"></span>
                        </a>
                        <button id="credit-button" class="mainmenu-start-button round-border">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text" data-lang="credits"></span>
                        </button>
                        <a class="mainmenu-start-button round-border" href="https://buymeacoffee.com/starq" target="_blank">
                            <div class="mainmenu-start-icon"></div>
                            <span class="mainmenu-start-text" data-lang="bmac"></span>
                        </a>
                    </div>
                    <div class="mainmenu-info">
                        <div class="mainmenu-info-header round-border-top">
                            <div class="mainmenu-info-header-text">NOTHING HERE</div>
                        </div>
                    </div>
                    <div class="mainmenu-notification round-border"></div>
                </div>
                <div class="mainmenu-version">{{ $page->version }}</div>
                <a class="mainmenu-top-right" href="https://github.com/qstar-inc" target="_blank">
                    <img class="mainmenu-top-right-img" src="{{ $page->images }}/starq.svg" />
                    <div class="mainmenu-top-right-text">StarQ</div>
                </a>
            </div>
        </div>
    </div>
@endsection

@section('js')
    <script defer src="{{ $page->repo . mix('js/backend.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/db.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/credit.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/pause.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/main-menu.js', 'assets/build') }}"></script>
    <script>
        document.getElementById('mainmenu-button-continue').addEventListener('click', function() {
            skipSplash = true;
            showNextSplash('main-content', 'preloader-screen', hideSplashScreens);
        });
    </script>
@endsection
