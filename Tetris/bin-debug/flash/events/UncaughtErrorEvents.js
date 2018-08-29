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
    var events;
    (function (events) {
        var UncaughtErrorEvents = (function (_super) {
            __extends(UncaughtErrorEvents, _super);
            function UncaughtErrorEvents() {
                return _super.call(this) || this;
            }
            return UncaughtErrorEvents;
        }(events.EventDispatcher));
        events.UncaughtErrorEvents = UncaughtErrorEvents;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=UncaughtErrorEvents.js.map