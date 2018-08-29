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
	
	
	export  class ActionWaitForFrame extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		public static CODE:number = 0x8a;
		
		public frame:number;
		public skipCount:number;
		
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this.frame === void 0 && (this.frame = 0);
			/**/ this.skipCount === void 0 && (this.skipCount = 0);
			super(code, length, pos);
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.frame = data.readUI16();
			this.skipCount = data.readUI8();
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var body:SWFData = new SWFData();
			body.writeUI16(this.frame);
			body.writeUI8(this.skipCount);
			this.write(data, body);
		}
		
		/*override*/ public clone():IAction {
			var action:ActionWaitForFrame = new ActionWaitForFrame(this.code, this.length, this.pos);
			action.frame = this.frame;
			action.skipCount = this.skipCount;
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return "[ActionWaitForFrame] Frame: " + this.frame + ", SkipCount: " + this.skipCount;
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			return this.toBytecodeLabel(indent) + "waitForFrame " + this.frame + (this.skipCount > 0 ? ", " + this.skipCount : "");
		}
	}

}