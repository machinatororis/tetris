/// <reference path="../../../../../../../base.d.ts" />
/// <reference path="../IAction.ts" />
/// <reference path="../ActionExecutionContext.ts" />
/// <reference path="../Action.ts" />
/// <reference path="../../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.actions.swf3
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	export import Action = flash.__native.format.swf.data.actions.Action;
	export import ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	
	
	export  class ActionGetURL extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		public static CODE:number = 0x83;
		
		public urlString:string;
		public targetString:string;
		
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this.urlString === void 0 && (this.urlString = null);
			/**/ this.targetString === void 0 && (this.targetString = null);
			super(code, length, pos);
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.urlString = data.readString();
			this.targetString = data.readString();
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var body:SWFData = new SWFData();
			body.writeString(this.urlString);
			body.writeString(this.targetString);
			this.write(data, body);
		}
		
		/*override*/ public clone():IAction {
			var action:ActionGetURL = new ActionGetURL(this.code, this.length, this.pos);
			action.urlString = this.urlString;
			action.targetString = this.targetString;
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return "[ActionGetURL] URL: " + this.urlString + ", Target: " + this.targetString;
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			return this.toBytecodeLabel(indent) + "getURL \"" + this.urlString + "\", \"" + this.targetString + "\"";
		}
	}

}