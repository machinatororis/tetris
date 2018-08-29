/// <reference path="../../base.d.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../display3D/textures/TextureBase.ts" />
/// <reference path="../display3D/Context3DProgramType.ts" />
/// <reference path="../display3D/Context3D.ts" />
/// <reference path="../display/BlendMode.ts" />
/// <reference path="../display/BitmapData.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />
﻿
namespace flash.filters
{
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import BitmapData = flash.display.BitmapData;
	export import BlendMode = flash.display.BlendMode;
	export import Context3D = flash.display3D.Context3D;
	export import Context3DProgramType = flash.display3D.Context3DProgramType;
	export import TextureBase = flash.display3D.textures.TextureBase;
	export import Rectangle = flash.geom.Rectangle;
	

	/**
	 * The DropShadowFilter class lets you add a drop shadow to display objects. The shadow algorithm is based on the same box filter 
	 * that the blur filter uses. You have several options for the style of the drop shadow, including inner or outer shadow and knockout mode. 
	 * You can apply the filter to any display object (that is, objects that inherit from the DisplayObject class), such as 
	 * MovieClip, SimpleButton, TextField, and Video objects, as well as to BitmapData objects.
	 * The use of filters depends on the object to which you apply the filter:
	 * 
	 * To apply filters to display objects use the filters property (inherited from DisplayObject). 
	 * Setting the filters property of an object does not modify the object, and you can remove the filter by clearing the filters property.
	 * To apply filters to BitmapData objects, use the BitmapData.applyFilter() method. Calling applyFilter() on a BitmapData object 
	 * takes the source BitmapData object and the filter object and generates a filtered image as a result.
	 * If you apply a filter to a display object, the value of the cacheAsBitmap property of the display object is set to true. 
	 * If you clear all filters, the original value of cacheAsBitmap is restored.
	 * 
	 * This filter supports Stage scaling. However, it does not support general scaling, rotation, and skewing. 
	 * If the object itself is scaled (if scaleX and scaleY are set to a value other than 1.0), the filter is not scaled. 
	 * It is scaled only when the user zooms in on the Stage.
	 * 
	 * A filter is not applied if the resulting image exceeds the maximum dimensions. In AIR 1.5 and Flash Player 10, 
	 * the maximum is 8,191 pixels in width or height, and the total number of pixels cannot exceed 16,777,215 pixels. 
	 * (So, if an image is 8,191 pixels wide, it can only be 2,048 pixels high.) In Flash Player 9 and earlier and AIR 1.1 and earlier, 
	 * the limitation is 2,880 pixels in height and 2,880 pixels in width. If, for example, you zoom in on a large movie clip with a 
	 * filter applied, the filter is turned off if the resulting image exceeds the maximum dimensions.
	 * @author pkulikov
	 */
	export  class DropShadowFilter extends BlurFilter
	{
		/**
		 * Helpers 
		 */		
		protected static DEG_TO_RAD:number = asc.sti(DropShadowFilter,()=>{ DropShadowFilter.DEG_TO_RAD = Math.PI/180; });
		
		/**
		 * This is a template to generate the shader.
		 * WARNING: need percent formula depending on strength.
		 */
		protected static FRAG_SHADER_TEMPLATE:string =
			"precision lowp float;\n" +
			
			"uniform vec4 fc32;\n" + // math
			"uniform vec4 fc33;\n" + // color
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
			"  if (fc32[2] > 0.0) {\n" +
			"    sample.a = 1.0 - sample.a;\n" +
			"  }\n" +
			"  color += sample * weight;\n" +
			"  total += weight;\n" +
			" }\n" +
			" vec4 nc = color/total;\n" +
			" if (fc32[0] > 0.0 || fc32[1] > 0.0) {\n" +
			"  if (nc.a > 0.0) nc.rgb /= nc.a;\n" +
			"  if (fc32[0] > 0.0) {\n" +
			"    nc.rgb = fc33.rgb;\n" +
			"  }\n" +
			"  if (fc32[1] > 0.0) {\n" +
			"    nc.a *= fc33.a;\n" +
			"    if (nc.a > 1.0) nc.a = 1.0;\n" +
			"  }\n" +
			"  gl_FragColor = nc;\n" +
			"  gl_FragColor.rgb *= gl_FragColor.a;\n" +
			" } else {\n" +
			"  gl_FragColor = nc;\n" +
			" }\n" +
			"}";
		
