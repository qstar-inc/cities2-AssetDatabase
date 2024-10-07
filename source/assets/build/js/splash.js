/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./source/_assets/js/splash.js":
/*!*************************************!*\
  !*** ./source/_assets/js/splash.js ***!
  \*************************************/
/***/ (() => {

var referrer = document.referrer;
var currentDomain = window.location.origin;
if (referrer && referrer.startsWith(currentDomain)) {
  document.getElementById("splash-screen-1").style.display = "none";
  document.getElementById("splash-screen-2").style.display = "none";
  document.getElementById("main-content").style.display = "block";
} else {
  var showNextSplash = function showNextSplash(currentSplashId, nextSplashId, nextTimeoutFunction) {
    var time;
    if (nextSplashId == "preloader-screen") {
      time = 5000;
    } else {
      time = 3000;
    }
    document.getElementById(currentSplashId).style.display = "none";
    document.getElementById(nextSplashId).style.display = "flex";
    if (!skipSplash) {
      timeout2 = setTimeout(function () {
        nextTimeoutFunction();
      }, time);
    }
  };
  var hideSplashScreens = function hideSplashScreens() {
    document.getElementById("preloader-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  };
  var skipSplash = false;
  var skipSplash1 = false;
  var skipSplash2 = false;
  var timeout1, timeout2;
  timeout1 = setTimeout(function () {
    if (!skipSplash1) {
      skipSplash1 = true;
      showNextSplash("splash-screen-1", "splash-screen-2", function () {
        if (skipSplash2 == false) {
          skipSplash2 = true;
          showNextSplash("splash-screen-2", "preloader-screen", hideSplashScreens);
        }
      });
    }
  }, 3000);
  document.getElementById("splash-screen-1").addEventListener("click", function () {
    clearTimeout(timeout1);
    skipSplash1 = true;
    showNextSplash("splash-screen-1", "splash-screen-2", function () {
      clearTimeout(timeout2);
      showNextSplash("splash-screen-2", "preloader-screen", hideSplashScreens);
    });
  });
  document.getElementById("splash-screen-2").addEventListener("click", function () {
    clearTimeout(timeout2);
    skipSplash2 = true;
    showNextSplash("splash-screen-2", "preloader-screen", hideSplashScreens);
  });
  document.getElementById("preloader-skip-button").addEventListener("click", function () {
    skipSplash = true;
    hideSplashScreens();
  });
  document.addEventListener("DOMContentLoaded", function () {
    var tips = ["Save your game frequently to avoid losing progress.", "You can zoom in by scrolling your mouse wheel.", "Right-click to deselect any tool.", "Keybinds help speed up your workflow.", "You cannot undo most actions."];
    function randomTipSelector() {
      var randomIndex = Math.floor(Math.random() * tips.length);
      return tips[randomIndex];
    }
    document.getElementById("preloader-tips-text").innerText = randomTipSelector();
  });
}

/***/ }),

/***/ "./source/_assets/css/main.css":
/*!*************************************!*\
  !*** ./source/_assets/css/main.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./source/_assets/css/splash.css":
/*!***************************************!*\
  !*** ./source/_assets/css/splash.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./source/_assets/css/main-menu.css":
/*!******************************************!*\
  !*** ./source/_assets/css/main-menu.css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./source/_assets/css/game.css":
/*!*************************************!*\
  !*** ./source/_assets/css/game.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/splash": 0,
/******/ 			"css/game": 0,
/******/ 			"css/main-menu": 0,
/******/ 			"css/splash": 0,
/******/ 			"css/main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/game","css/main-menu","css/splash","css/main"], () => (__webpack_require__("./source/_assets/js/splash.js")))
/******/ 	__webpack_require__.O(undefined, ["css/game","css/main-menu","css/splash","css/main"], () => (__webpack_require__("./source/_assets/css/main.css")))
/******/ 	__webpack_require__.O(undefined, ["css/game","css/main-menu","css/splash","css/main"], () => (__webpack_require__("./source/_assets/css/splash.css")))
/******/ 	__webpack_require__.O(undefined, ["css/game","css/main-menu","css/splash","css/main"], () => (__webpack_require__("./source/_assets/css/main-menu.css")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/game","css/main-menu","css/splash","css/main"], () => (__webpack_require__("./source/_assets/css/game.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;