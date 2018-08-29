var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var utils;
        (function (utils) {
            function getNextPowerOfTwo(value) {
                value = (+(value));
                if (is(value, 'int') && value > 0 && (value & (value - 1)) == 0) {
                    return value;
                }
                var result = 1;
                value -= 0.000000001;
                while (result < value) {
                    result <<= 1;
                }
                return result;
            }
            utils.getNextPowerOfTwo = getNextPowerOfTwo;
        })(utils = __native.utils || (__native.utils = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=getNextPowerOfTwo.js.map