var flash;
(function (flash) {
    var geom;
    (function (geom) {
        var Utils3D = (function () {
            function Utils3D() {
            }
            Utils3D.projectVector = function (m, v) {
                m = strict(m, geom.Matrix3D);
                v = strict(v, geom.Vector3D);
                var n = m.rawData;
                var l_oProj = new geom.Vector3D();
                l_oProj.x = v.x * n[0] + v.y * n[4] + v.z * n[8] + n[12];
                l_oProj.y = v.x * n[1] + v.y * n[5] + v.z * n[9] + n[13];
                l_oProj.z = v.x * n[2] + v.y * n[6] + v.z * n[10] + n[14];
                var w = (+(v.x * n[3] + v.y * n[7] + v.z * n[11] + n[15]));
                l_oProj.z /= w;
                l_oProj.x /= w;
                l_oProj.y /= w;
                return l_oProj;
            };
            Utils3D.projectVectors = function (m, verts, projectedVerts, uvts) {
                m = strict(m, geom.Matrix3D);
                if (verts.length % 3 != 0)
                    return;
                var n = m.rawData, x = NaN, y = NaN, z = NaN, w = NaN, x1 = NaN, y1 = NaN, z1 = NaN, w1 = NaN, i = 0, length = verts.length;
                while (i < length) {
                    x = (+(verts[i]));
                    y = (+(verts[i + 1]));
                    z = (+(verts[i + 2]));
                    w = 1;
                    x1 = x * n[0] + y * n[4] + z * n[8] + w * n[12];
                    y1 = x * n[1] + y * n[5] + z * n[9] + w * n[13];
                    z1 = x * n[2] + y * n[6] + z * n[10] + w * n[14];
                    w1 = x * n[3] + y * n[7] + z * n[11] + w * n[15];
                    projectedVerts.push(x1 / w1);
                    projectedVerts.push(y1 / w1);
                    uvts[i + 2] = 1 / w1;
                    i += 3;
                }
            };
            Utils3D.pointTowards = function (percent, mat, pos, at, up) {
                if (at === void 0) { at = null; }
                if (up === void 0) { up = null; }
                percent = (+(percent));
                mat = strict(mat, geom.Matrix3D);
                pos = strict(pos, geom.Vector3D);
                at = strict(at, geom.Vector3D);
                up = strict(up, geom.Vector3D);
                return null;
            };
            return Utils3D;
        }());
        geom.Utils3D = Utils3D;
    })(geom = flash.geom || (flash.geom = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Utils3D.js.map