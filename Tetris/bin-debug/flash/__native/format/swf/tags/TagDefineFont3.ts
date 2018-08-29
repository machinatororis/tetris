/// <reference path="../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	
	export  class TagDefineFont3 extends TagDefineFont2 implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 75;
		
		constructor() {
			super(); }
		
		/*override*/ public get type():number { return TagDefineFont3.TYPE; }
		/*override*/ public get name():string { return "DefineFont3"; }
		/*override*/ public get version():number { return 8; }
		/*override*/ public get level():number { return 2; }
		
		/*override*/ protected get unitDivisor():number { return 20; }
		
		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"FontName: " + this.fontName + ", " +
				"Italic: " + this.italic + ", " +
				"Bold: " + this.bold + ", " +
				"Glyphs: " + this._glyphShapeTable.length;
			return str + this.toStringCommon(indent);
		}
	}

}