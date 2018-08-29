/// <reference path="../../base.d.ts" />
/// <reference path="../geom/Matrix3D.ts" />
/// <reference path="../display3D/textures/TextureBase.ts" />
/// <reference path="../display3D/Program3D.ts" />
/// <reference path="../display3D/Context3DProgramType.ts" />
/// <reference path="../display3D/Context3D.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />
﻿
namespace flash.filters
{
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import Context3D = flash.display3D.Context3D;
	export import Context3DProgramType = flash.display3D.Context3DProgramType;
	export import Program3D = flash.display3D.Program3D;
	export import TextureBase = flash.display3D.textures.TextureBase;
	export import Matrix3D = flash.geom.Matrix3D;
	

	/**
	 * The ColorMatrixFilter class lets you apply a 4 x 5 matrix transformation on the RGBA color and alpha values of every pixel in 
	 * the input image to produce a result with a new set of RGBA color and alpha values. It allows saturation changes, hue rotation, 
	 * luminance to alpha, and various other effects. You can apply the filter to any display object 
	 * (that is, objects that inherit from the DisplayObject class), such as MovieClip, SimpleButton, TextField, and Video objects, 
	 * as well as to BitmapData objects.
	 * Note: For RGBA values, the most significant byte represents the red channel value, followed by green, blue, and then alpha.
	 * 
	 * To create a new color matrix filter, use the syntax new ColorMatrixFilter(). The use of filters depends on the object to which 
	 * you apply the filter:
	 * 
	 * To apply filters to movie clips, text fields, buttons, and video, use the filters property (inherited from DisplayObject). 
	 * Setting the filters property of an object does not modify the object, and you can remove the filter by clearing the filters property.
	 * To apply filters to BitmapData objects, use the BitmapData.applyFilter() method. Calling applyFilter() on a BitmapData object 
	 * takes the source BitmapData object and the filter object and generates a filtered image as a result.
	 * If you apply a filter to a display object, the cacheAsBitmap property of the display object is set to true. 
	 * If you remove all filters, the original value of cacheAsBitmap is restored.
	 * 
	 * A filter is not applied if the resulting image exceeds the maximum dimensions. In AIR 1.5 and Flash Player 10, 
	 * the maximum is 8,191 pixels in width or height, and the total number of pixels cannot exceed 16,777,215 pixels. 
	 * (So, if an image is 8,191 pixels wide, it can only be 2,048 pixels high.) 
	 * In Flash Player 9 and earlier and AIR 1.1 and earlier, the limitation is 2,880 pixels in height and 2,880 pixels in width. 
	 * For example, if you zoom in on a large movie clip with a filter applied, the filter is turned off if the resulting image reaches 
	 * the maximum dimensions.
	 * @author pkulikov
	 */
	export  class ColorMatrixFilter extends BitmapFilter
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
		 */
		protected static FRAG_SHADER_TEMPLATE:string =
			"precision lowp float;\n" +
			
			"uniform mat4 fc0;\n" + // color multiplier
			"uniform vec4 fc4;\n" + // color offset
			"uniform sampler2D fs0;\n" +
			
			"varying vec2 vUV;\n" +
			
			"void main(void) {\n" +
			"	vec4 c = texture2D(fs0, vUV);\n" +
			"	if (c.a > 0.0) c.rgb /= c.a;\n" +
			"	vec4 nc = vec4(0,0,0,0);" +
			"	nc.r = c.r*fc0[0][0] + c.g*fc0[0][1] + c.b*fc0[0][2] + c.a*(fc0[0][3] + fc4[0]);" +
			"	nc.g = c.r*fc0[1][0] + c.g*fc0[1][1] + c.b*fc0[1][2] + c.a*(fc0[1][3] + fc4[1]);" +
			"	nc.b = c.r*fc0[2][0] + c.g*fc0[2][1] + c.b*fc0[2][2] + c.a*(fc0[2][3] + fc4[2]);" +
			"	nc.a = c.r*fc0[3][0] + c.g*fc0[3][1] + c.b*fc0[3][2] + c.a*(fc0[3][3] + fc4[3]);" +
			"	nc = min(nc, 1.);\n	nc = max(nc, 0.);\n" +
			"	gl_FragColor = nc;\n" +
			"	gl_FragColor.rgb *= gl_FragColor.a;\n" +
			"}";
		
		/**
		 * An array of 20 items for 4 x 5 color transform. 
		 */
		public matrix : any[];
		
