/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../geom/Rectangle.ts" />
/// <reference path="../../../geom/Matrix.ts" />
/// <reference path="../../../geom/ColorTransform.ts" />
/// <reference path="../../../display3D/textures/TextureBase.ts" />

namespace flash.__native.renderer.webgl 
{
	
	export import TextureBase = flash.display3D.textures.TextureBase;
	export import ColorTransform = flash.geom.ColorTransform;
	export import Matrix = flash.geom.Matrix;
	export import Rectangle = flash.geom.Rectangle;
	

	/**
	 * 
	 * @author pkulikov
	 * 
	 */	
	export  class GLCanvasState
	{
		public matrix:Matrix = new Matrix;
		public rect:Rectangle = new Rectangle;
		public color:ColorTransform = new ColorTransform;
		public blendMode:string = 'normal';
		public renderToTexture:TextureBase = null;
	}
}