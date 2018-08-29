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
    var errors;
    (function (errors) {
        var MemoryError = (function (_super) {
            __extends(MemoryError, _super);
            function MemoryError(message) {
                var _newTarget = this.constructor;
                if (message === void 0) { message = ""; }
                var _this = this;
                message = as(message, 'String');
                _this = _super.call(this, message) || this;
                Object.setPrototypeOf(_this, _newTarget.prototype);
                ;
                return _this;
            }
            return MemoryError;
        }(Error));
        errors.MemoryError = MemoryError;
    })(errors = flash.errors || (flash.errors = {}));
})(flash || (flash = {}));
//# sourceMappingURL=MemoryError.js.map