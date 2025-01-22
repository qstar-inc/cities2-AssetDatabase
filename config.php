<?php

$baseUrl = '/';
$repo    = "";

return [
    'production'  => false,
    'baseUrl'     => $baseUrl,
    'title'       => 'Cities: Skylines II Asset Database',
    'description' => 'A complete asset database for Cities: Skylines II',
    'collections' => [],
    'url'         => $baseUrl,
    'keywords'    => 'citiesskylines2, cities-skylines-2, cs2, skylines2, cities2',
    'author'      => 'StarQ',
    'data'        => $repo . "/assets/data",
    'images'      => $repo . "/assets/images",
    'fonts'       => $repo . "/assets/fonts",
    'repo'        => $repo,
    'version'     => "1.2.3q1 [PROD] (Icon and I18N Lang)",
    'imgRepo'     => 'https://raw.githubusercontent.com/qstar-inc/cities2-AssetDatabase-imgRepo/refs/heads/main',
];
