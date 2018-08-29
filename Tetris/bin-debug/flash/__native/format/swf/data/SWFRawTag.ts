/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />

namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	

	export  class SWFRawTag
	{
		/*[internal]*/ public header : SWFRecordHeader;
		/*[internal]*/ public bytes : SWFData;
		
		/*[internal]*/ constructor (data : SWFData)
		{
			// data = strict(data, SWFData);
			if (data != null) {
				
				this.parse (data);
				
			}
		}
		
		/*[internal]*/ public parse (data : SWFData) : void
		{
			// data = strict(data, SWFData);
			var pos = data._position;
			this.header = data.readTagHeader ();
			this.bytes = new SWFData (data, pos, pos + this.header.headerLength + this.header.contentLength);
		}
		
		public publish (data : SWFData) : void
		{
			/**/ data = strict(data, SWFData);
			// Header is part of the byte array
			data.writeBytes (this.bytes);
		}
	}
}