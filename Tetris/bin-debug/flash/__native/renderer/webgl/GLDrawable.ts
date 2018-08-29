/// <reference path="../../../../base.d.ts" />

namespace flash.__native.renderer.webgl 
{
	
	/**
	 * 
	 * @author pkulikov
	 * 
	 */	
	export  class GLDrawable 
	{
		public pos:GLVertexBufferSet = null;
		public uv:GLVertexBufferSet = null;
		public index:GLIndexBufferSet = null;
		public numTriangles:number = -1;
		
		private _usage:number = NaN;
		
		/**
		 * Constructor 
		 * @param posData
		 * @param uvData
		 * @param iData
		 * @param usage
		 * 
		 */		
		constructor(posData:Float32Array, uvData:Float32Array, iData:Uint16Array, usage:number) 
		{
			/**/ posData = strict(posData, Float32Array); uvData = strict(uvData, Float32Array); iData = strict(iData, Uint16Array); usage = (+(usage));
			this.pos = new GLVertexBufferSet(posData, 2); // xy * 4
			this.uv = new GLVertexBufferSet(uvData, 2); // xy * 4
			this.index = new GLIndexBufferSet(iData); // ij * 3
			this._usage = usage;
		}
	}
}