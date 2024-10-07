const mix = require("laravel-mix");
require("laravel-mix-jigsaw");

mix.disableSuccessNotifications();
mix.setPublicPath("source/assets/build");

mix
  .jigsaw()
  .js("source/_assets/js/splash.js", "js")
  .js("source/_assets/js/main.js", "js")
  .js("source/_assets/js/game.js", "js")
  .css("source/_assets/css/main.css", "css", [
    require("postcss-import"),
    require("tailwindcss"),
  ])
  .css("source/_assets/css/splash.css", "css")
  .css("source/_assets/css/main-menu.css", "css")
  .css("source/_assets/css/game.css", "css")
  .options({
    processCssUrls: false,
  })
  .version();
