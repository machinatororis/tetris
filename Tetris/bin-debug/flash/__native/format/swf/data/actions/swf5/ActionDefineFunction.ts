/// <reference path="../../../../../../../base.d.ts" />
/// <reference path="../../../../../utils/StringUtils.ts" />
/// <reference path="../IAction.ts" />
/// <reference path="../ActionExecutionContext.ts" />
/// <reference path="../Action.ts" />
/// <reference path="../../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.actions.swf5
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	export import Action = flash.__native.format.swf.data.actions.Action;
	export import ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class ActionDefineFunction extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		public static CODE:number = 0x9b;
		
		public functionName:string;
		public functionParams:string[];
		public functionBody:IAction[];
		
		protected labelCount:number;
		
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this.functionName === void 0 && (this.functionName = null);
			/**/ this.functionParams === void 0 && (this.functionParams = undefined);
			/**/ this.functionBody === void 0 && (this.functionBody = undefined);
			/**/ this.labelCount === void 0 && (this.labelCount = 0);
			super(code, length, pos);
			this.functionParams = new Array<string>();
			this.functionBody = new Array<IAction>();
			this.labelCount = 0;
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.functionName = data.readString();
			var count:number = data.readUI16();
			for (var i:number = 0; i < count; i++) {
				this.functionParams.push(data.readString());
			}
			var codeSize:number = data.readUI16();
			var bodyEndPosition:number =  ((data.position + codeSize) >>> 0);
			while (data.position < bodyEndPosition) {
				this.functionBody.push(data.readACTIONRECORD());
			}
			this.labelCount = Action.resolveOffsets(this.functionBody);
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var i:number = 0;
			var body:SWFData = new SWFData();
			body.writeString(this.functionName);
			body.writeUI16(this.functionParams.length);
			for (i = 0; i < this.functionParams.length; i++) {
				body.writeString(this.functionParams[i]);
			}
			var bodyActions:SWFData = new SWFData();
			for (i = 0; i < this.functionBody.length; i++) {
				bodyActions.writeACTIONRECORD(this.functionBody[i]);
			}
			body.writeUI16(bodyActions.length);
			this.write(data, body);
			data.writeBytes(bodyActions);
		}
		
		/*override*/ public clone():IAction {
			var i:number = 0;
			var action:ActionDefineFunction = new ActionDefineFunction(this.code, this.length, this.pos);
			action.functionName = this.functionName;
			for (i = 0; i < this.functionParams.length; i++) {
				action.functionParams.push(this.functionParams[i]);
			}
			for (i = 0; i < this.functionBody.length; i++) {
				action.functionBody.push(this.functionBody[i].clone());
			}
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "[ActionDefineFunction] " + 
				((this.functionName == null || this.functionName.length == 0) ? "<anonymous>" : this.functionName) +
				"(" + this.functionParams.join(", ") + ")";
			for (var i:number = 0; i < this.functionBody.length; i++) {
				if(this.functionBody[i]) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this.functionBody[i].toString(indent + 4);
				}
			}
			return str;
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			var str:string = this.toBytecodeLabel(indent) + "defineFunction " + 
				((this.functionName == null || this.functionName.length == 0) ? "" : this.functionName) +
				"(" + this.functionParams.join(", ") + ") {";
			var context:ActionExecutionContext = new ActionExecutionContext(this.functionBody, context.cpool.concat(), this.labelCount);
			for (var i:number = 0; i < this.functionBody.length; i++) {
				if(this.functionBody[i]) {
					str += "\n" + StringUtils.repeat(indent + 4) + this.functionBody[i].toBytecode(indent + 4, context);
				}
			}
			if(context.endLabel != null) {
				str += "\n" + StringUtils.repeat(indent + 4) + context.endLabel + ":";
			}
			str += "\n" + StringUtils.repeat(indent + 2) + "}";
			return str;
		}
	}

}