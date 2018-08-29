/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../utils/Endian.ts" />
/// <reference path="../../../utils/ByteArray.ts" />
/// <reference path="../../utils/HalfPrecisionWriter.ts" />
/// <reference path="../../utils/BitArray.ts" />
/// <reference path="factories/SWFFilterFactory.ts" />
/// <reference path="factories/SWFActionFactory.ts" />
/// <reference path="data/filters/IFilter.ts" />
/// <reference path="data/filters/Filter.ts" />
/// <reference path="data/actions/IAction.ts" />
/// <reference path="data/SWFZoneRecord.ts" />
/// <reference path="data/SWFZoneData.ts" />
/// <reference path="data/SWFTextRecord.ts" />
/// <reference path="data/SWFSymbol.ts" />
/// <reference path="data/SWFSoundInfo.ts" />
/// <reference path="data/SWFSoundEnvelope.ts" />
/// <reference path="data/SWFShapeWithStyle.ts" />
/// <reference path="data/SWFShapeRecordStyleChange.ts" />
/// <reference path="data/SWFShapeRecordStraightEdge.ts" />
/// <reference path="data/SWFShapeRecordCurvedEdge.ts" />
/// <reference path="data/SWFShape.ts" />
/// <reference path="data/SWFRegisterParam.ts" />
/// <reference path="data/SWFRectangle.ts" />
/// <reference path="data/SWFRecordHeader.ts" />
/// <reference path="data/SWFRawTag.ts" />
/// <reference path="data/SWFMorphLineStyle2.ts" />
/// <reference path="data/SWFMorphLineStyle.ts" />
/// <reference path="data/SWFMorphGradientRecord.ts" />
/// <reference path="data/SWFMorphGradient.ts" />
/// <reference path="data/SWFMorphFocalGradient.ts" />
/// <reference path="data/SWFMorphFillStyle.ts" />
/// <reference path="data/SWFMatrix.ts" />
/// <reference path="data/SWFLineStyle2.ts" />
/// <reference path="data/SWFLineStyle.ts" />
/// <reference path="data/SWFKerningRecord.ts" />
/// <reference path="data/SWFGradientRecord.ts" />
/// <reference path="data/SWFGradient.ts" />
/// <reference path="data/SWFGlyphEntry.ts" />
/// <reference path="data/SWFFocalGradient.ts" />
/// <reference path="data/SWFFillStyle.ts" />
/// <reference path="data/SWFColorTransformWithAlpha.ts" />
/// <reference path="data/SWFColorTransform.ts" />
/// <reference path="data/SWFClipEventFlags.ts" />
/// <reference path="data/SWFClipActions.ts" />
/// <reference path="data/SWFClipActionRecord.ts" />
/// <reference path="data/SWFButtonRecord.ts" />
/// <reference path="data/SWFButtonCondAction.ts" />
/// <reference path="data/SWFAsset.ts" />
/// <reference path="data/SWFActionValue.ts" />
﻿
namespace flash.__native.format.swf
{
	export import SWFActionValue = flash.__native.format.swf.data.SWFActionValue;
	export import SWFAsset = flash.__native.format.swf.data.SWFAsset;
	export import SWFButtonCondAction = flash.__native.format.swf.data.SWFButtonCondAction;
	export import SWFButtonRecord = flash.__native.format.swf.data.SWFButtonRecord;
	export import SWFClipActionRecord = flash.__native.format.swf.data.SWFClipActionRecord;
	export import SWFClipActions = flash.__native.format.swf.data.SWFClipActions;
	export import SWFClipEventFlags = flash.__native.format.swf.data.SWFClipEventFlags;
	export import SWFColorTransform = flash.__native.format.swf.data.SWFColorTransform;
	export import SWFColorTransformWithAlpha = flash.__native.format.swf.data.SWFColorTransformWithAlpha;
	export import SWFFillStyle = flash.__native.format.swf.data.SWFFillStyle;
	export import SWFFocalGradient = flash.__native.format.swf.data.SWFFocalGradient;
	export import SWFGlyphEntry = flash.__native.format.swf.data.SWFGlyphEntry;
	export import SWFGradient = flash.__native.format.swf.data.SWFGradient;
	export import SWFGradientRecord = flash.__native.format.swf.data.SWFGradientRecord;
	export import SWFKerningRecord = flash.__native.format.swf.data.SWFKerningRecord;
	export import SWFLineStyle = flash.__native.format.swf.data.SWFLineStyle;
	export import SWFLineStyle2 = flash.__native.format.swf.data.SWFLineStyle2;
	export import SWFMatrix = flash.__native.format.swf.data.SWFMatrix;
	export import SWFMorphFillStyle = flash.__native.format.swf.data.SWFMorphFillStyle;
	export import SWFMorphFocalGradient = flash.__native.format.swf.data.SWFMorphFocalGradient;
	export import SWFMorphGradient = flash.__native.format.swf.data.SWFMorphGradient;
	export import SWFMorphGradientRecord = flash.__native.format.swf.data.SWFMorphGradientRecord;
	export import SWFMorphLineStyle = flash.__native.format.swf.data.SWFMorphLineStyle;
	export import SWFMorphLineStyle2 = flash.__native.format.swf.data.SWFMorphLineStyle2;
	export import SWFRawTag = flash.__native.format.swf.data.SWFRawTag;
	export import SWFRecordHeader = flash.__native.format.swf.data.SWFRecordHeader;
	export import SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
	export import SWFRegisterParam = flash.__native.format.swf.data.SWFRegisterParam;
	export import SWFShape = flash.__native.format.swf.data.SWFShape;
	export import SWFShapeRecordCurvedEdge = flash.__native.format.swf.data.SWFShapeRecordCurvedEdge;
	export import SWFShapeRecordStraightEdge = flash.__native.format.swf.data.SWFShapeRecordStraightEdge;
	export import SWFShapeRecordStyleChange = flash.__native.format.swf.data.SWFShapeRecordStyleChange;
	export import SWFShapeWithStyle = flash.__native.format.swf.data.SWFShapeWithStyle;
	export import SWFSoundEnvelope = flash.__native.format.swf.data.SWFSoundEnvelope;
	export import SWFSoundInfo = flash.__native.format.swf.data.SWFSoundInfo;
	export import SWFSymbol = flash.__native.format.swf.data.SWFSymbol;
	export import SWFTextRecord = flash.__native.format.swf.data.SWFTextRecord;
	export import SWFZoneData = flash.__native.format.swf.data.SWFZoneData;
	export import SWFZoneRecord = flash.__native.format.swf.data.SWFZoneRecord;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	export import Filter = flash.__native.format.swf.data.filters.Filter;
	export import IFilter = flash.__native.format.swf.data.filters.IFilter;
	export import SWFActionFactory = flash.__native.format.swf.factories.SWFActionFactory;
	export import SWFFilterFactory = flash.__native.format.swf.factories.SWFFilterFactory;
	export import BitArray = flash.__native.utils.BitArray;
	export import HalfPrecisionWriter = flash.__native.utils.HalfPrecisionWriter;
	export import ByteArray = flash.utils.ByteArray;
	export import Endian = flash.utils.Endian;
	
	
	export  class SWFData extends BitArray
	{
		public static FLOAT16_EXPONENT_BASE : number = 15;
		
