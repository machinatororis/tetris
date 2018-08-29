/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../geom/Matrix.ts" />
/// <reference path="../../../display/BitmapData.ts" />

namespace flash.__native.renderer.webgl
{
	export import BitmapData = flash.display.BitmapData;
	export import Matrix = flash.geom.Matrix;
	

	export  class GLCacheDisplayObject
	{
		/**
		 * Допустимый порог изменения соотношения масштабов для cache, 
		 * после которого он будет обновлен (от 1 до x).
		 * 
		 * Где:
		 *  1 - cache будет обновляться всегда
		 *  x - cache будет обновляться когда соотношение скейлов будет больше допустимого предела
		 * 
		 * Формула:
		 *  var r = newScale > oldScale ? newScale / oldScale : oldScale / newScale;
		 *  if (r > Stage.INTERMEDIATE_QUALITY_RATIO)
		 *   update();
		 * 
		 */		
		private static INTERMEDIATE_QUALITY_RATIO:number = 1.25;
		
		/**
		 * Матрица, с которой нужно будет рисовать кэш 
		 */		
		public cacheTransform:Matrix = null;
		
		/**
		 * Кол-во кадров перед тем как кэш будет зачещен если нет Stage
		 */		
		public notStagedFrames:number = 1;
		
		private _cache:BitmapData = null;
		private _cacheWorldTransform:Matrix = null;
		private _cacheWorldTransformScaleX:number = NaN;
		private _cacheWorldTransformScaleY:number = NaN;
		
		/**
		 * Constructor 
		 * @param cache
		 * @param cacheTransform
		 * @param cacheWorldTransform
		 * 
		 */		
		constructor(cache:BitmapData, cacheWorldTransform:Matrix)
		{
			/**/ cache = strict(cache, BitmapData); cacheWorldTransform = strict(cacheWorldTransform, Matrix);
			this.cacheTransform =strict( Matrix.__pool.get(), Matrix);
			
			this._cache = cache;
			this._cacheWorldTransform =strict( Matrix.__pool.get(), Matrix);
			this._cacheWorldTransform.__copyFrom(cacheWorldTransform, false);
			this._cacheWorldTransformScaleX = cacheWorldTransform.__getScaleX();
			this._cacheWorldTransformScaleY = cacheWorldTransform.__getScaleY();
		}
		
		/**
		 * Нарисовать 
		 */		
		/*[internal]*/ public draw (ctx:WebGLContext2D, worldTransform:Matrix):void
		{
			// ctx = strict(ctx, WebGLContext2D); worldTransform = strict(worldTransform, Matrix);
			// save
			ctx.saveTransform();
			
			// cache matrix
			var matrixDiffers = !this._cacheWorldTransform.__equals(worldTransform, false);
			if (matrixDiffers) {
				
				var m1 = Matrix.__pool.get();
				var m2 = Matrix.__pool.get();
				
				m1.__copyFrom(this._cacheWorldTransform);
				m1.invert();
				m2.__copyFrom(worldTransform, false);
				m1.__concat(m2);
				m1.__translateTransformed(this.cacheTransform.tx, this.cacheTransform.ty);
				
				ctx.setTransformFromMatrix(m1);
				
				Matrix.__pool.release(m1);
				Matrix.__pool.release(m2);
				
			} else {
				
				ctx.setTransformFromMatrix(this.cacheTransform);
				
			}
			
			// world position
			ctx.translate(worldTransform.tx, worldTransform.ty);
			
			// render
			ctx.drawImage(this._cache, matrixDiffers);
			
			// restore
			ctx.restoreTransform();
		}
		
		/**
		 * Наибольшая пропорция изменений скейла
		 */		
		/*[internal]*/ public getCacheRatio (matrix:Matrix):number
		{
			// matrix = strict(matrix, Matrix);
			var sx = matrix.__getScaleX();
			var sy = matrix.__getScaleY();
			
			var dx = sx > this._cacheWorldTransformScaleX ? sx / this._cacheWorldTransformScaleX : this._cacheWorldTransformScaleX / sx;
			var dy = sy > this._cacheWorldTransformScaleY ? sy / this._cacheWorldTransformScaleY : this._cacheWorldTransformScaleY / sy;
			
			return dx > dy ? dx : dy;
		}
		
		/**
		 * Нужно ли обновлять кэш для этой матрицы 
		 */		
		/*[internal]*/ public isCacheValid (matrix:Matrix):boolean
		{
			// matrix = strict(matrix, Matrix);
			if (!this._cache) {
				
				return false;
				
			}
			
			if (GLCacheDisplayObject.INTERMEDIATE_QUALITY_RATIO <= 1.0) {
				
				return this._cacheWorldTransform.__equals(matrix, false);
				
			}
			
			return this.getCacheRatio(matrix) <= GLCacheDisplayObject.INTERMEDIATE_QUALITY_RATIO;
		}
		
		/**
		 * Разрушить 
		 */		
		/*[internal]*/ public dispose ():void
		{
			if (this.cacheTransform) {
				
				Matrix.__pool.release(this.cacheTransform);
				this.cacheTransform = null;
				
			}
			
			if (this._cacheWorldTransform) {
				
				Matrix.__pool.release(this._cacheWorldTransform);
				this._cacheWorldTransform = null;
				
			}
			
			if (this._cache) {
				
				this._cache.dispose();
				this._cache = null;
				
			}
		}
	}
}