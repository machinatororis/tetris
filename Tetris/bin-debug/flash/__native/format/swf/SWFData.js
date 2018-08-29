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
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                swf.SWFActionValue = flash.__native.format.swf.data.SWFActionValue;
                swf.SWFAsset = flash.__native.format.swf.data.SWFAsset;
                swf.SWFButtonCondAction = flash.__native.format.swf.data.SWFButtonCondAction;
                swf.SWFButtonRecord = flash.__native.format.swf.data.SWFButtonRecord;
                swf.SWFClipActionRecord = flash.__native.format.swf.data.SWFClipActionRecord;
                swf.SWFClipActions = flash.__native.format.swf.data.SWFClipActions;
                swf.SWFClipEventFlags = flash.__native.format.swf.data.SWFClipEventFlags;
                swf.SWFColorTransform = flash.__native.format.swf.data.SWFColorTransform;
                swf.SWFColorTransformWithAlpha = flash.__native.format.swf.data.SWFColorTransformWithAlpha;
                swf.SWFFillStyle = flash.__native.format.swf.data.SWFFillStyle;
                swf.SWFFocalGradient = flash.__native.format.swf.data.SWFFocalGradient;
                swf.SWFGlyphEntry = flash.__native.format.swf.data.SWFGlyphEntry;
                swf.SWFGradient = flash.__native.format.swf.data.SWFGradient;
                swf.SWFGradientRecord = flash.__native.format.swf.data.SWFGradientRecord;
                swf.SWFKerningRecord = flash.__native.format.swf.data.SWFKerningRecord;
                swf.SWFLineStyle = flash.__native.format.swf.data.SWFLineStyle;
                swf.SWFLineStyle2 = flash.__native.format.swf.data.SWFLineStyle2;
                swf.SWFMatrix = flash.__native.format.swf.data.SWFMatrix;
                swf.SWFMorphFillStyle = flash.__native.format.swf.data.SWFMorphFillStyle;
                swf.SWFMorphFocalGradient = flash.__native.format.swf.data.SWFMorphFocalGradient;
                swf.SWFMorphGradient = flash.__native.format.swf.data.SWFMorphGradient;
                swf.SWFMorphGradientRecord = flash.__native.format.swf.data.SWFMorphGradientRecord;
                swf.SWFMorphLineStyle = flash.__native.format.swf.data.SWFMorphLineStyle;
                swf.SWFMorphLineStyle2 = flash.__native.format.swf.data.SWFMorphLineStyle2;
                swf.SWFRawTag = flash.__native.format.swf.data.SWFRawTag;
                swf.SWFRecordHeader = flash.__native.format.swf.data.SWFRecordHeader;
                swf.SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
                swf.SWFRegisterParam = flash.__native.format.swf.data.SWFRegisterParam;
                swf.SWFShape = flash.__native.format.swf.data.SWFShape;
                swf.SWFShapeRecordCurvedEdge = flash.__native.format.swf.data.SWFShapeRecordCurvedEdge;
                swf.SWFShapeRecordStraightEdge = flash.__native.format.swf.data.SWFShapeRecordStraightEdge;
                swf.SWFShapeRecordStyleChange = flash.__native.format.swf.data.SWFShapeRecordStyleChange;
                swf.SWFShapeWithStyle = flash.__native.format.swf.data.SWFShapeWithStyle;
                swf.SWFSoundEnvelope = flash.__native.format.swf.data.SWFSoundEnvelope;
                swf.SWFSoundInfo = flash.__native.format.swf.data.SWFSoundInfo;
                swf.SWFSymbol = flash.__native.format.swf.data.SWFSymbol;
                swf.SWFTextRecord = flash.__native.format.swf.data.SWFTextRecord;
                swf.SWFZoneData = flash.__native.format.swf.data.SWFZoneData;
                swf.SWFZoneRecord = flash.__native.format.swf.data.SWFZoneRecord;
                swf.IAction = flash.__native.format.swf.data.actions.IAction;
                swf.Filter = flash.__native.format.swf.data.filters.Filter;
                swf.IFilter = flash.__native.format.swf.data.filters.IFilter;
                swf.SWFActionFactory = flash.__native.format.swf.factories.SWFActionFactory;
                swf.SWFFilterFactory = flash.__native.format.swf.factories.SWFFilterFactory;
                swf.BitArray = flash.__native.utils.BitArray;
                swf.HalfPrecisionWriter = flash.__native.utils.HalfPrecisionWriter;
                swf.ByteArray = flash.utils.ByteArray;
                swf.Endian = flash.utils.Endian;
                var SWFData = (function (_super) {
                    __extends(SWFData, _super);
                    function SWFData(source, start, end) {
                        if (start === void 0) { start = 0; }
                        if (end === void 0) { end = 0; }
                        var _this = _super.call(this, source, start, end) || this;
                        _this.endian = swf.Endian.LITTLE_ENDIAN;
                        return _this;
                    }
                    SWFData.prototype.readSI8 = function () {
                        this.bitsPending = 0;
                        return this.readByte();
                    };
                    SWFData.prototype.writeSI8 = function (value) {
                        value = ((value) >> 0);
                        this.bitsPending = 0;
                        this.writeByte(value);
                    };
                    SWFData.prototype.readSI16 = function () {
                        this.bitsPending = 0;
                        return this.readShort();
                    };
                    SWFData.prototype.writeSI16 = function (value) {
                        value = ((value) >> 0);
                        this.bitsPending = 0;
                        this.writeShort(value);
                    };
                    SWFData.prototype.readSI32 = function () {
                        this.bitsPending = 0;
                        return this.readInt();
                    };
                    SWFData.prototype.writeSI32 = function (value) {
                        value = ((value) >> 0);
                        this.bitsPending = 0;
                        this.writeInt(value);
                    };
                    SWFData.prototype.readUI8 = function () {
                        this.bitsPending = 0;
                        return this.readUnsignedByte();
                    };
                    SWFData.prototype.writeUI8 = function (value) {
                        value = ((value) >>> 0);
                        this.bitsPending = 0;
                        this.writeByte(value);
                    };
                    SWFData.prototype.readUI16 = function () {
                        this.bitsPending = 0;
                        return this.readUnsignedShort();
                    };
                    SWFData.prototype.writeUI16 = function (value) {
                        value = ((value) >>> 0);
                        this.bitsPending = 0;
                        this.writeShort(value);
                    };
                    SWFData.prototype.readUI24 = function () {
                        this.bitsPending = 0;
                        var loWord = this.readUnsignedShort();
                        var hiByte = this.readUnsignedByte();
                        return (hiByte << 16) | loWord;
                    };
                    SWFData.prototype.writeUI24 = function (value) {
                        value = ((value) >>> 0);
                        this.bitsPending = 0;
                        this.writeShort(value & 0xffff);
                        this.writeByte(value >> 16);
                    };
                    SWFData.prototype.readUI32 = function () {
                        this.bitsPending = 0;
                        return this.readUnsignedInt();
                    };
                    SWFData.prototype.writeUI32 = function (value) {
                        value = ((value) >>> 0);
                        this.bitsPending = 0;
                        this.writeUnsignedInt(value);
                    };
                    SWFData.prototype.readFIXED = function () {
                        this.bitsPending = 0;
                        return this.readInt() / 65536;
                    };
                    SWFData.prototype.writeFIXED = function (value) {
                        value = (+(value));
                        this.bitsPending = 0;
                        this.writeInt(((value * 65536) >> 0));
                    };
                    SWFData.prototype.readFIXED8 = function () {
                        this.bitsPending = 0;
                        return this.readShort() / 256;
                    };
                    SWFData.prototype.writeFIXED8 = function (value) {
                        value = (+(value));
                        this.bitsPending = 0;
                        this.writeShort(((value * 256) >> 0));
                    };
                    SWFData.prototype.readFLOAT = function () {
                        this.bitsPending = 0;
                        return this.readFloat();
                    };
                    SWFData.prototype.writeFLOAT = function (value) {
                        value = (+(value));
                        this.bitsPending = 0;
                        this.writeFloat(value);
                    };
                    SWFData.prototype.readDOUBLE = function () {
                        this.bitsPending = 0;
                        return this.readDouble();
                    };
                    SWFData.prototype.writeDOUBLE = function (value) {
                        value = (+(value));
                        this.bitsPending = 0;
                        this.writeDouble(value);
                    };
                    SWFData.prototype.readFLOAT16 = function () {
                        this.bitsPending = 0;
                        var word = this.readUnsignedShort();
                        var sign = ((word & 0x8000) != 0) ? -1 : 1;
                        var exponent = (((word >> 10) & 0x1f) >>> 0);
                        var significand = ((word & 0x3ff) >>> 0);
                        if (exponent == 0) {
                            if (significand == 0) {
                                return 0;
                            }
                            else {
                                return sign * Math.pow(2, 1 - SWFData.FLOAT16_EXPONENT_BASE) * (significand / 1024);
                            }
                        }
                        if (exponent == 31) {
                            if (significand == 0) {
                                return (sign < 0) ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
                            }
                            else {
                                return Number.NaN;
                            }
                        }
                        return sign * Math.pow(2, exponent - SWFData.FLOAT16_EXPONENT_BASE) * (1 + significand / 1024);
                    };
                    SWFData.prototype.writeFLOAT16 = function (value) {
                        value = (+(value));
                        swf.HalfPrecisionWriter.write(value, this);
                    };
                    SWFData.prototype.readEncodedU32 = function () {
                        this.bitsPending = 0;
                        var result = this.readUnsignedByte();
                        if (result & 0x80) {
                            result = (((result & 0x7f) | (this.readUnsignedByte() << 7)) >>> 0);
                            if (result & 0x4000) {
                                result = (((result & 0x3fff) | (this.readUnsignedByte() << 14)) >>> 0);
                                if (result & 0x200000) {
                                    result = (((result & 0x1fffff) | (this.readUnsignedByte() << 21)) >>> 0);
                                    if (result & 0x10000000) {
                                        result = (((result & 0xfffffff) | (this.readUnsignedByte() << 28)) >>> 0);
                                    }
                                }
                            }
                        }
                        return result;
                    };
                    SWFData.prototype.writeEncodedU32 = function (value) {
                        value = ((value) >>> 0);
                        for (;;) {
                            var v = ((value & 0x7f) >>> 0);
                            if ((value >>= 7) == 0) {
                                this.writeUI8(v);
                                break;
                            }
                            this.writeUI8(v | 0x80);
                        }
                    };
                    SWFData.prototype.readUB = function (bits) {
                        bits = ((bits) >>> 0);
                        return this.readBits(bits);
                    };
                    SWFData.prototype.writeUB = function (bits, value) {
                        bits = ((bits) >>> 0);
                        value = ((value) >>> 0);
                        this.writeBits(bits, value);
                    };
                    SWFData.prototype.readSB = function (bits) {
                        bits = ((bits) >>> 0);
                        var shift = ((32 - bits) >>> 0);
                        return ((this.readBits(bits) << shift) >> 0) >> shift;
                    };
                    SWFData.prototype.writeSB = function (bits, value) {
                        bits = ((bits) >>> 0);
                        value = ((value) >> 0);
                        this.writeBits(bits, value);
                    };
                    SWFData.prototype.readFB = function (bits) {
                        bits = ((bits) >>> 0);
                        return (+(this.readSB(bits))) / 65536;
                    };
                    SWFData.prototype.writeFB = function (bits, value) {
                        bits = ((bits) >>> 0);
                        value = (+(value));
                        this.writeSB(bits, value * 65536);
                    };
                    SWFData.prototype.readString = function () {
                        var index = this.position;
                        while (this.get(index++)) { }
                        this.bitsPending = 0;
                        var utf = this.readUTFBytes(index - this.position), len = utf.length;
                        if (utf.charCodeAt(len - 1) == 0) {
                            return utf.substr(0, len - 1);
                        }
                        return utf;
                    };
                    SWFData.prototype.writeString = function (value) {
                        value = as(value, 'String');
                        if (value && value.length > 0) {
                            this.writeUTFBytes(value);
                        }
                        this.writeByte(0);
                    };
                    SWFData.prototype.readLANGCODE = function () {
                        this.bitsPending = 0;
                        return this.readUnsignedByte();
                    };
                    SWFData.prototype.writeLANGCODE = function (value) {
                        value = ((value) >>> 0);
                        this.bitsPending = 0;
                        this.writeByte(value);
                    };
                    SWFData.prototype.readRGB = function () {
                        this.bitsPending = 0;
                        var r = this.readUnsignedByte();
                        var g = this.readUnsignedByte();
                        var b = this.readUnsignedByte();
                        return 0xff000000 | (r << 16) | (g << 8) | b;
                    };
                    SWFData.prototype.writeRGB = function (value) {
                        value = ((value) >>> 0);
                        this.bitsPending = 0;
                        this.writeByte((value >> 16) & 0xff);
                        this.writeByte((value >> 8) & 0xff);
                        this.writeByte(value & 0xff);
                    };
                    SWFData.prototype.readRGBA = function () {
                        this.bitsPending = 0;
                        var rgb = ((this.readRGB() & 0x00ffffff) >>> 0);
                        var a = this.readUnsignedByte();
                        return a << 24 | rgb;
                    };
                    SWFData.prototype.writeRGBA = function (value) {
                        value = ((value) >>> 0);
                        this.bitsPending = 0;
                        this.writeRGB(value);
                        this.writeByte((value >> 24) & 0xff);
                    };
                    SWFData.prototype.readARGB = function () {
                        this.bitsPending = 0;
                        var a = this.readUnsignedByte();
                        var rgb = ((this.readRGB() & 0x00ffffff) >>> 0);
                        return (a << 24) | rgb;
                    };
                    SWFData.prototype.writeARGB = function (value) {
                        value = ((value) >>> 0);
                        this.bitsPending = 0;
                        this.writeByte((value >> 24) & 0xff);
                        this.writeRGB(value);
                    };
                    SWFData.prototype.readRECT = function () {
                        return new swf.SWFRectangle(this);
                    };
                    SWFData.prototype.writeRECT = function (value) {
                        value = strict(value, swf.SWFRectangle);
                        value.publish(this);
                    };
                    SWFData.prototype.readMATRIX = function () {
                        return new swf.SWFMatrix(this);
                    };
                    SWFData.prototype.writeMATRIX = function (value) {
                        value = strict(value, swf.SWFMatrix);
                        this.bitsPending = 0;
                        var hasScale = (value.scaleX != 1) || (value.scaleY != 1);
                        var hasRotate = (value.rotateSkew0 != 0) || (value.rotateSkew1 != 0);
                        this.writeBits(1, hasScale ? 1 : 0);
                        if (hasScale) {
                            var scaleBits = 0;
                            if (value.scaleX == 0 && value.scaleY == 0) {
                                scaleBits = 1;
                            }
                            else {
                                scaleBits = this.calculateMaxBits(true, [value.scaleX * 65536, value.scaleY * 65536]);
                            }
                            this.writeUB(5, scaleBits);
                            this.writeFB(scaleBits, value.scaleX);
                            this.writeFB(scaleBits, value.scaleY);
                        }
                        this.writeBits(1, hasRotate ? 1 : 0);
                        if (hasRotate) {
                            var rotateBits = this.calculateMaxBits(true, [value.rotateSkew0 * 65536, value.rotateSkew1 * 65536]);
                            this.writeUB(5, rotateBits);
                            this.writeFB(rotateBits, value.rotateSkew0);
                            this.writeFB(rotateBits, value.rotateSkew1);
                        }
                        var translateBits = this.calculateMaxBits(true, [value.translateX, value.translateY]);
                        this.writeUB(5, translateBits);
                        this.writeSB(translateBits, value.translateX);
                        this.writeSB(translateBits, value.translateY);
                    };
                    SWFData.prototype.readCXFORM = function () {
                        return new swf.SWFColorTransform(this);
                    };
                    SWFData.prototype.writeCXFORM = function (value) {
                        value = strict(value, swf.SWFColorTransform);
                        value.publish(this);
                    };
                    SWFData.prototype.readCXFORMWITHALPHA = function () {
                        return new swf.SWFColorTransformWithAlpha(this);
                    };
                    SWFData.prototype.writeCXFORMWITHALPHA = function (value) {
                        value = strict(value, swf.SWFColorTransformWithAlpha);
                        value.publish(this);
                    };
                    SWFData.prototype.readSHAPE = function (unitDivisor) {
                        if (unitDivisor === void 0) { unitDivisor = 20; }
                        unitDivisor = (+(unitDivisor));
                        return new swf.SWFShape(this, 1, unitDivisor);
                    };
                    SWFData.prototype.writeSHAPE = function (value) {
                        value = strict(value, swf.SWFShape);
                        value.publish(this);
                    };
                    SWFData.prototype.readSHAPEWITHSTYLE = function (level, unitDivisor) {
                        if (level === void 0) { level = 1; }
                        if (unitDivisor === void 0) { unitDivisor = 20; }
                        level = ((level) >>> 0);
                        unitDivisor = (+(unitDivisor));
                        return new swf.SWFShapeWithStyle(this, level, unitDivisor);
                    };
                    SWFData.prototype.writeSHAPEWITHSTYLE = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFShapeWithStyle);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readSTRAIGHTEDGERECORD = function (numBits) {
                        numBits = ((numBits) >>> 0);
                        return new swf.SWFShapeRecordStraightEdge(this, numBits);
                    };
                    SWFData.prototype.writeSTRAIGHTEDGERECORD = function (value) {
                        value = strict(value, swf.SWFShapeRecordStraightEdge);
                        value.publish(this);
                    };
                    SWFData.prototype.readCURVEDEDGERECORD = function (numBits) {
                        numBits = ((numBits) >>> 0);
                        return new swf.SWFShapeRecordCurvedEdge(this, numBits);
                    };
                    SWFData.prototype.writeCURVEDEDGERECORD = function (value) {
                        value = strict(value, swf.SWFShapeRecordCurvedEdge);
                        value.publish(this);
                    };
                    SWFData.prototype.readSTYLECHANGERECORD = function (states, fillBits, lineBits, level) {
                        if (level === void 0) { level = 1; }
                        states = ((states) >>> 0);
                        fillBits = ((fillBits) >>> 0);
                        lineBits = ((lineBits) >>> 0);
                        level = ((level) >>> 0);
                        return new swf.SWFShapeRecordStyleChange(this, states, fillBits, lineBits, level);
                    };
                    SWFData.prototype.writeSTYLECHANGERECORD = function (value, fillBits, lineBits, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFShapeRecordStyleChange);
                        fillBits = ((fillBits) >>> 0);
                        lineBits = ((lineBits) >>> 0);
                        level = ((level) >>> 0);
                        value.numFillBits = fillBits;
                        value.numLineBits = lineBits;
                        value.publish(this, level);
                    };
                    SWFData.prototype.readFILLSTYLE = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        return new swf.SWFFillStyle(this, level);
                    };
                    SWFData.prototype.writeFILLSTYLE = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFFillStyle);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readLINESTYLE = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        return new swf.SWFLineStyle(this, level);
                    };
                    SWFData.prototype.writeLINESTYLE = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFLineStyle);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readLINESTYLE2 = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        return new swf.SWFLineStyle2(this, level);
                    };
                    SWFData.prototype.writeLINESTYLE2 = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFLineStyle2);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readBUTTONRECORD = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        if (this.readUI8() == 0) {
                            return null;
                        }
                        else {
                            this.position--;
                            return new swf.SWFButtonRecord(this, level);
                        }
                    };
                    SWFData.prototype.writeBUTTONRECORD = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFButtonRecord);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readBUTTONCONDACTION = function () {
                        return new swf.SWFButtonCondAction(this);
                    };
                    SWFData.prototype.writeBUTTONCONDACTION = function (value) {
                        value = strict(value, swf.SWFButtonCondAction);
                        value.publish(this);
                    };
                    SWFData.prototype.readFILTER = function () {
                        var filterId = this.readUI8();
                        var filter = swf.SWFFilterFactory.create(filterId);
                        filter.parse(this);
                        return filter;
                    };
                    SWFData.prototype.writeFILTER = function (value) {
                        value = strict(value, 'implements_flash___native_format_swf_data_filters_IFilter');
                        this.writeUI8(value.id);
                        value.publish(this);
                    };
                    SWFData.prototype.readTEXTRECORD = function (glyphBits, advanceBits, previousRecord, level) {
                        if (previousRecord === void 0) { previousRecord = null; }
                        if (level === void 0) { level = 1; }
                        glyphBits = ((glyphBits) >>> 0);
                        advanceBits = ((advanceBits) >>> 0);
                        previousRecord = strict(previousRecord, swf.SWFTextRecord);
                        level = ((level) >>> 0);
                        if (this.readUI8() == 0) {
                            return null;
                        }
                        else {
                            this.position--;
                            return new swf.SWFTextRecord(this, glyphBits, advanceBits, previousRecord, level);
                        }
                    };
                    SWFData.prototype.writeTEXTRECORD = function (value, glyphBits, advanceBits, previousRecord, level) {
                        if (previousRecord === void 0) { previousRecord = null; }
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFTextRecord);
                        glyphBits = ((glyphBits) >>> 0);
                        advanceBits = ((advanceBits) >>> 0);
                        previousRecord = strict(previousRecord, swf.SWFTextRecord);
                        level = ((level) >>> 0);
                        value.publish(this, glyphBits, advanceBits, previousRecord, level);
                    };
                    SWFData.prototype.readGLYPHENTRY = function (glyphBits, advanceBits) {
                        glyphBits = ((glyphBits) >>> 0);
                        advanceBits = ((advanceBits) >>> 0);
                        return new swf.SWFGlyphEntry(this, glyphBits, advanceBits);
                    };
                    SWFData.prototype.writeGLYPHENTRY = function (value, glyphBits, advanceBits) {
                        value = strict(value, swf.SWFGlyphEntry);
                        glyphBits = ((glyphBits) >>> 0);
                        advanceBits = ((advanceBits) >>> 0);
                        value.publish(this, glyphBits, advanceBits);
                    };
                    SWFData.prototype.readZONERECORD = function () {
                        return new swf.SWFZoneRecord(this);
                    };
                    SWFData.prototype.writeZONERECORD = function (value) {
                        value = strict(value, swf.SWFZoneRecord);
                        value.publish(this);
                    };
                    SWFData.prototype.readZONEDATA = function () {
                        return new swf.SWFZoneData(this);
                    };
                    SWFData.prototype.writeZONEDATA = function (value) {
                        value = strict(value, swf.SWFZoneData);
                        value.publish(this);
                    };
                    SWFData.prototype.readKERNINGRECORD = function (wideCodes) {
                        wideCodes = Boolean(wideCodes);
                        return new swf.SWFKerningRecord(this, wideCodes);
                    };
                    SWFData.prototype.writeKERNINGRECORD = function (value, wideCodes) {
                        value = strict(value, swf.SWFKerningRecord);
                        wideCodes = Boolean(wideCodes);
                        value.publish(this, wideCodes);
                    };
                    SWFData.prototype.readGRADIENT = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        return new swf.SWFGradient(this, level);
                    };
                    SWFData.prototype.writeGRADIENT = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFGradient);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readFOCALGRADIENT = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        return new swf.SWFFocalGradient(this, level);
                    };
                    SWFData.prototype.writeFOCALGRADIENT = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFFocalGradient);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readGRADIENTRECORD = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        return new swf.SWFGradientRecord(this, level);
                    };
                    SWFData.prototype.writeGRADIENTRECORD = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFGradientRecord);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readMORPHFILLSTYLE = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        return new swf.SWFMorphFillStyle(this, level);
                    };
                    SWFData.prototype.writeMORPHFILLSTYLE = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFMorphFillStyle);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readMORPHLINESTYLE = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        return new swf.SWFMorphLineStyle(this, level);
                    };
                    SWFData.prototype.writeMORPHLINESTYLE = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFMorphLineStyle);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readMORPHLINESTYLE2 = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        return new swf.SWFMorphLineStyle2(this, level);
                    };
                    SWFData.prototype.writeMORPHLINESTYLE2 = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFMorphLineStyle2);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readMORPHGRADIENT = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        return new swf.SWFMorphGradient(this, level);
                    };
                    SWFData.prototype.writeMORPHGRADIENT = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFMorphGradient);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readMORPHFOCALGRADIENT = function (level) {
                        if (level === void 0) { level = 1; }
                        level = ((level) >>> 0);
                        return new swf.SWFMorphFocalGradient(this, level);
                    };
                    SWFData.prototype.writeMORPHFOCALGRADIENT = function (value, level) {
                        if (level === void 0) { level = 1; }
                        value = strict(value, swf.SWFMorphFocalGradient);
                        level = ((level) >>> 0);
                        value.publish(this, level);
                    };
                    SWFData.prototype.readMORPHGRADIENTRECORD = function () {
                        return new swf.SWFMorphGradientRecord(this);
                    };
                    SWFData.prototype.writeMORPHGRADIENTRECORD = function (value) {
                        value = strict(value, swf.SWFMorphGradientRecord);
                        value.publish(this);
                    };
                    SWFData.prototype.readACTIONRECORD = function () {
                        var pos = this.position;
                        var action;
                        var actionCode = this.readUI8();
                        if (actionCode != 0) {
                            var actionLength = (actionCode >= 0x80) ? this.readUI16() : 0;
                            action = swf.SWFActionFactory.create(actionCode, actionLength, pos);
                            action.parse(this);
                        }
                        return action;
                    };
                    SWFData.prototype.writeACTIONRECORD = function (action) {
                        action = strict(action, 'implements_flash___native_format_swf_data_actions_IAction');
                        action.publish(this);
                    };
                    SWFData.prototype.readACTIONVALUE = function () {
                        return new swf.SWFActionValue(this);
                    };
                    SWFData.prototype.writeACTIONVALUE = function (value) {
                        value = strict(value, swf.SWFActionValue);
                        value.publish(this);
                    };
                    SWFData.prototype.readREGISTERPARAM = function () {
                        return new swf.SWFRegisterParam(this);
                    };
                    SWFData.prototype.writeREGISTERPARAM = function (value) {
                        value = strict(value, swf.SWFRegisterParam);
                        value.publish(this);
                    };
                    SWFData.prototype.readASSET = function () {
                        return new swf.SWFAsset(this);
                    };
                    SWFData.prototype.writeASSET = function (value) {
                        value = strict(value, swf.SWFAsset);
                        value.publish(this);
                    };
                    SWFData.prototype.readSYMBOL = function () {
                        return new swf.SWFSymbol(this);
                    };
                    SWFData.prototype.writeSYMBOL = function (value) {
                        value = strict(value, swf.SWFSymbol);
                        value.publish(this);
                    };
                    SWFData.prototype.readSOUNDINFO = function () {
                        return new swf.SWFSoundInfo(this);
                    };
                    SWFData.prototype.writeSOUNDINFO = function (value) {
                        value = strict(value, swf.SWFSoundInfo);
                        value.publish(this);
                    };
                    SWFData.prototype.readSOUNDENVELOPE = function () {
                        return new swf.SWFSoundEnvelope(this);
                    };
                    SWFData.prototype.writeSOUNDENVELOPE = function (value) {
                        value = strict(value, swf.SWFSoundEnvelope);
                        value.publish(this);
                    };
                    SWFData.prototype.readCLIPACTIONS = function (version) {
                        version = ((version) >>> 0);
                        return new swf.SWFClipActions(this, version);
                    };
                    SWFData.prototype.writeCLIPACTIONS = function (value, version) {
                        value = strict(value, swf.SWFClipActions);
                        version = ((version) >>> 0);
                        value.publish(this, version);
                    };
                    SWFData.prototype.readCLIPACTIONRECORD = function (version) {
                        version = ((version) >>> 0);
                        var pos = this.position;
                        var flags = (version >= 6) ? this.readUI32() : this.readUI16();
                        if (flags == 0) {
                            return null;
                        }
                        else {
                            this.position = pos;
                            return new swf.SWFClipActionRecord(this, version);
                        }
                    };
                    SWFData.prototype.writeCLIPACTIONRECORD = function (value, version) {
                        value = strict(value, swf.SWFClipActionRecord);
                        version = ((version) >>> 0);
                        value.publish(this, version);
                    };
                    SWFData.prototype.readCLIPEVENTFLAGS = function (version) {
                        version = ((version) >>> 0);
                        return new swf.SWFClipEventFlags(this, version);
                    };
                    SWFData.prototype.writeCLIPEVENTFLAGS = function (value, version) {
                        value = strict(value, swf.SWFClipEventFlags);
                        version = ((version) >>> 0);
                        value.publish(this, version);
                    };
                    SWFData.prototype.readTagHeader = function () {
                        var pos = this.position;
                        var tagTypeAndLength = this.readUI16();
                        var tagLength = ((tagTypeAndLength & 0x003f) >>> 0);
                        if (tagLength == 0x3f) {
                            tagLength = ((this.readSI32()) >>> 0);
                        }
                        return new swf.SWFRecordHeader(tagTypeAndLength >> 6, tagLength, this.position - pos);
                    };
                    SWFData.prototype.writeTagHeader = function (type, length, forceLongHeader) {
                        if (forceLongHeader === void 0) { forceLongHeader = false; }
                        type = ((type) >>> 0);
                        length = ((length) >>> 0);
                        forceLongHeader = Boolean(forceLongHeader);
                        if (length < 0x3f && !forceLongHeader) {
                            this.writeUI16((type << 6) | length);
                        }
                        else {
                            this.writeUI16((type << 6) | 0x3f);
                            this.writeSI32(length);
                        }
                    };
                    SWFData.prototype.swfUncompress = function (compressionMethod, uncompressedLength) {
                        if (uncompressedLength === void 0) { uncompressedLength = 0; }
                        compressionMethod = as(compressionMethod, 'String');
                        uncompressedLength = ((uncompressedLength) >>> 0);
                        var pos = this.position;
                        var ba = new swf.ByteArray();
                        if (compressionMethod == swf.SWF.COMPRESSION_METHOD_ZLIB) {
                            this.readBytes(ba);
                            ba.position = 0;
                            ba.uncompress();
                        }
                        else if (compressionMethod == swf.SWF.COMPRESSION_METHOD_LZMA) {
                            for (var i = 0; i < 5; i++) {
                                ba.writeByte(this.get(i + 12));
                            }
                            ba.endian = swf.Endian.LITTLE_ENDIAN;
                            ba.writeUnsignedInt(uncompressedLength - 8);
                            ba.writeUnsignedInt(0);
                            this.position = 17;
                            this.readBytes(ba, 13);
                            ba.position = 0;
                            ba.uncompress(compressionMethod);
                        }
                        else {
                            throw (new Error("Unknown compression method: " + compressionMethod));
                        }
                        this.length = this.position = pos;
                        this.writeBytes(ba);
                        this.position = pos;
                    };
                    SWFData.prototype.fromArray = function (array, colons) {
                        if (colons === void 0) { colons = false; }
                        array = strict(array, swf.ByteArray);
                        colons = Boolean(colons);
                        var s = "";
                        for (var i = 0, len = array.length; i < len; i++) {
                            s += ("0" + array.get(i).toString(16)).substr(-2, 2);
                            if (colons) {
                                if (i < array.length - 1)
                                    s += ":";
                            }
                        }
                        return s;
                    };
                    SWFData.prototype.swfCompress = function (compressionMethod) {
                        compressionMethod = as(compressionMethod, 'String');
                        var pos = this.position;
                        var ba = new swf.ByteArray();
                        if (compressionMethod == swf.SWF.COMPRESSION_METHOD_ZLIB) {
                            this.readBytes(ba);
                            ba.position = 0;
                            ba.compress();
                        }
                        else if (compressionMethod == swf.SWF.COMPRESSION_METHOD_LZMA) {
                            throw (new Error("Can't publish LZMA compressed SWFs"));
                            var lzma = new swf.ByteArray();
                            this.readBytes(lzma);
                            lzma.position = 0;
                            lzma.compress(compressionMethod);
                            ba.endian = swf.Endian.LITTLE_ENDIAN;
                            ba.writeUnsignedInt(lzma.length - 13);
                            for (var i = 0; i < 5; i++) {
                                ba.writeByte(lzma.get(i));
                            }
                            ba.writeBytes(lzma, 13);
                        }
                        else {
                            throw (new Error("Unknown compression method: " + compressionMethod));
                        }
                        this.length = this.position = pos;
                        this.writeBytes(ba);
                    };
                    SWFData.prototype.readRawTag = function () {
                        return new swf.SWFRawTag(this);
                    };
                    SWFData.prototype.skipBytes = function (length) {
                        length = ((length) >>> 0);
                        this.position += length;
                    };
                    SWFData.dump = function (ba, length, offset) {
                        if (offset === void 0) { offset = 0; }
                        ba = strict(ba, swf.ByteArray);
                        length = ((length) >>> 0);
                        offset = ((offset) >> 0);
                        var posOrig = ba.position;
                        var pos = ba.position = ((Math.min(Math.max(posOrig + offset, 0), ba.length - length)) >>> 0);
                        var str = "[Dump] total length: " + ba.length + ", original position: " + posOrig;
                        for (var i = 0; i < length; i++) {
                            var b = ba.readUnsignedByte().toString(16);
                            if (b.length == 1) {
                                b = "0" + b;
                            }
                            if (i % 16 == 0) {
                                var addr = as((pos + i).toString(16), 'String');
                                addr = "00000000".substr(0, 8 - addr.length) + addr;
                                str += "\r" + addr + ": ";
                            }
                            b += " ";
                            str += b;
                        }
                        ba.position = posOrig;
                        trace(str);
                    };
                    SWFData.FLOAT16_EXPONENT_BASE = 15;
                    return SWFData;
                }(swf.BitArray));
                swf.SWFData = SWFData;
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFData.js.map