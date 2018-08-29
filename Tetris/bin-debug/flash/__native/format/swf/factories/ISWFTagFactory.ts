/// <reference path="../tags/ITag.ts" />

namespace flash.__native.format.swf.factories
{
	export import ITag = flash.__native.format.swf.tags.ITag;
	

	export  interface ISWFTagFactory
	{
		create(type:number):ITag;
	}
}