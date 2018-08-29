/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../text/TextFormat.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../geom/ColorTransform.ts" />
/// <reference path="../filters/NoiseFilter.ts" />
/// <reference path="../filters/ColorMatrixFilter.ts" />
/// <reference path="../filters/BitmapFilter.ts" />
/// <reference path="../display3D/textures/Texture.ts" />
/// <reference path="../display3D/Context3DTextureFormat.ts" />
/// <reference path="../__native/utils/getNextPowerOfTwo.ts" />
/// <reference path="../__native/utils/Random.ts" />
/// <reference path="../__native/utils/Base64.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />
/// <reference path="../__native/renderer/canvas/CanvasRenderer.ts" />
/// <reference path="../__native/display/SystemBitmapData.ts" />

namespace flash.display
{
	export import SystemBitmapData = flash.__native.display.SystemBitmapData;
	export import CanvasRenderer = flash.__native.renderer.canvas.CanvasRenderer;
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import Base64 = flash.__native.utils.Base64;
	export import Random = flash.__native.utils.Random;
	export import getNextPowerOfTwo = flash.__native.utils.getNextPowerOfTwo;
	export import Context3DTextureFormat = flash.display3D.Context3DTextureFormat;
	export import Texture = flash.display3D.textures.Texture;
	export import BitmapFilter = flash.filters.BitmapFilter;
	export import ColorMatrixFilter = flash.filters.ColorMatrixFilter;
	export import NoiseFilter = flash.filters.NoiseFilter;
	export import ColorTransform = flash.geom.ColorTransform;
	export import Matrix = flash.geom.Matrix;
	export import Point = flash.geom.Point;
	export import Rectangle = flash.geom.Rectangle;
	export import TextFormat = flash.text.TextFormat;
	export import ByteArray = flash.utils.ByteArray;
	

	/**
	 * The BitmapData class lets you work with the data (pixels) of a Bitmap object . You can use the methods of the BitmapData class 
	 * to create arbitrarily sized transparent or opaque bitmap images and manipulate them in various ways at runtime. 
	 * You can also access the BitmapData for a bitmap image that you load with the flash.display.Loader class.
	 * This class lets you separate bitmap rendering operations from the internal display updating routines of Flash Player. 
	 * By manipulating a BitmapData object directly, you can create complex images without incurring the per-frame overhead of constantly 
	 * redrawing the content from vector data.
	 * 
	 * The methods of the BitmapData class support effects that are not available through the filters available to non-bitmap display objects.
	 * 
	 * A BitmapData object contains an array of pixel data. This data can represent either a fully opaque bitmap or a transparent bitmap 
	 * that contains alpha channel data. Either type of BitmapData object is stored as a buffer of 32-bit integers. 
	 * Each 32-bit integer determines the properties of a single pixel in the bitmap.
	 * 
	 * Each 32-bit integer is a combination of four 8-bit channel values (from 0 to 255) that describe the alpha transparency and the red,
	 *  green, and blue (ARGB) values of the pixel. (For ARGB values, the most significant byte represents the alpha channel value, 
	 * followed by red, green, and blue.)
	 * 
	 * The four channels (alpha, red, green, and blue) are represented as numbers when you use them with the BitmapData.copyChannel() 
	 * method or the DisplacementMapFilter.componentX and DisplacementMapFilter.componentY properties, and these numbers are 
	 * represented by the following constants in the BitmapDataChannel class:
	 * 
	 * BitmapDataChannel.ALPHA
	 * BitmapDataChannel.RED
	 * BitmapDataChannel.GREEN
	 * BitmapDataChannel.BLUE
	 * You can attach BitmapData objects to a Bitmap object by using the bitmapData property of the Bitmap object.
	 * 
	 * You can use a BitmapData object to fill a Graphics object by using the Graphics.beginBitmapFill() method.
	 * 
	 * In the AIR runtime, the DockIcon, Icon, InteractiveIcon, and SystemTrayIcon classes each include a bitmaps property that is 
	 * an array of BitmapData objects that define the bitmap images for an icon.
	 * 
	 * In AIR 1.5 and Flash Player 10, the maximum size for a BitmapData object is 8,191 pixels in width or height, and the total number 
	 * of pixels cannot exceed 16,777,215 pixels. (So, if a BitmapData object is 8,191 pixels wide, it can only be 2,048 pixels high.) 
	 * In Flash Player 9 and earlier and AIR 1.1 and earlier, the limitation is 2,880 pixels in height and 2,880 in width.
	 * 
	 * Starting with AIR 3 and Flash player 11, the size limits for a BitmapData object have been removed. The maximum size of a 
	 * bitmap is now dependent on the operating system.
	 * 
	 * Calls to any method or property of a BitmapData object throw an ArgumentError error if the BitmapData object is invalid 
	 * (for example, if it has height == 0 and width == 0) or it has been disposed of via dispose().
	 * 
	 * @author pkulikov
	 * 
	 */	
	export  class BitmapData implements IBitmapDrawable
	{
		implements_flash_display_IBitmapDrawable = null;
		/**
		 * Helpers
		 */
		protected static sBitmapDataUID : number = 0;
		protected static sHelperCanvasPowerOf2Pool : any = {};
		protected static sHelperNoiseFilter : NoiseFilter = asc.sti(BitmapData,()=>{ BitmapData.sHelperNoiseFilter = new NoiseFilter; });
		protected static sHelperColorMatrixFilter : ColorMatrixFilter = asc.sti(BitmapData,()=>{ BitmapData.sHelperColorMatrixFilter = new ColorMatrixFilter; });
		protected static sHelperColorTransform : ColorTransform = asc.sti(BitmapData,()=>{ BitmapData.sHelperColorTransform = new ColorTransform; });
		protected static sHelperRootDisplayObject : DisplayObject = asc.sti(BitmapData,()=>{ BitmapData.sHelperRootDisplayObject = new DisplayObject; });
		protected static sHelperStats : any = { count: 0, mb: { total: 0, app: 0 } };
		protected static sHelperPerlinNoise : any[] = [
			151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,
			142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,
			219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,
			168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,
			60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,
			1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,
			86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,
			126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,
			213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,
			253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,
			34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,
			107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,
			150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,
			156,180,151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,
			103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,
			62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,
			136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,
			122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,
			161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,
			159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,
			118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,
			183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,
			129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,
			228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,
			14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,
			45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,
			195,78,66,215,61,156,180
		];
		
		/**
		 * context 
		 */		
		protected _ctx : WebGLContext2D = null;
		
		/**
		 * source html element 
		 */		 
		protected _element : HTMLElement = null;
		
		/**
		 * texture
		 */		 
		protected _texture : Texture = null;
		
		/**
		 * premultiplied pixels (RGBA, left to right, bottom to top)
		 */		
		protected _pixels : Uint8Array = null;
		
		/**
		 * power of 2 premultiplied pixels
		 */		
		protected _p2pixels : Uint8Array = null;
		
		/**
		 * transparent 
		 */		
		protected _transparent : boolean = false;
		
		/**
		 * width 
		 */		
		protected _width : number = 0;
		
		/**
		 * height 
		 */		
		protected _height : number = 0;
		
		/**
		 * power of 2 width 
		 */		
		protected _p2width : number = 0;
		
		/**
		 * power of 2 height 
		 */		
		protected _p2height : number = 0;
		
		/**
		 * bounds 
		 */		
		protected _rect : Rectangle = null;
		
		/**
		 * texture bounds 
		 */		
		protected _textureRect : Rectangle = null;
		
		/**
		 * Необходимо обновить пиксельные данные. 
		 */
		protected _dirtyPixels : boolean = false;
		
		/**
		 * Необходимо создать / обновить текстуру. 
		 */
		protected _dirtyTexture : boolean = false;
		
		/**
		 * Необходимо перерисовать Bitmap. 
		 */
		protected _dirtyDisplayObject : boolean = false;
		
		/**
		 * Пиксели были изменены.
		 */
		protected _modifiedPixels : boolean = false;
		
		/**
		 * После разрушения переключается в true 
		 */		
		protected _invalid : boolean = false;
		
		/**
		 * SystemBitmapData.BUFFER
		 */		
		protected _systemWidth : number = 0;
		protected _systemHeight : number = 0;
		
		/**
		 * Вспомогательные переменные для GLBatchRenderer
		 */		
		protected _uid : number = 0;
		protected _version : number = 0;
		protected _listenerDispose : Function = null;
		
		/**
		 * Creates a BitmapData object with a specified width and height.
		 * @param width
		 * @param height
		 * @param transparent
		 * @param fillColor
		 * 
		 */		
		constructor (width : number, height : number, transparent : boolean = true, fillColor : number = 0xffffffff)
		{
			/**/ width = ((width) >> 0); height = ((height) >> 0); transparent = Boolean(transparent); fillColor = ((fillColor) >>> 0);
			if (width <= 0 || height <= 0) {
				
				throw new ArgumentError('Invalid BitmapData', 2015);
				
			}
			
			this._uid =(( BitmapData.sBitmapDataUID++) >> 0);
			
			var stageId = Stage.sCurrent ? Stage.sCurrent.mId : 0;
			this._ctx =strict( window.asc.getCtx(stageId), WebGLContext2D);
			this._transparent = transparent;
			
			this._width = width;
			this._height = height;
			
			this._p2width = getNextPowerOfTwo(this._width);
			this._p2height = getNextPowerOfTwo(this._height);
			
			this._rect =strict( Rectangle.__pool.get(), Rectangle);
			this._rect.__setTo(0, 0, this._width, this._height);
			this._textureRect =strict( Rectangle.__pool.get(), Rectangle);
			this._textureRect.__setTo(0, 0, this._p2width, this._p2height);
			this._texture =this._texture || this._ctx.context.createTexture(this._p2width, this._p2height, Context3DTextureFormat.BGRA, false);
			
			this.__addStats();
			
			if ((transparent && fillColor == 0x0) || arguments[4] == false) {
				
				return;
				
			}
			
			this.fillRect(this._rect, fillColor);
		}
		
		/**
		 * Returns a new BitmapData object that is a clone of the original instance with an exact copy of the contained bitmap. 
		 * @return 
		 * 
		 */		
		public clone():BitmapData
		{
			return BitmapData.__clone(this, new BitmapData(this._width, this._height, this._transparent, 0x0, false));
		}
		
		/**
		 * The width of the bitmap image in pixels. 
		 * @return 
		 * 
		 */		
		public get width():number  { return this._width; }
		
		/**
		 * The height of the bitmap image in pixels. 
		 * @return 
		 * 
		 */		
		public get height():number  { return this._height; }
		
		/**
		 * Defines whether the bitmap image supports per-pixel transparency. 
		 * @return 
		 * 
		 */		
		public get transparent():boolean  { return this._transparent; }
		
		/**
		 * The rectangle that defines the size and location of the bitmap image. 
		 * @return 
		 * 
		 */		
		public get rect():Rectangle { return this._rect; }
		
		/**
		 * The rectangle that defines the size and location of the bitmap texture. 
		 * @return 
		 * 
		 */		
		public get textureRect():Rectangle { return this._textureRect; }
		
		/**
		 * Takes a source image and a filter object and generates the filtered image. 
		 * @param sourceBitmapData
		 * @param sourceRect
		 * @param destPoint
		 * @param filter
		 * 
		 */				
		public applyFilter(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, filter:BitmapFilter):void
		{
			/**/ sourceBitmapData = strict(sourceBitmapData, BitmapData); sourceRect = strict(sourceRect, Rectangle); destPoint = strict(destPoint, Point); filter = strict(filter, BitmapFilter);
			if (!filter || filter.__notImplemented) {
				
				return;
				
			}
			
			// save
			this._ctx.saveAndReset();
			
			// некоторые фильтры "клали" на предыдущее состояние текстуры
			var prevContent = !filter.__replaceContent;
			
			// буффер, который будем подавать фильтру (вырезан и увеличен с учетом новых границ)
			var source2filter:BitmapData;
			
			// обработанный буффер
			var filteredSource:BitmapData;
			
			// границы с учетом фильтра
			var r = Rectangle.__pool.get();
			r.__setTo(0, 0, sourceRect.width, sourceRect.height);
			var bounds:Rectangle = filter.__bounds(r);
			
			try {
				
				// target
				var p = Point.__pool.get();
				p.__setTo(-bounds.x, -bounds.y);
				source2filter = sourceBitmapData.__slice(sourceRect, p, true, prevContent, prevContent);
				
				// apply
				filteredSource = filter.__apply(this._ctx, source2filter, true);
				
				// move
				// координаты, с которых начнется рисование
				var x:number = destPoint.x + bounds.x, y:number = destPoint.y + bounds.y;
				
				// размер области, в которую будет нарисовано отредактированное изображение
				var width:number = Math.ceil(Math.min(bounds.width, this._width - x)), height:number = Math.ceil(Math.min(bounds.height, this._height - y));
				
				// матрица смещения
				var m = Matrix.__pool.get();
				m.__translate(x, y);
				
				// рисуем в себя - чистим - отсекаем
				this._ctx.setRenderToBitmapData(this).clearRect(x, y, width, height).clipRect(x, y, width, height);
				this._ctx.setTransformFromMatrix(m);
				this._ctx.drawImage(filteredSource, false, true);
				
			} catch (e) {
				
				e = window.asc.e2e(e);
				
				trace(e.getStackTrace());
				
			} finally {
				
				if (filteredSource) {
					
					filteredSource.dispose();
					
				}
				
				if (source2filter) {
					
					source2filter.dispose();
					
				}
				
				this._ctx.restore();
				
				Rectangle.__pool.release(r);
				Point.__pool.release(p);
				Matrix.__pool.release(m);
				
			}
			
			this._version++;
			this._element = null;
			this._dirtyPixels = this._dirtyDisplayObject = true;
		}
		
