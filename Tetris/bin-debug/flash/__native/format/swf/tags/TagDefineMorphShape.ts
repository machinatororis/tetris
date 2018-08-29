/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../exporters/core/IShapeExporter.ts" />
/// <reference path="../data/SWFShapeRecordStyleChange.ts" />
/// <reference path="../data/SWFShapeRecordStraightEdge.ts" />
/// <reference path="../data/SWFShapeRecordCurvedEdge.ts" />
/// <reference path="../data/SWFShapeRecord.ts" />
/// <reference path="../data/SWFShape.ts" />
/// <reference path="../data/SWFRectangle.ts" />
/// <reference path="../data/SWFMorphLineStyle.ts" />
/// <reference path="../data/SWFMorphFillStyle.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFMorphFillStyle = flash.__native.format.swf.data.SWFMorphFillStyle;
	export import SWFMorphLineStyle = flash.__native.format.swf.data.SWFMorphLineStyle;
	export import SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
	export import SWFShape = flash.__native.format.swf.data.SWFShape;
	export import SWFShapeRecord = flash.__native.format.swf.data.SWFShapeRecord;
	export import SWFShapeRecordCurvedEdge = flash.__native.format.swf.data.SWFShapeRecordCurvedEdge;
	export import SWFShapeRecordStraightEdge = flash.__native.format.swf.data.SWFShapeRecordStraightEdge;
	export import SWFShapeRecordStyleChange = flash.__native.format.swf.data.SWFShapeRecordStyleChange;
	export import IShapeExporter = flash.__native.format.swf.exporters.core.IShapeExporter;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagDefineMorphShape implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 46;
		
		public startBounds : SWFRectangle = null;
		public endBounds : SWFRectangle = null;
		public startEdges : SWFShape = null;
		public endEdges : SWFShape = null;
		
		protected _characterId : number = 0;
		protected _morphFillStyles : SWFMorphFillStyle[] = undefined;
		protected _morphLineStyles : SWFMorphLineStyle[] = undefined;
		protected _shape : SWFShape = null;
		
		constructor()
		{
			this._morphFillStyles = new Array;
			this._morphLineStyles = new Array;
			this._shape = new SWFShape;
		}
		
		public get characterId() : number { return this._characterId; }
		public set characterId(value : number) { /**/ value = ((value) >>> 0); this._characterId = value; }

		public get morphFillStyles() : SWFMorphFillStyle[] { return this._morphFillStyles; }
		public get morphLineStyles() : SWFMorphLineStyle[] { return this._morphLineStyles; }
		
		public parse (data : SWFData, length : number, version : number, async : boolean = false) : void
		{
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16 ();
			this.startBounds = data.readRECT ();
			this.endBounds = data.readRECT ();
			
			var offset : number = data.readUI32 ();
			var i : number = 0;
			
			// MorphFillStyleArray
			var fillStyleCount : number = data.readUI8 ();
			if (fillStyleCount == 0xff) {
				
				fillStyleCount = data.readUI16 ();
				
			}
			
			for (i = 0; i < fillStyleCount; i++) {
				
				this._morphFillStyles.push (data.readMORPHFILLSTYLE ());
				
			}
			
			// MorphLineStyleArray
			var lineStyleCount:number = data.readUI8 ();
			if (lineStyleCount == 0xff) {
				
				lineStyleCount = data.readUI16 ();
				
			}
			
			for (i = 0; i < lineStyleCount; i++) {
				
				this._morphLineStyles.push (data.readMORPHLINESTYLE ());
				
			}
			
			this.startEdges = data.readSHAPE ();
			this.endEdges = data.readSHAPE ();
		}
		
		public publish (data : SWFData, version : number) : void
		{
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body : SWFData = new SWFData;
			body.writeUI16 (this.characterId);
			body.writeRECT (this.startBounds);
			body.writeRECT (this.endBounds);
			
			var startBytes : SWFData = new SWFData;
			var i : number = 0;
			
			// MorphFillStyleArray
			var fillStyleCount : number =  ((this._morphFillStyles.length) >>> 0);
			if (fillStyleCount > 0xfe) {
				
				startBytes.writeUI8 (0xff);
				startBytes.writeUI16 (fillStyleCount);
				
			} else {
				
				startBytes.writeUI8 (fillStyleCount);
				
			}
			
			for (i = 0; i < fillStyleCount; i++) {
				
				startBytes.writeMORPHFILLSTYLE (this._morphFillStyles[i])
					
			}
			
			// MorphLineStyleArray
			var lineStyleCount : number =  ((this._morphLineStyles.length) >>> 0);
			if (lineStyleCount > 0xfe) {
				
				startBytes.writeUI8 (0xff);
				startBytes.writeUI16 (lineStyleCount);
				
			} else {
				
				startBytes.writeUI8 (lineStyleCount);
				
			}
			
			for (i = 0; i < lineStyleCount; i++) {
				
				startBytes.writeMORPHLINESTYLE (this._morphLineStyles[i])
					
			}
			
			startBytes.writeSHAPE (this.startEdges);
			body.writeUI32 (startBytes.length);
			body.writeBytes (startBytes);
			body.writeSHAPE (this.endEdges);
			data.writeTagHeader (this.type, body.length);
			data.writeBytes (body);
		}
		
		public clone() : IDefinitionTag
		{
			throw new Error("Not implemented yet.");
		}
		
		public exportMorphShape(handler : IShapeExporter = null, ratio : number = 0) : void
		{
			/**/ handler = strict(handler, 'implements_flash___native_format_swf_exporters_core_IShapeExporter'); ratio = (+(ratio));
			var i : number = 0;
			var j : number = 0;
			var len : number = 0;
			
			this._shape.clearPaths (); // Fix bug with linking
			this._shape.records.length = 0;
			this._shape.fillStyles.length = 0;
			this._shape.lineStyles.length = 0;
			
			var numEdges : number =  ((this.startEdges.records.length) >>> 0);
			for (i = 0; i < numEdges; i++) {
				
				var startRecord : SWFShapeRecord =  strict(this.startEdges.records[i], SWFShapeRecord);
				// Ignore start records that are style change records and don't have moveTo
				// The end record index is not incremented, because end records do not have
				// style change records without moveTo's.
				//if(startRecord.type == SWFShapeRecord.TYPE_STYLECHANGE && !SWFShapeRecordStyleChange(startRecord).stateMoveTo) {
				//	exportShape.records.push(startRecord.clone());
				//	continue;
				//}
				var endRecord : SWFShapeRecord =  strict(this.endEdges.records[j++], SWFShapeRecord);
				var exportRecord : SWFShapeRecord;
				// It is possible for an edge to change type over the course of a morph sequence. 
				// A straight edge can become a curved edge and vice versa
				// Convert straight edge to curved edge, if needed:
				if (startRecord.type == SWFShapeRecord.TYPE_CURVEDEDGE && endRecord.type == SWFShapeRecord.TYPE_STRAIGHTEDGE) {
					
					endRecord = this.convertToCurvedEdge (endRecord);
					
				} else if (startRecord.type == SWFShapeRecord.TYPE_STRAIGHTEDGE && endRecord.type == SWFShapeRecord.TYPE_CURVEDEDGE) {
					
					startRecord = this.convertToCurvedEdge (startRecord);
					
				}
				
				switch (startRecord.type) {
					
					case SWFShapeRecord.TYPE_STYLECHANGE:
						var startStyleChange : SWFShapeRecordStyleChange =  strict(startRecord.clone (), SWFShapeRecordStyleChange);
						startStyleChange.stateMoveTo = true;
						
						if (endRecord.type == SWFShapeRecord.TYPE_STYLECHANGE) {
							
							var endStyleChange : SWFShapeRecordStyleChange =  strict(endRecord, SWFShapeRecordStyleChange);
							startStyleChange.moveDeltaX += (endStyleChange.moveDeltaX - startStyleChange.moveDeltaX) * ratio;
							startStyleChange.moveDeltaY += (endStyleChange.moveDeltaY - startStyleChange.moveDeltaY) * ratio;
							
						} else {
							
							startStyleChange.moveDeltaX += (-startStyleChange.moveDeltaX) * ratio;
							startStyleChange.moveDeltaY += ( -startStyleChange.moveDeltaY) * ratio;
							j--;
							
						}
						
						exportRecord = startStyleChange;
						break;
					
					case SWFShapeRecord.TYPE_STRAIGHTEDGE:
						var startStraightEdge : SWFShapeRecordStraightEdge =  strict(startRecord.clone (), SWFShapeRecordStraightEdge);
						var endStraightEdge : SWFShapeRecordStraightEdge =  strict(endRecord, SWFShapeRecordStraightEdge);
						
						startStraightEdge.deltaX += (endStraightEdge.deltaX - startStraightEdge.deltaX) * ratio;
						startStraightEdge.deltaY += (endStraightEdge.deltaY - startStraightEdge.deltaY) * ratio;
						
						if (startStraightEdge.deltaX != 0 && startStraightEdge.deltaY != 0) {
							
							startStraightEdge.generalLineFlag = true;
							startStraightEdge.vertLineFlag = false;
							
						} else {
							
							startStraightEdge.generalLineFlag = false;
							startStraightEdge.vertLineFlag = startStraightEdge.deltaX == 0;
							
						}
						
						exportRecord = startStraightEdge;
						break;
					
					case SWFShapeRecord.TYPE_CURVEDEDGE:
						var startCurvedEdge : SWFShapeRecordCurvedEdge =  strict(startRecord.clone(), SWFShapeRecordCurvedEdge);
						var endCurvedEdge : SWFShapeRecordCurvedEdge =  strict(endRecord, SWFShapeRecordCurvedEdge);
						startCurvedEdge.controlDeltaX += (endCurvedEdge.controlDeltaX - startCurvedEdge.controlDeltaX) * ratio;
						startCurvedEdge.controlDeltaY += (endCurvedEdge.controlDeltaY - startCurvedEdge.controlDeltaY) * ratio;
						startCurvedEdge.anchorDeltaX += (endCurvedEdge.anchorDeltaX - startCurvedEdge.anchorDeltaX) * ratio;
						startCurvedEdge.anchorDeltaY += (endCurvedEdge.anchorDeltaY - startCurvedEdge.anchorDeltaY) * ratio;
						exportRecord = startCurvedEdge;
						break;
					
					case SWFShapeRecord.TYPE_END:
						exportRecord = startRecord.clone ();
						break;
					
				}
				
				this._shape.records.push (exportRecord);
				
			}
			
			for (i = 0, len = this.morphFillStyles.length; i < len; i++) {
				
				this._shape.fillStyles.push (this.morphFillStyles[i].getMorphedFillStyle (ratio));
				
			}
			
			for (i = 0, len = this.morphLineStyles.length; i < len; i++) {
				
				this._shape.lineStyles.push (this.morphLineStyles[i].getMorphedLineStyle (ratio));
				
			}
			
			this._shape.exportShape (handler);
		}
		
		protected convertToCurvedEdge(straightEdge : SWFShapeRecordStraightEdge) : SWFShapeRecordCurvedEdge
		{
			/**/ straightEdge = strict(straightEdge, SWFShapeRecordStraightEdge);
			var curvedEdge : SWFShapeRecordCurvedEdge = new SWFShapeRecordCurvedEdge;
			curvedEdge.controlDeltaX =(( straightEdge.deltaX / 2) >> 0);
			curvedEdge.controlDeltaY =(( straightEdge.deltaY / 2) >> 0);
			curvedEdge.anchorDeltaX =(( straightEdge.deltaX / 2) >> 0);
			curvedEdge.anchorDeltaY =(( straightEdge.deltaY / 2) >> 0);
			return curvedEdge;
		}
		
		public get type () : number { return TagDefineMorphShape.TYPE; }
		public get name () : string { return "DefineMorphShape"; }
		public get version () : number { return 3; }
		public get level () : number { return 1; }
		
		public toString (indent : number = 0, flags : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var i : number = 0;
			var len : number = 0;
			var indent2 : string = StringUtils.repeat (indent + 2);
			var indent4 : string = StringUtils.repeat (indent + 4);
			var str : string = Tag.toStringCommon (this.type, this.name, indent) + "ID: " + this.characterId;
			str += "\n" + indent2 + "Bounds:";
			str += "\n" + indent4 + "StartBounds: " + this.startBounds.toString ();
			str += "\n" + indent4 + "EndBounds: " + this.endBounds.toString ();
			
			if ((len =(( this._morphFillStyles.length) >>> 0)) > 0) {
				
				str += "\n" + indent2 + "FillStyles:";
				for (i = 0; i < len; i++) {
					
					str += "\n" + indent4 + "[" + (i + 1) + "] " + this._morphFillStyles[i].toString ();
					
				}
				
			}
			
			if ((len =(( this._morphLineStyles.length) >>> 0)) > 0) {
				
				str += "\n" + indent2 + "LineStyles:";
				for (i = 0; i < len; i++) {
					
					str += "\n" + indent4 + "[" + (i + 1) + "] " + this._morphLineStyles[i].toString ();
					
				}
				
			}
			
			str += this.startEdges.toString (indent + 2);
			str += this.endEdges.toString (indent + 2);
			return str;
		}
	}

}