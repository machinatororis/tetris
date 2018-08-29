/// <reference path="../../../../../../../base.d.ts" />
/// <reference path="../../../../../utils/StringUtils.ts" />
/// <reference path="../IAction.ts" />
/// <reference path="../ActionExecutionContext.ts" />
/// <reference path="../Action.ts" />
/// <reference path="../../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.actions.swf7
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	export import Action = flash.__native.format.swf.data.actions.Action;
	export import ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class ActionTry extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		public static CODE:number = 0x8f;
		
		public catchInRegisterFlag:boolean;
		public finallyBlockFlag:boolean;
		public catchBlockFlag:boolean;
		public catchName:string;
		public catchRegister:number;
		public tryBody:IAction[];
		public catchBody:IAction[];
		public finallyBody:IAction[];

		protected labelCountTry:number;
		protected labelCountCatch:number;
		protected labelCountFinally:number;

		constructor(code:number, length:number, pos:number)
		{
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this.catchInRegisterFlag === void 0 && (this.catchInRegisterFlag = false);
			/**/ this.finallyBlockFlag === void 0 && (this.finallyBlockFlag = false);
			/**/ this.catchBlockFlag === void 0 && (this.catchBlockFlag = false);
			/**/ this.catchName === void 0 && (this.catchName = null);
			/**/ this.catchRegister === void 0 && (this.catchRegister = 0);
			/**/ this.tryBody === void 0 && (this.tryBody = undefined);
			/**/ this.catchBody === void 0 && (this.catchBody = undefined);
			/**/ this.finallyBody === void 0 && (this.finallyBody = undefined);
			/**/ this.labelCountTry === void 0 && (this.labelCountTry = 0);
			/**/ this.labelCountCatch === void 0 && (this.labelCountCatch = 0);
			/**/ this.labelCountFinally === void 0 && (this.labelCountFinally = 0);
			super(code, length, pos);
			this.tryBody = new Array<IAction>();
			this.catchBody = new Array<IAction>();
			this.finallyBody = new Array<IAction>();
			this.labelCountTry = 0;
			this.labelCountCatch = 0;
			this.labelCountFinally = 0;
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var flags:number = data.readUI8();
			this.catchInRegisterFlag = ((flags & 0x04) != 0);
			this.finallyBlockFlag = ((flags & 0x02) != 0);
			this.catchBlockFlag = ((flags & 0x01) != 0);
			var trySize:number = data.readUI16();
			var catchSize:number = data.readUI16();
			var finallySize:number = data.readUI16();
			if (this.catchInRegisterFlag) {
				this.catchRegister = data.readUI8();
			} else {
				this.catchName = data.readString();
			}
			var tryEndPosition:number =  ((data.position + trySize) >>> 0);
			while (data.position < tryEndPosition) {
				this.tryBody.push(data.readACTIONRECORD());
			}
			var catchEndPosition:number =  ((data.position + catchSize) >>> 0);
			while (data.position < catchEndPosition) {
				this.catchBody.push(data.readACTIONRECORD());
			}
			var finallyEndPosition:number =  ((data.position + finallySize) >>> 0);
			while (data.position < finallyEndPosition) {
				this.finallyBody.push(data.readACTIONRECORD());
			}
			this.labelCountTry = Action.resolveOffsets(this.tryBody);
			this.labelCountCatch = Action.resolveOffsets(this.catchBody);
			this.labelCountFinally = Action.resolveOffsets(this.finallyBody);
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var i:number = 0;
			var body:SWFData = new SWFData();
			var flags:number = 0;
			if (this.catchInRegisterFlag) { flags |= 0x04; }
			if (this.finallyBlockFlag) { flags |= 0x02; }
			if (this.catchBlockFlag) { flags |= 0x01; }
			body.writeUI8(flags);
			var bodyTryActions:SWFData = new SWFData();
			for (i = 0; i < this.tryBody.length; i++) {
				bodyTryActions.writeACTIONRECORD(this.tryBody[i]);
			}
			var bodyCatchActions:SWFData = new SWFData();
			for (i = 0; i < this.catchBody.length; i++) {
				bodyCatchActions.writeACTIONRECORD(this.catchBody[i]);
			}
			var bodyFinallyActions:SWFData = new SWFData();
			for (i = 0; i < this.finallyBody.length; i++) {
				bodyFinallyActions.writeACTIONRECORD(this.finallyBody[i]);
			}
			body.writeUI16(bodyTryActions.length);
			body.writeUI16(bodyCatchActions.length);
			body.writeUI16(bodyFinallyActions.length);
			if (this.catchInRegisterFlag) {
				body.writeUI8(this.catchRegister);
			} else {
				body.writeString(this.catchName);
			}
			body.writeBytes(bodyTryActions);
			body.writeBytes(bodyCatchActions);
			body.writeBytes(bodyFinallyActions);
			this.write(data, body);
		}
		
		/*override*/ public clone():IAction {
			var i:number = 0;
			var action:ActionTry = new ActionTry(this.code, this.length, this.pos);
			action.catchInRegisterFlag = this.catchInRegisterFlag;
			action.finallyBlockFlag = this.finallyBlockFlag;
			action.catchBlockFlag = this.catchBlockFlag;
			action.catchName = this.catchName;
			action.catchRegister = this.catchRegister;
			for (i = 0; i < this.tryBody.length; i++) {
				action.tryBody.push(this.tryBody[i].clone());
			}
			for (i = 0; i < this.catchBody.length; i++) {
				action.catchBody.push(this.catchBody[i].clone());
			}
			for (i = 0; i < this.finallyBody.length; i++) {
				action.finallyBody.push(this.finallyBody[i].clone());
			}
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "[ActionTry] ";
			str += (this.catchInRegisterFlag) ? "Register: " + this.catchRegister : "Name: " + this.catchName;
			var i:number = 0;
			if (this.tryBody.length) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Try:";
				for (i = 0; i < this.tryBody.length; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this.tryBody[i].toString(indent + 4);
				}
			}
			if (this.catchBody.length) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Catch:";
				for (i = 0; i < this.catchBody.length; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this.catchBody[i].toString(indent + 4);
				}
			}
			if (this.finallyBody.length) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Finally:";
				for (i = 0; i < this.finallyBody.length; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this.finallyBody[i].toString(indent + 4);
				}
			}
			return str;
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			var str:string = this.lbl ? this.lbl + ":\n" : "";
			var lf:string = "";
			var i:number = 0;
			if (this.tryBody.length) {
				str += lf + StringUtils.repeat(indent + 2) + "try {";
				var contextTry:ActionExecutionContext = new ActionExecutionContext(this.tryBody, context.cpool.concat(), this.labelCountTry);
				for (i = 0; i < this.tryBody.length; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + this.tryBody[i].toBytecode(indent + 4, contextTry);
				}
				if(contextTry.endLabel != null) {
					str += "\n" + StringUtils.repeat(indent + 4) + contextTry.endLabel + ":";
				}
				str += "\n" + StringUtils.repeat(indent + 2) + "}";
				lf = "\n";
			}
			if (this.catchBody.length) {
				str += lf + StringUtils.repeat(indent + 2) + "catch(" + ((this.catchInRegisterFlag) ? "$" + this.catchRegister : this.catchName) + ") {";
				var contextCatch:ActionExecutionContext = new ActionExecutionContext(this.catchBody, context.cpool.concat(), this.labelCountCatch);
				for (i = 0; i < this.catchBody.length; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + this.catchBody[i].toBytecode(indent + 4, contextCatch);
				}
				if(contextCatch.endLabel != null) {
					str += "\n" + StringUtils.repeat(indent + 4) + contextCatch.endLabel + ":";
				}
				str += "\n" + StringUtils.repeat(indent + 2) + "}";
				lf = "\n";
			}
			if (this.finallyBody.length) {
				str += lf + StringUtils.repeat(indent + 2) + "finally {";
				var contextFinally:ActionExecutionContext = new ActionExecutionContext(this.finallyBody, context.cpool.concat(), this.labelCountFinally);
				for (i = 0; i < this.finallyBody.length; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + this.finallyBody[i].toBytecode(indent + 4, contextFinally);
				}
				if(contextFinally.endLabel != null) {
					str += "\n" + StringUtils.repeat(indent + 4) + contextFinally.endLabel + ":";
				}
				str += "\n" + StringUtils.repeat(indent + 2) + "}";
			}
			return str;
		}
	}

}