var flash;
(function (flash) {
    var geom;
    (function (geom) {
        var Matrix3D = (function () {
            function Matrix3D(v) {
                if (v === void 0) { v = null; }
                this.rawData = undefined;
                if (v != null && v.length == 16) {
                    this.rawData = v.concat();
                }
                else {
                    this.rawData = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0];
                }
            }
            Object.defineProperty(Matrix3D.prototype, "determinant", {
                get: function () {
                    return 1 * ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11])
                        - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7])
                        + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7])
                        + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3])
                        - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3])
                        + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "position", {
                get: function () {
                    return new geom.Vector3D(this.rawData[12], this.rawData[13], this.rawData[14]);
                },
                set: function (val) {
                    val = strict(val, geom.Vector3D);
                    this.rawData[12] = val.x;
                    this.rawData[13] = val.y;
                    this.rawData[14] = val.z;
                },
                enumerable: true,
                configurable: true
            });
            Matrix3D.prototype.append = function (lhs) {
                lhs = strict(lhs, Matrix3D);
                var m111 = (+(this.rawData[0])), m121 = (+(this.rawData[4])), m131 = (+(this.rawData[8])), m141 = (+(this.rawData[12])), m112 = (+(this.rawData[1])), m122 = (+(this.rawData[5])), m132 = (+(this.rawData[9])), m142 = (+(this.rawData[13])), m113 = (+(this.rawData[2])), m123 = (+(this.rawData[6])), m133 = (+(this.rawData[10])), m143 = (+(this.rawData[14])), m114 = (+(this.rawData[3])), m124 = (+(this.rawData[7])), m134 = (+(this.rawData[11])), m144 = (+(this.rawData[15])), m211 = (+(lhs.rawData[0])), m221 = (+(lhs.rawData[4])), m231 = (+(lhs.rawData[8])), m241 = (+(lhs.rawData[12])), m212 = (+(lhs.rawData[1])), m222 = (+(lhs.rawData[5])), m232 = (+(lhs.rawData[9])), m242 = (+(lhs.rawData[13])), m213 = (+(lhs.rawData[2])), m223 = (+(lhs.rawData[6])), m233 = (+(lhs.rawData[10])), m243 = (+(lhs.rawData[14])), m214 = (+(lhs.rawData[3])), m224 = (+(lhs.rawData[7])), m234 = (+(lhs.rawData[11])), m244 = (+(lhs.rawData[15]));
                this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
                this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
                this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
                this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
                this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
                this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
                this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
                this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
                this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
                this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
                this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
                this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
                this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
                this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
                this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
                this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
            };
            Matrix3D.prototype.appendRotation = function (degrees, axis, pivotPoint) {
                if (pivotPoint === void 0) { pivotPoint = null; }
                degrees = (+(degrees));
                axis = strict(axis, geom.Vector3D);
                pivotPoint = strict(pivotPoint, geom.Vector3D);
                var tx = NaN, ty = NaN, tz = NaN;
                tx = ty = tz = 0;
                if (pivotPoint != null) {
                    tx = pivotPoint.x;
                    ty = pivotPoint.y;
                    tz = pivotPoint.z;
                }
                var radian = degrees * Math.PI / 180;
                var cos = Math.cos(radian);
                var sin = Math.sin(radian);
                var x = axis.x;
                var y = axis.y;
                var z = axis.z;
                var x2 = x * x;
                var y2 = y * y;
                var z2 = z * z;
                var ls = x2 + y2 + z2;
                if (ls != 0) {
                    var l = Math.sqrt(ls);
                    x /= l;
                    y /= l;
                    z /= l;
                    x2 /= ls;
                    y2 /= ls;
                    z2 /= ls;
                }
                var ccos = 1 - cos;
                var m = new Matrix3D();
                var d = m.rawData;
                d[0] = x2 + (y2 + z2) * cos;
                d[1] = x * y * ccos + z * sin;
                d[2] = x * z * ccos - y * sin;
                d[4] = x * y * ccos - z * sin;
                d[5] = y2 + (x2 + z2) * cos;
                d[6] = y * z * ccos + x * sin;
                d[8] = x * z * ccos + y * sin;
                d[9] = y * z * ccos - x * sin;
                d[10] = z2 + (x2 + y2) * cos;
                d[12] = (tx * (y2 + z2) - x * (ty * y + tz * z)) * ccos + (ty * z - tz * y) * sin;
                d[13] = (ty * (x2 + z2) - y * (tx * x + tz * z)) * ccos + (tz * x - tx * z) * sin;
                d[14] = (tz * (x2 + y2) - z * (tx * x + ty * y)) * ccos + (tx * y - ty * x) * sin;
                this.append(m);
            };
            Matrix3D.prototype.appendScale = function (xScale, yScale, zScale) {
                xScale = (+(xScale));
                yScale = (+(yScale));
                zScale = (+(zScale));
                this.append(new Matrix3D([xScale, 0.0, 0.0, 0.0, 0.0, yScale, 0.0, 0.0, 0.0, 0.0, zScale, 0.0, 0.0, 0.0, 0.0, 1.0]));
            };
            Matrix3D.prototype.appendTranslation = function (x, y, z) {
                x = (+(x));
                y = (+(y));
                z = (+(z));
                this.rawData[12] += x;
                this.rawData[13] += y;
                this.rawData[14] += z;
            };
            Matrix3D.prototype.clone = function () {
                return new Matrix3D(this.rawData.concat());
            };
            Matrix3D.prototype.copyColumnFrom = function (column, vector3D) {
                column = ((column) >> 0);
                vector3D = strict(vector3D, geom.Vector3D);
                switch (column) {
                    case 0:
                        this.rawData[0] = vector3D.x;
                        this.rawData[1] = vector3D.y;
                        this.rawData[2] = vector3D.z;
                        this.rawData[3] = vector3D.w;
                        break;
                    case 1:
                        this.rawData[4] = vector3D.x;
                        this.rawData[5] = vector3D.y;
                        this.rawData[6] = vector3D.z;
                        this.rawData[7] = vector3D.w;
                        break;
                    case 2:
                        this.rawData[8] = vector3D.x;
                        this.rawData[9] = vector3D.y;
                        this.rawData[10] = vector3D.z;
                        this.rawData[11] = vector3D.w;
                        break;
                    case 3:
                        this.rawData[12] = vector3D.x;
                        this.rawData[13] = vector3D.y;
                        this.rawData[14] = vector3D.z;
                        this.rawData[15] = vector3D.w;
                        break;
                }
            };
            Matrix3D.prototype.copyColumnTo = function (column, vector3D) {
                column = ((column) >> 0);
                vector3D = strict(vector3D, geom.Vector3D);
                switch (column) {
                    case 0:
                        vector3D.x = (+(this.rawData[0]));
                        vector3D.y = (+(this.rawData[1]));
                        vector3D.z = (+(this.rawData[2]));
                        vector3D.w = (+(this.rawData[3]));
                        break;
                    case 1:
                        vector3D.x = (+(this.rawData[4]));
                        vector3D.y = (+(this.rawData[5]));
                        vector3D.z = (+(this.rawData[6]));
                        vector3D.w = (+(this.rawData[7]));
                        break;
                    case 2:
                        vector3D.x = (+(this.rawData[8]));
                        vector3D.y = (+(this.rawData[9]));
                        vector3D.z = (+(this.rawData[10]));
                        vector3D.w = (+(this.rawData[11]));
                        break;
                    case 3:
                        vector3D.x = (+(this.rawData[12]));
                        vector3D.y = (+(this.rawData[13]));
                        vector3D.z = (+(this.rawData[14]));
                        vector3D.w = (+(this.rawData[15]));
                        break;
                }
            };
            Matrix3D.prototype.copyFrom = function (other) {
                other = strict(other, Matrix3D);
                this.rawData = other.rawData.concat();
            };
            Matrix3D.prototype.copyRawDataFrom = function (vector, index, transpose) {
                if (index === void 0) { index = 0; }
                if (transpose === void 0) { transpose = false; }
                index = ((index) >>> 0);
                transpose = Boolean(transpose);
                if (transpose) {
                    this.transpose();
                }
                var length = vector.length - index;
                for (var i = 0; i < length; ++i) {
                    this.rawData[i] = vector[i + index];
                }
                if (transpose) {
                    this.transpose();
                }
            };
            Matrix3D.prototype.copyRawDataTo = function (vector, index, transpose) {
                if (index === void 0) { index = 0; }
                if (transpose === void 0) { transpose = false; }
                index = ((index) >>> 0);
                transpose = Boolean(transpose);
                if (transpose) {
                    this.transpose();
                }
                var length = this.rawData.length;
                for (var i = 0; i < length; ++i) {
                    vector[i + index] = this.rawData[i];
                }
                if (transpose) {
                    this.transpose();
                }
            };
            Matrix3D.prototype.copyRowFrom = function (row, vector3D) {
                row = ((row) >>> 0);
                vector3D = strict(vector3D, geom.Vector3D);
                switch (row) {
                    case 0:
                        this.rawData[0] = vector3D.x;
                        this.rawData[4] = vector3D.y;
                        this.rawData[8] = vector3D.z;
                        this.rawData[12] = vector3D.w;
                        break;
                    case 1:
                        this.rawData[1] = vector3D.x;
                        this.rawData[5] = vector3D.y;
                        this.rawData[9] = vector3D.z;
                        this.rawData[13] = vector3D.w;
                        break;
                    case 2:
                        this.rawData[2] = vector3D.x;
                        this.rawData[6] = vector3D.y;
                        this.rawData[10] = vector3D.z;
                        this.rawData[14] = vector3D.w;
                        break;
                    case 3:
                        this.rawData[3] = vector3D.x;
                        this.rawData[7] = vector3D.y;
                        this.rawData[11] = vector3D.z;
                        this.rawData[15] = vector3D.w;
                        break;
                }
            };
            Matrix3D.prototype.copyRowTo = function (row, vector3D) {
                row = ((row) >> 0);
                vector3D = strict(vector3D, geom.Vector3D);
                switch (row) {
                    case 0:
                        vector3D.x = (+(this.rawData[0]));
                        vector3D.y = (+(this.rawData[4]));
                        vector3D.z = (+(this.rawData[8]));
                        vector3D.w = (+(this.rawData[12]));
                        break;
                    case 1:
                        vector3D.x = (+(this.rawData[1]));
                        vector3D.y = (+(this.rawData[5]));
                        vector3D.z = (+(this.rawData[9]));
                        vector3D.w = (+(this.rawData[13]));
                        break;
                    case 2:
                        vector3D.x = (+(this.rawData[2]));
                        vector3D.y = (+(this.rawData[6]));
                        vector3D.z = (+(this.rawData[10]));
                        vector3D.w = (+(this.rawData[14]));
                        break;
                    case 3:
                        vector3D.x = (+(this.rawData[3]));
                        vector3D.y = (+(this.rawData[7]));
                        vector3D.z = (+(this.rawData[11]));
                        vector3D.w = (+(this.rawData[15]));
                        break;
                }
            };
            Matrix3D.prototype.copyToMatrix3D = function (other) {
                other = strict(other, Matrix3D);
                other.rawData = this.rawData.concat();
            };
            Matrix3D.create2D = function (x, y, scale, rotation) {
                if (scale === void 0) { scale = 1; }
                if (rotation === void 0) { rotation = 0; }
                x = (+(x));
                y = (+(y));
                scale = (+(scale));
                rotation = (+(rotation));
                var theta = rotation * Math.PI / 180.0;
                var c = Math.cos(theta);
                var s = Math.sin(theta);
                return new Matrix3D([c * scale, -s * scale, 0, 0, s * scale, c * scale, 0, 0, 0, 0, 1, 0, x, y, 0, 1]);
            };
            Matrix3D.createABCD = function (a, b, c, d, tx, ty) {
                a = (+(a));
                b = (+(b));
                c = (+(c));
                d = (+(d));
                tx = (+(tx));
                ty = (+(ty));
                return new Matrix3D([a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1]);
            };
            Matrix3D.createOrtho = function (x0, x1, y0, y1, zNear, zFar) {
                x0 = (+(x0));
                x1 = (+(x1));
                y0 = (+(y0));
                y1 = (+(y1));
                zNear = (+(zNear));
                zFar = (+(zFar));
                var sx = 1.0 / (x1 - x0);
                var sy = 1.0 / (y1 - y0);
                var sz = 1.0 / (zFar - zNear);
                return new Matrix3D([2.0 * sx, 0, 0, 0, 0, 2.0 * sy, 0, 0, 0, 0, -2.0 * sz, 0, -(x0 + x1) * sx, -(y0 + y1) * sy, -(zNear + zFar) * sz, 1]);
            };
            Matrix3D.prototype.decompose = function (orientationStyle) {
                if (orientationStyle === void 0) { orientationStyle = null; }
                orientationStyle = as(orientationStyle, 'String');
                if (orientationStyle == null) {
                    orientationStyle = geom.Orientation3D.EULER_ANGLES;
                }
                var vec = new Array();
                var m = this.clone();
                var mr = m.rawData.concat();
                var pos = new geom.Vector3D(mr[12], mr[13], mr[14]);
                mr[12] = 0;
                mr[13] = 0;
                mr[14] = 0;
                var scale = new geom.Vector3D();
                scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
                scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
                scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);
                if (mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0) {
                    scale.z = -scale.z;
                }
                mr[0] /= scale.x;
                mr[1] /= scale.x;
                mr[2] /= scale.x;
                mr[4] /= scale.y;
                mr[5] /= scale.y;
                mr[6] /= scale.y;
                mr[8] /= scale.z;
                mr[9] /= scale.z;
                mr[10] /= scale.z;
                var rot = new geom.Vector3D();
                switch (orientationStyle) {
                    case geom.Orientation3D.AXIS_ANGLE:
                        rot.w = Math.acos((mr[0] + mr[5] + mr[10] - 1) / 2);
                        var len = Math.sqrt((mr[6] - mr[9]) * (mr[6] - mr[9]) + (mr[8] - mr[2]) * (mr[8] - mr[2]) + (mr[1] - mr[4]) * (mr[1] - mr[4]));
                        if (len != 0) {
                            rot.x = (mr[6] - mr[9]) / len;
                            rot.y = (mr[8] - mr[2]) / len;
                            rot.z = (mr[1] - mr[4]) / len;
                        }
                        else {
                            rot.x = rot.y = rot.z = 0;
                        }
                        break;
                    case geom.Orientation3D.QUATERNION:
                        var tr = mr[0] + mr[5] + mr[10];
                        if (tr > 0) {
                            rot.w = Math.sqrt(1 + tr) / 2;
                            rot.x = (mr[6] - mr[9]) / (4 * rot.w);
                            rot.y = (mr[8] - mr[2]) / (4 * rot.w);
                            rot.z = (mr[1] - mr[4]) / (4 * rot.w);
                        }
                        else if ((mr[0] > mr[5]) && (mr[0] > mr[10])) {
                            rot.x = Math.sqrt(1 + mr[0] - mr[5] - mr[10]) / 2;
                            rot.w = (mr[6] - mr[9]) / (4 * rot.x);
                            rot.y = (mr[1] + mr[4]) / (4 * rot.x);
                            rot.z = (mr[8] + mr[2]) / (4 * rot.x);
                        }
                        else if (mr[5] > mr[10]) {
                            rot.y = Math.sqrt(1 + mr[5] - mr[0] - mr[10]) / 2;
                            rot.x = (mr[1] + mr[4]) / (4 * rot.y);
                            rot.w = (mr[8] - mr[2]) / (4 * rot.y);
                            rot.z = (mr[6] + mr[9]) / (4 * rot.y);
                        }
                        else {
                            rot.z = Math.sqrt(1 + mr[10] - mr[0] - mr[5]) / 2;
                            rot.x = (mr[8] + mr[2]) / (4 * rot.z);
                            rot.y = (mr[6] + mr[9]) / (4 * rot.z);
                            rot.w = (mr[1] - mr[4]) / (4 * rot.z);
                        }
                        break;
                    case geom.Orientation3D.EULER_ANGLES:
                        rot.y = Math.asin(-mr[2]);
                        if (mr[2] != 1 && mr[2] != -1) {
                            rot.x = Math.atan2(mr[6], mr[10]);
                            rot.z = Math.atan2(mr[1], mr[0]);
                        }
                        else {
                            rot.z = 0;
                            rot.x = Math.atan2(mr[4], mr[5]);
                        }
                        break;
                }
                vec.push(pos);
                vec.push(rot);
                vec.push(scale);
                return vec;
            };
            Matrix3D.prototype.deltaTransformVector = function (v) {
                v = strict(v, geom.Vector3D);
                var x = v.x, y = v.y, z = v.z;
                return new geom.Vector3D((x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[3]), (x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[7]), (x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[11]), 0);
            };
            Matrix3D.prototype.identity = function () {
                this.rawData = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0];
            };
            Matrix3D.prototype.interpolateTo = function (toMat, percent) {
                toMat = strict(toMat, Matrix3D);
                percent = (+(percent));
                for (var i = 0; i < 16; ++i) {
                    this.rawData[i] = this.rawData[i] + (toMat.rawData[i] - this.rawData[i]) * percent;
                }
            };
            Matrix3D.prototype.invert = function () {
                var d = this.determinant;
                var invertable = Math.abs(d) > 0.00000000001;
                if (invertable) {
                    d = 1 / d;
                    var m11 = (+(this.rawData[0]));
                    var m21 = (+(this.rawData[4]));
                    var m31 = (+(this.rawData[8]));
                    var m41 = (+(this.rawData[12]));
                    var m12 = (+(this.rawData[1]));
                    var m22 = (+(this.rawData[5]));
                    var m32 = (+(this.rawData[9]));
                    var m42 = (+(this.rawData[13]));
                    var m13 = (+(this.rawData[2]));
                    var m23 = (+(this.rawData[6]));
                    var m33 = (+(this.rawData[10]));
                    var m43 = (+(this.rawData[14]));
                    var m14 = (+(this.rawData[3]));
                    var m24 = (+(this.rawData[7]));
                    var m34 = (+(this.rawData[11]));
                    var m44 = (+(this.rawData[15]));
                    this.rawData[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
                    this.rawData[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
                    this.rawData[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
                    this.rawData[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
                    this.rawData[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
                    this.rawData[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
                    this.rawData[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
                    this.rawData[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
                    this.rawData[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
                    this.rawData[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
                    this.rawData[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
                    this.rawData[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
                    this.rawData[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
                    this.rawData[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
                    this.rawData[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
                    this.rawData[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
                }
                return invertable;
            };
            Matrix3D.prototype.pointAt = function (pos, at, up) {
                if (at === void 0) { at = null; }
                if (up === void 0) { up = null; }
                pos = strict(pos, geom.Vector3D);
                at = strict(at, geom.Vector3D);
                up = strict(up, geom.Vector3D);
                if (at == null) {
                    at = new geom.Vector3D(0, 0, -1);
                }
                if (up == null) {
                    up = new geom.Vector3D(0, -1, 0);
                }
                var dir = at.subtract(pos);
                var vup = up.clone();
                var right;
                dir.normalize();
                vup.normalize();
                var dir2 = dir.clone();
                dir2.scaleBy(vup.dotProduct(dir));
                vup = vup.subtract(dir2);
                if (vup.length > 0) {
                    vup.normalize();
                }
                else {
                    if (dir.x != 0) {
                        vup = new geom.Vector3D(-dir.y, dir.x, 0);
                    }
                    else {
                        vup = new geom.Vector3D(1, 0, 0);
                    }
                }
                right = strict(vup.crossProduct(dir), geom.Vector3D);
                right.normalize();
                this.rawData[0] = right.x;
                this.rawData[4] = right.y;
                this.rawData[8] = right.z;
                this.rawData[12] = 0.0;
                this.rawData[1] = vup.x;
                this.rawData[5] = vup.y;
                this.rawData[9] = vup.z;
                this.rawData[13] = 0.0;
                this.rawData[2] = dir.x;
                this.rawData[6] = dir.y;
                this.rawData[10] = dir.z;
                this.rawData[14] = 0.0;
                this.rawData[3] = pos.x;
                this.rawData[7] = pos.y;
                this.rawData[11] = pos.z;
                this.rawData[15] = 1.0;
            };
            Matrix3D.prototype.prepend = function (rhs) {
                rhs = strict(rhs, Matrix3D);
                var m111 = (+(rhs.rawData[0])), m121 = (+(rhs.rawData[4])), m131 = (+(rhs.rawData[8])), m141 = (+(rhs.rawData[12])), m112 = (+(rhs.rawData[1])), m122 = (+(rhs.rawData[5])), m132 = (+(rhs.rawData[9])), m142 = (+(rhs.rawData[13])), m113 = (+(rhs.rawData[2])), m123 = (+(rhs.rawData[6])), m133 = (+(rhs.rawData[10])), m143 = (+(rhs.rawData[14])), m114 = (+(rhs.rawData[3])), m124 = (+(rhs.rawData[7])), m134 = (+(rhs.rawData[11])), m144 = (+(rhs.rawData[15])), m211 = (+(this.rawData[0])), m221 = (+(this.rawData[4])), m231 = (+(this.rawData[8])), m241 = (+(this.rawData[12])), m212 = (+(this.rawData[1])), m222 = (+(this.rawData[5])), m232 = (+(this.rawData[9])), m242 = (+(this.rawData[13])), m213 = (+(this.rawData[2])), m223 = (+(this.rawData[6])), m233 = (+(this.rawData[10])), m243 = (+(this.rawData[14])), m214 = (+(this.rawData[3])), m224 = (+(this.rawData[7])), m234 = (+(this.rawData[11])), m244 = (+(this.rawData[15]));
                this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
                this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
                this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
                this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
                this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
                this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
                this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
                this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
                this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
                this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
                this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
                this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
                this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
                this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
                this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
                this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
            };
            Matrix3D.prototype.prependRotation = function (degrees, axis, pivotPoint) {
                if (pivotPoint === void 0) { pivotPoint = null; }
                degrees = (+(degrees));
                axis = strict(axis, geom.Vector3D);
                pivotPoint = strict(pivotPoint, geom.Vector3D);
                var tx = NaN, ty = NaN, tz = NaN;
                tx = ty = tz = 0;
                if (pivotPoint != null) {
                    tx = pivotPoint.x;
                    ty = pivotPoint.y;
                    tz = pivotPoint.z;
                }
                var radian = degrees * Math.PI / 180;
                var cos = Math.cos(radian);
                var sin = Math.sin(radian);
                var x = axis.x;
                var y = axis.y;
                var z = axis.z;
                var x2 = x * x;
                var y2 = y * y;
                var z2 = z * z;
                var ls = x2 + y2 + z2;
                if (ls != 0) {
                    var l = Math.sqrt(ls);
                    x /= l;
                    y /= l;
                    z /= l;
                    x2 /= ls;
                    y2 /= ls;
                    z2 /= ls;
                }
                var ccos = 1 - cos;
                var m = new Matrix3D();
                var d = m.rawData;
                d[0] = x2 + (y2 + z2) * cos;
                d[1] = x * y * ccos + z * sin;
                d[2] = x * z * ccos - y * sin;
                d[4] = x * y * ccos - z * sin;
                d[5] = y2 + (x2 + z2) * cos;
                d[6] = y * z * ccos + x * sin;
                d[8] = x * z * ccos + y * sin;
                d[9] = y * z * ccos - x * sin;
                d[10] = z2 + (x2 + y2) * cos;
                d[12] = (tx * (y2 + z2) - x * (ty * y + tz * z)) * ccos + (ty * z - tz * y) * sin;
                d[13] = (ty * (x2 + z2) - y * (tx * x + tz * z)) * ccos + (tz * x - tx * z) * sin;
                d[14] = (tz * (x2 + y2) - z * (tx * x + ty * y)) * ccos + (tx * y - ty * x) * sin;
                this.prepend(m);
            };
            Matrix3D.prototype.prependScale = function (xScale, yScale, zScale) {
                xScale = (+(xScale));
                yScale = (+(yScale));
                zScale = (+(zScale));
                this.prepend(new Matrix3D([xScale, 0.0, 0.0, 0.0, 0.0, yScale, 0.0, 0.0, 0.0, 0.0, zScale, 0.0, 0.0, 0.0, 0.0, 1.0]));
            };
            Matrix3D.prototype.prependTranslation = function (x, y, z) {
                x = (+(x));
                y = (+(y));
                z = (+(z));
                var m = new Matrix3D();
                m.position = new geom.Vector3D(x, y, z);
                this.prepend(m);
            };
            Matrix3D.prototype.recompose = function (components, orientationStyle) {
                if (orientationStyle === void 0) { orientationStyle = null; }
                orientationStyle = as(orientationStyle, 'String');
                if (components.length < 3 || components[2].x == 0 || components[2].y == 0 || components[2].z == 0) {
                    return false;
                }
                if (orientationStyle == null) {
                    orientationStyle = geom.Orientation3D.EULER_ANGLES;
                }
                this.identity();
                var scale = [];
                scale[0] = scale[1] = scale[2] = components[2].x;
                scale[4] = scale[5] = scale[6] = components[2].y;
                scale[8] = scale[9] = scale[10] = components[2].z;
                switch (orientationStyle) {
                    case geom.Orientation3D.EULER_ANGLES:
                        var cx = Math.cos(components[1].x);
                        var cy = Math.cos(components[1].y);
                        var cz = Math.cos(components[1].z);
                        var sx = Math.sin(components[1].x);
                        var sy = Math.sin(components[1].y);
                        var sz = Math.sin(components[1].z);
                        this.rawData[0] = cy * cz * scale[0];
                        this.rawData[1] = cy * sz * scale[1];
                        this.rawData[2] = -sy * scale[2];
                        this.rawData[3] = 0;
                        this.rawData[4] = (sx * sy * cz - cx * sz) * scale[4];
                        this.rawData[5] = (sx * sy * sz + cx * cz) * scale[5];
                        this.rawData[6] = sx * cy * scale[6];
                        this.rawData[7] = 0;
                        this.rawData[8] = (cx * sy * cz + sx * sz) * scale[8];
                        this.rawData[9] = (cx * sy * sz - sx * cz) * scale[9];
                        this.rawData[10] = cx * cy * scale[10];
                        this.rawData[11] = 0;
                        this.rawData[12] = components[0].x;
                        this.rawData[13] = components[0].y;
                        this.rawData[14] = components[0].z;
                        this.rawData[15] = 1;
                        break;
                    default:
                        var x = components[1].x;
                        var y = components[1].y;
                        var z = components[1].z;
                        var w = components[1].w;
                        if (orientationStyle == geom.Orientation3D.AXIS_ANGLE) {
                            x *= Math.sin(w / 2);
                            y *= Math.sin(w / 2);
                            z *= Math.sin(w / 2);
                            w = Math.cos(w / 2);
                        }
                        this.rawData[0] = (1 - 2 * y * y - 2 * z * z) * scale[0];
                        this.rawData[1] = (2 * x * y + 2 * w * z) * scale[1];
                        this.rawData[2] = (2 * x * z - 2 * w * y) * scale[2];
                        this.rawData[3] = 0;
                        this.rawData[4] = (2 * x * y - 2 * w * z) * scale[4];
                        this.rawData[5] = (1 - 2 * x * x - 2 * z * z) * scale[5];
                        this.rawData[6] = (2 * y * z + 2 * w * x) * scale[6];
                        this.rawData[7] = 0;
                        this.rawData[8] = (2 * x * z + 2 * w * y) * scale[8];
                        this.rawData[9] = (2 * y * z - 2 * w * x) * scale[9];
                        this.rawData[10] = (1 - 2 * x * x - 2 * y * y) * scale[10];
                        this.rawData[11] = 0;
                        this.rawData[12] = components[0].x;
                        this.rawData[13] = components[0].y;
                        this.rawData[14] = components[0].z;
                        this.rawData[15] = 1;
                }
                if (components[2].x == 0) {
                    this.rawData[0] = 1e-15;
                }
                if (components[2].y == 0) {
                    this.rawData[5] = 1e-15;
                }
                if (components[2].z == 0) {
                    this.rawData[10] = 1e-15;
                }
                return !(components[2].x == 0 || components[2].y == 0 || components[2].y == 0);
            };
            Matrix3D.prototype.transformVector = function (v) {
                v = strict(v, geom.Vector3D);
                var x = v.x;
                var y = v.y;
                var z = v.z;
                return new geom.Vector3D((x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12]), (x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13]), (x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14]), (x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11] + this.rawData[15]));
            };
            Matrix3D.prototype.transformVectors = function (vin, vout) {
                var i = 0;
                var x, y, z;
                var length = vin.length;
                while (i + 3 <= length) {
                    x = vin[i];
                    y = vin[i + 1];
                    z = vin[i + 2];
                    vout[i] = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
                    vout[i + 1] = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
                    vout[i + 2] = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
                    i += 3;
                }
            };
            Matrix3D.prototype.transpose = function () {
                var oRawData = this.rawData.concat();
                this.rawData[1] = oRawData[4];
                this.rawData[2] = oRawData[8];
                this.rawData[3] = oRawData[12];
                this.rawData[4] = oRawData[1];
                this.rawData[6] = oRawData[9];
                this.rawData[7] = oRawData[13];
                this.rawData[8] = oRawData[2];
                this.rawData[9] = oRawData[6];
                this.rawData[11] = oRawData[14];
                this.rawData[12] = oRawData[3];
                this.rawData[13] = oRawData[7];
                this.rawData[14] = oRawData[11];
            };
            Matrix3D.interpolate = function (thisMat, toMat, percent) {
                thisMat = strict(thisMat, Matrix3D);
                toMat = strict(toMat, Matrix3D);
                percent = (+(percent));
                var m = new Matrix3D();
                for (var i = 0; i < 16; ++i) {
                    m.rawData[i] = thisMat.rawData[i] + (toMat.rawData[i] - thisMat.rawData[i]) * percent;
                }
                return m;
            };
            Matrix3D.getAxisRotation = function (x, y, z, degrees, target) {
                if (target === void 0) { target = null; }
                x = (+(x));
                y = (+(y));
                z = (+(z));
                degrees = (+(degrees));
                target = strict(target, Matrix3D);
                var m = new Matrix3D();
                var a1 = new geom.Vector3D(x, y, z);
                var rad = -degrees * (Math.PI / 180);
                var c = Math.cos(rad);
                var s = Math.sin(rad);
                var t = 1.0 - c;
                m.rawData[0] = c + a1.x * a1.x * t;
                m.rawData[5] = c + a1.y * a1.y * t;
                m.rawData[10] = c + a1.z * a1.z * t;
                var tmp1 = a1.x * a1.y * t;
                var tmp2 = a1.z * s;
                m.rawData[4] = tmp1 + tmp2;
                m.rawData[1] = tmp1 - tmp2;
                tmp1 = a1.x * a1.z * t;
                tmp2 = a1.y * s;
                m.rawData[8] = tmp1 - tmp2;
                m.rawData[2] = tmp1 + tmp2;
                tmp1 = a1.y * a1.z * t;
                tmp2 = a1.x * s;
                m.rawData[9] = tmp1 + tmp2;
                m.rawData[6] = tmp1 - tmp2;
                return m;
            };
            return Matrix3D;
        }());
        geom.Matrix3D = Matrix3D;
    })(geom = flash.geom || (flash.geom = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Matrix3D.js.map