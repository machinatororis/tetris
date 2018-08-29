var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var utils;
        (function (utils) {
            var ObjectPool = (function () {
                function ObjectPool(create, clean) {
                    if (create === void 0) { create = null; }
                    if (clean === void 0) { clean = null; }
                    this.__pool = null;
                    this.__size = 0;
                    this.__create = null;
                    this.__clean = null;
                    this.__create = create;
                    this.__clean = clean;
                    this.__pool = [];
                }
                ObjectPool.prototype.get = function () {
                    if (this.__size > 0) {
                        var object = this.__pool.pop();
                        this.__size--;
                        this.__clean(object);
                        return object;
                    }
                    return this.__create();
                };
                ObjectPool.prototype.release = function (object) {
                    if (object == null) {
                        return;
                    }
                    this.__pool[this.__size++] = object;
                };
                return ObjectPool;
            }());
            utils.ObjectPool = ObjectPool;
        })(utils = __native.utils || (__native.utils = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ObjectPool.js.map