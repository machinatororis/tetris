var flash;
(function (flash) {
    var ui;
    (function (ui) {
        ui.Base64 = flash.__native.utils.Base64;
        ui.BitmapData = flash.display.BitmapData;
        ui.PNGEncoderOptions = flash.display.PNGEncoderOptions;
        ui.Capabilities = flash.system.Capabilities;
        ui.ByteArray = flash.utils.ByteArray;
        var Mouse = (function () {
            function Mouse() {
            }
            Mouse.hide = function () {
                document.body.style.cursor = 'none';
                Mouse.sCursorShowed = false;
            };
            Mouse.show = function () {
                var cursor = Mouse.sSystemCursor || Mouse.sCursor, style = cursor, custom = strict(Mouse.sCursorData[cursor], ui.MouseCursorData);
                if (ui.Capabilities.browser.indexOf('Microsoft') >= 0) {
                    custom = null;
                }
                if (ui.ContextMenu.isOpened == true) {
                    style = ui.MouseCursor.AUTO;
                }
                else if (custom) {
                    style = 'url(data:image/png;base64,' + custom.base64 + '),auto';
                }
                else if (!ui.MouseCursor.isValid(cursor)) {
                    style = ui.MouseCursor.AUTO;
                }
                if (ui.MouseCursor.isValid(cursor)) {
                    style = ui.MouseCursor.toCSS(style);
                }
                document.body.style.cursor = style;
                Mouse.sCursorShowed = true;
            };
            Object.defineProperty(Mouse, "supportsCursor", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Mouse, "supportsNativeCursor", {
                get: function () {
                    return Mouse.supportsCursor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Mouse, "cursor", {
                get: function () { return Mouse.sCursor; },
                set: function (name) {
                    name = as(name, 'String');
                    if (!ui.MouseCursor.isValid(name) && !Mouse.sCursorData[name]) {
                        throw new ArgumentError('Parameter cursor must be one of the accepted values.', 2008);
                    }
                    Mouse.sCursor = name;
                    if (Mouse.sCursorShowed)
                        Mouse.show();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Mouse, "systemCursor", {
                get: function () { return Mouse.sSystemCursor; },
                set: function (name) {
                    name = as(name, 'String');
                    Mouse.sSystemCursor = name;
                    if (Mouse.sCursorShowed)
                        Mouse.show();
                },
                enumerable: true,
                configurable: true
            });
            Mouse.registerCursor = function (name, cursor) {
                name = as(name, 'String');
                cursor = strict(cursor, ui.MouseCursorData);
                if (!Mouse.supportsCursor) {
                    return;
                }
                if (!cursor || !cursor.data.length) {
                    throw new ArgumentError('One of the parameters is invalid.', 2004);
                }
                var bd = as(cursor.data[0], ui.BitmapData);
                var png = bd.encode(bd.rect, new ui.PNGEncoderOptions);
                cursor.base64 = ui.Base64.encode(png);
                Mouse.sCursorData[name] = cursor;
            };
            Mouse.unregisterCursor = function (name) {
                name = as(name, 'String');
                delete Mouse.sCursorData[name];
            };
            Mouse.sCursor = asc.sti(Mouse, function () { Mouse.sCursor = ui.MouseCursor.AUTO; });
            Mouse.sCursorShowed = true;
            Mouse.sSystemCursor = null;
            Mouse.sCursorData = {};
            return Mouse;
        }());
        ui.Mouse = Mouse;
    })(ui = flash.ui || (flash.ui = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Mouse.js.map