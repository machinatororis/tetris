var flash;
(function (flash) {
    var events;
    (function (events) {
        events.Stage = flash.display.Stage;
        var EventDispatcher = (function () {
            function EventDispatcher(target) {
                if (target === void 0) { target = null; }
                this.implements_flash_events_IEventDispatcher = null;
                target = strict(target, 'implements_flash_events_IEventDispatcher');
            }
            EventDispatcher.prototype.addEventListener = function (type, listener, useCapture, priority, useWeakReference) {
                if (useCapture === void 0) { useCapture = false; }
                if (priority === void 0) { priority = 0; }
                if (useWeakReference === void 0) { useWeakReference = false; }
                type = as(type, 'String');
                useCapture = Boolean(useCapture);
                priority = ((priority) >> 0);
                useWeakReference = Boolean(useWeakReference);
                if (!this._eventListeners) {
                    this._eventListeners = {};
                }
                var funcs = this._eventListeners[type] = this._eventListeners[type] || [];
                if (this.__listenerIndexOf(funcs, listener) >= 0) {
                    return;
                }
                funcs[funcs.length] = listener;
            };
            EventDispatcher.prototype.removeEventListener = function (type, listener, useCapture) {
                if (useCapture === void 0) { useCapture = false; }
                type = as(type, 'String');
                useCapture = Boolean(useCapture);
                if (!this._eventListeners) {
                    return;
                }
                var funcs = this._eventListeners[type];
                if (!funcs) {
                    return;
                }
                var index = this.__listenerIndexOf(funcs, listener);
                if (index === -1) {
                    return;
                }
                funcs.splice(index, 1);
            };
            EventDispatcher.prototype.removeEventListeners = function (type) {
                if (type === void 0) { type = null; }
                type = as(type, 'String');
                if (!this._eventListeners) {
                    return;
                }
                if (type) {
                    delete this._eventListeners[type];
                }
                else {
                    this._eventListeners = null;
                }
            };
            EventDispatcher.prototype.dispatchEvent = function (event) {
                event = strict(event, events.Event);
                return this.__dispatchEvent(event);
            };
            EventDispatcher.prototype.hasEventListener = function (type) {
                type = as(type, 'String');
                var listeners = this._eventListeners ? this._eventListeners[type] : null;
                return listeners ? listeners.length != 0 : false;
            };
            EventDispatcher.prototype.willTrigger = function (param1) {
                param1 = as(param1, 'String');
                return false;
            };
            EventDispatcher.prototype.__dispatchEvent = function (event) {
                if (!event.target)
                    event.target = this;
                event.currentTarget = this;
                if (this._eventListeners) {
                    var funcs = this._eventListeners[event.type];
                    if (funcs) {
                        var q;
                        if (EventDispatcher.__size > 0) {
                            q = EventDispatcher.__pool[EventDispatcher.__size - 1];
                            EventDispatcher.__pool[--EventDispatcher.__size] = null;
                        }
                        else {
                            q = [];
                        }
                        var len = funcs.length;
                        for (var i = 0; i < len; i++) {
                            q[i] = funcs[i];
                        }
                        for (var i = 0; i < len; i++) {
                            try {
                                q[i](event);
                            }
                            catch (e) {
                                e = window.asc.e2e(e);
                                var s = events.Stage.sCurrent;
                                if (s) {
                                    s.__handleError(e);
                                }
                                else {
                                    trace(e.getStackTrace());
                                }
                            }
                            if (event.stopsImmediatePropagation) {
                                EventDispatcher.__pool[EventDispatcher.__size++] = q;
                                return true;
                            }
                        }
                        EventDispatcher.__pool[EventDispatcher.__size++] = q;
                        return event.stopsPropagation;
                    }
                }
                return false;
            };
            EventDispatcher.prototype.__listenerIndexOf = function (funcs, listener) {
                for (var i = 0, len = funcs.length; i < len; ++i) {
                    var current = funcs[i];
                    if (unbind(current) === unbind(listener)) {
                        if ('BoundThis' in current && 'BoundThis' in listener
                            && current.BoundThis != listener.BoundThis) {
                            return -1;
                        }
                        return i;
                    }
                }
                return -1;
            };
            EventDispatcher.__pool = [];
            EventDispatcher.__size = 0;
            return EventDispatcher;
        }());
        events.EventDispatcher = EventDispatcher;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=EventDispatcher.js.map