/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFTimelineContainer.ts" />
﻿
namespace flash.__native.format.swf.instance
{
	export import SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
	

	/**
	 * @author pkulikov
	 */
	export  class SpriteAsset extends flash.__native.format.swf.instance.MovieClip
	{
		constructor(data:SWFTimelineContainer)
		{
			/**/ data = strict(data, SWFTimelineContainer);
			super (data);
		}
	}	
}