		/**
		 * The alpha transparency value for the shadow color. 
		 */		
		public alpha : number;

		/**
		 * The angle of the shadow. 
		 */		
		public get angle () : number { return this.__angle; }
		public set angle (value:number) {
			/**/ value = (+(value));
			this.__angle = (value % 360 + 360) % 360;
			this.__setOffset(this.__distance, this.__angle);
		}

		/**
		 * The color of the shadow. 
		 */
		public get color () : number { return this.__color; }
		public set color (value:number) {
			/**/ value = ((value) >>> 0);
			this.__color = value;
			this.__red = (value >> 16 & 0xFF) / 255;
			this.__green = (value >> 8 & 0xFF) / 255;
			this.__blue = (value & 0xFF) / 255;
		}

		/**
		 * The offset distance for the shadow, in pixels. 
		 */		
		public get distance () : number { return this.__distance; }
		public set distance (value:number) {
			/**/ value = (+(value));
			this.__distance = value;
			this.__setOffset(this.__distance, this.__angle);
		}

		/**
		 * Indicates whether or not the object is hidden. 
		 */		
		public hideObject : boolean;

		/**
		 * Indicates whether or not the shadow is an inner shadow. 
		 */		
		public inner : boolean;

		/**
		 * Applies a knockout effect (true), which effectively makes the object's fill transparent and reveals the background color of the 
		 * document. 
		 */		
		public knockout : boolean;

		/**
		 * The strength of the imprint or spread. 
		 */		
 	 	public strength : number;
		
		/**
		 * Helpers 
		 */
		protected __red:number;
		protected __green:number;
		protected __blue:number;
		protected __color:number;
		protected __angle:number;
		protected __distance:number;
		protected __dataColor:number[];
		protected __dataMath:number[];
		
		/**
		 * Creates a new DropShadowFilter instance with the specified parameters. 
		 * @param distance
		 * @param angle
		 * @param color
		 * @param alpha
		 * @param blurX
		 * @param blurY
		 * @param strength
		 * @param quality
		 * @param inner
		 * @param knockout
		 * @param hideObject
		 * 
		 */		
		constructor(distance:number = 4.0, angle:number = 45, color:number = 0x0, alpha:number = 1.0, blurX:number = 4.0, blurY:number = 4.0, strength:number = 1.0, quality:number = 1, inner:boolean = false, knockout:boolean = false, hideObject:boolean = false)
		{
			/**/ distance = (+(distance)); angle = (+(angle)); color = ((color) >>> 0); alpha = (+(alpha)); blurX = (+(blurX)); blurY = (+(blurY)); strength = (+(strength)); quality = ((quality) >> 0); inner = Boolean(inner); knockout = Boolean(knockout); hideObject = Boolean(hideObject);
			/**/ this.alpha === void 0 && (this.alpha = NaN);
			/**/ this.hideObject === void 0 && (this.hideObject = false);
			/**/ this.inner === void 0 && (this.inner = false);
			/**/ this.knockout === void 0 && (this.knockout = false);
			/**/ this.strength === void 0 && (this.strength = NaN);
			/**/ this.__red === void 0 && (this.__red = NaN);
			/**/ this.__green === void 0 && (this.__green = NaN);
			/**/ this.__blue === void 0 && (this.__blue = NaN);
			/**/ this.__color === void 0 && (this.__color = NaN);
			/**/ this.__angle === void 0 && (this.__angle = NaN);
			/**/ this.__distance === void 0 && (this.__distance = NaN);
			/**/ this.__dataColor === void 0 && (this.__dataColor = undefined);
			/**/ this.__dataMath === void 0 && (this.__dataMath = undefined);
			super(blurX, blurY, quality);
			
			this.distance = distance;
			this.angle = angle;
			this.color = color;
			this.alpha = alpha;
			this.strength = strength;
			this.inner = inner;
			this.knockout = knockout;
			this.hideObject = hideObject;
			
			this.__dataColor = (<number[]>[0.0, 0.0, 0.0, 0.0]);
			this.__dataMath = (<number[]>[0.0, 0.0, 0.0, 0.0]);
		}
		
