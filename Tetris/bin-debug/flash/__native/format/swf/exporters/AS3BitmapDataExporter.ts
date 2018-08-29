/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../events/ErrorEvent.ts" />
/// <reference path="../../../../display/BitmapData.ts" />
/// <reference path="../tags/TagDefineBitsLossless.ts" />
/// <reference path="../tags/TagDefineBits.ts" />
/// <reference path="../tags/ITag.ts" />
/// <reference path="../data/consts/BitmapFormat.ts" />
/// <reference path="../../../display/SystemBitmapData.ts" />

namespace flash.__native.format.swf.exporters
{
	
	export import SystemBitmapData = flash.__native.display.SystemBitmapData;
	export import BitmapFormat = flash.__native.format.swf.data.consts.BitmapFormat;
	export import ITag = flash.__native.format.swf.tags.ITag;
	export import TagDefineBits = flash.__native.format.swf.tags.TagDefineBits;
	export import TagDefineBitsLossless = flash.__native.format.swf.tags.TagDefineBitsLossless;
	export import BitmapData = flash.display.BitmapData;
	export import ErrorEvent = flash.events.ErrorEvent;
	

	export  class AS3BitmapDataExporter
	{
		public static exportBitmapData (tag : ITag, complete : Function = null, error : Function = null) : void
		{
			/**/ tag = strict(tag, 'implements_flash___native_format_swf_tags_ITag');
			var bitmapData : BitmapData;
			
			if (is(tag , TagDefineBitsLossless)) {
				
				var x, y;
				var dataLossless = tag;
				var bitmapWidth = dataLossless.bitmapWidth;
				var bitmapHeight = dataLossless.bitmapHeight;
				var transparent = dataLossless.level > 1;
				var buffer = dataLossless._zlibBitmapData;
				var padding = (4 - bitmapWidth % 4) % 4;
				
				bitmapData = new SystemBitmapData (SystemBitmapData.SWF, bitmapWidth, bitmapHeight, transparent, 0x0, false);
				var pixels = bitmapData.__beginModifyPixels ();
				
				buffer.uncompress();
				buffer.position = 0;
				
				if (dataLossless.bitmapFormat == BitmapFormat.BIT_8) {
					
					var colorTable = new Array(dataLossless.bitmapColorTableSize * 4);
					var colorTableSize = colorTable.length;
					
					if (transparent) {
						
						for (var i = 0; i < colorTableSize; i += 4) {
							
							var color = buffer.readUnsignedInt ();
							
							var r = color >> 24 & 0xff;
							var g = color >> 16 & 0xff;
							var b = color >> 8 & 0xff;
							var a = color & 0xff;
							
							colorTable[i] = r;
							colorTable[i + 1] = g;
							colorTable[i + 2] = b;
							colorTable[i + 3] = a;
							
						}
						
					} else {
						
						for (var i = 0; i < colorTableSize; i += 4) {
							
							var color = buffer.readUnsignedShort ();
							
							var r = color >> 8 & 0xff;
							var g = color & 0xff;
							var b = buffer.readUnsignedByte();
							
							colorTable[i] = r;
							colorTable[i + 1] = g;
							colorTable[i + 2] = b;
							colorTable[i + 3] = 0xff;
							
						}
						
					}
					
					var byteIndex = 0;
					var byte0, byte1, byte2, byte3;
					var groupLength = ((bitmapWidth * bitmapHeight) / 4) | 0;
					
					for (y = 0; y < bitmapHeight; ++y) {
						
						for (x = 0; x < bitmapWidth; ++x) {
							
							var index = -1;
							
							if (groupLength > 0 || byteIndex > 0) {
								
								if (byteIndex == 0) {
	
									var group = buffer.readUnsignedInt();
									byte0 = group >> 24 & 0xff;
									byte1 = group >> 16 & 0xff;
									byte2 = group >> 8 & 0xff;
									byte3 = group & 0xff;
									groupLength--;
									
									index = byte0;
									byteIndex++;
									
								} else if (byteIndex == 1) {
									
									index = byte1;
									byteIndex++;
									
								} else if (byteIndex == 2) {
									
									index = byte2;
									byteIndex++;
									
								} else if (byteIndex == 3) {
									
									index = byte3;
									byteIndex = 0;
									
								}
								
							}
							
							if (index == -1) {
								
								index = buffer.readUnsignedByte();
								
							}
							
							index *= 4;
							
							if (index < 0 || index >= colorTableSize) {
								
								continue;
								
							}
							
							var p = (y * bitmapWidth + x) * 4;
							pixels[p] = colorTable[index];
							pixels[p + 1] = colorTable[index + 1];
							pixels[p + 2] = colorTable[index + 2];
							pixels[p + 3] = colorTable[index + 3];
							
						}
						
						buffer.position += padding;
						
					}
					
				} else {
					
					for (y = 0; y < bitmapHeight; ++y) {
						
						for (x = 0; x < bitmapWidth; ++x) {
							
							var color = buffer.readUnsignedInt ();
							
							var a = color >> 24 & 0xff;
							var r = color >> 16 & 0xff;
							var g = color >> 8 & 0xff;
							var b = color & 0xff;
							
							var p = (y * bitmapWidth + x) * 4;
							pixels[p] = r;
							pixels[p + 1] = g;
							pixels[p + 2] = b;
							pixels[p + 3] = a;
							
						}
						
					}
					
				}
				
				bitmapData.__endModifyPixels ();
				
			} else if (is(tag , TagDefineBits)) {
				
				tag.exportBitmapData (onComplete.__bind(this), onError.__bind(this));
				
			}
			
			bitmapData && onComplete.__bind(this)(bitmapData);
			
			function onComplete (data:BitmapData):void {
				
				/**/ data = strict(data, BitmapData);
				
				tag['instance'] = data;
				unbind(complete) != unbind(null) && complete(data);
				
			}
			
			function onError (event : ErrorEvent) : void {
				
				/**/ event = strict(event, ErrorEvent);
				
				unbind(error) != unbind(null) && error(event);
				
			}
		}
	}
}