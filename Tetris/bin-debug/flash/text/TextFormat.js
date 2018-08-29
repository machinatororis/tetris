var flash;
(function (flash) {
    var text;
    (function (text) {
        text.CSSColor = flash.__native.utils.CSSColor;
        text.Capabilities = flash.system.Capabilities;
        var TextFormat = (function () {
            function TextFormat(font, size, color, bold, italic, underline, url, target, align, leftMargin, rightMargin, indent, leading) {
                if (font === void 0) { font = null; }
                if (size === void 0) { size = null; }
                if (color === void 0) { color = null; }
                if (bold === void 0) { bold = null; }
                if (italic === void 0) { italic = null; }
                if (underline === void 0) { underline = null; }
                if (url === void 0) { url = null; }
                if (target === void 0) { target = null; }
                if (align === void 0) { align = null; }
                if (leftMargin === void 0) { leftMargin = null; }
                if (rightMargin === void 0) { rightMargin = null; }
                if (indent === void 0) { indent = null; }
                if (leading === void 0) { leading = null; }
                this._font = null;
                this._size = null;
                this._italic = null;
                this._bold = null;
                this._color = null;
                this._indent = null;
                this._leading = null;
                this._align = null;
                this._css = null;
                this._cssFixedSize = null;
                this._cssColor = null;
                this._cssHash = null;
                this._cssDirty = false;
                this._cssColorDirty = false;
                this._cssHashDirty = false;
                font = as(font, 'String');
                url = as(url, 'String');
                target = as(target, 'String');
                align = as(align, 'String');
                this.font = font || text.Capabilities.systemFontFamily;
                this.size = size || 12;
                this.color = color || 0;
                this.bold = bold || false;
                this.italic = italic || false;
                this.underline = underline || false;
                this.url = url || '';
                this.target = target || '';
                this.align = align || 'left';
                this.leftMargin = leftMargin || 0;
                this.rightMargin = rightMargin || 0;
                this.indent = indent || 0;
                this.leading = leading || 0;
                this.align = align || text.TextFormatAlign.LEFT;
            }
            Object.defineProperty(TextFormat.prototype, "align", {
                get: function () { return this._align; },
                set: function (value) { value = as(value, 'String'); this._align = value; this._cssDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "blockIndent", {
                get: function () { return null; },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "bold", {
                get: function () { return this._bold; },
                set: function (value) { this._bold = value; this._cssDirty = this._cssHashDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "bullet", {
                get: function () { return null; },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "color", {
                get: function () { return this._color; },
                set: function (value) { this._color = value; this._cssColorDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "display", {
                get: function () { return null; },
                set: function (value) { value = as(value, 'String'); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "font", {
                get: function () { return this._font; },
                set: function (value) { value = as(value, 'String'); this._font = value; this._cssDirty = this._cssHashDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "indent", {
                get: function () { return this._indent; },
                set: function (value) { this._indent = value; this._cssDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "italic", {
                get: function () { return this._italic; },
                set: function (value) { this._italic = value; this._cssDirty = this._cssHashDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "kerning", {
                get: function () { return null; },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "leading", {
                get: function () { return this._leading; },
                set: function (value) { this._leading = value; this._cssDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "leftMargin", {
                get: function () { return null; },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "letterSpacing", {
                get: function () { return null; },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "rightMargin", {
                get: function () { return null; },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "size", {
                get: function () { return this._size; },
                set: function (value) { this._size = value > 1 ? value : 2; this._cssDirty = this._cssHashDirty = true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "tabStops", {
                get: function () { return null; },
                set: function (value) { value = strict(value, Array); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "target", {
                get: function () { return null; },
                set: function (value) { value = as(value, 'String'); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "underline", {
                get: function () { return null; },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextFormat.prototype, "url", {
                get: function () { return null; },
                set: function (value) { value = as(value, 'String'); },
                enumerable: true,
                configurable: true
            });
            TextFormat.prototype.__getCss = function (fixedSize) {
                if (fixedSize === void 0) { fixedSize = false; }
                if (this._cssDirty) {
                    this._css = '';
                    this._cssFixedSize = '';
                    if (this._bold) {
                        this._css += 'bold ';
                        this._cssFixedSize += 'bold ';
                    }
                    if (this._italic) {
                        this._css += 'italic ';
                        this._cssFixedSize += 'italic ';
                    }
                    this._css += this.size + 'px ' + this.font;
                    this._cssFixedSize += TextFormat.MEASURE_FONT_SIZE + 'px ' + this.font;
                    this._cssDirty = false;
                }
                return fixedSize ? this._cssFixedSize : this._css;
            };
            TextFormat.prototype.__getCssColor = function () {
                if (this._cssColorDirty) {
                    this._cssColor = as(text.CSSColor.hexToString(this.color), 'String');
                    this._cssColorDirty = false;
                }
                return this._cssColor;
            };
            TextFormat.prototype.__getHash = function () {
                if (this._cssHashDirty) {
                    this._cssHash = this.__getCss() + this.__getCssColor();
                    this._cssHashDirty = false;
                }
                return this._cssHash;
            };
            TextFormat.MEASURE_FONT_SIZE = 16;
            TextFormat.MEASURE_CHAR = 'A';
            return TextFormat;
        }());
        text.TextFormat = TextFormat;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextFormat.js.map