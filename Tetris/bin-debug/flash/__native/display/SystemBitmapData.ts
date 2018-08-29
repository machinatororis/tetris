/// <reference path="../../../base.d.ts" />
/// <reference path="../../display/BitmapData.ts" />
/// <reference path="../utils/getNextPowerOfTwo.ts" />

namespace flash.__native.display
{
	
	export import getNextPowerOfTwo = flash.__native.utils.getNextPowerOfTwo;
	export import BitmapData = flash.display.BitmapData;
	
	
	/**
	 * BitmapData proxy with system functionality.
	 * @author pkulikov
	 * 
	 */	
	export  class SystemBitmapData extends BitmapData
	{
		/**
		 * Промежуточный системный буффер для рендеринга.
		 */		
		public static BUFFER:string = 'buffer';
		
		/**
		 * Embeded content.
		 */		
		public static EMBED:string = 'embed';
		
		/**
		 * Loaded content.
		 */		
		public static LOADER:string = 'loader';
		
		/**
		 * SWF assets.
		 */		
		public static SWF:string = 'swf';
		
		/**
		 * Filters.
		 */		
		public static FILTER:string = 'filter';
		
		/**
		 * DisplayObject.
		 */		
		public static DISPLAY:string = 'display';
		
		/**
		 * Graphics.
		 */		
		public static VECTOR:string = 'vector';
		
		/**
		 * TextField.
		 */		
		public static TEXT:string = 'text';
		
		/**
		 * Хранилище для системных BitmapData кратных двум. 
		 */		
		protected static sBufferCollection:any = {};
		
		/**
		 * Внутренний тип.
		 */		
		protected _type:string;
		
		/**
		 * Creates a system BitmapData object with a specified width and height. 
		 * @param type
		 * @param width
		 * @param height
		 * @param transparent
		 * @param fillColor
		 * 
		 */		
		constructor(type:string, width:number, height:number, transparent:boolean = true, fillColor:number = 0xffffffff)
		{
			/**/ type = as(type, 'String'); width = ((width) >> 0); height = ((height) >> 0); transparent = Boolean(transparent); fillColor = ((fillColor) >>> 0);
			/**/ this._type === void 0 && (this._type = null);
			if (BitmapData.sHelperStats && !BitmapData.sHelperStats.mb.system) {
				
				var s = BitmapData.sHelperStats.mb.system = {};
				s[SystemBitmapData.BUFFER] = s[SystemBitmapData.SWF] = s[SystemBitmapData.FILTER] = s[SystemBitmapData.DISPLAY] = s[SystemBitmapData.VECTOR] = s[SystemBitmapData.TEXT] = 0;
				
			}
			
			this._type = type;
			super(width, height, transparent, fillColor, arguments[5]);
		}
		
		/*override*/ public clone() : SystemBitmapData
		{
			return BitmapData.__clone(this, new SystemBitmapData(this._type, this._width, this._height, this._transparent, 0x0, false));
		}
		
		/*override*/ public dispose():void 
		{
			if (this._type == SystemBitmapData.BUFFER) {
				
				SystemBitmapData.__pushBuffer(this);
				return;
				
			}
			
			this.__dispose();
		}
		
		/*[internal]*/ protected __dispose ():void
		{
			super.dispose();
		}
		
		/*[internal]*/ /*override*/ protected __addStats ():void
		{
			if (!BitmapData.sHelperStats) {
				
				return;
				
			}
			
			var size = (this._width * this._height * 4) / 1024 / 1024;
			
			BitmapData.sHelperStats.count ++;
			BitmapData.sHelperStats.mb.total += size;
			BitmapData.sHelperStats.mb.system[this._type] += size;
		}
		
		/*[internal]*/ /*override*/ protected __removeStats ():void
		{
			if (!BitmapData.sHelperStats) {
				
				return;
				
			}
			
			var size = (this._width * this._height * 4) / 1024 / 1024;
			
			BitmapData.sHelperStats.count --;
			BitmapData.sHelperStats.mb.total -= size;
			BitmapData.sHelperStats.mb.system[this._type] -= size;
		}
		
		/*[internal]*/ protected static __popBuffer(width:number, height:number, transparent:boolean, clear:boolean = true):SystemBitmapData
		{
			// width = (+(width)); height = (+(height)); transparent = Boolean(transparent); clear = Boolean(clear);
			var w = getNextPowerOfTwo(width);
			var h = getNextPowerOfTwo(height);
			var size = (w << 16) | h;
			var list = SystemBitmapData.sBufferCollection[size] || (SystemBitmapData.sBufferCollection[size] = []);
			var buff:SystemBitmapData;
			
			if (!list.length) {
				
				buff = new SystemBitmapData(SystemBitmapData.BUFFER, w, h, transparent, 0x0);
				
			} else {
				
				buff =strict( list.pop(), SystemBitmapData);
				buff._transparent = transparent;
				
				if (clear) {
					
					buff.fillRect(buff._textureRect, 0x0);
					
				}
				
			}
			
			buff._systemWidth =(( width) >> 0);
			buff._systemHeight =(( height) >> 0);
			
			return buff;
		}
		
		/*[internal]*/ protected static __pushBuffer(buff:SystemBitmapData):void
		{
			// buff = strict(buff, SystemBitmapData);
			if (!buff || buff._type != SystemBitmapData.BUFFER) {
				
				return;
				
			}
			
			var size = (buff._width << 16) | buff._height;
			var list = SystemBitmapData.sBufferCollection[size];
			if (list.indexOf(buff) >= 0) {
				
				return;
				
			}
			
			
			list.push(buff);
		}
	}
}