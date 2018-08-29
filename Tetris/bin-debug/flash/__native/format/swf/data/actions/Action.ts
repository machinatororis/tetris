/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../utils/StringUtils.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.actions
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		protected _code:number = 0;
		protected _length:number = 0;
		protected _pos:number = 0;
		protected _lbl:string = null;
		
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			this._code = code;
			this._length = length;
			this._pos = pos;
			this._lbl = null;
		}

		public get code():number { return this._code; }
		public get length():number { return this._length; }
		public get lengthWithHeader():number { return this._length + (this._code >= 0x80 ? 3 : 1); }
		public get pos():number { return this._pos; }

		public get lbl():string { return this._lbl; }
		public set lbl(value:string) { /**/ value = as(value, 'String'); this._lbl = value; }

		public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			// Do nothing. Many Actions don't have a payload. 
			// For the ones that have one we override this method.
		}
		
		public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.write(data);
		}
		
		public clone():IAction {
			return new Action(this.code, this.length, this.pos);
		}
		
		protected write(data:SWFData, body:SWFData = null):void {
			/**/ data = strict(data, SWFData); body = strict(body, SWFData);
			data.writeUI8(this.code);
			if (this.code >= 0x80) {
				if (body != null && body.length > 0) {
					this._length = body.length;
					data.writeUI16(this._length);
					data.writeBytes(body);
				} else {
					this._length = 0;
					throw(new Error("Action body null or empty."));
				}
			} else {
				this._length = 0;
			}
		}
		
		public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return "[Action] Code: " + this._code.toString(16) + ", Length: " + this._length;
		}
		
		public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			return this.toBytecodeLabel(indent) + "unknown (0x" + this._code.toString(16) + ")";
		}
		
		public toBytecodeLabel(indent:number):string {
			/**/ indent = ((indent) >>> 0);
			if (this.lbl != null) {
				return this.lbl + ":\n" + StringUtils.repeat(indent + 2);
			} else {
				return StringUtils.repeat(2);
			}
		}
		
		public static resolveOffsets(actions:IAction[]):number {
			var labelNr:number = 1;
			var labelCount:number = 0;
			var action:IAction;
			var n:number =  ((actions.length) >>> 0);
			var i:number = 0;
			for (i = 0; i < n; i++) {
				action =strict( actions[i], 'implements_flash___native_format_swf_data_actions_IAction');
				if (is(action , 'implements_flash___native_format_swf_data_actions_IActionBranch')) {
					var j:number = 0;
					var found:boolean = false;
					var actionBranch:IActionBranch = as(action , 'implements_flash___native_format_swf_data_actions_IActionBranch');
					var targetPos:number =  ((actionBranch.pos + actionBranch.lengthWithHeader + actionBranch.branchOffset) >>> 0);
					if (targetPos <= actionBranch.pos) {
						for (j = i; j >= 0; j--) {
							if (targetPos == actions[j].pos) {
								labelCount++;
								found = true;
								break;
							}
						}
					} else {
						for (j = i + 1; j < n; j++) {
							if (targetPos == actions[j].pos) {
								labelCount++;
								found = true;
								break;
							}
						}
						if (!found) {
							action =strict( actions[j - 1], 'implements_flash___native_format_swf_data_actions_IAction');
							if (targetPos == action.pos + action.lengthWithHeader) {
								j = -1; // End of execution block
								found = true;
							}
						}
					}
					if (found) {
						actionBranch.branchIndex = j;
						if (j >= 0) {
							action =strict( actions[j], 'implements_flash___native_format_swf_data_actions_IAction');
							action.lbl = "L";
						}
					} else {
						actionBranch.branchIndex = -2;
					}
				}
			}
			for (i = 0; i < n; i++) {
				action =strict( actions[i], 'implements_flash___native_format_swf_data_actions_IAction');
				if (action.lbl != null) {
					action.lbl += labelNr++;
				}
			}
			return labelCount;
		}
	}

}