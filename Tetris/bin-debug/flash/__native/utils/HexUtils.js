var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var utils;
        (function (utils) {
            utils.ByteArray = flash.utils.ByteArray;
            var HexUtils = (function () {
                function HexUtils() {
                }
                HexUtils.dumpByteArray = function (byteArray, startIndex, endIndex, tab) {
                    if (startIndex === void 0) { startIndex = 0; }
                    if (endIndex === void 0) { endIndex = -1; }
                    if (tab === void 0) { tab = ""; }
                    byteArray = strict(byteArray, utils.ByteArray);
                    startIndex = ((startIndex) >>> 0);
                    endIndex = ((endIndex) >> 0);
                    tab = as(tab, 'String');
                    var i = 0, j = 0, len = ((byteArray.length) >> 0);
                    var line, result;
                    var byte = 0;
                    if (endIndex == -1) {
                        endIndex = len;
                    }
                    if ((startIndex < 0) || (startIndex > len)) {
                        throw new RangeError("Start Index Is Out of Bounds");
                    }
                    if ((endIndex < 0) || (endIndex > len) || (endIndex < startIndex)) {
                        throw new RangeError("End Index Is Out of Bounds");
                    }
                    j = 1;
                    result = line = "";
                    for (i = startIndex; i < endIndex; i++) {
                        if (j == 1) {
                            line += tab + HexUtils.padLeft(i.toString(16), 8, "0") + "  ";
                            HexUtils.chars = [];
                        }
                        byte = ((byteArray.get(i)) >>> 0);
                        HexUtils.chars.push(byte);
                        line += HexUtils.padLeft(byte.toString(16), 2, "0") + " ";
                        if ((j % 4) == 0) {
                            line += " ";
                        }
                        j++;
                        if (j == 17) {
                            line += HexUtils.dumpChars();
                            result += (line + "\n");
                            j = 1;
                            line = "";
                        }
                    }
                    if (j != 1) {
                        line = HexUtils.padRight(line, 61, " ") + " " + HexUtils.dumpChars();
                        result += line + "\n";
                    }
                    return HexUtils.useUpperCase ? result.toLocaleUpperCase() : result;
                };
                HexUtils.dumpChars = function () {
                    var byte = 0;
                    var result = "";
                    while (HexUtils.chars.length) {
                        byte = ((HexUtils.chars.shift()) >>> 0);
                        if (byte >= 32 && byte <= 126) {
                            result += String.fromCharCode(byte);
                        }
                        else {
                            result += ".";
                        }
                    }
                    return result;
                };
                HexUtils.padLeft = function (value, digits, pad) {
                    value = as(value, 'String');
                    digits = ((digits) >>> 0);
                    pad = as(pad, 'String');
                    return new Array(digits - value.length + 1).join(pad) + value;
                };
                HexUtils.padRight = function (value, digits, pad) {
                    value = as(value, 'String');
                    digits = ((digits) >>> 0);
                    pad = as(pad, 'String');
                    return value + (new Array(digits - value.length + 1).join(pad));
                };
                HexUtils.useUpperCase = false;
                HexUtils.chars = null;
                return HexUtils;
            }());
            utils.HexUtils = HexUtils;
        })(utils = __native.utils || (__native.utils = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=HexUtils.js.map