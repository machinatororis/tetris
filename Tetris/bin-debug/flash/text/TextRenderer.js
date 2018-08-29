var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextRenderer = (function () {
            function TextRenderer() {
            }
            Object.defineProperty(TextRenderer, "antiAliasType", {
                get: function () { return null; },
                set: function (param1) { param1 = as(param1, 'String'); },
                enumerable: true,
                configurable: true
            });
            TextRenderer.setAdvancedAntiAliasingTable = function (param1, param2, param3, param4) {
                param1 = as(param1, 'String');
                param2 = as(param2, 'String');
                param3 = as(param3, 'String');
                param4 = strict(param4, Array);
            };
            Object.defineProperty(TextRenderer, "maxLevel", {
                get: function () { return 0; },
                set: function (param1) { param1 = ((param1) >> 0); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextRenderer, "displayMode", {
                get: function () { return null; },
                set: function (param1) { param1 = as(param1, 'String'); },
                enumerable: true,
                configurable: true
            });
            return TextRenderer;
        }());
        text.TextRenderer = TextRenderer;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextRenderer.js.map