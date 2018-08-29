/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />

namespace flash.display3D
{
	export import ByteArray = flash.utils.ByteArray;
	
	
	/**
	 * IndexBuffer3D is used to represent lists of vertex indices comprising graphic elements retained by the graphics subsystem.
	 * Indices managed by an IndexBuffer3D object may be used to select vertices from a vertex stream. 
	 * Indices are 16-bit unsigned integers. The maximum allowable index value is 65535 (0xffff). 
	 * The graphics subsystem does not retain a reference to vertices provided to this object. 
	 * Data uploaded to this object may be modified or discarded without affecting the stored values.
	 * 
	 * IndexBuffer3D cannot be instantiated directly. Create instances by using Context3D::CreateIndexBuffer() 
	 * @author pkulikov
	 * 
	 */	
	export  class IndexBuffer3D
	{
		private __context:Context3D = null;
		private __gl:WebGLRenderingContext = null;
		private __elementType:number = 0;
		private __id:WebGLBuffer = null;
		private __numIndices:number = 0;
		private __usage:number = 0;
		
		/**
		 * Constructor 
		 * 
		 */		
		constructor(context3D:Context3D, numIndices:number, bufferUsage:string)
		{
			/**/ context3D = strict(context3D, Context3D); numIndices = ((numIndices) >> 0); bufferUsage = as(bufferUsage, 'String');
			this.__gl =strict( (this.__context = context3D).__gl, WebGLRenderingContext);
			this.__numIndices = numIndices;
			this.__elementType =(( this.__gl.UNSIGNED_SHORT) >> 0);
			
			this.__id = this.__gl.createBuffer ();
			
			this.__usage =(( (bufferUsage == Context3DBufferUsage.DYNAMIC_DRAW) ? this.__gl.DYNAMIC_DRAW : this.__gl.STATIC_DRAW) >> 0);
		}
		
		/**
		 * Free all native GPU resources associated with this object. 
		 * 
		 */		
		public dispose() : void
		{
			this.__gl.deleteBuffer (this.__id);
		}
		
		/**
		 * Store in the graphics subsystem vertex indices. 
		 * @param data
		 * @param startOffset
		 * @param count
		 * 
		 */		
		public uploadFromVector(data:number[], startOffset:number, count:number) : void
		{
			/**/ startOffset = ((startOffset) >> 0); count = ((count) >> 0);
			// TODO: Optimize more
			
			var length = startOffset + count;
			
			var buffer = new Int16Array (count);
			
			for (var i = startOffset; i < length; ++i) {
				
				buffer[i - startOffset] = data[i];
				
			}
			
			this.uploadFromTypedArray (buffer);
		}
		
		/**
		 * Store in the graphics subsystem vertex indices. 
		 * @param data
		 * @param byteArrayOffset
		 * @param startOffset
		 * @param count
		 * 
		 */		
		public uploadFromByteArray(data:ByteArray, byteArrayOffset:number, startOffset:number, count:number) : void
		{
			/**/ data = strict(data, ByteArray); byteArrayOffset = ((byteArrayOffset) >> 0); startOffset = ((startOffset) >> 0); count = ((count) >> 0);
			var offset = byteArrayOffset + startOffset * 2;
			
			this.uploadFromTypedArray (new Int16Array (data.buffer, offset, count));
		}
		
		public uploadFromTypedArray (data/*:ArrayBufferView*/):void {
			
			if (data == null) return;
			
			this.__gl.bindBuffer (this.__gl.ELEMENT_ARRAY_BUFFER, this.__id);
			
			this.__gl.bufferData (this.__gl.ELEMENT_ARRAY_BUFFER, data, this.__usage);
			
		}
		
	}

}