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
	
	
	export  class TagDoInitAction extends TagDoAction implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE : number = 59;
		
		public spriteId : number;
		
		constructor()
		{
			/**/ this.spriteId === void 0 && (this.spriteId = 0);
			super(); 
			
		}
		
		/*override*/ public parse (data : SWFData, length : number, version : number, async : boolean = false) : void
		{
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.spriteId = data.readUI16();
			
			var action:IAction;
			while ((action = data.readACTIONRECORD()) != null) {
				
				this._actions.push(action);
				
			}
			
			this.labelCount = Action.resolveOffsets(this._actions);
		}

		/*override*/ public publish (data : SWFData, version : number) : void
		{
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.spriteId);
			for (var i:number = 0, len:number =  ((this._actions.length) >>> 0); i < len; i++) {
				body.writeACTIONRECORD(this._actions[i]);
			}
			body.writeUI8(0);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		/*override*/ public get type():number { return TagDoInitAction.TYPE; }
		/*override*/ public get name():string { return "DoInitAction"; }
		/*override*/ public get version():number { return 6; }
		/*override*/ public get level():number { return 1; }

		/*override*/ public toString(indent:number = 0, flags:number = 0):string
		{
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"SpriteID: " + this.spriteId + ", " +
				"Records: " + this._actions.length;
			var i:number = 0;
			var len:number = 0;
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