var flash;
(function (flash) {
    var desktop;
    (function (desktop) {
        var Clipboard = (function () {
            function Clipboard() {
                this._data = null;
                this._dataFormat = null;
                this._data = [];
                this._dataFormat = [];
            }
            Object.defineProperty(Clipboard, "generalClipboard", {
                get: function () {
                    if (!Clipboard._generalClipboard) {
                        Clipboard._generalClipboard = new Clipboard;
                        ['cut', 'copy'].forEach(function (event) {
                            document.addEventListener(event, function (e) {
                                Clipboard._generalClipboard.setData(desktop.ClipboardFormats.TEXT_FORMAT, Clipboard.getSelectionText());
                            }.__bind(this));
                        }.__bind(this));
                    }
                    return Clipboard._generalClipboard;
                },
                enumerable: true,
                configurable: true
            });
            Clipboard.getSelectionText = function () {
                var text = '';
                if (window.getSelection) {
                    text = window.getSelection().toString();
                }
                return text;
            };
            Object.defineProperty(Clipboard.prototype, "formats", {
                get: function () {
                    return this._dataFormat;
                },
                enumerable: true,
                configurable: true
            });
            Clipboard.prototype.clear = function () {
                this._data.length = 0;
                this._dataFormat.length = 0;
            };
            Clipboard.prototype.clearData = function (format) {
                format = as(format, 'String');
                var index = this._dataFormat.indexOf(format);
                if (index >= 0) {
                    this._data.splice(index, 1);
                    this._dataFormat.splice(index, 1);
                }
            };
            Clipboard.prototype.getData = function (format, transferMode) {
                if (transferMode === void 0) { transferMode = "originalPreferred"; }
                format = as(format, 'String');
                transferMode = as(transferMode, 'String');
                if (this == Clipboard.generalClipboard && format == desktop.ClipboardFormats.TEXT_FORMAT && window.clipboardData) {
                    var system = as(window.clipboardData.getData('Text'), 'String');
                    if (system)
                        return system;
                }
                var index = this._dataFormat.indexOf(format);
                if (index >= 0) {
                    return this._data[index];
                }
                return null;
            };
            Clipboard.prototype.hasFormat = function (format) {
                format = as(format, 'String');
                return this._dataFormat.indexOf(format) >= 0;
            };
            Clipboard.prototype.setData = function (format, data, serializable) {
                if (serializable === void 0) { serializable = true; }
                format = as(format, 'String');
                serializable = Boolean(serializable);
                if (this == Clipboard.generalClipboard && format == desktop.ClipboardFormats.TEXT_FORMAT && window.clipboardData) {
                    window.clipboardData.setData('Text', data);
                }
                var index = this._dataFormat.indexOf(format);
                if (index == -1)
                    index = ((this._dataFormat.length) >> 0);
                this._data[index] = data;
                this._dataFormat[index] = format;
            };
            Clipboard.prototype.setDataHandler = function (format, handler, serializable) {
                if (serializable === void 0) { serializable = true; }
                format = as(format, 'String');
                serializable = Boolean(serializable);
                return false;
            };
            Clipboard._generalClipboard = null;
            return Clipboard;
        }());
        desktop.Clipboard = Clipboard;
    })(desktop = flash.desktop || (flash.desktop = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Clipboard.js.map