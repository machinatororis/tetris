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
        events.ByteArray = flash.utils.ByteArray;
        var SampleDataEvent = (function (_super) {
            __extends(SampleDataEvent, _super);
            function SampleDataEvent(type, bubbles, cancelable, position, data) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (position === void 0) { position = 0; }
                if (data === void 0) { data = null; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                position = (+(position));
                data = strict(data, events.ByteArray);
                _this.data === void 0 && (_this.data = null);
                _this.position === void 0 && (_this.position = NaN);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this.position = position;
                _this.data = data;
                return _this;
            }
            SampleDataEvent.prototype.clone = function () {
                return new SampleDataEvent(this.type, this.bubbles, this.cancelable, this.position, this.data);
            };
            SampleDataEvent.prototype.toString = function () {
                return this.formatToString("SampleDataEvent", "type", "bubbles", "cancelable", "eventPhase", "position", "data");
            };
            SampleDataEvent.SAMPLE_DATA = "sampleData";
            return SampleDataEvent;
        }(events.Event));
        events.SampleDataEvent = SampleDataEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SampleDataEvent.js.map