		/*[internal]*/ public hash : string;
		/*[internal]*/ public root : SWFTimelineContainer;
		
		/**
		 * Constructor 
		 * 
		 */		
		/*[internal]*/ constructor (source : SWFData, start : number = 0, end : number = 0)
		{
			// source = strict(source, SWFData); start = ((start) >>> 0); end = ((end) >>> 0);
			super (source, start, end);
			this.endian = Endian.LITTLE_ENDIAN;
		}

		/////////////////////////////////////////////////////////
		// Integers
		/////////////////////////////////////////////////////////
		
		public readSI8():number {
			this.bitsPending = 0;
			return this.readByte();
		}
		
		public writeSI8(value:number):void {
			/**/ value = ((value) >> 0);
			this.bitsPending = 0;
			this.writeByte(value);
		}

		public readSI16():number {
			this.bitsPending = 0;
			return this.readShort();
		}
		
		public writeSI16(value:number):void {
			/**/ value = ((value) >> 0);
			this.bitsPending = 0;
			this.writeShort(value);
		}

		public readSI32():number {
			this.bitsPending = 0;
			return this.readInt();
		}
		
		public writeSI32(value:number):void {
			/**/ value = ((value) >> 0);
			this.bitsPending = 0;
			this.writeInt(value);
		}

		public readUI8():number {
			this.bitsPending = 0;
			return this.readUnsignedByte();
		}
		
		public writeUI8(value:number):void {
			/**/ value = ((value) >>> 0);
			this.bitsPending = 0;
			this.writeByte(value);
		}

		public readUI16():number {
			this.bitsPending = 0;
			return this.readUnsignedShort();
		}
		
		public writeUI16(value:number):void {
			/**/ value = ((value) >>> 0);
			this.bitsPending = 0;
			this.writeShort(value);
		}

		public readUI24():number {
			this.bitsPending = 0;
			var loWord:number = this.readUnsignedShort();
			var hiByte:number = this.readUnsignedByte();
			return (hiByte << 16) | loWord;
		}
		
		public writeUI24(value:number):void {
			/**/ value = ((value) >>> 0);
			this.bitsPending = 0;
			this.writeShort(value & 0xffff);
			this.writeByte(value >> 16);
		}
		
		public readUI32():number {
			this.bitsPending = 0;
			return this.readUnsignedInt();
		}
		
		public writeUI32(value:number):void {
			/**/ value = ((value) >>> 0);
			this.bitsPending = 0;
			this.writeUnsignedInt(value);
		}
		
		/////////////////////////////////////////////////////////
		// Fixed-point numbers
		/////////////////////////////////////////////////////////
		
		public readFIXED():number {
			this.bitsPending = 0;
			return this.readInt() / 65536;
		}
		
		public writeFIXED(value:number):void {
			/**/ value = (+(value));
			this.bitsPending = 0;
			this.writeInt(((value * 65536) >> 0));
		}

		public readFIXED8():number {
			this.bitsPending = 0;
			return this.readShort() / 256;
		}

