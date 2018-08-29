var flash;
(function (flash) {
    var geom;
    (function (geom) {
        var _this = this;
        geom.ObjectPool = flash.__native.utils.ObjectPool;
        var Point = (function () {
            function Point(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.x = NaN;
                this.y = NaN;
                x = (+(x));
                y = (+(y));
                this.x = x;
                this.y = y;
            }
            Point.interpolate = function (p1, p2, f) {
                p1 = strict(p1, Point);
                p2 = strict(p2, Point);
                f = (+(f));
                var f1 = 1 - f;
                return new Point(p1.x * f + p2.x * f1, p1.y * f + p2.y * f1);
            };
            Point.distance = function (p1, p2) {
                p1 = strict(p1, Point);
                p2 = strict(p2, Point);
                var dx = p2.x - p1.x;
                var dy = p2.y - p1.y;
                return dx == 0 ? Math.abs(dy) : dy == 0 ? Math.abs(dx) : Math.sqrt(dx * dx + dy * dy);
            };
            Point.polar = function (length, angle) {
                length = (+(length));
                angle = (+(angle));
                return new Point(length * Math.cos(angle), length * Math.sin(angle));
            };
            Object.defineProperty(Point.prototype, "length", {
                get: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                },
                enumerable: true,
                configurable: true
            });
            Point.prototype.clone = function () {
                return new Point(this.x, this.y);
            };
            Point.prototype.offset = function (dx, dy) {
                dx = (+(dx));
                dy = (+(dy));
                this.__offset(dx, dy);
            };
            Point.prototype.equals = function (toCompare) {
                toCompare = strict(toCompare, Point);
                this.__equals(toCompare);
            };
            Point.prototype.subtract = function (v) {
                v = strict(v, Point);
                return new Point(this.x - v.x, this.y - v.y);
            };
            Point.prototype.add = function (v) {
                v = strict(v, Point);
                return new Point(v.x + this.x, v.y + this.y);
            };
            Point.prototype.normalize = function (thickness) {
                thickness = (+(thickness));
                if (this.x == 0 && this.y == 0) {
                    return;
                }
                var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
                this.x *= norm;
                this.y *= norm;
            };
            Point.prototype.toString = function () {
                return '(x=' + this.x + ', y=' + this.y + ')';
            };
            Point.prototype.copyFrom = function (sourcePoint) {
                sourcePoint = strict(sourcePoint, Point);
                this.__copyFrom(sourcePoint);
            };
            Point.prototype.setTo = function (xa, ya) {
                xa = (+(xa));
                ya = (+(ya));
                this.__setTo(xa, ya);
            };
            Point.prototype.__setTo = function (xa, ya) {
                this.x = xa;
                this.y = ya;
            };
            Point.prototype.__equals = function (toCompare) {
                return toCompare != null && toCompare.x == this.x && toCompare.y == this.y;
            };
            Point.prototype.__copyFrom = function (sourcePoint) {
                this.x = sourcePoint.x;
                this.y = sourcePoint.y;
            };
            Point.prototype.__offset = function (dx, dy) {
                this.x += dx;
                this.y += dy;
            };
            Point.__pool = asc.sti(Point, function () { Point.__pool = new geom.ObjectPool(function () { return new Point; }.__bind(_this), function (p) { p.x = p.y = 0; }.__bind(_this)); });
            return Point;
        }());
        geom.Point = Point;
    })(geom = flash.geom || (flash.geom = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Point.js.map