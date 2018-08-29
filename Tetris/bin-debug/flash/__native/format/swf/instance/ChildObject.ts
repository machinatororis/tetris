/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../display/DisplayObject.ts" />
/// <reference path="../timeline/FrameObject.ts" />
﻿
namespace flash.__native.format.swf.instance
{
	
	export import FrameObject = flash.__native.format.swf.timeline.FrameObject;
	export import DisplayObject = flash.display.DisplayObject;
	

	/**
	 * @author pkulikov
	 */
	export  class ChildObject
	{
		/*[internal]*/ public object : DisplayObject;
		/*[internal]*/ public frameObject : FrameObject;
		
		/*[internal]*/ constructor (object : DisplayObject, frameObject : FrameObject)
		{
			// object = strict(object, DisplayObject); frameObject = strict(frameObject, FrameObject);
			this.object = object;
			this.frameObject = frameObject;
		}
	}	
}