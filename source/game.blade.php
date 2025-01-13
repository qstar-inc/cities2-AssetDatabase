@extends('_layouts.main')

@section('style')
    <link rel="stylesheet" href="{{ $page->repo . mix('css/game.css', 'assets/build') }}">
    <link rel="stylesheet" href="{{ $page->repo . mix('css/credit.css', 'assets/build') }}">
    <link rel="stylesheet" href="{{ $page->repo . mix('css/pause.css', 'assets/build') }}">
    <link rel="stylesheet" href="{{ $page->repo . mix('css/lds-ripple.css', 'assets/build') }}">
@endsection

@section('body')
    @include('_layouts.partials.options')
    <div class="pause-menu-container">
        @include('_layouts.partials.pauseMenu')
    </div>
    <div class="game-bg-container">
        <img id="game-bg" class="game-bg" src="" />
    </div>
    <div class="game-onscreen">
        @include('_layouts.partials.hof')
        <div class="toolbar">
            @include('_layouts.partials.toolbar')
        </div>
        <div class="top-icons">
            <div class="left-icons">
                @include('_layouts.partials.leftIcons')
            </div>
            <div class="right-icons">
                @include('_layouts.partials.rightIcons')
            </div>
        </div>
        <div class="chirper-icons">
            @include('_layouts.partials.chirper')
        </div>
        <div class="info-panel"></div>
        <div class="details-pane">
            @include('_layouts.partials.detailsPane')
        </div>
        <div class="pause-overlay"></div>
    </div>
@endsection

@section('js')
    <script defer src="{{ $page->repo . mix('js/backend.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/db.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/credit.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/pause.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/game_data_process.js', 'assets/build') }}"></script>
    <script defer src="{{ $page->repo . mix('js/game.js', 'assets/build') }}"></script>
    <script>
        document.getElementById('game-bg').src = '{{ $page->imgRepo }}/cities2/mainmenu.jpg';
    </script>
@endsection
