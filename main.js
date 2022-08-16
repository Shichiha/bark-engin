/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Engine.ts":
/*!***********************!*\
  !*** ./src/Engine.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ExtendedVector3\": () => (/* binding */ ExtendedVector3),\n/* harmony export */   \"Game\": () => (/* binding */ Game),\n/* harmony export */   \"GameObject\": () => (/* binding */ GameObject),\n/* harmony export */   \"KeyLogic\": () => (/* binding */ KeyLogic),\n/* harmony export */   \"Opts\": () => (/* binding */ Opts),\n/* harmony export */   \"Renderer\": () => (/* binding */ Renderer),\n/* harmony export */   \"Scene\": () => (/* binding */ Scene),\n/* harmony export */   \"Vector2\": () => (/* binding */ Vector2),\n/* harmony export */   \"Vector3\": () => (/* binding */ Vector3)\n/* harmony export */ });\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar Vector2 = /** @class */ (function () {\r\n    function Vector2(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    return Vector2;\r\n}());\r\n\r\nvar Vector3 = /** @class */ (function (_super) {\r\n    __extends(Vector3, _super);\r\n    function Vector3(x, y, z) {\r\n        var _this = _super.call(this, x, y) || this;\r\n        _this.z = z;\r\n        return _this;\r\n    }\r\n    return Vector3;\r\n}(Vector2));\r\n\r\nvar ExtendedVector3 = /** @class */ (function (_super) {\r\n    __extends(ExtendedVector3, _super);\r\n    function ExtendedVector3(x, y, z, w, rx, ry, rz) {\r\n        var _this = _super.call(this, x, y, z) || this;\r\n        _this.w = w;\r\n        _this.rx = rx;\r\n        _this.ry = ry;\r\n        _this.rz = rz;\r\n        return _this;\r\n    }\r\n    return ExtendedVector3;\r\n}(Vector3));\r\n\r\nvar GameObject = /** @class */ (function () {\r\n    function GameObject(position, radius, color, extra) {\r\n        this.position = position;\r\n        this.radius = radius;\r\n        this.color = color;\r\n        this.extra = extra;\r\n    }\r\n    return GameObject;\r\n}());\r\n\r\nvar Scene = /** @class */ (function () {\r\n    function Scene(objects) {\r\n        this.objects = [];\r\n        this.objects = objects;\r\n    }\r\n    Scene.prototype.AddObject = function (object) {\r\n        this.objects.push(object);\r\n    };\r\n    return Scene;\r\n}());\r\n\r\nvar Opts = /** @class */ (function () {\r\n    function Opts(FOV, PROJECTION_CENTER_X, PROJECTION_CENTER_Y) {\r\n        this.FOV = FOV;\r\n        this.PROJECTION_CENTER_X = PROJECTION_CENTER_X;\r\n        this.PROJECTION_CENTER_Y = PROJECTION_CENTER_Y;\r\n    }\r\n    return Opts;\r\n}());\r\n\r\nvar Renderer = /** @class */ (function () {\r\n    function Renderer(Canvas, Scene) {\r\n        this.Canvas = Canvas;\r\n        this.scene = Scene;\r\n        this.ctx = Canvas.getContext('2d');\r\n        this.Opts = new Opts(this.Canvas.width * 1, this.Canvas.width / 2, this.Canvas.height / 2);\r\n    }\r\n    Renderer.prototype.project = function (object) {\r\n        var sizeProjection = this.Opts.FOV / (this.Opts.FOV + object.position.z);\r\n        var xProject = object.position.x * sizeProjection + this.Opts.PROJECTION_CENTER_X;\r\n        var yProject = object.position.y * sizeProjection + this.Opts.PROJECTION_CENTER_Y;\r\n        var Array = [xProject, yProject, sizeProjection];\r\n        return Array;\r\n    };\r\n    Renderer.prototype.draw = function (object) {\r\n        var _a = this.project(object), xProjected = _a[0], yProjected = _a[1], scaleProjected = _a[2];\r\n        this.ctx.globalAlpha =\r\n            xProjected < 0 ||\r\n                xProjected > this.Canvas.width ||\r\n                yProjected < 0 ||\r\n                yProjected > this.Canvas.height\r\n                ? 0\r\n                : Math.abs(1 - object.position.z / this.Canvas.width);\r\n        if (object.position.z < -this.Opts.FOV + object.radius) {\r\n            return;\r\n        }\r\n        this.ctx.fillStyle = \"rgba(\".concat(object.color.r, \", \").concat(object.color.g, \", \").concat(object.color.b, \", \").concat(object.color.a, \")\");\r\n        this.ctx.fillRect(xProjected - object.radius, yProjected - object.radius, object.radius * 2 * scaleProjected, object.radius * 2 * scaleProjected);\r\n    };\r\n    Renderer.prototype.render = function () {\r\n        for (var _i = 0, _a = this.scene.objects; _i < _a.length; _i++) {\r\n            var object = _a[_i];\r\n            this.draw(object);\r\n        }\r\n    };\r\n    return Renderer;\r\n}());\r\n\r\nvar Game = /** @class */ (function () {\r\n    function Game(fps, Canvas) {\r\n        this.fps = 60;\r\n        this.fps = fps;\r\n        this.scene = new Scene([]);\r\n        this.renderer = new Renderer(Canvas, this.scene);\r\n        this.Canvas = Canvas;\r\n        this.context = Canvas.getContext('2d');\r\n    }\r\n    Game.prototype.draw = function () {\r\n        var _this = this;\r\n        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);\r\n        this.scene.objects\r\n            .sort(function (a, b) {\r\n            return a.position.z - b.position.z;\r\n        })\r\n            .forEach(function (object) {\r\n            _this.renderer.draw(object);\r\n        });\r\n    };\r\n    return Game;\r\n}());\r\n\r\nvar KeyLogic = /** @class */ (function () {\r\n    function KeyLogic() {\r\n        var _this = this;\r\n        this.keys = {};\r\n        this.keys = {};\r\n        document.addEventListener('keydown', function (e) {\r\n            _this.keys[e.keyCode] = true;\r\n        });\r\n        document.addEventListener('keyup', function (e) {\r\n            _this.keys[e.keyCode] = false;\r\n        });\r\n    }\r\n    return KeyLogic;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/Engine.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Engine */ \"./src/Engine.ts\");\n\r\nvar Canvas = document.getElementById('canvas');\r\nvar Game = new _Engine__WEBPACK_IMPORTED_MODULE_0__.Game(60, Canvas);\r\nvar dots = [];\r\nfor (var i = 0; i < 2000; i++) {\r\n    var Position = {\r\n        x: (Math.random() - 0.5) * Canvas.offsetWidth,\r\n        y: (Math.random() - 0.5) * Canvas.offsetHeight,\r\n        z: Math.random() * 10000\r\n    };\r\n    var Radius = 5;\r\n    var Color = {\r\n        r: 5,\r\n        g: 6,\r\n        b: 217,\r\n        a: 1\r\n    };\r\n    var object = new _Engine__WEBPACK_IMPORTED_MODULE_0__.GameObject(Position, Radius, Color, {\r\n        accel: { x: 0, y: 0, z: 0 },\r\n        potential: { x: 0, y: 0, z: 0 },\r\n    });\r\n    dots.push(object);\r\n}\r\nGame.scene.objects = dots;\r\nfunction lerp(a, b, t) {\r\n    return a + (b - a) * t;\r\n}\r\nfunction lerpVector3(a, b, t) {\r\n    return {\r\n        x: lerp(a.x, b.x, t),\r\n        y: lerp(a.y, b.y, t),\r\n        z: lerp(a.z, b.z, t)\r\n    };\r\n}\r\nvar kl = new _Engine__WEBPACK_IMPORTED_MODULE_0__.KeyLogic();\r\nsetInterval(function () {\r\n    if (kl.keys[38]) {\r\n        Game.scene.objects.forEach(function (object) {\r\n            object.position.z += 10;\r\n        });\r\n    }\r\n    else if (kl.keys[40]) {\r\n        Game.scene.objects.forEach(function (object) {\r\n            object.position.z -= 10;\r\n        });\r\n    }\r\n    if (kl.keys[37]) {\r\n        Game.renderer.Opts.PROJECTION_CENTER_X += 10;\r\n        console.log(Game.renderer.Opts.PROJECTION_CENTER_X);\r\n    }\r\n    if (kl.keys[39]) {\r\n        Game.renderer.Opts.PROJECTION_CENTER_X -= 10;\r\n        console.log(Game.renderer.Opts.PROJECTION_CENTER_X);\r\n    }\r\n    var gravity = { x: 0, y: 0.1, z: 0 };\r\n    Game.scene.objects.forEach(function (object) {\r\n        object.extra.accel.y += 10 * gravity.y;\r\n        object.position.y = object.position.y + object.extra.accel.y;\r\n        object.extra.potential.y = object.extra.accel.y / 1.5;\r\n        if (object.position.y > Canvas.offsetHeight) {\r\n            object.position.y = Canvas.offsetHeight;\r\n            object.extra.accel.y = -object.extra.potential.y;\r\n        }\r\n    });\r\n    Game.draw();\r\n}, 1000 / Game.fps);\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

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
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;