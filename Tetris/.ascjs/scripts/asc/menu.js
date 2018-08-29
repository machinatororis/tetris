(function () {
	// this
    var _this = window.asc || (window.asc = {});

    // system
    var system = _this.system || (_this.system = {});

    // menu
    var menu = _this.menu || (_this.menu = {});

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                    ContextMenu                                                     //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function ContextMenu () {

        this.__body = createDiv();
        this.__body.style.zIndex = 128;
        this.__body.style.minWidth = 250;
        this.__body.style.flexDirection = 'column';
        this.__body.style.display = 'flex';
        this.__body.style.position = 'absolute';
        this.__body.style.paddingTop = '2px';
        this.__body.style.paddingBottom = '2px';
        this.__body.style.transformOrigin = 'left top';
        this.__body.style.font = '9pt ' + getSystemFont();

        this.__body.addEventListener('touchstart', preventDefault);
        this.__body.addEventListener('touchend', preventDefault);
        this.__body.addEventListener('touchcancel', preventDefault);
        this.__body.addEventListener('mousedown', preventDefault);
        this.__body.addEventListener('mousemove', preventDefault);

        setBackground(this.__body, 'white');
        addShadow(this.__body, 2, 2, 3, 'rgba(0,0,0,0.56)');
        addBorder(this.__body, 1, 0xbababa);

        this.__initHitArea = [];

        return this;
    }

    Object.defineProperty(ContextMenu.prototype, 'open', {
        value: function (parent, items, x, y) {
            this.close();

            if (!parent || !items || !items.length) {
                return;
            }

            this.__clear();
            this.__build(items);
            (this.__parent = parent).appendChild(this.__body);

            this.__x = x|0;
            this.__y = y|0;

            this.__resize(true);
            this.__resizeInterval = setInterval(this.__resize.bind(this), 100);

            this.__autoHideHandler = function (e) {
                if (e && this.__body.contains(e.target)) {
                    return;
                }
                this.close();
            }.bind(this);
            document.addEventListener("mouseup", this.__autoHideHandler);
            document.addEventListener("touchend", this.__autoHideHandler);
            document.addEventListener("touchcancel", this.__autoHideHandler);

            this.__opened = true;
        }
    });

    Object.defineProperty(ContextMenu.prototype, 'close', {
        value: function () {
            if (this.__body.parentElement) {
                this.__body.parentElement.removeChild(this.__body);
            }

            clearInterval(this.__resizeInterval);

            document.removeEventListener("mouseup", this.__autoHideHandler);
            document.removeEventListener("touchend", this.__autoHideHandler);
            document.removeEventListener("touchcancel", this.__autoHideHandler);

            this.__opened = false;
        }
    });

    Object.defineProperty(ContextMenu.prototype, 'opened', {
        get: function () {
            return this.__opened;
        }
    });

    Object.defineProperty(ContextMenu.prototype, '__build', {
        value: function (items) {
            for (var i = 0, len = items.length; i < len; ++i) {
                var o = items[i];
                if (o.separatorBefore) {
                    this.__body.appendChild(createLine());
                }
                this.__body.appendChild(this.__createRow(o));
            }
        }
    });

    Object.defineProperty(ContextMenu.prototype, '__clear', {
        value: function () {
            this.__body.innerHTML = '';
            this.__initHitArea.length = 0;
        }
    });

    Object.defineProperty(ContextMenu.prototype, '__resize', {
        value: function (force) {
            while (this.__initHitArea.length) {
                var select = this.__initHitArea.pop();
                select.style.height = (select.parentElement.clientHeight) + 'px';
            }

            var ratio = window.devicePixelRatio > 0 ? window.devicePixelRatio : 1;
            var width = this.__parent.clientWidth;
            var height = this.__parent.clientHeight;
            if (!force) {
                if (ratio === this.__ratio && width === this.__width && height === this.__height) {
                    return;
                }
            }

            var x = Math.min(Math.max(this.__x, 0), (width * ratio) - (this.__body.clientWidth + 12));
            var y = Math.min(Math.max(this.__y, 0), (height * ratio) - (this.__body.clientHeight + 12));
            this.__body.style.left = (x / ratio) + 'px';
            this.__body.style.top = (y / ratio) + 'px';

            var scale = 1 / ratio;
            this.__body.style.transform = 'scale(' + scale + ',' + scale + ')';

            this.__ratio = ratio;
            this.__width = width;
            this.__height = height;
        }
    });

    Object.defineProperty(ContextMenu.prototype, '__createRow', {
        value: function (o) {
            var div = createDiv();
            div.style.marginLeft = '26px';
            div.style.marginRight = '26px';
            div.style.paddingTop = '4px';
            div.style.paddingBottom = '4px';
            if (!o.enabled) {
                div.style.color = '#a1a192';
            }
            if (!o.visible) {
                div.style.visibility = 'hidden';
            }

            var spt = (o.caption || '').split('\t');
            var left = createDiv();
            left.style.float = 'left';
            left.innerHTML = spt[0];

            var right = createDiv();
            right.style.float = 'right';
            right.style.textAlign = 'right';
            right.style.color = '#a1a192';
            if (spt.length > 1) {
                right.innerHTML = spt[spt.length-1];
                right.style.marginLeft = '26px';
            }

            div.appendChild(left);
            div.appendChild(right);

            var select = createDiv('100%', 0);
            select.style.backgroundColor = '#ebebeb';
            select.style.position = 'absolute';
            select.style.marginLeft = '-26px';
            select.style.marginTop = '-4px';
            select.style.opacity = 0;
            select.style.zIndex = -1;
            div.appendChild(select);

            var h = function (e) {
                preventDefault(e);

                var isSelect = o.enabled && o.visible;
                var isClick = false;
                switch (e.type) {
                    case 'mouseleave':
                        isSelect = false;
                        break;
                    case 'mouseup':
                    case 'touchend':
                        isClick = isSelect;
                        break;
                }

                select.style.opacity = isSelect ? 1 : 0;
                right.style.color = isSelect ? 'inherit' : '#a1a192';

                if (isClick) {
                    this.close();
                    if (typeof o.click === 'function') {
                        o.click();
                    }
                }

            }.bind(this);

            if (isMobile()) {
                div.addEventListener('touchstart', h);
                div.addEventListener('touchend', h);
                div.addEventListener('touchcancel', h);
            } else {
                div.addEventListener('mouseenter', h);
                div.addEventListener('mouseleave', h);
                div.addEventListener('mouseup', h);
            }

            this.__initHitArea.push(select);
            return addCursor(div, 'default');
        }
    });

    function createDiv (w, h, x, y) {
        var div = document.createElement('div');
        if (typeof w === 'number') {
            div.style.width = w + 'px';
        } else if (typeof w === 'string') {
            div.style.width = w;
        }
        if (typeof h === 'number') {
            div.style.height = h + 'px';
        } else if (typeof h === 'string') {
            div.style.height = h;
        }
        setMargin(div, x, y);
        return div;
    }

    function createRoundDiv (w, h, r, x, y) {
        var div = createDiv(w, h);
        div.style.borderRadius = r + 'px';
        setMargin(div, x, y);
        return div;
    }

    function createLine () {
        var hr = document.createElement('hr');
        hr.setAttribute('noshade', true);
        hr.style.borderColor = '#e9e9e9';
        hr.style.borderTop = '#e9e9e9';
        hr.style.marginLeft = '2px';
        hr.style.marginRight = '2px';
        return hr;
    }

    function setBackground (div, color) {
        if (typeof color === 'number') {
            div.style.backgroundColor = '#' + color.toString(16);
        } else if (typeof color === 'string') {
            div.style.backgroundColor = color;
        }
        return div;
    }

    function setMargin (div, x, y) {
        if (typeof x === 'number') {
            div.style.marginLeft = x + 'px';
        } else if (typeof x === 'string') {
            div.style.marginLeft = x;
        }
        if (typeof y === 'number') {
            div.style.marginTop = y + 'px';
        } else if (typeof y === 'string') {
            div.style.marginTop = y;
        }
        return div;
    }

    function addShadow (div, x, y, blur, color) {
        if (typeof x === 'number') x = (x|0) + 'px';
        if (typeof y === 'number') y = (y|0) + 'px';
        if (typeof blur === 'number') blur = (blur|0) + 'px';
        if (typeof color === 'number') color = '#' + color.toString(16);
        div.style.boxShadow = x + ' ' + y + ' ' + blur + ' ' + color;
        return div;
    }

    function addBorder (div, size, color) {
        if (typeof size === 'number') size = (size|0) + 'px';
        if (typeof color === 'number') color = '#' + color.toString(16);
        div.style.border = size + ' solid ' + color;
        return div;
    }

    function addCursor (div, cursor) {
        div.style.cursor = cursor;
        return div;
    }

    function isMobile () {
        if (system.Capabilities) {
            return system.Capabilities.mobile;
        }
        return false;
    }

    function getSystemFont () {
        if (system.Capabilities) {
            return system.Capabilities.font;
        }
        return 'Arial';
    }

    function preventDefault (e) {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        if (e && typeof e.stopImmediatePropagation === 'function') {
            e.stopImmediatePropagation();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                       Attach                                                       //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    menu.ContextMenu = ContextMenu;

})();