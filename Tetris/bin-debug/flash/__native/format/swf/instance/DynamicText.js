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
    var __native;
    (function (__native) {
        var format;
        (function (format_1) {
            var swf;
            (function (swf) {
                var instance;
                (function (instance) {
                    instance.SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
                    instance.TagDefineEditText = flash.__native.format.swf.tags.TagDefineEditText;
                    instance.TagDefineFont2 = flash.__native.format.swf.tags.TagDefineFont2;
                    instance.Matrix = flash.geom.Matrix;
                    instance.Rectangle = flash.geom.Rectangle;
                    instance.Font = flash.text.Font;
                    instance.TextField = flash.text.TextField;
                    instance.TextFieldAutoSize = flash.text.TextFieldAutoSize;
                    instance.TextFieldType = flash.text.TextFieldType;
                    instance.TextFormat = flash.text.TextFormat;
                    instance.TextFormatAlign = flash.text.TextFormatAlign;
                    instance.Dictionary = flash.utils.Dictionary;
                    var DynamicText = (function (_super) {
                        __extends(DynamicText, _super);
                        function DynamicText(tag) {
                            var _this = this;
                            tag = strict(tag, instance.TagDefineEditText);
                            _this = _super.call(this) || this;
                            if (!tag) {
                                return;
                            }
                            _this.tag = tag;
                            _this.data = strict(tag.root, instance.SWFTimelineContainer);
                            var rect = tag.bounds.rect;
                            _this.offset = new instance.Matrix(1, 0, 0, 1, rect.x, rect.y - 2);
                            _this.width = rect.width;
                            _this.height = rect.height;
                            _this.multiline = tag.multiline;
                            _this.wordWrap = tag.wordWrap;
                            _this.displayAsPassword = tag.password;
                            _this.border = tag.border;
                            _this.selectable = !tag.noSelect;
                            _this.maxChars = ((tag.maxLength) >> 0);
                            if (!tag.readOnly) {
                                _this.type = instance.TextFieldType.INPUT;
                                _this.background = true;
                            }
                            var format = new instance.TextFormat();
                            if (tag.hasTextColor) {
                                format.color = (tag.textColor & 0x00FFFFFF);
                            }
                            format.size = Math.round(tag.fontHeight / 20);
                            if (tag.hasFont) {
                                var font = _this.data.getTag(tag.fontId);
                                if (is(font, instance.TagDefineFont2)) {
                                    var fontName = (as(font, instance.TagDefineFont2)).fontName;
                                    if (fontName.charCodeAt(fontName.length - 1) == 0) {
                                        fontName = fontName.substr(0, fontName.length - 1).split(" ").join("");
                                    }
                                    var fonts = instance.Font.enumerateFonts(false);
                                    var foundFont = false;
                                    var __for0 = window.asc.of(fonts);
                                    for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                                        font = __for0_1[_i];
                                        if (font.fontName == fontName) {
                                            foundFont = true;
                                            format.font = fontName;
                                            break;
                                        }
                                    }
                                    if (!foundFont) {
                                        format.font = _this.getFont(font);
                                    }
                                    if (!format.font) {
                                        format.font = (as(font, instance.TagDefineFont2)).fontName;
                                    }
                                    _this.embedFonts = foundFont;
                                }
                            }
                            if (tag.hasLayout) {
                                switch (tag.align) {
                                    case 0:
                                        format.align = instance.TextFormatAlign.LEFT;
                                        break;
                                    case 1:
                                        format.align = instance.TextFormatAlign.RIGHT;
                                        break;
                                    case 2:
                                        format.align = instance.TextFormatAlign.CENTER;
                                        break;
                                    case 3:
                                        format.align = instance.TextFormatAlign.JUSTIFY;
                                        break;
                                }
                                format.leftMargin = ((tag.leftMargin / 20) >> 0);
                                format.rightMargin = ((tag.rightMargin / 20) >> 0);
                                format.indent = ((tag.indent / 20) >> 0);
                                format.leading = ((tag.leading / 20) >> 0);
                                if (_this.embedFonts)
                                    format.leading += 4;
                            }
                            _this.defaultTextFormat = format;
                            if (tag.hasText) {
                                if (tag.html) {
                                    _this.htmlText = tag.initialText;
                                }
                                else {
                                    _this.text = tag.initialText;
                                }
                            }
                            _this.autoSize = (tag.autoSize) ? instance.TextFieldAutoSize.LEFT : instance.TextFieldAutoSize.NONE;
                            return _this;
                        }
                        DynamicText.prototype.getFont = function (font) {
                            font = strict(font, instance.TagDefineFont2);
                            if (!DynamicText.registeredFonts.get(font.characterId)) {
                                DynamicText.registeredFonts.set(font.characterId, true);
                            }
                            return font.fontName;
                        };
                        DynamicText.registeredFonts = asc.sti(DynamicText, function () { DynamicText.registeredFonts = new instance.Dictionary; });
                        return DynamicText;
                    }(instance.TextField));
                    instance.DynamicText = DynamicText;
                })(instance = swf.instance || (swf.instance = {}));
            })(swf = format_1.swf || (format_1.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=DynamicText.js.map