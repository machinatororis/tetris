/// <reference path="../../../../../base.d.ts" />

namespace flash.__native.renderer.webgl.batch
{
	
	export  class AtlasTree
	{
		public root:AtlasNode = null;
		public list:AtlasEntry[] = new Array;
		public hash:any = {};
		public parent:GLBatchAtlas = null;
		
		/**
		 * Constructor 
		 * 
		 */		
		constructor ()
		{
			
		}
		
		public apply ():void
		{
			if (!this.parent) {
				
				return;
				
			}
			
			this.parent.__applyAtlasTree(this);
		}
	}
}