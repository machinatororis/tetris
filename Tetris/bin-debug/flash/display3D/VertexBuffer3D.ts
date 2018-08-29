/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />

namespace flash.display3D
{
	export import ByteArray = flash.utils.ByteArray;
	
	
	/**
	 * The VertexBuffer3D class represents a set of vertex data uploaded to a rendering context.
	 * Use a VertexBuffer3D object to define the data associated with each point in a set of vertexes. 
	 * You can upload the vertex data either from a Vector array or a ByteArray. 
	 * (Once uploaded, the data in the original array is no longer referenced; 
	 * changing or discarding the source array does not change the vertex data.)
	 * 
	 * The data associated with each vertex is in an application-defined format and is used as the input for the vertex shader program. 
	 * Identify which values belong to which vertex program input using the Context3D setVertexBufferAt() function. 
	 * A vertex program can use up to eight inputs (also known as vertex attribute registers). 
	 * Each input can require between one and four 32-bit values. 
	 * For example, the [x,y,z] position coordinates of a vertex can be passed to a vertex program as a vector containing three 32 bit values. 
	 * The Context3DVertexBufferFormat class defines constants for the supported formats for shader inputs. 
	 * You can supply up to sixty-four 32-bit values (256 bytes) of data for each point 
	 * (but a single vertex shader cannot use all of the data in this case).
	 * 
	 * The setVertexBufferAt() function also identifies which vertex buffer to use for rendering any subsequent drawTriangles() calls. 
	 * To render data from a different vertex buffer, call setVertexBufferAt() again with the appropriate arguments. 
	 * (You can store data for the same point in multiple vertex buffers, say position data in one buffer and texture coordinates in another, 
	 * but typically rendering is more efficient if all the data for a point comes from a single buffer.)
	 * 
	 * The Index3DBuffer object passed to the Context3D drawTriangles() method organizes the vertex data into triangles.
	 *  Each value in the index buffer is the index to a vertex in the vertex buffer. A set of three indexes, in sequence, defines a triangle.
	 * 
	 * You cannot create a VertexBuffer3D object directly. Use the Context3D createVertexBuffer() method instead.
	 * 
	 * To free the render context resources associated with a vertex buffer, call the object's dispose() method. 
	 * @author pkulikov
	 * 
	 */	
	export  class VertexBuffer3D
	{
		private __context:Context3D = null;
		private __gl:WebGLRenderingContext = null;
		private __data:number[] = undefined;
		private __id:WebGLBuffer = null;
		private __numVertices:number = 0;
		private __stride:number = 0;
		private __usage:number = 0;
		private __vertexSize:number = 0;
		
		/**
		 * Constructor 
		 * 
		 */		
		constructor(context3D:Context3D, numVertices:number, dataPerVertex:number, bufferUsage:string)
		{
			/**/ context3D = strict(context3D, Context3D); numVertices = ((numVertices) >> 0); dataPerVertex = ((dataPerVertex) >> 0); bufferUsage = as(bufferUsage, 'String');
			this.__gl =strict( (this.__context = context3D).__gl, WebGLRenderingContext);
			this.__numVertices = numVertices;
			this.__vertexSize = dataPerVertex;
			
			this.__id = this.__gl.createBuffer ();
			
			this.__stride =(( this.__vertexSize * 4) >> 0);
			
			this.__usage =(( (bufferUsage == Context3DBufferUsage.DYNAMIC_DRAW) ? this.__gl.DYNAMIC_DRAW : this.__gl.STATIC_DRAW) >> 0);
		}
		
		/**
		 * Frees all resources associated with this object. 
		 * 
		 */		
		public dispose() : void
		{
			this.__gl.deleteBuffer (this.__id);
		}
		
		/**
		 * Uploads the data for a set of points to the rendering context from a vector array. 
		 * @param data
		 * @param startVertex
		 * @param numVertices
		 * 
		 */		
		public uploadFromVector(data:number[], startVertex:number, numVertices:number) : void
		{
			/**/ startVertex = ((startVertex) >> 0); numVertices = ((numVertices) >> 0);
			if (data == null) return;
			
			// TODO: Optimize more
			
			var start = startVertex * this.__vertexSize;
			var count = numVertices * this.__vertexSize;
			var length = start + count;
			
			var buffer = new Float32Array (count);
			
			for (var i = start; i < length; ++i) {
				
				buffer[i - start] = data[i];
				
			}
			
			this.uploadFromTypedArray (buffer);
		}
		
		/**
		 * Uploads the data for a set of points to the rendering context from a byte array. 
		 * @param data
		 * @param byteArrayOffset
		 * @param startVertex
		 * @param numVertices
		 * 
		 */		
		public uploadFromByteArray(data:ByteArray, byteArrayOffset:number, startVertex:number, numVertices:number) : void
		{
			/**/ data = strict(data, ByteArray); byteArrayOffset = ((byteArrayOffset) >> 0); startVertex = ((startVertex) >> 0); numVertices = ((numVertices) >> 0);
			var offset = byteArrayOffset + startVertex * this.__stride;
			var length = numVertices * this.__vertexSize;
			
			this.uploadFromTypedArray (new Float32Array (data.buffer, offset, length));
		}
		
		public uploadFromTypedArray (data/*:ArrayBufferView*/):void {
			
			if (data == null) return;
			
			this.__gl.bindBuffer (this.__gl.ARRAY_BUFFER, this.__id);
			
			this.__gl.bufferData (this.__gl.ARRAY_BUFFER, data, this.__usage);
			
		}
	}

}