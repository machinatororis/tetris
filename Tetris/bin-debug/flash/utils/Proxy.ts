/// <reference path="../../base.d.ts" />
/// <reference path="../events/EventDispatcher.ts" />

namespace flash.utils
{
	
	export import EventDispatcher = flash.events.EventDispatcher;
	
	
	export  class Proxy extends EventDispatcher
	{
		
		private valueMap:any = {};
		
		public getProperty(propName:any):any
		{
			return this.valueMap[propName];
		}
		
		public setProperty(propName:any, value:any):void
		{
			this.valueMap[propName] = value;
		}
		
		public hasProperty(propName:any):boolean
		{
			return this.valueMap.hasOwnProperty(propName);
		}
		
		public deleteProperty(propName:any):void
		{
			delete this.valueMap[propName];
		}
		
		public elementNames():any[]
		{
			var names:any[] = [];
			var __for0 = window.asc.in(this.valueMap);
			for (var p of __for0)
				names.push(p);
			return names;
		}
	}


}