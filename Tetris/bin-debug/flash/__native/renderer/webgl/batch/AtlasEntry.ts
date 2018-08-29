/// <reference path="../../../../../base.d.ts" />

namespace flash.__native.renderer.webgl.batch
{
	
	export  class AtlasEntry
	{
		public node:AtlasNode = null;
		public atlas:GLBatchAtlas = null;
		public regions:any[] = null;
		public image:any = null;
		public width:number = 0;
		public height:number = 0;
		public used:boolean = false;
		public version:number = 0;
		
		/**
		 * Constructor 
		 * @param atlas
		 * @param image
		 * 
		 */		
		constructor(atlas:GLBatchAtlas, image:any)
		{
			/**/ atlas = strict(atlas, GLBatchAtlas);
			this.atlas = atlas;
			this.image = image;
			this.width =(( image.width) >> 0);
			this.height =(( image.height) >> 0);
			this.regions = [];
			this.used = true;
			this.version = -1;
		}
	}
}