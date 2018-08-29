var flash;
(function (flash) {
    var geom;
    (function (geom) {
        var _this = this;
        geom.ObjectPool = flash.__native.utils.ObjectPool;
        var Rectangle = (function () {
            function Rectangle(x, y, width, height) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                this.x = NaN;
                this.y = NaN;
                this.width = NaN;
                this.height = NaN;
                x = (+(x));
                y = (+(y));
                width = (+(width));
                height = (+(height));
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            }
            Object.defineProperty(Rectangle.prototype, "left", {
                get: function () {
                    return this.x;
                },
                set: function (value) {
                    value = (+(value));
                    this.width += this.x - (this.x = value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "right", {
                get: function () {
                    return this.x + this.width;
                },
                set: function (value) {
                    value = (+(value));
                    this.width = value - this.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "top", {
                get: function () {
                    return this.y;
                },
                set: function (value) {
                    value = (+(value));
                    this.height += this.y - (this.y = value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "bottom", {
                get: function () {
                    return this.y + this.height;
                },
                set: function (value) {
                    value = (+(value));
                    this.height = value - this.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "topLeft", {
                get: function () {
                    return new geom.Point(this.x, this.y);
                },
                set: function (value) {
                    value = strict(value, geom.Point);
                    this.top = value.y;
                    this.left = value.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "bottomRight", {
                get: function () {
                    return new geom.Point(this.x + this.width, this.y + this.height);
                },
                set: function (value) {
                    value = strict(value, geom.Point);
                    this.width = value.x - this.x;
                    this.height = value.y - this.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "size", {
                get: function () {
                    return new geom.Point(this.width, this.height);
                },
                set: function (value) {
                    value = strict(value, geom.Point);
                    this.width = value.x;
                    this.height = value.y;
                },
                enumerable: true,
                configurable: true
            });
            Rectangle.prototype.clone = function () {
                return new Rectangle(this.x, this.y, this.width, this.height);
            };
            Rectangle.prototype.isEmpty = function () {
                return this.width <= 0 || this.height <= 0;
            };
            Rectangle.prototype.setEmpty = function () {
                this.x = this.y = this.width = this.height = 0;
            };
            Rectangle.prototype.inflate = function (dx, dy) {
                dx = (+(dx));
                dy = (+(dy));
                this.__inflate(dx, dy);
            };
            Rectangle.prototype.pad = function (top, left, bottom, right) {
                top = (+(top));
                left = (+(left));
                bottom = (+(bottom));
                right = (+(right));
                this.x -= left;
                this.y -= top;
                this.width += left + right;
                this.height += top + bottom;
            };
            Rectangle.prototype.inflatePoint = function (point) {
                point = strict(point, geom.Point);
                this.__inflate(point.x, point.y);
            };
            Rectangle.prototype.offset = function (dx, dy) {
                dx = (+(dx));
                dy = (+(dy));
                this.x += dx;
                this.y += dy;
            };
            Rectangle.prototype.offsetPoint = function (point) {
                point = strict(point, geom.Point);
                this.__offsetPoint(point);
            };
            Rectangle.prototype.contains = function (x, y) {
                x = (+(x));
                y = (+(y));
                return x >= this.x && x < this.right &&
                    y >= this.y && y < this.bottom;
            };
            Rectangle.prototype.containsPoint = function (point) {
                point = strict(point, geom.Point);
                return this.__containsPoint(point);
            };
            Rectangle.prototype.containsRect = function (rect) {
                rect = strict(rect, Rectangle);
                var r1 = rect.x + rect.width;
                var b1 = rect.y + rect.height;
                var r2 = this.x + this.width;
                var b2 = this.y + this.height;
                return (rect.x >= this.x) &&
                    (rect.x < r2) &&
                    (rect.y >= this.y) &&
                    (rect.y < b2) &&
                    (r1 > this.x) &&
                    (r1 <= r2) &&
                    (b1 > this.y) &&
                    (b1 <= b2);
            };
            Rectangle.prototype.intersection = function (toIntersect) {
                toIntersect = strict(toIntersect, Rectangle);
                return this.clone().__intersectInPlace(toIntersect);
            };
            Rectangle.prototype.intersects = function (toIntersect) {
                toIntersect = strict(toIntersect, Rectangle);
                this.__intersects(toIntersect);
            };
            Rectangle.prototype.union = function (toUnion) {
                toUnion = strict(toUnion, Rectangle);
                return this.clone().__unionInPlace(toUnion);
            };
            Rectangle.prototype.equals = function (toCompare) {
                toCompare = strict(toCompare, Rectangle);
                this.__equals(toCompare);
            };
            Rectangle.prototype.toString = function () {
                return "(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")";
            };
            Rectangle.prototype.copyFrom = function (sourceRect) {
                sourceRect = strict(sourceRect, Rectangle);
                this.__copyFrom(sourceRect);
            };
            Rectangle.prototype.setTo = function (xa, ya, widtha, heighta) {
                xa = (+(xa));
                ya = (+(ya));
                widtha = (+(widtha));
                heighta = (+(heighta));
                this.__setTo(xa, ya, widtha, heighta);
            };
            Rectangle.prototype.__copyFrom = function (sourceRect) {
                this.x = sourceRect.x;
                this.y = sourceRect.y;
                this.width = sourceRect.width;
                this.height = sourceRect.height;
            };
            Rectangle.prototype.__setTo = function (xa, ya, widtha, heighta) {
                this.x = xa;
                this.y = ya;
                this.width = widtha;
                this.height = heighta;
            };
            Rectangle.prototype.__offsetPoint = function (point) {
                this.x += point.x;
                this.y += point.y;
            };
            Rectangle.prototype.__intersectInPlace = function (toIntersect) {
                var x0 = this.x < toIntersect.x ? toIntersect.x : this.x;
                var x1 = this.right > toIntersect.right ? toIntersect.right : this.right;
                if (x1 <= x0) {
                    this.setEmpty();
                    return this;
                }
                var y0 = this.y < toIntersect.y ? toIntersect.y : this.y;
                var y1 = this.bottom > toIntersect.bottom ? toIntersect.bottom : this.bottom;
                if (y1 <= y0) {
                    this.setEmpty();
                    return this;
                }
                this.__setTo(x0, y0, x1 - x0, y1 - y0);
                return this;
            };
            Rectangle.prototype.__unionInPlace = function (toUnion) {
                if (toUnion.isEmpty()) {
                    return this;
                }
                if (this.isEmpty()) {
                    this.__copyFrom(toUnion);
                    return this;
                }
                var l = Math.min(this.x, toUnion.x);
                var t = Math.min(this.y, toUnion.y);
                this.__setTo(l, t, Math.max(this.right, toUnion.right) - l, Math.max(this.bottom, toUnion.bottom) - t);
                return this;
            };
            Rectangle.prototype.__inflate = function (dx, dy) {
                this.x -= dx;
                this.width += dx * 2;
                this.y -= dy;
                this.height += dy * 2;
            };
            Rectangle.prototype.__inflateCeil = function (dx, dy) {
                this.__inflate(dx, dy);
                this.x = this.x >= 0 ? this.x | 0 : Math.floor(this.x);
                this.y = this.y >= 0 ? this.y | 0 : Math.floor(this.y);
                this.width = Math.ceil(this.width);
                this.height = Math.ceil(this.height);
            };
            Rectangle.prototype.__intersects = function (toIntersect) {
                return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right) &&
                    Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
            };
            Rectangle.prototype.__containsPoint = function (point) {
                var x = point.x, y = point.y;
                return x >= this.x && x < this.right &&
                    y >= this.y && y < this.bottom;
            };
            Rectangle.prototype.__equals = function (toCompare) {
                return this === toCompare ||
                    this.x == toCompare.x && this.y == toCompare.y
                        && this.width == toCompare.width && this.height == toCompare.height;
            };
            Rectangle.prototype.__transform = function (rect, m) {
                var tx0 = m.a * this.x + m.c * this.y;
                var tx1 = tx0;
                var ty0 = m.b * this.x + m.d * this.y;
                var ty1 = ty0;
                var tx = m.a * (this.x + this.width) + m.c * this.y;
                var ty = m.b * (this.x + this.width) + m.d * this.y;
                if (tx < tx0)
                    tx0 = tx;
                if (ty < ty0)
                    ty0 = ty;
                if (tx > tx1)
                    tx1 = tx;
                if (ty > ty1)
                    ty1 = ty;
                tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
                ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
                if (tx < tx0)
                    tx0 = tx;
                if (ty < ty0)
                    ty0 = ty;
                if (tx > tx1)
                    tx1 = tx;
                if (ty > ty1)
                    ty1 = ty;
                tx = m.a * this.x + m.c * (this.y + this.height);
                ty = m.b * this.x + m.d * (this.y + this.height);
                if (tx < tx0)
                    tx0 = tx;
                if (ty < ty0)
                    ty0 = ty;
                if (tx > tx1)
                    tx1 = tx;
                if (ty > ty1)
                    ty1 = ty;
                rect.__setTo(tx0 + m.tx, ty0 + m.ty, tx1 - tx0, ty1 - ty0);
            };
            Rectangle.prototype.__expand = function (x, y, width, height) {
                if (this.width == 0 && this.height == 0) {
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                    return;
                }
                var cacheRight = this.right;
                var cacheBottom = this.bottom;
                if (this.x > x) {
                    this.x = x;
                    this.width = (+(cacheRight - x));
                }
                if (this.y > y) {
                    this.y = y;
                    this.height = (+(cacheBottom - y));
                }
                if (cacheRight < x + width)
                    this.width = x + width - this.x;
                if (cacheBottom < y + height)
                    this.height = y + height - this.y;
            };
            Rectangle.prototype.__verify = function () {
                if (this.width < 0) {
                    this.x += this.width;
                    this.width *= -1;
                }
                if (this.height < 0) {
                    this.y += this.height;
                    this.height *= -1;
                }
                return this;
            };
            Rectangle.__pool = asc.sti(Rectangle, function () { Rectangle.__pool = new geom.ObjectPool(function () { return new Rectangle; }.__bind(_this), function (r) { r.x = r.y = r.width = r.height = 0; }.__bind(_this)); });
            return Rectangle;
        }());
        geom.Rectangle = Rectangle;
    })(geom = flash.geom || (flash.geom = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Rectangle.js.map