		/**
		 * Returns an integer that represents an RGB pixel value from a BitmapData object at a specific point (x, y). 
		 * @param x
		 * @param y
		 * @return 
		 * 
		 */		
		public getPixel(x:number, y:number):number
		{
			/**/ x = ((x) >> 0); y = ((y) >> 0);
			this.__getPixels();
			
			var p = (y * this._width + x) * 4;
			return (this._pixels[p] << 16) | (this._pixels[p + 1] << 8) | this._pixels[p + 2];
		}
		
		/**
		 * Returns an ARGB color value that contains alpha channel data and RGB data. 
		 * @param x
		 * @param y
		 * @return 
		 * 
		 */		
		public getPixel32(x:number, y:number):number
		{
			/**/ x = ((x) >> 0); y = ((y) >> 0);
			this.__getPixels();
			
			var p = (y * this._width + x) * 4;
			var a = this._pixels[p + 3];
			var npm = a / 255.0;
			return (a << 24) | (((this._pixels[p] / npm) & 0xff) << 16) | (((this._pixels[p + 1] / npm) & 0xff) << 8) | ((this._pixels[p + 2] / npm) & 0xff);
		}
		
		/**
		 * Sets a single pixel of a BitmapData object. 
		 * @param x
		 * @param y
		 * @param color
		 * 
		 */		
		public setPixel(x:number, y:number, color:number):void
		{
			/**/ x = ((x) >> 0); y = ((y) >> 0); color = ((color) >>> 0);
			this.__getPixels();
			
			var p = (y * this._width + x) * 4;
			this._pixels[p] = (color >> 16) & 0xff; // red
			this._pixels[p + 1] = (color >> 8) & 0xff; // green
			this._pixels[p + 2] = color & 0xff; // blue
			
			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
		}
		
		/**
		 * Sets the color and alpha transparency values of a single pixel of a BitmapData object. 
		 * @param x
		 * @param y
		 * @param color
		 * 
		 */		
		public setPixel32(x:number, y:number, color:number):void
		{
			/**/ x = ((x) >> 0); y = ((y) >> 0); color = ((color) >>> 0);
			this.__getPixels();
			
			var p = (y * this._width + x) * 4;
			var a = (color >> 24) & 0xff;
			var pm = a / 255;
			this._pixels[p] = (((color >> 16) & 0xff) * pm) & 0xff; // red
			this._pixels[p + 1] = (((color >> 8) & 0xff) * pm) & 0xff; // green
			this._pixels[p + 2] = ((color & 0xff) * pm) & 0xff; // blue
			this._pixels[p + 3] = a; // alpha
			
			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
		}
		
		/**
		 * Adjusts the color values in a specified area of a bitmap image by using a ColorTransform object. 
		 * @param rect
		 * @param ct
		 * 
		 */		
		public colorTransform(rect:Rectangle, ct:ColorTransform) : void
		{
			/**/ rect = strict(rect, Rectangle); ct = strict(ct, ColorTransform);
			BitmapData.sHelperColorMatrixFilter.matrix = [
				ct.redMultiplier, 0, 0, 0, ct.redOffset,
				0, ct.greenMultiplier, 0, 0, ct.greenOffset,
				0, 0, ct.blueMultiplier, 0, ct.blueOffset,
				0, 0, 0, ct.alphaMultiplier, ct.alphaOffset
			];
			
			var p = Point.__pool.get();
			this.applyFilter(this, rect, p, BitmapData.sHelperColorMatrixFilter);
			Point.__pool.release(p);
		}
		
		/**
		 * Compares two BitmapData objects. 
		 * @param otherBitmapData
		 * @return 
		 * 
		 */		
		public compare (otherBitmapData:BitmapData):any
		{
			/**/ otherBitmapData = strict(otherBitmapData, BitmapData);
			if (!otherBitmapData) {
				
				throw new TypeError('Parameter otherBitmapData must be non-null.', 2007);
				
			}
			
			if (otherBitmapData == this) {
				
				return 0;
				
			}
			
			if (this._width != otherBitmapData._width) {
				
				return -3;
				
			}
			
			if (this._height != otherBitmapData._height) {
				
				return -4;
				
			}
			
			var isTransparent = (this._transparent || otherBitmapData._transparent);
			var resultBitmapData = new BitmapData(this._width, this._height, isTransparent, 0x0);
			
			this.__getPixels();
			var otherPixels = otherBitmapData.__getPixels();
			var resultPixels = resultBitmapData.__getPixels();
			
			var isEqual = true;
			for (var i = 0, len = this._pixels.byteLength; i < len; i += 4) {
				
				var currentAlpha = this._pixels[i + 3];
				var currentNpm = currentAlpha / 255;
				var currentRed = (this._pixels[i] / currentNpm) & 0xff;
				var currentGreen = (this._pixels[i + 1] / currentNpm) & 0xff;
				var currentBlue = (this._pixels[i + 2] / currentNpm) & 0xff;
				
				var otherAlpha = otherPixels[i + 3];
				var otherNpm = otherAlpha / 255;
				var otherRed = (otherPixels[i] / otherNpm) & 0xff;
				var otherGreen = (otherPixels[i + 1] / otherNpm) & 0xff;
				var otherBlue = (otherPixels[i + 2] / otherNpm) & 0xff;
				
				if (currentRed !== otherRed || currentGreen !== otherGreen || currentBlue !== otherBlue) {
					
					resultPixels[i] = (currentRed - otherRed) & 0xff;
					resultPixels[i + 1] = (currentGreen - otherGreen) & 0xff;
					resultPixels[i + 2] = (currentBlue - otherBlue) & 0xff;
					resultPixels[i + 3] = 0xff;
					
				} else if (currentAlpha !== otherAlpha) {
					
					resultPixels[i + 3] = currentAlpha - otherAlpha;
					resultPixels[i] = resultPixels[i + 1] =
						resultPixels[i + 2] = isTransparent ? resultPixels[i + 3] : 0xff;
					
				} else {
					
					continue;
					
				}
				
				isEqual = false;
				
			}
			
			if (isEqual) {
				
				return 0;
				
			}
			
			return resultBitmapData;
		}
		
		/**
		 * Transfers data from one channel of another BitmapData object or the current BitmapData object into a channel 
		 * of the current BitmapData object.  
		 * @param sourceBitmapData
		 * @param sourceRect
		 * @param destPoint
		 * @param sourceChannel
		 * @param destChannel
		 * 
		 */			
		public copyChannel (sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, sourceChannel:number, destChannel:number):void
		{
			/**/ sourceBitmapData = strict(sourceBitmapData, BitmapData); sourceRect = strict(sourceRect, Rectangle); destPoint = strict(destPoint, Point); sourceChannel = ((sourceChannel) >>> 0); destChannel = ((destChannel) >>> 0);
			if (destChannel == BitmapDataChannel.ALPHA && !this.transparent) return;
			if (sourceRect.width <= 0 || sourceRect.height <= 0) return;
			
			var srcIndex = 0;
			switch (sourceChannel) {
				
				case BitmapDataChannel.RED: srcIndex = 0; break;
				case BitmapDataChannel.GREEN: srcIndex = 1; break;
				case BitmapDataChannel.BLUE: srcIndex = 2; break;
				case BitmapDataChannel.ALPHA: srcIndex = 3; break;
				
			}
			
			var destIndex = 0;
			switch (destChannel) {
				
				case BitmapDataChannel.RED: destIndex = 0; break;
				case BitmapDataChannel.GREEN: destIndex = 1; break;
				case BitmapDataChannel.BLUE: destIndex = 2; break;
				case BitmapDataChannel.ALPHA: destIndex = 3; break;
				
			}
			
			var sx = sourceRect.x | 0, sy = sourceRect.y | 0;
			var smw = (sourceRect.width | 0) + sx, smh = (sourceRect.height | 0) + sy;
			var dx = destPoint.x | 0, dy = destPoint.y | 0;
			
			var srcPixels = sourceBitmapData.__getPixels();
			var destPixels = this.__getPixels();
			
			var srcWidth = sourceBitmapData._width;
			
			for (var y = sy; y < smh; ++y) {
				
				for (var x = sx; x < smw; ++x) {
					
					var srcP = (y * srcWidth + x) * 4;
					var destP = ((y + dy) * this._width + x + dx) * 4;
					
					var srcChannel = srcPixels[srcP + srcIndex];
					var srcAlpha = srcPixels[srcP + 3];
					var srcAlphaMultiplier = srcAlpha / 255;
					if (srcIndex != 3) {
						
						if (srcAlphaMultiplier != 0.0) {
							
							srcChannel /= srcAlphaMultiplier;
							
						} else {
							
							srcChannel = 0;
							
						}
						
					}
					
					var destAlpha = destPixels[destP + 3];
					var destAlphaMultiplier = destAlpha / 255;
					if (destIndex == 3) {
						
						if (destAlphaMultiplier != 1.0) {
							
							if (destAlphaMultiplier != 0.0) {
								
								destPixels[destP] /= destAlphaMultiplier;
								destPixels[destP + 1] /= destAlphaMultiplier;
								destPixels[destP + 2] /= destAlphaMultiplier;
								
							} else {
								
								destPixels[destP] = destPixels[destP + 1] = destPixels[destP + 2] = 0;
								
							}
							
						}
						
						var srcChannelMultiplier = srcChannel / 255;
						if (srcChannelMultiplier != 1.0) {
							
							if (srcChannelMultiplier != 0.0) {
								
								destPixels[destP] *= srcChannelMultiplier;
								destPixels[destP + 1] *= srcChannelMultiplier;
								destPixels[destP + 2] *= srcChannelMultiplier;
								
							} else {
								
								destPixels[destP] = destPixels[destP + 1] = destPixels[destP + 2] = 0;
								
							}
							
						}
						
						destPixels[destP + 3] = srcChannel;
						
					} else {
						
						destPixels[destP + destIndex] = srcChannel * destAlphaMultiplier;
						
					}
					
				}
				
			}
			
			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
		}
		
