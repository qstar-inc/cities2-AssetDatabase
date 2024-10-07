/******/ (() => { // webpackBootstrap
/*!***********************************!*\
  !*** ./source/_assets/js/game.js ***!
  \***********************************/
var assetPanel = document.getElementById("asset-panel");
var assetIcons = document.querySelectorAll(".asset-menu-icon");
assetIcons.forEach(function (x) {
  x.addEventListener("click", function () {
    document.getElementById("asset-panel").style.display = "block";
  });
});
/******/ })()
;