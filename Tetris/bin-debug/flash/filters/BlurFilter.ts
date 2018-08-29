/// <reference path="../../base.d.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../display3D/textures/TextureBase.ts" />
/// <reference path="../display3D/Program3D.ts" />
/// <reference path="../display3D/Context3DProgramType.ts" />
/// <reference path="../display3D/Context3D.ts" />
/// <reference path="../display/BitmapData.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />
/// <reference path="../__native/display/SystemBitmapData.ts" />
﻿
namespace flash.filters
{
	export import SystemBitmapData = flash.__native.display.SystemBitmapData;
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import BitmapData = flash.display.BitmapData;
	export import Context3D = flash.display3D.Context3D;
	export import Context3DProgramType = flash.display3D.Context3DProgramType;
	export import Program3D = flash.display3D.Program3D;
	export import TextureBase = flash.display3D.textures.TextureBase;
	export import Rectangle = flash.geom.Rectangle;
	

	/**
	 * The BlurFilter class lets you apply a blur visual effect to display objects. A blur effect softens the details of an image. 
	 * You can produce blurs that range from a softly unfocused look to a Gaussian blur, a hazy appearance like viewing an image 
	 * through semi-opaque glass. When the quality property of this filter is set to low, the result is a softly unfocused look. 
	 * When the quality property is set to high, it approximates a Gaussian blur filter. You can apply the filter to any display object 
	 * (that is, objects that inherit from the DisplayObject class), such as MovieClip, SimpleButton, TextField, and Video objects, 
	 * as well as to BitmapData objects.
	 * To create a new filter, use the constructor new BlurFilter(). The use of filters depends on the object to which you apply the filter:
	 * 
	 * To apply filters to movie clips, text fields, buttons, and video, use the filters property (inherited from DisplayObject). 
	 * Setting the filters property of an object does not modify the object, and you can remove the filter by clearing the filters property.
	 * To apply filters to BitmapData objects, use the BitmapData.applyFilter() method. Calling applyFilter() on a BitmapData 
	 * object takes the source BitmapData object and the filter object and generates a filtered image as a result.
	 * If you apply a filter to a display object, the cacheAsBitmap property of the display object is set to true. 
	 * If you remove all filters, the original value of cacheAsBitmap is restored.
	 * 
	 * This filter supports Stage scaling. However, it does not support general scaling, rotation, and skewing. 
	 * If the object itself is scaled (scaleX and scaleY are not set to 100%), the filter effect is not scaled. 
	 * It is scaled only when the user zooms in on the Stage.
	 * 
	 * A filter is not applied if the resulting image exceeds the maximum dimensions. 
	 * In AIR 1.5 and Flash Player 10, the maximum is 8,191 pixels in width or height, 
	 * and the total number of pixels cannot exceed 16,777,215 pixels. 
	 * (So, if an image is 8,191 pixels wide, it can only be 2,048 pixels high.) 
	 * In Flash Player 9 and earlier and AIR 1.1 and earlier, the limitation is 2,880 pixels in height and 2,880 pixels in width. 
	 * If, for example, you zoom in on a large movie clip with a filter applied, the filter is turned off if the resulting image 
	 * exceeds the maximum dimensions.
	 * @author pkulikov
	 */
	export  class BlurFilter extends BitmapFilter
	{
		/**
		 * This is a template to generate the shader.
		 */
		protected static VERTEX_SHADER_TEMPLATE:string = 
			"precision lowp float;\n" +
			
			"attribute vec2 va0;\n" +// pos
			"attribute vec2 va1;\n" + // uv
			
			"uniform mat4 vc0;\n" + // pos matrix
			"uniform mat4 vc4;\n" + // uv matrix
			"uniform vec4 vcPositionScale;\n" +
			
			"varying vec2 vUV;\n" +
			
			"void main(void) {\n" +
			" vUV = (vc4 * vec4(va1, 0.0, 1.0)).xy;\n" +
			" gl_Position = vc0 * vec4(va0, 0.0, 1.0) * vcPositionScale;\n" +
			"}";
		
		/**
		 * This is a template to generate the shader.
		 * WARNING: need percent formula depending on strength.
		 */
		protected static FRAG_SHADER_TEMPLATE:string =
			"precision lowp float;\n" +
			
			"uniform vec2 {{delta}};\n" +
			"uniform sampler2D fs0;\n" +
			
