/// <reference path="../../../../../base.d.ts" />
/// <reference path="../tags/IDefinitionBitsTag.ts" />
﻿
namespace flash.__native.format.swf.instance
{
	
	export import IDefinitionBitsTag = flash.__native.format.swf.tags.IDefinitionBitsTag;
	

	/**
	 * @author pkulikov
	 */
	export  class Bitmap extends flash.display.Bitmap
	{
		/**
		 * Constructor 
		 * @param tag
		 * 
		 */		
		constructor ()
		{
			var tag;
			var length = arguments.length;
			for (var i = 0; i < length; ++i) {
				
				var arg = arguments[i];
				if (arg == null) {
					
					continue;
					
				}
				
				if (is(arg , 'implements_flash___native_format_swf_tags_IDefinitionBitsTag')) {
					
					tag = arg;
					break;
					
				}
				
			}
			if (tag) {
				
				super (tag.instance.clone());
				
			} else {
				
				switch (length) {
					
					case 1:
						super (arguments[0]);
						break;
					
					default:
						super ();
						
				}
				
			}
			
			// TODO: Is there a way to catch "allow smoothing" from Flash?
			//smoothing = true;
		}
	}	
}