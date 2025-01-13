<?php

$baseUrl = 'https://qstar-inc.github.io/cities2-AssetDatabase/';
$repo = "/cities2-AssetDatabase";

return [
    'production' => true,
    'baseUrl' => $baseUrl,
    // 'title' => 'Work-In-Progress',
    'title' => 'Cities: Skylines II Asset Database',
    'description' => 'A complete asset database for Cities: Skylines II',
    'collections' => [],
    'url' => $baseUrl,
    'keywords' => 'citiesskylines2, cities-skylines-2, cs2, skylines2, cities2',
    'author' => 'StarQ',
    'data' => $repo . "/assets/data",
    'images' => $repo . "/assets/images",
    'fonts' => $repo . "/assets/fonts",
    'repo' => $repo,
];
