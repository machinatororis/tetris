/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../utils/Dictionary.ts" />
/// <reference path="../../../text/TextFormat.ts" />
/// <reference path="../../../geom/Rectangle.ts" />
/// <reference path="../../../geom/Matrix3D.ts" />
/// <reference path="../../../geom/Matrix.ts" />
/// <reference path="../../../geom/ColorTransform.ts" />
/// <reference path="../../../display3D/textures/TextureBase.ts" />
/// <reference path="../../../display3D/Program3D.ts" />
/// <reference path="../../../display3D/Context3DWrapMode.ts" />
/// <reference path="../../../display3D/Context3DVertexBufferFormat.ts" />
/// <reference path="../../../display3D/Context3DTriangleFace.ts" />
/// <reference path="../../../display3D/Context3DTextureFilter.ts" />
/// <reference path="../../../display3D/Context3DProgramType.ts" />
/// <reference path="../../../display3D/Context3DMipFilter.ts" />
/// <reference path="../../../display3D/Context3DBlendFactor.ts" />
/// <reference path="../../../display3D/Context3DBlendEquation.ts" />
/// <reference path="../../../display3D/Context3D.ts" />
/// <reference path="../../../display/Graphics.ts" />
/// <reference path="../../../display/DisplayObject.ts" />
/// <reference path="../../../display/BlendMode.ts" />
/// <reference path="../../../display/BitmapData.ts" />
/// <reference path="shader/GLBlendModeShaders.ts" />
/// <reference path="../../display/SystemBitmapData.ts" />

namespace flash.__native.renderer.webgl 
{
	export import SystemBitmapData = flash.__native.display.SystemBitmapData;
	export import GLBlendModeShaders = flash.__native.renderer.webgl.shader.GLBlendModeShaders;
	export import BitmapData = flash.display.BitmapData;
	export import BlendMode = flash.display.BlendMode;
	export import DisplayObject = flash.display.DisplayObject;
	export import Graphics = flash.display.Graphics;
	export import Context3D = flash.display3D.Context3D;
	export import Context3DBlendEquation = flash.display3D.Context3DBlendEquation;
	export import Context3DBlendFactor = flash.display3D.Context3DBlendFactor;
	export import Context3DMipFilter = flash.display3D.Context3DMipFilter;
	export import Context3DProgramType = flash.display3D.Context3DProgramType;
	export import Context3DTextureFilter = flash.display3D.Context3DTextureFilter;
	export import Context3DTriangleFace = flash.display3D.Context3DTriangleFace;
	export import Context3DVertexBufferFormat = flash.display3D.Context3DVertexBufferFormat;
	export import Context3DWrapMode = flash.display3D.Context3DWrapMode;
	export import Program3D = flash.display3D.Program3D;
	export import TextureBase = flash.display3D.textures.TextureBase;
	export import ColorTransform = flash.geom.ColorTransform;
	export import Matrix = flash.geom.Matrix;
	export import Matrix3D = flash.geom.Matrix3D;
	export import Rectangle = flash.geom.Rectangle;
	export import TextFormat = flash.text.TextFormat;
	export import Dictionary = flash.utils.Dictionary;
	
	
	/**
	 * 
	 * @author pkulikov
	 * 
	 */	
	export  class WebGLContext2D
	{
		/**
		 * Helpers 
		 */
		private static sHelperRect:Rectangle = asc.sti(WebGLContext2D,()=>{ WebGLContext2D.sHelperRect = new Rectangle; });
		private static sHelperMatrix:Matrix = asc.sti(WebGLContext2D,()=>{ WebGLContext2D.sHelperMatrix = new Matrix; });
		private static sHelperMatrix2:Matrix = asc.sti(WebGLContext2D,()=>{ WebGLContext2D.sHelperMatrix2 = new Matrix; });
		private static sHelperTextLine:any = {};
		private static sHelperBlendModes:any = {};
		static __block0 = function () { function $() {
			// The display object appears in front of the background.
			WebGLContext2D.sHelperBlendModes[BlendMode.NORMAL] = [
				Context3DBlendFactor.ONE, Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA, Context3DBlendEquation.ADD,
				null, null, null
			];
			
			// Multiplies the complement (inverse) of the display object color by the complement of the background color, 
			// resulting in a bleaching effect.
			WebGLContext2D.sHelperBlendModes[BlendMode.SCREEN] = [
				Context3DBlendFactor.ONE_MINUS_DESTINATION_COLOR, Context3DBlendFactor.ONE, Context3DBlendEquation.ADD,
				Context3DBlendFactor.ONE, Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA, Context3DBlendEquation.ADD
			];
			
			// Adds the values of the constituent colors of the display object to the colors of its background, 
			// applying a ceiling of 0xFF.
			WebGLContext2D.sHelperBlendModes[BlendMode.ADD] = [
				Context3DBlendFactor.ONE, Context3DBlendFactor.ONE, Context3DBlendEquation.ADD,
				null, null, null
			];
			
			// Subtracts the values of the constituent colors in the display object from the values of the background color, 
			// applying a floor of 0.
			WebGLContext2D.sHelperBlendModes[BlendMode.SUBTRACT] = [
				Context3DBlendFactor.ONE, Context3DBlendFactor.ONE, Context3DBlendEquation.REVERSE_SUBTRACT,
				Context3DBlendFactor.ONE, Context3DBlendFactor.ONE, Context3DBlendEquation.ADD
			];
			
			// Applies the alpha value of each pixel of the display object to the background.
			WebGLContext2D.sHelperBlendModes[BlendMode.ALPHA] = [
				Context3DBlendFactor.ZERO, Context3DBlendFactor.SOURCE_ALPHA, Context3DBlendEquation.ADD,
				null, null, null
			];
			
			// Erases the background based on the alpha value of the display object.
			WebGLContext2D.sHelperBlendModes[BlendMode.ERASE] = [
				Context3DBlendFactor.ZERO, Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA, Context3DBlendEquation.ADD,
				null, null, null
			];
			
			// internal
			WebGLContext2D.sHelperBlendModes[BlendMode.INTERSECT_INTERCHANGE] = [
				Context3DBlendFactor.ONE_MINUS_DESTINATION_ALPHA, Context3DBlendFactor.SOURCE_ALPHA, Context3DBlendEquation.ADD,
				Context3DBlendFactor.ZERO, Context3DBlendFactor.ONE, Context3DBlendEquation.ADD
			];
		}asc.stb(WebGLContext2D,$); }();
		