		/*override*/ public clone():DropShadowFilter
		{
			return new DropShadowFilter(this.distance, this.angle, this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout, this.hideObject);
		}
		
		/*[internal]*/ /*override*/ protected __bounds (rect:Rectangle):Rectangle
		{
			// rect = strict(rect, Rectangle);
			rect =rect || new Rectangle;
			if (this.inner) return rect;
			
			super.__bounds(rect);
			rect.offset(this.__offsetX, this.__offsetY);
			if (rect.left > 0) rect.left = 0;
			if (rect.top > 0) rect.top = 0;
			return rect;
		}
		
		/*[internal]*/ /*override*/ protected __getHash():string
		{
			return this.__fixedHash || [this.distance, this.angle, this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout, this.hideObject].toString();
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
			
			// blur with color
			var resultBuff:BitmapData =  super.__apply(ctx, target, useSystemBuffers);
			
			// draw target
			if (!this.hideObject || this.inner) {
				
				// save
				ctx.saveAndReset().clipRect(0, 0, width, height);
				
				// draw
				if (this.inner) {
					
					ctx.blendMode(this.hideObject || this.knockout ? BlendMode.ALPHA : BlendMode.INTERSECT_INTERCHANGE);
					
				} else {
					
					ctx.blendMode(this.knockout ? BlendMode.ERASE : BlendMode.NORMAL);
					
				}
				
				ctx.setRenderToBitmapData(resultBuff);
				ctx.drawImage(target);
				
				// restore
				ctx.restore();
				
			}
			
			// result
			return resultBuff;
		}
		
		/**
		 * Internal shader setup.
		 */		
		/*[internal]*/ /*override*/ protected __setup (ctx:WebGLContext2D, texture:TextureBase, pass:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); texture = strict(texture, TextureBase); pass = ((pass) >> 0);
			super.__setup(ctx, texture, pass);
			
			var context:Context3D = ctx.context;
			
			var singlePass:boolean = this.blurX <= 0 || this.blurY <= 0;
			if (pass == 0) {
				
				this.__dataColor[0] = this.__red;
				this.__dataColor[1] = this.__green;
				this.__dataColor[2] = this.__blue;
				this.__dataColor[3] = this.alpha;
				this.__dataMath[0] = 1.0;
				this.__dataMath[1] = 1.0;
				this.__dataMath[2] = this.inner ? 1.0 : 0.0;
				
				if (singlePass) {
					
					this.__dataColor[3] *= this.strength;
					
				}
				
			} else {
				
				this.__dataColor[0] = 0.0;
				this.__dataColor[1] = 0.0;
				this.__dataColor[2] = 0.0;
				this.__dataColor[3] = this.strength;
				this.__dataMath[0] = 0.0;
				this.__dataMath[1] = 1.0;
				this.__dataMath[2] = 0.0;
				
			}
			
			context.__setProgramConstantsFromVector(Context3DProgramType.FRAGMENT, 32, this.__dataMath, 1);
			context.__setProgramConstantsFromVector(Context3DProgramType.FRAGMENT, 33, this.__dataColor, 1);
			return true;
		}
		
		/*[internal]*/ /*override*/ protected __privateShaderTemplate (type:string):string
		{
			// type = as(type, 'String');
			if (type == Context3DProgramType.VERTEX) return BlurFilter.VERTEX_SHADER_TEMPLATE;
			else return DropShadowFilter.FRAG_SHADER_TEMPLATE;
		}
		
		/*[internal]*/ protected __setOffset (distance, angle):void
		{
			var r = angle * DropShadowFilter.DEG_TO_RAD;
			this.__offsetX = Math.cos(r) * distance;
			this.__offsetY = Math.sin(r) * distance;
		}
	}
}