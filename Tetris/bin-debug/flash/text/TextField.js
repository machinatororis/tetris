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
    (function (text_1) {
        text_1.XML = global.XML;
        text_1.XMLList = global.XMLList;
        text_1.WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
        text_1.DisplayObject = flash.display.DisplayObject;
        text_1.Graphics = flash.display.Graphics;
        text_1.InteractiveObject = flash.display.InteractiveObject;
        text_1.Stage = flash.display.Stage;
        text_1.Event = flash.events.Event;
        text_1.MouseEvent = flash.events.MouseEvent;
        text_1.TextEvent = flash.events.TextEvent;
        text_1.Matrix = flash.geom.Matrix;
        text_1.Point = flash.geom.Point;
        text_1.Rectangle = flash.geom.Rectangle;
        text_1.Capabilities = flash.system.Capabilities;
        var TextField = (function (_super) {
            __extends(TextField, _super);
            function TextField() {
                var _this = _super.call(this) || this;
                _this._type = 'dynamic';
                _this._autoSize = 'none';
                _this._wordWrap = true;
                _this._selectable = true;
                _this._mouseWheelEnabled = true;
                _this._textFormat = new text_1.TextFormat;
                _this._backgroundColor = 0xffffff;
                _this._borderColor = 0;
                _this._scrollH = 0;
                _this._scrollV = 1;
                _this._maxChars = 0;
                _this._width = 100;
                _this._height = 100;
                _this._rect = new text_1.Rectangle;
                _this.__updateRect();
                _this.text = '';
                _this._cropBounds = true;
                _this.__setNeedCache();
                _this.addEventListener(text_1.Event.ADDED_TO_STAGE, _this.__onAddedToStage.__bind(_this));
                _this.addEventListener(text_1.Event.REMOVED_FROM_STAGE, _this.__onRemovedFromStage.__bind(_this));
                return _this;
            }
            TextField.isFontCompatible = function (value, param2) {
                value = as(value, 'String');
                param2 = as(param2, 'String');
                return false;
            };
            Object.defineProperty(TextField.prototype, "alwaysShowSelection", {
                get: function () { return false; },
                set: function (value) { value = Boolean(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "antiAliasType", {
                get: function () { return null; },
                set: function (value) { value = as(value, 'String'); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "autoSize", {
                get: function () { return this._autoSize; },
                set: function (value) {
                    value = as(value, 'String');
                    this._autoSize = value;
                    if (this._graphics) {
                        this._graphics.dirty = true;
                    }
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "background", {
                get: function () { return this._background; },
                set: function (value) {
                    value = Boolean(value);
                    if (this._background = value) {
                        this._graphics = this._graphics || new text_1.Graphics;
                    }
                    if (this._graphics) {
                        this._graphics.dirty = true;
                    }
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "backgroundColor", {
                get: function () { return this._backgroundColor; },
                set: function (value) {
                    value = ((value) >>> 0);
                    this._backgroundColor = value;
                    if (this._graphics) {
                        this._graphics.dirty = true;
                    }
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "border", {
                get: function () { return this._border; },
                set: function (value) {
                    value = Boolean(value);
                    if (this._border = value) {
                        this._graphics = this._graphics || new text_1.Graphics;
                    }
                    if (this._graphics) {
                        this._graphics.dirty = true;
                    }
                    this.__updateRect();
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "borderColor", {
                get: function () { return this._borderColor; },
                set: function (value) {
                    value = ((value) >>> 0);
                    this._borderColor = value;
                    if (this._graphics) {
                        this._graphics.dirty = true;
                    }
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "bottomScrollV", {
                get: function () { return 0; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "caretIndex", {
                get: function () { return 0; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "condenseWhite", {
                get: function () { return false; },
                set: function (value) { value = Boolean(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "defaultTextFormat", {
                get: function () { return this._textFormat; },
                set: function (value) { value = strict(value, text_1.TextFormat); this.__setDefaultTextFormat(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "embedFonts", {
                get: function () { return false; },
                set: function (value) { value = Boolean(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "gridFitType", {
                get: function () { return null; },
                set: function (value) { value = as(value, 'String'); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "htmlText", {
                get: function () { return ''; },
                set: function (value) {
                    value = as(value, 'String');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "length", {
                get: function () { return this._text.length; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "textInteractionMode", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "maxChars", {
                get: function () { return this._maxChars; },
                set: function (value) {
                    value = ((value) >> 0);
                    this._maxChars = value;
                    if (this._nativeInput) {
                        this._nativeInput.setMaxChars(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "maxScrollH", {
                get: function () { return 0; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "maxScrollV", {
                get: function () {
                    return Math.max(this.numLines - ((this.height / this.__getLineHeight()) >> 0), 1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "mouseWheelEnabled", {
                get: function () { return this._mouseWheelEnabled; },
                set: function (value) {
                    value = Boolean(value);
                    this._mouseWheelEnabled = value;
                    if (this._nativeInput) {
                        this._nativeInput.setMouseWheel(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "multiline", {
                get: function () { return this._multiline; },
                set: function (value) {
                    value = Boolean(value);
                    this._multiline = value;
                    if (this._nativeInput) {
                        this._nativeInput.setMultiline(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "numLines", {
                get: function () { return this._numLines; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "displayAsPassword", {
                get: function () { return false; },
                set: function (value) {
                    value = Boolean(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "restrict", {
                get: function () { return this._restrict; },
                set: function (value) {
                    value = as(value, 'String');
                    if (this._restrict == value) {
                        return;
                    }
                    this._restrict = value;
                    if (this._nativeInput) {
                        this._nativeInput.setRestrict(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "scrollH", {
                get: function () { return this._scrollH; },
                set: function (value) {
                    value = ((value) >> 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "scrollV", {
                get: function () { return this._scrollV; },
                set: function (index) {
                    index = ((index) >> 0);
                    this._scrollV = index;
                    if (this._scrollV < 1)
                        this._scrollV = 1;
                    if (this._scrollV > this.maxScrollV)
                        this._scrollV = this.maxScrollV;
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "selectable", {
                get: function () { return this._selectable; },
                set: function (value) {
                    value = Boolean(value);
                    this._selectable = value;
                    if (this._nativeInput) {
                        this._nativeInput.setSelectable(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "selectedText", {
                get: function () {
                    return this.text.substring(this.selectionBeginIndex, this.selectionEndIndex);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "selectionBeginIndex", {
                get: function () {
                    if (this._nativeInput) {
                        return this._nativeInput.getSelectionBegin();
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "selectionEndIndex", {
                get: function () {
                    if (this._nativeInput) {
                        return this._nativeInput.getSelectionEnd();
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "sharpness", {
                get: function () { return 0; },
                set: function (value) { value = (+(value)); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "styleSheet", {
                get: function () { return null; },
                set: function (value) { value = strict(value, text_1.StyleSheet); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "text", {
                get: function () { return this._text; },
                set: function (value) {
                    value = as(value, 'String');
                    value = value || '';
                    if (this._text == value) {
                        return;
                    }
                    this._text = value;
                    this._nativeDirtyText = true;
                    this.__updateLines();
                    this.scrollV = this.scrollV;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "textColor", {
                get: function () { return this._textFormat.color; },
                set: function (color) {
                    color = ((color) >>> 0);
                    this._textFormat.color = color;
                    this._nativeDirtyTextFormat = true;
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "textHeight", {
                get: function () {
                    if (this._numLines) {
                        return this.__getLineHeight() * this._numLines;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "textWidth", {
                get: function () {
                    if (this._numLines) {
                        var w = 0;
                        for (var i = 0; i < this._numLines; i++) {
                            var w2 = this._linesWidth[i];
                            if (w2 > w) {
                                w = w2;
                            }
                        }
                        return w;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "thickness", {
                get: function () { return 0; },
                set: function (value) { value = (+(value)); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "type", {
                get: function () { return this._type; },
                set: function (value) {
                    value = as(value, 'String');
                    this._type = value;
                    var NativeInput;
                    if (!window.asc.text || typeof (NativeInput = window.asc.text.NativeInput) != 'function') {
                        return;
                    }
                    if (this._type == 'input') {
                        if (!this._nativeInput) {
                            this._nativeInput = new NativeInput;
                            this._nativeInput.setIndex(32);
                            this._nativeInput.setSize(this._rect.width, this._rect.height);
                            this._nativeInput.setMaxChars(this._maxChars);
                            this._nativeInput.setWordWrap(this._wordWrap);
                            this._nativeInput.setMouseWheel(this._mouseWheelEnabled);
                            this._nativeInput.setMultiline(this._multiline);
                            this._nativeInput.setRestrict(this._restrict);
                            this._nativeInput.setSelectable(this._selectable);
                            this._nativeDirtyText = true;
                            this._nativeDirtyTextFormat = true;
                            this.__nativeConnect();
                        }
                    }
                    else if (this._nativeInput) {
                        this.__nativeDisconnect();
                        this._nativeInput = null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "wordWrap", {
                get: function () { return this._wordWrap; },
                set: function (value) {
                    value = Boolean(value);
                    if (this._wordWrap == value) {
                        return;
                    }
                    this._wordWrap = value;
                    this.__updateLines();
                    if (this._nativeInput) {
                        this._nativeInput.setWordWrap(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            TextField.prototype.appendText = function (newText) {
                newText = as(newText, 'String');
                this.replaceText(this.text.length, this.text.length, newText);
            };
            Object.defineProperty(TextField.prototype, "width", {
                get: function () {
                    return this._autoSize != text_1.TextFieldAutoSize.NONE ? this.textWidth + 4 : this._width;
                },
                set: function (value) {
                    value = (+(value));
                    this._width = value;
                    this.__updateRect();
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "height", {
                get: function () {
                    return this._autoSize != text_1.TextFieldAutoSize.NONE ? this.textHeight + 4 : this._height;
                },
                set: function (value) {
                    value = (+(value));
                    this._height = value;
                    this.__updateRect();
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            TextField.prototype.getCharBoundaries = function (charIndex) {
                charIndex = ((charIndex) >> 0);
                var r = new text_1.Rectangle;
                if (this._numLines) {
                    var lineHeight = this.__getLineHeight();
                    var j = 0;
                    while (j < this._numLines) {
                        var l = ((this._lines[j].length) >> 0);
                        if (charIndex > l) {
                            charIndex -= l + 1;
                            j++;
                        }
                        else if (charIndex < l) {
                            var char = as(this._lines[j].charAt(charIndex), 'String');
                            char;
                            var ctx = text_1.Stage.sHelperCtx2d;
                            ctx.font = this.defaultTextFormat.__getCss();
                            var tm = ctx.measureText(char);
                            var lm = ctx.measureText(this._lines[j].substring(0, charIndex));
                            r.__setTo(lm.width, lineHeight * j, tm.width, lineHeight);
                            break;
                        }
                        else if (charIndex == l) {
                            break;
                        }
                    }
                }
                return r;
            };
            TextField.prototype.getCharIndexAtPoint = function (value, param2) { value = (+(value)); param2 = (+(param2)); return 0; };
            TextField.prototype.getFirstCharInParagraph = function (value) { value = ((value) >> 0); return 0; };
            TextField.prototype.getLineIndexAtPoint = function (value, param2) { value = (+(value)); param2 = (+(param2)); return 0; };
            TextField.prototype.getLineIndexOfChar = function (value) { value = ((value) >> 0); return 0; };
            TextField.prototype.getLineLength = function (value) { value = ((value) >> 0); return 0; };
            TextField.prototype.getLineMetrics = function (value) { value = ((value) >> 0); return null; };
            TextField.prototype.getLineOffset = function (value) { value = ((value) >> 0); return 0; };
            TextField.prototype.getLineText = function (value) { value = ((value) >> 0); return null; };
            TextField.prototype.getParagraphLength = function (value) { value = ((value) >> 0); return 0; };
            TextField.prototype.getTextFormat = function (value, param2) {
                if (value === void 0) { value = -1; }
                if (param2 === void 0) { param2 = -1; }
                value = ((value) >> 0);
                param2 = ((param2) >> 0);
                return this._textFormat;
            };
            TextField.prototype.getTextRuns = function (value, param2) {
                if (value === void 0) { value = 0; }
                if (param2 === void 0) { param2 = 2147483647; }
                value = ((value) >> 0);
                param2 = ((param2) >> 0);
                return null;
            };
            TextField.prototype.getRawText = function () { return null; };
            TextField.prototype.replaceSelectedText = function (value) { value = as(value, 'String'); };
            TextField.prototype.replaceText = function (beginIndex, endIndex, newText) {
                beginIndex = ((beginIndex) >> 0);
                endIndex = ((endIndex) >> 0);
                newText = as(newText, 'String');
                this.text = this._text.substr(0, beginIndex) + newText + this._text.substr(endIndex);
            };
            TextField.prototype.setSelection = function (begin, end) {
                begin = ((begin) >> 0);
                end = ((end) >> 0);
                if (this._nativeInput) {
                    this._nativeInput.setSelection(begin, end);
                }
            };
            TextField.prototype.setTextFormat = function (value, begin, end) {
                if (begin === void 0) { begin = -1; }
                if (end === void 0) { end = -1; }
                value = strict(value, text_1.TextFormat);
                begin = ((begin) >> 0);
                end = ((end) >> 0);
                this.__setDefaultTextFormat(value);
            };
            TextField.prototype.getImageReference = function (value) { value = as(value, 'String'); return null; };
            Object.defineProperty(TextField.prototype, "useRichTextClipboard", {
                get: function () { return false; },
                set: function (value) { value = Boolean(value); },
                enumerable: true,
                configurable: true
            });
            TextField.prototype.__onAddedToStage = function (event) {
                this.addEventListener(text_1.MouseEvent.MOUSE_WHEEL, this.__onMouseWheel.__bind(this));
                if (this._nativeInput) {
                    this.__nativeConnect();
                }
            };
            TextField.prototype.__onRemovedFromStage = function (event) {
                this.removeEventListener(text_1.MouseEvent.MOUSE_WHEEL, this.__onMouseWheel.__bind(this));
                if (this._nativeInput) {
                    this.__nativeDisconnect();
                }
            };
            TextField.prototype.__onMouseWheel = function (e) {
                if (!this._mouseWheelEnabled || e.isDefaultPrevented()) {
                    return;
                }
                if (this._nativeInput) {
                    this.scrollV = ((this._nativeInput.getScrollV()) >> 0);
                    e.preventDefault();
                }
                else {
                    var delta = e.delta;
                    if ((delta < 0 && this.scrollV < this.maxScrollV) || (delta > 0 && this.scrollV > 0)) {
                        this.scrollV -= delta;
                        e.preventDefault();
                    }
                }
                this.dispatchEvent(new text_1.Event(text_1.Event.SCROLL));
            };
            TextField.prototype.__predraw = function (ctx, skipCache) {
                if (this._nativeInput) {
                    this._nativeVisible = this._visible;
                }
                return this.__predrawDisplayObject(ctx, skipCache);
            };
            TextField.prototype.__draw = function (ctx, dirtyFlag) {
                if (dirtyFlag === void 0) { dirtyFlag = 0; }
                if (this.__drawCache(ctx))
                    return false;
                if (this._border || this._background) {
                    if (this._graphics.dirty) {
                        this._graphics.clear();
                        if (this._border) {
                            this._graphics.lineStyle(0, this._borderColor);
                        }
                        if (this._background) {
                            this._graphics.beginFill(this._backgroundColor);
                        }
                        this._graphics.drawRect(0, 0, this.width, this.height);
                    }
                    ctx.drawGraphics(this, this._graphics);
                }
                if (this._nativeInput) {
                    if (this._nativeDirtyText) {
                        this._nativeInput.setText(this._text);
                        this._nativeDirtyText = false;
                    }
                    if (this._nativeDirtyTextFormat) {
                        var f = this._textFormat;
                        this._nativeInput.setTextFormat(f.font, f.size, f.color, f.bold, f.italic, f.underline, f.align, f.indent, f.leading, 0, 0);
                        this._nativeDirtyTextFormat = false;
                    }
                    var c = ctx.mColorTransform;
                    this._nativeInput.setAlpha(c.alphaMultiplier);
                    return true;
                }
                var x, y;
                var lineWidth;
                var lineHeight = this.__getLineHeight(), indent = this._textFormat.indent, align = this._textFormat.align;
                var num = this._scrollV - 1;
                for (var i = num; i < this._numLines; i++) {
                    y = (i - num) * lineHeight;
                    if (y + lineHeight > this._height) {
                        break;
                    }
                    lineWidth = this._linesWidth[i];
                    switch (align) {
                        case 'center':
                            x = (this._width - indent) - lineWidth >> 1;
                            break;
                        case 'right':
                            x = (this._width - indent) - lineWidth;
                            break;
                        default:
                            x = indent;
                    }
                    ctx.drawText(this, this._lines[i], this._textFormat, x + 1, y + 2, lineWidth, lineHeight);
                }
                return true;
            };
            TextField.prototype.__doMouse = function (stageX, stageY, isHitArea) {
                if (isHitArea === void 0) { isHitArea = false; }
                if (!isHitArea && (!this._visible || this._maskParent)) {
                    return null;
                }
                var target;
                if (this._width > 0 && this._height > 0) {
                    var globalPoint = text_1.Point.__pool.get();
                    var localPoint = text_1.Point.__pool.get();
                    globalPoint.__setTo(stageX, stageY);
                    this.__globalToLocal(globalPoint, localPoint);
                    if (this._rect.__containsPoint(localPoint)) {
                        target = this;
                    }
                }
                text_1.Point.__pool.release(globalPoint);
                text_1.Point.__pool.release(localPoint);
                return target;
            };
            TextField.prototype.__setDefaultTextFormat = function (value) {
                this._textFormat = value;
                this._nativeDirtyTextFormat = true;
                this.__updateLines();
                this.scrollV = this.scrollV;
            };
            TextField.prototype.__getFontHeight = function () {
                return TextField.__measureText(text_1.TextFormat.MEASURE_CHAR, this.defaultTextFormat).height;
            };
            TextField.prototype.__getLineHeight = function () {
                return this.__getFontHeight() + this.defaultTextFormat.leading;
            };
            TextField.prototype.__getBounds = function (rect, matrix) {
                if (matrix === void 0) { matrix = null; }
                var bounds = text_1.Rectangle.__pool.get();
                bounds.__copyFrom(this._rect);
                if (matrix) {
                    bounds.__transform(bounds, matrix);
                }
                rect.__expand(bounds.x, bounds.y, bounds.width, bounds.height);
                text_1.Rectangle.__pool.release(bounds);
            };
            TextField.prototype.__updateLines = function () {
                if (!this._lines) {
                    this._lines = [];
                    this._linesWidth = [];
                }
                else {
                    this._lines.length = this._linesWidth.length = 0;
                }
                var elastic = this._autoSize != 'none';
                var format = this.defaultTextFormat;
                var systemLetterSpacing = this.__getSystemLetterSpacing(format);
                var numLines = 0;
                var whiteSpaceIndex = -1;
                var widthFromWhiteSpace = 0;
                var currentLineText = '';
                var currentLineWidth = 0;
                for (var i = 0, len = this._text.length; i < len; ++i) {
                    var ch = this._text[i];
                    if (ch == '\n' || ch == '\r') {
                        if (ch == '\r' && currentLineWidth == 0) {
                            continue;
                        }
                        this._lines[numLines] = currentLineText;
                        this._linesWidth[numLines] = currentLineWidth;
                        numLines++;
                        whiteSpaceIndex = -1;
                        widthFromWhiteSpace = 0;
                        currentLineText = '';
                        currentLineWidth = 0;
                        continue;
                    }
                    var chWidth = TextField.__measureText(ch, format).width + systemLetterSpacing;
                    if (this._wordWrap && !elastic && currentLineWidth >= this._width && whiteSpaceIndex >= 0) {
                        var wholeLine = currentLineText;
                        currentLineText = wholeLine.substr(0, whiteSpaceIndex + 1);
                        currentLineWidth -= widthFromWhiteSpace;
                        this._lines[numLines] = currentLineText;
                        this._linesWidth[numLines] = currentLineWidth;
                        numLines++;
                        currentLineText = wholeLine.substr(whiteSpaceIndex + 1) + ch;
                        currentLineWidth = widthFromWhiteSpace + chWidth;
                        var matches = currentLineText.match(/\s/);
                        if (matches && matches.length) {
                            whiteSpaceIndex = currentLineText.lastIndexOf(matches[matches.length - 1]);
                            widthFromWhiteSpace = 0;
                            for (var j = whiteSpaceIndex + 1, jLen = currentLineText.length; j < jLen; ++j) {
                                widthFromWhiteSpace += TextField.__measureText(currentLineText[j], format).width + systemLetterSpacing;
                            }
                        }
                        else {
                            whiteSpaceIndex = 0;
                            widthFromWhiteSpace = 0;
                        }
                        continue;
                    }
                    else {
                        currentLineText += ch;
                        currentLineWidth += chWidth;
                    }
                    if (/\s/.test(ch)) {
                        whiteSpaceIndex = currentLineText.length - 1;
                        widthFromWhiteSpace = 0;
                    }
                    else {
                        widthFromWhiteSpace += chWidth;
                    }
                }
                this._lines[numLines] = currentLineText;
                this._linesWidth[numLines] = currentLineWidth;
                this._numLines = ((this._lines.length) >> 0);
                if (elastic) {
                    this._width = this.textWidth + 4;
                    this._height = this.textHeight + 2;
                    this.__updateRect();
                }
                this.__setDirty(2);
            };
            TextField.prototype.__getSystemLetterSpacing = function (format) {
                var char = text_1.TextFormat.MEASURE_CHAR;
                var width = TextField.__measureText(char, format).width;
                var doubleWidth = TextField.__measureText(char + char, format).width;
                return doubleWidth - width * 2;
            };
            TextField.prototype.__updateRect = function () {
                this._rect.__setTo(0, 0, this._width, this._height);
                if (this._border) {
                    this._rect.__expand(-1, -1, 1, 1);
                }
                if (this._nativeInput) {
                    this._nativeInput.setSize(this._rect.width, this._rect.height);
                }
            };
            TextField.prototype.__getWorldTransform = function () {
                var m = _super.prototype.__getWorldTransform.call(this);
                if (this._nativeInput) {
                    this._nativeInput.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                return m;
            };
            TextField.prototype.__drawEnter = function () {
                this._nativeVisible = false;
            };
            TextField.prototype.__drawExit = function () {
                this._nativeInput.setVisible(this._nativeVisible);
            };
            TextField.prototype.__isFocused = function () {
                if (this._nativeInput) {
                    if (this._nativeInput.isFocused()) {
                        return true;
                    }
                }
                return false;
            };
            TextField.prototype.__setFocus = function () {
                if (this._nativeInput) {
                    if (text_1.Capabilities.isMobile) {
                        return;
                    }
                    this._nativeInput.setFocus();
                }
            };
            TextField.prototype.__nativeConnect = function () {
                if (!this._nativeInput) {
                    return;
                }
                var b = this._nativeInput.body;
                var s = this.stage, container;
                if (!s || (container = s.__getBodyInternal()).contains(b)) {
                    return;
                }
                container.appendChild(b);
                this._nativeInput.setMouseHandler(this.__onNativeMouse.__bind(this));
                this._nativeInput.setKeyboardHandler(this.__onNativeKeyboard.__bind(this));
                this._nativeInput.setChangeHandler(this.__onNativeChange.__bind(this));
                text_1.DisplayObject.__addDOMElement(this);
            };
            TextField.prototype.__nativeDisconnect = function () {
                if (!this._nativeInput) {
                    return;
                }
                var b = this._nativeInput.body;
                var s = text_1.Stage.sCurrent, container;
                if (!s || !(container = s.__getBodyInternal()).contains(b)) {
                    return;
                }
                container.removeChild(b);
                this._nativeInput.setMouseHandler(null);
                this._nativeInput.setKeyboardHandler(null);
                this._nativeInput.setChangeHandler(null);
                text_1.DisplayObject.__removeDOMElement(this);
            };
            TextField.prototype.__onNativeMouse = function (e) {
                var s = this.stage;
                if (!s) {
                    return;
                }
                e.preventDefault = null;
                s.__onCanvasMouseEvent(e);
            };
            TextField.prototype.__onNativeKeyboard = function (e) {
                if (e.type == 'keydown') {
                    this.dispatchEvent(new text_1.Event(text_1.Event.CHANGE));
                }
            };
            TextField.prototype.__onNativeChange = function (e) {
                if (this._nativeInput) {
                    this.text = as(this._nativeInput.getText(), 'String');
                    this._nativeDirtyText = false;
                }
                this.dispatchEvent(new text_1.TextEvent(text_1.TextEvent.TEXT_INPUT));
            };
            TextField.__measureText = function (text, format) {
                var font = format.font;
                var size = format.size;
                var bold = format.bold;
                var italic = format.italic;
                var mask = 1 | (bold ? 2 : 0) | (italic ? 2 : 0);
                var measureSize = text_1.TextFormat.MEASURE_FONT_SIZE;
                var db = TextField.MEASURE_CACHE;
                var cache = TextField.MEASURE_RESULT;
                cache.width = 0;
                cache.height = 0;
                if (!font || font == '' || size < 1) {
                    return cache;
                }
                var dbFont = db[font];
                if (!dbFont) {
                    dbFont = db[font] = {};
                }
                var dbText = dbFont[text];
                if (!dbText) {
                    dbText = dbFont[text] = {};
                }
                var dbStyle = dbText[mask];
                if (!dbStyle) {
                    dbStyle = dbText[mask] = {
                        width: -1,
                        height: -1
                    };
                }
                var width = dbStyle.width;
                var height = dbStyle.height;
                if (width == -1 || height == -1) {
                    var ctx = text_1.Stage.sHelperCtx2d;
                    ctx.font = format.__getCss(true);
                    dbStyle.width = width = ctx.measureText(text).width;
                    dbStyle.height = height = measureSize * 1.185;
                }
                var p = size / measureSize;
                cache.width = width * p;
                cache.height = height * p;
                return cache;
            };
            TextField.prototype.toString = function () {
                return '[object TextField]';
            };
            TextField.MEASURE_CACHE = {};
            TextField.MEASURE_RESULT = {};
            return TextField;
        }(text_1.InteractiveObject));
        text_1.TextField = TextField;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextField.js.map