		/**
		 * Вспомогательый класс для трансляции инструкций as3 в js.
		 */		
		public context:Context3D = null;
		
		/**
		 * То на чем рисуем 
		 */		
		private mCanvas:HTMLCanvasElement = null;
		
		/**
		 * Matrixes.
		 */		
		private mMatrix:Matrix = null;
		private mMatrix3d:Matrix3D = null;
		private mUvMatrix3d:Matrix3D = null;
		private mMatrixHelp:Matrix = null;
		
		/**
		 * Color transform.
		 */		
		private mColorTransform:ColorTransform = null;
		private mDataColorMultiplier:number[] = undefined;
		private mDataColorOffset:number[] = undefined;
		
		/**
		 * Blend mode.
		 */		
		private mBlendMode:string = null;
		
		/**
		 * Scissor.
		 */		
		private mClipRect:Rectangle = null;
		
		/**
		 * States.
		 */		
		private mStates:any[] = null;
		private mStatesPos:number = 0;
		
		/**
		 * Batch.
		 */		
		private mBatch:GLBatchRenderer = null;
		private mBatchEnabled:boolean = false;
		
		/**
		 * Испортили полотно служебными операциями.
		 */
		private mDirty:boolean = false;
		
		/**
		 * Helpers.
		 */		
		private mBitmapDrawable:GLDrawable = null;
		private mLastBlendMode:string = null;
		private mLastProgram:Program3D = null;
		private mVertexProgramInited:Dictionary = null;
		
		/**
		 * Constructor.
		 * 
		 */		
		constructor(canvas:HTMLCanvasElement)
		{
			/**/ canvas = strict(canvas, HTMLCanvasElement);
			this.mCanvas = canvas;
			this.mMatrix = new Matrix;
			this.mClipRect = new Rectangle;
			this.mColorTransform = new ColorTransform;
			this.mStates = [];
			this.mStatesPos = -1;
			this.mMatrix3d = new Matrix3D;
			this.mUvMatrix3d = new Matrix3D;
			this.mMatrixHelp = new Matrix;
			this.mBlendMode = BlendMode.NORMAL;
			this.mVertexProgramInited = new Dictionary;
			
			this.context = new Context3D(this.mCanvas, {
				alpha: true,
				premultipliedAlpha: true,
				optimizeUniforms: true
			});
			this.context.setCulling(Context3DTriangleFace.NONE);
			this.context.__configureBackBuffer(this.mCanvas.width, this.mCanvas.height, 0, false, false);
			
			var posData:Float32Array = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
			var indexData:Uint16Array = new Uint16Array([0, 2, 1, 2, 1, 3]);
			this.mBitmapDrawable = new GLDrawable(posData, posData, indexData, this.context.__gl.STATIC_DRAW);
			this.mDataColorMultiplier = (<number[]>[1.0, 1.0, 1.0, 1.0]);
			this.mDataColorOffset = (<number[]>[0.0, 0.0, 0.0, 0.0]);
		}
		
