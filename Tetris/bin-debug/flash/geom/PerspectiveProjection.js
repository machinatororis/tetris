var flash;
(function (flash) {
    var geom;
    (function (geom) {
        geom.Stage = flash.display.Stage;
        var PerspectiveProjection = (function () {
            function PerspectiveProjection() {
                this.focalLength = NaN;
                this.projectionCenter = null;
                this.mMatrix3D = null;
                this.mFieldOfView = NaN;
                this.fieldOfView = 0;
                this.focalLength = 0;
                this.mMatrix3D = new geom.Matrix3D();
                this.projectionCenter = new geom.Point(geom.Stage.sCurrent.stageWidth / 2, geom.Stage.sCurrent.stageHeight / 2);
            }
            Object.defineProperty(PerspectiveProjection.prototype, "fieldOfView", {
                get: function () {
                    return this.mFieldOfView;
                },
                set: function (value) {
                    value = (+(value));
                    var p_nFovY = value * PerspectiveProjection.TO_RADIAN;
                    this.mFieldOfView = (+(p_nFovY));
                    var cotan = 1 / Math.tan(p_nFovY / 2);
                    this.focalLength = geom.Stage.sCurrent.stageWidth * (geom.Stage.sCurrent.stageWidth / geom.Stage.sCurrent.stageHeight) / 2 * cotan;
                },
                enumerable: true,
                configurable: true
            });
            PerspectiveProjection.prototype.toMatrix3D = function () {
                var _mp = this.mMatrix3D.rawData;
                _mp[0] = this.focalLength;
                _mp[5] = this.focalLength;
                _mp[11] = 1.0;
                _mp[15] = 0;
                return this.mMatrix3D;
            };
            PerspectiveProjection.TO_RADIAN = 0.01745329251994329577;
            return PerspectiveProjection;
        }());
        geom.PerspectiveProjection = PerspectiveProjection;
    })(geom = flash.geom || (flash.geom = {}));
})(flash || (flash = {}));
//# sourceMappingURL=PerspectiveProjection.js.map