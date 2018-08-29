var flash;
(function (flash) {
    var events;
    (function (events) {
        var EventPhase = (function () {
            function EventPhase() {
                throw new Error('Abstract class error');
            }
            EventPhase.CAPTURING_PHASE = 1;
            EventPhase.AT_TARGET = 2;
            EventPhase.BUBBLING_PHASE = 3;
            return EventPhase;
        }());
        events.EventPhase = EventPhase;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=EventPhase.js.map