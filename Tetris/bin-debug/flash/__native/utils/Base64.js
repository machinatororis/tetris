var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var utils;
        (function (utils) {
            utils.ByteArray = flash.utils.ByteArray;
            var Base64 = (function () {
                function Base64() {
                }
                Base64.encode = function (data) {
                    data = strict(data, utils.ByteArray);
                    var out = new utils.ByteArray;
                    out.length = (((2 + data._length - ((data._length + 2) % 3)) * 4 / 3) >>> 0);
                    var i = 0;
                    var r = ((data._length % 3) >> 0);
                    var len = ((data._length - r) >> 0);
                    var c = 0;
                    var outPos = 0;
                    while (i < len) {
                        c = ((data.get(((i++) >> 0)) << 16 | data.get(((i++) >> 0)) << 8 | data.get(((i++) >> 0))) >>> 0);
                        out.set(outPos++, Base64._encodeChars[((c >>> 18) >> 0)]);
                        out.set(outPos++, Base64._encodeChars[((c >>> 12 & 0x3f) >> 0)]);
                        out.set(outPos++, Base64._encodeChars[((c >>> 6 & 0x3f) >> 0)]);
                        out.set(outPos++, Base64._encodeChars[((c & 0x3f) >> 0)]);
                    }
                    if (r == 1) {
                        c = ((data.get(((i) >> 0))) >>> 0);
                        out.set(outPos++, Base64._encodeChars[((c >>> 2) >> 0)]);
                        out.set(outPos++, Base64._encodeChars[(((c & 0x03) << 4) >> 0)]);
                        out.set(outPos++, 61);
                        out.set(outPos++, 61);
                    }
                    else if (r == 2) {
                        c = ((data.get(((i++) >> 0)) << 8 | data.get(((i) >> 0))) >>> 0);
                        out.set(outPos++, Base64._encodeChars[((c >>> 10) >> 0)]);
                        out.set(outPos++, Base64._encodeChars[((c >>> 4 & 0x3f) >> 0)]);
                        out.set(outPos++, Base64._encodeChars[(((c & 0x0f) << 2) >> 0)]);
                        out.set(outPos++, 61);
                    }
                    return out.readUTFBytes(out._length);
                };
                Base64.decode = function (str) {
                    str = as(str, 'String');
                    var c1 = 0;
                    var c2 = 0;
                    var c3 = 0;
                    var c4 = 0;
                    var i = 0;
                    var outPos = 0;
                    var len = str.length;
                    var byteString = new utils.ByteArray;
                    byteString.writeUTFBytes(str);
                    while (i < len) {
                        c1 = ((Base64._decodeChars[((byteString.get(i++)) >> 0)]) >> 0);
                        if (c1 == -1)
                            break;
                        c2 = ((Base64._decodeChars[((byteString.get(i++)) >> 0)]) >> 0);
                        if (c2 == -1)
                            break;
                        byteString.set(((outPos++) >> 0), (c1 << 2) | ((c2 & 0x30) >> 4));
                        c3 = ((byteString.get(((i++) >> 0))) >> 0);
                        if (c3 == 61) {
                            byteString.length = ((outPos) >>> 0);
                            return byteString;
                        }
                        c3 = ((Base64._decodeChars[((c3) >> 0)]) >> 0);
                        if (c3 == -1)
                            break;
                        byteString.set(((outPos++) >> 0), ((c2 & 0x0f) << 4) | ((c3 & 0x3c) >> 2));
                        c4 = ((byteString.get(((i++) >> 0))) >> 0);
                        if (c4 == 61) {
                            byteString.length = ((outPos) >>> 0);
                            return byteString;
                        }
                        c4 = ((Base64._decodeChars[((c4) >> 0)]) >> 0);
                        if (c4 == -1)
                            break;
                        byteString.set(((outPos++) >> 0), ((c3 & 0x03) << 6) | c4);
                    }
                    byteString.length = ((outPos) >>> 0);
                    byteString.position = 0;
                    return byteString;
                };
                Base64.InitEncoreChar = function () {
                    var encodeChars = new Array(64);
                    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                    for (var i = 0; i < 64; i++) {
                        encodeChars[i] = chars.charCodeAt(i);
                    }
                    return encodeChars;
                };
                Base64.InitDecodeChar = function () {
                    var decodeChars = [
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
                        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
                        -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
                        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
                    ];
                    return decodeChars;
                };
                Base64._encodeChars = asc.sti(Base64, function () { Base64._encodeChars = Base64.InitEncoreChar(); });
                Base64._decodeChars = asc.sti(Base64, function () { Base64._decodeChars = Base64.InitDecodeChar(); });
                return Base64;
            }());
            utils.Base64 = Base64;
        })(utils = __native.utils || (__native.utils = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Base64.js.map