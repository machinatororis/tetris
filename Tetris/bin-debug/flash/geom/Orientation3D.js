var flash;
(function (flash) {
    var geom;
    (function (geom) {
        var Orientation3D = (function () {
            function Orientation3D() {
            }
            Orientation3D.EULER_ANGLES = "eulerAngles";
            Orientation3D.AXIS_ANGLE = "axisAngle";
            Orientation3D.QUATERNION = "quaternion";
            return Orientation3D;
        }());
        geom.Orientation3D = Orientation3D;
    })(geom = flash.geom || (flash.geom = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Orientation3D.js.map