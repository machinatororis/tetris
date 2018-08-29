/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagDefineFontInfo2 extends TagDefineFontInfo implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 62;
		
		constructor() {
			super(); }
		
		/*override*/ protected parseLangCode(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.langCode = data.readUI8();
			this.langCodeLength = 1;
		}
		
		/*override*/ protected publishLangCode(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			data.writeUI8(this.langCode);
		}
		
		/*override*/ public get type():number { return TagDefineFontInfo2.TYPE; }
		/*override*/ public get name():string { return "DefineFontInfo2"; }
		/*override*/ public get version():number { return 6; }
		/*override*/ public get level():number { return 2; }
		
		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"FontID: " + this.fontId + ", " +
				"FontName: " + this.fontName + ", " +
				"Italic: " + this.italic + ", " +
				"Bold: " + this.bold + ", " +
				"LanguageCode: " + this.langCode + ", " +
				"Codes: " + this._codeTable.length;
		}
	}

}