		/**
		 * Is need to redraw 
		 */		
		/*[internal]*/ public dirty () : boolean
		{
			return this.mDirty;
		}
		
		/**
		 * Clear back buffer 
		 * 
		 */		
		/*[internal]*/ public clear () : WebGLContext2D
		{
			this.context.__clear(0, 0, 0, 0);
			
			if (!this.context.__getRenderToTexture()) {
				
				this.mDirty = true;
				
			}
			
			return this;
		}
		
		/**
		 * Save state 
		 * 
		 */		
		/*[internal]*/ public save () : WebGLContext2D
		{
			var state = this.mStates[++this.mStatesPos] = this.mStates[this.mStatesPos] || new GLCanvasState;
			state.matrix.__copyFrom(this.mMatrix);
			state.color.__copyFrom(this.mColorTransform);
			state.blendMode = this.mBlendMode;
			state.rect.__copyFrom(this.mClipRect);
			state.renderToTexture = this.context.__getRenderToTexture();
			return this;
		}
		
		/**
		 * Save transform matrix
		 * 
		 */		
		/*[internal]*/ public saveTransform () : WebGLContext2D
		{
			var state = this.mStates[++this.mStatesPos] = this.mStates[this.mStatesPos] || new GLCanvasState;
			state.matrix.__copyFrom(this.mMatrix);
			return this;
		}
		
		/**
		 * Reset transform matrix
		 * 
		 */		
		/*[internal]*/ public resetTransform () : WebGLContext2D
		{
			this.mMatrix.identity();
			return this;
		}
		
		/**
		 * Restore state 
		 * 
		 */		
		/*[internal]*/ public restore () : WebGLContext2D
		{
			var state = this.mStates[this.mStatesPos--];
			this.mMatrix.__copyFrom(state.matrix);
			this.mColorTransform.__copyFrom(state.color);
			this.mBlendMode =as( state.blendMode, 'String');
			this.mClipRect.__copyFrom(state.rect);
			
			if (this.context.__getRenderToTexture() != state.renderToTexture) {
				
				this.setRenderToTexture(state.renderToTexture); // там же выполняется __setScissorRectangle
				
			} else {
				
				this.__setScissorRectangle(this.mClipRect);
				
			}
			
			return this;
		}
		
		/**
		 * Restore transform matrix
		 * 
		 */		
		/*[internal]*/ public restoreTransform () : WebGLContext2D
		{
			var state = this.mStates[this.mStatesPos--];
			this.mMatrix.__copyFrom(state.matrix);
			return this;
		}
		
		/**
		 * Save state and reset 
		 * 
		 */		
		/*[internal]*/ public saveAndReset () : WebGLContext2D
		{
			this.save();
			this.mMatrix.identity();
			this.mColorTransform.identity();
			this.mBlendMode = 'normal';
			this.mClipRect.setEmpty();
			this.setRenderToTexture(null); // там же выполняется __setScissorRectangle
			return this;
		}
		
		/**
		 * Текущая матрица преобразований
		 * @return 
		 * 
		 */		
		/*[internal]*/ public get currentTransform ():Matrix
		{
			return this.mMatrix;
		}
		
		/**
		 * Смещение матрицы
		 * @param x
		 * @param y
		 * 
		 */		
		/*[internal]*/ public translate (x:number, y:number) : WebGLContext2D
		{
			// x = (+(x)); y = (+(y));
			this.mMatrix.__translate(x, y);
			return this;
		}
		
		/**
		 * Поворот матрицы 
		 * @param angle
		 * 
		 */		
		/*[internal]*/ public rotate (angle:number) : WebGLContext2D
		{
			// angle = (+(angle));
			this.mMatrix.rotate(angle);
			return this;
		}
		
		/**
		 * Скалирование матрицы 
		 * @param x
		 * @param y
		 * 
		 */		
		/*[internal]*/ public scale (x:number, y:number) : WebGLContext2D
		{
			// x = (+(x)); y = (+(y));
			this.mMatrix.scale(x, y);
			return this;
		}
		
