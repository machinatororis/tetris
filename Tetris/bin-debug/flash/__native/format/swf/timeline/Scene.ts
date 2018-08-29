/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />

namespace flash.__native.format.swf.timeline
{
	export import StringUtils = flash.__native.utils.StringUtils;
	

	export  class Scene
	{
		public frameNumber:number = 0;
		public name:string = null;
		
		constructor(frameNumber:number, name:string)
		{
			/**/ frameNumber = ((frameNumber) >>> 0); name = as(name, 'String');
			this.frameNumber = frameNumber;
			this.name = name;
		}
		
		public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return StringUtils.repeat(indent) + 
				"Name: " + this.name + ", " +
				"Frame: " + this.frameNumber;
		}
	}
}