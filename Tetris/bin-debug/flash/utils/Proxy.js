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
        var Proxy = (function (_super) {
            __extends(Proxy, _super);
            function Proxy() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.valueMap = {};
                return _this;
            }
            Proxy.prototype.getProperty = function (propName) {
                return this.valueMap[propName];
            };
            Proxy.prototype.setProperty = function (propName, value) {
                this.valueMap[propName] = value;
            };
            Proxy.prototype.hasProperty = function (propName) {
                return this.valueMap.hasOwnProperty(propName);
            };
            Proxy.prototype.deleteProperty = function (propName) {
                delete this.valueMap[propName];
            };
            Proxy.prototype.elementNames = function () {
                var names = [];
                var __for0 = window.asc.in(this.valueMap);
                for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                    var p = __for0_1[_i];
                    names.push(p);
                }
                return names;
            };
            return Proxy;
        }(utils.EventDispatcher));
        utils.Proxy = Proxy;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Proxy.js.map