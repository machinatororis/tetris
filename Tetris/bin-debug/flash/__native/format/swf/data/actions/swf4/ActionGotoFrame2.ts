/// <reference path="../../../../../../../base.d.ts" />
/// <reference path="../../../SWFData.ts" />
/// <reference path="../IAction.ts" />
/// <reference path="../ActionExecutionContext.ts" />
/// <reference path="../Action.ts" />
﻿
namespace flash.__native.format.swf.data.actions.swf4
{
	
	export import Action = flash.__native.format.swf.data.actions.Action;
	export import ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class ActionGotoFrame2 extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		public static CODE:number = 0x9f;
		
		public sceneBiasFlag:boolean;
		public playFlag:boolean;
		public sceneBias:number;
		
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this.sceneBiasFlag === void 0 && (this.sceneBiasFlag = false);
			/**/ this.playFlag === void 0 && (this.playFlag = false);
			/**/ this.sceneBias === void 0 && (this.sceneBias = 0);
			super(code, length, pos);
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var flags:number = data.readUI8();
			this.sceneBiasFlag = ((flags & 0x02) != 0);
			this.playFlag = ((flags & 0x01) != 0);
			if (this.sceneBiasFlag) {
				this.sceneBias = data.readUI16();
			}
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var body:SWFData = new SWFData();
			var flags:number = 0;
			if (this.sceneBiasFlag) { flags |= 0x02; }
			if (this.playFlag) { flags |= 0x01; }
			body.writeUI8(flags);
			if (this.sceneBiasFlag) { 
				body.writeUI16(this.sceneBias);
			}
			this.write(data, body);
		}
		
		/*override*/ public clone():IAction {
			var action:ActionGotoFrame2 = new ActionGotoFrame2(this.code, this.length, this.pos);
			action.sceneBiasFlag = this.sceneBiasFlag;
			action.playFlag = this.playFlag;
			action.sceneBias = this.sceneBias;
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "[ActionGotoFrame2] " +
				"PlayFlag: " + this.playFlag + ", ";
				"SceneBiasFlag: " + this.sceneBiasFlag;
			if (this.sceneBiasFlag) {
				str += ", " + this.sceneBias;
			}
			return str;
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			return this.toBytecodeLabel(indent) + "gotoFrame2 (" +
				(this.playFlag == 0 ? "gotoAndStop" : "gotoAndPlay") +
				(this.sceneBiasFlag == 1 ? ", sceneBias: " + this.sceneBias : "") +
				")";
		}
	}

}