		public writeFIXED8(value:number):void {
			/**/ value = (+(value));
			this.bitsPending = 0;
			this.writeShort(((value * 256) >> 0));
		}

		/////////////////////////////////////////////////////////
		// Floating-point numbers
		/////////////////////////////////////////////////////////
		
		public readFLOAT():number {
			this.bitsPending = 0;
			return this.readFloat();
		}
		
		public writeFLOAT(value:number):void {
			/**/ value = (+(value));
			this.bitsPending = 0;
			this.writeFloat(value);
		}

		public readDOUBLE():number {
			this.bitsPending = 0;
			return this.readDouble();
		}

		public writeDOUBLE(value:number):void {
			/**/ value = (+(value));
			this.bitsPending = 0;
			this.writeDouble(value);
		}

		public readFLOAT16():number {
			this.bitsPending = 0;
			var word:number = this.readUnsignedShort();
			var sign:number = ((word & 0x8000) != 0) ? -1 : 1;
			var exponent:number =  (((word >> 10) & 0x1f) >>> 0);
			var significand:number =  ((word & 0x3ff) >>> 0);
			if (exponent == 0) {
				if (significand == 0) {
					return 0;
				} else {
					// subnormal number
					return sign * Math.pow(2, 1 - SWFData.FLOAT16_EXPONENT_BASE) * (significand / 1024);
				}
			}
			if (exponent == 31) { 
				if (significand == 0) {
					return (sign < 0) ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
				} else {
					return Number.NaN;
				}
			}
			// normal number
			return sign * Math.pow(2, exponent - SWFData.FLOAT16_EXPONENT_BASE) * (1 + significand / 1024);
		}
		
		public writeFLOAT16(value:number):void {
			/**/ value = (+(value));
			HalfPrecisionWriter.write(value, this);
		}

		/////////////////////////////////////////////////////////
		// Encoded integer
		/////////////////////////////////////////////////////////
		
		public readEncodedU32():number {
			this.bitsPending = 0;
			var result:number = this.readUnsignedByte();
			if (result & 0x80) {
				result =(( (result & 0x7f) | (this.readUnsignedByte() << 7)) >>> 0);
				if (result & 0x4000) {
					result =(( (result & 0x3fff) | (this.readUnsignedByte() << 14)) >>> 0);
					if (result & 0x200000) {
						result =(( (result & 0x1fffff) | (this.readUnsignedByte() << 21)) >>> 0);
						if (result & 0x10000000) {
							result =(( (result & 0xfffffff) | (this.readUnsignedByte() << 28)) >>> 0);
						}
					}
				}
			}
			return result;
		}
		
		public writeEncodedU32(value:number):void {
			/**/ value = ((value) >>> 0);
			for (;;) {
				var v:number =  ((value & 0x7f) >>> 0);
				if ((value >>= 7) == 0) {
					this.writeUI8(v);
					break;
				}
				this.writeUI8(v | 0x80);
			}
		}

		/////////////////////////////////////////////////////////
		// Bit values
		/////////////////////////////////////////////////////////
		
		public readUB(bits:number):number {
			/**/ bits = ((bits) >>> 0);
			return this.readBits(bits);
		}

		public writeUB(bits:number, value:number):void {
			/**/ bits = ((bits) >>> 0); value = ((value) >>> 0);
			this.writeBits(bits, value);
		}

		public readSB(bits:number):number {
			/**/ bits = ((bits) >>> 0);
			var shift:number =  ((32 - bits) >>> 0);
			return ((this.readBits(bits) << shift) >> 0) >> shift;
		}
		
		public writeSB(bits:number, value:number):void {
			/**/ bits = ((bits) >>> 0); value = ((value) >> 0);
			this.writeBits(bits, value);
		}
		
		public readFB(bits:number):number {
			/**/ bits = ((bits) >>> 0);
			return (+(this.readSB(bits))) / 65536;
		}
		
		public writeFB(bits:number, value:number):void {
			/**/ bits = ((bits) >>> 0); value = (+(value));
			this.writeSB(bits, value * 65536);
		}
		
		/////////////////////////////////////////////////////////
		// String
		/////////////////////////////////////////////////////////
		
		public readString():string {
			var index:number = this.position;
			while (this.get(index++)) {}
			this.bitsPending = 0;
			var utf:string = this.readUTFBytes(index - this.position), len:number = utf.length;
			if (utf.charCodeAt(len-1) == 0) {
				return utf.substr(0, len-1);
			}
			return utf;
		}
		
		public writeString(value:string):void {
			/**/ value = as(value, 'String');
			if (value && value.length > 0) {
				this.writeUTFBytes(value);
			}
			this.writeByte(0);
		}
		
		/////////////////////////////////////////////////////////
		// Labguage code
		/////////////////////////////////////////////////////////
		
		public readLANGCODE():number {
			this.bitsPending = 0;
			return this.readUnsignedByte();
		}
		
		public writeLANGCODE(value:number):void {
			/**/ value = ((value) >>> 0);
			this.bitsPending = 0;
			this.writeByte(value);
		}
		
		/////////////////////////////////////////////////////////
		// Color records
		/////////////////////////////////////////////////////////
		
