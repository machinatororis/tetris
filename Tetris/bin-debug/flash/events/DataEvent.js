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
        var DataEvent = (function (_super) {
            __extends(DataEvent, _super);
            function DataEvent(type, bubbles, cancelable, data) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (data === void 0) { data = ""; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                data = as(data, 'String');
                _this.data === void 0 && (_this.data = null);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this.data = data;
                return _this;
            }
            DataEvent.prototype.clone = function () {
                return new DataEvent(this.type, this.bubbles, this.cancelable, this.data);
            };
            DataEvent.prototype.toString = function () {
                return this.formatToString("DataEvent", "type", "bubbles", "cancelable", "eventPhase", "data");
            };
            DataEvent.DATA = "data";
            DataEvent.UPLOAD_COMPLETE_DATA = "uploadCompleteData";
            return DataEvent;
        }(events.TextEvent));
        events.DataEvent = DataEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=DataEvent.js.map