		/**
		 * Provides a fast routine to perform pixel manipulation between images with no stretching, rotation, or color effects. 
		 * @param sourceBitmapData
		 * @param sourceRect
		 * @param destPoint
		 * @param alphaBitmapData
		 * @param alphaPoint
		 * @param mergeAlpha
		 * 
		 */		
		public copyPixels(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, alphaBitmapData:BitmapData = null, alphaPoint:Point = null, mergeAlpha:boolean = false):void
		{
			/**/ sourceBitmapData = strict(sourceBitmapData, BitmapData); sourceRect = strict(sourceRect, Rectangle); destPoint = strict(destPoint, Point); alphaBitmapData = strict(alphaBitmapData, BitmapData); alphaPoint = strict(alphaPoint, Point); mergeAlpha = Boolean(mergeAlpha);
			if (!sourceBitmapData) {
				
				throw new TypeError('Parameter sourceBitmapData must be non-null.', 2007);
				
			}
			
			if (!sourceRect) {
				
				throw new TypeError('Parameter sourceRect must be non-null.', 2007);
				
			}
			
			if (!destPoint) {
				
				throw new TypeError('Parameter destPoint must be non-null.', 2007);
				
			}
			
			var useAlphaBitmapData = (alphaBitmapData && alphaBitmapData._transparent);
			var blend = (mergeAlpha || (useAlphaBitmapData && !sourceBitmapData._transparent)); 
			
			var rx = sourceRect.x | 0;
			var ry = sourceRect.y | 0;
			var deltaX = (destPoint.x - rx) | 0;
			var deltaY = (destPoint.y - ry) | 0;
			
			var minX = Math.max(rx, 0, -deltaX);
			var minY = Math.max(ry, 0, -deltaY);
			var maxX = Math.min(sourceRect.width + rx, sourceBitmapData._width, this._width - deltaX); 
			var maxY = Math.min(sourceRect.height + ry, sourceBitmapData._height, this._height - deltaY);
			
			if (maxX <= minX || maxY <= minY) {
				
				return;
				
			}
			
			var sourcePixels = sourceBitmapData.__getPixels();
			this.__getPixels();
				
			if (useAlphaBitmapData) {
				
				var alphaPixels = alphaBitmapData.__getPixels();
				var alphaPixelsLen = alphaPixels.byteLength;
				
				var alphaPointX = 0;
				var alphaPointY = 0;
				
				if (alphaPoint) {
					
					alphaPointX = alphaPoint.x;
					alphaPointY = alphaPoint.y;
					
				}
				
				var alphaDeltaX = (alphaPointX - rx) | 0;
				var alphaDeltaY = (alphaPointY - ry) | 0;
				
				// update range for changes
				minX = Math.max(minX, -alphaPointX);
				minY = Math.max(minY, -alphaPointY);
				maxX = Math.min(maxX, alphaBitmapData._width - alphaDeltaX);
				maxY = Math.min(maxY, alphaBitmapData._height - alphaDeltaY);
				
				if (maxX <= minX || maxY <= minY) {
					
					return;
					
				}
				
				if (blend) {
					
					for (var y = minY; y < maxY; y++) {
						
						var sFirstPixelInRow = y * sourceBitmapData._width;
						var cFirstPixelInRow = (y + deltaY) * this._width;
						var aFirstPixelInRow = (y + alphaDeltaY) * alphaBitmapData._width;
						
						for (var x = minX; x < maxX; x++) {
							
							var sPixel = (sFirstPixelInRow + x) * 4;
							var cPixel = (cFirstPixelInRow + x + deltaX) * 4;
							var aPixel = (aFirstPixelInRow + x + alphaDeltaX) * 4;
							
							// get actual alpha after blend
							var sourceAlpha = (aPixel > 0 && aPixel < alphaPixelsLen) ?
								(alphaPixels[aPixel + 3] / 255) * (sourcePixels[sPixel + 3] / 255) : 0;
							
							if (sourceAlpha > 0) {
								
								var destAlpha = this._pixels[cPixel + 3] / 255;
								var oneMinusSourceAlpha = 1 - sourceAlpha;
								var blendAlpha = sourceAlpha + (destAlpha * oneMinusSourceAlpha);
								
								// get color data in current bitmapData
								var cRed = (this._pixels[cPixel] / destAlpha) & 0xff; // current red
								var cGreen = (this._pixels[cPixel + 1] / destAlpha) & 0xff; // current green
								var cBlue = (this._pixels[cPixel + 2] / destAlpha) & 0xff; // curren blue
								
								// get color data in source bitmapData
								var sNpm = sourcePixels[sPixel + 3] / 255;
								var sRed = (sourcePixels[sPixel] / sNpm) & 0xff; // source red
								var sGreen = (sourcePixels[sPixel + 1] / sNpm) & 0xff; // source green
								var sBlue = (sourcePixels[sPixel + 2] / sNpm) & 0xff; // source blue
								
								// get feature color data 
								var fAlpha = (blendAlpha * 255); // feature alpha
								var fRed = (sRed * sourceAlpha + cRed * destAlpha * oneMinusSourceAlpha); // feature red
								var fGreen = (sGreen * sourceAlpha + cGreen * destAlpha * oneMinusSourceAlpha); // feature green
								var fBlue = (sBlue * sourceAlpha + cBlue * destAlpha * oneMinusSourceAlpha); // feature blue
								
								// update pixels in current BitmapData
								this._pixels[cPixel] = fRed & 0xff; // result red
								this._pixels[cPixel + 1] = fGreen & 0xff; // result green
								this._pixels[cPixel + 2] = fBlue & 0xff; // result blue
								this._pixels[cPixel + 3] = fAlpha | 0; // result alpha
								
							}
							
						}
						
					}
					
				} else {
					
					for (var y = minY; y < maxY; y++) {
						
						var sFirstPixelInRow = y * sourceBitmapData._width;
						var cFirstPixelInRow = (y + deltaY) * this._width;
						var aFirstPixelInRow = (y + alphaDeltaY) * alphaBitmapData._width;
						
						for (var x = minX; x < maxX; x++) {
							
							var sPixel = (sFirstPixelInRow + x) * 4;
							var cPixel = (cFirstPixelInRow + x + deltaX) * 4;
							var aPixel = (aFirstPixelInRow + x + alphaDeltaX) * 4;
							
							// get actual alpha after copy pixels
							var sourceAlpha = (aPixel > 0 && aPixel < alphaPixelsLen) ?
								(alphaPixels[aPixel + 3] / 255) * (sourcePixels[sPixel + 3] / 255) : 0;
							//							
							// get color data in current bitmapData
							var cNpm = this._pixels[cPixel] / 255; 
							var cRed = (this._pixels[cPixel] / cNpm) & 0xff; // current red
							var cGreen = (this._pixels[cPixel + 1] / cNpm) & 0xff; // current green
							var cBlue = (this._pixels[cPixel + 2] / cNpm) & 0xff; // curren blue
							
							// get color data in source bitmapData
							var sNpm = sourcePixels[sPixel + 3] / 255;
							var sRed = (sourcePixels[sPixel] / sNpm) & 0xff; // source red
							var sGreen = (sourcePixels[sPixel + 1] / sNpm) & 0xff; // source green
							var sBlue = (sourcePixels[sPixel + 2] / sNpm) & 0xff; // source blue
							
							// update pixels in current BitmapData
							this._pixels[cPixel] = ((sRed & 0xff) * sourceAlpha) & 0xff; // result red
							this._pixels[cPixel + 1] = ((sGreen & 0xff) * sourceAlpha) & 0xff; // result green
							this._pixels[cPixel + 2] = ((sBlue & 0xff) * sourceAlpha) & 0xff; // result blue
							this._pixels[cPixel + 3] = (sourceAlpha * 255) | 0; // result alpha
							
						}
						
					}
					
				}
				
			} else {
				
				if (blend) {
					
					for (var y = minY; y < maxY; y++) {
						
						var cFirstPixelInRow = (y + deltaY) * this._width;
						var sFirstPixelInRow = y * sourceBitmapData._width;
						
						for (var x = minX; x < maxX; x++) {
							
							var cPixel = (cFirstPixelInRow + x + deltaX) * 4;
							var sPixel = (sFirstPixelInRow + x) * 4;
							
							var sourceAlpha = sourcePixels[sPixel + 3] / 255;
							var destAlpha = this._pixels[cPixel + 3] / 255;
							var oneMinusSourceAlpha = 1 - sourceAlpha;
							var blendAlpha = sourceAlpha + (destAlpha * oneMinusSourceAlpha);
							
							if (blendAlpha == 0) {
								
								// set transparent color in current pixel 
								this._pixels[cPixel + 3] = 0;
								
							} else {
								
								// get color data in current bitmapData
								var cRed = (this._pixels[cPixel] / destAlpha) & 0xff; // current red
								var cGreen = (this._pixels[cPixel + 1] / destAlpha) & 0xff; // current green
								var cBlue = (this._pixels[cPixel + 2] / destAlpha) & 0xff; // curren blue
								
								// get color data in source bitmapData
								var sRed = (sourcePixels[sPixel] / sourceAlpha) & 0xff; // source red
								var sGreen = (sourcePixels[sPixel + 1] / sourceAlpha) & 0xff; // source green
								var sBlue = (sourcePixels[sPixel + 2] / sourceAlpha) & 0xff; // source blue
								
								// get feature color data 
								var fAlpha = (blendAlpha * 255); // feature alpha
								var fRed = (sRed * sourceAlpha + cRed * destAlpha * oneMinusSourceAlpha); // feature red
								var fGreen = (sGreen * sourceAlpha + cGreen * destAlpha * oneMinusSourceAlpha); // feature green
								var fBlue = (sBlue * sourceAlpha + cBlue * destAlpha * oneMinusSourceAlpha); // feature blue
								
								// update pixels in current BitmapData
								this._pixels[cPixel] = fRed & 0xff; // result red
								this._pixels[cPixel + 1] = fGreen & 0xff; // result green
								this._pixels[cPixel + 2] = fBlue & 0xff; // result blue
								this._pixels[cPixel + 3] = fAlpha | 0; // result alpha
								
							}
							
						}
						
					}
					
				} else {
					
					for (var y = minY; y < maxY; y++) {
						
						var cFirstPixelInRow = (y + deltaY) * this._width;
						var sFirstPixelInRow = y * sourceBitmapData._width;
						
						for (var x = minX; x < maxX; x++) {
							
							var cPixel = (cFirstPixelInRow + x + deltaX) * 4;
							var sPixel = (sFirstPixelInRow + x) * 4;
							
							// update pixels in current BitmapData from sourceBitmapData
							this._pixels[cPixel] = sourcePixels[sPixel];
							this._pixels[cPixel + 1] = sourcePixels[sPixel + 1];
							this._pixels[cPixel + 2] = sourcePixels[sPixel + 2];
							this._pixels[cPixel + 3] = sourcePixels[sPixel + 3];
							
						}
						
					}
					
				}
				
			}
			
			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
		}
		
		/**
		 * Frees memory that is used to store the BitmapData object. 
		 * 
		 */		
		public dispose():void 
		{
			if (!this._invalid) {
				
				this.__removeStats();
				
			}
			
			if (this._texture) {
				
				this._texture.dispose();
				this._texture = null;
				
			}
			
			if (this._rect) {
				
				Rectangle.__pool.release(this._rect);
				this._rect = null;
				
			}
			
			if (this._textureRect) {
				
				Rectangle.__pool.release(this._textureRect);
				this._textureRect = null;
				
			}
			
			this._ctx = null;
			this._width = this._height = 0;
			this._pixels = this._p2pixels = null;
			this._element = null;
			this._dirtyPixels = this._dirtyTexture = this._modifiedPixels = false;
			this._dirtyDisplayObject = true;
			this._invalid = true;
			
			if (this._listenerDispose) {
				
				this._listenerDispose(this);
				this._listenerDispose = null;
				
			}
		}
		
		/**
		 * Draws the source display object onto the bitmap image, using the Flash runtime vector renderer. 
		 * @param source
		 * @param matrix
		 * @param colorTransform
		 * @param blendMode
		 * @param clipRect
		 * @param smoothing
		 * 
		 */		
		public draw(source:IBitmapDrawable, matrix:Matrix = null, colorTransform:ColorTransform = null, blendMode:string = null, clipRect:Rectangle = null, smoothing:boolean = false):void
		{
			/**/ source = strict(source, 'implements_flash_display_IBitmapDrawable'); matrix = strict(matrix, Matrix); colorTransform = strict(colorTransform, ColorTransform); blendMode = as(blendMode, 'String'); clipRect = strict(clipRect, Rectangle); smoothing = Boolean(smoothing);
			this.__drawWithQuality(source, matrix, colorTransform, blendMode, clipRect, smoothing);
		}
		
		/**
		 * Draws the source display object onto the bitmap image, using the Flash runtime vector renderer. 
		 * @param source
		 * @param matrix
		 * @param colorTransform
		 * @param blendMode
		 * @param clipRect
		 * @param smoothing
		 * @param quality
		 * 
		 */		
		public drawWithQuality(source:IBitmapDrawable, matrix:Matrix = null, colorTransform:ColorTransform = null, blendMode:string = null, clipRect:Rectangle = null, smoothing:boolean = false, quality:string = null):void
		{
			/**/ source = strict(source, 'implements_flash_display_IBitmapDrawable'); matrix = strict(matrix, Matrix); colorTransform = strict(colorTransform, ColorTransform); blendMode = as(blendMode, 'String'); clipRect = strict(clipRect, Rectangle); smoothing = Boolean(smoothing); quality = as(quality, 'String');
			this.__drawWithQuality(source, matrix, colorTransform, blendMode, clipRect, smoothing, quality);
		}
		
		/**
		 * Compresses this BitmapData object using the selected compressor algorithm and returns a new ByteArray object. Optionally, writes the resulting data to the specified ByteArray. The compressor argument specifies the encoding algorithm, and can be PNGEncoderOptions, JPEGEncoderOptions, or JPEGXREncoderOptions.
		 * 
		 * The following example compresses a BitmapData object using the JPEGEncoderOptions:
		 * 
		 * // Compress a BitmapData object as a JPEG file.
		 * var bitmapData:BitmapData = new BitmapData(640,480,false,0x00FF00);
		 * var byteArray:ByteArray = new ByteArray();
		 * bitmapData.encode(new Rectangle(0,0,640,480), new flash.display.JPEGEncoderOptions(), byteArray);
		 *   
		 * @param rect
		 * @param compressor
		 * @param byteArray
		 * @return 
		 * 
		 */		
		public encode (rect : Rectangle, compressor : any, byteArray : ByteArray = null) : ByteArray
		{
			/**/ rect = strict(rect, Rectangle); byteArray = strict(byteArray, ByteArray);
			var mime : string;
			var quality : number = 100;
			
			if (is(compressor , PNGEncoderOptions)) {
				
				mime = 'image/png';
				
			}
			
			if (is(compressor , JPEGEncoderOptions)) {
				
				mime = 'image/jpeg';
				quality =(( (as(compressor , JPEGEncoderOptions)).quality) >> 0);
				
			}
			
			if (is(compressor , JPEGXREncoderOptions)) {
				
				throw new Error('JPEGXREncoderOptions is not implemented');
				
			}
			
			if (mime) {
				
				var buff = BitmapData.__popSystemCtx(this._p2width, this._p2height, true);
				var canvas = buff.canvas;
				
				// WARNING: slow operation detected
				canvas.width = this._width;
				canvas.height = this._height;
				
				// create
				var dataURL = this.__toCanvas(buff).toDataURL(mime, quality / 100);
				
				// WARNING: slow operation detected
				canvas.width = this._p2width;
				canvas.height = this._p2height;
				
				BitmapData.__pushSystemCtx(buff);
				
				var tmp = Base64.decode(dataURL.substr(dataURL.indexOf(',') + 1));
				
				if (byteArray) {
					
					return byteArray.__fromByteArray(tmp); // direct link (without copy)
					
				}
				
				return tmp;
				
			}
			
			return null;
		}
		
