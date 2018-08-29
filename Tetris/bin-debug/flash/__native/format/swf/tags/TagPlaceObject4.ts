/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../SWFData.ts" />

namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import StringUtils = flash.__native.utils.StringUtils;
	

	/**
	 * PlaceObject4 is essentially identical to PlaceObject3 except it has a different
	 * swf tag value of course (94 instead of 70) and at the end of the tag, if there are
	 * additional bytes, those bytes will be interpreted as AMF binary data that will be
	 * used as the metadata attached to the instance.
	 * 
	 * @see http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/DisplayObject.html#metaData
	 */
	export  class TagPlaceObject4 extends TagPlaceObject3 implements IDisplayListTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDisplayListTag = null;
		public static TYPE:number = 94;
		
		constructor() {
			super(); }
		
		/*override*/ public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			super.parse(data, length, version, async);
			if (data.bytesAvailable > 0) {
				this.metaData = data.readObject();
			}
		}
		
		/*override*/ public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = this.prepareBody();
			
			if (this.metaData != null) {
				body.writeObject(this.metaData);
			}
			
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		/*override*/ public get type():number { return TagPlaceObject4.TYPE; }
		/*override*/ public get name():string { return "PlaceObject4"; }
		/*override*/ public get version():number { return 19; }
		/*override*/ public get level():number { return 4; }
		
		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = super.toString(indent);
			if (this.metaData != null) {
				str += "\n" + StringUtils.repeat(indent + 2) + "MetaData: yes";
			}
			return str;
		}
	}
}