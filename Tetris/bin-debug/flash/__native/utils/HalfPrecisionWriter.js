var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var utils;
        (function (utils) {
            utils.SWFData = flash.__native.format.swf.SWFData;
            var HalfPrecisionWriter = (function () {
                function HalfPrecisionWriter() {
                }
                HalfPrecisionWriter.write = function (value, data) {
                    value = (+(value));
                    data = strict(data, utils.SWFData);
                    data.resetBitsPending();
                    var dword = 0;
                    var sign = 0;
                    var exponent = 0;
                    var significand = 0;
                    var halfSignificand = 0;
                    var signedExponent = 0;
                    var result = 0;
                    var p = 0;
                    p = data.position;
                    data.writeDouble(value);
                    data.position -= 4;
                    dword = data.readUnsignedInt();
                    data.position = p;
                    if ((dword & 0x7FFFFFFF) == 0) {
                        result = ((dword >> 16) >>> 0);
                    }
                    else {
                        sign = ((dword & 0x80000000) >>> 0);
                        exponent = ((dword & 0x7FF00000) >>> 0);
                        significand = ((dword & 0x000FFFFF) >>> 0);
                        if (exponent == 0) {
                            result = ((sign >> 16) >>> 0);
                        }
                        else if (exponent == 0x7FF00000) {
                            if (significand == 0) {
                                result = ((((sign >> 16) | 0x7C00)) >>> 0);
                            }
                            else {
                                result = 0xFE00;
                            }
                        }
                        else {
                            sign = ((sign >> 16) >>> 0);
                            signedExponent = (((exponent >> 20) - 1023 + 15) >> 0);
                            if (signedExponent >= 0x1F) {
                                result = ((((significand >> 16) | 0x7C00)) >>> 0);
                            }
                            else if (signedExponent <= 0) {
                                if ((10 - signedExponent) > 21) {
                                    halfSignificand = 0;
                                }
                                else {
                                    significand |= 0x00100000;
                                    halfSignificand = (((significand >> (11 - signedExponent))) >>> 0);
                                    if ((significand >> (10 - signedExponent)) & 0x00000001) {
                                        halfSignificand += 1;
                                    }
                                }
                                result = (((sign | halfSignificand)) >>> 0);
                            }
                            else {
                                exponent = ((signedExponent << 10) >>> 0);
                                halfSignificand = ((significand >> 10) >>> 0);
                                if (significand & 0x00000200) {
                                    result = (((sign | exponent | halfSignificand) + 1) >>> 0);
                                }
                                else {
                                    result = (((sign | exponent | halfSignificand)) >>> 0);
                                }
                            }
                        }
                    }
                    data.writeShort(result);
                    data.length = ((p + 2) >>> 0);
                };
                return HalfPrecisionWriter;
            }());
            utils.HalfPrecisionWriter = HalfPrecisionWriter;
        })(utils = __native.utils || (__native.utils = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=HalfPrecisionWriter.js.map