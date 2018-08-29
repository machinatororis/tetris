var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flash;
(function (flash) {
    var display;
    (function (display) {
        var MovieClip = (function (_super) {
            __extends(MovieClip, _super);
            function MovieClip() {
                var _this = this;
                _this.enabled === void 0 && (_this.enabled = false);
                _this.trackAsMenu === void 0 && (_this.trackAsMenu = false);
                _this = _super.call(this) || this;
                return _this;
            }
            Object.defineProperty(MovieClip.prototype, "currentFrame", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MovieClip.prototype, "currentFrameLabel", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MovieClip.prototype, "currentLabel", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MovieClip.prototype, "currentLabels", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MovieClip.prototype, "currentScene", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MovieClip.prototype, "framesLoaded", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MovieClip.prototype, "isPlaying", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MovieClip.prototype, "scenes", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MovieClip.prototype, "totalFrames", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            MovieClip.prototype.addFrameScript = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
            };
            MovieClip.prototype.gotoAndPlay = function (frame, scene) {
                if (scene === void 0) { scene = null; }
                scene = as(scene, 'String');
            };
            MovieClip.prototype.gotoAndStop = function (frame, scene) {
                if (scene === void 0) { scene = null; }
                scene = as(scene, 'String');
            };
            MovieClip.prototype.nextFrame = function () {
            };
            MovieClip.prototype.nextScene = function () {
            };
            MovieClip.prototype.play = function () {
            };
            MovieClip.prototype.prevFrame = function () {
            };
            MovieClip.prototype.prevScene = function () {
            };
            MovieClip.prototype.stop = function () {
            };
            MovieClip.prototype.toString = function () {
                return '[object MovieClip]';
            };
            return MovieClip;
        }(display.Sprite));
        display.MovieClip = MovieClip;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=MovieClip.js.map