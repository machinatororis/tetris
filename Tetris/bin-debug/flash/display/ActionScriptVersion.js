var flash;
(function (flash) {
    var display;
    (function (display) {
        var ActionScriptVersion = (function () {
            function ActionScriptVersion() {
            }
            ActionScriptVersion.ACTIONSCRIPT2 = 2;
            ActionScriptVersion.ACTIONSCRIPT3 = 3;
            return ActionScriptVersion;
        }());
        display.ActionScriptVersion = ActionScriptVersion;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionScriptVersion.js.map