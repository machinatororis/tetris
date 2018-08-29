/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.actions
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class ActionUnknown extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			super(code, length, pos);
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			if (this._length > 0) {
				data.skipBytes(this._length);
			}
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return "[????] Code: " + this._code.toString(16) + ", Length: " + this._length;
		}
	}

}