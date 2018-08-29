/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../display3D/VertexBuffer3D.ts" />
/// <reference path="../../../display3D/Context3D.ts" />

namespace flash.__native.renderer.webgl 
{
	
	export import Context3D = flash.display3D.Context3D;
	export import VertexBuffer3D = flash.display3D.VertexBuffer3D;
	
	
	/**
	 * 
	 * @author pkulikov
	 * 
	 */	
	export  class GLVertexBufferSet 
	{
		public data:any = null;
		public data32PerVertex:number = 0;
		public dirty:boolean = false;
		
		private _buff:VertexBuffer3D = null;
		
		/**
		 * Constructor 
		 * @param data
		 * @param data32PerVertex
		 * 
		 */		
		constructor(data:any, data32PerVertex:number)
		{
			/**/ data32PerVertex = ((data32PerVertex) >> 0);
			this.data32PerVertex = data32PerVertex;
			this.data = data;
			this.dirty = true;
		}
		
		/*[internal]*/ public getBuff(ctx:Context3D):VertexBuffer3D
		{
			// ctx = strict(ctx, Context3D);
			if (this._buff == null) {
				this._buff = ctx.createVertexBuffer(this.data.length / this.data32PerVertex, this.data32PerVertex);
			}
			
			if (this.dirty) {
				this._buff.uploadFromTypedArray(this.data);
				this.dirty = false;
			}
			
			return this._buff;
		}
	}

}