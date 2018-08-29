(function () {

    // this
    var _this = window.asc || (window.asc = {});

    // system
    var system = _this.system || (_this.system = {});

    // panel
    var panel = _this.panel || (_this.panel = {});

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                      Icons                                                         //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var SVG = {
        HORN: '<svg width="100%" height="100%" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g><polygon stroke="[color]" stroke-width="5" stroke-linejoin="round" fill="[color]" points="31.040430068969727,8.758011117577553 16.369016647338867,21.447723641991615 2.4836151599884033,21.447723641991615 2.4836151599884033,37.77761675417423 16.158618927001953,37.77761675417423 31.040430068969727,50.650381341576576 31.040430068969727,8.758011117577553 " id="polygon1"/><path stroke="[color]" fill="none" stroke-width="5" stroke-linecap="round" d="m38.514675,38.915891c1.649827,-2.647934 2.618855,-5.763704 2.618855,-9.111253c0,-3.402287 -0.995541,-6.563387 -2.691553,-9.236979" id="path1"/><path stroke="[color]" fill="none" stroke-width="5" stroke-linecap="round" d="m44.462263,14.546517c3.160244,4.264405 5.032443,9.542312 5.032443,15.258121c0,5.662781 -1.839698,10.894503 -4.950336,15.137527" id="path2"/><path stroke="[color]" fill="none" stroke-width="5" stroke-linecap="round" d="m50.131031,50.531392c4.504738,-5.701269 7.199712,-12.897559 7.199712,-20.725899c0,-7.883077 -2.73004,-15.122987 -7.286095,-20.841361" id="path1"/></g></svg>',
        HORN2: '<svg width="100%" height="100%" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g stroke="null"><polygon stroke="[color]" stroke-width="5" stroke-linejoin="round" fill="[color]" points="31.404865264892578,8.694420248270035 16.51249885559082,21.57529106736183 2.417943000793457,21.57529106736183 2.417943000793457,38.151018530130386 16.298933029174805,38.151018530130386 31.404865264892578,51.21766510605812 31.404865264892578,8.694420248270035 " id="polygon1"/><path stroke="[color]" fill="none" stroke-width="5" stroke-linecap="round" d="m39.446436,40.382762l18.0086,-21.095052" id="path3003"/><path stroke="[color]" fill="none" stroke-width="5" stroke-linecap="round" d="m57.455037,40.382762l-18.0086,-21.095052" id="path3003-1"/></g></svg>',
        EXPAND: '<svg width="100%" height="100%" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path fill="[color]" stroke="null" d="m8.574109,38.583491l-8.574109,0l0,21.435273l21.435273,0l0,-8.574109l-12.861164,0l0,-12.861164zm-8.574109,-17.148218l8.574109,0l0,-12.861164l12.861164,0l0,-8.574109l-21.435273,0l0,21.435273zm51.444654,30.009382l-12.861164,0l0,8.574109l21.435273,0l0,-21.435273l-8.574109,0l0,12.861164zm-12.861164,-51.444654l0,8.574109l12.861164,0l0,12.861164l8.574109,0l0,-21.435273l-21.435273,0z"/></svg>',
        NARROW: '<svg width="100%" height="100%" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path fill="[color]" stroke="null" d="m0,47.185865l12.868873,0l0,12.868873l8.579247,0l0,-21.44812l-21.44812,0l0,8.579247zm12.868873,-34.316992l-12.868873,0l0,8.579247l21.44812,0l0,-21.44812l-8.579247,0l0,12.868873zm25.737745,47.185865l8.579247,0l0,-12.868873l12.868873,0l0,-8.579247l-21.44812,0l0,21.44812zm8.579247,-47.185865l0,-12.868873l-8.579247,0l0,21.44812l21.44812,0l0,-8.579247l-12.868873,0z"/></svg>'
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                  ASCPanelButton                                                    //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function ASCPanelButton (panel, id, restore, width, height, iconWidth, iconHeight, corner, icons, handlers) {

        this.panel = panel;
        this.id = id;
        this.restore = restore;

        this.__x = this.__y = 0;
        this.__width = width;
        this.__height = height;
        this.__iconWidth = iconWidth;
        this.__iconHeight = iconHeight;
        this.__corner = corner;
        this.__icons = icons || [];
        this.__handlers = handlers || {};

        for (var f in this.__handlers) {
            if (typeof this.__handlers[f] === 'function') {
                this.__handlers[f] = this.__handlers[f].bind(this);
            }
        }

        this.body = createRoundDiv(this.__width, this.__height, this.__corner);
        this.__iconsBody = createDiv(this.__iconWidth, this.__iconHeight, (this.__width - this.__iconWidth)/ 2, (this.__height - this.__iconHeight) / 2);
        this.body.appendChild(this.__iconsBody);

        for (var i = 0, len = this.__icons.length; i < len; ++i) {
            this.__iconsBody.appendChild(this.__icons[i]);
        }

        if (!isMobile()) {
            addCursor(this.body, 'pointer');
        }

        return this;

    }

    Object.defineProperty(ASCPanelButton.prototype, 'click', {
        value: function () {
            if (typeof this.__handlers.click === 'function') {
                this.__handlers.click();
            }
        }
    });

    Object.defineProperty(ASCPanelButton.prototype, 'state', {
        get: function () {
            if (typeof this.__handlers.get === 'function') {
                this.__state = this.__handlers.get();
            }
            return this.__state;
        },
        set: function (state) {
            if (state < 0) {
                state = this.__icons.length-1;
            }
            if (state > this.__icons.length-1) {
                state = 0;
            }
            this.__state = state;
            if (typeof this.__handlers.set === 'function') {
                this.__handlers.set(this.__state);
            }
            this.__updateIcon();
        }
    });

    Object.defineProperty(ASCPanelButton.prototype, 'x', {
        get: function () {
            return this.__x;
        },
        set: function (v) {
            this.__x = v;
            setMargin(this.body, this.__x, this.__y);
        }
    });

    Object.defineProperty(ASCPanelButton.prototype, 'y', {
        get: function () {
            return this.__y;
        },
        set: function (v) {
            this.__y = v;
            setMargin(this.body, this.__x, this.__y);
        }
    });

    Object.defineProperty(ASCPanelButton.prototype, 'close', {
        value: function (a) {
            if (!this.panel || typeof this.panel.close !== 'function') {
                return;
            }
            this.panel.close(a);
        }
    });

    Object.defineProperty(ASCPanelButton.prototype, 'mouseHandler', {
        get: function () {
            return this.__mouseHandler;
        },
        set: function (h) {
            if (isMobile()) {
                this.body.addEventListener('touchstart', h);
                this.body.addEventListener('touchend', h);
                this.body.addEventListener('touchcancel', h);
                this.body.addEventListener('mousedown', preventDefault);
                this.body.addEventListener('mousemove', preventDefault);
            } else {
                this.body.addEventListener('mousedown', h);
                this.body.addEventListener('mouseup', h);
            }
            this.__mouseHandler = h;
        }
    });

    Object.defineProperty(ASCPanelButton.prototype, 'expandTopLeft', {
        value: function (top, left) {
            var div = createDiv(this.__width + left, this.__height + top, -left, -top);
            this.body.appendChild(div);
        }
    });

    Object.defineProperty(ASCPanelButton.prototype, '__updateIcon', {
        value: function () {
            var children = this.__iconsBody.children || [];
            for (var i = 0, len = children.length; i < len; ++i) {
                var c = children[i];
                if (i === this.state) {
                    c.style.visibility = 'inherit';
                    continue;
                }
                c.style.visibility = 'hidden';
            }
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                      ASCPanel                                                      //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function ASCPanel (options) {

        var config = {
            size: {
                panel: {
                    width: 150,
                    height: 150,
                    corner: 5
                },
                icon: {
                    width: 60,
                    height: 60
                }
            },
            margin: {
                panel: {
                    x: 12,
                    y: 12
                }
            },
            color: {
                main: 'white',
                icon: 0x595959,
                buttonSelect: 0xe6e6e6,
                shadowToggle: 'black',
                shadowPanel: 'rgba(0,0,0,0.5)'
            },
            time: {
                panelShow: 200,
                buttonsShow: 100,
                buttonsSelect: 100,
                updateInterval: 100
            }
        };

        if (typeof options.config === 'object') {
            iterate(config, options.config);

            function iterate (t, f) {
                for (var p in t) {
                    if (typeof t[p] === 'object' && typeof f[p] === 'object' && f[p] !== null) {
                        iterate(t[p], f[p]);
                        continue;
                    }
                    if (typeof f[p] !== 'undefined') {
                        t[p] = f[p];
                    }
                }
            }
        }

        this.__align = options.align;
        this.__layoutViewport = { width: 1920, height: 1080 };
        this.__viewport = { x: 0, y: 0, width: 0, height: 0 };
        this.__config = config;
        this.__width = 0;
        this.__height = this.__config.size.panel.height;
        this.__collection = {};
        this.__collection.sound = new ASCPanelButton(
            this, 'sound', true,
            this.__config.size.panel.width, this.__config.size.panel.height,
            this.__config.size.icon.width, this.__config.size.icon.height,
            this.__config.size.panel.corner,
            [
                createSvg(setSVGColor(SVG.HORN, this.__config.color.icon)),
                createSvg(setSVGColor(SVG.HORN2, this.__config.color.icon))
            ],
            {
                click: function () {
                    this.state++;
                },
                get: function () {
                    if (window.flash && flash.media && typeof flash.media.SoundMixer === 'function') {
                        return flash.media.SoundMixer.__muted ? 1 : 0;
                    }
                    return 0;
                },
                set: function () {
                    if (window.flash && flash.media && typeof flash.media.SoundMixer === 'function') {
                        switch (this.__state) {
                            case 0:
                                if (!flash.media.SoundMixer.__muted) {
                                    return;
                                }
                                break;
                            case 1:
                                if (flash.media.SoundMixer.__muted) {
                                    return;
                                }
                                break;
                        }
                        flash.media.SoundMixer.__setMute(this.__state === 1);
                    }
                }
            }
        );

        this.__collection.displayState = new ASCPanelButton(
            this, 'displayState', false,
            this.__config.size.panel.width, this.__config.size.panel.height,
            this.__config.size.icon.width, this.__config.size.icon.height,
            this.__config.size.panel.corner,
            [
                createSvg(setSVGColor(SVG.EXPAND, this.__config.color.icon)),
                createSvg(setSVGColor(SVG.NARROW, this.__config.color.icon))
            ],
            {
                click: function () {
                    this.state++;
                },
                get: function () {
                    if (window.flash && flash.display && typeof flash.display.Stage === 'function' && typeof flash.display.Stage.sCurrent === 'object') {
                        return flash.display.Stage.sCurrent.displayState === 'fullScreen' ? 1 : 0;
                    }
                    return 0;
                },
                set: function () {
                    if (window.flash && flash.display && typeof flash.display.Stage === 'function' && typeof flash.display.Stage.sCurrent === 'object') {
                        switch (this.__state) {
                            case 0:
                                if (flash.display.Stage.sCurrent.displayState === 'normal') {
                                    return;
                                }
                                break;
                            case 1:
                                if (flash.display.Stage.sCurrent.displayState === 'fullScreen') {
                                    return;
                                }
                                break;
                        }
                        flash.display.Stage.sCurrent.displayState = this.__state === 1 ? 'fullScreen' : 'normal';
                        this.close(false);
                    }
                }
            }
        );

        this.body = createDiv();
        this.body.style.zIndex = typeof options.zIndex !== 'undefined' ? options.zIndex : 64;
        this.body.appendChild(this.__toggle = createToggle(this.__config.color.main, this.__config.color.shadowToggle));
        this.body.addEventListener('contextmenu', preventDefault);

        if (!isMobile()) {
            addCursor(this.__toggle, 'pointer');
        }

        this.body.appendChild(this.__panel = createRoundDiv(this.__width, this.__height, this.__config.size.panel.corner));
        setBackground(this.__panel, this.__config.color.main);
        setMargin(this.__panel, this.__config.margin.panel.x, this.__config.margin.panel.y);
        addShadow(this.__panel, 0, 0, 30, this.__config.color.shadowPanel);

        this.__buttons = [];
        if (typeof options === 'object') {
            if (typeof options.buttons === 'object') {
                var x = 0;
                for (var i = 0, len = options.buttons.length; i < len; ++i) {
                    var id = options.buttons[i];
                    if (typeof id !== 'string' || !this.__collection[id]) {
                        continue;
                    }
                    if (id == 'displayState' && system.Capabilities && /(iOS)/.test(system.Capabilities.os)) {
                        continue;
                    }
                    var b = this.__collection[id];
                    b.state = 0;
                    b.x = x;
                    b.mouseHandler = this.__onButtonMouse.bind(this);
                    b.expandTopLeft(this.__config.margin.panel.x, this.__config.margin.panel.y);
                    b.body.style.willChange = 'opacity, background-color';
                    this.__panel.appendChild(b.body);
                    x += config.size.panel.width;
                    this.__width += this.__config.size.panel.width;
                    this.__buttons.push(b);
                }
            }
        }

        if (isMobile()) {
            h = this.__onToggleMouseDown.bind(this);
            this.__toggle.addEventListener('touchstart', h);

            h = this.__onWindowMouseUp.bind(this);
            window.addEventListener('touchend', h);
            window.addEventListener('touchcancel', h);
            this.__toggle.addEventListener('mousedown', preventDefault);
            this.__toggle.addEventListener('mousemove', preventDefault);
        } else {
            h = this.__onToggleMouseDown.bind(this);
            this.__toggle.addEventListener('mousedown', h);

            h = this.__onWindowMouseUp.bind(this);
            window.addEventListener('mouseup', h);
        }

        this.__panel.style.willChange = 'width, height';
        this.__panel.addEventListener('transitionend', this.__onTransitionEnd.bind(this));

        this.__updateTransform();
        
        this.__load();
        this.__update();

        this.close(false);
        setInterval(this.__update.bind(this), this.__config.time.updateInterval);

        return this;

    }

    Object.defineProperty(ASCPanel.prototype, 'align', {
        get: function () {
            return this.__align;
        },
        set: function (v) {
            this.__align = v;
            this.__updateTransform();
        }
    });

    Object.defineProperty(ASCPanel.prototype, 'visible', {
        get: function () {
            return this.__visible;
        },
        set: function (v) {
            this.body.style.visibility = (this.__visible = v) ? 'visible' : 'hidden';
        }
    });

    Object.defineProperty(ASCPanel.prototype, 'open', {
        value: function (a) {
            this.__showed = true;
            if (typeof a === 'undefined' || a === true) {
                this.__transition = true;
                this.__panel.style.transition = 'width ' + this.__config.time.panelShow + 'ms, height ' + this.__config.time.panelShow + 'ms';
                this.__panel.style.transitionDelay = '0ms';
            } else {
                this.__transition = false;
                this.__panel.style.transition = '';
            }
            this.__panel.style.visibility = 'visible';
            this.__panel.style.width = this.__width + 'px';
            this.__panel.style.height = this.__height + 'px';
            this.__showButtons(a);
        }
    });

    Object.defineProperty(ASCPanel.prototype, 'close', {
        value: function (a) {
            this.__showed = false;
            if (typeof a === 'undefined' || a === true) {
                this.__transition = true;
                this.__panel.style.transition = 'width ' + this.__config.time.panelShow + 'ms, height ' + this.__config.time.panelShow + 'ms';
                this.__panel.style.transitionDelay = this.__config.time.buttonsShow + 'ms';
            } else {
                this.__transition = false;
                this.__panel.style.visibility = 'hidden';
            }
            this.__panel.style.width = 0 + 'px';
            this.__panel.style.height = 0 + 'px';
            this.__hideButtons(a);
        }
    });

    Object.defineProperty(ASCPanel.prototype, 'setViewport', {
        value: function (x, y, w, h) {
            this.__viewport.x = (+x)|0;
            this.__viewport.y = (+y)|0;
            this.__viewport.width = (+w)|0;
            this.__viewport.height = (+h)|0;
            this.__updateTransform();
        }
    });

    Object.defineProperty(ASCPanel.prototype, 'getSavedState', {
        value: function (id) {
            if (!this.__so) {
                return 0;
            }
            return this.__so.data[id];
        }
    });

    Object.defineProperty(ASCPanel.prototype, '__showButtons', {
        value: function (a) {
            for (var i = 0, len = this.__buttons.length; i < len; ++i) {
                var b = this.__buttons[i];
                if (typeof a === 'undefined' || a === true) {
                    b.body.style.transition = 'opacity ' + this.__config.time.buttonsShow + 'ms, background-color ' + this.__config.time.buttonsSelect + 'ms';
                    b.body.style.transitionDelay = this.__config.time.panelShow + 'ms';
                } else {
                    b.body.style.transition = '';
                }
                b.body.style.opacity = '1.0';
                if (!isMobile()) {
                    b.body.style.pointerEvents = 'auto';
                }
                b.body.style.visibility = 'visible';
            }
        }
    });

    Object.defineProperty(ASCPanel.prototype, '__hideButtons', {
        value: function (a) {
            for (var i = 0, len = this.__buttons.length; i < len; ++i) {
                var b = this.__buttons[i];
                if (typeof a === 'undefined' || a === true) {
                    b.body.style.transition = 'opacity ' + this.__config.time.buttonsShow + 'ms, background-color ' + this.__config.time.buttonsSelect + 'ms';
                    b.body.style.transitionDelay = '0ms';
                } else {
                    b.body.style.transition = '';
                    b.body.style.visibility = 'hidden';
                }
                b.body.style.opacity = '0.0';
                if (!isMobile()) {
                    b.body.style.pointerEvents = 'none';
                }
                setBackground(b.body, this.__config.color.main);
            }
        }
    });

    Object.defineProperty(ASCPanel.prototype, '__load', {
        value: function () {
            if (window.flash && flash.net && flash.net.SharedObject) {
                var so = flash.net.SharedObject.getLocal('asc.panel-data');
                if (!so || !so.data) {
                    return;
                }
                this.__so = so;
                for (var i = 0, len = this.__buttons.length; i < len; ++i) {
                    var b = this.__buttons[i];
                    if (!b || !b.restore) {
                        continue;
                    }
                    b.state = this.__so.data[b.id];
                }
            }
        }
    });

    Object.defineProperty(ASCPanel.prototype, '__save', {
        value: function () {
            if (!this.__so) {
                return;
            }
            for (var i = 0, len = this.__buttons.length; i < len; ++i) {
                var b = this.__buttons[i];
                if (!b) {
                    continue;
                }
                this.__so.data[b.id] = b.state;
            }
            try {
                this.__so.flush();
            } catch (e) {
                // something goes wrong
            }
        }
    });

    Object.defineProperty(ASCPanel.prototype, '__update', {
        value: function (c) {
            for (var i = 0, len = this.__buttons.length; i < len; ++i) {
                var b = this.__buttons[i];
                if (!b) {
                    continue;
                }
                b.state = b.state;
            }
        }
    });

    Object.defineProperty(ASCPanel.prototype, '__onToggleMouseDown', {
        value: function (e) {
            preventDefault(e);

            if (this.__showed) {
                this.close();
            } else {
                this.open();
            }
        }
    });

    Object.defineProperty(ASCPanel.prototype, '__onWindowMouseUp', {
        value: function  (e) {
            if (this.__transition) {
                return;
            }

            if (this.body.contains(e.target)) {
                return;
            }

            this.close();
        }
    });

    Object.defineProperty(ASCPanel.prototype, '__onButtonMouse', {
        value: function (e) {
            preventDefault(e);

            if (!this.__showed || this.__transition) {
                return;
            }

            var b, body;
            for (var i = 0, len = this.__buttons.length; i < len; ++i) {
                b = this.__buttons[i];
                if (b.body.contains(e.target)) {
                    div = b.body;
                    break;
                }
            }

            if (!div) {
                return;
            }

            switch (e.type) {
                case 'mousedown':
                case 'touchstart':
                    div.style.transitionDelay = '0ms';
                    setBackground(div, this.__config.color.buttonSelect);
                    break;
                case 'mouseup':
                case 'touchend':
                case 'touchcancel':
                    div.style.transitionDelay = '0ms';
                    setBackground(div, this.__config.color.main);
                    b.click();
                    this.__save();
                    break;
            }
        }
    });

    Object.defineProperty(ASCPanel.prototype, '__onTransitionEnd', {
        value: function (e) {
            switch (e.propertyName) {
                case 'width':
                case 'height':
                    this.__panel.style.visibility = this.__showed ? 'visible' : 'hidden';
                    if (!this.__showed) {
                        this.__transition = false;
                    }
                    break;
                case 'opacity':
                    for (var i = 0, len = this.__buttons.length; i < len; ++i) {
                        var b = this.__buttons[i];
                        b.body.style.visibility = this.__showed ? 'visible' : 'hidden';
                    }
                    if (this.__showed) {
                        this.__transition = false;
                    }
                    break;
            }
        }
    });

    Object.defineProperty(ASCPanel.prototype, '__updateTransform', {
        value: function () {
            var viewport = this.__viewport;
            var ratio = window.devicePixelRatio > 0 ? window.devicePixelRatio : 1;
            var scale = 1 / ratio;
            var width = viewport.width * ratio;

            if (width > 0 && width !== this.__layoutViewport.width) {
                scale *= width / this.__layoutViewport.width;
            }

            if (this.__align === 'right') {
                this.body.style.transform = 'scale(-' + scale + ', ' + scale + ')';
                setMargin(this.body, viewport.x + viewport.width, viewport.y);
            } else {
                this.body.style.transform = 'scale(' + scale + ', ' + scale + ')';
                setMargin(this.body, viewport.x, viewport.y);
            }

            for (var i = 0, len = this.__buttons.length; i < len; ++i) {
                var b = this.__buttons[i];
                b.body.style.transform = this.__align === 'right' ? 'scale(-1.0, 1.0)' : '';
            }
        }
    });

    function createDiv (w, h, x, y) {
        var div = document.createElement('div');
        div.style.position = 'absolute';
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

    function createToggle (color, shadowColor) {
        var width = 90;
        var height = 144;

        var dotSize = 14;
        var dotIndent = 20;
        var dotCorner = 7;
        var shadowSize = 6;

        var x = 40;
        var y = 36;

        var toggle = createDiv(width, height);
        var d1 = toggle.appendChild(createRoundDiv(dotSize, dotSize, dotCorner, x, y));
        var d2 = toggle.appendChild(createRoundDiv(dotSize, dotSize, dotCorner, x, y += dotIndent));
        var d3 = toggle.appendChild(createRoundDiv(dotSize, dotSize, dotCorner, x, y += dotIndent));

        addShadow(setBackground(d1, color), 0, 0, shadowSize, shadowColor);
        addShadow(setBackground(d2, color), 0, 0, shadowSize, shadowColor);
        addShadow(setBackground(d3, color), 0, 0, shadowSize, shadowColor);

        return toggle;
    }

    function setSVGColor (text, color) {
        if (typeof color === 'number') {
            color = '#' + color.toString(16);
        }
        return text.replace(/\[color\]/g, color);
    }

    function createSvg (text) {
        var div = document.createElement('div');
        div.innerHTML = text;
        var s = div.firstChild;
        s.style.position = 'absolute';
        return s;
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

    function preventDefault (e) {
        if (!e || typeof e.preventDefault !== 'function') {
            return;
        }
        if (window.flash && flash.media && typeof flash.media.Sound === 'function' && typeof flash.media.Sound.__isSuspended === 'function'
            && flash.media.Sound.__isSuspended()) {
            return;
        }
        e.preventDefault();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                       Attach                                                       //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    panel.ASCPanelButton = ASCPanelButton;
    panel.ASCPanel = ASCPanel;

})();