		public readRGB():number {
			this.bitsPending = 0;
			var r:number = this.readUnsignedByte();
			var g:number = this.readUnsignedByte();
			var b:number = this.readUnsignedByte();
			return 0xff000000 | (r << 16) | (g << 8) | b;
		}
		
		public writeRGB(value:number):void {
			/**/ value = ((value) >>> 0);
			this.bitsPending = 0;
			this.writeByte((value >> 16) & 0xff);
			this.writeByte((value >> 8) & 0xff);
			this.writeByte(value  & 0xff);
		}

		public readRGBA():number {
			this.bitsPending = 0;
			var rgb:number =  ((this.readRGB() & 0x00ffffff) >>> 0);
			var a:number = this.readUnsignedByte();
			return a << 24 | rgb;
		}
		
		public writeRGBA(value:number):void {
			/**/ value = ((value) >>> 0);
			this.bitsPending = 0;
			this.writeRGB(value);
			this.writeByte((value >> 24) & 0xff);
		}

		public readARGB():number {
			this.bitsPending = 0;
			var a:number = this.readUnsignedByte();
			var rgb:number =  ((this.readRGB() & 0x00ffffff) >>> 0);
			return (a << 24) | rgb;
		}
		
		public writeARGB(value:number):void {
			/**/ value = ((value) >>> 0);
			this.bitsPending = 0;
			this.writeByte((value >> 24) & 0xff);
			this.writeRGB(value);
		}

		/////////////////////////////////////////////////////////
		// Rectangle record
		/////////////////////////////////////////////////////////
		
		public readRECT():SWFRectangle {
			return new SWFRectangle(this);
		}
		
		public writeRECT(value:SWFRectangle):void {
			/**/ value = strict(value, SWFRectangle);
			value.publish(this);
		}
		
		/////////////////////////////////////////////////////////
		// Matrix record
		/////////////////////////////////////////////////////////
		
		public readMATRIX():SWFMatrix {
			return new SWFMatrix(this);
		}
		
		public writeMATRIX(value:SWFMatrix):void {
			/**/ value = strict(value, SWFMatrix);
			this.bitsPending = 0;

			var hasScale:boolean = (value.scaleX != 1) || (value.scaleY != 1);
			var hasRotate:boolean = (value.rotateSkew0 != 0) || (value.rotateSkew1 != 0);
			
			this.writeBits(1, hasScale ? 1 : 0);
			if (hasScale) {
				var scaleBits:number = 0;
				if(value.scaleX == 0 && value.scaleY == 0) {
					scaleBits = 1;
				} else {
					scaleBits = this.calculateMaxBits(true, [value.scaleX * 65536, value.scaleY * 65536]);
				}
				this.writeUB(5, scaleBits);
				this.writeFB(scaleBits, value.scaleX);
				this.writeFB(scaleBits, value.scaleY);
			}
			
			this.writeBits(1, hasRotate ? 1 : 0);
			if (hasRotate) {
				var rotateBits:number = this.calculateMaxBits(true, [value.rotateSkew0 * 65536, value.rotateSkew1 * 65536]);
				this.writeUB(5, rotateBits);
				this.writeFB(rotateBits, value.rotateSkew0);
				this.writeFB(rotateBits, value.rotateSkew1);
			}
			
			var translateBits:number = this.calculateMaxBits(true, [value.translateX, value.translateY]);
			this.writeUB(5, translateBits);
			this.writeSB(translateBits, value.translateX);
			this.writeSB(translateBits, value.translateY);
		}

		/////////////////////////////////////////////////////////
		// Color transform records
		/////////////////////////////////////////////////////////
		
		public readCXFORM():SWFColorTransform {
			return new SWFColorTransform(this);
		}
		
		public writeCXFORM(value:SWFColorTransform):void {
			/**/ value = strict(value, SWFColorTransform);
			value.publish(this);
		}

		public readCXFORMWITHALPHA():SWFColorTransformWithAlpha {
			return new SWFColorTransformWithAlpha(this);
		}
		
		public writeCXFORMWITHALPHA(value:SWFColorTransformWithAlpha):void {
			/**/ value = strict(value, SWFColorTransformWithAlpha);
			value.publish(this);
		}

		/////////////////////////////////////////////////////////
		// Shape and shape records
		/////////////////////////////////////////////////////////
		
		public readSHAPE(unitDivisor:number = 20):SWFShape {
			/**/ unitDivisor = (+(unitDivisor));
			return new SWFShape(this, 1, unitDivisor);
		}
		
		public writeSHAPE(value:SWFShape):void {
			/**/ value = strict(value, SWFShape);
			value.publish(this);
		}
		
		public readSHAPEWITHSTYLE(level:number = 1, unitDivisor:number = 20):SWFShapeWithStyle {
			/**/ level = ((level) >>> 0); unitDivisor = (+(unitDivisor));
			return new SWFShapeWithStyle(this, level, unitDivisor);
		}

