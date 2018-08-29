var flash;
(function (flash) {
    var text;
    (function (text) {
        var Font = (function () {
            function Font() {
            }
            Font.enumerateFonts = function (enumerateDeviceFonts) {
                if (enumerateDeviceFonts === void 0) { enumerateDeviceFonts = false; }
                enumerateDeviceFonts = Boolean(enumerateDeviceFonts);
                return [];
            };
            Font.registerFont = function (font) {
            };
            Object.defineProperty(Font.prototype, "fontName", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Font.prototype, "fontStyle", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Font.prototype, "fontType", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Font.prototype.hasGlyphs = function (str) {
                str = as(str, 'String');
                return null;
            };
            return Font;
        }());
        text.Font = Font;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Font.js.map