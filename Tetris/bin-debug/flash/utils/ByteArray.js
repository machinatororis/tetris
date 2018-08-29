var flash;
(function (flash) {
    var utils;
    (function (utils) {
        var _this = this;
        utils.AMF = flash.__native.format.amf.AMF;
        utils.ObjectPool = flash.__native.utils.ObjectPool;
        utils.IOError = flash.errors.IOError;
        utils.ObjectEncoding = flash.net.ObjectEncoding;
        var ByteArray = (function () {
            function ByteArray() {
                this.implements_flash_utils_IDataOutput = null;
                this.implements_flash_utils_IDataInput = null;
                this._position = 0;
                this._length = 0;
                this._objectEncoding = ByteArray._defaultObjectEncoding;
                this._endian = 'bigEndian';
                if (arguments[0] == false) {
                    return;
                }
                this._dataView = new DataView(new ArrayBuffer(0));
            }
            Object.defineProperty(ByteArray, "defaultObjectEncoding", {
                get: function () { return ByteArray._defaultObjectEncoding; },
                set: function (value) { value = ((value) >>> 0); ByteArray._defaultObjectEncoding = value; },
                enumerable: true,
                configurable: true
            });
            ByteArray.prototype.get = function (index) {
                index = ((index) >> 0);
                try {
                    return this._dataView.getUint8(index);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    return undefined;
                }
            };
            ByteArray.prototype.set = function (index, v) {
                index = ((index) >> 0);
                v = ((v) >> 0);
                if (index + 1 > this._length) {
                    this.length = ((index + 1) >>> 0);
                }
                if (v < 0) {
                    this._dataView.setInt8(index, v);
                }
                else {
                    this._dataView.setUint8(index, v);
                }
            };
            ByteArray.prototype.readBytes = function (b, offset, length) {
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = 0; }
                b = strict(b, ByteArray);
                offset = ((offset) >>> 0);
                length = ((length) >>> 0);
                var pos = b.position;
                b.position = offset;
                b.writeBytes(this, this.position, length);
                b.position = ((pos) >>> 0);
            };
            ByteArray.prototype.writeBytes = function (bytes, offset, length) {
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = 0; }
                bytes = strict(bytes, ByteArray);
                offset = ((offset) >>> 0);
                length = ((length) >>> 0);
                if (length == 0) {
                    length = ((bytes._length - offset) >>> 0);
                }
                this.__beforeWrite(length);
                var db = new Uint8Array(this._dataView.buffer);
                var sb = new Uint8Array(bytes._dataView.buffer, offset, length);
                db.set(sb, this._position);
                this._position += length;
                bytes._position += length;
            };
            ByteArray.prototype.writeBoolean = function (v) {
                v = Boolean(v);
                this.__beforeWrite(1);
                this._dataView.setInt8(this._position++, v ? 1 : 0);
            };
            ByteArray.prototype.writeByte = function (v) {
                v = ((v) >> 0);
                this.__beforeWrite(1);
                this._dataView.setInt8(this._position++, v);
            };
            ByteArray.prototype.writeShort = function (v) {
                v = ((v) >> 0);
                this.__beforeWrite(2);
                this._dataView.setInt16(this._position, v, this._isLittleEndian);
                this._position += 2;
            };
            ByteArray.prototype.writeInt = function (v) {
                v = ((v) >> 0);
                this.__beforeWrite(4);
                this._dataView.setInt32(this._position, v, this._isLittleEndian);
                this._position += 4;
            };
            ByteArray.prototype.writeUnsignedInt = function (v) {
                v = ((v) >>> 0);
                this.__beforeWrite(4);
                this._dataView.setUint32(this._position, v, this._isLittleEndian);
                this._position += 4;
            };
            ByteArray.prototype.writeFloat = function (v) {
                v = (+(v));
                this.__beforeWrite(4);
                this._dataView.setFloat32(this._position, v, this._isLittleEndian);
                this._position += 4;
            };
            ByteArray.prototype.writeDouble = function (v) {
                v = (+(v));
                this.__beforeWrite(8);
                this._dataView.setFloat64(this._position, v, this._isLittleEndian);
                this._position += 8;
            };
            ByteArray.prototype.writeMultiByte = function (str, charSet) {
                str = as(str, 'String');
                charSet = as(charSet, 'String');
                var u8;
                var Encoder = window.asc.vanilla.get('TextEncoder');
                if (charSet != 'utf-8' || !Encoder) {
                    Encoder = window.TextEncoder;
                }
                if (Encoder) {
                    u8 = strict(new Encoder(charSet, { NONSTANDARD_allowLegacyEncoding: true }).encode(str), Uint8Array);
                }
                else {
                    u8 = new Uint8Array(as(window.asc.vanilla.get('unescape')(encodeURIComponent(str)).split('').map(function (c) {
                        return c.charCodeAt(0);
                    }.__bind(this)), Array));
                }
                var length = u8.length;
                this.__beforeWrite(length);
                var db = new Uint8Array(this._dataView.buffer);
                db.set(u8, this._position);
                this._position += length;
            };
            ByteArray.prototype.writeUTF = function (v) {
                v = as(v, 'String');
                this._position += 2;
                var start = this._position;
                this.writeUTFBytes(v);
                var end = this._position;
                this._position = ((start - 2) >> 0);
                this.writeShort(start - end);
                this._position = end;
            };
            ByteArray.prototype.writeUTFBytes = function (v) {
                v = as(v, 'String');
                this.writeMultiByte(v, 'utf-8');
            };
            ByteArray.prototype.readBoolean = function () {
                return this._dataView.getInt8(this._position++) != 0;
            };
            ByteArray.prototype.readByte = function () {
                return this._dataView.getInt8(this._position++);
            };
            ByteArray.prototype.readUnsignedByte = function () {
                return this._dataView.getUint8(this._position++);
            };
            ByteArray.prototype.readShort = function () {
                var v = this._dataView.getInt16(this._position, this._isLittleEndian);
                this._position += 2;
                return v;
            };
            ByteArray.prototype.readUnsignedShort = function () {
                var v = this._dataView.getUint16(this._position, this._isLittleEndian);
                this._position += 2;
                return v;
            };
            ByteArray.prototype.readInt = function () {
                var v = this._dataView.getInt32(this._position, this._isLittleEndian);
                this._position += 4;
                return v;
            };
            ByteArray.prototype.readUnsignedInt = function () {
                var v = this._dataView.getUint32(this._position, this._isLittleEndian);
                this._position += 4;
                return v;
            };
            ByteArray.prototype.readFloat = function () {
                var v = this._dataView.getFloat32(this._position, this._isLittleEndian);
                this._position += 4;
                return v;
            };
            ByteArray.prototype.readDouble = function () {
                var v = this._dataView.getFloat64(this._position, this._isLittleEndian);
                this._position += 8;
                return v;
            };
            ByteArray.prototype.readMultiByte = function (length, charSet) {
                length = ((length) >>> 0);
                charSet = as(charSet, 'String');
                var str = '';
                var u8 = strict(new Uint8Array(this._dataView.buffer).subarray(this._position, this._position + length), Uint8Array);
                var Decoder = window.asc.vanilla.get('TextDecoder');
                if (charSet != 'utf-8' || !Decoder) {
                    Decoder = window.TextDecoder;
                }
                if (Decoder) {
                    str = as(new Decoder(charSet, { NONSTANDARD_allowLegacyEncoding: true }).decode(u8), 'String');
                }
                else {
                    var charArr = new Array(u8.length);
                    var u8Length = ((u8.length) >> 0);
                    for (var i = 0; i < u8Length; i++) {
                        charArr[i] = String.fromCharCode(u8[i]);
                    }
                    str = charArr.join('');
                    try {
                        str = decodeURIComponent(window.asc.vanilla.get('escape')(str));
                    }
                    catch (e) {
                        e = window.asc.e2e(e);
                    }
                }
                this._position += length;
                return str;
            };
            ByteArray.prototype.readUTF = function () {
                return this.readUTFBytes(this.readUnsignedShort());
            };
            ByteArray.prototype.readUTFBytes = function (length) {
                length = ((length) >>> 0);
                if (this._position + 3 <= this._length && this.get(this._position) == 0xef && this.get(this._position + 1) == 0xbb && this.get(this._position + 2) == 0xbf) {
                    this._position += 3;
                    length -= 3;
                    if (length < 0) {
                        length = 0;
                    }
                }
                return this.readMultiByte(length, 'utf-8');
            };
            Object.defineProperty(ByteArray.prototype, "length", {
                get: function () { return this._length; },
                set: function (v) { v = ((v) >>> 0); this.__setLength(v); },
                enumerable: true,
                configurable: true
            });
            ByteArray.prototype.writeObject = function (object) {
                switch (this._objectEncoding) {
                    case utils.ObjectEncoding.AMF0:
                    case utils.ObjectEncoding.AMF3:
                        utils.AMF.write(this._objectEncoding, this, object);
                        break;
                    default:
                        throw new Error('Object Encoding');
                }
            };
            ByteArray.prototype.readObject = function () {
                switch (this._objectEncoding) {
                    case utils.ObjectEncoding.AMF0:
                    case utils.ObjectEncoding.AMF3:
                        return utils.AMF.read(this._objectEncoding, this);
                    default:
                        throw new Error('Object Encoding');
                }
            };
            ByteArray.prototype.deflate = function () {
                this.__compress(utils.CompressionAlgorithm.DEFLATE);
            };
            ByteArray.prototype.compress = function (algorithm) {
                if (algorithm === void 0) { algorithm = 'zlib'; }
                algorithm = as(algorithm, 'String');
                this.__compress(algorithm);
            };
            ByteArray.prototype.inflate = function () {
                this.__uncompress(utils.CompressionAlgorithm.DEFLATE);
            };
            ByteArray.prototype.uncompress = function (algorithm) {
                if (algorithm === void 0) { algorithm = 'zlib'; }
                algorithm = as(algorithm, 'String');
                this.__uncompress(algorithm);
            };
            ByteArray.prototype.toString = function () {
                return this.__toString(0, this._length);
            };
            ByteArray.prototype.toJSON = function (k) {
                k = as(k, 'String');
            };
            Object.defineProperty(ByteArray.prototype, "bytesAvailable", {
                get: function () {
                    return this._length - this._position;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ByteArray.prototype, "position", {
                get: function () { return this._position; },
                set: function (p) { p = ((p) >>> 0); this._position = ((p) >> 0); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ByteArray.prototype, "objectEncoding", {
                get: function () { return this._objectEncoding; },
                set: function (value) { value = ((value) >>> 0); this._objectEncoding = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ByteArray.prototype, "endian", {
                get: function () { return this._endian; },
                set: function (v) {
                    v = as(v, 'String');
                    this._endian = v;
                    this._isLittleEndian = v == utils.Endian.LITTLE_ENDIAN;
                },
                enumerable: true,
                configurable: true
            });
            ByteArray.prototype.clear = function () {
                this._position = 0;
                this.__setLength(0);
            };
            ByteArray.prototype.atomicCompareAndSwapIntAt = function (param1, param2, param3) {
                param1 = ((param1) >> 0);
                param2 = ((param2) >> 0);
                param3 = ((param3) >> 0);
                return 0;
            };
            ByteArray.prototype.atomicCompareAndSwapLength = function (param1, param2) {
                param1 = ((param1) >> 0);
                param2 = ((param2) >> 0);
                return 0;
            };
            Object.defineProperty(ByteArray.prototype, "shareable", {
                get: function () { return false; },
                set: function (param1) { param1 = Boolean(param1); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ByteArray.prototype, "buffer", {
                get: function () {
                    return ByteArray.__slice(this._dataView.buffer, 0, this._length);
                },
                enumerable: true,
                configurable: true
            });
            ByteArray.prototype.__fromByteArray = function (bytes, copyOf) {
                if (copyOf === void 0) { copyOf = false; }
                this._length = ((bytes.length) >> 0);
                this._position = 0;
                this._dataView = new DataView(copyOf ? bytes.buffer : bytes._dataView.buffer);
                return this;
            };
            ByteArray.prototype.__fromArrayBuffer = function (buff, copyOf) {
                if (copyOf === void 0) { copyOf = false; }
                this._length = ((buff.byteLength) >> 0);
                this._position = 0;
                this._dataView = new DataView(copyOf ? ByteArray.__slice(buff, 0, this._length) : buff);
                return this;
            };
            ByteArray.__slice = function (buff, begin, end) {
                var newbuffer;
                try {
                    newbuffer = buff.slice(begin, end);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    if (end == 0) {
                        end = buff.byteLength;
                    }
                    newbuffer = new ArrayBuffer(end - begin);
                    var rb = new Uint8Array(newbuffer);
                    var sb = new Uint8Array(buff, begin, end - begin);
                    rb.set(sb);
                }
                return newbuffer;
            };
            ByteArray.prototype.__setLength = function (v) {
                this._length = ((v) >> 0);
                var byteLength = this._dataView.buffer.byteLength;
                if (v == 0) {
                    this._dataView = new DataView(new ArrayBuffer(0));
                }
                else if (byteLength < v) {
                    if (!this._fixed) {
                        if (byteLength == 0) {
                            v = ((Math.max(ByteArray.ARRAY_BUFFER_LENGTH, v)) >>> 0);
                        }
                        else {
                            while (byteLength < v) {
                                byteLength *= 2;
                            }
                            v = ((byteLength) >>> 0);
                        }
                    }
                    var u8 = new Uint8Array(v);
                    u8.set(new Uint8Array(this._dataView.buffer));
                    this._dataView = new DataView(u8.buffer);
                }
            };
            ByteArray.prototype.__beforeWrite = function (len) {
                if (this._position + len > this._length) {
                    this.__setLength(this._position + len);
                }
            };
            ByteArray.prototype.__fixed = function (value) {
                this._fixed = value;
                return this;
            };
            ByteArray.prototype.__checkTools = function (algorithm) {
                switch (algorithm) {
                    case utils.CompressionAlgorithm.ZLIB:
                    case utils.CompressionAlgorithm.DEFLATE:
                        if (!window.pako) {
                            throw new Error('pako lib is not defined');
                        }
                        break;
                    case utils.CompressionAlgorithm.LZMA:
                        if (!window.LZMA) {
                            throw new Error('lzma lib is not defined');
                        }
                        break;
                    default:
                        throw new Error('invalid algorithm');
                }
                return algorithm;
            };
            ByteArray.prototype.__compress = function (algorithm) {
                var u8Array = new Uint8Array(this._dataView.buffer, 0, this.length);
                switch (this.__checkTools(algorithm)) {
                    case utils.CompressionAlgorithm.ZLIB:
                        u8Array = strict(window.pako.gzip(u8Array), Uint8Array);
                        break;
                    case utils.CompressionAlgorithm.DEFLATE:
                        u8Array = strict(window.pako.deflateRaw(u8Array), Uint8Array);
                        break;
                    case utils.CompressionAlgorithm.LZMA:
                        u8Array = new Uint8Array(window.LZMA.compress(u8Array));
                        break;
                }
                this.__fromArrayBuffer(u8Array.buffer);
            };
            ByteArray.prototype.__uncompress = function (algorithm) {
                try {
                    var u8Array = new Uint8Array(this._dataView.buffer, 0, this.length);
                    switch (this.__checkTools(algorithm)) {
                        case utils.CompressionAlgorithm.ZLIB:
                            u8Array = strict(window.pako.ungzip(u8Array), Uint8Array);
                            break;
                        case utils.CompressionAlgorithm.DEFLATE:
                            u8Array = strict(window.pako.inflateRaw(u8Array), Uint8Array);
                            break;
                        case utils.CompressionAlgorithm.LZMA:
                            u8Array = new Uint8Array(window.LZMA.decompress(u8Array));
                            break;
                    }
                    this.__fromArrayBuffer(u8Array.buffer);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    if (this.length) {
                        throw new utils.IOError('There was an error decompressing the data.', 2058);
                    }
                }
            };
            ByteArray.prototype.__toString = function (offset, length) {
                var p = this._position;
                this._position = ((offset) >> 0);
                var r = this.readUTFBytes(length);
                this._position = ((p) >> 0);
                return r;
            };
            ByteArray.__pool = asc.sti(ByteArray, function () { ByteArray.__pool = new utils.ObjectPool(function () { return new ByteArray; }.__bind(_this), function (b) { b.clear(); }.__bind(_this)); });
            ByteArray.ARRAY_BUFFER_LENGTH = ((1024 * 4) >> 0);
            ByteArray._defaultObjectEncoding = asc.sti(ByteArray, function () { ByteArray._defaultObjectEncoding = utils.ObjectEncoding.DEFAULT; });
            return ByteArray;
        }());
        utils.ByteArray = ByteArray;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ByteArray.js.map