		/**
		 * Helpers 
		 */		
		protected __dataMatrix:Matrix3D;
		protected __dataOffset:number[];
		
		/**
		 * Initializes a new ColorMatrixFilter instance with the specified parameters. 
		 * @param matrix
		 * 
		 */
		constructor(matrix:any[] = null)
		{
			/**/ matrix = strict(matrix, Array);
			/**/ this.matrix === void 0 && (this.matrix = null);
			/**/ this.__dataMatrix === void 0 && (this.__dataMatrix = null);
			/**/ this.__dataOffset === void 0 && (this.__dataOffset = undefined);
			super(); 
			this.matrix = matrix || [
				1, 0, 0, 0, 0,
				0, 1, 0, 0, 0,
				0, 0, 1, 0, 0,
				0, 0, 0, 1, 0
			];
			this.__dataMatrix = new Matrix3D;
			this.__dataOffset = (<number[]>[0.0, 0.0, 0.0, 0.0]);
		}
		
		/*override*/ public clone():ColorMatrixFilter
		{
			return new ColorMatrixFilter(this.matrix.concat());
		}
		
		/*[internal]*/ /*override*/ protected __getHash():string
		{
			return this.__fixedHash || this.matrix.toString();
		}
		
		/*[internal]*/ protected __isIdentical():boolean
		{
			if (!this.matrix || this.matrix.length != 20) {
				
				return true;
				
			}
			
			return this.matrix[0]  == 1 && this.matrix[1]  == 0 && this.matrix[2]  == 0 && this.matrix[3]  == 0 && this.matrix[4]  == 0 &&
				this.matrix[5]  == 0 && this.matrix[6]  == 1 && this.matrix[7]  == 0 && this.matrix[8]  == 0 && this.matrix[9]  == 0 &&
				this.matrix[10] == 0 && this.matrix[11] == 0 && this.matrix[12] == 1 && this.matrix[13] == 0 && this.matrix[14] == 0 &&
				this.matrix[15] == 0 && this.matrix[16] == 0 && this.matrix[17] == 0 && this.matrix[18] == 1 && this.matrix[19] == 0;
		}
		
		/**
		 * Internal shader setup. 
		 */		
		/*[internal]*/ /*override*/ protected __setup (ctx:WebGLContext2D, texture:TextureBase, pass:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); texture = strict(texture, TextureBase); pass = ((pass) >> 0);
			var context:Context3D = ctx.context;
			
			// update
			if (!this.__program) {
				this.__program = this.__updateShader(context);
			}
			
			// use (it is important to call ctx)
			ctx.__setProgram(this.__program);
			
			// data
			var i:number = 0;
			var rawData:number[] = this.__dataMatrix.rawData;
			
			rawData[i++] = this.matrix[0]; rawData[i++] = this.matrix[1]; rawData[i++] = this.matrix[2]; rawData[i++] = this.matrix[3]; 
			rawData[i++] = this.matrix[5]; rawData[i++] = this.matrix[6]; rawData[i++] = this.matrix[7]; rawData[i++] = this.matrix[8];
			rawData[i++] = this.matrix[10]; rawData[i++] = this.matrix[11]; rawData[i++] = this.matrix[12]; rawData[i++] = this.matrix[13];
			rawData[i++] = this.matrix[15]; rawData[i++] = this.matrix[16]; rawData[i++] = this.matrix[17]; rawData[i++] = this.matrix[18];
			context.__setProgramConstantsFromMatrix(Context3DProgramType.FRAGMENT, 0, this.__dataMatrix);
			
			i = 0;
			this.__dataOffset[i++] = this.matrix[4] / 255;
			this.__dataOffset[i++] = this.matrix[9] / 255;
			this.__dataOffset[i++] = this.matrix[14] / 255;
			this.__dataOffset[i++] = this.matrix[19] / 255;
			context.__setProgramConstantsFromVector(Context3DProgramType.FRAGMENT, 4, this.__dataOffset, 1);
			return true;
		}
		
		/**
		 * Internal update function to create shader properties.
		 * @param context
		 * @param blur
		 * 
		 */		
		/*[internal]*/ protected __updateShader (context:Context3D):Program3D
		{
			// context = strict(context, Context3D);
			// vertex
			var vertexShader:string = ColorMatrixFilter.VERTEX_SHADER_TEMPLATE;
			
			// fragment
			var fragShader:string = ColorMatrixFilter.FRAG_SHADER_TEMPLATE;
			
			// program
			return BitmapFilter.__compileProgram(context, vertexShader, fragShader);
		}
	}	
}