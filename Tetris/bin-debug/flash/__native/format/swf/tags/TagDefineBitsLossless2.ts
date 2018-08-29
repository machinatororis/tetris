/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/consts/BitmapFormat.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import BitmapFormat = flash.__native.format.swf.data.consts.BitmapFormat;
	

	export  class TagDefineBitsLossless2 extends TagDefineBitsLossless implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 36;
		
		constructor() {
			super(); }
		
		/*override*/ public clone():IDefinitionTag {
			var tag:TagDefineBitsLossless2 = new TagDefineBitsLossless2();
			tag.characterId = this.characterId;
			tag.bitmapFormat = this.bitmapFormat;
			tag.bitmapWidth = this.bitmapWidth;
			tag.bitmapHeight = this.bitmapHeight;
			if (this._zlibBitmapData.length > 0) {
				tag.zlibBitmapData.writeBytes(this._zlibBitmapData);
			}
			return tag;
		}
		
		/*override*/ public get type():number { return TagDefineBitsLossless2.TYPE; }
		/*override*/ public get name():string { return "DefineBitsLossless2"; }
		/*override*/ public get version():number { return 3; }
		/*override*/ public get level():number { return 2; }

		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"Format: " + BitmapFormat.toString(this.bitmapFormat) + ", " +
				"Size: (" + this.bitmapWidth + "," + this.bitmapHeight + ")";
		}
	}

}