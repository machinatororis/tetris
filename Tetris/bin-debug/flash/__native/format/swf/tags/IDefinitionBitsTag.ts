/// <reference path="../../../../display/BitmapData.ts" />

namespace flash.__native.format.swf.tags
{
	export import BitmapData = flash.display.BitmapData;
	

	export  interface IDefinitionBitsTag extends IDefinitionTag
	{
		instance:BitmapData;
		/*function get instance():BitmapData;*/
	}
}