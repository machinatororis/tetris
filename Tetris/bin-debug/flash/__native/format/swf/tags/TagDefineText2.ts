/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagDefineText2 extends TagDefineText implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 33;
		
		constructor() {
			super(); }
		
		/*override*/ public get type():number { return TagDefineText2.TYPE; }
		/*override*/ public get name():string { return "DefineText2"; }
		/*override*/ public get version():number { return 3; }
		/*override*/ public get level():number { return 2; }
		
		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"Bounds: " + this.textBounds + ", " +
				"Matrix: " + this.textMatrix;
			if (this._records.length > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "TextRecords:";
				for (var i:number = 0, len:number =  ((this._records.length) >>> 0); i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this._records[i].toString();
				}
			}
			return str;
		}
	}

}