/// <reference path="../../../../../base.d.ts" />
/// <reference path="../tags/IDefinitionBitsTag.ts" />

namespace flash.__native.format.swf.instance
{
	export import IDefinitionBitsTag = flash.__native.format.swf.tags.IDefinitionBitsTag;
	
	
	export  class BitmapData extends flash.display.BitmapData
	{
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
				
				var source = tag.instance;
				super (source._width, source._height, source._transparent, 0x0, false);
				BitmapData.__clone(source, this);
				
			} else {
				
				switch (length) {
					
					case 4:
						super (arguments[0], arguments[1], arguments[2], arguments[3]);
						break;
					
					case 3:
						super (arguments[0], arguments[1], arguments[2]);
						break;
					
					case 2:
						super (arguments[0], arguments[1]);
						break;
					
					case 1:
						super (arguments[0]);
						break;
					
					default:
						super ();
					
				}
				
			}
		}
	}
}