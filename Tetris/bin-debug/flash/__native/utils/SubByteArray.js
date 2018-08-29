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
    var __native;
    (function (__native) {
        var utils;
        (function (utils) {
            utils.ByteArray = flash.utils.ByteArray;
            var SubByteArray = (function (_super) {
                __extends(SubByteArray, _super);
                function SubByteArray(array, start, end) {
                    if (start === void 0) { start = 0; }
                    if (end === void 0) { end = 0; }
                    var _this = this;
                    _this._start === void 0 && (_this._start = 0);
                    _this._end === void 0 && (_this._end = 0);
                    if (!array) {
                        _this = _super.call(this) || this;
                        return;
                    }
                    _this = _super.call(this, false) || this;
                    _this._array = array;
                    _this._start = start;
                    _this._end = end;
                    _this._length = ((_this._end - _this._start) >> 0);
                    _this._fixed = true;
                    return _this;
                }
                SubByteArray.prototype.get = function (index) {
                    index = ((index) >> 0);
                    if (!this._array) {
                        return _super.prototype.get.call(this, index);
                    }
                    return this._array.get(this._start + index);
                };
                SubByteArray.prototype.set = function (index, v) {
                    index = ((index) >> 0);
                    v = ((v) >> 0);
                    if (!this._array) {
                        _super.prototype.set.call(this, index, v);
                        return;
                    }
                    this._array.set(this._start + index, v);
                };
                SubByteArray.prototype.readBytes = function (b, offset, length) {
                    if (offset === void 0) { offset = 0; }
                    if (length === void 0) { length = 0; }
                    b = strict(b, utils.ByteArray);
                    offset = ((offset) >>> 0);
                    length = ((length) >>> 0);
                    if (!this._array) {
                        _super.prototype.readBytes.call(this, b, offset, length);
                        return;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    this._array.readBytes(b, offset, length);
                    this._array._position = ((p) >> 0);
                };
                SubByteArray.prototype.writeBytes = function (bytes, offset, length) {
                    if (offset === void 0) { offset = 0; }
                    if (length === void 0) { length = 0; }
                    bytes = strict(bytes, utils.ByteArray);
                    offset = ((offset) >>> 0);
                    length = ((length) >>> 0);
                    if (!this._array) {
                        _super.prototype.writeBytes.call(this, bytes, offset, length);
                        return;
                    }
                    if (this._position == this._length) {
                        return;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    this._array.writeBytes(bytes, offset, length);
                    this._position += p - this._array._position;
                    this._array._position = ((p) >> 0);
                };
                SubByteArray.prototype.writeBoolean = function (v) {
                    v = Boolean(v);
                    if (!this._array) {
                        _super.prototype.writeBoolean.call(this, v);
                        return;
                    }
                    if (this._position == this._length) {
                        return;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    this._array.writeBoolean(v);
                    this._position++;
                    this._array._position = ((p) >> 0);
                };
                SubByteArray.prototype.writeByte = function (v) {
                    v = ((v) >> 0);
                    if (!this._array) {
                        _super.prototype.writeByte.call(this, v);
                        return;
                    }
                    if (this._position == this._length) {
                        return;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    this._array.writeByte(v);
                    this._position++;
                    this._array._position = ((p) >> 0);
                };
                SubByteArray.prototype.writeShort = function (v) {
                    v = ((v) >> 0);
                    if (!this._array) {
                        _super.prototype.writeShort.call(this, v);
                        return;
                    }
                    if (this._position == this._length) {
                        return;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    this._array.writeShort(v);
                    this._position += 2;
                    this._array._position = ((p) >> 0);
                };
                SubByteArray.prototype.writeInt = function (v) {
                    v = ((v) >> 0);
                    if (!this._array) {
                        _super.prototype.writeInt.call(this, v);
                        return;
                    }
                    if (this._position == this._length) {
                        return;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    this._array.writeInt(v);
                    this._position += 4;
                    this._array._position = ((p) >> 0);
                };
                SubByteArray.prototype.writeUnsignedInt = function (v) {
                    v = ((v) >>> 0);
                    if (!this._array) {
                        _super.prototype.writeUnsignedInt.call(this, v);
                        return;
                    }
                    if (this._position == this._length) {
                        return;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    this._array.writeUnsignedInt(v);
                    this._position += 4;
                    this._array._position = ((p) >> 0);
                };
                SubByteArray.prototype.writeFloat = function (v) {
                    v = (+(v));
                    if (!this._array) {
                        _super.prototype.writeFloat.call(this, v);
                        return;
                    }
                    if (this._position == this._length) {
                        return;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    this._array.writeFloat(v);
                    this._position += 4;
                    this._array._position = ((p) >> 0);
                };
                SubByteArray.prototype.writeDouble = function (v) {
                    v = (+(v));
                    if (!this._array) {
                        _super.prototype.writeDouble.call(this, v);
                        return;
                    }
                    if (this._position == this._length) {
                        return;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    this._array.writeDouble(v);
                    this._position += 8;
                    this._array._position = ((p) >> 0);
                };
                SubByteArray.prototype.writeMultiByte = function (str, charSet) {
                    str = as(str, 'String');
                    charSet = as(charSet, 'String');
                    if (!this._array) {
                        _super.prototype.writeMultiByte.call(this, str, charSet);
                        return;
                    }
                    if (this._position == this._length) {
                        return;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    this._array.writeMultiByte(str, charSet);
                    this._position += p - this._array._position;
                    this._array._position = ((p) >> 0);
                };
                SubByteArray.prototype.writeUTF = function (v) {
                    v = as(v, 'String');
                    if (!this._array) {
                        _super.prototype.writeUTF.call(this, v);
                        return;
                    }
                    if (this._position == this._length) {
                        return;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    this._array.writeUTF(v);
                    this._position += p - this._array._position;
                    this._array._position = ((p) >> 0);
                };
                SubByteArray.prototype.readBoolean = function () {
                    if (!this._array) {
                        return _super.prototype.readBoolean.call(this);
                    }
                    if (this._position == this._length) {
                        return false;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    var r = this._array.readBoolean();
                    this._position++;
                    this._array._position = ((p) >> 0);
                    return r;
                };
                SubByteArray.prototype.readByte = function () {
                    if (!this._array) {
                        return _super.prototype.readByte.call(this);
                    }
                    if (this._position == this._length) {
                        return 0;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    var r = this._array.readByte();
                    this._position++;
                    this._array._position = ((p) >> 0);
                    return r;
                };
                SubByteArray.prototype.readUnsignedByte = function () {
                    if (!this._array) {
                        return _super.prototype.readUnsignedByte.call(this);
                    }
                    if (this._position == this._length) {
                        return 0;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    var r = this._array.readUnsignedByte();
                    this._position++;
                    this._array._position = ((p) >> 0);
                    return r;
                };
                SubByteArray.prototype.readShort = function () {
                    if (!this._array) {
                        return _super.prototype.readShort.call(this);
                    }
                    if (this._position == this._length) {
                        return 0;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    var r = this._array.readShort();
                    this._position += 2;
                    this._array._position = ((p) >> 0);
                    return r;
                };
                SubByteArray.prototype.readUnsignedShort = function () {
                    if (!this._array) {
                        return _super.prototype.readUnsignedShort.call(this);
                    }
                    if (this._position == this._length) {
                        return 0;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    var r = this._array.readUnsignedShort();
                    this._position += 2;
                    this._array._position = ((p) >> 0);
                    return r;
                };
                SubByteArray.prototype.readInt = function () {
                    if (!this._array) {
                        return _super.prototype.readInt.call(this);
                    }
                    if (this._position == this._length) {
                        return 0;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    var r = this._array.readInt();
                    this._position += 4;
                    this._array._position = ((p) >> 0);
                    return r;
                };
                SubByteArray.prototype.readUnsignedInt = function () {
                    if (!this._array) {
                        return _super.prototype.readUnsignedInt.call(this);
                    }
                    if (this._position == this._length) {
                        return 0;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    var r = this._array.readUnsignedInt();
                    this._position += 4;
                    this._array._position = ((p) >> 0);
                    return r;
                };
                SubByteArray.prototype.readFloat = function () {
                    if (!this._array) {
                        return _super.prototype.readFloat.call(this);
                    }
                    if (this._position == this._length) {
                        return 0;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    var r = this._array.readFloat();
                    this._position += 4;
                    this._array._position = ((p) >> 0);
                    return r;
                };
                SubByteArray.prototype.readDouble = function () {
                    if (!this._array) {
                        return _super.prototype.readDouble.call(this);
                    }
                    if (this._position == this._length) {
                        return 0;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    var r = this._array.readDouble();
                    this._position += 8;
                    this._array._position = ((p) >> 0);
                    return r;
                };
                SubByteArray.prototype.readMultiByte = function (length, charSet) {
                    length = ((length) >>> 0);
                    charSet = as(charSet, 'String');
                    if (!this._array) {
                        return _super.prototype.readMultiByte.call(this, length, charSet);
                    }
                    if (this._position == this._length) {
                        return null;
                    }
                    var p = this._array._position;
                    this._array._position = ((this._start + this._position) >> 0);
                    var r = this._array.readMultiByte(length, charSet);
                    this._position += p - this._array._position;
                    this._array._position = ((p) >> 0);
                    return r;
                };
                SubByteArray.prototype.writeObject = function (object) {
                    if (!this._array) {
                        _super.prototype.writeObject.call(this, object);
                        return;
                    }
                    throw new Error('Not supported');
                };
                SubByteArray.prototype.readObject = function () {
                    if (!this._array) {
                        return _super.prototype.readObject.call(this);
                    }
                    throw new Error('Not supported');
                };
                SubByteArray.prototype.toString = function () {
                    if (!this._array) {
                        return _super.prototype.toString.call(this);
                    }
                    return this.__toString(this._start, this._length);
                };
                SubByteArray.prototype.clear = function () {
                    if (!this._array) {
                        _super.prototype.clear.call(this);
                        return;
                    }
                    this._position = 0;
                    new Uint8Array(this._array._dataView.buffer).fill(0, this._start, this._end);
                };
                Object.defineProperty(SubByteArray.prototype, "buffer", {
                    get: function () {
                        if (!this._array) {
                            return this.super('flash.utils.ByteArray', 'buffer')();
                        }
                        return utils.ByteArray.__slice(this._array._dataView.buffer, this._start, this._end);
                    },
                    enumerable: true,
                    configurable: true
                });
                SubByteArray.prototype.__fromByteArray = function (bytes, copyOf) {
                    if (copyOf === void 0) { copyOf = false; }
                    if (!this._array) {
                        return _super.prototype.__fromByteArray.call(this, bytes, copyOf);
                    }
                    throw new Error('Not supported');
                };
                SubByteArray.prototype.__fromArrayBuffer = function (buff, copyOf) {
                    if (copyOf === void 0) { copyOf = false; }
                    if (!this._array) {
                        return _super.prototype.__fromArrayBuffer.call(this, buff, copyOf);
                    }
                    throw new Error('Not supported');
                };
                SubByteArray.prototype.__setLength = function (v) {
                    if (!this._array) {
                        _super.prototype.__setLength.call(this, v);
                        return;
                    }
                    if (v > this._length) {
                        throw new RangeError;
                    }
                    this._end = ((this._start + v) >>> 0);
                    this._length = ((this._end - this._start) >> 0);
                    if (this._position > this._length) {
                        this._position = this._length;
                    }
                };
                SubByteArray.prototype.__beforeWrite = function (len) {
                    if (!this._array) {
                        _super.prototype.__beforeWrite.call(this, len);
                        return;
                    }
                };
                SubByteArray.prototype.__fixed = function (value) {
                    if (!this._array) {
                        _super.prototype.__fixed.call(this, value);
                        return;
                    }
                    return this;
                };
                SubByteArray.prototype.__compress = function (algorithm) {
                    if (!this._array) {
                        _super.prototype.__compress.call(this, algorithm);
                        return;
                    }
                    throw new Error('Not supported');
                };
                SubByteArray.prototype.__uncompress = function (algorithm) {
                    if (!this._array) {
                        _super.prototype.__uncompress.call(this, algorithm);
                        return;
                    }
                    throw new Error('Not supported');
                };
                return SubByteArray;
            }(utils.ByteArray));
            utils.SubByteArray = SubByteArray;
        })(utils = __native.utils || (__native.utils = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SubByteArray.js.map