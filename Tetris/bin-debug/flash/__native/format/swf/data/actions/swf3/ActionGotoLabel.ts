/// <reference path="../../../../../../../base.d.ts" />
/// <reference path="../../../SWFData.ts" />
/// <reference path="../IAction.ts" />
/// <reference path="../ActionExecutionContext.ts" />
/// <reference path="../Action.ts" />
﻿
namespace flash.__native.format.swf.data.actions.swf3
{
	
	export import Action = flash.__native.format.swf.data.actions.Action;
	export import ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class ActionGotoLabel extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		public static CODE:number = 0x8c;
		
		public label:string;
		
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this.label === void 0 && (this.label = null);
			super(code, length, pos);
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.label = data.readString();
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var body:SWFData = new SWFData();
			body.writeString(this.label);
			this.write(data, body);
		}
		
		/*override*/ public clone():IAction {
			var action:ActionGotoLabel = new ActionGotoLabel(this.code, this.length, this.pos);
			action.label = this.label;
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return "[ActionGotoLabel] Label: " + this.label;
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			return this.toBytecodeLabel(indent) + "gotoLabel \"" + this.label + "\"";
		}
	}

}