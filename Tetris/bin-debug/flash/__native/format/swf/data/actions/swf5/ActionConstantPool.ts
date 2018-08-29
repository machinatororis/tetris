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
	
	
	export  class ActionConstantPool extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		public static CODE:number = 0x88;
		
		public constants:string[];
		
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this.constants === void 0 && (this.constants = undefined);
			super(code, length, pos);
			this.constants = new Array<string>();
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var count:number = data.readUI16();
			for (var i:number = 0; i < count; i++) {
				this.constants.push(data.readString());
			}
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var body:SWFData = new SWFData();
			body.writeUI16(this.constants.length);
			for (var i:number = 0; i < this.constants.length; i++) {
				body.writeString(this.constants[i]);
			}
			this.write(data, body);
		}
		
		/*override*/ public clone():IAction {
			var action:ActionConstantPool = new ActionConstantPool(this.code, this.length, this.pos);
			for (var i:number = 0; i < this.constants.length; i++) {
				action.constants.push(this.constants[i]);
			}
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "[ActionConstantPool] Values: " + this.constants.length;
			for (var i:number = 0; i < this.constants.length; i++) {
				str += "\n" + StringUtils.repeat(indent + 4) + i + ": " + StringUtils.simpleEscape(this.constants[i]);
			}
			return str;
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			var str:string = this.toBytecodeLabel(indent) + "constantPool";
			context.cpool.length = 0;
			for (var i:number = 0; i < this.constants.length; i++) {
				str += "\n" + StringUtils.repeat(indent + 4) + i + ": " + StringUtils.simpleEscape(this.constants[i]);
				context.cpool.push(this.constants[i]);
			}
			return str;
		}
	}

}