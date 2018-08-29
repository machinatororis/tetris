var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var Context3DProfile = (function () {
            function Context3DProfile() {
            }
            Context3DProfile.BASELINE = "baseline";
            Context3DProfile.BASELINE_CONSTRAINED = "baselineConstrained";
            Context3DProfile.BASELINE_EXTENDED = "baselineExtended";
            Context3DProfile.STANDARD = "standard";
            Context3DProfile.STANDARD_CONSTRAINED = "standardConstrained";
            Context3DProfile.STANDARD_EXTENDED = "standardExtended";
            return Context3DProfile;
        }());
        display3D.Context3DProfile = Context3DProfile;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DProfile.js.map