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
        display.Context3D = flash.display3D.Context3D;
        display.Event = flash.events.Event;
        display.EventDispatcher = flash.events.EventDispatcher;
        display.setTimeout = flash.utils.setTimeout;
        var Stage3D = (function (_super) {
            __extends(Stage3D, _super);
            function Stage3D(stage) {
                var _this = this;
                stage = strict(stage, display.Stage);
                _this.__id === void 0 && (_this.__id = 0);
                _this.__stage === void 0 && (_this.__stage = null);
                _this.__context3D === void 0 && (_this.__context3D = null);
                _this.__canvas === void 0 && (_this.__canvas = null);
                _this.__x === void 0 && (_this.__x = 0);
                _this.__y === void 0 && (_this.__y = 0);
                _this.__visible === void 0 && (_this.__visible = false);
                _this = _super.call(this) || this;
                _this.__stage = stage;
                _this.__id = ((Stage3D.sID++) >> 0);
                _this.__visible = true;
                return _this;
            }
            Object.defineProperty(Stage3D.prototype, "context3D", {
                get: function () {
                    return this.__context3D;
                },
                enumerable: true,
                configurable: true
            });
            Stage3D.prototype.requestContext3D = function (context3DRenderMode, profile) {
                if (context3DRenderMode === void 0) { context3DRenderMode = 'auto'; }
                if (profile === void 0) { profile = 'baseline'; }
                context3DRenderMode = as(context3DRenderMode, 'String');
                profile = as(profile, 'String');
                this.__canvas = as(this.__stage.__getBodyInternal().appendChild(document.createElement('canvas')), HTMLCanvasElement);
                this.__canvas.style.width = this.__canvas.style.height = '100%';
                this.__canvas.style.position = 'absolute';
                this.__canvas.style.zIndex = this.__id;
                this.__context3D = new display.Context3D(this.__canvas, {
                    alpha: false,
                    premultipliedAlpha: true,
                    depth: true,
                    stencil: true
                }, this);
                display.setTimeout(function () {
                    this.dispatchEvent(new display.Event(display.Event.CONTEXT3D_CREATE));
                }.__bind(this), 1);
            };
            Stage3D.prototype.requestContext3DMatchingProfiles = function (param1) {
                this.requestContext3D();
            };
            Object.defineProperty(Stage3D.prototype, "x", {
                get: function () { return this.__x; },
                set: function (value) {
                    value = (+(value));
                    if (this.__x == value)
                        return;
                    this.__x = ((value) >> 0);
                    if (this.context3D != null) {
                        this.context3D.__updateBackbufferViewport();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage3D.prototype, "y", {
                get: function () { return this.__y; },
                set: function (value) {
                    value = (+(value));
                    if (this.__y == value)
                        return;
                    this.__y = ((value) >> 0);
                    if (this.__context3D != null) {
                        this.__context3D.__updateBackbufferViewport();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage3D.prototype, "visible", {
                get: function () { return this.__visible; },
                set: function (value) {
                    value = Boolean(value);
                    this.__canvas.style.visibility = (this.__visible = value) ? 'visible' : 'hidden';
                },
                enumerable: true,
                configurable: true
            });
            Stage3D.sID = 0;
            return Stage3D;
        }(display.EventDispatcher));
        display.Stage3D = Stage3D;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Stage3D.js.map