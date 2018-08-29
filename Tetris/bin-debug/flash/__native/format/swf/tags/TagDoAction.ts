/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../data/actions/IAction.ts" />
/// <reference path="../data/actions/ActionExecutionContext.ts" />
/// <reference path="../data/actions/Action.ts" />
/// <reference path="../SWFData.ts" />
/// <reference path="../SWF.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWF = flash.__native.format.swf.SWF;
	export import SWFData = flash.__native.format.swf.SWFData;
	export import Action = flash.__native.format.swf.data.actions.Action;
	export import ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagDoAction implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 12;
		
		protected _actions:IAction[] = undefined;
		
		protected labelCount:number = 0;
		
		constructor() {
			this._actions = new Array<IAction>();
			this.labelCount = 0;
		}
		
		public get actions():IAction[] { return this._actions; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			var action:IAction;
			while ((action = data.readACTIONRECORD()) != null) {
				this._actions.push(action);
			}
			this.labelCount = Action.resolveOffsets(this._actions);
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			for (var i:number = 0, len:number =  ((this._actions.length) >>> 0); i < len; i++) {
				body.writeACTIONRECORD(this._actions[i]);
			}
			body.writeUI8(0);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagDoAction.TYPE; }
		public get name():string { return "DoAction"; }
		public get version():number { return 3; }
		public get level():number { return 1; }
	
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var i:number = 0;
			var len:number = 0;
			var str:string = Tag.toStringCommon(this.type, this.name, indent) + "Records: " + this._actions.length;
			if ((flags & SWF.TOSTRING_FLAG_AVM1_BYTECODE) == 0) {
				for (i = 0, len = this._actions.length; i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 2) + "[" + i + "] " + this._actions[i].toString(indent + 2);
				}
			} else {
				var context:ActionExecutionContext = new ActionExecutionContext(this._actions, [], this.labelCount);
				for (i = 0, len = this._actions.length; i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 2) + this._actions[i].toBytecode(indent + 2, context);
				}
				if(context.endLabel != null) {
					str += "\n" + StringUtils.repeat(indent + 4) + context.endLabel + ":";
				}
			}
			return str;
		}
	}

}