		/**
		 * Fills a rectangular area of pixels with a specified ARGB color. 
		 * @param rect
		 * @param fillColor
		 * 
		 */		
		public fillRect(rect:Rectangle, fillColor:number):void
		{
			/**/ rect = strict(rect, Rectangle); fillColor = ((fillColor) >>> 0);
			var argb:number = this._transparent ? fillColor : (0xff << 24) | fillColor;
			var x = rect.x | 0, y = rect.y | 0, w = rect.width | 0, h = rect.height | 0;
			
			this._ctx.saveAndReset();
			this._ctx.setRenderToBitmapData(this).clearRect(x, y, w, h).fillRect(x, y, w, h, argb);
			this._ctx.restore();
			
			this._version++;
			this._element = null;
			this._dirtyPixels = this._dirtyDisplayObject = true;
		}
		
		/**
		 * Performs a flood fill operation on an image starting at an (x, y) coordinate and filling with a certain color. 
		 * @param x
		 * @param y
		 * @param color
		 * 
		 */		
		public floodFill(x:number, y:number, color:number):void
		{
			/**/ x = ((x) >> 0); y = ((y) >> 0); color = ((color) >>> 0);
			if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
				
				return;
				
			}
			
			if (!this._transparent) {
				
				color =(( (0xff << 24) | color) >>> 0);
				
			}
			
			this.__getPixels();
			
			var startColor = this.__getPixel32__pure(x, y);
			if (startColor == color) {
				
				return;
				
			}
			
			var buffer = [x, y];
			while (buffer.length) {
				
				var xPoint = buffer.shift();
				var yPoint = buffer.shift();
				
				// scanning pixels to the left of currentPixel
				for (var xLeft = xPoint; 0 < xLeft; xLeft--) {
					
					if (this.__getPixel32__pure(xLeft - 1, yPoint) != startColor) {
						
						break;
						
					}
					
				}

				// scanning pixels to the right of currentPixel
				for (var xRight = xPoint; xRight < this._width - 1; xRight++) {
					
					if (this.__getPixel32__pure(xRight + 1, yPoint) != startColor) {
						
						break;
						
					}
					
				}
				
				// fill in pixels in line from xLeft to xRight
				for (var i = xLeft; i <= xRight; i++) {
					
					this.__setPixel32__pure(i, yPoint, color);
					
				}
				
				// scanning pixel in prev line and add to `buffer` actual pixels
				if (yPoint + 1 < this._height) {
					
					__scanLine.__bind(this)(xLeft, xRight, yPoint + 1, startColor, buffer);
					
				}
				
				// scanning pixel in next line and add to `buffer` actual pixels
				if (yPoint > 0) {
					
					__scanLine.__bind(this)(xLeft, xRight, yPoint - 1, startColor, buffer);
					
				}
				
			}
			
			function __scanLine(xLeft, xRight, y, targetColor, buffer):void {
				
				while (xLeft <= xRight) {
					
					// cut the left pixel if it has different color
					while (this.__getPixel32__pure(xLeft, y) != targetColor && xRight > xLeft++);
					
					// if pixels not found
					if (xRight < xLeft) {
						
						break;
						
					}
					
					xLeft++;
					
					// find last the left pixel (first the right pixel) where `color == targetColor`
					while (this.__getPixel32__pure(xLeft, y) == targetColor && xRight > xLeft++);
					
					buffer.push(xLeft - 1);
					buffer.push(y);
					
				}
				
			}
			
			this._element = null;
			this._dirtyDisplayObject = this._dirtyTexture = this._modifiedPixels = true;
		}
		
		/**
		 * Determines the destination rectangle that the applyFilter() method call affects, given a BitmapData object, a source rectangle, and a filter object. 
		 * @param sourceRect
		 * @param filter
		 * @return 
		 * 
		 */		
		public generateFilterRect(sourceRect:Rectangle, filter:BitmapFilter) : Rectangle
		{
			/**/ sourceRect = strict(sourceRect, Rectangle); filter = strict(filter, BitmapFilter);
			return filter.__bounds(sourceRect.clone());
		}
		
		/**
		 * Determines a rectangular region that either fully encloses all pixels of a specified color within the bitmap image 
		 * (if the findColor parameter is set to true) or fully encloses all pixels that do not include the specified color 
		 * (if the findColor parameter is set to false). 
		 * @param mask
		 * @param color
		 * @param findColor
		 * @return 
		 * 
		 */
		public getColorBoundsRect(mask:number, color:number, findColor:boolean = true):Rectangle
		{
			/**/ mask = ((mask) >>> 0); color = ((color) >>> 0); findColor = Boolean(findColor);
			if (!this._transparent) {
				
				mask =(( (0xff << 24) | mask) >>> 0);
				color =(( (0xff << 24) | color) >>> 0);
				
			}
			
			this.__getPixels();
			
			var xMin, xMax, yMin, yMax;
			for (var i = 0, len = this._pixels.byteLength; i < len; i += 4) {
				
				var a = this._pixels[i + 3];
				var npm = a / 255;
				var pixelColor32 = (
					(a << 24) | // alpha
					(((this._pixels[i] / npm) & 0xff) << 16) | // red
					(((this._pixels[i + 1] / npm) & 0xff) << 8) | // green
					((this._pixels[i + 2] / npm) & 0xff) // blue
					& mask // AND mask
				) >>> 0;
				
				if ((findColor && pixelColor32 == color) || (!findColor && pixelColor32 != color)) {
					
					var pixelIndex = i / 4;
					var pixelX = pixelIndex % this._width; // x coordinate
					var pixelY = (pixelIndex / this._width) | 0;  // y coordinate
					
					if (xMin == undefined) {
						
						xMin = xMax = pixelX;
						yMin = yMax = pixelY;
						
					} else {
						
						if (pixelX < xMin) xMin = pixelX;
						else if (pixelX > xMax) xMax = pixelX;
						
						if (pixelY < yMin) yMin = pixelY;
						else if (pixelY > yMax) yMax = pixelY;
						
					}
					
				}
				
				if (xMin == 0 && xMax === this._width - 1 && yMin == 0 && yMax === this._height - 1) {
					
					break;
				
				}
				
			}
			
			return xMin == undefined ?
				new Rectangle(0, 0, 0, 0) :
				new Rectangle(xMin, yMin, xMax - xMin + 1, yMax - yMin + 1);
		}
		
		/**
		 * Generates a byte array from a rectangular region of pixel data. 
		 * @param rect
		 * @return 
		 * 
		 */		
		public getPixels(rect:Rectangle):ByteArray
		{
			/**/ rect = strict(rect, Rectangle);
			var dest = new ByteArray;
			
			if (rect.width <= 0 || rect.height <= 0) {
				
				return dest;
				
			}
			
			var sx = rect.x | 0, sy = rect.y | 0;
			var sw = rect.width | 0, sh = rect.height | 0;
			dest.length = sw * sh * 4;
			
			this.__getPixels();
			
			for (var y = sy; y < sh; ++y) {
				
				for (var x = sx; x < sw; ++x) {
					
					dest.writeUnsignedInt(this.getPixel32(x, y));
					
				}
				
			}
			
			return dest;
		}
		
		/**
		 * Fills a byte array from a rectangular region of pixel data. 
		 * @param rect
		 * @param data
		 * 
		 */		
		public copyPixelsToByteArray(rect:Rectangle, data:ByteArray):void
		{
			/**/ rect = strict(rect, Rectangle); data = strict(data, ByteArray);
			if (rect.width <= 0 || rect.height <= 0) return;
			
			var sx = rect.x | 0, sy = rect.y | 0;
			var sw = rect.width | 0, sh = rect.height | 0;
			
			this.__getPixels();
			
			for (var y = sy; y < sh; ++y) {
				
				for (var x = sx; x < sw; ++x) {
					
					data.writeUnsignedInt(this.getPixel32(x, y));
					
				}
				
			}
		}
		
		/**
		 * Generates a vector array from a rectangular region of pixel data. 
		 * @param rect
		 * @return 
		 * 
		 */		
		public getVector(rect:Rectangle):number[]
		{
			/**/ rect = strict(rect, Rectangle);
			var dest:number[] = new Array;
			
			if (rect.width <= 0 || rect.height <= 0) return dest;
			
			var sx = rect.x | 0, sy = rect.y | 0;
			var sw = rect.width | 0, sh = rect.height | 0;
			
			this.__getPixels();
			
			for (var y = sy; y < sh; ++y) {
				
				for (var x = sx; x < sw; ++x) {
					
					dest[dest.length] = this.getPixel32(x, y);
					
				}
				
			}
			
			return dest;
		}
		
		/**
		 * Performs pixel-level hit detection between one bitmap image and a point, rectangle, or other bitmap image. 
		 * @param firstPoint
		 * @param firstAlphaThreshold
		 * @param secondObject
		 * @param secondBitmapDataPoint
		 * @param secondAlphaThreshold
		 * @return 
		 * 
		 */		
		public hitTest(firstPoint:Point, firstAlphaThreshold:number, secondObject:any, secondBitmapDataPoint:Point = null, secondAlphaThreshold:number = 1):boolean
		{
			/**/ firstPoint = strict(firstPoint, Point); firstAlphaThreshold = ((firstAlphaThreshold) >>> 0); secondBitmapDataPoint = strict(secondBitmapDataPoint, Point); secondAlphaThreshold = ((secondAlphaThreshold) >>> 0);
			if (!firstPoint) {
				
				throw new TypeError('Parameter firstPoint must be non-null', 2007);
				
			}
			
			if (!(is(secondObject , Point) || is(secondObject , Rectangle) || (is(secondObject , Bitmap) && secondObject.bitmapData) || is(secondObject , BitmapData))) {
				
				throw new ArgumentError('Parameter 0 is of the incorrect type. Should be type one of the types: Point, Rectangle, Bitmap, BitmapData', 2005);
				
			}
			
			this.__getPixels();
			
			var fx = firstPoint.x; // slide-x bitmapData
			var fy = firstPoint.y; // slide-y bitmapData
			var sx, sy;
			
			if (is(secondObject , Point)) {
				
				sx = (secondObject.x - fx) | 0;
				sy = (secondObject.y - fy) | 0;
				
				if (sx >= this._width || sy >= this._height || sx < 0 || sy < 0) {
					
					return false;
					
				}
				
				return firstAlphaThreshold <= this._pixels[((this._width * sy) + sx) * 4 + 3];
			}
			
			var secondRect = Rectangle.__pool.get();
			if (is(secondObject , Rectangle)) {
				
				secondRect.__copyFrom(secondObject);
				secondRect.x = (secondRect.x - fx) | 0;
				secondRect.y = (secondRect.y - fy) | 0;
				
				secondRect.__intersectInPlace(this._rect);
				if (secondRect.isEmpty()) {
					
					Rectangle.__pool.release(secondRect);
					return false;
					
				}
				
				for (var y = secondRect.y, h = y + secondRect.height; y < h; y++) {
					
					for (var x = secondRect.x, w = x + secondRect.width; x < w; x++) {
						
						if (firstAlphaThreshold <= this._pixels[((this._width * y) + x) * 4 + 3]) {
							
							Rectangle.__pool.release(secondRect);
							return true;
							
						}
						
					}
					
				}
				
			} else {
				
				if (is(secondObject , Bitmap)) {
					
					secondObject = secondObject.bitmapData;
					
				}
				
				secondRect.__copyFrom(secondObject._rect);
				secondRect.__intersectInPlace(this._rect);
				
				if (secondRect.isEmpty()) {
					
					Rectangle.__pool.release(secondRect);
					return false;
					
				}
				
				var secondPixels = secondObject.__getPixels();
				var sx = (secondBitmapDataPoint.x - fx) | 0;
				var sy = (secondBitmapDataPoint.y - fy) | 0;
				var sw = secondRect.width;
				var sh = secondRect.height;
				
				for (var y = sy, h = y + sh; y < h; y++) {
					
					for (var x = sx, w = x + sw; x < w; x++) {
						
						var alpha = this._pixels[((this._width * y) + x) * 4 + 3];
						var secondAlpha = secondPixels[((sw * (y - sy)) + (x - sx)) * 4 + 3];
						if (firstAlphaThreshold <= alpha && secondAlphaThreshold <= secondAlpha) {
							
							Rectangle.__pool.release(secondRect);
							return true;
							
						}
						
					}
					
				}
				
			}
			
			Rectangle.__pool.release(secondRect);
			return false;
		}
		
