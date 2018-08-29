/// <reference path="../../../../base.d.ts" />

namespace flash.__native.renderer.webgl
{
	
	export  class SamplerState
	{
		public centroid:boolean = false;
		public ignoreSampler:boolean = false;
		public mipmapGenerated:boolean = false;
		
		private __lodBias:number = NaN;
		private __magFilter:number = 0;
		private __maxAniso:number = NaN;
		private __minFilter:number = 0;
		private __wrapModeS:number = 0;
		private __wrapModeT:number = 0;
		private __samplerDirty:boolean = false;
		
		constructor(minFilter:number, magFilter:number, wrapModeS:number, wrapModeT:number, lodBias:number = 0.0, maxAniso:number = 0.0, ignoreSampler:boolean = false, centroid:boolean = false, mipmapGenerated:boolean = false)
		{
			/**/ minFilter = ((minFilter) >> 0); magFilter = ((magFilter) >> 0); wrapModeS = ((wrapModeS) >> 0); wrapModeT = ((wrapModeT) >> 0); lodBias = (+(lodBias)); maxAniso = (+(maxAniso)); ignoreSampler = Boolean(ignoreSampler); centroid = Boolean(centroid); mipmapGenerated = Boolean(mipmapGenerated);
			this.minFilter = minFilter;
			this.magFilter = magFilter;
			this.wrapModeS = wrapModeS;
			this.wrapModeT = wrapModeT;
			this.lodBias = lodBias;
			this.maxAniso = maxAniso;
			this.ignoreSampler = ignoreSampler;
			this.centroid = centroid;
			this.mipmapGenerated = mipmapGenerated;
			
			this.__samplerDirty = true;
		}
		
		/*[internal]*/ public copyFrom (other:SamplerState):void {
			
			// other = strict(other, SamplerState);
			
			if (other == null || other.ignoreSampler) {
				
				return;
				
			}
			
			this.minFilter = other.__minFilter;
			this.magFilter = other.__magFilter;
			this.wrapModeS = other.__wrapModeS;
			this.wrapModeT = other.__wrapModeT;
			this.lodBias = other.__lodBias;
			this.maxAniso = other.__maxAniso;
			this.centroid = other.centroid;
			this.mipmapGenerated = other.mipmapGenerated;
			
		}
		
		
		/*[internal]*/ public equals (other:SamplerState):boolean {
			
			// other = strict(other, SamplerState);
			
			if (this == other) {
				
				return !this.__samplerDirty;
				
			}
			
			if (other == null) {
				
				return false;
				
			}
			
			return (this.__minFilter == other.__minFilter && this.__magFilter == other.__magFilter && this.__wrapModeS == other.__wrapModeS && this.__wrapModeT == other.__wrapModeT && this.__lodBias == other.__lodBias && this.__maxAniso == other.__maxAniso && this.mipmapGenerated == other.mipmapGenerated);
			
		}
		
		
		
		
		// Get & Set Methods
		
		
		
		public get lodBias ():number { return this.__lodBias; }
		public set lodBias (value:number) {
			
			/**/ value = (+(value));
			
			if (this.__lodBias != value) this.__samplerDirty = true;
			this.__lodBias = value;
			
		}
		
		public get magFilter ():number { return this.__magFilter; }
		public set magFilter (value:number) {
			
			/**/ value = ((value) >> 0);
			
			if (this.__magFilter != value) this.__samplerDirty = true;
			this.__magFilter = value;
			
		}
		
		public get maxAniso ():number { return this.__maxAniso; }
		public set maxAniso (value:number) {
			
			/**/ value = (+(value));
			
			if (this.__maxAniso != value) this.__samplerDirty = true;
			this.__maxAniso = value;
			
		}
		
		public get minFilter ():number { return this.__minFilter; }
		public set minFilter (value:number) {
			
			/**/ value = ((value) >> 0);
			
			if (this.__minFilter != value) this.__samplerDirty = true;
			this.__minFilter = value;
			
		}
		
		public get wrapModeS ():number { return this.__wrapModeS; }
		public set wrapModeS (value:number) {
			
			/**/ value = ((value) >> 0);
			
			if (this.__wrapModeS != value) this.__samplerDirty = true;
			this.__wrapModeS = value;
			
		}
		
		public get wrapModeT ():number { return this.__wrapModeT; }
		public set wrapModeT (value:number) {
			
			/**/ value = ((value) >> 0);
			
			if (this.__wrapModeT != value) this.__samplerDirty = true;
			this.__wrapModeT = value;
			
		}
	}
}