			"varying vec2 vUV;\n" +
			
			"void main(void) {\n" +
			" vec4 color = vec4(0.0);\n" +
			" float total = 0.0;\n" +
			" for (float t = -{{iterations}}; t <= {{iterations}}; t++) {\n" +
			"  float percent = t / {{iterations}};\n" +
			"  float weight = 1.0 - abs(percent);\n" +
			"  vec4 sample = texture2D(fs0, vUV + {{delta}} * percent);\n" +
			"  color += sample * weight;\n" +
			"  total += weight;\n" +
			" }\n" +
			" gl_FragColor = color/total;\n" +
			"}";
		
		/**
		 * The amount of horizontal blur. 
		 */		
		public blurX : number;
			
		/**
		 * The amount of vertical blur. 
		 */		
		public blurY : number;
			
		/**
		 * The number of times to perform the blur. 
		 */		
		public quality : number;
		
		/**
		 * Helpers
		 */		
		protected __lastBlurX:number;
		protected __lastBlurY:number;
		protected __lastQuality:number;
		protected __offsetX:number;
		protected __offsetY:number;
		protected __programBlurX:Program3D;
		protected __programBlurY:Program3D;
		protected __data:number[];
		
		/**
		 * Registers 
		 */		
		protected __frag_register_delta:number;
		
		/**
		 * Initializes the filter with the specified parameters. 
		 * @param blurX
		 * @param blurY
		 * @param quality
		 * 
		 */		
		constructor(blurX:number = 4.0, blurY:number = 4.0, quality:number = 1)
		{
			/**/ blurX = (+(blurX)); blurY = (+(blurY)); quality = ((quality) >> 0);
			/**/ this.blurX === void 0 && (this.blurX = NaN);
			/**/ this.blurY === void 0 && (this.blurY = NaN);
			/**/ this.quality === void 0 && (this.quality = 0);
			/**/ this.__lastBlurX === void 0 && (this.__lastBlurX = NaN);
			/**/ this.__lastBlurY === void 0 && (this.__lastBlurY = NaN);
			/**/ this.__lastQuality === void 0 && (this.__lastQuality = 0);
			/**/ this.__offsetX === void 0 && (this.__offsetX = NaN);
			/**/ this.__offsetY === void 0 && (this.__offsetY = NaN);
			/**/ this.__programBlurX === void 0 && (this.__programBlurX = null);
			/**/ this.__programBlurY === void 0 && (this.__programBlurY = null);
			/**/ this.__data === void 0 && (this.__data = undefined);
			/**/ this.__frag_register_delta === void 0 && (this.__frag_register_delta = 0);
			super(); 
			if (quality < 1) quality = 1;
			if (quality > 3) quality = 3;
			
			this.blurX = blurX;
			this.blurY = blurY;
			this.quality = 3; // TODO Return the setting of the variable "quality" after the quality settings work
			
			this.__offsetX = this.__offsetY = 0.0;
			this.__frag_register_delta = 64;
			this.__data = (<number[]>[0.0, 0.0]);
		}
		
		/*override*/ public clone():BitmapFilter
		{
			return new BlurFilter(this.blurX, this.blurY, this.quality);
		}
		
		/*[internal]*/ /*override*/ protected __bounds (rect:Rectangle):Rectangle
		{
			// rect = strict(rect, Rectangle);
			rect =rect || new Rectangle;
			
			var x = this.blurX, y = this.blurY;
			if (x <= 0 && y <= 0) {
				
				return rect;
				
			}
			
			rect.pad(y, x, y, x);
			return rect;
		}
		
		/*[internal]*/ /*override*/ protected __getHash():string
		{
			return this.__fixedHash || [this.blurX, this.blurY, this.quality].toString();
		}
		