		/**
		 * Performs per-channel blending from a source image to a destination image. 
		 * @param sourceBitmapData
		 * @param sourceRect
		 * @param destPoint
		 * @param redMultiplier
		 * @param greenMultiplier
		 * @param blueMultiplier
		 * @param alphaMultiplier
		 * 
		 */				
		public merge(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, redMultiplier:number, greenMultiplier:number, blueMultiplier:number, alphaMultiplier:number):void
		{
			/**/ sourceBitmapData = strict(sourceBitmapData, BitmapData); sourceRect = strict(sourceRect, Rectangle); destPoint = strict(destPoint, Point); redMultiplier = ((redMultiplier) >>> 0); greenMultiplier = ((greenMultiplier) >>> 0); blueMultiplier = ((blueMultiplier) >>> 0); alphaMultiplier = ((alphaMultiplier) >>> 0);
			if (!sourceBitmapData) {
				
				throw new TypeError('Parameter sourceBitmapData must be non-null.', 2007);
				
			}
			
			if (!sourceRect) {
				
				throw new TypeError('Parameter sourceRect must be non-null.', 2007);
				
			}
			
			if (!destPoint) {
				
				throw new TypeError('Parameter destPoint must be non-null.', 2007);
				
			}
			
			var rx = sourceRect.x | 0;
			var ry = sourceRect.y | 0;
			var deltaX = (destPoint.x - rx) | 0;
			var deltaY = (destPoint.y - ry) | 0;
			var minX = Math.max(rx, 0, -deltaX);
			var minY = Math.max(ry, 0, -deltaY);
			var maxX = Math.min(sourceRect.width + rx, sourceBitmapData._width - 1, this._width - deltaX - 1); 
			var maxY = Math.min(sourceRect.height + ry, sourceBitmapData._height - 1, this._height - deltaY - 1);
			
			if (maxX <= minX || maxY <= minY) {
				
				return;
				
			}
			
			this.__getPixels();
			var pixels = this._pixels;
			var sourcePixels = sourceBitmapData.__getPixels();
			var maxMultiplier = 0x100;
			
			var buffer;
			if (sourceBitmapData === this) {
				
				buffer = this.clone();
				
			}
			
			internalMerge.__bind(this)();
			
			if (sourceBitmapData === this) {
				
				pixels = buffer.__getPixels();
				
				minX = Math.max(deltaX + minX, minX);
				minY = Math.max(deltaY + minY, minY);

				maxX = Math.min(deltaX + maxX, maxX);
				maxY = Math.min(deltaY + maxY, maxY);
				
				internalMerge.__bind(this)();
				
				buffer.dispose();
				
			}
			
			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
			
			/**
			 * Repeat hook
			 */
			function internalMerge ():void {
				
				for (var x = minX; x < maxX; x++) {
					
					var cx = x + deltaX; // x-position in current BitmapData
					
					for (var y = minY; y < maxY; y++) {
						
						var cy = y + deltaY; // y-position in current BitmapData
						
						// get color data in current bitmapData
						var cPixel = (cy * this._width + cx) * 4;
						var cAlpha =  pixels[cPixel + 3]; // current alpha
						var cNpm = cAlpha / 255;
						var cRed = (pixels[cPixel] / cNpm) & 0xff; // current red
						var cGreen = (pixels[cPixel + 1] / cNpm) & 0xff; // current green
						var cBlue = (pixels[cPixel + 2] / cNpm) & 0xff; // curren blue
						
						// get color data in source bitmapData
						var sPixel = (y * sourceBitmapData._width + x) * 4;
						var sAlpha =  sourcePixels[sPixel + 3]; // source alpha
						var sNpm = sAlpha / 255;
						var sRed = (sourcePixels[sPixel] / sNpm) & 0xff; // source red
						var sGreen = (sourcePixels[sPixel + 1] / sNpm) & 0xff; // source green
						var sBlue = (sourcePixels[sPixel + 2] / sNpm) & 0xff; // source blue
						
						// get feature color data 
						var fAlpha = ((sAlpha * alphaMultiplier) + (cAlpha * (maxMultiplier - alphaMultiplier))) / maxMultiplier; // feature alpha
						var fNpm = fAlpha / 255;
						var fRed = ((sRed * redMultiplier) + (cRed * (maxMultiplier - redMultiplier))) / maxMultiplier; // feature red (witout npm)
						var fGreen = ((sGreen * greenMultiplier) + (cGreen * (maxMultiplier - greenMultiplier))) / maxMultiplier; // feature green (witout npm)
						var fBlue = ((sBlue * blueMultiplier) + (cBlue * (maxMultiplier - blueMultiplier))) / maxMultiplier; // feature blue (witout npm)
						
						// set updated colors in pixel
						this._pixels[cPixel] = ((fRed & 0xff) * fNpm) & 0xff; // result red
						this._pixels[cPixel + 1] = ((fGreen & 0xff) * fNpm) & 0xff; // result green
						this._pixels[cPixel + 2] = ((fBlue & 0xff) * fNpm) & 0xff; // result blue
						this._pixels[cPixel + 3] = fAlpha; // result alpha
						
					}
					
				}
				
			}
		}
		
		/**
		 * Fills an image with pixels representing random noise. 
		 * @param randomSeed
		 * @param low
		 * @param high
		 * @param channelOptions
		 * @param grayScale
		 * 
		 */		
		public noise(randomSeed:number, low:number = 0, high:number = 255, channelOptions:number = 7, grayScale:boolean = false):void
		{
			/**/ randomSeed = ((randomSeed) >> 0); low = ((low) >>> 0); high = ((high) >>> 0); channelOptions = ((channelOptions) >>> 0); grayScale = Boolean(grayScale);
			BitmapData.sHelperNoiseFilter.randomSeed = randomSeed;
			BitmapData.sHelperNoiseFilter.low = low;
			BitmapData.sHelperNoiseFilter.high = high;
			BitmapData.sHelperNoiseFilter.channelOptions = channelOptions;
			BitmapData.sHelperNoiseFilter.grayScale = grayScale;
			BitmapData.sHelperNoiseFilter.transparent = this._transparent;
			
			var p = Point.__pool.get();
			this.applyFilter(this, this.rect, p, BitmapData.sHelperNoiseFilter);
			Point.__pool.release(p);
		}
		
		/**
		 * Remaps the color channel values in an image that has up to four arrays of color palette data, one for each channel. 
		 * @param sourceBitmapData
		 * @param sourceRect
		 * @param destPoint
		 * @param redArray
		 * @param greenArray
		 * @param blueArray
		 * @param alphaArray
		 * 
		 */				
		public paletteMap(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, redArray:any[] = null, greenArray:any[] = null, blueArray:any[] = null, alphaArray:any[] = null):void
		{
			/**/ sourceBitmapData = strict(sourceBitmapData, BitmapData); sourceRect = strict(sourceRect, Rectangle); destPoint = strict(destPoint, Point); redArray = strict(redArray, Array); greenArray = strict(greenArray, Array); blueArray = strict(blueArray, Array); alphaArray = strict(alphaArray, Array);
			if (!sourceBitmapData) {
				
				throw new TypeError('Parameter sourceBitmapData must be non-null.', 2007);
				
			}
			
			if (!sourceRect) {
				
				throw new TypeError('Parameter sourceRect must be non-null.', 2007);
				
			}
			
			if (!destPoint) {
				
				throw new TypeError('Parameter destPoint must be non-null.', 2007);
				
			}
			
			var rx = sourceRect.x | 0;
			var ry = sourceRect.y | 0;
			var deltaX = (destPoint.x - rx) | 0;
			var deltaY = (destPoint.y - ry) | 0;
			var minX = Math.max(rx, 0, -deltaX);
			var minY = Math.max(ry, 0, -deltaY);
			var maxX = Math.min(sourceRect.width + rx, sourceBitmapData._width - 1, this._width - deltaX - 1); 
			var maxY = Math.min(sourceRect.height + ry, sourceBitmapData._height - 1, this._height - deltaY - 1);
			
			if (maxX <= minX || maxY <= minY) {
				
				return;
				
			}
			
			this.__getPixels();
			var sourcePixels = sourceBitmapData.__getPixels();
			
			internalPaletteMap.__bind(this)();
			
			if (sourceBitmapData === this) {
				
				minX = Math.max(deltaX + minX, minX);
				minY = Math.max(deltaY + minY, minY);
				
				maxX = Math.min(deltaX + maxX, maxX);
				maxY = Math.min(deltaY + maxY, maxY);
				
				internalPaletteMap.__bind(this)();
				
			}
			
			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
			
			/**
			 * Repeat hook
			 */
			function internalPaletteMap ():void {
				for (var x = minX; x < maxX; x++) {
				
				var cx = x + deltaX; // x-position in current BitmapData
				
					for (var y = minY; y < maxY; y++) {
						
						var cy = y + deltaY; // y-position in current BitmapData
						
						// get color data in source bitmapData
						var sPixel = (y * sourceBitmapData._width + x) * 4;
						var sAlpha =  sourcePixels[sPixel + 3]; // source alpha
						var sNpm = sAlpha / 255;
						var sRed = (sourcePixels[sPixel] / sNpm) & 0xff; // source red
						var sGreen = (sourcePixels[sPixel + 1] / sNpm) & 0xff; // source green
						var sBlue = (sourcePixels[sPixel + 2] / sNpm) & 0xff; // source blue
	
						// get color from array
						var chRed = redArray ? redArray[sRed] : sRed << 16;
						var chGreen = greenArray ? greenArray[sGreen] : sGreen << 8;
						var chBlue = blueArray ? blueArray[sBlue] : sBlue << 0;
						var chAlpha = alphaArray ? alphaArray[sAlpha] : (sAlpha << 24) >>> 0;
						
						// get feature color data
						var fAlpha = ((chRed >> 24 & 0xff) + (chGreen >> 24 & 0xff) + (chBlue >> 24 & 0xff) + (chAlpha >> 24 & 0xff)) % 256; // feature red (witout npm)
						var fNpm = fAlpha / 255;
						var fRed = ((chRed >> 16 & 0xff) + (chGreen >> 16 & 0xff) + (chBlue >> 16 & 0xff) + (chAlpha >> 16 & 0xff)) % 256; // feature red (witout npm)
						var fGreen = ((chRed >> 8 & 0xff) + (chGreen >> 8 & 0xff) + (chBlue >> 8 & 0xff) + (chAlpha >> 8 & 0xff)) % 256; // feature red (witout npm)
						var fBlue = ((chRed & 0xff) + (chGreen & 0xff) + (chBlue & 0xff) + (chAlpha & 0xff)) % 256; // feature red (witout npm)
						
						var cPixel = (cy * this._width + cx) * 4; // get pixel position in current bitmapData
						// set updated colors in pixel
						this._pixels[cPixel] = ((fRed & 0xff) * fNpm) & 0xff; // result red
						this._pixels[cPixel + 1] = ((fGreen & 0xff) * fNpm) & 0xff; // result green
						this._pixels[cPixel + 2] = ((fBlue & 0xff) * fNpm) & 0xff; // result blue
						this._pixels[cPixel + 3] = fAlpha; // result alpha
						
					}
					
				}
			}
		}
		
		/**
		 * Generates a Perlin noise image.
		 * https://zh.wikipedia.org/zh-hans/Perlin%E5%99%AA%E5%A3%B0 
		 * @param baseX
		 * @param baseY
		 * @param numOctaves
		 * @param randomSeed
		 * @param stitch
		 * @param fractalNoise
		 * @param channelOptions
		 * @param grayScale
		 * @param offsets
		 * 
		 */		
		public perlinNoise(baseX:number, baseY:number, numOctaves:number, randomSeed:number, stitch:boolean, fractalNoise:boolean, channelOptions:number = 7, grayScale:boolean = false, offsets:any[] = null):void
		{
			/**/ baseX = (+(baseX)); baseY = (+(baseY)); numOctaves = ((numOctaves) >>> 0); randomSeed = ((randomSeed) >> 0); stitch = Boolean(stitch); fractalNoise = Boolean(fractalNoise); channelOptions = ((channelOptions) >>> 0); grayScale = Boolean(grayScale); offsets = strict(offsets, Array);
			this.__getPixels();
			for (var y = 0; y < this._height; ++y) {
				
				for (var x = 0; x < this._width; ++x) {
					
					var p = (y * this._width + x) * 4;
					this._pixels[p] = 0x0; // red
					this._pixels[p + 1] = 0x0; // green
					this._pixels[p + 2] = 0x0; // blue
					this._pixels[p + 3] = 0xff; // alpha
					
				}
				
			}
			
			var bw = this._width;
			var bh = this._height;
			
			var chs = [];
			if (channelOptions & BitmapDataChannel.RED) chs.push([ 0, randomSeed ]);
			if (channelOptions & BitmapDataChannel.GREEN) chs.push([ 1, randomSeed + (grayScale ? 0 : 5) ]);
			if (channelOptions & BitmapDataChannel.BLUE) chs.push([ 2, randomSeed + (grayScale ? 0 : 10) ]);
			
			var chlen = chs.length;
			var octaves = numOctaves;
			var totalAmplitude = 0;
			var amplitude = 1;
			var baseXB = baseX;
			var baseYB = baseY;
			var persistance = 0.6;
			
			while (true) {
				
				totalAmplitude += amplitude;
				baseX = ((baseX) >> 0);
				baseY = ((baseY) >> 0);
				
				if (octaves <= 0 || baseX <= 1 || baseY <= 1) {
					
					break;
					
				}
				
				amplitude *= persistance;
				octaves--;
				baseX /= 2;
				baseY /= 2;
				
			}
			
			baseX =(+( baseXB));
			baseY =(+( baseYB));
			amplitude = 1;
			octaves = numOctaves;
			
			while (true) {
				
				baseX = ((baseX) >> 0);
				baseY = ((baseY) >> 0);
				
				if (octaves <= 0 || baseX <= 1 || baseY <= 1) {
					
					break;
					
				}
				
				var offsetX = 0;
				var offsetY = 0;
				if (offsets) {
					
					var offset = offsets[numOctaves - octaves];
					if (offset) {
						
						offsetX = ((offset.x / 16) >> 0);
						offsetY = ((offset.y / 16) >> 0);
						
					}
					
				}
				var nx = Math.ceil(bw / baseX);
				var ny = Math.ceil(bh / baseY);
				for (var y = 0; y <= ny; y++ ) {
					
					for (var x = 0; x <= nx; x++ ) {
						
						if (x != 0 && y != 0) {
							
							for (var i = 0; i < chlen; i++ ) {
								
								var chci = chs[i][0];
								var chpi = chs[i][1];
								
								var r00 = BitmapData.sHelperPerlinNoise[((x - 1 + chpi + offsetX) % 16) + ((y - 1 + chpi + offsetY) % 16) * 16];
								var r10 = BitmapData.sHelperPerlinNoise[((x + chpi + offsetX) % 16) + ((y - 1 + chpi + offsetY) % 16) * 16];
								var r01 = BitmapData.sHelperPerlinNoise[((x - 1 + chpi + offsetX) % 16) + ((y + chpi + offsetY) % 16) * 16];
								var r11 = BitmapData.sHelperPerlinNoise[((x + chpi + offsetX) % 16) + ((y + chpi + offsetY) % 16) * 16];
								
								var w = x * baseX;
								if (w > bw) {
									
									w = bw;
									
								}
								
								var h = y * baseY;
								if (h > bh) {
									
									h = bh;
									
								}
								
								var sx = (((x - 1) * baseX) >> 0);
								var sy = (((y - 1) * baseY) >> 0);
								for (var bx = sx; bx < w; bx++) {
									
									var tx = (bx - sx) / baseX;
									tx = tx * tx * (3   - 2 * tx);
									//tx = 6 * tx * tx * tx * tx * tx - 15 * tx * tx * tx * tx + 10 * tx * tx * tx;
									
									for (var by = sy; by < h; by++) {
										
										var ty = (by - sy) / baseY;
										ty = ty * ty * (3   - 2 * ty);
										//ty = 6 * ty * ty * ty * ty * ty - 15 * ty * ty * ty * ty + 10 * ty * ty * ty;
										var cx0 = r10 * tx + r00 * (1 - tx);
										var cx1 = r11 * tx + r01 * (1 - tx);
										var c = cx1 * ty + cx0 * (1 - ty);
										this._pixels[(bx + by * bw) * 4 + chci] += c * amplitude / totalAmplitude;
										
									}
								}
							}
						}
					}
				}
				
				octaves--;
				baseX /= 2;
				baseY /= 2;
				amplitude *= persistance;
				
			}
			
			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
		}
		
