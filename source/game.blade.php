@extends('_layouts.main')

@section('style')
    <link rel="stylesheet" href="{{ $page->repo . mix('css/game.css', 'assets/build') }}">
    <link rel="stylesheet" href="{{ $page->repo . mix('css/lds-ripple.css', 'assets/build') }}">
@endsection

@section('body')
    <div class="game-bg-container">
        <img id="game-bg" class="game-bg" src="" />
    </div>
    <div class="game-onscreen">
        <div class="toolbar">
            @include('_layouts.partials.toolbar')
        </div>
        <div class="top-icons">
            <div class="left-icons"></div>
            <div class="right-icons"></div>
        </div>
        <div class="chirper-icons"></div>
        <div class="info-panel"></div>
        <div class="pause-overlay"></div>
    </div>
@endsection

@section('js')
    <script defer src="{{ $page->repo . mix('js/game.js', 'assets/build') }}"></script>
    <script>
        document.getElementById('game-bg').src = '{{ $page->images }}/cities2/mainmenu.jpg';
    </script>
@endsection
