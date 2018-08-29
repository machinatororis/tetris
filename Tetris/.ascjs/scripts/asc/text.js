var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        Object.defineProperty(d, '__extends', {
            enumerable: false,
            configurable: false,
            value: b
        });
    };
})();

(function () {

    // this
    var _this = window.asc || (window.asc = {});

    // text
    var text = _this.text || (_this.text = {});

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                      NativeText                                                    //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function NativeText () {
        var _this = this;

        _this.__createDOM();

        _this.SCROLL_SHIFT = _this.__getScrollbarWidth();

        _this._bodyStyle = _this.body.style;
        _this._textStyle = _this._text.style;

        _this._bodyStyle.overflow = 'hidden';
        _this._bodyStyle.position = 'absolute';
        _this._bodyStyle.transformOrigin = 'left top';

        _this._textStyle.textAlign = 'left';
        _this._textStyle.overflow = 'scroll';
        _this._textStyle.position = 'relative';

        _this.setVisible(true);
        _this.setAlpha(1.0);
        _this.setSize(100, 100);
        _this.setTransform(1, 0, 0, 1, 0, 0);
        _this.setWordWrap(true);
        _this.setMouseWheel(true);
        _this.setSelectable(true);
		_this.setMultiline(false);
        _this.setTextFormat('Times', 12, 0x0, false, false, false, 'left', 0, 0, 0, 0);

        _this._text.onmousedown = _this._text.onmousemove = this._text.onmouseup = _this._text.onwheel = _this._defaultMouseHandler.bind(this);

        return _this;
    };

    Object.defineProperty(NativeText.prototype, 'setIndex', {
        value: function (value) {
            this._bodyStyle.zIndex = value;
        }
    });

    Object.defineProperty(NativeText.prototype, 'setMouseHandler', {
        value: function (value) {
            this._mouseHandler = value;
        }
    });

    Object.defineProperty(NativeText.prototype, 'setText', {
        value: function (value) {
            value = value.replace(/\r\n/g, '\n').replace(/\n/g, '<br>');
            this._text.innerHTML = value;
        }
    });

    Object.defineProperty(NativeText.prototype, 'setTextFormat', {
        value: function (font, size, color, bold, italic, underline, align, leftMargin, rightMargin, indent, leading, begin, end) {

            // TODO indent
            indent = 0;

            var r = this.__getPixelAspectRatio();
            var style = '';
            if (bold) {
                style += 'bold ';
            }
            if (italic) {
                style += 'italic ';
            }
            style += (+(size) / r) + 'px ' + font;

            this._lineHeight = Math.ceil((size|0) * 1.185) + leading;

            this._textStyle.font = style;
            this._textStyle.color = 'rgb(' + (((color)|0) >> 16 & 0xff) + ',' + (((color)|0) >> 8 & 0xff) + ',' + (((color)|0) & 0xff) + ')';
            this._textStyle.textDecoration = underline ? 'underline' : 'none';
            this._textStyle.textAlign = align;
            this._textStyle.marginLeft = leftMargin / r + 'px';
            this._textStyle.marginRight = rightMargin / r + 'px';
            this._textStyle.textIndent = indent / r + 'px';
            this._textStyle.lineHeight = this._lineHeight / r + 'px';
        }
    });

    Object.defineProperty(NativeText.prototype, 'setSize', {
        value: function (width, height) {
			this._width = width;
			this._height = height;
			this.__updateSize();
        }
    });

    Object.defineProperty(NativeText.prototype, 'setTransform', {
        value: function (a, b, c, d, tx, ty) {
            var m = this._matrix = this._matrix || {};

            if (m.a === a && m.b === b && m.c === c && m.d === d && m.tx === tx && m.ty === ty) {
                return;
            }

            var r = this.__getPixelAspectRatio();
            var s = 'matrix(';
            s += (m.a = a) + ',';
            s += (m.b = b) + ',';
            s += (m.c = c) + ',';
            s += (m.d = d) + ',';
            s += (m.tx = tx) / r + ',';
            s += (m.ty = ty) / r + ')';

            this._bodyStyle.transform = s;
            this.__updateMargin();
        }
    });

    Object.defineProperty(NativeText.prototype, 'setVisible', {
        value: function (value) {
            if (this._visible == value) {
                return;
            }
            this._visible = value;
            this._bodyStyle.visibility = value ? 'visible' : 'hidden';
        }
    });

    Object.defineProperty(NativeText.prototype, 'setAlpha', {
        value: function (value) {
            if (this._alpha == value) {
                return;
            }
            this._alpha = value;
            this._bodyStyle.opacity = value;
        }
    });

    Object.defineProperty(NativeText.prototype, 'setMouseWheel', {
        value: function (value) {
            this._mouseWheel = value;
        }
    });

    Object.defineProperty(NativeText.prototype, 'setWordWrap', {
        value: function (value) {
            this._wordWrap = value;
            this.__updateWhiteSpace();
        }
    });

    Object.defineProperty(NativeText.prototype, 'setMultiline', {
        value: function (value) {
            this._multiline = value;
            this.__updateWhiteSpace();
        }
    });

    Object.defineProperty(NativeText.prototype, 'getScrollH', {
        value: function () {
            return this._text.scrollLeft;
        }
    });

    Object.defineProperty(NativeText.prototype, 'getScrollV', {
        value: function () {
            return Math.max((this._text.scrollTop / this._lineHeight)|0, 1);
        }
    });

    Object.defineProperty(NativeText.prototype, 'getMaxScrollH', {
        value: function () {
            return this._text.scrollWidth - this._text.clientWidth;
        }
    });

    Object.defineProperty(NativeText.prototype, 'getMaxScrollV', {
        value: function () {
            return (Math.ceil((this._text.scrollHeight - this._text.clientHeight) / this._lineHeight)|0) + 1;
        }
    });

    Object.defineProperty(NativeText.prototype, 'setScrollH', {
        value: function (value) {
            this._text.scrollLeft = value;
        }
    });

    Object.defineProperty(NativeText.prototype, 'setScrollV', {
        value: function (value) {
            this._text.scrollTop = ((value-1) * this._lineHeight);
        }
    });

    Object.defineProperty(NativeText.prototype, 'setSelectable', {
        value: function (value) {
            if (value) {
                this._textStyle.userSelect = 'auto';
                this._textStyle.mozUserSelect = 'auto';
                this._textStyle.webkitUserSelect = this._textStyle.khtmlUserDrag = this._textStyle.khtmlUserSelect = this._textStyle.mozUserSelect = this._textStyle.msUserSelect = 'auto';
            } else {
                this._textStyle.userSelect = 'none';
                this._textStyle.mozUserSelect = '-moz-none';
                this._textStyle.webkitUserSelect = this._textStyle.khtmlUserDrag = this._textStyle.khtmlUserSelect = this._textStyle.mozUserSelect = this._textStyle.msUserSelect = 'none';
            }
        }
    });

    Object.defineProperty(NativeText.prototype, 'setMaxChars', {
        value: function (value) {
            // not implemented
        }
    });

    Object.defineProperty(NativeText.prototype, 'setRestrict', {
        value: function (value) {
            // not implemented
        }
    });

    Object.defineProperty(NativeText.prototype, 'getSelectionBegin', {
        value: function () {
            return this.__getSelected().begin;
        }
    });

    Object.defineProperty(NativeText.prototype, 'getSelectionEnd', {
        value: function () {
            return this.__getSelected().end;
        }
    });

    Object.defineProperty(NativeText.prototype, 'isFocused', {
        value: function () {
            return document.activeElement === this._text;
        }
    });

    Object.defineProperty(NativeText.prototype, 'setFocus', {
        value: function () {
            this._text.focus();
        }
    });

    Object.defineProperty(NativeText.prototype, 'setSelection', {
        value: function (begin, end) {
            // not implemented
        }
    });

    Object.defineProperty(NativeText.prototype, '__getSelected', {
        value: function () {
            // not implemented
            return { begin: 0, end: 0 };
        }
    });

    Object.defineProperty(NativeText.prototype, '__getScrollbarWidth', {
        value: function () {
            var outer = document.createElement('div');
            var inner = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.width = '100px';
            inner.style.width = '100%';
            outer.appendChild(inner);
            document.body.appendChild(outer);
            var widthWithoutScrollbar = outer.offsetWidth;
            outer.style.overflow = 'scroll';
            var widthWithScrollbar = inner.offsetWidth;
            document.body.removeChild(outer);
            return (widthWithoutScrollbar - widthWithScrollbar);
        }
    });

    Object.defineProperty(NativeText.prototype, '__updateWhiteSpace', {
        value: function () {
            var whiteSpace = 'pre-line';
            if (!this._wordWrap) {
                whiteSpace = 'pre';
            }
            if (!this._multiline) {
                whiteSpace = 'nowrap';
            }
            this._textStyle.whiteSpace = whiteSpace;
        }
    });
	
	Object.defineProperty(NativeText.prototype, '__updateSize', {
        value: function () {
			var x = this.SCROLL_SHIFT, y = this.SCROLL_SHIFT;
			var width = this._width, height = this._height;

            var r = this.__getPixelAspectRatio();
            x /= r; y /= r;
            width /= r; height /= r;
			
			width += x;
			height += y;

            this.__updateMargin();
			
			this._textStyle.left = x + 'px';
			this._textStyle.top = y + 'px';

            this._bodyStyle.width = width + 'px';
            this._bodyStyle.height = height + 'px';
			
			this._textStyle.width = width + 'px';
			this._textStyle.height = height + 'px';
        }
    });

    Object.defineProperty(NativeText.prototype, '__updateMargin', {
        value: function () {
            var x = this.SCROLL_SHIFT, y = this.SCROLL_SHIFT;

            var m = this._matrix;
            if (typeof m === 'object') {
                var px = x, py = y;
                x = m.a * px + m.c * py;
                y = m.d * py + m.b * px;
            }

            this._bodyStyle.marginLeft = -x + 'px';
            this._bodyStyle.marginTop = -y + 'px';
        }
    });

	Object.defineProperty(NativeText.prototype, '__textProcess', {
        value: function (value) {
			var value = value || '';
			
            if (typeof this._restrict === 'object' && this._restrict !== null) {
                value = this._restrict.split(value).join('');
			}

			if (typeof this._maxChars === 'number' && this._maxChars > 0) {
				value = value.substr(0, this._maxChars);
			}
			
			return value;
        }
    });
	
	Object.defineProperty(NativeText.prototype, '_defaultMouseHandler', {
        value: function (e) {
            switch (e.type) {
                case 'mousewheel':
                case 'DOMMouseScroll':
                    if (!this._mouseWheel) {
                        return false;
                    }
                    break;
            }
            if (typeof this._mouseHandler === 'function') {
                this._mouseHandler(e);
            }
        }
    });
	
	Object.defineProperty(NativeText.prototype, '__createDOM', {
        value: function (value) {
            this.body = document.createElement('div');
            this.body.appendChild(this._text = document.createElement('div'));
        }
    });

    Object.defineProperty(NativeText.prototype, '__getPixelAspectRatio', {
        value: function () {
            return window.devicePixelRatio > 0 ? window.devicePixelRatio : 1;
        }
    });

    Object.defineProperty(NativeText.prototype, '__createRegExp', {
        value: function (restrict) {
            var EReg;
            if (asc.utils && typeof (EReg = asc.utils.EReg) === 'function') {
                return null;
            }

            var declinedRange = new EReg('\\^(.-.|.)', 'gu');
            var declined = '';

            var parts = [];
            var accepted = declinedRange.map (restrict, function (ereg) {
                declined += ereg.matched (1); return '';
            });

            if (accepted.length > 0) {
                parts.push ('[^' + restrict + ']');
            }

            if (declined.length > 0) {
                parts.push ('[' + declined + ']');
            }

            return new EReg ('(' + parts.join('|') + ')', 'g');
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                      NativeInput                                                   //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var NativeInput = (function (_super) {
        __extends(NativeInput, _super);
        function NativeInput() {
            var _newTarget = this.constructor, _this = this;
            _this = _super.call(this) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);

            _this._textStyle.border = 'none';
            _this._textStyle.background = 'none';
            _this._textStyle.outline = 'none';

            _this._text.onkeydown = _this._text.onkeyup = _this._defaultKeyboardHandler.bind(this);
            _this._text.oninput = _this._defaultChangeHandler.bind(this);

            return _this;
        }
        return NativeInput;
    }(NativeText));

    Object.defineProperty(NativeInput.prototype, 'setText', {
        value: function (value) {
            value = value || '';
            this._text.value = this.__textProcess(value);
        }
    });

    Object.defineProperty(NativeInput.prototype, 'getText', {
        value: function () {
            return this._text.value;
        }
    });

    Object.defineProperty(NativeInput.prototype, 'setSelectable', {
        value: function (value) {
            this._text.readOnly = !value;
        }
    });

    Object.defineProperty(NativeInput.prototype, 'setKeyboardHandler', {
        value: function (value) {
            this._ketboardHandler = value;
        }
    });

    Object.defineProperty(NativeInput.prototype, 'setChangeHandler', {
        value: function (value) {
            this._changeHandler = value;
        }
    });

    Object.defineProperty(NativeInput.prototype, 'setMaxChars', {
        value: function (value) {
            this._maxChars = (+value)|0;
            this._text.maxLength = this._maxChars > 0 ? this._maxChars : 0x7fffffff;
            this._text.value = this.__textProcess(this._text.value);
        }
    });

    Object.defineProperty(NativeInput.prototype, 'setRestrict', {
        value: function (value) {
            value = value || '';
            if (value.length > 0) {
                this._restrict = this.__createRegExp(value);
            } else {
                this._restrict = null;
            }
            this._text.value = this.__textProcess(this._text.value);
        }
    });

    Object.defineProperty(NativeInput.prototype, 'setSelection', {
        value: function (begin, end) {
            this._text.setSelectionRange(begin, end);
        }
    });

    Object.defineProperty(NativeInput.prototype, '__getSelected', {
        value: function () {
            return {
                begin: this._text.selectionStart,
                end: this._text.selectionEnd
            };
        }
    });

    Object.defineProperty(NativeInput.prototype, '_defaultKeyboardHandler', {
        value: function (e) {
            if (typeof this._ketboardHandler === 'function') {
                this._ketboardHandler(e);
            }
        }
    });

    Object.defineProperty(NativeInput.prototype, '_defaultChangeHandler', {
        value: function (e) {
            this._text.value = this.__textProcess(this._text.value);
            this.__updateSize();

            if (typeof this._changeHandler === 'function') {
                this._changeHandler(e);
            }
        }
    });

    Object.defineProperty(NativeInput.prototype, '__createDOM', {
        value: function (value) {
            this.body = document.createElement('div');
            this.body.appendChild(this._text = document.createElement('textarea'));
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                       Attach                                                       //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    text.NativeText = NativeText;
    text.NativeInput = NativeInput;

})();