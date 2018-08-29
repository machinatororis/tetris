/// <reference path="../../../../../../../base.d.ts" />
/// <reference path="../../../../../utils/StringUtils.ts" />
/// <reference path="../IAction.ts" />
/// <reference path="../ActionExecutionContext.ts" />
/// <reference path="../Action.ts" />
/// <reference path="../../SWFRegisterParam.ts" />
/// <reference path="../../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.actions.swf7
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFRegisterParam = flash.__native.format.swf.data.SWFRegisterParam;
	export import Action = flash.__native.format.swf.data.actions.Action;
	export import ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
	export import IAction = flash.__native.format.swf.data.actions.IAction;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class ActionDefineFunction2 extends Action implements IAction
	{
		implements_flash___native_format_swf_data_actions_IAction = null;
		public static CODE:number = 0x8e;
		
		public functionName:string;
		public functionParams:SWFRegisterParam[];
		public functionBody:IAction[];
		public registerCount:number;
		
		public preloadParent:boolean;
		public preloadRoot:boolean;
		public preloadSuper:boolean;
		public preloadArguments:boolean;
		public preloadThis:boolean;
		public preloadGlobal:boolean;
		public suppressSuper:boolean;
		public suppressArguments:boolean;
		public suppressThis:boolean;
		
		protected labelCount:number;
		
		constructor(code:number, length:number, pos:number) {
			/**/ code = ((code) >>> 0); length = ((length) >>> 0); pos = ((pos) >>> 0);
			/**/ this.functionName === void 0 && (this.functionName = null);
			/**/ this.functionParams === void 0 && (this.functionParams = undefined);
			/**/ this.functionBody === void 0 && (this.functionBody = undefined);
			/**/ this.registerCount === void 0 && (this.registerCount = 0);
			/**/ this.preloadParent === void 0 && (this.preloadParent = false);
			/**/ this.preloadRoot === void 0 && (this.preloadRoot = false);
			/**/ this.preloadSuper === void 0 && (this.preloadSuper = false);
			/**/ this.preloadArguments === void 0 && (this.preloadArguments = false);
			/**/ this.preloadThis === void 0 && (this.preloadThis = false);
			/**/ this.preloadGlobal === void 0 && (this.preloadGlobal = false);
			/**/ this.suppressSuper === void 0 && (this.suppressSuper = false);
			/**/ this.suppressArguments === void 0 && (this.suppressArguments = false);
			/**/ this.suppressThis === void 0 && (this.suppressThis = false);
			/**/ this.labelCount === void 0 && (this.labelCount = 0);
			super(code, length, pos);
			this.functionParams = new Array<SWFRegisterParam>();
			this.functionBody = new Array<IAction>();
			this.labelCount = 0;
		}
		
		/*override*/ public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.functionName = data.readString();
			var numParams:number = data.readUI16();
			this.registerCount = data.readUI8();
			var flags1:number = data.readUI8();
			this.preloadParent = ((flags1 & 0x80) != 0);
			this.preloadRoot = ((flags1 & 0x40) != 0);
			this.suppressSuper = ((flags1 & 0x20) != 0);
			this.preloadSuper = ((flags1 & 0x10) != 0);
			this.suppressArguments = ((flags1 & 0x08) != 0);
			this.preloadArguments = ((flags1 & 0x04) != 0);
			this.suppressThis = ((flags1 & 0x02) != 0);
			this.preloadThis = ((flags1 & 0x01) != 0);
			var flags2:number = data.readUI8();
			this.preloadGlobal = ((flags2 & 0x01) != 0);
			for (var i:number = 0; i < numParams; i++) {
				this.functionParams.push(data.readREGISTERPARAM());
			}
			var codeSize:number = data.readUI16();
			var bodyEndPosition:number =  ((data.position + codeSize) >>> 0);
			while (data.position < bodyEndPosition) {
				this.functionBody.push(data.readACTIONRECORD());
			}
			this.labelCount = Action.resolveOffsets(this.functionBody);
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var i:number = 0;
			var body:SWFData = new SWFData();
			body.writeString(this.functionName);
			body.writeUI16(this.functionParams.length);
			body.writeUI8(this.registerCount);
			var flags1:number = 0;
			if (this.preloadParent) { flags1 |= 0x80; }
			if (this.preloadRoot) { flags1 |= 0x40; }
			if (this.suppressSuper) { flags1 |= 0x20; }
			if (this.preloadSuper) { flags1 |= 0x10; }
			if (this.suppressArguments) { flags1 |= 0x08; }
			if (this.preloadArguments) { flags1 |= 0x04; }
			if (this.suppressThis) { flags1 |= 0x02; }
			if (this.preloadThis) { flags1 |= 0x01; }
			body.writeUI8(flags1);
			var flags2:number = 0;
			if (this.preloadGlobal) { flags2 |= 0x01; }
			body.writeUI8(flags2);
			for (i = 0; i < this.functionParams.length; i++) {
				body.writeREGISTERPARAM(this.functionParams[i]);
			}
			var bodyActions:SWFData = new SWFData();
			for (i = 0; i < this.functionBody.length; i++) {
				bodyActions.writeACTIONRECORD(this.functionBody[i]);
			}
			body.writeUI16(bodyActions.length);
			this.write(data, body);
			data.writeBytes(bodyActions);
		}
		
		/*override*/ public clone():IAction {
			var i:number = 0;
			var action:ActionDefineFunction2 = new ActionDefineFunction2(this.code, this.length, this.pos);
			action.functionName = this.functionName;
			for (i = 0; i < this.functionParams.length; i++) {
				action.functionParams.push(this.functionParams[i]);
			}
			for (i = 0; i < this.functionBody.length; i++) {
				action.functionBody.push(this.functionBody[i].clone());
			}
			action.registerCount = this.registerCount;
			action.preloadParent = this.preloadParent;
			action.preloadRoot = this.preloadRoot;
			action.preloadSuper = this.preloadSuper;
			action.preloadArguments = this.preloadArguments;
			action.preloadThis = this.preloadThis;
			action.preloadGlobal = this.preloadGlobal;
			action.suppressSuper = this.suppressSuper;
			action.suppressArguments = this.suppressArguments;
			action.suppressThis = this.suppressThis;
			return action;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "[ActionDefineFunction2] " + 
				((this.functionName == null || this.functionName.length == 0) ? "<anonymous>" : this.functionName) +
				"(" + this.functionParams.join(", ") + "), ";
			var a:any[] = [];
			if (this.preloadParent) { a.push("preloadParent"); }
			if (this.preloadRoot) { a.push("preloadRoot"); }
			if (this.preloadSuper) { a.push("preloadSuper"); }
			if (this.preloadArguments) { a.push("preloadArguments"); }
			if (this.preloadThis) { a.push("preloadThis"); }
			if (this.preloadGlobal) { a.push("preloadGlobal"); }
			if (this.suppressSuper) { a.push("suppressSuper"); }
			if (this.suppressArguments) { a.push("suppressArguments"); }
			if (this.suppressThis) { a.push("suppressThis"); }
			if (a.length == 0) { a.push("none"); }
			str += "Flags: " + a.join(",");
			for (var i:number = 0; i < this.functionBody.length; i++) {
				str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this.functionBody[i].toString(indent + 4);
			}
			return str;
		}
		
		/*override*/ public toBytecode(indent:number, context:ActionExecutionContext):string {
			/**/ indent = ((indent) >>> 0); context = strict(context, ActionExecutionContext);
			var str:string = this.toBytecodeLabel(indent) + "defineFunction2 " + 
				((this.functionName == null || this.functionName.length == 0) ? "" : this.functionName) +
				"(" + this.functionParams.join(", ") + ") {";
			var preload:any[] = [];
			var suppress:any[] = [];
			if (this.preloadParent) { preload.push("parent"); }
			if (this.preloadRoot) { preload.push("root"); }
			if (this.preloadSuper) { preload.push("super"); }
			if (this.preloadArguments) { preload.push("arguments"); }
			if (this.preloadThis) { preload.push("this"); }
			if (this.preloadGlobal) { preload.push("global"); }
			if (this.suppressSuper) { suppress.push("super"); }
			if (this.suppressArguments) { suppress.push("arguments"); }
			if (this.suppressThis) { suppress.push("this"); }
			if (preload.length > 0) {
				str += "\n" + StringUtils.repeat(indent + 4) + "// preload: " + preload.join(", ");
			}
			if (suppress.length > 0) {
				str += "\n" + StringUtils.repeat(indent + 4) + "// suppress: " + suppress.join(", ");
			}
			var context:ActionExecutionContext = new ActionExecutionContext(this.functionBody, context.cpool.concat(), this.labelCount);
			for (var i:number = 0; i < this.functionBody.length; i++) {
				if(this.functionBody[i]) {
					str += "\n" + StringUtils.repeat(indent + 4) + this.functionBody[i].toBytecode(indent + 4, context);
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