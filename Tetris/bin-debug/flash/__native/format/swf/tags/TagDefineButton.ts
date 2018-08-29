/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/Dictionary.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../data/actions/IAction.ts" />
/// <reference path="../data/actions/ActionExecutionContext.ts" />
/// <reference path="../data/actions/Action.ts" />
/// <reference path="../data/SWFButtonRecord.ts" />
/// <reference path="../SWFData.ts" />
/// <reference path="../SWF.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWF = flash.__native.format.swf.SWF;
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFButtonRecord = flash.__native.format.swf.data.SWFButtonRecord;
	export import Action = flash.__native.format.swf.data.actions.Action;
	export import ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	export import StringUtils = flash.__native.utils.StringUtils;
	export import Dictionary = flash.utils.Dictionary;
	
	
	export  class TagDefineButton implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 7;
		
		public static STATE_UP:string = "up"; 
		public static STATE_OVER:string = "over"; 
		public static STATE_DOWN:string = "down"; 
		public static STATE_HIT:string = "hit"; 
		
		protected _characterId:number = 0;
		
		protected _characters:SWFButtonRecord[] = undefined;
		protected _actions:IAction[] = undefined;
		
		protected frames:Dictionary = null;
		
		protected labelCount:number = 0;
		
		constructor() {
			this._characters = new Array<SWFButtonRecord>();
			this._actions = new Array<IAction>();
			this.frames = new Dictionary();
		}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }

		public get characters():SWFButtonRecord[] { return this._characters; }
		public get actions():IAction[] { return this._actions; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			var record:SWFButtonRecord;
			while ((record = data.readBUTTONRECORD()) != null) {
				this._characters.push(record);
			}
			var action:IAction;
			while ((action = data.readACTIONRECORD()) != null) {
				this._actions.push(action);
			}
			this.labelCount = Action.resolveOffsets(this._actions);
			this.processRecords();
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var i:number = 0;
			var len:number = 0;
			var body:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			for (i = 0, len = this.characters.length; i < len; i++) {
				data.writeBUTTONRECORD(this.characters[i]);
			}
			data.writeUI8(0);
			for (i = 0, len = this.actions.length; i < len; i++) {
				data.writeACTIONRECORD(this.actions[i]);
			}
			data.writeUI8(0);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag {
			var i:number = 0;
			var len:number = 0;
			var tag:TagDefineButton = new TagDefineButton();
			tag.characterId = this.characterId;
			for (i = 0, len = this.characters.length; i < len; i++) {
				tag.characters.push(this.characters[i].clone());
			}
			for (i = 0, len = this.actions.length; i < len; i++) {
				tag.actions.push(this.actions[i].clone());
			}
			return tag;
		}
		
		public getRecordsByState(state:string):SWFButtonRecord[] {
			/**/ state = as(state, 'String');
			return as(this.frames.get(state) , Array);
		}
		
		public get type():number { return TagDefineButton.TYPE; }
		public get name():string { return "DefineButton"; }
		public get version():number { return 1; }
		public get level():number { return 1; }
		
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
				"ID: " + this._characterId;
			var i:number = 0;
			var len:number = 0;
			if ((len=((this._characters.length) >>> 0)) > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Characters:";
				for (i = 0; i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this._characters[i].toString(indent + 4);
				}
			}
			if ((len=((this._actions.length) >>> 0)) > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Actions:";
				if ((flags & SWF.TOSTRING_FLAG_AVM1_BYTECODE) == 0) {
					for (i = 0; i < len; i++) {
						str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this._actions[i].toString(indent + 4);
					}
				} else {
					var context:ActionExecutionContext = new ActionExecutionContext(this._actions, [], this.labelCount);
					for (i = 0; i < len; i++) {
						str += "\n" + StringUtils.repeat(indent + 4) + this._actions[i].toBytecode(indent + 4, context);
					}
					if (context.endLabel != null) {
						str += "\n" + StringUtils.repeat(indent + 6) + context.endLabel + ":";
					}
				}
			}
			return str;
		}
	}

}