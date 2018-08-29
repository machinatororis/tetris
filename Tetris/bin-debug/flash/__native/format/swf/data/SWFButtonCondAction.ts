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
	
	
	export  class SWFButtonCondAction
	{
		public condActionSize:number = 0;
		public condIdleToOverDown:boolean = false;
		public condOutDownToIdle:boolean = false;
		public condOutDownToOverDown:boolean = false;
		public condOverDownToOutDown:boolean = false;
		public condOverDownToOverUp:boolean = false;
		public condOverUpToOverDown:boolean = false;
		public condOverUpToIdle:boolean = false;
		public condIdleToOverUp:boolean = false;
		public condOverDownToIdle:boolean = false;
		public condKeyPress:number = 0;

		protected _actions:IAction[] = undefined;
		
		protected labelCount:number = 0;
		
		constructor(data:SWFData = null) {
			/**/ data = strict(data, SWFData);
			this._actions = new Array<IAction>();
			if (data != null) {
				this.parse(data);
			}
		}
		
		public get actions():IAction[] { return this._actions; }
		
		public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var flags:number =  (((data.readUI8() << 8) | data.readUI8()) >>> 0);
			this.condIdleToOverDown = ((flags & 0x8000) != 0);
			this.condOutDownToIdle = ((flags & 0x4000) != 0);
			this.condOutDownToOverDown = ((flags & 0x2000) != 0);
			this.condOverDownToOutDown = ((flags & 0x1000) != 0);
			this.condOverDownToOverUp = ((flags & 0x0800) != 0);
			this.condOverUpToOverDown = ((flags & 0x0400) != 0);
			this.condOverUpToIdle = ((flags & 0x0200) != 0);
			this.condIdleToOverUp = ((flags & 0x0100) != 0);
			this.condOverDownToIdle = ((flags & 0x0001) != 0);
			this.condKeyPress =(( (flags & 0xff) >> 1) >>> 0);
			var action:IAction;
			while ((action = data.readACTIONRECORD()) != null) {
				this._actions.push(action);
			}
			this.labelCount = Action.resolveOffsets(this._actions);
		}
		
		public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var flags1:number = 0;
			if(this.condIdleToOverDown) { flags1 |= 0x80; }
			if(this.condOutDownToIdle) { flags1 |= 0x40; }
			if(this.condOutDownToOverDown) { flags1 |= 0x20; }
			if(this.condOverDownToOutDown) { flags1 |= 0x10; }
			if(this.condOverDownToOverUp) { flags1 |= 0x08; }
			if(this.condOverUpToOverDown) { flags1 |= 0x04; }
			if(this.condOverUpToIdle) { flags1 |= 0x02; }
			if(this.condIdleToOverUp) { flags1 |= 0x01; }
			data.writeUI8(flags1);
			var flags2:number =  ((this.condKeyPress << 1) >>> 0);
			if(this.condOverDownToIdle) { flags2 |= 0x01; }
			data.writeUI8(flags2);
			for(var i:number = 0; i < this.actions.length; i++) {
				data.writeACTIONRECORD(this.actions[i]);
			}
			data.writeUI8(0);
		}
		
		public clone():SWFButtonCondAction {
			var condAction:SWFButtonCondAction = new SWFButtonCondAction();
			condAction.condActionSize = this.condActionSize;
			condAction.condIdleToOverDown = this.condIdleToOverDown;
			condAction.condOutDownToIdle = this.condOutDownToIdle;
			condAction.condOutDownToOverDown = this.condOutDownToOverDown;
			condAction.condOverDownToOutDown = this.condOverDownToOutDown;
			condAction.condOverDownToOverUp = this.condOverDownToOverUp;
			condAction.condOverUpToOverDown = this.condOverUpToOverDown;
			condAction.condOverUpToIdle = this.condOverUpToIdle;
			condAction.condIdleToOverUp = this.condIdleToOverUp;
			condAction.condOverDownToIdle = this.condOverDownToIdle;
			condAction.condKeyPress = this.condKeyPress;
			for(var i:number = 0; i < this.actions.length; i++) {
				condAction.actions.push(this.actions[i].clone());
			}
			return condAction;
		}
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var a:any[] = [];
			if (this.condIdleToOverDown) { a.push("idleToOverDown"); }
			if (this.condOutDownToIdle) { a.push("outDownToIdle"); }
			if (this.condOutDownToOverDown) { a.push("outDownToOverDown"); }
			if (this.condOverDownToOutDown) { a.push("overDownToOutDown"); }
			if (this.condOverDownToOverUp) { a.push("overDownToOverUp"); }
			if (this.condOverUpToOverDown) { a.push("overUpToOverDown"); }
			if (this.condOverUpToIdle) { a.push("overUpToIdle"); }
			if (this.condIdleToOverUp) { a.push("idleToOverUp"); }
			if (this.condOverDownToIdle) { a.push("overDownToIdle"); }
			var str:string = "CondActionRecord (" + a.join(", ") + ")";
			if (this.condKeyPress > 0) {
				str += ", KeyPress: " + this.condKeyPress;
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