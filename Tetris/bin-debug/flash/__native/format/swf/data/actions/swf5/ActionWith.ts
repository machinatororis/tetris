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
	
	
	export  class ActionWith extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		public static CODE:number = 0x94;
		
		public withBody:IAction[];
		
		protected labelCount:number;
		
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this.withBody === void 0 && (this.withBody = undefined);
			/**/ this.labelCount === void 0 && (this.labelCount = 0);
			super(code, length, pos);
			this.withBody = new Array<IAction>();
			this.labelCount = 0;
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var codeSize:number = data.readUI16();
			var bodyEndPosition:number =  ((data.position + codeSize) >>> 0);
			while (data.position < bodyEndPosition) {
				this.withBody.push(data.readACTIONRECORD());
			}
			this.labelCount = Action.resolveOffsets(this.withBody);
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var body:SWFData = new SWFData();
			var bodyActions:SWFData = new SWFData();
			for (var i:number = 0; i < this.withBody.length; i++) {
				bodyActions.writeACTIONRECORD(this.withBody[i]);
			}
			body.writeUI16(bodyActions.length);
			body.writeBytes(bodyActions);
			this.write(data, body);
		}
		
		/*override*/ public clone():IAction {
			var action:ActionWith = new ActionWith(this.code, this.length, this.pos);
			for (var i:number = 0; i < this.withBody.length; i++) {
				action.withBody.push(this.withBody[i].clone());
			}
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "[ActionWith]";
			for (var i:number = 0; i < this.withBody.length; i++) {
				str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this.withBody[i].toString(indent + 4);
			}
			return str;
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			var str:string = this.toBytecodeLabel(indent) + "with {"; 
			var context:ActionExecutionContext = new ActionExecutionContext(this.withBody, context.cpool.concat(), this.labelCount);
			for (var i:number = 0; i < this.withBody.length; i++) {
				if(this.withBody[i]) {
					str += "\n" + StringUtils.repeat(indent + 4) + this.withBody[i].toBytecode(indent + 4, context);
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