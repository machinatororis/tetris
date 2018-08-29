/// <reference path="../../base.d.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />

namespace flash.display
{
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	
	
	/**
	 * This class is used to create lightweight shapes using the ActionScript drawing application program interface (API). 
	 * The Shape class includes a graphics property, which lets you access methods from the Graphics class.
	 * The Sprite class also includes a graphicsproperty, and it includes other features not available to the Shape class. 
	 * For example, a Sprite object is a display object container, whereas a Shape object is not (and cannot contain child display objects).
	 *  For this reason, Shape objects consume less memory than Sprite objects that contain the same graphics. 
	 * However, a Sprite object supports user input events, while a Shape object does not. 
	 * @author pkulikov
	 * 
	 */	
	export  class Shape extends DisplayObject
	{
		/**
		 * Specifies the Graphics object belonging to this Shape object, where vector drawing commands can occur. 
		 */		
		public get graphics ():Graphics { return this._graphics || (this._graphics = new Graphics); }
		
		/**
		 * Creates a new Shape object.
		 * 
		 */		
		constructor()
		{
			super(); 
			
		}
		
		/*[internal]*/ /*override*/ protected __draw(ctx:WebGLContext2D, dirtyFlag:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); dirtyFlag = ((dirtyFlag) >> 0);
			if (this.__drawCache(ctx)) return false;
			
			if (this._graphics && this._graphics._commandsSize) {
				
				ctx.drawGraphics(this, this._graphics);
				
			}
			
			return true;
		}
		
		/*[internal]*/ /*override*/ protected __updateContextTransformation (ctx:WebGLContext2D):void
		{
			// ctx = strict(ctx, WebGLContext2D);
			// moved to ctx.drawGraphics
		}
		
		/*override*/ public toString ():string
		{
			return '[object Shape]';
		}
	}
}