		/**
		 * Apply filter. 
		 * @param ctx
		 * @param target
		 * @param useSystemBuffers
		 * 
		 */				
		/*[internal]*/ /*override*/ protected __apply (ctx:WebGLContext2D, target:BitmapData, useSystemBuffers:boolean = false):BitmapData
		{
			// ctx = strict(ctx, WebGLContext2D); target = strict(target, BitmapData); useSystemBuffers = Boolean(useSystemBuffers);
			var width:number = target._systemWidth || target._width, height:number = target._systemHeight || target._height, transparent:boolean = target._transparent;
			var tempBuff:BitmapData, resultBuff:BitmapData;
			
			// buff
			if (useSystemBuffers) {
				
				resultBuff = SystemBitmapData.__popBuffer(width, height, transparent);
				
			} else {
				
				resultBuff = new SystemBitmapData(SystemBitmapData.FILTER, width, height, transparent, 0x0);
				
			}
			
			// save
			ctx.saveAndReset().clipRect(0, 0, width, height);
			ctx.translate(this.__offsetX, this.__offsetY);
			
			if (this.blurX > 0 && this.blurY > 0) {
				
				// first pass blur x
				this.__setup(ctx, target.__getTexture(), 0);
				ctx.setRenderToBitmapData(tempBuff = SystemBitmapData.__popBuffer(width, height, transparent));
				ctx.drawImage(target, true, true);
				
				// second pass blur y
				this.__setup(ctx, tempBuff.__getTexture(), 1);
				ctx.translate(-this.__offsetX, -this.__offsetY);
				ctx.setRenderToBitmapData(resultBuff);
				ctx.drawImage(tempBuff, true, true);
				tempBuff.dispose();
				
			} else {
				
				// single pass
				this.__setup(ctx, target.__getTexture(), this.blurX > 0 ? 0 : 1);
				ctx.setRenderToBitmapData(resultBuff);
				ctx.drawImage(target, true, true);
				
			}
			
			// restore
			ctx.restore();
			
			// result
			return resultBuff;
		}
		
		/**
		 * Internal shader setup.
		 */		
		/*[internal]*/ /*override*/ protected __setup (ctx:WebGLContext2D, texture:TextureBase, pass:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); texture = strict(texture, TextureBase); pass = ((pass) >> 0);
			var context : Context3D = ctx.context;
			var xChange = this.__lastBlurX != this.blurX;
			var yChange = this.__lastBlurY != this.blurY;
			var qChange = this.__lastQuality != this.quality;
			
			// update blur x
			if (xChange || qChange) {
				
				this.__programBlurX = this.__updateShader(context, this.blurX);
				
			}
			
			// update blur y
			if (yChange || qChange) {
				
				this.__programBlurY = this.__updateShader(context, this.blurY);
				
			}
			
			// last
			this.__lastBlurX = this.blurX;
			this.__lastBlurY = this.blurY;
			this.__lastQuality = this.quality;
			
			// what is the size of a single pixel in -1, 1 (webGL) space (uniform2f)
			if (pass == 0) {
				
				this.__data[0] = this.blurX / texture.__width;
				this.__data[1] = 0.0;
				
				// use (it is important to call ctx)
				ctx.__setProgram(this.__programBlurX);
				
			} else {
				
				this.__data[0] = 0.0;
				this.__data[1] = this.blurY / texture.__height;
				
				// use (it is important to call ctx)
				ctx.__setProgram(this.__programBlurY);
				
			}
			
			// data
			context.__setProgramConstantsFromVector(Context3DProgramType.FRAGMENT, this.__frag_register_delta, this.__data, 1);
			return true;
		}
		
		/**
		 * Internal update function to create shader properties.   
		 * @param context
		 * @param blur
		 * 
		 */		
		/*[internal]*/ protected __updateShader (context:Context3D, blur:number):Program3D
		{
			// context = strict(context, Context3D); blur = (+(blur));
			// vertex
			var vertexShader:string = this.__privateShaderTemplate(Context3DProgramType.VERTEX);

			// fragment
			var iterations = Math.ceil(Math.max(blur * (this.quality / 3), 3));
			var fragShader = this.__privateShaderTemplate(Context3DProgramType.FRAGMENT);
			fragShader = fragShader.replace(/\{\{delta\}\}/g, 'fc' + this.__frag_register_delta);
			fragShader = fragShader.replace(/\{\{iterations\}\}/g, iterations + '.0');
			
			// program
			return BitmapFilter.__compileProgram(context, vertexShader, fragShader);
		}
		
		/*[internal]*/ protected __privateShaderTemplate (type:string):string
		{
			// type = as(type, 'String');
			if (type == Context3DProgramType.VERTEX) return BlurFilter.VERTEX_SHADER_TEMPLATE;
			else return BlurFilter.FRAG_SHADER_TEMPLATE;
		}
	}	
}