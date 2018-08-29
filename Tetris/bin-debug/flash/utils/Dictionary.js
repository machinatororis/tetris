var flash;
(function (flash) {
    var utils;
    (function (utils) {
        var Dictionary = (function () {
            function Dictionary(weakKeys) {
                if (weakKeys === void 0) { weakKeys = false; }
                weakKeys = Boolean(weakKeys);
                if (window.asc.utils.NATIVE_MAP_AVAILABLE) {
                    this.__mapNative = new Map;
                }
                else {
                    this.__mapSimple = new window.asc.utils.MapSimple;
                }
                this.__weak = weakKeys;
            }
            Dictionary.prototype.get = function (key) {
                return (this.__mapNative || this.__mapSimple).get(key);
            };
            Dictionary.prototype.set = function (key, value) {
                if (this.__mapNative) {
                    this.__mapNative.set(key, value);
                    return value;
                }
                return this.__mapSimple.set(key, value);
            };
            Dictionary.prototype.delete = function (key) {
                return (this.__mapNative || this.__mapSimple).delete(key);
            };
            Dictionary.prototype.__iterator = function (forEach) {
                if (forEach) {
                    if (this.__mapNative) {
                        return Array.from(this.__mapNative.values());
                    }
                    return this.__mapSimple.values;
                }
                if (this.__mapNative) {
                    return Array.from(this.__mapNative.keys());
                }
                return this.__mapSimple.keys;
            };
            Dictionary.prototype.__values = function () {
            };
            return Dictionary;
        }());
        utils.Dictionary = Dictionary;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Dictionary.js.map