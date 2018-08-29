/// <reference path="../../base.d.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../display3D/textures/TextureBase.ts" />
/// <reference path="../display3D/Program3D.ts" />
/// <reference path="../display3D/Context3D.ts" />
/// <reference path="../display/BitmapData.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />
/// <reference path="../__native/display/SystemBitmapData.ts" />

namespace flash.filters
{
	export import SystemBitmapData = flash.__native.display.SystemBitmapData;
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import BitmapData = flash.display.BitmapData;
	export import Context3D = flash.display3D.Context3D;
	export import Program3D = flash.display3D.Program3D;
	export import TextureBase = flash.display3D.textures.TextureBase;
	export import Rectangle = flash.geom.Rectangle;
	

	/**
	 * The BitmapFilter class is the base class for all image filter effects.
	 * The BevelFilter, BlurFilter, ColorMatrixFilter, ConvolutionFilter, DisplacementMapFilter, DropShadowFilter, 
	 * GlowFilter, GradientBevelFilter, and GradientGlowFilter classes all extend the BitmapFilter class. 
	 * You can apply these filter effects to any display object.
	 * 
	 * You can neither directly instantiate nor extend BitmapFilter. 
	 * @author pkulikov
	 * 
	 */	
	export  class BitmapFilter
	{
		/**
		 * Helpers.
		 */		
		protected static sHelperShaderMap : any = {};
		
		/**
		 * Program.
		 */		
		/*[internal]*/ protected __program : Program3D;
		
		/**
		 * Will replace all previous content.
		 */		
		/*[internal]*/ protected __replaceContent : boolean;
		
		/**
		 * Fixed hash established by SWF engine.
		 */		
		/*[internal]*/ protected __fixedHash : string;
		
		/**
		 * Not implemented.
		 */		
		/*[internal]*/ protected __notImplemented : boolean;
		
		/**
		 * Returns a BitmapFilter object that is an exact copy of the original BitmapFilter object. 
		 * @return 
		 * 
		 */			
		public clone() : BitmapFilter
		{
			return null;
		}
		
		/**
		 * Get filter bounds. 
		 * @param rect
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __bounds (rect:Rectangle) : Rectangle
		{
			// rect = strict(rect, Rectangle);
			return rect;
		}
		
		/**
		 * Helpers 
		 */		
		/*[internal]*/ protected __getHash() : string
		{
			// need to override
			return null;
		}
		
		/*[internal]*/ protected __setFixedHash() : BitmapFilter
		{
			this.__fixedHash = this.__getHash();
			return this;
		}
		
		/**
		 * Apply filter. 
		 * @param ctx
		 * @param target
		 * @param useSystemBuffers
		 * 
		 */				
		/*[internal]*/ protected __apply (ctx:WebGLContext2D, target:BitmapData, useSystemBuffers:boolean = false):BitmapData
		{
			// ctx = strict(ctx, WebGLContext2D); target = strict(target, BitmapData); useSystemBuffers = Boolean(useSystemBuffers);
			var width:number = target._systemWidth || target._width, height:number = target._systemHeight || target._height, transparent:boolean = target._transparent;
			var resultBuff:BitmapData;
			
			// buff
			if (useSystemBuffers) {
				
				resultBuff = SystemBitmapData.__popBuffer(width, height, transparent, !this.__replaceContent);
				resultBuff._tempWidth = width;
				resultBuff._tempHeight = height;
				
			} else {
				
				resultBuff = new SystemBitmapData(SystemBitmapData.FILTER, width, height, transparent, 0x0);
				
			}
			
			// save
			ctx.saveAndReset().clipRect(0, 0, width, height);
			
			// single pass
			var externalProgram:boolean = this.__setup(ctx, target.__getTexture());
			ctx.setRenderToBitmapData(resultBuff);
			ctx.drawImage(target, false, externalProgram);
			
			// restore
			ctx.restore();
			
			// result
			return resultBuff;
		}
		
		/**
		 * Internal shader setup.
		 */		
		/*[internal]*/ protected __setup (ctx:WebGLContext2D, texture:TextureBase, pass:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); texture = strict(texture, TextureBase); pass = ((pass) >> 0);
			// need to override
			return false;
		}
		
		/**
		 * Сколько будет занимать регистров указанная длина. 
		 * @param dataLength
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected static __shaderNumRegisters (dataLength:number):number
		{
			// dataLength = ((dataLength) >> 0);
			return BitmapFilter.__round(dataLength, 4) >> 2;
		}
		
		/**
		 * Делает число кратное {to} в большую сторону. 
		 * @param value
		 * @param to
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected static __round (value:number, to:number):number
		{
			// value = ((value) >> 0); to = ((to) >> 0);
			if (value % to == 0) {
				
				return value;
				
			} else {
				
				return ((value / to|0) + 1) * to;
				
			}
		}
		
		/**
		 * Компилирует программу / берет её из готовых.
		 * @param context
		 * @param vertexShader
		 * @param fragShader
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected static __compileProgram (context:Context3D, vertexShader:string, fragShader:string):Program3D
		{
			// context = strict(context, Context3D); vertexShader = as(vertexShader, 'String'); fragShader = as(fragShader, 'String');
			var hash:string = vertexShader + '\n' + fragShader;
			var program:Program3D =  strict(BitmapFilter.sHelperShaderMap[hash], Program3D);
			
			if (!program) {
				
				program = BitmapFilter.sHelperShaderMap[hash] = context.createProgram();
				program.__uploadFromGLSL(vertexShader, fragShader);
				
			}
			
			return program;
		}
	}
}