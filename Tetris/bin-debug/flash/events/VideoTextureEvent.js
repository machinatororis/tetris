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
    var events;
    (function (events) {
        var VideoTextureEvent = (function (_super) {
            __extends(VideoTextureEvent, _super);
            function VideoTextureEvent(type, bubbles, cancelable, status, colorSpace) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (status === void 0) { status = null; }
                if (colorSpace === void 0) { colorSpace = null; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                status = as(status, 'String');
                colorSpace = as(colorSpace, 'String');
                _this._status === void 0 && (_this._status = null);
                _this._colorSpace === void 0 && (_this._colorSpace = null);
                _this.codecInfo === void 0 && (_this.codecInfo = null);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this._status = status;
                _this._colorSpace = colorSpace;
                return _this;
            }
            Object.defineProperty(VideoTextureEvent.prototype, "status", {
                get: function () { return this._status; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoTextureEvent.prototype, "colorSpace", {
                get: function () { return this._colorSpace; },
                enumerable: true,
                configurable: true
            });
            VideoTextureEvent.RENDER_STATE = "renderState";
            return VideoTextureEvent;
        }(events.Event));
        events.VideoTextureEvent = VideoTextureEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=VideoTextureEvent.js.map