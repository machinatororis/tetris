var flash;
(function (flash) {
    var events;
    (function (events) {
        var Event = (function () {
            function Event(type, bubbles, cancelable) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                this.base = null;
                this._type = null;
                this._bubbles = false;
                this._cancelable = false;
                this._target = null;
                this._currentTarget = null;
                this._eventPhase = 0;
                this._prevented = false;
                this.mStopsPropagation = false;
                this.mStopsImmediatePropagation = false;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                this._eventPhase = 2;
                this._type = type;
                this._bubbles = bubbles;
                this._cancelable = cancelable;
            }
            Event.prototype.formatToString = function (className) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                className = as(className, 'String');
                var values = ' ';
                var len = ((args.length) >> 0);
                for (var i = 0; i < len; ++i) {
                    var a = as(args[i], 'String');
                    values += a + '=' + quotes.__bind(this)(this[a]) + '';
                    if (i < len - 1)
                        values += ' ';
                }
                return '[' + className + values + ']';
                function quotes(v) {
                    if (typeof v == 'string')
                        return '"' + v + '"';
                    return v;
                }
            };
            Event.prototype.clone = function () {
                return new Event(this.type, this.bubbles, this.cancelable);
            };
            Event.prototype.toString = function () {
                return this.formatToString("Event", "type", "bubbles", "cancelable", "eventPhase");
            };
            Object.defineProperty(Event.prototype, "type", {
                get: function () { return this._type; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "bubbles", {
                get: function () { return this._bubbles; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "cancelable", {
                get: function () { return this._cancelable; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "target", {
                get: function () { return this._target; },
                set: function (value) { this._target = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "currentTarget", {
                get: function () { return this._currentTarget; },
                set: function (value) { this._currentTarget = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "eventPhase", {
                get: function () {
                    return this._eventPhase;
                },
                set: function (value) {
                    value = ((value) >>> 0);
                    if (value != 2 && value != 3) {
                        return;
                    }
                    this._eventPhase = value;
                },
                enumerable: true,
                configurable: true
            });
            Event.prototype.stopPropagation = function () {
                if (this.base && 'stopPropagation' in this.base)
                    this.base.stopPropagation();
                this.mStopsPropagation = true;
            };
            Event.prototype.stopImmediatePropagation = function () {
                this.mStopsPropagation = this.mStopsImmediatePropagation = true;
            };
            Event.prototype.preventDefault = function () {
                if (this.base && 'preventDefault' in this.base)
                    this.base.preventDefault();
                this._prevented = true;
            };
            Event.prototype.isDefaultPrevented = function () {
                return this._prevented;
            };
            Object.defineProperty(Event.prototype, "stopsPropagation", {
                get: function () { return this.mStopsPropagation; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "stopsImmediatePropagation", {
                get: function () { return this.mStopsImmediatePropagation; },
                enumerable: true,
                configurable: true
            });
            Event.ACTIVATE = "activate";
            Event.ADDED = "added";
            Event.ADDED_TO_STAGE = "addedToStage";
            Event.BROWSER_ZOOM_CHANGE = "browserZoomChange";
            Event.CANCEL = "cancel";
            Event.CHANGE = "change";
            Event.CLEAR = "clear";
            Event.CLOSE = "close";
            Event.CLOSING = "closing";
            Event.COMPLETE = "complete";
            Event.CONNECT = "connect";
            Event.COPY = "copy";
            Event.CUT = "cut";
            Event.DEACTIVATE = "deactivate";
            Event.DISPLAYING = "displaying";
            Event.ENTER_FRAME = "enterFrame";
            Event.FRAME_CONSTRUCTED = "frameConstructed";
            Event.EXIT_FRAME = "exitFrame";
            Event.EXITING = "exiting";
            Event.FRAME_LABEL = "frameLabel";
            Event.ID3 = "id3";
            Event.INIT = "init";
            Event.LOCATION_CHANGE = "locationChange";
            Event.MOUSE_LEAVE = "mouseLeave";
            Event.NETWORK_CHANGE = "networkChange";
            Event.OPEN = "open";
            Event.PASTE = "paste";
            Event.REMOVED = "removed";
            Event.REMOVED_FROM_STAGE = "removedFromStage";
            Event.RENDER = "render";
            Event.RESIZE = "resize";
            Event.SCROLL = "scroll";
            Event.TEXT_INTERACTION_MODE_CHANGE = "textInteractionModeChange";
            Event.SELECT = "select";
            Event.SELECT_ALL = "selectAll";
            Event.SOUND_COMPLETE = "soundComplete";
            Event.STANDARD_ERROR_CLOSE = "standardErrorClose";
            Event.STANDARD_INPUT_CLOSE = "standardInputClose";
            Event.STANDARD_OUTPUT_CLOSE = "standardOutputClose";
            Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
            Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
            Event.TAB_INDEX_CHANGE = "tabIndexChange";
            Event.UNLOAD = "unload";
            Event.USER_IDLE = "userIdle";
            Event.USER_PRESENT = "userPresent";
            Event.FULLSCREEN = "fullScreen";
            Event.HTML_BOUNDS_CHANGE = "htmlBoundsChange";
            Event.HTML_DOM_INITIALIZE = "htmlDOMInitialize";
            Event.HTML_RENDER = "htmlRender";
            Event.CONTEXT3D_CREATE = "context3DCreate";
            Event.TEXTURE_READY = "textureReady";
            Event.VIDEO_FRAME = "videoFrame";
            Event.SUSPEND = "suspend";
            Event.CHANNEL_MESSAGE = "channelMessage";
            Event.CHANNEL_STATE = "channelState";
            Event.WORKER_STATE = "workerState";
            return Event;
        }());
        events.Event = Event;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Event.js.map