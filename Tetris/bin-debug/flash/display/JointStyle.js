var flash;
(function (flash) {
    var display;
    (function (display) {
        var JointStyle = (function () {
            function JointStyle() {
            }
            JointStyle.ROUND = "round";
            JointStyle.BEVEL = "bevel";
            JointStyle.MITER = "miter";
            return JointStyle;
        }());
        display.JointStyle = JointStyle;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=JointStyle.js.map