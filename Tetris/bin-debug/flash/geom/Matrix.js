var flash;
(function (flash) {
    var geom;
    (function (geom) {
        var _this = this;
        geom.ObjectPool = flash.__native.utils.ObjectPool;
        var Matrix = (function () {
            function Matrix(a, b, c, d, tx, ty) {
                if (a === void 0) { a = 1; }
                if (b === void 0) { b = 0; }
                if (c === void 0) { c = 0; }
                if (d === void 0) { d = 1; }
                if (tx === void 0) { tx = 0; }
                if (ty === void 0) { ty = 0; }
                this.a = NaN;
                this.b = NaN;
                this.c = NaN;
                this.d = NaN;
                this.tx = NaN;
                this.ty = NaN;
                a = (+(a));
                b = (+(b));
                c = (+(c));
                d = (+(d));
                tx = (+(tx));
                ty = (+(ty));
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.tx = tx;
                this.ty = ty;
            }
            Matrix.prototype.clone = function () {
                return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
            };
            Matrix.prototype.concat = function (m) {
                m = strict(m, Matrix);
                this.__concat(m);
            };
            Matrix.prototype.invert = function () {
                if (this.b == 0 && this.c == 0) {
                    this.a = 1 / this.a;
                    this.d = 1 / this.d;
                    this.tx *= -this.a;
                    this.ty *= -this.d;
                }
                else {
                    var det = this.a * this.d - this.b * this.c;
                    if (det == 0) {
                        this.a = this.d = 1;
                        this.b = this.c = 0;
                        this.tx = this.ty = 0;
                    }
                    else {
                        det = 1 / det;
                        var t0 = this.a;
                        var t1 = this.b;
                        var t2 = this.c;
                        var t3 = this.d;
                        this.a = t3 * det;
                        this.b = -t1 * det;
                        this.c = -t2 * det;
                        this.d = t0 * det;
                        t0 = -(this.b * this.tx + this.d * this.ty);
                        this.tx = -(this.a * this.tx + this.c * this.ty);
                        this.ty = (+(t0));
                    }
                }
            };
            Matrix.prototype.identity = function () {
                this.a = this.d = 1;
                this.b = this.c = 0;
                this.tx = this.ty = 0;
            };
            Matrix.prototype.createBox = function (scaleX, scaleY, rotation, tx, ty) {
                if (rotation === void 0) { rotation = 0; }
                if (tx === void 0) { tx = 0; }
                if (ty === void 0) { ty = 0; }
                scaleX = (+(scaleX));
                scaleY = (+(scaleY));
                rotation = (+(rotation));
                tx = (+(tx));
                ty = (+(ty));
                var u = Math.cos(rotation);
                var v = Math.sin(rotation);
                this.a = u * scaleX;
                this.b = v * scaleY;
                this.c = -v * scaleX;
                this.d = u * scaleY;
                this.tx = tx;
                this.ty = ty;
            };
            Matrix.prototype.createGradientBox = function (width, height, rotation, tx, ty) {
                if (rotation === void 0) { rotation = 0; }
                if (tx === void 0) { tx = 0; }
                if (ty === void 0) { ty = 0; }
                width = (+(width));
                height = (+(height));
                rotation = (+(rotation));
                tx = (+(tx));
                ty = (+(ty));
                this.createBox(width / 1638.4, height / 1638.4, rotation, tx + width / 2, ty + height / 2);
            };
            Matrix.prototype.rotate = function (angle) {
                angle = (+(angle));
                var u = Math.cos(angle);
                var v = Math.sin(angle);
                var t0 = this.a;
                var t1 = this.c;
                var t2 = this.tx;
                this.a = u * this.a - v * this.b;
                this.b = v * t0 + u * this.b;
                this.c = u * this.c - v * this.d;
                this.d = v * t1 + u * this.d;
                this.tx = u * this.tx - v * this.ty;
                this.ty = v * t2 + u * this.ty;
            };
            Matrix.prototype.translate = function (dx, dy) {
                dx = (+(dx));
                dy = (+(dy));
                this.__translate(dx, dy);
            };
            Matrix.prototype.scale = function (sx, sy) {
                sx = (+(sx));
                sy = (+(sy));
                this.__scale(sx, sy);
            };
            Matrix.prototype.deltaTransformPoint = function (point) {
                point = strict(point, geom.Point);
                return this.__deltaTransformPointInPlace(point.clone());
            };
            Matrix.prototype.transformPoint = function (point) {
                point = strict(point, geom.Point);
                return new geom.Point(this.a * point.x + this.c * point.y + this.tx, this.d * point.y + this.b * point.x + this.ty);
            };
            Matrix.prototype.toString = function () {
                return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
            };
            Matrix.prototype.copyFrom = function (sourceMatrix) {
                sourceMatrix = strict(sourceMatrix, Matrix);
                this.__copyFrom(sourceMatrix);
            };
            Matrix.prototype.setTo = function (aa, ba, ca, da, txa, tya) {
                aa = (+(aa));
                ba = (+(ba));
                ca = (+(ca));
                da = (+(da));
                txa = (+(txa));
                tya = (+(tya));
                this.__setTo(aa, ba, ca, da, txa, tya);
            };
            Matrix.prototype.copyRowTo = function (row, vector3D) {
                row = ((row) >>> 0);
                vector3D = strict(vector3D, geom.Vector3D);
                switch (row) {
                    case 0:
                        break;
                    case 1:
                        vector3D.x = this.b;
                        vector3D.y = this.d;
                        vector3D.z = this.ty;
                        break;
                    case 2:
                    case 3:
                        vector3D.x = 0;
                        vector3D.y = 0;
                        vector3D.z = 1;
                        break;
                    default:
                        vector3D.x = this.a;
                        vector3D.y = this.c;
                        vector3D.z = this.tx;
                }
            };
            Matrix.prototype.copyColumnTo = function (column, vector3D) {
                column = ((column) >>> 0);
                vector3D = strict(vector3D, geom.Vector3D);
                switch (column) {
                    case 0:
                        break;
                    case 1:
                        vector3D.x = this.c;
                        vector3D.y = this.d;
                        vector3D.z = 0;
                        break;
                    case 2:
                    case 3:
                        vector3D.x = this.tx;
                        vector3D.y = this.ty;
                        vector3D.z = 1;
                        break;
                    default:
                        vector3D.x = this.a;
                        vector3D.y = this.b;
                        vector3D.z = 0;
                }
            };
            Matrix.prototype.copyRowFrom = function (row, vector3D) {
                row = ((row) >>> 0);
                vector3D = strict(vector3D, geom.Vector3D);
                switch (row) {
                    case 0:
                        break;
                    case 1:
                    case 2:
                        this.b = vector3D.x;
                        this.d = vector3D.y;
                        this.ty = vector3D.z;
                        break;
                    default:
                        this.a = vector3D.x;
                        this.c = vector3D.y;
                        this.tx = vector3D.z;
                }
            };
            Matrix.prototype.copyColumnFrom = function (column, vector3D) {
                column = ((column) >>> 0);
                vector3D = strict(vector3D, geom.Vector3D);
                switch (column) {
                    case 0:
                        break;
                    case 1:
                    case 2:
                        this.b = vector3D.x;
                        this.d = vector3D.y;
                        this.ty = vector3D.z;
                        break;
                    default:
                        this.a = vector3D.x;
                        this.c = vector3D.y;
                        this.tx = vector3D.z;
                }
            };
            Matrix.prototype.__copyFrom = function (sourceMatrix, withPosition) {
                if (withPosition === void 0) { withPosition = true; }
                this.a = sourceMatrix.a;
                this.b = sourceMatrix.b;
                this.c = sourceMatrix.c;
                this.d = sourceMatrix.d;
                if (withPosition) {
                    this.tx = sourceMatrix.tx;
                    this.ty = sourceMatrix.ty;
                }
                else {
                    this.tx = this.ty = 0;
                }
            };
            Matrix.prototype.__translate = function (dx, dy) {
                this.tx += dx;
                this.ty += dy;
            };
            Matrix.prototype.__translateTransformed = function (dx, dy) {
                this.tx = dx * this.a + dy * this.c + this.tx;
                this.ty = dx * this.b + dy * this.d + this.ty;
            };
            Matrix.prototype.__transformRectangleInPlace = function (rect) {
                var left = rect.left, top = rect.top, right = rect.right, bottom = rect.bottom;
                var x1 = this.a * left + this.c * top + this.tx;
                var x2 = this.a * right + this.c * top + this.tx;
                var x3 = this.a * left + this.c * bottom + this.tx;
                var x4 = this.a * right + this.c * bottom + this.tx;
                var y1 = this.d * top + this.b * left + this.ty;
                var y2 = this.d * top + this.b * right + this.ty;
                var y3 = this.d * bottom + this.b * left + this.ty;
                var y4 = this.d * bottom + this.b * right + this.ty;
                left = Math.min(x1, x2, x3, x4);
                right = Math.max(x1, x2, x3, x4);
                top = Math.min(y1, y2, y3, y4);
                bottom = Math.max(y1, y2, y3, y4);
                rect.__setTo(left, top, right - left, bottom - top);
                return rect;
            };
            Matrix.prototype.__transformPointInPlace = function (point) {
                var x = point.x;
                var y = point.y;
                point.x = this.a * x + this.c * y + this.tx;
                point.y = this.d * y + this.b * x + this.ty;
                return point;
            };
            Matrix.prototype.__concat = function (m) {
                var t0 = this.a;
                this.a = this.a * m.a + this.b * m.c;
                this.b = t0 * m.b + this.b * m.d;
                t0 = this.c;
                this.c = this.c * m.a + this.d * m.c;
                this.d = t0 * m.b + this.d * m.d;
                t0 = this.tx;
                this.tx = this.tx * m.a + this.ty * m.c + m.tx;
                this.ty = t0 * m.b + this.ty * m.d + m.ty;
            };
            Matrix.prototype.__scale = function (sx, sy) {
                this.a *= sx;
                this.b *= sy;
                this.c *= sx;
                this.d *= sy;
                this.tx *= sx;
                this.ty *= sy;
            };
            Matrix.prototype.__getScaleX = function () {
                if (this.b == 0) {
                    return this.a;
                }
                return Math.sqrt(this.a * this.a + this.b * this.b);
            };
            Matrix.prototype.__getScaleY = function () {
                if (this.c == 0) {
                    return this.d;
                }
                return Math.sqrt(this.c * this.c + this.d * this.d);
            };
            Matrix.prototype.__setTo = function (aa, ba, ca, da, txa, tya) {
                this.a = aa;
                this.b = ba;
                this.c = ca;
                this.d = da;
                this.tx = txa;
                this.ty = tya;
            };
            Matrix.prototype.__equals = function (toCompare, withPosition) {
                if (withPosition === void 0) { withPosition = true; }
                return this === toCompare ||
                    this.a == toCompare.a && this.b == toCompare.b && this.c == toCompare.c && this.d == toCompare.d &&
                        (!withPosition || this.tx == toCompare.tx && this.ty == toCompare.ty);
            };
            Matrix.prototype.__isIdentical = function () {
                return this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1 && this.tx == 0 && this.ty == 0;
            };
            Matrix.prototype.__deltaTransformPointInPlace = function (point) {
                point.__setTo(this.a * point.x + this.c * point.y, this.d * point.y + this.b * point.x);
                return this;
            };
            Matrix.__pool = asc.sti(Matrix, function () { Matrix.__pool = new geom.ObjectPool(function () { return new Matrix; }.__bind(_this), function (m) { m.a = m.d = 1; m.b = m.c = 0; m.tx = m.ty = 0; }.__bind(_this)); });
            return Matrix;
        }());
        geom.Matrix = Matrix;
    })(geom = flash.geom || (flash.geom = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Matrix.js.map