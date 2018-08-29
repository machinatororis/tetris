var flash;
(function (flash) {
    var text;
    (function (text) {
        var AntiAliasType = (function () {
            function AntiAliasType() {
            }
            AntiAliasType.NORMAL = "normal";
            AntiAliasType.ADVANCED = "advanced";
            return AntiAliasType;
        }());
        text.AntiAliasType = AntiAliasType;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=AntiAliasType.js.map