		/**
		 * Установка матрицы значениями
		 * @param a
		 * @param b
		 * @param c
		 * @param d
		 * @param tx
		 * @param ty
		 * 
		 */		
		/*[internal]*/ public setTransform (a:number, b:number, c:number, d:number, tx:number, ty:number) : WebGLContext2D
		{
			// a = (+(a)); b = (+(b)); c = (+(c)); d = (+(d)); tx = (+(tx)); ty = (+(ty));
			this.mMatrix.__setTo(a, b, c, d, tx, ty);
			return this;
		}
		
		/**
		 * Установка матрицы значениями из другой матрицы
		 * @param value
		 * 
		 */		
		/*[internal]*/ public setTransformFromMatrix (value:Matrix) : WebGLContext2D
		{
			// value = strict(value, Matrix);
			this.mMatrix.__copyFrom(value);
			return this;
		}
		
		/**
		 * Объединение матриц
		 * @param value
		 * 
		 */		
		/*[internal]*/ public transform (value:Matrix) : WebGLContext2D
		{
			// value = strict(value, Matrix);
			this.mMatrix.__concat(value);
			return this;
		}
		
		/**
		 * Очистка области 
		 * @param x
		 * @param y
		 * @param w
		 * @param h
		 * 
		 */		
		/*[internal]*/ public clearRect (x:number, y:number, w:number, h:number) : WebGLContext2D
		{
			// x = (+(x)); y = (+(y)); w = (+(w)); h = (+(h));
			this.save();
			this.clipRect(x, y, w, h);
			this.context.__clear(0, 0, 0, 0);
			this.restore();
			return this;
		}
		
		/**
		 * Заливка области цветом 
		 * @param x
		 * @param y
		 * @param w
		 * @param h
		 * @param color ARGB
		 * 
		 */		
		/*[internal]*/ public fillRect (x:number, y:number, w:number, h:number, color:number) : WebGLContext2D
		{
			// x = (+(x)); y = (+(y)); w = (+(w)); h = (+(h)); color = ((color) >>> 0);
			this.save();
			var a:number = (color >>> 24 & 0xff) / 255;
			var r:number = (color >> 16 & 0xff) / 255;
			var g:number = (color >> 8 & 0xff) / 255;
			var b:number = (color & 0xff) / 255;
			this.clipRect(x, y, w, h);
			this.context.__clear(r * a, g * a, b * a, a); // premultiplied
			this.restore();
			return this;
		}
		
		/**
		 * Преобразование цвета 
		 * @param value
		 * 
		 */		
		/*[internal]*/ public colorTransform(value:ColorTransform):WebGLContext2D
		{
			// value = strict(value, ColorTransform);
			this.mColorTransform.__concat(value);
			return this;
		}
		
		/**
		 * Блендинг 
		 * @param value
		 * 
		 */		
		/*[internal]*/ public blendMode(value:string):WebGLContext2D
		{
			// value = as(value, 'String');
			this.mBlendMode = value || 'normal';
			return this;
		}
		
		/**
		 * Отсечение относительно нулевой матрицы трансформации
		 * @param x
		 * @param y
		 * @param width
		 * @param height
		 * 
		 */		
		/*[internal]*/ public clipRect (x:number, y:number, width:number, height:number) : WebGLContext2D
		{
			// x = (+(x)); y = (+(y)); width = (+(width)); height = (+(height));
			this.mClipRect.__setTo(x, y, width, height);
			
			if (this.mClipRect.isEmpty()) {
				
				this.__setScissorRectangle(null);
				return this;
				
			}
			
			this.__setScissorRectangle(this.mClipRect, true);
			return this;
		}
		
		/**
		 * Отсечение относительно текущей матрицы трансформации
		 * @param x
		 * @param y
		 * @param width
		 * @param height
		 * 
		 */		
		/*[internal]*/ public clipRectWithTransformMatrix (x:number, y:number, width:number, height:number) : WebGLContext2D
		{
			// x = (+(x)); y = (+(y)); width = (+(width)); height = (+(height));
			this.mClipRect.__setTo(x, y, width, height);
			this.mMatrix.__transformRectangleInPlace(this.mClipRect);
			
			if (this.mClipRect.isEmpty()) {
				
				this.__setScissorRectangle(null);
				return this;
				
			}
			
			for (var i:number = this.mStatesPos; i > 0; --i) {
				
				var state = this.mStates[i];
				var rect = state.rect;
				
				if (rect.isEmpty()) {
					
					continue;
					
				}
				
				this.mClipRect.__intersectInPlace(rect);
				
			}
			
			this.__setScissorRectangle(this.mClipRect, true);
			return this;
		}
		
