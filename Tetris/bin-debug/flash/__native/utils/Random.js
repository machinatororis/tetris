var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var utils;
        (function (utils) {
            utils.getTimer = flash.utils.getTimer;
            var Random = (function () {
                function Random() {
                }
                Random.seed = function (value) {
                    if (value === void 0) { value = 0; }
                    value = ((value) >> 0);
                    if (value == 0)
                        Random.stamp = utils.getTimer();
                    else
                        Random.stamp = value;
                };
                Random.short = function () {
                    Random.stamp = ((Random.stamp * 1103515245 + 12345) >> 0);
                    return (Random.stamp >> 16) & 0x7fff;
                };
                Random.random = function () {
                    return Random.short() / 0x7fff;
                };
                Random.range = function (min, max) {
                    if (min === void 0) { min = 0; }
                    if (max === void 0) { max = 1; }
                    min = (+(min));
                    max = (+(max));
                    return (min + Random.short() % (1 + max - min));
                };
                Random.value = function (max) {
                    max = ((max) >> 0);
                    return Random.short() % max;
                };
                Random.stamp = asc.sti(Random, function () { Random.stamp = utils.getTimer(); });
                return Random;
            }());
            utils.Random = Random;
        })(utils = __native.utils || (__native.utils = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Random.js.map