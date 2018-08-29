/// <reference path="../../../../../base.d.ts" />
/// <reference path="../tags/IDefinitionBitsTag.ts" />
﻿
namespace flash.__native.format.swf.instance
{
	export import IDefinitionBitsTag = flash.__native.format.swf.tags.IDefinitionBitsTag;
	

	/**
	 * @author pkulikov
	 */
	export  class BitmapAsset extends flash.__native.format.swf.instance.Bitmap
	{
		constructor(tag:IDefinitionBitsTag)
		{
			/**/ tag = strict(tag, 'implements_flash___native_format_swf_tags_IDefinitionBitsTag');
			super (tag);
		}
	}	
}