		/**
		 * Последующие инструкции будут рисоватся в BitmapData.
		 * @param destination
		 * 
		 */		
		/*[internal]*/ public setRenderToBitmapData (destination:BitmapData) : WebGLContext2D
		{
			// destination = strict(destination, BitmapData);
			if (!destination) {
				
				return this.setRenderToTexture(null);
				
			}
			
			var texture = destination.__getTexture();
			texture._parent = destination;
			return this.setRenderToTexture(texture);
		}
		
		/**
		 * Последующие инструкции будут рисоватся в BitmapData.
		 * @param destination
		 * 
		 */		
		/*[internal]*/ public setRenderToTexture (destination:TextureBase) : WebGLContext2D
		{
			// destination = strict(destination, TextureBase);
			if (!destination) {
				
				this.context.setRenderToBackBuffer();
				
			} else {
				
				this.context.__setRenderToTexture(destination);
				
			}
			
			this.__setScissorRectangle(this.mClipRect); // обновляем отсечение ибо Context3D его тут сбрасывает
			return this;
		}
		
		/**
		 * Скопировать то что на экране в BitmapData.
		 * @param destination BitmapData
		 * 
		 */		
		/*[internal]*/ public copyScreenToBitmapData (destination:BitmapData):void
		{
			// destination = strict(destination, BitmapData);
			this.context.drawToBitmapData(destination);
		}
		
		/**
		 * Prepare back buffer 
		 * 
		 */		
		/*[internal]*/ public enter () : void
		{
			//if (!mBatch) {
			
			//	var screenSize = Math.max(Capabilities.__getScreenResolutionX(), Capabilities.__getScreenResolutionY());
			//	var bufferSize = Math.max(context.maxTextureWidth, context.maxTextureHeight);
			//	var len = 1;
			//	if (bufferSize / screenSize < 2) {
			//		len = Math.ceil((screenSize * 2) / bufferSize);
			//	}
			//	mBatch = new GLBatchRenderer(bufferSize, bufferSize, len);
			
			//}
			
			//mBatchEnabled = true;
		}
		
		/**
		 * Show back buffer 
		 * 
		 */		
		/*[internal]*/ public present () : void
		{
			this.mDirty = false;
			this.context.present();
			
			//if (mBatch._cleared > 1) {
			
			//	mBatch.expand();
			
			//}
			//mBatch.present();
			//mBatchEnabled = false;
		}
		
		/**
		 * Нарисовать изображение.
		 * @param data
		 * @param smoothing
		 * @param externalProgram
		 * 
		 */		
		/*[internal]*/ public drawImage (data:BitmapData, smoothing:boolean = false, externalProgram:boolean = false):void
		{
			// data = strict(data, BitmapData); smoothing = Boolean(smoothing); externalProgram = Boolean(externalProgram);
			//if (mBatchEnabled) {
			
			//	mBatchEnabled = false;
			
			//	var entry = mBatch.getEntry(data);
			//	if (!entry) {
			
			//		if (mBatch.add(data, true)) {
			
			//			entry = mBatch.getEntry(data);
			
			//		}
			
			//	}
			
			//	mBatchEnabled = true;
			
			//	if (entry) {
			
			//		__drawAtlasImage(entry, smoothing);
			//		return;
			
			//	}
			
			//}
			
			this.__drawImage(data, null, smoothing, externalProgram);
		}
		
		/**
		 * Нарисовать векторное изображение.
		 * @param target
		 * @param graphics
		 * 
		 */		
		/*[internal]*/ public drawGraphics (target:DisplayObject, graphics:Graphics):void
		{
			// target = strict(target, DisplayObject); graphics = strict(graphics, Graphics);
			// world matrix
			var worldTransform = target.__getWorldTransform();
			
			// cache
			var cache = graphics.__getCache(worldTransform);
			if (!cache) {
				
				return;
				
			}
			
			// render
			cache.draw(this, worldTransform);
		}
		
