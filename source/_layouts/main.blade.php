<!DOCTYPE html>
<html lang="{{ $page->language ?? 'en' }}">

<head>
    <meta charset="utf-8">
    <meta name="author" content="{{ $page->author }}">
    <meta name="description" content="{{ $page->description }}">
    <meta name="keywords" content="{{ $page->keywords }}">
    <meta name="language" content="English">
    <meta name="revisit-after" content="7 days">
    <meta name="robots" content="index, follow">
    <meta name="title" content="{{ $page->title }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:description" content="{{ $page->description }}" />
    {{-- <meta property="og:image" content="{{ $page->images }}/thumb.jpg" /> --}}
    <meta property="og:title" content="{{ $page->title }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page->url }}" />
    {{-- <meta property="twitter:card" content="{{ $page->images }}/thumb.jpg" /> --}}
    <meta property="twitter:description" content="{{ $page->description }}" />
    {{-- <meta property="twitter:image" content="{{ $page->images }}/thumb.jpg" /> --}}
    <meta property="twitter:title" content="{{ $page->title }}" />
    <meta property="twitter:url" content="{{ $page->url }}" />
    <title>{{ $page->title }}</title>

    <style>
        @font-face {
            font-family: "Overpass";
            src: url("<?php echo $page->fonts; ?>/Overpass-VariableFont_wght.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            font-family: "Overpass";
            src: url("<?php echo $page->fonts; ?>/Overpass-Italic-VariableFont_wght.ttf") format("truetype");
            font-weight: normal;
            font-style: italic;
        }
    </style>
    <link rel="stylesheet" href="{{ $page->repo . mix('css/main.css', 'assets/build') }}">
    <link rel="stylesheet" href="{{ $page->repo . mix('css/splash.css', 'assets/build') }}">
    <link rel="stylesheet" href="{{ $page->repo . mix('css/main-menu.css', 'assets/build') }}">
    <script defer src="{{ $page->repo . mix('js/main.js', 'assets/build') }}"></script>
</head>

<body class="text-gray-900 font-sans antialiased">
    <div id="splash-container">
        <div id="splash-screen-1" class="splash-screen">
            <div class="logo-container">
                <img src="{{ $page->images }}/starq.svg" alt="StarQ" class="logo">
            </div>
        </div>
        <div id="splash-screen-2" class="splash-screen" style="display: none;">
            <div class="logo-container">
                <img src="{{ $page->images }}/cities2/GameLogo.svg" alt="Cities: Skylines II" class="logo">
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
    <div id="main-content" style="display:none">
        @yield('body')
    </div>
    <script>
        let skipSplash = false;
        let skipSplash1 = false;
        let skipSplash2 = false;
        let timeout1, timeout2;

        function showNextSplash(currentSplashId, nextSplashId, nextTimeoutFunction) {
            let time;
            if (nextSplashId == "preloader-screen") {
                time = 5000;
            } else {
                time = 3000;
            }
            document.getElementById(currentSplashId).style.display = 'none';
            document.getElementById(nextSplashId).style.display = 'flex';
            if (!skipSplash) {
                timeout2 = setTimeout(function() {
                    nextTimeoutFunction();
                }, time);
            }
        }

        function hideSplashScreens() {
            document.getElementById('preloader-screen').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
        }

        timeout1 = setTimeout(function() {
            if (!skipSplash1) {
                skipSplash1 = true;
                showNextSplash('splash-screen-1', 'splash-screen-2', function() {
                    if (skipSplash2 == false) {
                        skipSplash2 = true;
                        showNextSplash('splash-screen-2', 'preloader-screen', hideSplashScreens);
                    }

                });
            }
        }, 3000);

        document.getElementById('splash-screen-1').addEventListener('click', function() {
            clearTimeout(timeout1);
            skipSplash1 = true;
            showNextSplash('splash-screen-1', 'splash-screen-2', function() {
                clearTimeout(timeout2);
                showNextSplash('splash-screen-2', 'preloader-screen', hideSplashScreens);
            });
        });

        document.getElementById('splash-screen-2').addEventListener('click', function() {
            clearTimeout(timeout2);
            skipSplash2 = true;
            showNextSplash('splash-screen-2', 'preloader-screen', hideSplashScreens);
        });

        document.getElementById('preloader-skip-button').addEventListener('click', function() {
            skipSplash = true;
            hideSplashScreens();
        });

        document.addEventListener("DOMContentLoaded", function() {
            const tips = [
                "Save your game frequently to avoid losing progress.",
                "You can zoom in by scrolling your mouse wheel.",
                "Right-click to deselect any tool.",
                "Keybinds help speed up your workflow.",
                "You cannot undo most actions."
            ];

            function randomTipSelector() {
                const randomIndex = Math.floor(Math.random() * tips.length);
                return tips[randomIndex];
            }
            document.getElementById("preloader-tips-text").innerText = randomTipSelector();
        });
    </script>
    @yield('js')
</body>

</html>
