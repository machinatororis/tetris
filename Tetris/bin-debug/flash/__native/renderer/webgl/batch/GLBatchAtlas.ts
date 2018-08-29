/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../geom/Matrix.ts" />
/// <reference path="../../../../display/BitmapData.ts" />

namespace flash.__native.renderer.webgl.batch
{
	export import BitmapData = flash.display.BitmapData;
	export import Matrix = flash.geom.Matrix;
	

	/**
	 * Атлас изображений для пакетного рендеринга 
	 * @author pkulikov
	 * 
	 */	
	export  class GLBatchAtlas
	{
		private static sHelperMatrix:Matrix = asc.sti(GLBatchAtlas,()=>{ GLBatchAtlas.sHelperMatrix = new Matrix; });
		
		private _width:number = 0;
		private _height:number = 0;
		private _all:any = null;
		private _tree:AtlasTree = null;
		private _atlas:BitmapData = null;
		private _padding:number = 0;
		private _used:boolean = false;
		
		/**
		 * Constructor 
		 * @param width
		 * @param height
		 * 
		 */		
		constructor(width:number, height:number)
		{
			/**/ width = ((width) >> 0); height = ((height) >> 0);
			this._width = width;
			this._height = height;
			this._atlas = new BitmapData(this._width, this._height, true, 0x0);
			this._all = {};
			this._tree = new AtlasTree;
			this._tree.root = this.__createAtlasRoot();
			this._padding = 2;
		}
		
		/**
		 * Добавить изображение в свободное место 
		 * 
		 */		
		/*[internal]*/ public add (image:any):boolean
		{
			var entry = this._all[image._uid];
			if (!entry) {
				
				entry = new AtlasEntry(this, image);
				entry.width += this._padding;
				entry.height += this._padding;
				
				return this.__insert(entry);
				
			}
			
			return false;
		}
		
		/**
		 * Пометить как использованное
		 * 
		 */		
		/*[internal]*/ public getEntry (image:any):AtlasEntry
		{
			var entry = this._all[image._uid];
			if (entry) {
				
				this.update(image);
				this._used = entry.used = true;
				return entry;
				
			}
			
			return null;
		}
		
		/**
		 * Пометить всех как не использованное
		 * 
		 */		
		/*[internal]*/ public unusedAll ():void
		{
			this._used = false;
			
			var __for0 = window.asc.in(this._all);
			for (var uid of __for0) {
				
				var entry = this._all[uid];
				entry.used = false;
				
			}
		}
		
		/**
		 * Обновить изображение в атласе
		 * 
		 */		
		/*[internal]*/ public update (image:any, clear:boolean = true):boolean
		{
			// clear = Boolean(clear);
			var entry = this._all[image._uid];
			
			if (!entry) {
				
				return false;
				
			}
			
			if (entry.version == image._version) {
				
				return false;
				
			}
			
			entry.version = image._version;
			
			if (clear) {
				
				this._atlas.fillRect(entry.node.rect, 0x0);
				
			}
			GLBatchAtlas.sHelperMatrix.identity();
			GLBatchAtlas.sHelperMatrix.__translate(entry.node.rect.x, entry.node.rect.y);
			this._atlas.__drawWithQuality(image, GLBatchAtlas.sHelperMatrix);
			
			return true;
		}
		
		/**
		 * Забыть об изображение, освободив место 
		 * 
		 */		
		/*[internal]*/ public remove (image:any):boolean
		{
			var uid = image._uid;
			var entry = this._all[uid];
			
			if (!entry) {
				
				return false;
				
			}
			
			this._atlas.fillRect(entry.node.rect, 0x0);
			
			image.__stopListeningDispose();
			
			delete this._all[uid];
			delete this._tree.hash[uid];
			
			var i = this._tree.list.indexOf(entry);
			if (i >= 0) {
				this._tree.list.splice(i, 1);
			}
			
			entry.node = null;
			entry.atlas = null;
			entry.regions = null;
			entry.image = null;
			
			return true;
		}
		
		/*[internal]*/ public repack(): AtlasTree
		{
			var pack = new AtlasTree;
			
			var all = this._tree.list.slice(0);
			
			all.sort(function (a, b)
			{
				if (b.width == a.width) {
					
					return b.height - a.height;
					
				}
				
				return b.width - a.width;
			}.__bind(this));
			
			var root = this.__createAtlasRoot();
			pack.root = root;
			
			var __for1 = window.asc.in(this._all);
			for (var uid of __for1) {
				
				var entry = this._all[uid];
				var node = root.insert(
					this._width, this._height,
					entry.width, entry.height, entry
				);
				
				if (!node) {
					
					return null;
					
				} else {
					
					pack.hash[entry.image._uid] = node;
					
				}
			}
			
			pack.parent = this;
			
			return pack;
		}
		
		/**
		 * Почистить неиспользуемый мусор 
		 * 
		 */		
		/*[internal]*/ public gc ():void
		{
			if (!this._used) {
				
				this.clear();
				return;
				
			}
			
			var __for2 = window.asc.in(this._all);
			for (var uid of __for2) {
				
				var entry = this._all[uid];
				if (entry.used) {
					
					continue;
					
				}
				
				this.remove(entry.image);
			}
		}
		
		/**
		 * Забыть обо всех 
		 * 
		 */		
		/*[internal]*/ public clear ():void
		{
			this._atlas.fillRect(this._atlas._rect, 0x0);
			this._all = {};
			this._tree = new AtlasTree;
			this._tree.root = this.__createAtlasRoot();
		}
		
		/**
		 * Возвращает визуальное представление
		 * @return 
		 * 
		 */		
		/*[internal]*/ public getAtlas ():BitmapData
		{
			return this._atlas;
		}
		
		/*[internal]*/ public __applyAtlasTree (pack:AtlasTree):void
		{
			// pack = strict(pack, AtlasTree);
			this._tree.root = pack.root;
			this._tree.hash = pack.hash;
			this._atlas.fillRect(this._atlas._rect, 0x0);
			
			var __for3 = window.asc.in(this._all);
			for (var uid of __for3) {
				
				var entry = this._all[uid];
				entry.node = pack.hash[entry.image._uid] || null;
				entry.atlas = entry.node ? this : null;
				
				GLBatchAtlas.sHelperMatrix.identity();
				GLBatchAtlas.sHelperMatrix.__translate(entry.node.rect.x, entry.node.rect.y);
				this._atlas.__drawWithQuality(entry.image, GLBatchAtlas.sHelperMatrix);
			}
			
		};
		
		/*[internal]*//**/ private __createAtlasRoot():AtlasNode
		{
			var res = new AtlasNode;
			
			res.rect.width = this._width;
			res.rect.height = this._height;
			
			return res;
		}
		
		/*[internal]*/ private __insert(entry: AtlasEntry):boolean
		{
			// entry = strict(entry, AtlasEntry);
			if (this.__tryInsert(entry)) {
				
				entry.image.__startListeningDispose(this.remove.__bind(this));
				return true;
				
			}
			
			return false;
		}
		
		/*[internal]*/ private __tryInsert(entry: AtlasEntry): boolean
		{
			// entry = strict(entry, AtlasEntry);
			var node = this._tree.root.insert(this._width, this._height, entry.width, entry.height, entry);
			
			if (!node) {
				
				return false;
				
			}
			
			var uid = entry.image._uid;
			
			this._all[uid] = entry;
			this._tree.hash[uid] = node;
			this._tree.list[this._tree.list.length] = entry;
			
			entry.node =strict( node, AtlasNode);
			entry.atlas = this;
			this.update(entry.image, false);
			
			return true;
		}
	}
}