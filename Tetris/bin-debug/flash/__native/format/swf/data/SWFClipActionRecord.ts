/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="actions/IAction.ts" />
/// <reference path="actions/ActionExecutionContext.ts" />
/// <reference path="actions/Action.ts" />
/// <reference path="../SWFData.ts" />
/// <reference path="../SWF.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWF = flash.__native.format.swf.SWF;
	export import SWFData = flash.__native.format.swf.SWFData;
	export import Action = flash.__native.format.swf.data.actions.Action;
	export import ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class SWFClipActionRecord
	{
		public eventFlags:SWFClipEventFlags = null;
		public keyCode:number = 0;
		
		protected _actions:IAction[] = undefined;
		
		protected labelCount:number = 0;
		
		constructor(data:SWFData = null, version:number = 0) {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			this._actions = new Array<IAction>();
			if (data != null) {
				this.parse(data, version);
			}
		}
		
		public get actions():IAction[] { return this._actions; }
		
		public parse(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			this.eventFlags = data.readCLIPEVENTFLAGS(version);
			data.readUI32(); // actionRecordSize, not needed here
			if (this.eventFlags.keyPressEvent) {
				this.keyCode = data.readUI8();
			}
			var action:IAction;
			while ((action = data.readACTIONRECORD()) != null) {
				this._actions.push(action);
			}
			this.labelCount = Action.resolveOffsets(this._actions);
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeCLIPEVENTFLAGS(this.eventFlags, version);
			var actionBlock:SWFData = new SWFData();
			if (this.eventFlags.keyPressEvent) {
				actionBlock.writeUI8(this.keyCode);
			}
			for(var i:number = 0; i < this.actions.length; i++) {
				actionBlock.writeACTIONRECORD(this.actions[i])
			}
			actionBlock.writeUI8(0);
			data.writeUI32(actionBlock.length); // actionRecordSize
			data.writeBytes(actionBlock);
		}
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = "ClipActionRecord (" + this.eventFlags.toString() + ")";
			if (this.keyCode > 0) {
				str += ", KeyCode: " + this.keyCode;
			}
			if ((flags & SWF.TOSTRING_FLAG_AVM1_BYTECODE) == 0) {
				for (var i:number = 0; i < this._actions.length; i++) {
					str += "\n" + StringUtils.repeat(indent + 2) + "[" + i + "] " + this._actions[i].toString(indent + 2);
				}
			} else {
				var context:ActionExecutionContext = new ActionExecutionContext(this._actions, [], this.labelCount);
				for (i = 0; i < this._actions.length; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + this._actions[i].toBytecode(indent + 4, context);
				}
				if(context.endLabel != null) {
					str += "\n" + StringUtils.repeat(indent + 4) + context.endLabel + ":";
				}
			}
			return str;
		}
	}

}