		/**
		 * Performs a pixel dissolve either from a source image to a destination image or by using the same image. 
		 * @param sourceBitmapData
		 * @param sourceRect
		 * @param destPoint
		 * @param randomSeed
		 * @param numPixels
		 * @param fillColor
		 * @return 
		 * 
		 */		
		public pixelDissolve(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, randomSeed:number = 0, numPixels:number = 0, fillColor:number = 0):number
		{
			/**/ sourceBitmapData = strict(sourceBitmapData, BitmapData); sourceRect = strict(sourceRect, Rectangle); destPoint = strict(destPoint, Point); randomSeed = ((randomSeed) >> 0); numPixels = ((numPixels) >> 0); fillColor = ((fillColor) >>> 0);
			if (!sourceBitmapData) {
				
				throw new TypeError('Parameter sourceBitmapData must be non-null.', 2007);
				
			}
			
			if (!sourceRect) {
				
				throw new TypeError('Parameter sourceRect must be non-null.', 2007);
				
			}
			
			if (!destPoint) {
				
				throw new TypeError('Parameter destPoint must be non-null.', 2007);
				
			}
			
			if (numPixels < 0) {
				
				throw new TypeError('Parameter numPixels must be a non-negative number.', 2027);
				
			}
			
			var sw = sourceRect.width | 0;
			var sh = sourceRect.height | 0;
			var rx = sourceRect.x | 0;
			var ry = sourceRect.y | 0;
			var isSame = (sourceBitmapData === this);
			var deltaX = isSame ? 0 : (destPoint.x - rx) | 0;
			var deltaY = isSame ? 0 : (destPoint.y - ry) | 0;
			var minX = Math.max(rx, 0, -deltaX);
			var minY = Math.max(ry, 0, -deltaY);
			var maxX = Math.min(sw + rx, sourceBitmapData._width, this._width - deltaX); 
			var maxY = Math.min(sh + ry, sourceBitmapData._height, this._height - deltaY);
			
			if (maxX <= minX || maxY <= minY) {
				
				return;
				
			}
			
			this.__getPixels();
			var sourcePixels = sourceBitmapData.__getPixels();
			
			var pixelsCount = sw * sh;
			numPixels = numPixels || (pixelsCount / 30) | 0;
			
			var red, green, blue, alpha;
			
			if (isSame) {
				
				alpha = sourceBitmapData._transparent ? (fillColor >> 24 & 0xff) : 0xff;
				var pm = alpha / 255;
				red = ((fillColor >> 16 & 0xff) * pm) & 0xff;
				green = ((fillColor >> 8 & 0xff) * pm) & 0xff;
				blue = ((fillColor & 0xff) * pm) & 0xff;
				
			}
			
			Random.seed(randomSeed);
			
			while (0 < numPixels) {
				
				var randomX = Random.range(minX, maxX);
				var randomY = Random.range(minY, maxY);
				var p = randomY * sourceBitmapData._width + randomX;
				
				var cx = randomX + deltaX; // x-position in current BitmapData
				var cy = randomY + deltaY; // y-position in current BitmapData
				
				numPixels--;
				
				var cPixel = (cy * this._width + cx) * 4;
				if (isSame) {
					
					this._pixels[cPixel] = red; // result red
					this._pixels[cPixel + 1] = green; // result green
					this._pixels[cPixel + 2] = blue; // result blue
					this._pixels[cPixel + 3] = alpha; // result alpha
					
				} else {
					
					var sPixel = p * 4;
					this._pixels[cPixel] = sourcePixels[sPixel]; // result red
					this._pixels[cPixel + 1] = sourcePixels[sPixel + 1]; // result green
					this._pixels[cPixel + 2] = sourcePixels[sPixel + 2]; // result blue
					this._pixels[cPixel + 3] = sourcePixels[sPixel + 3]; // result alpha
					
				}
				
			}

			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;

			return Random.short();
		}
		
		/**
		 * Scrolls an image by a certain (x, y) pixel amount. 
		 * @param x
		 * @param y
		 * 
		 */		
		public scroll(x:number, y:number):void
		{
			/**/ x = ((x) >> 0); y = ((y) >> 0);
			var ax = Math.abs(x), ay = Math.abs(y);
			if ((x == 0 && y == 0) || ax > this._width || ay > this._height) {
				
				return;
				
			}
			
			this._ctx.saveAndReset();
			
			try {
				
				var backBuffer : BitmapData = SystemBitmapData.__popBuffer(this._width, this._height, this._transparent, true);
				this._ctx.setRenderToBitmapData(backBuffer);
				
				var m = Matrix.__pool.get();
				m.__translate(x, y);
				
				var width = this._width - ax;
				var height = this._height - ay;
				if (x < 0) x = 0;
				if (y < 0) y = 0;
				
				this._ctx.drawImage(this); // draw self into buffer
				this._ctx.setRenderToBitmapData(this).clearRect(x, y, width, height).clipRect(x, y, width, height);
				this._ctx.setTransformFromMatrix(m);
				this._ctx.drawImage(backBuffer);
				
				this._element = null;
				this._dirtyTexture = false;
				this._dirtyPixels = this._dirtyDisplayObject = true;
				
			} catch (e) {
				
				e = window.asc.e2e(e);
				
				trace(e.getStackTrace());
				
			} finally {
				
				Matrix.__pool.release(m);
				
				if (backBuffer) {
					
					backBuffer.dispose();
					
				}
				
				this._ctx.restore();
			}
		}
		
		/**
		 * Converts a byte array into a rectangular region of pixel data. 
		 * @param rect
		 * @param inputByteArray
		 * 
		 */		
		public setPixels(rect:Rectangle, inputByteArray:ByteArray):void
		{
			/**/ rect = strict(rect, Rectangle); inputByteArray = strict(inputByteArray, ByteArray);
			if (rect.width <= 0 || rect.height <= 0) {
				
				return;
				
			}
			
			var sx = rect.x | 0, sy = rect.y | 0;
			var smw = (rect.width | 0) + sx, smh = (rect.height | 0) + sy;
			
			this.__getPixels();
			
			for (var y = sy; y < smh; ++y) {
				
				for (var x = sx; x < smw; ++x) {
					
					var color:number = inputByteArray.readUnsignedInt();
					var p = (y * this._width + x) * 4;
					var a = color >>> 24;
					var pm = a / 255;
					this._pixels[p] = (((color >> 16) & 0xff) * pm) & 0xff; // red
					this._pixels[p + 1] = (((color >> 8) & 0xff) * pm) & 0xff; // green
					this._pixels[p + 2] = ((color & 0xff) * pm) & 0xff; // blue
					this._pixels[p + 3] = a; // alpha
					
				}
				
			}
			
			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
		}
		
		/**
		 * Converts a Vector into a rectangular region of pixel data. 
		 * @param rect
		 * @param value
		 * 
		 */		
		public setVector(rect:Rectangle, value:number[]):void
		{
			/**/ rect = strict(rect, Rectangle);
			if (rect.width <= 0 || rect.height <= 0) return;
			
			var sx = rect.x | 0, sy = rect.y | 0;
			var smw = (rect.width | 0) + sx, smh = (rect.height | 0) + sy;
			
			this.__getPixels();
			
			for (var y = sy; y < smh; ++y) {
				
				for (var x = sx; x < smw; ++x) {
					
					var color:number =  ((value[x + y * this._width]) >>> 0);
					var p = (y * this._width + x) * 4;
					var a = color >>> 24;
					var pm = a / 255;
					this._pixels[p] = (((color >> 16) & 0xff) * pm) & 0xff; // red
					this._pixels[p + 1] = (((color >> 8) & 0xff) * pm) & 0xff; // green
					this._pixels[p + 2] = ((color & 0xff) * pm) & 0xff; // blue
					this._pixels[p + 3] = a; // alpha
					
				}
				
			}
			
			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
		}
		
		/**
		 * Tests pixel values in an image against a specified threshold and sets pixels that pass the test to new color values. 
		 * @param sourceBitmapData
		 * @param sourceRect
		 * @param destPoint
		 * @param operation
		 * @param threshold
		 * @param color
		 * @param mask
		 * @param copySource
		 * @return 
		 * 
		 */			
		public threshold(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, operation:string, threshold:number, color:number = 0, mask:number = 0xFFFFFFFF, copySource:boolean = false):number
		{
			/**/ sourceBitmapData = strict(sourceBitmapData, BitmapData); sourceRect = strict(sourceRect, Rectangle); destPoint = strict(destPoint, Point); operation = as(operation, 'String'); threshold = ((threshold) >>> 0); color = ((color) >>> 0); mask = ((mask) >>> 0); copySource = Boolean(copySource);
			if (!sourceBitmapData) {
				
				throw new TypeError('Parameter sourceBitmapData must be non-null.', 2007);
				
			}
			
			if (!sourceRect) {
				
				throw new TypeError('Parameter sourceRect must be non-null.', 2007);
				
			}
			
			if (!destPoint) {
				
				throw new TypeError('Parameter destPoint must be non-null.', 2007);
				
			}
			
			var operationNum; // save operation in number
			switch (operation) {
			
				case '!=': operationNum = 0; break;
				case '==': operationNum = 1; break;
				case '<': operationNum = 2; break;
				case '<=': operationNum = 3; break;
				case '>': operationNum = 4; break;
				case '>=': operationNum = 5; break;
				default:
					throw new ArgumentError('Parameter 0 is of the incorrect type. Should be type Operation', 2005);
				
			}
			
			var rx = sourceRect.x | 0;
			var ry = sourceRect.y | 0;
			var deltaX = (destPoint.x - rx) | 0;
			var deltaY = (destPoint.y - ry) | 0;
			var minX = Math.max(rx, 0, -deltaX);
			var minY = Math.max(ry, 0, -deltaY);
			var maxX = Math.min(sourceRect.width + rx, sourceBitmapData._width - 1, this._width - deltaX - 1); 
			var maxY = Math.min(sourceRect.height + ry, sourceBitmapData._height - 1, this._height - deltaY - 1); 
			
			if (maxX <= minX || maxY <= minY) { 
				
				return 0;
				
			}
			
			this.__getPixels();
			var sourcePixels = sourceBitmapData.__getPixels();
			
			var alpha = (color >> 24) & 0xff;
			var pm = alpha / 255;
			var red = (((color >> 16) & 0xff) * pm) & 0xff;
			var green = (((color >> 8) & 0xff) * pm) & 0xff;
			var blue = ((color & 0xff) * pm) & 0xff;
			var thresholdWithMask = threshold & mask;
			var hits = 0;
			
			
			internalThreshold.__bind(this)();
			
			if (sourceBitmapData === this) {
				
				minX = Math.max(deltaX + minX, minX);
				minY = Math.max(deltaY + minY, minY);
				
				maxX = Math.min(deltaX + maxX, maxX);
				maxY = Math.min(deltaY + maxY, maxY);
				
				internalThreshold.__bind(this)();
				
			}

			
			/**
			 * Repeat hook
			 */
			function internalThreshold():void {
				hits = 0;
				
				for (var x = minX; x < maxX; x++) {
					
					var cx = x + deltaX; // x-position in current BitmapData
					
					for (var y = minY; y < maxY; y++) {
						
						var cy = y + deltaY; // y-position in current BitmapData
						
						// get color data in source bitmapData
						var sPixel = (y * sourceBitmapData._width + x) * 4;
						var sAlpha =  sourcePixels[sPixel + 3]; // source alpha
						var sNpm = sAlpha / 255;
						var sRed = (sourcePixels[sPixel] / sNpm) & 0xff; // source red
						var sGreen = (sourcePixels[sPixel + 1] / sNpm) & 0xff; // source green
						var sBlue = (sourcePixels[sPixel + 2] / sNpm) & 0xff; // source blue
						
						var pixelValue = (
							sourcePixels[sPixel+3] << 24 |
							sourcePixels[sPixel] << 16 |
							sourcePixels[sPixel+1] << 8 |
							sourcePixels[sPixel+2]
						) & mask;
						
						if (
							(operationNum == 0 && pixelValue !== thresholdWithMask) || 
							(operationNum == 1 && pixelValue === thresholdWithMask) || 
							(operationNum == 2 && pixelValue < thresholdWithMask) || 
							(operationNum == 3 && pixelValue <= thresholdWithMask) || 
							(operationNum == 4 && pixelValue > thresholdWithMask) || 
							(operationNum == 5 && pixelValue >= thresholdWithMask)
						) {
							
							// set new colors in pixel
							var cPixel = (cy * this._width + cx) * 4;
							
							this._pixels[cPixel] = red;
							this._pixels[cPixel + 1] = green;
							this._pixels[cPixel + 2] = blue;
							this._pixels[cPixel + 3] = alpha;
							
							hits++;
							
						} else if (copySource) {
							
							var cPixel = (cy * this._width + cx) * 4;
							this._pixels[cPixel] = sourcePixels[sPixel];
							this._pixels[cPixel + 1] = sourcePixels[sPixel + 1];
							this._pixels[cPixel + 2] = sourcePixels[sPixel + 2];
							this._pixels[cPixel + 3] = sourcePixels[sPixel + 3];
							
						}
						
					}
					
				}
			
			}
			
			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = (hits > 0);
			
			return hits;
		}
		
