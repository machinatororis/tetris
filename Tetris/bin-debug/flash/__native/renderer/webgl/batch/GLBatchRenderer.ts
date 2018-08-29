/// <reference path="../../../../../base.d.ts" />

namespace flash.__native.renderer.webgl.batch
{
	
	/**
	 * Пакетный рендеринг
	 * @author pkulikov
	 * 
	 */	
	export  class GLBatchRenderer
	{
		private static MAX_ATLASES:number = 16;
		
		private _width:number = 0;
		private _height:number = 0;
		private _atlases:any[] = null;
		private _atlasesLen:number = 0;
		private _cleared:number = 0;
		
		/**
		 * Constructor 
		 * @param context
		 * 
		 */		
		constructor (width:number, height:number, count:number)
		{
			/**/ width = ((width) >> 0); height = ((height) >> 0); count = ((count) >> 0);
			if (count < 1) count = 1;
			if (count > GLBatchRenderer.MAX_ATLASES) count = GLBatchRenderer.MAX_ATLASES;
			
			this._width = width;
			this._height = height;
			this._atlases = [];

			while (this._atlasesLen < count) {
				
				this.expand();
				
			}
		}
		
		/**
		 * Добавить ещё однин атлас 
		 */		
		/*[internal]*/ public expand ():void
		{
			if (this._atlasesLen >= GLBatchRenderer.MAX_ATLASES) {
				
				return;
				
			}
			
			this._atlases[this._atlasesLen++] = new GLBatchAtlas(this._width, this._height);
		}
		
		/**
		 * Добавить изображение в один из атласов 
		 * 
		 */		
		/*[internal]*/ public add (image:any, freeSpace:boolean = false):boolean
		{
			// freeSpace = Boolean(freeSpace);
			if (this.__add(image)) {
				
				return true;
				
			}
			
			if (!freeSpace) {
				
				return false;
				
			}
			
			this.clearAll();
			return this.__add(image);
		}
		
		/**
		 * Возвращает информацию вхождения
		 * 
		 */		
		/*[internal]*/ public getEntry (image:any):AtlasEntry
		{
			var i = 0;
			while (i < this._atlasesLen) {
				
				var entry = this._atlases[i].getEntry(image);
				if (entry) {
					
					return entry;
					
				}
				
				i++;
				
			}
			
			return null;
		}
		
		/**
		 * Пометить всех как не использованное
		 * 
		 */		
		/*[internal]*/ public unusedAll ():void
		{
			var i = 0;
			while (i < this._atlasesLen) {
				
				this._atlases[i].unusedAll();
				
				i++;
				
			}
		}
		
		/**
		 * Забыть об изображении 
		 * 
		 */
		/*[internal]*/ public remove (image:any):void
		{
			var i = 0;
			while (i < this._atlasesLen) {
				
				if (this._atlases[i].remove(image)) {
					
					return;
					
				}
				
				i++;
				
			}
		}
		
		/**
		 * Удалить неиспользуемые изображения
		 * 
		 */
		/*[internal]*/ public gc ():void
		{
			var i = 0;
			while (i < this._atlasesLen) {
				
				this._atlases[i].gc();
				i++;
				
			}
		}
		
		/**
		 * Освободить место
		 * 
		 */
		/*[internal]*/ public repack ():void
		{
			var i = 0;
			while (i < this._atlasesLen) {
				
				var atlas = this._atlases[i];
				var tree = atlas.repack();
				
				if (tree) {
					
					tree.apply();
					
				}
				
				i++;
				
			}
		}
		
		/**
		 * Забыть обо всех 
		 * 
		 */		
		/*[internal]*/ public clearAll ():void
		{
			var i = 0;
			while (i < this._atlasesLen) {
				
				this._atlases[i].clear();
				
				i++;
				
			}
			
			this._cleared++;
		}
		
		/**
		 * Вернуть список атласов
		 * 
		 */		
		/*[internal]*/ public getAtlases ():any[]
		{
			return this._atlases;
		}
		
		/**
		 * Конец отрисовки
		 */		
		/*[internal]*/ public present ():void
		{
			this._cleared = 0;
		}
		
		/*[internal]*/ private __add (image:any):boolean
		{
			var i = 0;
			while (i < this._atlasesLen) {
				
				if (this._atlases[i].add(image)) {
					
					return true;
					
				}
				
				i++;
				
			}
			
			return false;
		}
	}
}