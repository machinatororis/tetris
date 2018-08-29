/// <reference path="../../../../../../base.d.ts" />

namespace flash.__native.format.swf.data.actions
{
	
	export  class ActionExecutionContext
	{
		protected _actions:IAction[] = undefined;
		protected _cpool:any[] = null;
		
		public labelCount:number = 0;
		public endLabel:string = null;
		
		constructor(actions:IAction[], cpool:any[], labelCount:number)
		{
			/**/ cpool = strict(cpool, Array); labelCount = ((labelCount) >>> 0);
			this._actions = this.actions;
			this._cpool = cpool;
			
			this.labelCount = labelCount;
			this.endLabel = null;
			
			for(var i:number = 0; i < actions.length; i++) {
				var action:IAction =  strict(actions[i], 'implements_flash___native_format_swf_data_actions_IAction');
				if (is(action , 'implements_flash___native_format_swf_data_actions_IActionBranch')) {
					var actionBranch:IActionBranch = as(action , 'implements_flash___native_format_swf_data_actions_IActionBranch');
					if(actionBranch.branchIndex == -1) {
						this.endLabel = "L" + (labelCount + 1);
						break;
					}
				}
			}
		}

		public get actions():IAction[] { return this._actions; }
		public get cpool():any[] { return this._cpool; }
	}
}