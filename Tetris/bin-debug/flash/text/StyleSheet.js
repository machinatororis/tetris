var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flash;
(function (flash) {
    var text;
    (function (text) {
        text.EventDispatcher = flash.events.EventDispatcher;
        var StyleSheet = (function (_super) {
            __extends(StyleSheet, _super);
            function StyleSheet() {
                var _this = this;
                _this._css === void 0 && (_this._css = null);
                _this = _super.call(this) || this;
                _this._css = {};
                _this._styles = {};
                return _this;
            }
            StyleSheet.prototype.getStyle = function (styleName) {
                styleName = as(styleName, 'String');
                return this._copy(this._css[styleName.toLowerCase()]);
            };
            StyleSheet.prototype.setStyle = function (styleName, styleObject) {
                styleName = as(styleName, 'String');
                var lowerStr = styleName.toLowerCase();
                this._css[lowerStr] = this._copy(styleObject);
                this.doTransform(lowerStr);
                this._update();
            };
            StyleSheet.prototype.clear = function () {
                this._css = {};
                this._styles = {};
                this._update();
            };
            Object.defineProperty(StyleSheet.prototype, "styleNames", {
                get: function () {
                    var n = null;
                    var a = [];
                    var __for0 = window.asc.in(this._css);
                    for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                        n = __for0_1[_i];
                        a.push(n);
                    }
                    return a;
                },
                enumerable: true,
                configurable: true
            });
            StyleSheet.prototype.transform = function (formatObject) {
                if (formatObject == null) {
                    return null;
                }
                var f = new text.TextFormat();
                var v = formatObject.textAlign;
                if (v) {
                    f.align = as(v, 'String');
                }
                v = formatObject.fontSize;
                if (v) {
                    v = parseInt(v, 10);
                    if (v > 0) {
                        f.size = v;
                    }
                }
                v = formatObject.textDecoration;
                if (v == "none") {
                    f.underline = false;
                }
                else if (v == "underline") {
                    f.underline = true;
                }
                v = formatObject.marginLeft;
                if (v) {
                    f.leftMargin = parseInt(v, 10);
                }
                v = formatObject.marginRight;
                if (v) {
                    f.rightMargin = parseInt(v, 10);
                }
                v = formatObject.leading;
                if (v) {
                    f.leading = parseInt(v, 10);
                }
                v = formatObject.kerning;
                if (v == "true") {
                    f.kerning = 1;
                }
                else if (v == "false") {
                    f.kerning = 0;
                }
                else {
                    f.kerning = parseInt(v, 10);
                }
                v = formatObject.letterSpacing;
                if (v) {
                    f.letterSpacing = parseFloat(v);
                }
                v = formatObject.fontFamily;
                if (v) {
                    f.font = this._parseCSSFontFamily(v);
                }
                v = formatObject.display;
                if (v) {
                    f.display = as(v, 'String');
                }
                v = formatObject.fontWeight;
                if (v == "bold") {
                    f.bold = true;
                }
                else if (v == "normal") {
                    f.bold = false;
                }
                v = formatObject.fontStyle;
                if (v == "italic") {
                    f.italic = true;
                }
                else if (v == "normal") {
                    f.italic = false;
                }
                v = formatObject.textIndent;
                if (v) {
                    f.indent = parseInt(v, 10);
                }
                v = formatObject.color;
                if (v) {
                    v = this._parseColor(v);
                    if (v != null) {
                        f.color = v;
                    }
                }
                return f;
            };
            StyleSheet.prototype.parseCSS = function (CSSText) {
                CSSText = as(CSSText, 'String');
                var n = null;
                var r = this._parseCSSInternal(CSSText);
                if (typeof r == "null") {
                    return;
                }
                var __for1 = window.asc.in(r);
                for (var _i = 0, __for1_1 = __for1; _i < __for1_1.length; _i++) {
                    n = __for1_1[_i];
                    this._css[n] = this._copy(r[n]);
                    this.doTransform(n);
                }
                this._update();
            };
            Object.defineProperty(StyleSheet.prototype, "_styles", {
                get: function () { return null; },
                set: function (param1) { },
                enumerable: true,
                configurable: true
            });
            StyleSheet.prototype.doTransform = function (n) {
                n = as(n, 'String');
                var f = this.transform(this._css[n]);
                this._css[n] = f;
            };
            StyleSheet.prototype._copy = function (o) {
                var n = null;
                if (typeof o != "object") {
                    return null;
                }
                var r = {};
                var __for2 = window.asc.in(o);
                for (var _i = 0, __for2_1 = __for2; _i < __for2_1.length; _i++) {
                    n = __for2_1[_i];
                    r[n] = o[n];
                }
                return r;
            };
            StyleSheet.prototype._update = function () { };
            StyleSheet.prototype._parseCSSInternal = function (param1) { param1 = as(param1, 'String'); return null; };
            StyleSheet.prototype._parseCSSFontFamily = function (param1) { param1 = as(param1, 'String'); return null; };
            StyleSheet.prototype._parseColor = function (param1) { param1 = as(param1, 'String'); return 0; };
            return StyleSheet;
        }(text.EventDispatcher));
        text.StyleSheet = StyleSheet;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StyleSheet.js.map