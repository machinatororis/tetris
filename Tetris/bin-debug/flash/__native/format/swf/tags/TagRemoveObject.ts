/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagRemoveObject implements IDisplayListTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDisplayListTag = null;
		public static TYPE:number = 5;
		
		public characterId:number = 0;
		public depth:number = 0;
		
		constructor() {}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.characterId = data.readUI16();
			this.depth = data.readUI16();
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, 4);
			data.writeUI16(this.characterId);
			data.writeUI16(this.depth);
		}
		
		public get type():number { return TagRemoveObject.TYPE; }
		public get name():string { return "RemoveObject"; }
		public get version():number { return 1; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"CharacterID: " + this.characterId + ", " +
				"Depth: " + this.depth;
		}
	}

}