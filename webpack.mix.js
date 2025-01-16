const mix = require("laravel-mix");
require("laravel-mix-jigsaw");

mix.disableSuccessNotifications();
mix.setPublicPath("source/assets/build");

mix
  .jigsaw()
  .js("source/_assets/js/backend.js", "js")
  .js("source/_assets/js/chirp.js", "js")
  .js("source/_assets/js/credit.js", "js")
  .js("source/_assets/js/db.js", "js")
  .js("source/_assets/js/finder.js", "js")
  .js("source/_assets/js/game_data_process.js", "js")
  .js("source/_assets/js/game.js", "js")
  .js("source/_assets/js/hall-of-fame.js", "js")
  .js("source/_assets/js/main-menu.js", "js")
  .js("source/_assets/js/main.js", "js")
  .js("source/_assets/js/pause.js", "js")
  .js("source/_assets/js/splash.js", "js")
  .css("source/_assets/css/main.css", "css", [
    require("postcss-import"),
    require("tailwindcss"),
  ])
  .css("source/_assets/css/chirp.css", "css")
  .css("source/_assets/css/credit.css", "css")
  .css("source/_assets/css/finder.css", "css")
  .css("source/_assets/css/game.css", "css")
  .css("source/_assets/css/lds-ripple.css", "css")
  .css("source/_assets/css/main-menu.css", "css")
  .css("source/_assets/css/pause.css", "css")
  .css("source/_assets/css/splash.css", "css")
  .css("source/_assets/css/starqstrap.css", "css")
  .options({
    processCssUrls: false,
  })
  .version();