		/**
		 * Нарисовать однострочный текст со смещением.
		 * @param target
		 * @param text
		 * @param textFormat
		 * @param x
		 * @param y
		 * 
		 */		
		/*[internal]*/ public drawText(target:DisplayObject, text:string, textFormat:TextFormat, x:number, y:number, width:number, height:number):void
		{
			// target = strict(target, DisplayObject); text = as(text, 'String'); textFormat = strict(textFormat, TextFormat); x = (+(x)); y = (+(y)); width = (+(width)); height = (+(height));
			// default
			width = Math.ceil(width);
			height = Math.ceil(height);
			
			// empty
			if (width <= 0 || height <= 0) {
				
				return;
				
			}
			
			// world matrix
			var worldTransform = target.__getWorldTransform();
			
			// hash
			var hash = text + textFormat.__getHash();
			
			// lines
			var lines = WebGLContext2D.sHelperTextLine[hash] = WebGLContext2D.sHelperTextLine[hash] || [];
			
			// exists
			var minRatio, validIndex = -1;
			for (var i = 0, len = lines.length; i < len; ++i)
			{
				var c = lines[i];
				
				if (c.isCacheValid(worldTransform)) {
					
					var r = c.getCacheRatio(worldTransform);
					
					if (r < minRatio || isNaN(minRatio)) {
						
						minRatio = r;
						validIndex = i;
						
					}
					
				}
			}
			
			// cache
			var cache;
			if (validIndex >= 0) {
				
				cache = lines[validIndex];
				
			} else {
				
				var m = Matrix.__pool.get();
				m.__copyFrom(worldTransform, false);
				
				var b = Rectangle.__pool.get();
				b.__setTo(0, 0, width, height);
				m.__transformRectangleInPlace(b);
				b.__inflateCeil(1, 1); // math fix
				m.__translate(-b.x, -b.y);
				
				cache = new GLCacheDisplayObject(
					new SystemBitmapData(SystemBitmapData.TEXT, b.width, b.height, true, 0x0).__fromText(text, textFormat, m),
					worldTransform
				);
				
				var cacheTransform = cache.cacheTransform;
				cacheTransform.__translate(b.x, b.y);
				
				lines[lines.length] = cache;
				
				Rectangle.__pool.release(b);
				Matrix.__pool.release(m);
				
			}
			
			// transform
			WebGLContext2D.sHelperMatrix.__copyFrom(worldTransform);
			WebGLContext2D.sHelperMatrix.__translateTransformed(x, y);
			
			// fit to pixel
			WebGLContext2D.sHelperMatrix.tx = WebGLContext2D.sHelperMatrix.tx | 0;
			WebGLContext2D.sHelperMatrix.ty = WebGLContext2D.sHelperMatrix.ty | 0;
			
			// render
			cache.draw(this, WebGLContext2D.sHelperMatrix);
		}
		
		/**
		 * Нарисовать изображение.
		 * @param data
		 * @param smoothing
		 * @param externalProgram
		 * 
		 */		
		/*[internal]*/ private __drawAtlasImage (entry:AtlasEntry, smoothing:boolean = false):void
		{
			// entry = strict(entry, AtlasEntry); smoothing = Boolean(smoothing);
			var rect = entry.node.rect;
			var image = entry.image;
			WebGLContext2D.sHelperRect.__setTo(rect.x, rect.y, image._width, image._height);
			this.__drawImage(entry.atlas.getAtlas(), WebGLContext2D.sHelperRect, smoothing);
		}
		