		/**
		 * Locks an image so that any objects that reference the BitmapData object, such as Bitmap objects, 
		 * are not updated when this BitmapData object changes. 
		 * 
		 */		
		public lock():void
		{
			// not supported
		}
		
		/**
		 * Unlocks an image so that any objects that reference the BitmapData object, such as Bitmap objects, 
		 * are updated when this BitmapData object changes. 
		 * @param param1
		 * 
		 */		
		public unlock(changeRect:Rectangle = null):void
		{
			/**/ changeRect = strict(changeRect, Rectangle);
			// not supported
		}
		
		/**
		 * Computes a 256-value binary number histogram of a BitmapData object. 
		 * @param rect
		 * @return 
		 * 
		 */		
		public histogram(rect:Rectangle = null):any[]
		{
			/**/ rect = strict(rect, Rectangle);
			rect =rect || this._rect;
			
			this.__getPixels();
			
			var histogramData = [[], [], [], []];
				
			for (var i = 0; i < 4; i++) {
				
				histogramData[i].length = 256;
				histogramData[i].fill(0);
				
			}

			var x = rect.x | 0, y = rect.y | 0;
			var width = rect.width | 0, height = rect.height | 0;
			
			for (var sx = x; sx < x + width; sx++) {
				
				for (var sy = y; sy < y + height; sy++) {
					
					var p = (sy * this._width + sx) * 4;
					var a = this._pixels[p + 3];
					var npm = a / 255;
					
					histogramData[0][(this._pixels[p] / npm) & 0xff]++; // red
					histogramData[1][(this._pixels[p + 1] / npm) & 0xff]++; // green
					histogramData[2][(this._pixels[p + 2] / npm) & 0xff]++; // blue
					histogramData[3][a]++; // alpha
					
				}
				
			}
			
			return histogramData;
		}
		
		/*[internal]*/ protected __getPixel__pure(x:number, y:number):void
		{
			// x = ((x) >> 0); y = ((y) >> 0);
			var p = (y * this._width + x) * 4;
			return (this._pixels[p] << 16) | (this._pixels[p + 1] << 8) | this._pixels[p + 2];
		}
		
		/*[internal]*/ protected __setPixel__pure(x:number, y:number, color:number):void
		{
			// x = ((x) >> 0); y = ((y) >> 0); color = ((color) >>> 0);
			var p = (y * this._width + x) * 4;
			this._pixels[p] = (color >> 16) & 0xff; // red
			this._pixels[p + 1] = (color >> 8) & 0xff; // green
			this._pixels[p + 2] = color & 0xff; // blue
		}
		
		/*[internal]*/ protected __getPixel32__pure(x:number, y:number):number
		{
			// x = ((x) >> 0); y = ((y) >> 0);
			var p = (y * this._width + x) * 4;
			var a = this._pixels[p + 3];
			var npm = a / 255.0;
			return (a << 24) | (((this._pixels[p] / npm) & 0xff) << 16) | (((this._pixels[p + 1] / npm) & 0xff) << 8) | ((this._pixels[p + 2] / npm) & 0xff);
		}
		
		/*[internal]*/ protected __setPixel32__pure(x:number, y:number, color:number):void
		{
			// x = ((x) >> 0); y = ((y) >> 0); color = ((color) >>> 0);
			var p = (y * this._width + x) * 4;
			var a = (color >> 24) & 0xff;
			var pm = a / 255;
			this._pixels[p] = (((color >> 16) & 0xff) * pm) & 0xff; // red
			this._pixels[p + 1] = (((color >> 8) & 0xff) * pm) & 0xff; // green
			this._pixels[p + 2] = ((color & 0xff) * pm) & 0xff; // blue
			this._pixels[p + 3] = a; // alpha
		}
		
		/*[internal]*/ protected __beginModifyPixels () : Uint8Array
		{
			return this.__getPixels();
		}
		
		/*[internal]*/ protected __endModifyPixels () : void
		{
			this._element = null;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
		}
		
		/*[internal]*/ protected __fromElement (element : HTMLElement, matrix : Matrix = null) : BitmapData
		{
			// element = strict(element, HTMLElement); matrix = strict(matrix, Matrix);
			// canvas
			var ctx2d = BitmapData.__popSystemCtx(this._p2width, this._p2height, true);
			
			// ctx
			var canvas = ctx2d.canvas;
			
			// matrix
			ctx2d.save();
			if (matrix) {
				
				ctx2d.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
				
			} else {
				
				ctx2d.setTransform(1, 0, 0, 1, 0, 0);
				
			}
			
			// draw
			CanvasRenderer.renderImage(ctx2d, element, true);
			
			// from canvas
			this._texture.uploadFromElement(canvas);
			
			// restore
			ctx2d.restore();
			
			// free
			BitmapData.__pushSystemCtx(ctx2d);
			
			// source
			this._element = element;
			
			// result
			this._version++;
			this._dirtyPixels = this._dirtyDisplayObject = true;
			this._dirtyTexture = false;
			
			return this;
		}
		
		/*[internal]*/ protected __fromGraphics(graphics:Graphics, matrix:Matrix = null):BitmapData
		{
			// graphics = strict(graphics, Graphics); matrix = strict(matrix, Matrix);
			// canvas
			var ctx2d = BitmapData.__popSystemCtx(this._p2width, this._p2height, true);
			
			// ctx
			var canvas = ctx2d.canvas;
			
			// matrix
			ctx2d.save();
			if (matrix && !matrix.__isIdentical()) {
				
				ctx2d.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
				
			} else {
				
				matrix = null;
				ctx2d.setTransform(1, 0, 0, 1, 0, 0);
				
			}
			
			// draw
			CanvasRenderer.renderGraphics(ctx2d, graphics, matrix);
			
			// from canvas
			this._texture.uploadFromElement(canvas);
			
			// restore
			ctx2d.restore();
			
			// free
			BitmapData.__pushSystemCtx(ctx2d);
			
			// result
			this._version++;
			this._element = null;
			this._dirtyPixels = this._dirtyDisplayObject = true;
			this._dirtyTexture = false;
			
			return this;
		}
		
		/*[internal]*/ protected __fromText(text:string, textFormat:TextFormat, matrix:Matrix = null):BitmapData
		{
			// text = as(text, 'String'); textFormat = strict(textFormat, TextFormat); matrix = strict(matrix, Matrix);
			// canvas
			var ctx2d = BitmapData.__popSystemCtx(this._p2width, this._p2height, true);
			
			// ctx
			var canvas = ctx2d.canvas;
			
			// matrix
			ctx2d.save();
			if (matrix) {
				
				ctx2d.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
				
			} else {
				
				ctx2d.setTransform(1, 0, 0, 1, 0, 0);
				
			}
			
			// draw
			var font = textFormat.__getCss();
			var color = textFormat.__getCssColor();
			CanvasRenderer.renderText(ctx2d, text, font, color, 'left', 'alphabetic', 0, textFormat.size);
			
			// from canvas
			this._texture.uploadFromElement(canvas);
			
			// restore
			ctx2d.restore();
			
			// free
			BitmapData.__pushSystemCtx(ctx2d);
			
			// result
			this._version++;
			this._element = null;
			this._dirtyPixels = this._dirtyDisplayObject = true;
			this._dirtyTexture = false;
			
			return this;
		}
		
		/*[internal]*/ protected __fromPixels(source:Uint8Array, sourceWidth:number, sourceHeight:number, lowerLeft:boolean = false):BitmapData
		{
			// source = strict(source, Uint8Array); sourceWidth = ((sourceWidth) >> 0); sourceHeight = ((sourceHeight) >> 0); lowerLeft = Boolean(lowerLeft);
			if (!source || !sourceWidth || !sourceHeight) {
				
				return;
				
			}
			
			// data (RGBA)
			this._pixels =this._pixels || new Uint8Array(this._width * this._height * 4);
			
			// copy
			BitmapData.__setPixels(this._pixels, this._width, this._height, source, sourceWidth, sourceHeight, lowerLeft);
			
			// flags
			this._element = null;
			this._dirtyPixels = false;
			this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
			
			return this;
		}
		
		/**
		 * Slice rect and create new BitmapData object (or reuse system buffers). 
		 * @param sourceRect
		 * @param reuse
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __slice (sourceRect:Rectangle, inflate:Point = null, systemBuffer:boolean = false, preClean:boolean = true, copyContent:boolean = true):BitmapData
		{
			// sourceRect = strict(sourceRect, Rectangle); inflate = strict(inflate, Point); systemBuffer = Boolean(systemBuffer); preClean = Boolean(preClean); copyContent = Boolean(copyContent);
			this._ctx.saveAndReset();
			
			var sliced:BitmapData;
			var x:number = -sourceRect.x;
			var y:number = -sourceRect.y;
			var width:number = Math.ceil(sourceRect.width);
			var height:number = Math.ceil(sourceRect.height);
			
			if (inflate) {
				
				x += inflate.x;
				y += inflate.y;
				width += inflate.x * 2;
				height += inflate.y * 2;
				
			}
			
			try {
				
				if (systemBuffer) {
					
					sliced = SystemBitmapData.__popBuffer(width, height, this._transparent, preClean);
					
				} else {
					
					sliced = new BitmapData(width, height, this._transparent, 0x0, preClean);
					
				}
				
				if (copyContent) {
				
					var m = Matrix.__pool.get();
					m.__translate(x, y);
					this._ctx.setRenderToBitmapData(sliced).clipRect(x, y, width, height).setTransformFromMatrix(m);
					this._ctx.drawImage(this);
					
				}
				
			} catch (e) {
				
				e = window.asc.e2e(e);
				
				trace(e.getStackTrace());
				
			} finally {
				
				this._ctx.restore();
				Matrix.__pool.release(m);
				
			}
			
			return sliced;
		}
		
		/*[internal]*/ protected __getPixels () : Uint8Array
		{
			if (!this._dirtyPixels) {
				
				if (this._pixels) {
					
					// not modified
					return this._pixels;
					
				} else {
					
					// zero pixels
					return this._pixels = new Uint8Array(this._width * this._height * 4);
					
				}
				
			}
			
			// check conflicts
			if (this._modifiedPixels) {
				
				throw new Error('Conflict: texture and pixels async modified.');
				
			}
			
			// save
			this._ctx.saveAndReset();
			
			try {
				
				var backBuffer = SystemBitmapData.__popBuffer(this._width, this._height, this._transparent, true);
				this._ctx.setRenderToBitmapData(backBuffer);
				
				this._ctx.drawImage(this);
				this._ctx.copyScreenToBitmapData(this); // update pixels
				this._dirtyTexture = true;
				
			} catch (e) {
				
				e = window.asc.e2e(e);
				
				trace(e.getStackTrace());
				
			} finally {
				
				if (backBuffer) {
					
					backBuffer.dispose();
					
				}
				
				this._ctx.restore();
			}
			
			// result
			this._dirtyPixels = false;
			
			return this._pixels;
		}
		
		/*[internal]*/ protected __getP2Pixels ():Uint8Array
		{
			this.__getPixels();
			this._p2pixels =this._p2pixels || new Uint8Array(this._p2width * this._p2height * 4);
			return BitmapData.__setPixels(this._p2pixels, this._p2width, this._p2height, this._pixels, this._width, this._height);
		}
		
