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
    var net;
    (function (net) {
        net.EventDispatcher = flash.events.EventDispatcher;
        var LocalConnection = (function (_super) {
            __extends(LocalConnection, _super);
            function LocalConnection() {
                var _this = this;
                _this.client === void 0 && (_this.client = null);
                _this.isPerUser === void 0 && (_this.isPerUser = false);
                _this._domain === void 0 && (_this._domain = null);
                _this = _super.call(this) || this;
                _this._domain = as(window.asc.utils.getHostName(window.location.href), 'String');
                return _this;
            }
            Object.defineProperty(LocalConnection.prototype, "domain", {
                get: function () {
                    return this._domain;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LocalConnection, "isSupported", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            LocalConnection.prototype.allowDomain = function () {
                var domains = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    domains[_i] = arguments[_i];
                }
            };
            LocalConnection.prototype.allowInsecureDomain = function () {
                var domains = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    domains[_i] = arguments[_i];
                }
            };
            LocalConnection.prototype.close = function () {
            };
            LocalConnection.prototype.connect = function (connectionName) {
                connectionName = as(connectionName, 'String');
            };
            LocalConnection.prototype.send = function (connectionName, methodName) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                connectionName = as(connectionName, 'String');
                methodName = as(methodName, 'String');
            };
            return LocalConnection;
        }(net.EventDispatcher));
        net.LocalConnection = LocalConnection;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=LocalConnection.js.map