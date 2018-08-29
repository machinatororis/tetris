var flash;
(function (flash) {
    var ui;
    (function (ui) {
        ui.Capabilities = flash.system.Capabilities;
        var MouseCursor = (function () {
            function MouseCursor() {
            }
            MouseCursor.isValid = function (name) {
                name = as(name, 'String');
                return name == MouseCursor.AUTO ||
                    name == MouseCursor.ARROW ||
                    name == MouseCursor.BUTTON ||
                    name == MouseCursor.HAND ||
                    name == MouseCursor.IBEAM;
            };
            MouseCursor.toCSS = function (name) {
                name = as(name, 'String');
                switch (name) {
                    case MouseCursor.ARROW: return 'default';
                    case MouseCursor.BUTTON: return 'pointer';
                    case MouseCursor.HAND:
                        return ui.Capabilities.browser == 'Firefox' ? 'grab' : 'pointer';
                    case MouseCursor.IBEAM: return 'text';
                }
                return name;
            };
            MouseCursor.AUTO = "auto";
            MouseCursor.ARROW = "arrow";
            MouseCursor.BUTTON = "button";
            MouseCursor.HAND = "hand";
            MouseCursor.IBEAM = "ibeam";
            return MouseCursor;
        }());
        ui.MouseCursor = MouseCursor;
    })(ui = flash.ui || (flash.ui = {}));
})(flash || (flash = {}));
//# sourceMappingURL=MouseCursor.js.map