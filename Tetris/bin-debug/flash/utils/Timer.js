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
    var utils;
    (function (utils) {
        utils.EventDispatcher = flash.events.EventDispatcher;
        utils.TimerEvent = flash.events.TimerEvent;
        var Timer = (function (_super) {
            __extends(Timer, _super);
            function Timer(delay, repeatCount) {
                if (repeatCount === void 0) { repeatCount = 0; }
                var _this = this;
                delay = (+(delay));
                repeatCount = ((repeatCount) >> 0);
                _this._delay === void 0 && (_this._delay = NaN);
                _this._repeatCount === void 0 && (_this._repeatCount = 0);
                _this._iteration === void 0 && (_this._iteration = 0);
                _this._intervalID === void 0 && (_this._intervalID = 0);
                _this = _super.call(this) || this;
                if (delay < 0 || !isFinite(delay)) {
                    Error.throwError(RangeError, 2066);
                }
                _this._delay = delay;
                _this._repeatCount = repeatCount;
                return _this;
            }
            Object.defineProperty(Timer.prototype, "delay", {
                get: function () {
                    return this._delay;
                },
                set: function (value) {
                    value = (+(value));
                    if (value < 0 || !isFinite(value)) {
                        Error.throwError(RangeError, 2066);
                    }
                    this._delay = value;
                    if (this.running) {
                        this.stop();
                        this.start();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timer.prototype, "repeatCount", {
                get: function () {
                    return this._repeatCount;
                },
                set: function (value) {
                    value = ((value) >> 0);
                    this._repeatCount = value;
                    if (this.running && this._repeatCount != 0 && this._iteration >= this._repeatCount) {
                        this.stop();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timer.prototype, "currentCount", {
                get: function () {
                    return this._iteration;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timer.prototype, "running", {
                get: function () {
                    return this._intervalID > 0;
                },
                enumerable: true,
                configurable: true
            });
            Timer.prototype.tick = function () {
                this._iteration++;
                this._timerDispatch();
                if (this._repeatCount != 0 && this._iteration >= this._repeatCount) {
                    this.stop();
                    this.dispatchEvent(new utils.TimerEvent(utils.TimerEvent.TIMER_COMPLETE, false, false));
                }
            };
            Timer.prototype.start = function () {
                if (!this.running) {
                    this._start(this._delay, this.tick.__bind(this));
                }
            };
            Timer.prototype.reset = function () {
                if (this.running) {
                    this.stop();
                }
                this._iteration = 0;
            };
            Timer.prototype._start = function (delay, tick) {
                delay = (+(delay));
                this._intervalID = ((utils.setInterval(tick, delay)) >> 0);
            };
            Timer.prototype._timerDispatch = function () {
                this.dispatchEvent(new utils.TimerEvent(utils.TimerEvent.TIMER));
            };
            Timer.prototype.stop = function () {
                utils.clearInterval(this._intervalID);
                this._intervalID = 0;
            };
            return Timer;
        }(utils.EventDispatcher));
        utils.Timer = Timer;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Timer.js.map