		public writeSHAPEWITHSTYLE(value:SWFShapeWithStyle, level:number = 1):void {
			/**/ value = strict(value, SWFShapeWithStyle); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		public readSTRAIGHTEDGERECORD(numBits:number):SWFShapeRecordStraightEdge {
			/**/ numBits = ((numBits) >>> 0);
			return new SWFShapeRecordStraightEdge(this, numBits);
		}
		
		public writeSTRAIGHTEDGERECORD(value:SWFShapeRecordStraightEdge):void {
			/**/ value = strict(value, SWFShapeRecordStraightEdge);
			value.publish(this);
		}
		
		public readCURVEDEDGERECORD(numBits:number):SWFShapeRecordCurvedEdge {
			/**/ numBits = ((numBits) >>> 0);
			return new SWFShapeRecordCurvedEdge(this, numBits);
		}
		
		public writeCURVEDEDGERECORD(value:SWFShapeRecordCurvedEdge):void {
			/**/ value = strict(value, SWFShapeRecordCurvedEdge);
			value.publish(this);
		}
		
		public readSTYLECHANGERECORD(states:number, fillBits:number, lineBits:number, level:number = 1):SWFShapeRecordStyleChange {
			/**/ states = ((states) >>> 0); fillBits = ((fillBits) >>> 0); lineBits = ((lineBits) >>> 0); level = ((level) >>> 0);
			return new SWFShapeRecordStyleChange(this, states, fillBits, lineBits, level);
		}
		
		public writeSTYLECHANGERECORD(value:SWFShapeRecordStyleChange, fillBits:number, lineBits:number, level:number = 1):void {
			/**/ value = strict(value, SWFShapeRecordStyleChange); fillBits = ((fillBits) >>> 0); lineBits = ((lineBits) >>> 0); level = ((level) >>> 0);
			value.numFillBits = fillBits;
			value.numLineBits = lineBits;
			value.publish(this, level);
		}
		

		/////////////////////////////////////////////////////////
		// Fill- and Linestyles
		/////////////////////////////////////////////////////////
		
		public readFILLSTYLE(level:number = 1):SWFFillStyle {
			/**/ level = ((level) >>> 0);
			return new SWFFillStyle(this, level);
		}
		
		public writeFILLSTYLE(value:SWFFillStyle, level:number = 1):void {
			/**/ value = strict(value, SWFFillStyle); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		public readLINESTYLE(level:number = 1):SWFLineStyle {
			/**/ level = ((level) >>> 0);
			return new SWFLineStyle(this, level);
		}
		
		public writeLINESTYLE(value:SWFLineStyle, level:number = 1):void {
			/**/ value = strict(value, SWFLineStyle); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		public readLINESTYLE2(level:number = 1):SWFLineStyle2 {
			/**/ level = ((level) >>> 0);
			return new SWFLineStyle2(this, level);
		}
		
		public writeLINESTYLE2(value:SWFLineStyle2, level:number = 1):void {
			/**/ value = strict(value, SWFLineStyle2); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		/////////////////////////////////////////////////////////
		// Button record
		/////////////////////////////////////////////////////////
		
		public readBUTTONRECORD(level:number = 1):SWFButtonRecord {
			/**/ level = ((level) >>> 0);
			if (this.readUI8() == 0) {
				return null;
			} else {
				this.position--;
				return new SWFButtonRecord(this, level);
			}
		}

		public writeBUTTONRECORD(value:SWFButtonRecord, level:number = 1):void {
			/**/ value = strict(value, SWFButtonRecord); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		public readBUTTONCONDACTION():SWFButtonCondAction {
			return new SWFButtonCondAction(this);
		}
		
		public writeBUTTONCONDACTION(value:SWFButtonCondAction):void {
			/**/ value = strict(value, SWFButtonCondAction);
			value.publish(this);
		}
		
		/////////////////////////////////////////////////////////
		// Filter
		/////////////////////////////////////////////////////////
		
		public readFILTER():IFilter {
			var filterId:number = this.readUI8();
			var filter:IFilter = SWFFilterFactory.create(filterId);
			filter.parse(this);
			return filter;
		}
		
		public writeFILTER(value:IFilter):void {
			/**/ value = strict(value, 'implements_flash___native_format_swf_data_filters_IFilter');
			this.writeUI8(value.id);
			value.publish(this);
		}
		
		/////////////////////////////////////////////////////////
		// Text record
		/////////////////////////////////////////////////////////
		
		public readTEXTRECORD(glyphBits:number, advanceBits:number, previousRecord:SWFTextRecord = null, level:number = 1):SWFTextRecord {
			/**/ glyphBits = ((glyphBits) >>> 0); advanceBits = ((advanceBits) >>> 0); previousRecord = strict(previousRecord, SWFTextRecord); level = ((level) >>> 0);
			if (this.readUI8() == 0) {
				return null;
			} else {
				this.position--;
				return new SWFTextRecord(this, glyphBits, advanceBits, previousRecord, level);
			}
		}
		
		public writeTEXTRECORD(value:SWFTextRecord, glyphBits:number, advanceBits:number, previousRecord:SWFTextRecord = null, level:number = 1):void {
			/**/ value = strict(value, SWFTextRecord); glyphBits = ((glyphBits) >>> 0); advanceBits = ((advanceBits) >>> 0); previousRecord = strict(previousRecord, SWFTextRecord); level = ((level) >>> 0);
			value.publish(this, glyphBits, advanceBits, previousRecord, level);
		}

		public readGLYPHENTRY(glyphBits:number, advanceBits:number):SWFGlyphEntry {
			/**/ glyphBits = ((glyphBits) >>> 0); advanceBits = ((advanceBits) >>> 0);
			return new SWFGlyphEntry(this, glyphBits, advanceBits);
		}

		public writeGLYPHENTRY(value:SWFGlyphEntry, glyphBits:number, advanceBits:number):void {
			/**/ value = strict(value, SWFGlyphEntry); glyphBits = ((glyphBits) >>> 0); advanceBits = ((advanceBits) >>> 0);
			value.publish(this, glyphBits, advanceBits);
		}
		
		/////////////////////////////////////////////////////////
		// Zone record
		/////////////////////////////////////////////////////////
		
		public readZONERECORD():SWFZoneRecord {
			return new SWFZoneRecord(this);
		}

		public writeZONERECORD(value:SWFZoneRecord):void {
			/**/ value = strict(value, SWFZoneRecord);
			value.publish(this);
		}
		
		public readZONEDATA():SWFZoneData {
			return new SWFZoneData(this);
		}

		public writeZONEDATA(value:SWFZoneData):void {
			/**/ value = strict(value, SWFZoneData);
			value.publish(this);
		}
		
		/////////////////////////////////////////////////////////
		// Kerning record
		/////////////////////////////////////////////////////////
		
		public readKERNINGRECORD(wideCodes:boolean):SWFKerningRecord {
			/**/ wideCodes = Boolean(wideCodes);
			return new SWFKerningRecord(this, wideCodes);
		}

		public writeKERNINGRECORD(value:SWFKerningRecord, wideCodes:boolean):void {
			/**/ value = strict(value, SWFKerningRecord); wideCodes = Boolean(wideCodes);
			value.publish(this, wideCodes);
		}
		
		/////////////////////////////////////////////////////////
		// Gradients
		/////////////////////////////////////////////////////////
		
		public readGRADIENT(level:number = 1):SWFGradient {
			/**/ level = ((level) >>> 0);
			return new SWFGradient(this, level);
		}
		
		public writeGRADIENT(value:SWFGradient, level:number = 1):void {
			/**/ value = strict(value, SWFGradient); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		public readFOCALGRADIENT(level:number = 1):SWFFocalGradient {
			/**/ level = ((level) >>> 0);
			return new SWFFocalGradient(this, level);
		}
		
		public writeFOCALGRADIENT(value:SWFFocalGradient, level:number = 1):void {
			/**/ value = strict(value, SWFFocalGradient); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		public readGRADIENTRECORD(level:number = 1):SWFGradientRecord {
			/**/ level = ((level) >>> 0);
			return new SWFGradientRecord(this, level);
		}
		
		public writeGRADIENTRECORD(value:SWFGradientRecord, level:number = 1):void {
			/**/ value = strict(value, SWFGradientRecord); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		/////////////////////////////////////////////////////////
		// Morphs
		/////////////////////////////////////////////////////////
		
		public readMORPHFILLSTYLE(level:number = 1):SWFMorphFillStyle {
			/**/ level = ((level) >>> 0);
			return new SWFMorphFillStyle(this, level);
		}
		
		public writeMORPHFILLSTYLE(value:SWFMorphFillStyle, level:number = 1):void {
			/**/ value = strict(value, SWFMorphFillStyle); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		public readMORPHLINESTYLE(level:number = 1):SWFMorphLineStyle {
			/**/ level = ((level) >>> 0);
			return new SWFMorphLineStyle(this, level);
		}
		
		public writeMORPHLINESTYLE(value:SWFMorphLineStyle, level:number = 1):void {
			/**/ value = strict(value, SWFMorphLineStyle); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		public readMORPHLINESTYLE2(level:number = 1):SWFMorphLineStyle2 {
			/**/ level = ((level) >>> 0);
			return new SWFMorphLineStyle2(this, level);
		}
		
		public writeMORPHLINESTYLE2(value:SWFMorphLineStyle2, level:number = 1):void {
			/**/ value = strict(value, SWFMorphLineStyle2); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		public readMORPHGRADIENT(level:number = 1):SWFMorphGradient {
			/**/ level = ((level) >>> 0);
			return new SWFMorphGradient(this, level);
		}
		
		public writeMORPHGRADIENT(value:SWFMorphGradient, level:number = 1):void {
			/**/ value = strict(value, SWFMorphGradient); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		public readMORPHFOCALGRADIENT(level:number = 1):SWFMorphFocalGradient {
			/**/ level = ((level) >>> 0);
			return new SWFMorphFocalGradient(this, level);
		}
		
		public writeMORPHFOCALGRADIENT(value:SWFMorphFocalGradient, level:number = 1):void {
			/**/ value = strict(value, SWFMorphFocalGradient); level = ((level) >>> 0);
			value.publish(this, level);
		}
		
		public readMORPHGRADIENTRECORD():SWFMorphGradientRecord {
			return new SWFMorphGradientRecord(this);
		}
		
		public writeMORPHGRADIENTRECORD(value:SWFMorphGradientRecord):void {
			/**/ value = strict(value, SWFMorphGradientRecord);
			value.publish(this);
		}
		
		/////////////////////////////////////////////////////////
		// Action records
		/////////////////////////////////////////////////////////
		
		public readACTIONRECORD():IAction {
			var pos:number = this.position;
			var action:IAction;
			var actionCode:number = this.readUI8();
			if (actionCode != 0) {
				var actionLength:number = (actionCode >= 0x80) ? this.readUI16() : 0;
				action = SWFActionFactory.create(actionCode, actionLength, pos);
				action.parse(this);
			}
			return action;
		}
		
		public writeACTIONRECORD(action:IAction):void {
			/**/ action = strict(action, 'implements_flash___native_format_swf_data_actions_IAction');
			action.publish(this);
		}
		
		public readACTIONVALUE():SWFActionValue {
			return new SWFActionValue(this);
		}
		
		public writeACTIONVALUE(value:SWFActionValue):void {
			/**/ value = strict(value, SWFActionValue);
			value.publish(this);
		}
		
		public readREGISTERPARAM():SWFRegisterParam {
			return new SWFRegisterParam(this);
		}
		
		public writeREGISTERPARAM(value:SWFRegisterParam):void {
			/**/ value = strict(value, SWFRegisterParam);
			value.publish(this);
		}
		
		/////////////////////////////////////////////////////////
		// Assets
		/////////////////////////////////////////////////////////
		
		public readASSET():SWFAsset {
			return new SWFAsset(this);
		}
		
		public writeASSET(value:SWFAsset):void {
			/**/ value = strict(value, SWFAsset);
			value.publish(this);
		}
		
		/////////////////////////////////////////////////////////
		// Symbols
		/////////////////////////////////////////////////////////
		
		public readSYMBOL():SWFSymbol {
			return new SWFSymbol(this);
		}
		
		public writeSYMBOL(value:SWFSymbol):void {
			/**/ value = strict(value, SWFSymbol);
			value.publish(this);
		}
		
		/////////////////////////////////////////////////////////
		// Sound records
		/////////////////////////////////////////////////////////
		
		public readSOUNDINFO():SWFSoundInfo {
			return new SWFSoundInfo(this);
		}
		
		public writeSOUNDINFO(value:SWFSoundInfo):void {
			/**/ value = strict(value, SWFSoundInfo);
			value.publish(this);
		}
		
		public readSOUNDENVELOPE():SWFSoundEnvelope {
			return new SWFSoundEnvelope(this);
		}
		
		public writeSOUNDENVELOPE(value:SWFSoundEnvelope):void {
			/**/ value = strict(value, SWFSoundEnvelope);
			value.publish(this);
		}
		
		/////////////////////////////////////////////////////////
		// ClipEvents
		/////////////////////////////////////////////////////////
		
		public readCLIPACTIONS(version:number):SWFClipActions {
			/**/ version = ((version) >>> 0);
			return new SWFClipActions(this, version);
		}
		
		public writeCLIPACTIONS(value:SWFClipActions, version:number):void {
			/**/ value = strict(value, SWFClipActions); version = ((version) >>> 0);
			value.publish(this, version);
		}
		
		public readCLIPACTIONRECORD(version:number):SWFClipActionRecord {
			/**/ version = ((version) >>> 0);
			var pos:number = this.position;
			var flags:number = (version >= 6) ? this.readUI32() : this.readUI16();
			if (flags == 0) {
				return null;
			} else {
				this.position = pos;
				return new SWFClipActionRecord(this, version);
			}
		}
		
		public writeCLIPACTIONRECORD(value:SWFClipActionRecord, version:number):void {
			/**/ value = strict(value, SWFClipActionRecord); version = ((version) >>> 0);
			value.publish(this, version);
		}
		
		public readCLIPEVENTFLAGS(version:number):SWFClipEventFlags {
			/**/ version = ((version) >>> 0);
			return new SWFClipEventFlags(this, version);
		}
		
		public writeCLIPEVENTFLAGS(value:SWFClipEventFlags, version:number):void {
			/**/ value = strict(value, SWFClipEventFlags); version = ((version) >>> 0);
			value.publish(this, version);
		}
		
		
		/////////////////////////////////////////////////////////
		// Tag header
		/////////////////////////////////////////////////////////
		
		public readTagHeader():SWFRecordHeader {
			var pos:number = this.position;
 			var tagTypeAndLength:number = this.readUI16();
			var tagLength:number =  ((tagTypeAndLength & 0x003f) >>> 0);
			if (tagLength == 0x3f) {
				// The SWF10 spec sez that this is a signed int.
				// Shouldn't it be an unsigned int?
				tagLength =(( this.readSI32()) >>> 0);
			}
			return new SWFRecordHeader(tagTypeAndLength >> 6, tagLength, this.position - pos);
		}

		public writeTagHeader(type:number, length:number, forceLongHeader:boolean = false):void {
			/**/ type = ((type) >>> 0); length = ((length) >>> 0); forceLongHeader = Boolean(forceLongHeader);
			if (length < 0x3f && !forceLongHeader) {
				this.writeUI16((type << 6) | length);
			} else {
				this.writeUI16((type << 6) | 0x3f);
				// The SWF10 spec sez that this is a signed int.
				// Shouldn't it be an unsigned int?
				this.writeSI32(length);
			}
		}
		
		/////////////////////////////////////////////////////////
		// SWF Compression
		/////////////////////////////////////////////////////////
		
		public swfUncompress(compressionMethod:string, uncompressedLength:number = 0):void {
			/**/ compressionMethod = as(compressionMethod, 'String'); uncompressedLength = ((uncompressedLength) >>> 0);
			var pos:number = this.position;
			var ba:ByteArray = new ByteArray();
			
			if(compressionMethod == SWF.COMPRESSION_METHOD_ZLIB) {
				this.readBytes(ba);
				ba.position = 0;
				ba.uncompress();
			} else if(compressionMethod == SWF.COMPRESSION_METHOD_LZMA) {
				
				// LZMA compressed SWF:
				//   0000 5A 57 53 0F   (ZWS, Version 15)
				//   0004 DF 52 00 00   (Uncompressed size: 21215)
				//   0008 94 3B 00 00   (Compressed size: 15252)
				//   000C 5D 00 00 00 01   (LZMA Properties)
				//   0011 00 3B FF FC A6 14 16 5A ...   (15252 bytes of LZMA Compressed Data, until EOF)
				// 7z LZMA format:
				//   0000 5D 00 00 00 01   (LZMA Properties)
				//   0005 D7 52 00 00 00 00 00 00   (Uncompressed size: 21207, 64 bit)
				//   000D 00 3B FF FC A6 14 16 5A ...   (15252 bytes of LZMA Compressed Data, until EOF)
				// (see also https://github.com/claus/as3swf/pull/23#issuecomment-7203861)
				
				// Write LZMA properties
				for(var i:number = 0; i < 5; i++) {
					ba.writeByte(this.get(i + 12));
				}
				
				// Write uncompressed length (64 bit)
				ba.endian = Endian.LITTLE_ENDIAN;
				ba.writeUnsignedInt(uncompressedLength - 8);
				ba.writeUnsignedInt(0);
				
				// Write compressed data
				this.position = 17;
				this.readBytes(ba, 13);

				// Uncompress
				ba.position = 0;
				ba.uncompress(compressionMethod);
				
			} else {
				throw(new Error("Unknown compression method: " + compressionMethod));
			}
			
			this.length = this.position = pos;
			this.writeBytes(ba);
			this.position = pos;
		}
		
		public fromArray(array:ByteArray, colons:boolean=false):string {
			/**/ array = strict(array, ByteArray); colons = Boolean(colons);
			var s:string = "";
			for (var i:number = 0, len:number = array.length; i < len; i++) {
				s += ("0"+array.get(i).toString(16)).substr(-2,2);
				if (colons) {
					if (i < array.length-1) s+=":";
				}
			}
			return s;
		}
		
		public swfCompress(compressionMethod:string):void {
			/**/ compressionMethod = as(compressionMethod, 'String');
			var pos:number = this.position;
			var ba:ByteArray = new ByteArray();
			
			if(compressionMethod == SWF.COMPRESSION_METHOD_ZLIB) {
				this.readBytes(ba);
				ba.position = 0;
				ba.compress();
			} else if(compressionMethod == SWF.COMPRESSION_METHOD_LZMA) {
				// Never should get here (unfortunately)
				// We're forcing ZLIB compression on publish, see CSS.as line 145
				throw(new Error("Can't publish LZMA compressed SWFs"));
				// This should be correct, but doesn't seem to work:
				var lzma:ByteArray = new ByteArray();
				this.readBytes(lzma);
				lzma.position = 0;
				lzma.compress(compressionMethod);
				// Write compressed length
				ba.endian = Endian.LITTLE_ENDIAN;
				ba.writeUnsignedInt(lzma.length - 13);
				// Write LZMA properties
				for(var i:number = 0; i < 5; i++) {
					ba.writeByte(lzma.get(i));
				}
				// Write compressed data
				ba.writeBytes(lzma, 13);
			} else {
				throw(new Error("Unknown compression method: " + compressionMethod));
			}
			
			this.length = this.position = pos;
			this.writeBytes(ba);
		}
		
		/////////////////////////////////////////////////////////
		// etc
		/////////////////////////////////////////////////////////
		
		public readRawTag():SWFRawTag {
			return new SWFRawTag(this);
		}
		
		public skipBytes(length:number):void {
			/**/ length = ((length) >>> 0);
			this.position += length;
		}
		
		public static dump(ba:ByteArray, length:number, offset:number = 0):void {
			/**/ ba = strict(ba, ByteArray); length = ((length) >>> 0); offset = ((offset) >> 0);
			var posOrig:number = ba.position;
			var pos:number = ba.position =(( Math.min(Math.max(posOrig + offset, 0), ba.length - length)) >>> 0);
			var str:string = "[Dump] total length: " + ba.length + ", original position: " + posOrig;
			for (var i:number = 0; i < length; i++) {
				var b:string = ba.readUnsignedByte().toString(16);
				if(b.length == 1) { b = "0" + b; }
				if(i % 16 == 0) {
					var addr:string =  as((pos + i).toString(16), 'String');
					addr = "00000000".substr(0, 8 - addr.length) + addr;
					str += "\r" + addr + ": ";
				}
				b += " ";
				str += b;
			}
			ba.position = posOrig;
			trace(str);
		}
	}
}