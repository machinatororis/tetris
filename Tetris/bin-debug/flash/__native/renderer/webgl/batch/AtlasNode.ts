/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../geom/Rectangle.ts" />

namespace flash.__native.renderer.webgl.batch
{
	export import Rectangle = flash.geom.Rectangle;
	

	export  class AtlasNode
	{
		public childs:any[] = null;
		public rect:Rectangle = null;
		public data:AtlasEntry = null;
		
		/**
		 * Constructor 
		 * @param atlasWidth
		 * @param atlasHeight
		 * 
		 */		
		constructor ()
		{
			this.rect = new Rectangle(0, 0, 1 << 20, 1 << 20);
			this.childs = [];
		}
		
		/*[internal]*/ public insert(atlasWidth: number, atlasHeight: number, width: number, height: number, data: AtlasEntry): AtlasNode
		{
			// atlasWidth = (+(atlasWidth)); atlasHeight = (+(atlasHeight)); width = (+(width)); height = (+(height)); data = strict(data, AtlasEntry);
			if (this.childs.length > 0) {
				
				var newNode = this.childs[0].insert(
					atlasWidth, atlasHeight,
					width, height, data);
				
				if (newNode != null) {
					
					return newNode;
					
				}
				
				return this.childs[1].insert(atlasWidth, atlasHeight, width, height, data);
				
			} else {
				
				if (this.data != null) {
					
					return null;
					
				}
				
				var rect = this.rect;
				var w = Math.min(rect.width, atlasWidth - rect.x);
				
				if (width > rect.width ||
					width > atlasWidth - rect.x ||
					height > rect.height ||
					height > atlasHeight - rect.y)
				{
					
					return null;
					
				}
				
				if (width == rect.width && height == rect.height) {
					
					this.data = data;
					return this;
					
				}
				
				this.childs[this.childs.length] = new AtlasNode;
				this.childs[this.childs.length] = new AtlasNode;
				
				var dw = rect.width - width;
				var dh = rect.height - height;
				
				if (dw > dh) {
					
					this.childs[0].rect.__setTo(rect.x, rect.y, width, rect.height);
					this.childs[1].rect.__setTo(rect.x + width, rect.y, rect.width - width, rect.height);
					
				} else {
					
					this.childs[0].rect.__setTo(rect.x, rect.y, rect.width, height);
					this.childs[1].rect.__setTo(rect.x, rect.y + height, rect.width, rect.height - height);
					
				}
				
				return this.childs[0].insert(atlasWidth, atlasHeight, width, height, data);
				
			}
		}
	}
}