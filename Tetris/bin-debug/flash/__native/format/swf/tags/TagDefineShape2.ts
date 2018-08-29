/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagDefineShape2 extends TagDefineShape implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 22;
		
		constructor() {
			super(); }
		
		/*override*/ public get type():number { return TagDefineShape2.TYPE; }
		/*override*/ public get name():string { return "DefineShape2"; }
		/*override*/ public get version():number { return 2; }
		/*override*/ public get level():number { return 2; }
		
		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"Bounds: " + this.shapeBounds;
			str += this.shapes.toString(indent + 2);
			return str;
		}
	}

}