/// <reference path="../../../../../../../base.d.ts" />
/// <reference path="../IActionBranch.ts" />
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
	export import IActionBranch = flash.__native.format.swf.data.actions.IActionBranch;
	
	
	export  class ActionIf extends Action implements IActionBranch
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		implements_flash___native_format_swf_data_actions_IActionBranch = null;
		public static CODE:number = 0x9d;
		
		protected _branchOffset:number;

		// branchIndex is resolved in TagDoAction::parse()
		protected _branchIndex:number;

		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this._branchOffset === void 0 && (this._branchOffset = 0);
			/**/ this._branchIndex === void 0 && (this._branchIndex = -2);
			super(code, length, pos);
		}

		public get branchOffset():number { return this._branchOffset; }
		public set branchOffset(value:number) { /**/ value = ((value) >> 0); this._branchOffset = value; }
		
		public get branchIndex():number { return this._branchIndex; }
		public set branchIndex(value:number) { /**/ value = ((value) >> 0); this._branchIndex = value; }

		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this._branchOffset = data.readSI16();
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var body:SWFData = new SWFData();
			body.writeSI16(this._branchOffset);
			this.write(data, body);
		}
		
		/*override*/ public clone():IAction {
			var action:ActionIf = new ActionIf(this.code, this.length, this.pos);
			action.branchOffset = this._branchOffset;
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var bi:string = " [";
			if (this._branchIndex >= 0) {
				bi += this._branchIndex.toString();
			} else if (this._branchIndex == -1) {
				bi += "EOB";
			} else {
				bi += "???";
			}
			bi += "]";
			return "[ActionIf] BranchOffset: " + this.branchOffset + bi;
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			var ls:string = "";
			if (this._branchIndex >= 0) {
				ls += context.actions[this._branchIndex].lbl;
			} else if (this._branchIndex == -1) {
				ls += "L" + (context.labelCount + 1);
			} else {
				ls += "ILLEGAL BRANCH";
			}
			return this.toBytecodeLabel(indent) + "if " + ls;
		}
	}

}