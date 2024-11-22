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
    @yield('style')
</head>

<body class="text-gray-900 font-sans antialiased">
    @include('_layouts.partials.splash')
    <div id="main-content" style="display:none">
        @yield('body')
    </div>

    <!-- Jquery JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        const imageBasePath = "{{ $page->images }}";
        const dataBasePath = "{{ $page->data }}";
    </script>
    <script defer src="{{ $page->repo . mix('js/main.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/splash.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/hall-of-fame.js', 'assets/build') }}"></script>
    @yield('js')
</body>

</html>
