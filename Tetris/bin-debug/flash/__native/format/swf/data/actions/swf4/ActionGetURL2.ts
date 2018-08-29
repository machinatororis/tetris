/// <reference path="../../../../../../../base.d.ts" />
/// <reference path="../IAction.ts" />
/// <reference path="../ActionExecutionContext.ts" />
/// <reference path="../Action.ts" />
/// <reference path="../../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.actions.swf4
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	export import Action = flash.__native.format.swf.data.actions.Action;
	export import ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	
	
	export  class ActionGetURL2 extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		public static CODE:number = 0x9a;
		
		public sendVarsMethod:number;
		public reserved:number;
		public loadTargetFlag:boolean;
		public loadVariablesFlag:boolean;
		
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this.sendVarsMethod === void 0 && (this.sendVarsMethod = 0);
			/**/ this.reserved === void 0 && (this.reserved = 0);
			/**/ this.loadTargetFlag === void 0 && (this.loadTargetFlag = false);
			/**/ this.loadVariablesFlag === void 0 && (this.loadVariablesFlag = false);
			super(code, length, pos);
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.sendVarsMethod = data.readUB(2);
			this.reserved = data.readUB(4); // reserved, always 0
			this.loadTargetFlag = (data.readUB(1) == 1);
			this.loadVariablesFlag = (data.readUB(1) == 1);
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var body:SWFData = new SWFData();
			body.writeUB(2, this.sendVarsMethod);
			body.writeUB(4, this.reserved); // reserved, always 0
			body.writeUB(1, this.loadTargetFlag ? 1 : 0);
			body.writeUB(1, this.loadVariablesFlag ? 1 : 0);
			this.write(data, body);
		}
		
		/*override*/ public clone():IAction {
			var action:ActionGetURL2 = new ActionGetURL2(this.code, this.length, this.pos);
			action.sendVarsMethod = this.sendVarsMethod;
			action.reserved = this.reserved;
			action.loadTargetFlag = this.loadTargetFlag;
			action.loadVariablesFlag = this.loadVariablesFlag;
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return "[ActionGetURL2] " +
				"SendVarsMethod: " + this.sendVarsMethod + " (" + this.sendVarsMethodToString() + "), " +
				"Reserved: " + this.reserved + ", " +
				"LoadTargetFlag: " + this.loadTargetFlag + ", " +
				"LoadVariablesFlag: " + this.loadVariablesFlag;
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			return this.toBytecodeLabel(indent) + 
				"getUrl2 (method: " + this.sendVarsMethodToString() + ", target: " +
				(this.loadTargetFlag == 0 ? "window" : "sprite") + ", variables: " +
				(this.loadVariablesFlag == 0 ? "no" : "yes") + ")";
		}
		
		public sendVarsMethodToString():string {
			if (!this.sendVarsMethod) {
				return "None";
			}
			else if (this.sendVarsMethod == 1) {
				return "GET";
			}
			else if (this.sendVarsMethod == 2) {
				return "POST";
			}
			else {
				throw new Error("sendVarsMethod is only defined for values of 0, 1, and 2.");
			}
		}
	}

}