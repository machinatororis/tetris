/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../TagUnknown.ts" />
/// <reference path="../ITag.ts" />

namespace flash.__native.format.swf.tags.etc
{
	
	export import ITag = flash.__native.format.swf.tags.ITag;
	export import TagUnknown = flash.__native.format.swf.tags.TagUnknown;
	
	
	export  class TagSWFEncryptActions extends TagUnknown implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 253;
		
		constructor(type:number = 0) {
			/**/ type = ((type) >>> 0);
			super(); }
		
		/*override*/ public get type():number { return TagSWFEncryptActions.TYPE; }
		/*override*/ public get name():string { return "SWFEncryptActions"; }
	}

}