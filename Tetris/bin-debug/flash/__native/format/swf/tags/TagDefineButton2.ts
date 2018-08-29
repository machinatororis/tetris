/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/Dictionary.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../data/SWFButtonRecord.ts" />
/// <reference path="../data/SWFButtonCondAction.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFButtonCondAction = flash.__native.format.swf.data.SWFButtonCondAction;
	export import SWFButtonRecord = flash.__native.format.swf.data.SWFButtonRecord;
	export import StringUtils = flash.__native.utils.StringUtils;
	export import Dictionary = flash.utils.Dictionary;
	
	
	export  class TagDefineButton2 implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 34;
		
		public trackAsMenu:boolean = false;
		
		protected _characterId:number = 0;

		protected _characters:SWFButtonRecord[] = undefined;
		protected _condActions:SWFButtonCondAction[] = undefined;
		
		protected frames:Dictionary = null;
		
		constructor() {
			this._characters = new Array<SWFButtonRecord>();
			this._condActions = new Array<SWFButtonCondAction>();
			this.frames = new Dictionary();
		}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }

		public get characters():SWFButtonRecord[] { return this._characters; }
		public get condActions():SWFButtonCondAction[] { return this._condActions; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.trackAsMenu = ((data.readUI8() & 0x01) != 0);
			var actionOffset:number = data.readUI16();
			var record:SWFButtonRecord;
			while ((record = data.readBUTTONRECORD(2)) != null) {
				this.characters.push(record);
			}
			if (actionOffset != 0) {
				var condActionSize:number = 0;
				do {
					condActionSize = data.readUI16();
					this.condActions.push(data.readBUTTONCONDACTION());
				} while(condActionSize != 0);
			}
			this.processRecords();
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var i:number = 0;
			var len:number = 0;
			var body:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			body.writeUI8(this.trackAsMenu ? 0x01 : 0);
			var hasCondActions:boolean = (this.condActions.length > 0); 
			var buttonRecordsBytes:SWFData = new SWFData();
			for (i = 0, len = this.characters.length; i < len; i++) {
				buttonRecordsBytes.writeBUTTONRECORD(this.characters[i], 2);
			}
			buttonRecordsBytes.writeUI8(0);
			body.writeUI16(hasCondActions ? buttonRecordsBytes.length + 2 : 0);
			body.writeBytes(buttonRecordsBytes);
			if (hasCondActions) {
				for (i = 0, len = this.condActions.length; i < len; i++) {
					var condActionBytes:SWFData = new SWFData();
					condActionBytes.writeBUTTONCONDACTION(this.condActions[i]);
					body.writeUI16((i < this.condActions.length - 1) ? condActionBytes.length + 2 : 0);
					body.writeBytes(condActionBytes);
				}
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag {
			var i:number = 0;
			var len:number = 0;
			var tag:TagDefineButton2 = new TagDefineButton2();
			tag.characterId = this.characterId;
			tag.trackAsMenu = this.trackAsMenu;
			for (i = 0, len = this.characters.length; i < len; i++) {
				tag.characters.push(this.characters[i].clone());
			}
			for (i = 0, len = this.condActions.length; i < len; i++) {
				tag.condActions.push(this.condActions[i].clone());
			}
			return tag;
		}
		
		public getRecordsByState(state:string):SWFButtonRecord[] {
			/**/ state = as(state, 'String');
			return as(this.frames.get(state) , Array);
		}
		
		public get type():number { return TagDefineButton2.TYPE; }
		public get name():string { return "DefineButton2"; }
		public get version():number { return 3; }
		public get level():number { return 2; }

		protected processRecords():void {
			var upState:SWFButtonRecord[] = new Array<SWFButtonRecord>();
			var overState:SWFButtonRecord[] = new Array<SWFButtonRecord>();
			var downState:SWFButtonRecord[] = new Array<SWFButtonRecord>();
			var hitState:SWFButtonRecord[] = new Array<SWFButtonRecord>();
			for (var i:number = 0, len:number =  ((this.characters.length) >>> 0); i < len; i++) {
				var record:SWFButtonRecord =  strict(this.characters[i], SWFButtonRecord);
				if (record.stateUp) { upState.push(record); }
				if (record.stateOver) { overState.push(record); }
				if (record.stateDown) { downState.push(record); }
				if (record.stateHitTest) { hitState.push(record); }
			}
			this.frames.set(TagDefineButton.STATE_UP,  upState.sort(this.sortByDepthCompareFunction.__bind(this)));
			this.frames.set(TagDefineButton.STATE_OVER,  overState.sort(this.sortByDepthCompareFunction.__bind(this)));
			this.frames.set(TagDefineButton.STATE_DOWN,  downState.sort(this.sortByDepthCompareFunction.__bind(this)));
			this.frames.set(TagDefineButton.STATE_HIT,  hitState.sort(this.sortByDepthCompareFunction.__bind(this)));
		}
		
		protected sortByDepthCompareFunction(a:SWFButtonRecord, b:SWFButtonRecord):number {
			/**/ a = strict(a, SWFButtonRecord); b = strict(b, SWFButtonRecord);
			if(a.placeDepth < b.placeDepth) {
				return -1;
			} else if(a.placeDepth > b.placeDepth) {
				return 1;
			} else {
				return 0;
			}
		}
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", TrackAsMenu: " + this.trackAsMenu;
			var i:number = 0;
			var len:number = 0;
			if ((len=((this._characters.length) >>> 0)) > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Characters:";
				for (i = 0; i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this._characters[i].toString(indent + 4);
				}
			}
			if ((len=((this._condActions.length) >>> 0)) > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "CondActions:";
				for (i = 0; i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this._condActions[i].toString(indent + 4, flags);
				}
			}
			return str;
		}
	}

}