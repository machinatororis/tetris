var flash;
(function (flash) {
    var geom;
    (function (geom) {
        var Vector3D = (function () {
            function Vector3D(x, y, z, w) {
                if (x === void 0) { x = 0.0; }
                if (y === void 0) { y = 0.0; }
                if (z === void 0) { z = 0.0; }
                if (w === void 0) { w = 0.0; }
                this.x = NaN;
                this.y = NaN;
                this.z = NaN;
                this.w = NaN;
                x = (+(x));
                y = (+(y));
                z = (+(z));
                w = (+(w));
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
            Vector3D.angleBetween = function (a, b) {
                a = strict(a, Vector3D);
                b = strict(b, Vector3D);
                var la = a.length;
                var lb = b.length;
                var dot = a.dotProduct(b);
                if (la != 0) {
                    dot /= la;
                }
                if (lb != 0) {
                    dot /= lb;
                }
                return Math.acos(dot);
            };
            Vector3D.distance = function (pt1, pt2) {
                pt1 = strict(pt1, Vector3D);
                pt2 = strict(pt2, Vector3D);
                var x = pt2.x - pt1.x;
                var y = pt2.y - pt1.y;
                var z = pt2.z - pt1.z;
                return Math.sqrt(x * x + y * y + z * z);
            };
            Vector3D.prototype.clone = function () {
                return new Vector3D(this.x, this.y, this.z, this.w);
            };
            Vector3D.prototype.dotProduct = function (a) {
                a = strict(a, Vector3D);
                return this.x * a.x + this.y * a.y + this.z * a.z;
            };
            Vector3D.prototype.crossProduct = function (a) {
                a = strict(a, Vector3D);
                return new Vector3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x, 1);
            };
            Object.defineProperty(Vector3D.prototype, "length", {
                get: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector3D.prototype, "lengthSquared", {
                get: function () {
                    return this.x * this.x + this.y * this.y + this.z * this.z;
                },
                enumerable: true,
                configurable: true
            });
            Vector3D.prototype.normalize = function () {
                var l = this.length;
                if (l != 0) {
                    this.x /= l;
                    this.y /= l;
                    this.z /= l;
                }
                return l;
            };
            Vector3D.prototype.scaleBy = function (s) {
                s = (+(s));
                this.x *= s;
                this.y *= s;
                this.z *= s;
            };
            Vector3D.prototype.incrementBy = function (a) {
                a = strict(a, Vector3D);
                this.x += a.x;
                this.y += a.y;
                this.z += a.z;
            };
            Vector3D.prototype.decrementBy = function (a) {
                a = strict(a, Vector3D);
                this.x -= a.x;
                this.y -= a.y;
                this.z -= a.z;
            };
            Vector3D.prototype.add = function (a) {
                a = strict(a, Vector3D);
                return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z);
            };
            Vector3D.prototype.subtract = function (a) {
                a = strict(a, Vector3D);
                return new Vector3D(this.x - a.x, this.y - a.y, this.z - a.z);
            };
            Vector3D.prototype.negate = function () {
                this.x *= -1;
                this.y *= -1;
                this.z *= -1;
            };
            Vector3D.prototype.equals = function (toCompare, allFour) {
                if (allFour === void 0) { allFour = false; }
                toCompare = strict(toCompare, Vector3D);
                allFour = Boolean(allFour);
                return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w);
            };
            Vector3D.prototype.nearEquals = function (toCompare, tolerance, allFour) {
                if (allFour === void 0) { allFour = false; }
                toCompare = strict(toCompare, Vector3D);
                tolerance = (+(tolerance));
                allFour = Boolean(allFour);
                return Math.abs(this.x - toCompare.x) < tolerance && Math.abs(this.y - toCompare.y) < tolerance && Math.abs(this.z - toCompare.z) < tolerance && (!allFour || Math.abs(this.w - toCompare.w) < tolerance);
            };
            Vector3D.prototype.project = function () {
                this.x /= this.w;
                this.y /= this.w;
                this.z /= this.w;
            };
            Vector3D.prototype.toString = function () {
                return 'Vector3D(' + this.x + ', ' + this.y + ', ' + this.z + ')';
            };
            Vector3D.prototype.copyFrom = function (sourceVector3D) {
                sourceVector3D = strict(sourceVector3D, Vector3D);
                this.x = sourceVector3D.x;
                this.y = sourceVector3D.y;
                this.z = sourceVector3D.z;
            };
            Vector3D.prototype.setTo = function (xa, ya, za) {
                xa = (+(xa));
                ya = (+(ya));
                za = (+(za));
                this.x = xa;
                this.y = ya;
                this.z = za;
            };
            Vector3D.X_AXIS = asc.sti(Vector3D, function () { Vector3D.X_AXIS = new Vector3D(1, 0, 0); });
            Vector3D.Y_AXIS = asc.sti(Vector3D, function () { Vector3D.Y_AXIS = new Vector3D(0, 1, 0); });
            Vector3D.Z_AXIS = asc.sti(Vector3D, function () { Vector3D.Z_AXIS = new Vector3D(0, 0, 1); });
            return Vector3D;
        }());
        geom.Vector3D = Vector3D;
    })(geom = flash.geom || (flash.geom = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Vector3D.js.map