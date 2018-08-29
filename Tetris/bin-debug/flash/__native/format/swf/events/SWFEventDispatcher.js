var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var events;
                (function (events) {
                    events.Event = flash.events.Event;
                    events.EventDispatcher = flash.events.EventDispatcher;
                    events.IEventDispatcher = flash.events.IEventDispatcher;
                    var SWFEventDispatcher = (function () {
                        function SWFEventDispatcher() {
                            this.implements_flash_events_IEventDispatcher = null;
                            this.dispatcher = null;
                            this.dispatcher = new events.EventDispatcher(this);
                        }
                        SWFEventDispatcher.prototype.addEventListener = function (type, listener, useCapture, priority, useWeakReference) {
                            if (useCapture === void 0) { useCapture = false; }
                            if (priority === void 0) { priority = 0; }
                            if (useWeakReference === void 0) { useWeakReference = false; }
                            type = as(type, 'String');
                            useCapture = Boolean(useCapture);
                            priority = ((priority) >> 0);
                            useWeakReference = Boolean(useWeakReference);
                            this.dispatcher.addEventListener(type, listener, useCapture, priority, useWeakReference);
                        };
                        SWFEventDispatcher.prototype.removeEventListener = function (type, listener, useCapture) {
                            if (useCapture === void 0) { useCapture = false; }
                            type = as(type, 'String');
                            useCapture = Boolean(useCapture);
                            this.dispatcher.removeEventListener(type, listener, useCapture);
                        };
                        SWFEventDispatcher.prototype.dispatchEvent = function (event) {
                            event = strict(event, events.Event);
                            return this.dispatcher.dispatchEvent(event);
                        };
                        SWFEventDispatcher.prototype.hasEventListener = function (type) {
                            type = as(type, 'String');
                            return this.dispatcher.hasEventListener(type);
                        };
                        SWFEventDispatcher.prototype.willTrigger = function (type) {
                            type = as(type, 'String');
                            return this.dispatcher.willTrigger(type);
                        };
                        return SWFEventDispatcher;
                    }());
                    events.SWFEventDispatcher = SWFEventDispatcher;
                })(events = swf.events || (swf.events = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFEventDispatcher.js.map