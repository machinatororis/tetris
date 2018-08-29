/// <reference path="../../../../../../../base.d.ts" />
/// <reference path="../../../../../utils/StringUtils.ts" />
/// <reference path="../IAction.ts" />
/// <reference path="../ActionExecutionContext.ts" />
/// <reference path="../Action.ts" />
/// <reference path="../../SWFActionValue.ts" />
/// <reference path="../../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.actions.swf4
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFActionValue = flash.__native.format.swf.data.SWFActionValue;
	export import Action = flash.__native.format.swf.data.actions.Action;
	export import ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class ActionPush extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		public static CODE:number = 0x96;
		
		public values:SWFActionValue[];
		
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this.values === void 0 && (this.values = undefined);
			super(code, length, pos);
			this.values = new Array<SWFActionValue>();
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var endPosition:number =  ((data.position + this.length) >>> 0);
			while (data.position != endPosition) {
				this.values.push(data.readACTIONVALUE());
			}
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var body:SWFData = new SWFData();
			for (var i:number = 0; i < this.values.length; i++) {
				body.writeACTIONVALUE(this.values[i]);
			}
			this.write(data, body);
		}
		
		/*override*/ public clone():IAction {
			var action:ActionPush = new ActionPush(this.code, this.length, this.pos);
			for (var i:number = 0; i < this.values.length; i++) {
				action.values.push(this.values[i].clone());
			}
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return "[ActionPush] " + this.values.join(", ");
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			var str:string = this.toBytecodeLabel(indent);
			for (var i:number = 0; i < this.values.length; i++) {
				if (i > 0) {
					str += "\n" + StringUtils.repeat(indent + 2);
				}
				str += "push " + this.values[i].toBytecodeString(context.cpool);
			}
			return str;
		}
	}

}