		/**
		 * Нарисовать изображение.
		 * @param data
		 * @param smoothing
		 * @param externalProgram
		 * 
		 */	
		/*[internal]*/ private __drawImage (data:BitmapData, rect:Rectangle, smoothing:boolean = false, externalProgram:boolean = false):void
		{
			// data = strict(data, BitmapData); rect = strict(rect, Rectangle); smoothing = Boolean(smoothing); externalProgram = Boolean(externalProgram);
			var texture = data.__getTexture(), 
				sampler = 0,
				drawable = this.mBitmapDrawable,
				colorTransform = this.mColorTransform,
				posmatr = this.mMatrix, 
				uvmatr = null, 
				scaleWithImage = true, 
				scaleWithImageUV = true;
			
			///////////////////////////////////////////////
			// 0. Валидация                              //
			///////////////////////////////////////////////
			if (!texture) {
				
				return;
				
			}
			
			///////////////////////////////////////////////
			// 1. Размеры                                //
			///////////////////////////////////////////////
			var tw = texture.__width;
			var th = texture.__height;
			var iw = data._width;
			var ih = data._height;
			
			var fullRect = !rect || data._rect.__equals(rect);
			if (fullRect) {
				
				iw = tw;
				ih = th;
				
			} else {
				
				uvmatr = WebGLContext2D.sHelperMatrix2;
				uvmatr.identity();
				uvmatr.__translate(rect.x, rect.y);
				iw = rect.width;
				ih = rect.height;
				
			}
			
			var sw, sh;
			var renderToTexture = this.context.__getRenderToTexture();
			if (renderToTexture) {
				
				sw = renderToTexture.__width;
				sh = renderToTexture.__height;
				
			} else {
				
				sw = this.context.__backBufferWidth;
				sh = this.context.__backBufferHeight;
				
			}
			
			
			///////////////////////////////////////////////
			// attribute (переменные вершин)             //
			//   vec2 va0 - pos                          //
			//   vec2 va1 - uv                           //
			///////////////////////////////////////////////
			
			///////////////////////////////////////////////
			// uniform (глобальные константы вершин)     //
			//   mat4 vc0 - pos matrix                   //
			//   mat4 vc4 - uv matrix                    //
			///////////////////////////////////////////////
			
			///////////////////////////////////////////////
			// uniform (глобальные константы пикселей)   //
			//   vec4 fc0 - color multiplier             //
			//   vec4 fc1 - color offset                 //
			///////////////////////////////////////////////
			
			
			///////////////////////////////////////////////
			// 2. Блендинг                             //
			///////////////////////////////////////////////
			var useMultipleTexture = !!(!externalProgram && renderToTexture && GLBlendModeShaders.hasProgram(this.mBlendMode));
			var withColorMultiplier = this.mColorTransform.isMultiplier;
			var withColorOffset = this.mColorTransform.isOffset;
			
			var destinationBuff;
			if (useMultipleTexture) {
				
				var parent = renderToTexture._parent;
				if (!parent) {
					
					try {
						
						throw new Error('Internal: renderToTexture._parent == void 0');
						
					} catch (e) {
						
						e = window.asc.e2e(e);
						
						trace(e.getStackTrace());
						
					}
					
				}
				
				destinationBuff = SystemBitmapData.__popBuffer(iw, ih, data._transparent, true);
				destinationBuff.__drawWithQuality(parent);
				
			}
			
			this.__setBlendMode(!useMultipleTexture ? this.mBlendMode : null);
			
			///////////////////////////////////////////////
			// 3. Выбор программы                        //
			///////////////////////////////////////////////
			var prog;
			if (!externalProgram) {
				
				prog = GLBlendModeShaders.getProgram(this.context, this.mBlendMode, withColorMultiplier, withColorOffset);	
				this.__setProgram(prog);
				
			}
			
			///////////////////////////////////////////////
			// 4. Параметры текстуры                     //
			///////////////////////////////////////////////
			this.context.__setSamplerStateAt(
				sampler + (useMultipleTexture ? 1 : 0), 
				Context3DWrapMode.CLAMP, 
				smoothing ? Context3DTextureFilter.LINEAR : Context3DTextureFilter.NEAREST, 
				Context3DMipFilter.MIPNONE
			);
			
			///////////////////////////////////////////////
			// 5. Установка текстуры                     //
			///////////////////////////////////////////////
			if (useMultipleTexture) {
				
				this.context.__setTextureAt(sampler, destinationBuff.__getTexture());
				this.context.__setTextureAt(sampler + 1, texture);
				
			} else {
				
				this.context.__setTextureAt(sampler, texture);
				
			}
			
			///////////////////////////////////////////////
			// 6. Установка переменных вершин            //
			///////////////////////////////////////////////
			if (prog && !this.mVertexProgramInited.get(prog)) {
				
				this.context.__setVertexBufferAt(0, drawable.pos.getBuff(this.context), 0, Context3DVertexBufferFormat.FLOAT_2);
				this.context.__setVertexBufferAt(1, drawable.uv.getBuff(this.context), 0, Context3DVertexBufferFormat.FLOAT_2);
				
				this.mVertexProgramInited.set(prog,  1);
				
			}
			
			///////////////////////////////////////////////
			// 7. Установка глобальных констант вершин   //
			///////////////////////////////////////////////
			this.mMatrix3d.rawData[0] = posmatr.a*2 / sw;
			this.mMatrix3d.rawData[1] = -posmatr.b*2 / sh;
			this.mMatrix3d.rawData[4] = posmatr.c*2 / sw;
			this.mMatrix3d.rawData[5] = -posmatr.d*2 / sh;
			this.mMatrix3d.rawData[12] = posmatr.tx*2 / sw - 1;
			this.mMatrix3d.rawData[13] = 1 - posmatr.ty*2 / sh;
			
			if (scaleWithImage) {
				
				this.mMatrix3d.rawData[0] *= iw;
				this.mMatrix3d.rawData[1] *= iw;
				this.mMatrix3d.rawData[4] *= ih;
				this.mMatrix3d.rawData[5] *= ih;
				
			}
			
			this.context.__setProgramConstantsFromMatrix(Context3DProgramType.VERTEX, 0, this.mMatrix3d);
			
			if (uvmatr) {
				
				this.mMatrixHelp.__copyFrom(uvmatr);
				this.mMatrixHelp.invert();
				this.mUvMatrix3d.rawData[0] = this.mMatrixHelp.a / tw;
				this.mUvMatrix3d.rawData[1] = -this.mMatrixHelp.b / tw;
				this.mUvMatrix3d.rawData[4] = -this.mMatrixHelp.c / th;
				this.mUvMatrix3d.rawData[5] = this.mMatrixHelp.d / th;
				this.mUvMatrix3d.rawData[12] = -this.mMatrixHelp.tx / tw;
				this.mUvMatrix3d.rawData[13] = -this.mMatrixHelp.ty / th;
				
				if (scaleWithImageUV) {
					
					this.mUvMatrix3d.rawData[0] *= iw;
					this.mUvMatrix3d.rawData[1] *= iw;
					this.mUvMatrix3d.rawData[4] *= ih;
					this.mUvMatrix3d.rawData[5] *= ih;
					
				}
				
			}
			
			this.context.__setProgramConstantsFromMatrix(Context3DProgramType.VERTEX, 4, this.mUvMatrix3d);
			
			///////////////////////////////////////////////
			// 8. Установка глобальных констант пикселей //
			///////////////////////////////////////////////
				
			if (withColorMultiplier) {
			
				this.mDataColorMultiplier[0] = colorTransform.redMultiplier;
				this.mDataColorMultiplier[1] = colorTransform.greenMultiplier;
				this.mDataColorMultiplier[2] = colorTransform.blueMultiplier;
				this.mDataColorMultiplier[3] = colorTransform.alphaMultiplier;
				this.context.__setProgramConstantsFromVector(Context3DProgramType.FRAGMENT, 0, this.mDataColorMultiplier, 1);
				
			}
			
			if (withColorOffset) {
				
				this.mDataColorOffset[0] = colorTransform.redOffset / 255;
				this.mDataColorOffset[1] = colorTransform.greenOffset / 255;
				this.mDataColorOffset[2] = colorTransform.blueOffset / 255;
				this.mDataColorOffset[3] = colorTransform.alphaOffset / 255;
				this.context.__setProgramConstantsFromVector(Context3DProgramType.FRAGMENT, 1, this.mDataColorOffset, 1);
				
			}
			
			
			///////////////////////////////////////////////
			// 9. Рисование                              //
			///////////////////////////////////////////////
			this.context.__drawTriangles(drawable.index.getBuff(this.context), 0, drawable.numTriangles);
			
			///////////////////////////////////////////////
			// 10. Очистка                               //
			///////////////////////////////////////////////
			if (destinationBuff) {
				
				destinationBuff.dispose();
				
			}
		}
		
