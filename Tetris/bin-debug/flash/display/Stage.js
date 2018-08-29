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
    var display;
    (function (display) {
        var _this = this;
        display.WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
        display.CSSColor = flash.__native.utils.CSSColor;
        display.Event = flash.events.Event;
        display.FullScreenEvent = flash.events.FullScreenEvent;
        display.KeyboardEvent = flash.events.KeyboardEvent;
        display.MouseEvent = flash.events.MouseEvent;
        display.StageOrientationEvent = flash.events.StageOrientationEvent;
        display.UncaughtErrorEvent = flash.events.UncaughtErrorEvent;
        display.ExternalInterface = flash.external.ExternalInterface;
        display.Matrix = flash.geom.Matrix;
        display.Point = flash.geom.Point;
        display.Rectangle = flash.geom.Rectangle;
        display.Sound = flash.media.Sound;
        display.SoundMixer = flash.media.SoundMixer;
        display.URLStream = flash.net.URLStream;
        display.URLVariables = flash.net.URLVariables;
        display.Capabilities = flash.system.Capabilities;
        display.ContextMenu = flash.ui.ContextMenu;
        display.Keyboard = flash.ui.Keyboard;
        display.Mouse = flash.ui.Mouse;
        display.MouseCursor = flash.ui.MouseCursor;
        display.clearInterval = flash.utils.clearInterval;
        display.getTimer = flash.utils.getTimer;
        display.setInterval = flash.utils.setInterval;
        display.setTimeout = flash.utils.setTimeout;
        var Stage = (function (_super) {
            __extends(Stage, _super);
            function Stage(mainClass, width, height, flashvars, params, attributes) {
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                if (flashvars === void 0) { flashvars = null; }
                if (params === void 0) { params = null; }
                if (attributes === void 0) { attributes = null; }
                var _this = this;
                width = ((width) >> 0);
                height = ((height) >> 0);
                flashvars = as(flashvars, 'String');
                _this.mBody === void 0 && (_this.mBody = null);
                _this.mBodyInternal === void 0 && (_this.mBodyInternal = null);
                _this.mBodyStyle === void 0 && (_this.mBodyStyle = null);
                _this.mBodyMarginTop === void 0 && (_this.mBodyMarginTop = NaN);
                _this.mBodyInternalStyle === void 0 && (_this.mBodyInternalStyle = null);
                _this.mBodyInternalTransform === void 0 && (_this.mBodyInternalTransform = null);
                _this.mParentElement === void 0 && (_this.mParentElement = null);
                _this.mWmode === void 0 && (_this.mWmode = null);
                _this.mLastOrientation === void 0 && (_this.mLastOrientation = null);
                _this.mAutoSize === void 0 && (_this.mAutoSize = 0);
                _this.mNeedAutoSize === void 0 && (_this.mNeedAutoSize = false);
                _this.mWindowHidden === void 0 && (_this.mWindowHidden = false);
                _this.mStageHidden === void 0 && (_this.mStageHidden = false);
                _this.mColor === void 0 && (_this.mColor = 0);
                _this.mPanel === void 0 && (_this.mPanel = null);
                _this.mCanvas === void 0 && (_this.mCanvas = null);
                _this.mCtx === void 0 && (_this.mCtx = null);
                _this.mFrameRate === void 0 && (_this.mFrameRate = 0);
                _this.mFrameTime === void 0 && (_this.mFrameTime = 0);
                _this.mStage3Ds === void 0 && (_this.mStage3Ds = undefined);
                _this.mMouseX === void 0 && (_this.mMouseX = 0);
                _this.mMouseY === void 0 && (_this.mMouseY = 0);
                _this.mCanvasMouseIsEnter === void 0 && (_this.mCanvasMouseIsEnter = false);
                _this.mCanvasMouseIsDown === void 0 && (_this.mCanvasMouseIsDown = false);
                _this.mCanvasMouseButton === void 0 && (_this.mCanvasMouseButton = 0);
                _this.mLastMouseDownObj === void 0 && (_this.mLastMouseDownObj = null);
                _this.mLastMouseOverObj === void 0 && (_this.mLastMouseOverObj = null);
                _this.mLastMouseWheelTime === void 0 && (_this.mLastMouseWheelTime = 0);
                _this.mMouseClickCount === void 0 && (_this.mMouseClickCount = 1);
                _this.mMouseClickCountTime === void 0 && (_this.mMouseClickCountTime = 0);
                _this.mMouseClickCountPos === void 0 && (_this.mMouseClickCountPos = new display.Point);
                _this.mTouchMode === void 0 && (_this.mTouchMode = false);
                _this.mStageWidth === void 0 && (_this.mStageWidth = NaN);
                _this.mStageHeight === void 0 && (_this.mStageHeight = NaN);
                _this.mNormalRect === void 0 && (_this.mNormalRect = null);
                _this.mLastStageWidth === void 0 && (_this.mLastStageWidth = NaN);
                _this.mLastStageHeight === void 0 && (_this.mLastStageHeight = NaN);
                _this.mLastPixelAspectRatio === void 0 && (_this.mLastPixelAspectRatio = NaN);
                _this.mLastInnerHeight === void 0 && (_this.mLastInnerHeight = 0);
                _this._invalidated === void 0 && (_this._invalidated = false);
                _this._broadcastEvent === void 0 && (_this._broadcastEvent = new display.Event);
                _this.mSkipping === void 0 && (_this.mSkipping = false);
                _this.mSkippingLimit === void 0 && (_this.mSkippingLimit = 3);
                _this.mOverhead === void 0 && (_this.mOverhead = 0);
                _this.mFixedOrientation === void 0 && (_this.mFixedOrientation = null);
                _this.mForceUpdateBodyTransform === void 0 && (_this.mForceUpdateBodyTransform = false);
                _this.mDeviceSpin === void 0 && (_this.mDeviceSpin = 0);
                _this.mDeviceSpinInited === void 0 && (_this.mDeviceSpinInited = false);
                _this.mLastOrientationDeviceSpin === void 0 && (_this.mLastOrientationDeviceSpin = 0);
                _this.mMaximize === void 0 && (_this.mMaximize = false);
                _this.mExpander === void 0 && (_this.mExpander = null);
                _this.mExpanderHeight === void 0 && (_this.mExpanderHeight = 0);
                _this.mAllowAutoFullscreen === void 0 && (_this.mAllowAutoFullscreen = false);
                _this.mParamsDesktop === void 0 && (_this.mParamsDesktop = null);
                _this.mParamsMobile === void 0 && (_this.mParamsMobile = null);
                _this = _super.call(this) || this;
                if (mainClass == null) {
                    throw new Error('Please specify the main class');
                }
                _this._id = ((Stage.sStageID++) >> 0);
                _this._name = null;
                params = params || {};
                attributes = attributes || {};
                attributes.id = attributes.id || 'playerglobal';
                var compiler = window.asc.compiler || {};
                if (!compiler.arguments)
                    compiler.arguments = {};
                var defaultSize = (compiler.arguments['default-size'] || '800 600').split(' ');
                var defaultBackgroundColor = compiler.arguments['default-background-color'];
                _this.mSkipping = Boolean(params.skipping);
                _this.mParamsDesktop = params.desktop || {};
                _this.mParamsMobile = params.mobile || {};
                _this.mBody = document.createElement("div");
                _this.mBody.id = 'stage' + _this._id;
                _this.mBodyStyle = _this.mBody.style;
                _this.mBodyStyle.position = 'absolute';
                _this.mBodyStyle.left = _this.mBodyStyle.top = '0';
                Object.defineProperty(_this.mBody, 'style', {
                    value: {
                        position: 'absolute',
                        top: '0',
                        left: '0'
                    }
                });
                _this.mBodyInternal = document.createElement("div");
                _this.mBodyInternalStyle = _this.mBodyInternal.style;
                _this.mBodyInternalStyle.position = 'absolute';
                _this.mBodyInternalStyle.margin = _this.mBodyInternalStyle.left = _this.mBodyInternalStyle.top = '0';
                _this.mBody.appendChild(_this.mBodyInternal);
                var deviceParams = display.Capabilities.isMobile ? _this.mParamsMobile : _this.mParamsDesktop;
                _this.mFixedOrientation = as(deviceParams.orientation, 'String');
                _this.mMaximize = Boolean(deviceParams.maximize);
                if (_this.mMaximize) {
                    _this.mAllowAutoFullscreen = _this.mMaximize;
                    if (/(iOS)/.test(display.Capabilities.os) && _this.mFixedOrientation == 'landscape') {
                        _this.mExpander = document.createElement("div");
                    }
                }
                var parentElement = typeof params.parent == 'string' ? document.getElementById(params.parent) : params.parent;
                if (typeof parentElement == 'object' && 'tagName' in parentElement) {
                    _this.setParent(parentElement);
                    if (params.autoSize > 0) {
                        width = ((parentElement.clientWidth * display.Capabilities.__getPixelAspectRatio()) >> 0);
                        height = ((parentElement.clientHeight * display.Capabilities.__getPixelAspectRatio()) >> 0);
                    }
                }
                _this.setAutoSize(params.autoSize);
                switch (_this.mFixedOrientation) {
                    case 'landscape':
                    case 'portrait':
                        _this.mBodyInternalTransform = new display.Matrix;
                        break;
                }
                _this.mWmode = 'direct';
                _this.mLastOrientation = _this.deviceOrientation;
                width = width > 0 ? width : parseInt(defaultSize[0]);
                height = height > 0 ? height : parseInt(defaultSize[1]);
                _this.mStageWidth = _this.mLastStageWidth = _this.__getStageWidth(width, height);
                _this.mStageHeight = _this.mLastStageHeight = _this.__getStageHeight(width, height);
                _this.mLastPixelAspectRatio = display.Capabilities.__getPixelAspectRatio();
                _this.mNormalRect = new display.Rectangle;
                window.onerror = function (message, url, lineNo, columnNo, error) {
                    return this.__handleError(window.asc.e2e(error || message));
                }.__bind(_this);
                _this._stage = Stage.sCurrent = _this;
                _this.frameRate = 60;
                var bgcolor = params.bgcolor || defaultBackgroundColor;
                if (bgcolor) {
                    _this.color = display.CSSColor.stringToHex(bgcolor);
                }
                if (params.panel !== null && typeof params.panel == 'object') {
                    var ASCPanel;
                    if (window.asc.panel && typeof (ASCPanel = window.asc.panel.ASCPanel) == 'function') {
                        _this.mPanel = new ASCPanel(params.panel);
                        _this.mBodyInternal.appendChild(_this.mPanel.body);
                    }
                }
                display.ExternalInterface.objectID = as(attributes.id, 'String');
                _this.mStage3Ds = [new display.Stage3D(_this), new display.Stage3D(_this), new display.Stage3D(_this), new display.Stage3D(_this)];
                _this.__updateCanvas(_this.mStageWidth, _this.mStageHeight);
                display.setTimeout(_this.__onAnimationFrame.__bind(_this), 1);
                window.addEventListener("resize", _this.__onWindowResize.__bind(_this), false);
                window.addEventListener("scroll", _this.__updateBodyMargin.__bind(_this), false);
                window.addEventListener("deviceorientation", _this.__onWindowOrientation.__bind(_this), true);
                ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(function (eventType) { document.addEventListener(eventType, this.__onFullscreenChange.__bind(this)); }.__bind(_this));
                display.setInterval(_this.__onWindowVisibilityCheck.__bind(_this), 200);
                window.addEventListener('blur', _this.__onWindowBlur.__bind(_this), false);
                window.addEventListener('focus', _this.__onWindowFocus.__bind(_this), false);
                var base = params.base;
                if (base) {
                    display.URLStream.__base = as(base, 'String');
                    display.Sound.__base = as(base, 'String');
                    display.Loader.__base = as(base, 'String');
                }
                var parameters = {}, s;
                var query = new display.URLVariables(window.location.search.substr(1));
                var __for0 = window.asc.in(query);
                for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                    s = __for0_1[_i];
                    parameters[s] = query[s];
                }
                var variables = new display.URLVariables(flashvars || '');
                var __for1 = window.asc.in(variables);
                for (var _a = 0, __for1_1 = __for1; _a < __for1_1.length; _a++) {
                    s = __for1_1[_a];
                    parameters[s] = variables[s];
                }
                _this._loaderInfo = new display.LoaderInfo;
                _this._loaderInfo._contentType = 'application/x-shockwave-flash';
                _this._loaderInfo._frameRate = _this.frameRate;
                _this._loaderInfo._parameters = parameters;
                _this._loaderInfo._url = _this._loaderInfo.loaderURL;
                window.asc.startTime = Date.now();
                window.asc.createDisplayObject(mainClass, [], _this, _this._childrenLength, true, _this._loaderInfo);
                _this._loaderInfo.__setProgress(0, 1024);
                _this._loaderInfo.__contentComplete();
                return _this;
            }
            Object.defineProperty(Stage, "supportsOrientationChange", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Stage.prototype.invalidate = function () {
                this._invalidated = true;
            };
            Object.defineProperty(Stage.prototype, "body", {
                get: function () {
                    return this.mBody;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "deviceOrientation", {
                get: function () {
                    if (window.matchMedia("(orientation: portrait)").matches) {
                        return 'portrait';
                    }
                    if (window.matchMedia("(orientation: landscape)").matches) {
                        return 'landscape';
                    }
                    return 'portrait';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "orientation", {
                get: function () {
                    return this.deviceOrientation;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "supportedOrientations", {
                get: function () {
                    return new Array([display.StageOrientation.PORTRAIT, display.StageOrientation.LANDSCAPE]);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "autoOrients", {
                get: function () { return true; },
                set: function (value) { value = Boolean(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "frameRate", {
                get: function () { return this.mFrameRate; },
                set: function (value) {
                    value = (+(value));
                    this.mFrameRate = ((value) >> 0);
                    this.mFrameTime = ((1000 / this.mFrameRate) >> 0);
                },
                enumerable: true,
                configurable: true
            });
            Stage.prototype.setAspectRatio = function (newAspectRatio) {
                newAspectRatio = as(newAspectRatio, 'String');
            };
            Stage.prototype.setOrientation = function (newOrientation) {
                newOrientation = as(newOrientation, 'String');
            };
            Stage.prototype.setAutoSize = function (time) {
                time = ((time) >> 0);
                display.clearInterval(this.mAutoSize);
                if (time > 0) {
                    this.mAutoSize = display.setInterval(requestAutoSize.__bind(this), Math.max(Math.min(time, 1000), 1000 / 60));
                }
                else {
                    this.mAutoSize = 0;
                }
                this.mNeedAutoSize = this.mAutoSize > 0;
                return this;
                function requestAutoSize() {
                    this.mNeedAutoSize = true;
                }
            };
            Object.defineProperty(Stage.prototype, "scaleMode", {
                get: function () { return null; },
                set: function (value) { value = as(value, 'String'); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "align", {
                get: function () { return null; },
                set: function (value) { value = as(value, 'String'); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "stageWidth", {
                get: function () {
                    return this.mStageWidth;
                },
                set: function (value) {
                    value = ((value) >> 0);
                    if (this.displayState != 'normal') {
                        return;
                    }
                    this.mStageWidth = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "stageHeight", {
                get: function () {
                    return this.mStageHeight;
                },
                set: function (value) {
                    value = ((value) >> 0);
                    if (this.displayState != 'normal') {
                        return;
                    }
                    this.mStageHeight = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "showDefaultContextMenu", {
                get: function () { return false; },
                set: function (value) { value = Boolean(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "colorCorrection", {
                get: function () { return null; },
                set: function (param1) { param1 = as(param1, 'String'); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "colorCorrectionSupport", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Stage.prototype.isFocusInaccessible = function () { return false; };
            Object.defineProperty(Stage.prototype, "stageFocusRect", {
                get: function () { return false; },
                set: function (value) { value = Boolean(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "quality", {
                get: function () { return null; },
                set: function (value) { value = as(value, 'String'); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "displayState", {
                get: function () {
                    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement ?
                        'fullScreen' :
                        'normal';
                },
                set: function (state) {
                    state = as(state, 'String');
                    if (state == 'normal') {
                        var cancelFunc = (document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen);
                        cancelFunc.call(document);
                    }
                    else {
                        var target = this.mBody;
                        var requestFunc = (target.requestFullscreen || target.webkitRequestFullscreen || target.mozRequestFullScreen || target.msRequestFullscreen);
                        if (!requestFunc) {
                            return;
                        }
                        this.mAllowAutoFullscreen = false;
                        this.mNormalRect.__setTo(this.x, this.y, this.mStageWidth, this.mStageHeight);
                        requestFunc.call(target);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "fullScreenSourceRect", {
                get: function () { return null; },
                set: function (value) { value = strict(value, display.Rectangle); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "focus", {
                get: function () {
                    var __for2 = window.asc.of(display.DisplayObject.sDOMElements);
                    for (var _i = 0, __for2_1 = __for2; _i < __for2_1.length; _i++) {
                        var d = __for2_1[_i];
                        if (d.__isFocused()) {
                            return d;
                        }
                    }
                    return null;
                },
                set: function (value) {
                    value = strict(value, display.InteractiveObject);
                    var __for3 = window.asc.of(display.DisplayObject.sDOMElements);
                    for (var _i = 0, __for3_1 = __for3; _i < __for3_1.length; _i++) {
                        var d = __for3_1[_i];
                        if (d != value) {
                            continue;
                        }
                        d.__setFocus();
                        break;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "mouseLock", {
                get: function () { return false; },
                set: function (param1) { param1 = Boolean(param1); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "stage3Ds", {
                get: function () { return this.mStage3Ds; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "color", {
                get: function () { return this.mColor; },
                set: function (value) {
                    value = ((value) >>> 0);
                    this.mColor = value;
                    this.mBodyInternalStyle.backgroundColor = display.CSSColor.hexToString(this.mColor);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "fullScreenWidth", {
                get: function () {
                    return display.Capabilities.screenResolutionX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "fullScreenHeight", {
                get: function () {
                    return display.Capabilities.screenResolutionY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "wmodeGPU", {
                get: function () { return this.mWmode.indexOf('gpu') >= 0; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "softKeyboardRect", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "allowsFullScreen", {
                get: function () { return true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "allowsFullScreenInteractive", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "contentsScaleFactor", {
                get: function () { return 1; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "browserZoomFactor", {
                get: function () { return 1; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "mouseX", {
                get: function () {
                    return this.mMouseX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "mouseY", {
                get: function () {
                    return this.mMouseY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "x", {
                get: function () { return this.super('flash.display.DisplayObject', 'x'); },
                set: function (v) {
                    v = (+(v));
                    throw new Error('The Stage class does not implement this property or method.', 2071);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "y", {
                get: function () { return this.super('flash.display.DisplayObject', 'y'); },
                set: function (v) {
                    v = (+(v));
                    throw new Error('The Stage class does not implement this property or method.', 2071);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "width", {
                get: function () { return this.super('flash.display.DisplayObject', 'width'); },
                set: function (v) {
                    v = (+(v));
                    throw new Error('The Stage class does not implement this property or method.', 2071);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "height", {
                get: function () { return this.super('flash.display.DisplayObject', 'height'); },
                set: function (v) {
                    v = (+(v));
                    throw new Error('The Stage class does not implement this property or method.', 2071);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "scaleX", {
                get: function () { return this.super('flash.display.DisplayObject', 'scaleX'); },
                set: function (v) {
                    v = (+(v));
                    throw new Error('The Stage class does not implement this property or method.', 2071);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "scaleY", {
                get: function () { return this.super('flash.display.DisplayObject', 'scaleY'); },
                set: function (v) {
                    v = (+(v));
                    throw new Error('The Stage class does not implement this property or method.', 2071);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stage.prototype, "filters", {
                get: function () { return this.super('flash.display.DisplayObject', 'filters'); },
                set: function (value) {
                    value = strict(value, Array);
                    throw new Error('The Stage class does not implement this property or method.', 2071);
                },
                enumerable: true,
                configurable: true
            });
            Stage.prototype.setParent = function (parentElement) {
                parentElement = strict(parentElement, HTMLElement);
                if (this.mParentElement = parentElement) {
                    if (!parentElement.contains(this.mBody)) {
                        parentElement.appendChild(this.mBody);
                    }
                    if (this.mExpander) {
                        if (!parentElement.contains(this.mExpander)) {
                            parentElement.appendChild(this.mExpander);
                        }
                    }
                    if (this.mAutoSize) {
                        this.mNeedAutoSize = true;
                    }
                }
                return this;
            };
            Stage.prototype.__getRoot = function () {
                return this;
            };
            Stage.prototype.__getBodyInternal = function () {
                return this.mBodyInternal;
            };
            Stage.prototype.__getStageWidth = function (width, height) {
                if (this.__isNeedFixedOrientationCalc()) {
                    return height;
                }
                return width;
            };
            Stage.prototype.__getStageHeight = function (width, height) {
                if (this.__isNeedFixedOrientationCalc()) {
                    return width;
                }
                return height;
            };
            Stage.prototype.__isNeedFixedOrientationCalc = function () {
                switch (this.mFixedOrientation) {
                    case 'landscape':
                    case 'portrait':
                        return this.mFixedOrientation != this.deviceOrientation;
                }
                return false;
            };
            Stage.prototype.__getCanvas = function () {
                if (!this.mCanvas) {
                    this.mCanvas = as(this.mBodyInternal.appendChild(window.asc.getCanvas(this._id)), HTMLCanvasElement);
                    this.mTouchMode = display.Capabilities.touchscreenType == 'finger';
                    if (this.mTouchMode) {
                        this.mCanvas.addEventListener("touchstart", this.__onCanvasTouchEvent.__bind(this));
                        window.addEventListener("touchmove", this.__onCanvasTouchEvent.__bind(this));
                        window.addEventListener("touchend", this.__onCanvasTouchEvent.__bind(this));
                        window.addEventListener("touchcancel", this.__onCanvasTouchEvent.__bind(this));
                    }
                    else {
                        this.mCanvas.addEventListener("mouseleave", this.__onCanvasMouseEvent.__bind(this));
                        this.mCanvas.addEventListener("mousedown", this.__onCanvasMouseEvent.__bind(this));
                        this.mCanvas.addEventListener("contextmenu", this.__onCanvasMouseEvent.__bind(this));
                        window.addEventListener("mousemove", this.__onCanvasMouseEvent.__bind(this));
                        window.addEventListener("mouseup", this.__onCanvasMouseEvent.__bind(this));
                    }
                    document.addEventListener("keydown", this.__onCanvasKeyEvent.__bind(this));
                    document.addEventListener("keyup", this.__onCanvasKeyEvent.__bind(this));
                    window.addEventListener('DOMMouseScroll', this.__onCanvasMouseEvent.__bind(this));
                    if (window.onmousewheel)
                        window.onmousewheel = this.__onCanvasMouseEvent.__bind(this);
                    else
                        this.mCanvas.addEventListener("mousewheel", this.__onCanvasMouseEvent.__bind(this));
                    window.addEventListener("mouseover", this.__onWindowMouseOver.__bind(this));
                }
                return this.mCanvas;
            };
            Stage.prototype.__getCtx = function () {
                if (!this.mCtx) {
                    var canvas = this.__getCanvas();
                    this.mCtx = strict(window.asc.getCtx(this._id), display.WebGLContext2D);
                    this.mCtx.context.configureBackBuffer(this.mStageWidth, this.mStageHeight, 0, false);
                }
                return this.mCtx;
            };
            Stage.prototype.__updateCanvas = function (width, height) {
                var canvas = this.__getCanvas();
                this.mBodyStyle.width = this.mBodyInternalStyle.width = (canvas.width = width) / display.Capabilities.__getPixelAspectRatio() + 'px';
                this.mBodyStyle.height = this.mBodyInternalStyle.height = (canvas.height = height) / display.Capabilities.__getPixelAspectRatio() + 'px';
                this.__updateBodyTransform();
                this.__setDirty(1);
            };
            Stage.prototype.__updateBodyTransform = function () {
                var pixelAspectRatio = display.Capabilities.__getPixelAspectRatio();
                var width = this.mStageWidth / pixelAspectRatio;
                var height = this.mStageHeight / pixelAspectRatio;
                if (this.__isNeedFixedOrientationCalc()) {
                    var spin = this.mLastOrientationDeviceSpin;
                    var x = 0, y = 0, d = 0;
                    switch (this.mFixedOrientation) {
                        case 'landscape':
                            if (spin <= 0) {
                                d = 90;
                                x = height;
                            }
                            else {
                                d = 270;
                                y = width;
                            }
                            break;
                        case 'portrait':
                            if (spin <= 0) {
                                d = -90;
                                y = width;
                            }
                            else {
                                d = -270;
                                x = height;
                            }
                            break;
                    }
                    this.mBodyInternalStyle.transformOrigin = 'left top';
                    this.mBodyInternalStyle.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + d + 'deg)';
                    this.mBodyInternalTransform.identity();
                    this.mBodyInternalTransform.rotate(d * Math.PI / 180);
                    this.mBodyInternalTransform.translate(x * pixelAspectRatio, y * pixelAspectRatio);
                    this.mBodyInternalTransform.invert();
                }
                else {
                    if (this.mBodyInternalTransform) {
                        this.mBodyInternalTransform.identity();
                    }
                    this.mBodyInternalStyle.transformOrigin = this.mBodyInternalStyle.transform = '';
                }
                if (this.mPanel) {
                    var pixelAspectRatio = display.Capabilities.__getPixelAspectRatio();
                    var x = 0, y = 0;
                    var width = this.mStageWidth, height = this.mStageHeight;
                    if (/(iOS)/.test(display.Capabilities.os)) {
                        y = 44;
                    }
                    x /= pixelAspectRatio;
                    y /= pixelAspectRatio;
                    width /= pixelAspectRatio;
                    height /= pixelAspectRatio;
                    this.mPanel.setViewport(x, y, width, height);
                }
            };
            Stage.prototype.__updateBodyMargin = function () {
                if (!this.mExpander || !this.mParentElement) {
                    return;
                }
                var inverted = this.__isNeedFixedOrientationCalc();
                var displayHeight = this.mStageHeight;
                if (inverted) {
                    displayHeight = this.mStageWidth;
                }
                displayHeight /= display.Capabilities.__getPixelAspectRatio();
                var innerHeight = window.innerHeight;
                var scrollY = window.scrollY || 0;
                if (isNaN(scrollY)) {
                    scrollY = 0;
                }
                var increaseExpander = (scrollY > 0 && innerHeight < this.mLastInnerHeight) || inverted;
                if (increaseExpander) {
                    var expanderHeight = displayHeight + scrollY + Stage.EXPANDER_HEIGHT;
                    if (inverted) {
                        expanderHeight = displayHeight;
                    }
                    if (expanderHeight != this.mExpanderHeight) {
                        this.mExpanderHeight = ((expanderHeight) >> 0);
                        this.mExpander.style.height = this.mExpanderHeight + 'px';
                    }
                }
                var marginTop = (innerHeight + scrollY) - displayHeight;
                if (!inverted) {
                    marginTop -= innerHeight - this.mParentElement.clientHeight;
                }
                if (this.mBodyMarginTop != marginTop) {
                    if (isNaN(this.mBodyMarginTop)) {
                        this.mBodyMarginTop = 0;
                    }
                    var topDiff = marginTop - this.mBodyMarginTop;
                    this.mBodyMarginTop += topDiff / 2;
                    if (topDiff <= 1) {
                        this.mBodyMarginTop = (+(marginTop));
                    }
                    this.mBodyStyle.marginTop = this.mBodyMarginTop + 'px';
                }
                this.mLastInnerHeight = ((innerHeight) >> 0);
            };
            Stage.prototype.__onWindowResize = function () {
                var currentOrientation = this.deviceOrientation;
                if (currentOrientation != this.mLastOrientation) {
                    this.mForceUpdateBodyTransform = true;
                    this.dispatchEvent(new display.StageOrientationEvent(display.StageOrientationEvent.ORIENTATION_CHANGE, true, false, this.mLastOrientation, this.mLastOrientation = currentOrientation));
                }
                if (!this.__isNeedFixedOrientationCalc()) {
                    this.mLastOrientationDeviceSpin = this.mDeviceSpin;
                }
                if (this.displayState == 'fullScreen') {
                    this.__updateFullscreenStage();
                }
            };
            Stage.prototype.__onWindowOrientation = function (event) {
                event = event || { alpha: 0, beta: 0, gamma: 0 };
                var alpha = event.alpha;
                var beta = event.beta;
                var gamma = event.gamma;
                var betaR = beta / 180 * Math.PI;
                var gammaR = gamma / 180 * Math.PI;
                var spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));
                this.mDeviceSpin = ((spinR * 180 / Math.PI) >> 0);
                if (!this.mDeviceSpinInited) {
                    if (!this.__isNeedFixedOrientationCalc()) {
                        this.mLastOrientationDeviceSpin = this.mDeviceSpin;
                    }
                    this.mDeviceSpinInited = true;
                }
            };
            Stage.prototype.__onWindowBlur = function () {
                this.__onWindowVisibilityCheck();
            };
            Stage.prototype.__onWindowFocus = function () {
                this.__onWindowVisibilityCheck(true);
            };
            Stage.prototype.__onWindowVisibilityCheck = function (forceVisible) {
                if (forceVisible === void 0) { forceVisible = false; }
                if ((this.mWindowHidden = forceVisible || document.hidden) == this.mStageHidden) {
                    return;
                }
                this.mStageHidden = this.mWindowHidden;
                this.dispatchEvent(new display.Event(this.mStageHidden ? display.Event.DEACTIVATE : display.Event.ACTIVATE));
                if (this.mPanel) {
                    if (this.mWindowHidden) {
                        this.mPanel.close(false);
                        display.SoundMixer.__setMute(true);
                    }
                    else {
                        display.SoundMixer.__setMute(this.mPanel.getSavedState('sound') == 1);
                    }
                }
                else {
                    display.SoundMixer.__setMute(this.mWindowHidden);
                }
            };
            Stage.prototype.__onAnimationFrame = function () {
                Stage.sRequestAnimationFrame.call(window, this.__onAnimationFrame.__bind(this));
                if (this.mStageHidden) {
                    return;
                }
                var pixelAspectRatio = display.Capabilities.__getPixelAspectRatio();
                if (this.mLastPixelAspectRatio != pixelAspectRatio) {
                    this.mLastPixelAspectRatio = (+(pixelAspectRatio));
                    this.__onWindowResize();
                }
                if (this.mNeedAutoSize && this.displayState == 'normal') {
                    var parentElement = strict(this.mBody.parentElement, HTMLElement);
                    if (parentElement) {
                        var width = parentElement.clientWidth;
                        var height = parentElement.clientHeight;
                        if (this.mExpander) {
                            width = Math.max(window.innerWidth, width);
                            height = Math.max(window.innerHeight, height);
                        }
                        width *= pixelAspectRatio;
                        height *= pixelAspectRatio;
                        this.mStageWidth = this.__getStageWidth(width, height);
                        this.mStageHeight = this.__getStageHeight(width, height);
                        this.mNeedAutoSize = false;
                    }
                }
                if (this.mLastStageWidth != this.mStageWidth || this.mLastStageHeight != this.mStageHeight) {
                    this.__updateCanvas(this.mLastStageWidth = this.mStageWidth, this.mLastStageHeight = this.mStageHeight);
                    if (this.mCtx) {
                        var canvas = this.__getCanvas();
                        this.mCtx.context.configureBackBuffer(canvas.width, canvas.height, 0, false);
                    }
                    this.dispatchEvent(new display.Event(display.Event.RESIZE));
                }
                else if (this.mForceUpdateBodyTransform) {
                    this.__updateBodyTransform();
                    this.mForceUpdateBodyTransform = false;
                }
                this.__updateBodyMargin();
                var timestamp = Date.now();
                var num = 1;
                if (this.mSkipping) {
                    while (this.mOverhead >= this.mFrameTime) {
                        num++;
                        this.mOverhead -= this.mFrameTime;
                    }
                }
                for (var i = 0; i < num; ++i) {
                    this.__enterInternal();
                    this.__broadcastEvent(display.Event.ENTER_FRAME);
                    this.__broadcastEvent(display.Event.FRAME_CONSTRUCTED);
                    this.__broadcastEvent(display.Event.EXIT_FRAME);
                    if (this._invalidated) {
                        this._invalidated = false;
                        this.__broadcastEvent(display.Event.RENDER);
                    }
                    this.__exitInternal(1);
                }
                this.__clearUnused();
                this.__drawEnter();
                var c = this.mCtx || this.__getCtx();
                var redraw = this.__predraw(c) || c.dirty();
                if (redraw) {
                    c.enter();
                    c.save();
                    c.clear();
                    this.__draw(c);
                    c.restore();
                    c.present();
                }
                this.__drawExit();
                var elapsed = Date.now() - timestamp;
                if (elapsed > this.mFrameTime) {
                    this.mOverhead += Math.min(elapsed - this.mFrameTime, this.mFrameTime * this.mSkippingLimit);
                }
            };
            Stage.prototype.__broadcastEvent = function (value) {
                var event;
                if (is(value, display.Event)) {
                    event = value;
                }
                else if (is(value, 'String')) {
                    event = this._broadcastEvent;
                    event._type = value;
                }
                else {
                    return;
                }
                var type = event._type;
                var events = display.DisplayObject.sBroadcastEvents;
                var dispatchers = events[type];
                if (dispatchers) {
                    var __for4 = window.asc.of(dispatchers);
                    for (var _i = 0, __for4_1 = __for4; _i < __for4_1.length; _i++) {
                        var dispatcher = __for4_1[_i];
                        if (!dispatcher._offStageEvents && !dispatcher._stage) {
                            continue;
                        }
                        event.target = null;
                        dispatcher.dispatchEvent(event);
                    }
                }
            };
            Stage.prototype.__enterInternal = function () {
                var __for5 = window.asc.of(display.DisplayObject.sTimelineObjects);
                for (var _i = 0, __for5_1 = __for5; _i < __for5_1.length; _i++) {
                    var t = __for5_1[_i];
                    t.__enterInternal();
                }
            };
            Stage.prototype.__exitInternal = function (nextFrame) {
                var __for6 = window.asc.of(display.DisplayObject.sTimelineObjects);
                for (var _i = 0, __for6_1 = __for6; _i < __for6_1.length; _i++) {
                    var t = __for6_1[_i];
                    t.__exitInternal(nextFrame);
                }
            };
            Stage.prototype.__clearUnused = function () {
                var len = display.DisplayObject.sCachedObjects.length;
                for (var i = 0; i < len; ++i) {
                    var o = display.DisplayObject.sCachedObjects[i];
                    if (!o || (!o._cache && (!o._graphics || !o._graphics._cache))) {
                        display.DisplayObject.__removeCachedObject(o);
                        i--;
                        len--;
                        continue;
                    }
                    if (!o._stage) {
                        if (display.DisplayObject.__freeCachedObject(o)) {
                            i--;
                            len--;
                            continue;
                        }
                    }
                }
            };
            Stage.prototype.__drawEnter = function () {
                var __for7 = window.asc.of(display.DisplayObject.sDOMElements);
                for (var _i = 0, __for7_1 = __for7; _i < __for7_1.length; _i++) {
                    var d = __for7_1[_i];
                    d.__drawEnter();
                }
            };
            Stage.prototype.__drawExit = function () {
                var __for8 = window.asc.of(display.DisplayObject.sDOMElements);
                for (var _i = 0, __for8_1 = __for8; _i < __for8_1.length; _i++) {
                    var d = __for8_1[_i];
                    d.__drawExit();
                }
            };
            Stage.prototype.__handleError = function (error) {
                try {
                    trace(error.getStackTrace());
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    trace('An unknown error has occurred');
                }
                if (!this._loaderInfo) {
                    return false;
                }
                if (this.__handleCriticalError(error)) {
                    return true;
                }
                var event = new display.UncaughtErrorEvent(display.UncaughtErrorEvent.UNCAUGHT_ERROR, true, true, error);
                this._loaderInfo.uncaughtErrorEvents.dispatchEvent(event);
                if (event.isDefaultPrevented()) {
                    return true;
                }
                return false;
            };
            Stage.prototype.__handleCriticalError = function (details) {
                if (!this.mParentElement || !details || !('errorID' in details)) {
                    return false;
                }
                switch (details.errorID) {
                    case 3710:
                        this.mParentElement.innerHTML = window.asc.getErrorHTMLText(details);
                        return true;
                }
                return false;
            };
            Stage.prototype.__onFullscreenChange = function (e) {
                if (this.displayState == 'normal') {
                    this.mStageWidth = this.mNormalRect.width;
                    this.mStageHeight = this.mNormalRect.height;
                }
                else {
                    this.__updateFullscreenStage();
                }
                this.dispatchEvent(new display.FullScreenEvent(display.FullScreenEvent.FULL_SCREEN, false, false, this.displayState != 'normal'));
            };
            Stage.prototype.__onCanvasMouseEvent = function (e) {
                var jsType = as(e.type, 'String');
                var wheelDelta = 0, button = ((e.button || 0) >> 0);
                var mouseType = [];
                var mx = this.__getMouseXFromEvent(e);
                var my = this.__getMouseYFromEvent(e);
                var m = this.mBodyInternalTransform;
                if (m) {
                    var p = Stage.sHelperPoint;
                    p.__setTo(mx, my);
                    m.__transformPointInPlace(p);
                    mx = p.x;
                    my = p.y;
                }
                if (!isNaN(mx) && !isNaN(my)) {
                    this.mMouseX = mx;
                    this.mMouseY = my;
                }
                switch (jsType) {
                    case "mouseleave":
                        if (this.mCanvasMouseIsEnter) {
                            this.mCanvasMouseIsEnter = false;
                            this.dispatchEvent(new display.Event(display.Event.MOUSE_LEAVE));
                            mouseType.push(display.MouseEvent.MOUSE_OUT);
                        }
                        break;
                    case "mousedown":
                        this.__preventDocumentScroll(e);
                        var activeElement = document.activeElement;
                        if (activeElement && activeElement != document.body) {
                            if (!e.target || (e.target.nodeName != 'TEXTAREA' && e.target.nodeName != 'INPUT')) {
                                activeElement.blur();
                            }
                        }
                        this.mCanvasMouseIsDown = this.mCanvasMouseIsEnter = true;
                        mouseType.push((this.mCanvasMouseButton = button) == 0 ? display.MouseEvent.MOUSE_DOWN : display.MouseEvent.RIGHT_MOUSE_DOWN);
                        break;
                    case "mousemove":
                        this.__preventDocumentScroll(e);
                        if (!isNaN(mx) && !isNaN(my)) {
                            var isEnter = this.mMouseX >= 0 && this.mMouseX <= this.mStageWidth && this.mMouseY >= 0 && this.mMouseY <= this.mStageHeight;
                            if (isEnter && !this.mCanvasMouseIsEnter) {
                                this.mCanvasMouseIsEnter = true;
                                mouseType.push(display.MouseEvent.MOUSE_OVER);
                            }
                            else if (!isEnter && this.mCanvasMouseIsEnter) {
                                this.mCanvasMouseIsEnter = false;
                                this.dispatchEvent(new display.Event(display.Event.MOUSE_LEAVE));
                                mouseType.push(display.MouseEvent.MOUSE_OUT);
                            }
                            if (this.mCanvasMouseIsEnter = isEnter) {
                                mouseType.push(display.MouseEvent.MOUSE_MOVE);
                            }
                        }
                        break;
                    case "mouseup":
                        if (this.mCanvasMouseIsDown) {
                            this.mCanvasMouseIsDown = false;
                            mouseType.push(button == 0 ? display.MouseEvent.MOUSE_UP : display.MouseEvent.RIGHT_MOUSE_UP);
                        }
                        if (this.mAllowAutoFullscreen) {
                            if (this.displayState != 'fullScreen') {
                                this.displayState = 'fullScreen';
                            }
                        }
                        break;
                    case "contextmenu":
                        mouseType.push(display.MouseEvent.CONTEXT_MENU);
                        break;
                    case "mousewheel":
                    case "DOMMouseScroll":
                        this.__preventDocumentScroll(e);
                        var diff = ((display.getTimer() - this.mLastMouseWheelTime) >> 0);
                        if (diff <= 1) {
                            break;
                        }
                        else {
                            this.mLastMouseWheelTime = display.getTimer();
                        }
                        mouseType.push(display.MouseEvent.MOUSE_WHEEL);
                        e = e || window.event;
                        wheelDelta = ((-e.deltaY) >> 0);
                        if (e.wheelDelta) {
                            wheelDelta = ((e.wheelDelta / 120) >> 0);
                        }
                        else if (e.detail) {
                            wheelDelta = ((-e.detail) >> 0);
                        }
                        break;
                }
                var len = mouseType.length;
                for (var i = 0; i < len; ++i) {
                    var event = new display.MouseEvent(mouseType[i], true, false, this.mMouseX, this.mMouseY, null, e.ctrlKey, e.altKey, e.shiftKey, this.mCanvasMouseIsDown && this.mCanvasMouseButton == 0, wheelDelta);
                    event.movementX = (+(e.movementX || 0));
                    event.movementY = (+(e.movementY || 0));
                    event.base = e;
                    this.__processMouseEvent(event);
                }
            };
            Stage.prototype.__onCanvasTouchEvent = function (e) {
                switch (e.type) {
                    case "touchstart":
                        Stage.sHelperMouseEvent.type = 'mousedown';
                        break;
                    case "touchmove":
                        Stage.sHelperMouseEvent.type = 'mousemove';
                        break;
                    case "touchend":
                        Stage.sHelperMouseEvent.type = 'mouseup';
                        break;
                    case "touchcancel":
                        Stage.sHelperMouseEvent.type = 'mouseup';
                        break;
                    default:
                        return;
                }
                Stage.sHelperMouseEvent.target = e.target;
                Stage.sHelperMouseEvent.ctrlKey = e.ctrlKey;
                Stage.sHelperMouseEvent.altKey = e.altKey;
                Stage.sHelperMouseEvent.shiftKey = e.shiftKey;
                if (e.targetTouches && e.targetTouches.length) {
                    Stage.sHelperMouseEvent.pageX = e.targetTouches[0].pageX;
                    Stage.sHelperMouseEvent.pageY = e.targetTouches[0].pageY;
                }
                if (is(e.preventDefault, 'Function')) {
                    Stage.sHelperMouseEvent.preventDefault = e.preventDefault.__bind(e);
                }
                this.__onCanvasMouseEvent(Stage.sHelperMouseEvent);
            };
            Stage.prototype.__processMouseEvent = function (e) {
                var localX = e.localX, localY = e.localY, ctrlKey = e.ctrlKey, altKey = e.altKey, shiftKey = e.shiftKey, buttonDown = e.buttonDown;
                var obj = this.__doMouse(localX, localY);
                if (obj) {
                    var p = display.Point.__pool.get();
                    p.__setTo(e.localX, e.localY);
                    obj.__globalToLocal(p, p);
                    e.localX = (+(p.x));
                    e.localY = (+(p.y));
                    display.Point.__pool.release(p);
                }
                if (e.type == display.MouseEvent.MOUSE_MOVE) {
                    this.__processMouseHovering(this.mLastMouseOverObj, this.mLastMouseOverObj = strict(obj, display.DisplayObject), e);
                }
                if (obj) {
                    if (e.type == display.MouseEvent.MOUSE_DOWN) {
                        var p = display.Point.__pool.get();
                        p.__setTo(this.mMouseX, this.mMouseY);
                        if (this.mLastMouseDownObj == obj && display.getTimer() - this.mMouseClickCountTime < Stage.CLICK_COUNT_INTERVAL && display.Point.distance(p, this.mMouseClickCountPos) < Stage.CLICK_COUNT_DISTANCE) {
                            this.mMouseClickCount++;
                        }
                        else {
                            this.mMouseClickCount = 1;
                        }
                        this.mLastMouseDownObj = strict(obj, display.DisplayObject);
                        this.mMouseClickCountTime = display.getTimer();
                        if (this.mMouseClickCount == 1) {
                            this.mMouseClickCountPos.__setTo(this.mMouseX, this.mMouseY);
                        }
                        display.Point.__pool.release(p);
                    }
                    var clickCount = 0;
                    switch (e.type) {
                        case display.MouseEvent.MOUSE_DOWN:
                        case display.MouseEvent.MOUSE_UP:
                        case display.MouseEvent.MIDDLE_MOUSE_DOWN:
                        case display.MouseEvent.MIDDLE_MOUSE_UP:
                        case display.MouseEvent.RIGHT_MOUSE_DOWN:
                        case display.MouseEvent.RIGHT_MOUSE_UP:
                            e._clickCount = clickCount = this.mMouseClickCount;
                            break;
                    }
                    obj.dispatchEvent(e);
                    var isUp = e.type == display.MouseEvent.MOUSE_UP;
                    if (e.type == display.MouseEvent.MOUSE_OUT && this.mCanvasMouseIsDown) {
                        isUp = true;
                        this.mCanvasMouseIsDown = false;
                        obj.dispatchEvent(new display.MouseEvent(display.MouseEvent.MOUSE_UP, true, false, localX, localY, null, ctrlKey, altKey, shiftKey, buttonDown, 0, false, false, clickCount));
                    }
                    if (isUp) {
                        if (obj === this.mLastMouseDownObj) {
                            obj.dispatchEvent(new display.MouseEvent(display.MouseEvent.CLICK, true, false, localX, localY, null, ctrlKey, altKey, shiftKey));
                            if (obj.doubleClickEnabled && clickCount % 2 == 0) {
                                obj.dispatchEvent(new display.MouseEvent(display.MouseEvent.DOUBLE_CLICK, true, false, localX, localY, null, ctrlKey, altKey, shiftKey));
                            }
                        }
                        if (this.mTouchMode) {
                            this.__processMouseHovering(this.mLastMouseDownObj, this.mLastMouseOverObj = null, e);
                        }
                    }
                    if (e.type == display.MouseEvent.CONTEXT_MENU) {
                        this.dispatchEvent(new display.MouseEvent(display.MouseEvent.RIGHT_CLICK, true, false, localX, localY, null, ctrlKey, altKey, shiftKey));
                        this.contextMenu = this.contextMenu || new display.ContextMenu;
                        var target = strict(obj, display.DisplayObject);
                        while (target) {
                            var interative = as(target, display.InteractiveObject);
                            if (interative) {
                                if (interative.contextMenu) {
                                    interative.contextMenu.show(e);
                                    break;
                                }
                            }
                            target = target.parent;
                        }
                    }
                }
                if (e.type == display.MouseEvent.MOUSE_MOVE) {
                    display.Sprite.__updateDragObject();
                }
            };
            Stage.prototype.__processMouseHovering = function (last, obj, e) {
                var localX = e.localX, localY = e.localY, ctrlKey = e.ctrlKey, altKey = e.altKey, shiftKey = e.shiftKey, buttonDown = e.buttonDown;
                var t = last;
                while (t) {
                    if (t == obj) {
                        break;
                    }
                    else {
                        t.dispatchEvent(new display.MouseEvent(display.MouseEvent.MOUSE_OUT, true, false, localX, localY, null, ctrlKey, altKey, shiftKey, buttonDown));
                        t.dispatchEvent(new display.MouseEvent(display.MouseEvent.ROLL_OUT, true, false, localX, localY, null, ctrlKey, altKey, shiftKey, buttonDown));
                    }
                    t = t.parent;
                }
                if (obj && obj != t) {
                    obj.dispatchEvent(new display.MouseEvent(display.MouseEvent.MOUSE_OVER, true, false, localX, localY, null, ctrlKey, altKey, shiftKey, buttonDown));
                    obj.dispatchEvent(new display.MouseEvent(display.MouseEvent.ROLL_OVER, true, false, localX, localY, null, ctrlKey, altKey, shiftKey, buttonDown));
                }
                var systemCursor;
                t = strict(obj, display.DisplayObject);
                while (t) {
                    if (is(t, display.Sprite)) {
                        var sp = as(t, display.Sprite);
                        if (sp.buttonMode && sp.useHandCursor) {
                            systemCursor = display.MouseCursor.BUTTON;
                            break;
                        }
                    }
                    if (is(t, display.SimpleButton)) {
                        if ((as(t, display.SimpleButton)).useHandCursor) {
                            systemCursor = display.MouseCursor.BUTTON;
                            break;
                        }
                    }
                    t = t.parent;
                }
                if (display.Mouse.systemCursor != systemCursor) {
                    display.Mouse.systemCursor = systemCursor;
                }
            };
            Stage.prototype.__onWindowMouseOver = function (e) {
                var activeElement = document.activeElement;
                if (activeElement && activeElement.nodeType == 1) {
                    var nodeName = activeElement.nodeName;
                    if (nodeName == 'TEXTAREA' || nodeName == 'INPUT' || activeElement.getAttribute('contentEditable') == 'true') {
                        return;
                    }
                }
                window.focus();
            };
            Stage.prototype.__preventDocumentScroll = function (e) {
                if (!e || !(is(e.preventDefault, 'Function'))) {
                    return;
                }
                if (display.Sound.__isSuspended()) {
                    return;
                }
                if (this.mExpander) {
                    var inverted = this.__isNeedFixedOrientationCalc();
                    if (!inverted) {
                        if (this.mParentElement) {
                            if (window.innerHeight < this.mParentElement.clientHeight) {
                                return;
                            }
                        }
                    }
                }
                try {
                    e.preventDefault();
                }
                catch (e) {
                    e = window.asc.e2e(e);
                }
            };
            Stage.prototype.__onCanvasKeyEvent = function (e) {
                var jsType = e.type;
                var flashType;
                switch (jsType) {
                    case "keydown":
                        flashType = display.KeyboardEvent.KEY_DOWN;
                        break;
                    case "keyup":
                        flashType = display.KeyboardEvent.KEY_UP;
                        break;
                }
                var event = new display.KeyboardEvent(flashType, true, false, display.Keyboard[(e.key || '').toUpperCase()] || 0, e.keyCode, e.location, e.ctrlKey, e.altKey, e.shiftKey);
                event.base = e;
                switch (event.keyCode) {
                    case display.Keyboard.LEFT:
                    case display.Keyboard.RIGHT:
                    case display.Keyboard.UP:
                    case display.Keyboard.DOWN:
                        this.__preventDocumentScroll(e);
                        break;
                }
                this.__broadcastEvent(event);
            };
            Stage.prototype.__getMouseXFromEvent = function (event) {
                return (event.pageX - Stage.__getCanvasOffset(this.mBody).x) * (this.mStageWidth / this.mBody.clientWidth);
            };
            Stage.prototype.__getMouseYFromEvent = function (event) {
                return (event.pageY - Stage.__getCanvasOffset(this.mBody).y) * (this.mStageHeight / this.mBody.clientHeight);
            };
            Stage.__getCanvasOffset = function (obj) {
                var left = 0, top = 0;
                if (obj.offsetParent) {
                    do {
                        left += obj.offsetLeft;
                        top += obj.offsetTop;
                    } while (obj = obj.offsetParent);
                    Stage.sHelperCanvasOffset.x = left;
                    Stage.sHelperCanvasOffset.y = top;
                    return Stage.sHelperCanvasOffset;
                }
                Stage.sHelperCanvasOffset.x = Stage.sHelperCanvasOffset.y = 0;
                return Stage.sHelperCanvasOffset;
            };
            Stage.prototype.__updateFullscreenStage = function () {
                var screenResolutionX = display.Capabilities.__getScreenResolutionX();
                var screenResolutionY = display.Capabilities.__getScreenResolutionY();
                this.mStageWidth = this.__getStageWidth(screenResolutionX, screenResolutionY);
                this.mStageHeight = this.__getStageHeight(screenResolutionX, screenResolutionY);
            };
            Stage.__requestAnimationFrameDefault = function (callback) {
                display.setTimeout(callback, 1000 / 60);
            };
            Stage.prototype.toString = function () {
                return '[object Stage]';
            };
            Stage.sCurrent = null;
            Stage.sHelperCanvas2d = null;
            Stage.sHelperCtx2d = null;
            Stage.__block0 = function () {
                function $() {
                    Stage.sHelperCanvas2d = as(document.createElement("canvas"), HTMLCanvasElement);
                    Stage.sHelperCtx2d = as(Stage.sHelperCanvas2d.getContext("2d"), CanvasRenderingContext2D);
                }
                asc.stb(Stage, $);
            }();
            Stage.EXPANDER_HEIGHT = 100;
            Stage.EXPANDER_DELAY = 2000;
            Stage.CLICK_COUNT_DISTANCE = 32;
            Stage.CLICK_COUNT_INTERVAL = 500;
            Stage.sStageID = 0;
            Stage.sHelperRect = asc.sti(Stage, function () { Stage.sHelperRect = new display.Rectangle; });
            Stage.sHelperPoint = asc.sti(Stage, function () { Stage.sHelperPoint = new display.Point; });
            Stage.sHelperMouseEvent = {};
            Stage.sHelperCanvasOffset = { x: 0, y: 0 };
            Stage.sRequestAnimationFrame = asc.sti(Stage, function () {
                Stage.sRequestAnimationFrame = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame.__bind(window) ||
                    window.mozRequestAnimationFrame.__bind(window) ||
                    window.oRequestAnimationFrame.__bind(window) ||
                    window.msRequestAnimationFrame.__bind(window) ||
                    Stage.__requestAnimationFrameDefault.__bind(_this);
            });
            return Stage;
        }(display.DisplayObjectContainer));
        display.Stage = Stage;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Stage.js.map