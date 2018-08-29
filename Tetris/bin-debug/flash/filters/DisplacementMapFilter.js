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
    var filters;
    (function (filters) {
        filters.BitmapData = flash.display.BitmapData;
        filters.Point = flash.geom.Point;
        var DisplacementMapFilter = (function (_super) {
            __extends(DisplacementMapFilter, _super);
            function DisplacementMapFilter(mapBitmap, mapPoint, componentX, componentY, scaleX, scaleY, mode, color, alpha) {
                if (mapBitmap === void 0) { mapBitmap = null; }
                if (mapPoint === void 0) { mapPoint = null; }
                if (componentX === void 0) { componentX = 0; }
                if (componentY === void 0) { componentY = 0; }
                if (scaleX === void 0) { scaleX = 0.0; }
                if (scaleY === void 0) { scaleY = 0.0; }
                if (mode === void 0) { mode = "wrap"; }
                if (color === void 0) { color = 0; }
                if (alpha === void 0) { alpha = 0.0; }
                var _this = this;
                mapBitmap = strict(mapBitmap, filters.BitmapData);
                mapPoint = strict(mapPoint, filters.Point);
                componentX = ((componentX) >>> 0);
                componentY = ((componentY) >>> 0);
                scaleX = (+(scaleX));
                scaleY = (+(scaleY));
                mode = as(mode, 'String');
                color = ((color) >>> 0);
                alpha = (+(alpha));
                _this.alpha === void 0 && (_this.alpha = NaN);
                _this.color === void 0 && (_this.color = 0);
                _this.componentX === void 0 && (_this.componentX = 0);
                _this.componentY === void 0 && (_this.componentY = 0);
                _this.mapBitmap === void 0 && (_this.mapBitmap = null);
                _this.mapPoint === void 0 && (_this.mapPoint = null);
                _this.mode === void 0 && (_this.mode = null);
                _this.scaleX === void 0 && (_this.scaleX = NaN);
                _this.scaleY === void 0 && (_this.scaleY = NaN);
                _this = _super.call(this) || this;
                _this.alpha = alpha;
                _this.color = color;
                _this.componentX = componentX;
                _this.componentY = componentY;
                _this.mapBitmap = mapBitmap;
                _this.mapPoint = mapPoint;
                _this.mode = mode;
                _this.scaleX = scaleX;
                _this.scaleY = scaleY;
                _this.__notImplemented = true;
                return _this;
            }
            DisplacementMapFilter.prototype.clone = function () {
                return new DisplacementMapFilter(this.mapBitmap, this.mapPoint, this.componentX, this.componentY, this.scaleX, this.scaleY, this.mode, this.color, this.alpha);
            };
            return DisplacementMapFilter;
        }(filters.BitmapFilter));
        filters.DisplacementMapFilter = DisplacementMapFilter;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=DisplacementMapFilter.js.map