/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../display3D/IndexBuffer3D.ts" />
/// <reference path="../../../display3D/Context3D.ts" />

namespace flash.__native.renderer.webgl 
{
	
	export import Context3D = flash.display3D.Context3D;
	export import IndexBuffer3D = flash.display3D.IndexBuffer3D;
	
	
	/**
	 * 
	 * @author pkulikov
	 * 
	 */	
	export  class GLIndexBufferSet
	{
		public data:Uint16Array = null;
		public dirty:boolean = false;
		
		private _buff:IndexBuffer3D = null;
		
		/**
		 * Constructor 
		 * @param data
		 * 
		 */		
		constructor(data:Uint16Array)
		{
			/**/ data = strict(data, Uint16Array);
			this.data = data;
			this.dirty = true;
		}
		
		/*[internal]*/ public getBuff(ctx:Context3D):IndexBuffer3D
		{
			// ctx = strict(ctx, Context3D);
			if (this._buff == null) {
				this._buff = ctx.createIndexBuffer(this.data.length);
			}
			
			if (this.dirty) {
				this._buff.uploadFromTypedArray(this.data);
				this.dirty = false;
			}
			
			return this._buff;
		}
	}

}