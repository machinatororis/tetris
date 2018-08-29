/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="filters/IFilter.ts" />
/// <reference path="consts/BlendMode.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import BlendMode = flash.__native.format.swf.data.consts.BlendMode;
	export import IFilter = flash.__native.format.swf.data.filters.IFilter;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class SWFButtonRecord
	{
		public hasBlendMode:boolean = false;
		public hasFilterList:boolean = false;
		public stateHitTest:boolean = false;
		public stateDown:boolean = false;
		public stateOver:boolean = false;
		public stateUp:boolean = false;
		
		public characterId:number = 0;
		public placeDepth:number = 0;
		public placeMatrix:SWFMatrix = null;
		public colorTransform:SWFColorTransformWithAlpha = null;
		public blendMode:number = 0;

		protected _filterList:IFilter[] = undefined;
		
		constructor(data:SWFData = null, level:number = 1) {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			this._filterList = new Array<IFilter>();
			if (data != null) {
				this.parse(data, level);
			}
		}
		
		public get filterList():IFilter[] { return this._filterList; }

		public parse(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			var flags:number = data.readUI8();
			this.stateHitTest = ((flags & 0x08) != 0);
			this.stateDown = ((flags & 0x04) != 0);
			this.stateOver = ((flags & 0x02) != 0);
			this.stateUp = ((flags & 0x01) != 0);
			this.characterId = data.readUI16();
			this.placeDepth = data.readUI16();
			this.placeMatrix = data.readMATRIX();
			if (level >= 2) {
				this.colorTransform = data.readCXFORMWITHALPHA();
				this.hasFilterList = ((flags & 0x10) != 0);
				if (this.hasFilterList) {
					var numberOfFilters:number = data.readUI8();
					for (var i:number = 0; i < numberOfFilters; i++) {
						this._filterList.push(data.readFILTER());
					}
				}
				this.hasBlendMode = ((flags & 0x20) != 0);
				if (this.hasBlendMode) {
					this.blendMode = data.readUI8();
				}
			}
		}
		
		public publish(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			var flags:number = 0;
			if(level >= 2 && this.hasBlendMode) { flags |= 0x20; }
			if(level >= 2 && this.hasFilterList) { flags |= 0x10; }
			if(this.stateHitTest) { flags |= 0x08; }
			if(this.stateDown) { flags |= 0x04; }
			if(this.stateOver) { flags |= 0x02; }
			if(this.stateUp) { flags |= 0x01; }
			data.writeUI8(flags);
			data.writeUI16(this.characterId);
			data.writeUI16(this.placeDepth);
			data.writeMATRIX(this.placeMatrix);
			if (level >= 2) {
				data.writeCXFORMWITHALPHA(this.colorTransform);
				if (this.hasFilterList) {
					var numberOfFilters:number =  ((this.filterList.length) >>> 0);
					data.writeUI8(numberOfFilters);
					for (var i:number = 0; i < numberOfFilters; i++) {
						data.writeFILTER(this.filterList[i]);
					}
				}
				if (this.hasBlendMode) {
					data.writeUI8(this.blendMode);
				}
			}
		}
		
		public clone():SWFButtonRecord {
			var data:SWFButtonRecord = new SWFButtonRecord();
			data.hasBlendMode = this.hasBlendMode;
			data.hasFilterList = this.hasFilterList;
			data.stateHitTest = this.stateHitTest;
			data.stateDown = this.stateDown;
			data.stateOver = this.stateOver;
			data.stateUp = this.stateUp;
			data.characterId = this.characterId;
			data.placeDepth = this.placeDepth;
			data.placeMatrix = this.placeMatrix.clone();
			if(this.colorTransform) {
				data.colorTransform = as(this.colorTransform.clone() , SWFColorTransformWithAlpha);
			}
			for(var i:number = 0; i < this.filterList.length; i++) {
				data.filterList.push(this.filterList[i].clone());
			}
			data.blendMode = this.blendMode;
			return data;
		}
		
		public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "Depth: " + this.placeDepth + ", CharacterID: " + this.characterId + ", States: ";
			var states:any[] = [];
			if (this.stateUp) { states.push("up"); }
			if (this.stateOver) { states.push("over"); }
			if (this.stateDown) { states.push("down"); }
			if (this.stateHitTest) { states.push("hit"); }
			str += states.join(",");
			if (this.hasBlendMode) { str += ", BlendMode: " + BlendMode.toString(this.blendMode); }
			if (this.placeMatrix && !this.placeMatrix.isIdentity()) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Matrix: " + this.placeMatrix;
			}
			if (this.colorTransform && !this.colorTransform.isIdentity()) {
				str += "\n" + StringUtils.repeat(indent + 2) + "ColorTransform: " + this.colorTransform;
			}
			if (this.hasFilterList) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Filters:"
				for(var i:number = 0; i < this.filterList.length; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this.filterList[i].toString(indent + 4);
				}
			}
			return str;
		}
	}

}