		/*[internal]*/ private __setScissorRectangle (value:Rectangle, strictMode:boolean = false):void
		{
			// value = strict(value, Rectangle); strictMode = Boolean(strictMode);
			if (!value || (value.isEmpty() && !strictMode)) {
				
				this.context.__setScissorRectangle(null);
				return;
				
			}
			
			var renderToTexture = this.context.__getRenderToTexture();
			if (renderToTexture) {
				
				WebGLContext2D.sHelperRect.__setTo(value.x, renderToTexture.__height - value.y - value.height, value.width, value.height);
				this.context.__setScissorRectangle(WebGLContext2D.sHelperRect);
				return;
				
			}
			
			this.context.__setScissorRectangle(value);
		}
		
		/*[internal]*/ private __setProgram(value:Program3D):void
		{
			// value = strict(value, Program3D);
			if (this.mLastProgram == value) {
				
				return;
				
			}
			
			this.mLastProgram = value;
			this.context.__setProgram(value);
		}
		
		/*[internal]*/ private __setBlendMode(value:string):void
		{
			// value = as(value, 'String');
			if (this.mLastBlendMode == value) {
				
				return;
				
			}
			
			if ((this.mLastBlendMode = value) == null) {
				
				this.context.__setBlendFactorsSeparate(null, null, null, null, null, null);
				return;
				
			}
			
			this.context.__setBlendFactorsSeparate.apply(this.context, WebGLContext2D.sHelperBlendModes[value] || WebGLContext2D.sHelperBlendModes['normal']);
		}
	}
}