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
    var media;
    (function (media) {
        media.EventDispatcher = flash.events.EventDispatcher;
        media.BitmapData = flash.display.BitmapData;
        media.Rectangle = flash.geom.Rectangle;
        media.ByteArray = flash.utils.ByteArray;
        var Camera = (function (_super) {
            __extends(Camera, _super);
            function Camera() {
                return _super.call(this) || this;
            }
            Camera._scanHardware = function () {
            };
            Object.defineProperty(Camera, "names", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera, "isSupported", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Camera.getCamera = function (param1) {
                if (param1 === void 0) { param1 = null; }
                param1 = as(param1, 'String');
                return null;
            };
            Object.defineProperty(Camera.prototype, "activityLevel", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "bandwidth", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "currentFPS", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "fps", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "height", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "index", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "keyFrameInterval", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "loopback", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "motionLevel", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "motionTimeout", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "muted", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "name", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "position", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "quality", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "width", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Camera.prototype.setCursor = function (param1) {
                param1 = Boolean(param1);
            };
            Camera.prototype.setKeyFrameInterval = function (param1) {
                param1 = ((param1) >> 0);
            };
            Camera.prototype.setLoopback = function (param1) {
                if (param1 === void 0) { param1 = false; }
                param1 = Boolean(param1);
            };
            Camera.prototype.setMode = function (param1, param2, param3, param4) {
                if (param4 === void 0) { param4 = true; }
                param1 = ((param1) >> 0);
                param2 = ((param2) >> 0);
                param3 = (+(param3));
                param4 = Boolean(param4);
            };
            Camera.prototype.setMotionLevel = function (param1, param2) {
                if (param2 === void 0) { param2 = 2000; }
                param1 = ((param1) >> 0);
                param2 = ((param2) >> 0);
            };
            Camera.prototype.setQuality = function (param1, param2) {
                param1 = ((param1) >> 0);
                param2 = ((param2) >> 0);
            };
            Camera.prototype.drawToBitmapData = function (param1) {
                param1 = strict(param1, media.BitmapData);
            };
            Camera.prototype.copyToByteArray = function (param1, param2) {
                param1 = strict(param1, media.Rectangle);
                param2 = strict(param2, media.ByteArray);
            };
            Camera.prototype.copyToVector = function (param1, param2) {
                param1 = strict(param1, media.Rectangle);
            };
            return Camera;
        }(media.EventDispatcher));
        media.Camera = Camera;
    })(media = flash.media || (flash.media = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Camera.js.map