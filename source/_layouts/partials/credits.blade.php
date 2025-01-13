@extends('_layouts.partials.optionsTop')

@section('title')
    CREDITS
@endsection

@section('options-main')
    <div class="credit-text">
        <h1>Cities: Skylines II Asset Database</h1>
        <br />
        <p>A community made "database" of all* assets in Cities: Skylines II.</p>
        <p class="sm">* almost</p>
        <br class="lg" /><br class="lg" />
        <h2>Database by</h2>
        <h1><img src="{{ $page->images }}/starq.svg" alt="StarQ Logo"></h1>
        <br class="lg" /><br class="lg" />
        <h1><img src="{{ $page->imgRepo }}/cities2/Media/Menu/GameLogo.svg" alt="Cities: Skylines II Logo"></h1>
        <br class="lg" />
        <h2>Game Developed by</h2>
        <h1><img src="{{ $page->imgRepo }}/cities2/Media/Menu/ColossalLogo.svg" alt="Colossal Order Logo" /></h1>
        <br class="lg" />
        <h2>Game Published by</h2>
        <h1><img src="{{ $page->imgRepo }}/cities2/Media/Menu/ParadoxLogo.svg" alt="Paradox Logo" /></h1>
        <br class="lg" />
        <p class="sm">Cities: Skylines 2 is published by Paradox Interactive AB and developed by Colossal Order Ltd.</p><br /><br />
        <p class="sm">CITIES: SKYLINES and PARADOX INTERACTIVE are trademarks and/or registered trademarks</p><br /><br />
        <p class="sm">of Paradox Interactive AB in Europe, the U.S. and other countries.</p><br /><br />
        <p class="sm">Any other trademark, logo and copyright is the property of its owner.</p><br /><br />
        <br class="lg" /><br class="lg" />

        <h2>Other contents used</h2>
        <br class="lg" />
        <h1><img src="https://camo.githubusercontent.com/8c4efbbf4a6ec0873135e07676d7736c6eca26a82ebf664ec727cfdb43344e2b/68747470733a2f2f696d6775722e636f6d2f7a383553586b7a2e706e67" /></h1>
        <p><strong><a href="https://mods.paradoxplaza.com/mods/79634/Windows">Asset Icon Library</a></strong> by TDW</p>
        <br class="lg" /><br class="lg" />

        <h2>Special Acknowledgments</h2>
        <br class="lg" />
        <div class="display-flex gap2"><a href="https://discord.gg/citiesskylines">@include('_layouts._logos.discord')</a> <span>Cities: Skylines Official Discord</span></div>
        <br class="lg" />
        <div class="display-flex gap2"><a href="https://discord.gg/q3dzd4p5Hx">@include('_layouts._logos.discord')</a> <span>Cities: Skylines Modding Discord</span></div>
        <br class="lg" />

        <h1><img class="sm" src="https://pages.github.com/images/logo.svg" /></h1>
        <h1><img class="md" src="https://raw.githubusercontent.com/tighten/jigsaw/main/jigsaw-banner.png" /></h1>
        <h1><img class="md" src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" /></h1>
        <br class="lg" />
        <h1><img class="sm" src="https://raw.githubusercontent.com/npm/logos/refs/heads/master/npm%20logo/npm-logo-red.svg" /></h1>
        <br class="lg" />
        <h1><img class="sm" src="https://code.visualstudio.com/assets/images/code-stable.png" /></h1>
        <br class="lg" />
        <h1><img class="sm" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/MariaDB_colour_logo.svg" /></h1>
        <br class="lg" /><br class="lg" />


        <h2>Disclaimer</h2>
        <p>
            This database is a community-made project, unaffiliated with<br />
            <strong>Paradox Interactive</strong> or <strong>Colossal Order</strong>.<br />
            All trademarks, copyrights, and game assets remain the property<br />
            of their respective owners.
        </p>
    </div>
@endsection
