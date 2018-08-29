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
        var SyncEvent = (function (_super) {
            __extends(SyncEvent, _super);
            function SyncEvent(type, bubbles, cancelable, changeList) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (changeList === void 0) { changeList = null; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                changeList = strict(changeList, Array);
                _this.changeList === void 0 && (_this.changeList = null);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this.changeList = changeList;
                return _this;
            }
            SyncEvent.prototype.clone = function () {
                return new SyncEvent(this.type, this.bubbles, this.cancelable, this.changeList);
            };
            SyncEvent.prototype.toString = function () {
                return this.formatToString("SyncEvent", "type", "bubbles", "cancelable", "eventPhase", "changeList");
            };
            SyncEvent.SYNC = "sync";
            return SyncEvent;
        }(events.Event));
        events.SyncEvent = SyncEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SyncEvent.js.map