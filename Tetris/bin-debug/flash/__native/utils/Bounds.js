var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var utils;
        (function (utils) {
            utils.Rectangle = flash.geom.Rectangle;
            var Bounds = (function () {
                function Bounds(xMin, yMin, xMax, yMax) {
                    if (xMin === void 0) { xMin = 0x8000000; }
                    if (yMin === void 0) { yMin = 0x8000000; }
                    if (xMax === void 0) { xMax = 0x8000000; }
                    if (yMax === void 0) { yMax = 0x8000000; }
                    this.xMin = NaN;
                    this.yMin = NaN;
                    this.xMax = NaN;
                    this.yMax = NaN;
                    xMin = (+(xMin));
                    yMin = (+(yMin));
                    xMax = (+(xMax));
                    yMax = (+(yMax));
                    this.xMin = xMin;
                    this.yMin = yMin;
                    this.xMax = xMax;
                    this.yMax = yMax;
                }
                Bounds.fromRectangle = function (source) {
                    source = strict(source, utils.Rectangle);
                    return new Bounds(source.x, source.y, (source.x + source.width), (source.y + source.height));
                };
                Bounds.prototype.setElements = function (xMin, yMin, xMax, yMax) {
                    xMin = (+(xMin));
                    yMin = (+(yMin));
                    xMax = (+(xMax));
                    yMax = (+(yMax));
                    this.xMin = xMin;
                    this.yMin = yMin;
                    this.xMax = xMax;
                    this.yMax = yMax;
                };
                Bounds.prototype.copyFrom = function (source) {
                    source = strict(source, Bounds);
                    this.setElements(source.xMin, source.yMin, source.xMax, source.yMax);
                };
                Bounds.prototype.contains = function (x, y) {
                    x = (+(x));
                    y = (+(y));
                    return x < this.xMin != x < this.xMax &&
                        y < this.yMin != y < this.yMax;
                };
                Bounds.prototype.unionInPlace = function (other) {
                    other = strict(other, Bounds);
                    if (other.isEmpty()) {
                        return;
                    }
                    this.extendByPoint(other.xMin, other.yMin);
                    this.extendByPoint(other.xMax, other.yMax);
                };
                Bounds.prototype.extendByPoint = function (x, y) {
                    x = (+(x));
                    y = (+(y));
                    this.extendByX(x);
                    this.extendByY(y);
                };
                Bounds.prototype.extendByX = function (x) {
                    x = (+(x));
                    if (this.xMin == 0x8000000) {
                        this.xMin = this.xMax = x;
                        return;
                    }
                    this.xMin = Math.min(this.xMin, x);
                    this.xMax = Math.max(this.xMax, x);
                };
                Bounds.prototype.extendByY = function (y) {
                    y = (+(y));
                    if (this.yMin == 0x8000000) {
                        this.yMin = this.yMax = y;
                        return;
                    }
                    this.yMin = Math.min(this.yMin, y);
                    this.yMax = Math.max(this.yMax, y);
                };
                Bounds.prototype.intersects = function (toIntersect) {
                    toIntersect = strict(toIntersect, Bounds);
                    return this.contains(toIntersect.xMin, toIntersect.yMin) ||
                        this.contains(toIntersect.xMax, toIntersect.yMax);
                };
                Bounds.prototype.isEmpty = function () {
                    return this.xMax <= this.xMin || this.yMax <= this.yMin;
                };
                Object.defineProperty(Bounds.prototype, "width", {
                    get: function () {
                        return this.xMax - this.xMin;
                    },
                    set: function (value) {
                        value = (+(value));
                        this.xMax = this.xMin + value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Bounds.prototype, "height", {
                    get: function () {
                        return this.yMax - this.yMin;
                    },
                    set: function (value) {
                        value = (+(value));
                        this.yMax = this.yMin + value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Bounds.prototype.getBaseWidth = function (angle) {
                    angle = (+(angle));
                    var u = Math.abs(Math.cos(angle));
                    var v = Math.abs(Math.sin(angle));
                    return u * (this.xMax - this.xMin) + v * (this.yMax - this.yMin);
                };
                Bounds.prototype.getBaseHeight = function (angle) {
                    angle = (+(angle));
                    var u = Math.abs(Math.cos(angle));
                    var v = Math.abs(Math.sin(angle));
                    return v * (this.xMax - this.xMin) + u * (this.yMax - this.yMin);
                };
                Bounds.prototype.setEmpty = function () {
                    this.xMin = this.yMin = this.xMax = this.yMax = 0;
                };
                Bounds.prototype.setToSentinels = function () {
                    this.xMin = this.yMin = this.xMax = this.yMax = 0x8000000;
                };
                Bounds.prototype.clone = function () {
                    return new Bounds(this.xMin, this.yMin, this.xMax, this.yMax);
                };
                Bounds.prototype.toString = function () {
                    return "{ " +
                        "xMin: " + this.xMin + ", " +
                        "xMin: " + this.yMin + ", " +
                        "xMax: " + this.xMax + ", " +
                        "xMax: " + this.yMax +
                        " }";
                };
                return Bounds;
            }());
            utils.Bounds = Bounds;
        })(utils = __native.utils || (__native.utils = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Bounds.js.map