		/*[internal]*/ protected __getTexture ():Texture
		{
			// check disposed
			if (!this._ctx) {
				
				return null;
				
			}
			
			// need to update ?
			if (this._texture && !this._dirtyTexture) {
				
				return this._texture;
				
			}
			
			if (this._modifiedPixels) {
				
				// data (RGBA)
				this._pixels =this._pixels || new Uint8Array(this._width * this._height * 4);
				
				// power of 2 data (RGBA)
				this._p2pixels =this._p2pixels || new Uint8Array(this._p2width * this._p2height * 4);
				BitmapData.__setPixels(this._p2pixels, this._p2width, this._p2height, this._pixels, this._width, this._height);
				this._texture.uploadFromTypedArray(this._p2pixels);
				
				// flags
				this._modifiedPixels = false;
				
			}
			
			this._version++;
			this._dirtyTexture = false;
			
			return this._texture;
		}
		
		/*[internal]*/ protected __createPattern (ctx2d : CanvasRenderingContext2D, repeat : boolean) : CanvasPattern
		{
			// ctx2d = strict(ctx2d, CanvasRenderingContext2D); repeat = Boolean(repeat);
			try {

				var buff = BitmapData.__popSystemCtx(this._p2width, this._p2height, true);
				var canvas = buff.canvas;
				
				if (repeat) {
					
					// WARNING: slow operation detected
					canvas.width = this._width;
					canvas.height = this._height;
					
				}
				
				// create
				var pattern = ctx2d.createPattern(this.__toCanvas(buff), repeat ? 'repeat' : 'no-repeat');
				
				if (repeat) {
					
					// WARNING: slow operation detected
					canvas.width = this._p2width;
					canvas.height = this._p2height;
					
				}
				
				BitmapData.__pushSystemCtx(buff);
				
				return pattern;
				
			} catch (e  ) {
				
				e = window.asc.e2e(e);
				
				trace(e.getStackTrace());
				
			}
				
			return null;
		}
		
		/*[internal]*/ protected __toCanvas (ctx2d : CanvasRenderingContext2D) : HTMLCanvasElement
		{
			// ctx2d = strict(ctx2d, CanvasRenderingContext2D);
			// ctx
			var canvas = ctx2d.canvas;
			
			if (this._element) {
				
				// element
				CanvasRenderer.renderImage(ctx2d, this._element, true);
				
			} else {
				
				// convert pixels to new image data
				this.__getPixels();
				
				var imageData = ctx2d.createImageData(this._width, this._height);
				var data = imageData.data;
				for (var i = 0, len = this._pixels.byteLength; i < len; i += 4) {
					
					var a = this._pixels[i + 3];
					var npm = a / 255;
					
					data[i] = this._pixels[i] / npm;
					data[i + 1] = this._pixels[i + 1] / npm;
					data[i + 2] = this._pixels[i + 2] / npm;
					data[i + 3] = a;
					
				}
				
				ctx2d.putImageData(imageData, 0, 0);
				
			}
			
			return canvas;
		}
		
		/**
		 * Draws the source display object onto the bitmap image, using the Flash runtime vector renderer. 
		 * @param source
		 * @param matrix
		 * @param colorTransform
		 * @param blendMode
		 * @param clipRect
		 * @param smoothing
		 * @param quality
		 * 
		 */		
		/*[internal]*/ protected __drawWithQuality(source:IBitmapDrawable, matrix:Matrix = null, colorTransform:ColorTransform = null, blendMode:string = null, clipRect:Rectangle = null, smoothing:boolean = false, quality:string = null):void
		{
			// source = strict(source, 'implements_flash_display_IBitmapDrawable'); matrix = strict(matrix, Matrix); colorTransform = strict(colorTransform, ColorTransform); blendMode = as(blendMode, 'String'); clipRect = strict(clipRect, Rectangle); smoothing = Boolean(smoothing); quality = as(quality, 'String');
			this._ctx.saveAndReset().setRenderToBitmapData(this);
			
			if (clipRect) {
				
				var r = Rectangle.__pool.get();
				r.width = this._systemWidth || this._width;
				r.height = this._systemHeight || this._height;
				r.__intersectInPlace(clipRect);
				
				this._ctx.clipRect(r.x, r.y, r.width, r.height);
				
				Rectangle.__pool.release(r);
				
			} else {
				
				this._ctx.clipRect(0, 0, this._systemWidth || this._width, this._systemHeight || this._height);
				
			}
			
			try {
				
				if (colorTransform) {
					
					this._ctx.colorTransform(colorTransform);
					
				}
				
				if (blendMode) {
					
					this._ctx.blendMode(blendMode);
					
				}
				
				if (is(source , BitmapData)) {
					
					if (DisplayObject.sDebugCache) {
						
						this._ctx.fillRect(0, 0, this._systemWidth || this._width, this._systemHeight || this._height, 0x430000ff);
						
					}
					
					if (matrix) {
						
						this._ctx.setTransformFromMatrix(matrix);
						
					} else {
						
						this._ctx.setTransform(1, 0, 0, 1, 0, 0);
						
					}
					
					this._ctx.drawImage(source, smoothing);
					
				} else if (is(source , DisplayObject)) {
					
					if (DisplayObject.sDebugCache) {
						
						this._ctx.fillRect(0, 0, this._systemWidth || this._width, this._systemHeight || this._height, 0x4300ff00);
						
					}
					
					var sourceDO:DisplayObject = as(source , DisplayObject);
					var sourceMatrix:Matrix = sourceDO.transform._matrix;
					var sourceRenderParent:DisplayObject = sourceDO._renderParent;
					
					var m = Matrix.__pool.get();
					m.__copyFrom(sourceMatrix);
					if (matrix) {
						
						sourceMatrix.__copyFrom(matrix);
						
					} else {
						
						sourceMatrix.identity();
						
					}
					
					var ctx = this._ctx;
					sourceDO.__setRenderParent(BitmapData.sHelperRootDisplayObject);
					
					sourceDO.__predraw(ctx, false);
					sourceDO.__updateContextTransformation(ctx);
					sourceDO.__draw(ctx);
					
					sourceDO.__setRenderParent(sourceRenderParent);
					sourceMatrix.__copyFrom(m);
					
				}
				
				this._version++;
				this._element = null;
				this._dirtyPixels = this._dirtyDisplayObject = true;
				
			} catch (e) {
				
				e = window.asc.e2e(e);
				
				trace(e.getStackTrace());
				
			} finally {
				
				this._ctx.restore();
				Matrix.__pool.release(m);
				
			}
		}
		
		/*[internal]*/ protected __startListeningDispose(listener:Function):void
		{
			this._listenerDispose = listener;
		}
		
		/*[internal]*/ protected __stopListeningDispose():void
		{
			this._listenerDispose = null;
		}
		
		/*[internal]*/ protected __addStats ():void
		{
			if (!BitmapData.sHelperStats) {
				
				return;
				
			}
			
			var size = (this._width * this._height * 4) / 1024 / 1024;
			
			BitmapData.sHelperStats.count ++;
			BitmapData.sHelperStats.mb.total += size;
			BitmapData.sHelperStats.mb.app += size;
		}
		
		/*[internal]*/ protected __removeStats ():void
		{
			if (!BitmapData.sHelperStats) {
				
				return;
				
			}
			
			var size = (this._width * this._height * 4) / 1024 / 1024;
			
			BitmapData.sHelperStats.count --;
			BitmapData.sHelperStats.mb.total -= size;
			BitmapData.sHelperStats.mb.app -= size;
		}
		
		/*[internal]*/ protected static __getElementFromImageAndRawAlpha (image : HTMLImageElement, rawAlpha : ByteArray) : HTMLElement
		{
			// image = strict(image, HTMLImageElement); rawAlpha = strict(rawAlpha, ByteArray);
			var width : number =  ((image.width || 1) >> 0);
			var height : number =  ((image.height || 1) >> 0);
			
			var canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			
			var ctx2d = canvas.getContext('2d');
			CanvasRenderer.renderImage(ctx2d, image, true);
			
			var imageData = ctx2d.getImageData(0, 0, width, height);
			var data = imageData.data;
			
			var len = rawAlpha.length;
			var byteIndex = 0;
			var byte0, byte1, byte2, byte3;
			var groupLength = (len / 4) | 0;
			
			for (var i = 0; i < len; ++i) {
				
				var a = -1;
				
				if (groupLength > 0 || byteIndex > 0) {
					
					if (byteIndex == 0) {
						
						var group = rawAlpha.readUnsignedInt();
						byte0 = group >> 24 & 0xff;
						byte1 = group >> 16 & 0xff;
						byte2 = group >> 8 & 0xff;
						byte3 = group & 0xff;
						groupLength--;
						
						a = byte0;
						byteIndex++;
						
					} else if (byteIndex == 1) {
						
						a = byte1;
						byteIndex++;
						
					} else if (byteIndex == 2) {
						
						a = byte2;
						byteIndex++;
						
					} else if (byteIndex == 3) {
						
						a = byte3;
						byteIndex = 0;
						
					}
					
				}
				
				if (a == -1) {
					
					a = rawAlpha.readUnsignedByte();
					
				}
				
				var p = i * 4;
				var npm = a / 255.0;
				
				data[p] /= npm;
				data[p + 1] /= npm;
				data[p + 2] /= npm;
				data[p + 3] = a;
				
			}
			
			ctx2d.putImageData(imageData, 0, 0);
			
			return canvas;
		}
		
		/*[internal]*/ protected static __setPixels (destination:Uint8Array, destinationWidth:number, destinationHeight:number,
																											source:Uint8Array, sourceWidth:number, sourceHeight:number, lowerLeft:boolean = false):Uint8Array
		{
			// destination = strict(destination, Uint8Array); destinationWidth = ((destinationWidth) >> 0); destinationHeight = ((destinationHeight) >> 0); source = strict(source, Uint8Array); sourceWidth = ((sourceWidth) >> 0); sourceHeight = ((sourceHeight) >> 0); lowerLeft = Boolean(lowerLeft);
			var destPosition = 0;
			var sourcePosition = 0;
			
			var destRowLength = (destinationWidth * 4) | 0;
			var sourceRowLength = (sourceWidth * 4) | 0;
			
			var minRowLength = Math.min(destRowLength, sourceRowLength);
			var minHeight = Math.min(destinationHeight, sourceHeight);
			
			var shiftSourceRowLength = sourceRowLength;
			if (lowerLeft) {
				
				// up side down
				sourcePosition = sourceRowLength * (sourceHeight - 1);
				shiftSourceRowLength *= -1;
				
			}
			
			
			// reset
			destination.fill(0x0);
			
			// copy
			if (destinationWidth == sourceWidth && destinationHeight <= sourceHeight && !lowerLeft) {
				
				// as is
				destination.set(source.subarray(0, destRowLength * destinationHeight));
				
			} else {
				
				// by row
				for (var i = 0; i < minHeight; ++i) {
					
					destination.set(source.subarray(sourcePosition, sourcePosition + minRowLength), destPosition);
					destPosition += destRowLength;
					sourcePosition += shiftSourceRowLength;
					
				}
				
			} 
			
			return destination;
		}
		
		/**
		 * Copy BitmapData. 
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected static __clone (from : BitmapData, to : BitmapData) : BitmapData
		{
			// from = strict(from, BitmapData); to = strict(to, BitmapData);
			if (from._element) {
				
				to.__fromElement (from._element);
				
			} else if (!from._dirtyTexture) {
				
				to.__drawWithQuality (from);
				
			} else if (!from._dirtyPixels) {
				
				to.__fromPixels (from.__getPixels(), from._width, from._height, false);
				
			}
				
			else {
				
				throw new Error('What the fuck is going on?!');
				
			}
			
			return to;
		}
		
		/*[internal]*/ protected static __popSystemCtx (width : number, height : number, clear : boolean = true) : CanvasRenderingContext2D
		{
			// width = (+(width)); height = (+(height)); clear = Boolean(clear);
			width = getNextPowerOfTwo(width);
			height = getNextPowerOfTwo(height);
			
			var size = width << 16 | height;
			var list = BitmapData.sHelperCanvasPowerOf2Pool[size] || (BitmapData.sHelperCanvasPowerOf2Pool[size] = []);
			var buff;
			
			if (!list.length) {
				
				buff = document.createElement('canvas').getContext('2d');
				buff.canvas.width = width;
				buff.canvas.height = height;
				
			} else {
				
				buff = list.pop();
				
				if (clear) {
					
					buff.clearRect(0, 0, width, height);
					
				}
				
				var canvas = buff.canvas;
				if (canvas.width != width) {
					
					buff.canvas.width = width;
					
				}
				
				if (canvas.height != height) {
					
					buff.canvas.height = height;
					
				}
				
			}
			
			return buff;
		}
		
		/*[internal]*/ protected static __pushSystemCtx (buff : CanvasRenderingContext2D):void
		{
			// buff = strict(buff, CanvasRenderingContext2D);
			if (!buff || !buff.canvas) {
				
				return;
				
			}
			
			var width = buff.canvas.width;
			var height = buff.canvas.height;
			var size:number = width << 16 | height;
			var list = BitmapData.sHelperCanvasPowerOf2Pool[size];
			if (list.indexOf(buff) >= 0) {
				
				return;
				
			}
			
			
			list.push(buff);
		}
	}
}