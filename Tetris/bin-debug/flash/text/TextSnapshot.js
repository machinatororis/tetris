var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextSnapshot = (function () {
            function TextSnapshot() {
            }
            TextSnapshot.prototype.findText = function (param1, param2, param3) {
                param1 = ((param1) >> 0);
                param2 = as(param2, 'String');
                param3 = Boolean(param3);
                return 0;
            };
            Object.defineProperty(TextSnapshot.prototype, "charCount", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            TextSnapshot.prototype.getSelected = function (param1, param2) {
                param1 = ((param1) >> 0);
                param2 = ((param2) >> 0);
                return true;
            };
            TextSnapshot.prototype.getSelectedText = function (param1) {
                if (param1 === void 0) { param1 = false; }
                param1 = Boolean(param1);
                return null;
            };
            TextSnapshot.prototype.getText = function (param1, param2, param3) {
                if (param3 === void 0) { param3 = false; }
                param1 = ((param1) >> 0);
                param2 = ((param2) >> 0);
                param3 = Boolean(param3);
                return null;
            };
            TextSnapshot.prototype.getTextRunInfo = function (param1, param2) {
                param1 = ((param1) >> 0);
                param2 = ((param2) >> 0);
                return null;
            };
            TextSnapshot.prototype.hitTestTextNearPos = function (param1, param2, param3) {
                if (param3 === void 0) { param3 = 0; }
                param1 = (+(param1));
                param2 = (+(param2));
                param3 = (+(param3));
                return 0;
            };
            TextSnapshot.prototype.setSelectColor = function (param1) {
                if (param1 === void 0) { param1 = 16776960; }
                param1 = ((param1) >>> 0);
            };
            TextSnapshot.prototype.setSelected = function (param1, param2, param3) {
                param1 = ((param1) >> 0);
                param2 = ((param2) >> 0);
                param3 = Boolean(param3);
            };
            return TextSnapshot;
        }());
        text.TextSnapshot = TextSnapshot;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextSnapshot.js.map