/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../system/Capabilities.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../geom/Matrix3D.ts" />
/// <reference path="../events/EventDispatcher.ts" />
/// <reference path="../errors/IllegalOperationError.ts" />
/// <reference path="textures/VideoTexture.ts" />
/// <reference path="textures/TextureBase.ts" />
/// <reference path="textures/Texture.ts" />
/// <reference path="textures/RectangleTexture.ts" />
/// <reference path="textures/CubeTexture.ts" />
/// <reference path="../display/Stage3D.ts" />
/// <reference path="../display/BitmapData.ts" />
/// <reference path="../__native/utils/getNextPowerOfTwo.ts" />
/// <reference path="../__native/renderer/webgl/SamplerState.ts" />
/// <reference path="../__native/renderer/webgl/Context3DStateCache.ts" />

namespace flash.display3D
{
	export import Context3DStateCache = flash.__native.renderer.webgl.Context3DStateCache;
	export import SamplerState = flash.__native.renderer.webgl.SamplerState;
	export import getNextPowerOfTwo = flash.__native.utils.getNextPowerOfTwo;
	export import BitmapData = flash.display.BitmapData;
	export import Stage3D = flash.display.Stage3D;
	export import CubeTexture = flash.display3D.textures.CubeTexture;
	export import RectangleTexture = flash.display3D.textures.RectangleTexture;
	export import Texture = flash.display3D.textures.Texture;
	export import TextureBase = flash.display3D.textures.TextureBase;
	export import VideoTexture = flash.display3D.textures.VideoTexture;
	export import IllegalOperationError = flash.errors.IllegalOperationError;
	export import EventDispatcher = flash.events.EventDispatcher;
	export import Matrix3D = flash.geom.Matrix3D;
	export import Rectangle = flash.geom.Rectangle;
	export import Capabilities = flash.system.Capabilities;
	export import ByteArray = flash.utils.ByteArray;
	

	/**
	 * The Context3D class provides a context for rendering geometrically defined graphics.
	 * A rendering context includes a drawing surface and its associated resources and state. 
	 * When possible, the rendering context uses the hardware graphics processing unit (GPU). Otherwise, the rendering context uses software.
	 * (If rendering through Context3D is not supported on a platform, the stage3Ds property of the Stage object contains an empty list.)
	 * 
	 * The Context3D rendering context is a programmable pipeline that is very similar to OpenGL ES 2, 
	 * but is abstracted so that it is compatible with a range of hardware and GPU interfaces. 
	 * Although designed for 3D graphics, the rendering pipeline does not mandate that the rendering is three dimensional. 
	 * Thus, you can create a 2D renderer by supplying the appropriate vertex and pixel fragment programs. 
	 * In both the 3D and 2D cases, the only geometric primitive supported is the triangle.
	 * 
	 * Get an instance of the Context3D class by calling the requestContext3D() method of a Stage3D object. 
	 * A limited number of Context3D objects can exist per stage; one for each Stage3D in the Stage.stage3Ds list. 
	 * When the context is created, the Stage3D object dispatches a context3DCreate event. 
	 * A rendering context can be destroyed and recreated at any time, such as when another application that uses the GPU gains focus. 
	 * Your code should anticipate receiving multiple context3DCreate events. 
	 * Position the rendering area on the stage using the x and y properties of the associated Stage3D instance.
	 * 
	 * To render and display a scene (after getting a Context3D object), the following steps are typical:
	 * 
	 * Configure the main display buffer attributes by calling configureBackBuffer().
	 * Create and initialize your rendering resources, including:
	 * Vertex and index buffers defining the scene geometry
	 * Vertex and pixel programs (shaders) for rendering the scene
	 * Textures
	 * Render a frame:
	 * Set the render state as appropriate for an object or collection of objects in the scene.
	 * Call the drawTriangles() method to render a set of triangles.
	 * Change the rendering state for the next group of objects.
	 * Call drawTriangles() to draw the triangles defining the objects.
	 * Repeat until the scene is entirely rendered.
	 * Call the present() method to display the rendered scene on the stage.
	 * The following limits apply to rendering:
	 * 
	 * Resource limits:
	 * 
	 * Resource	Number allowed	Total memory
	 * Vertex buffers	4096	256 MB
	 * Index buffers	4096	128 MB
	 * Programs	4096	16 MB
	 * Textures	4096	128 MB
	 * Cube textures	4096	256 MB
	 * AGAL limits: 200 opcodes per program.
	 * 
	 * Draw call limits: 32,768 drawTriangles() calls for each present() call.
	 * 
	 * The following limits apply to textures:
	 * 
	 * Texture limits:
	 * 
	 * Texture	Maximum size	Total GPU memory
	 * Normal Texture (below Baseline extended)	2048x2048	512 MB
	 * Normal Texture (Baseline extended and above)	4096x4096	512 MB
	 * Rectangular Texture (below Baseline extended)	2048x2048	512 MB
	 * Rectangular Texture (Baseline extended and above)	4096x4096	512 MB
	 * Cube Texture	1024x1024	256 MB
	 * 512 MB is the absolute limit for textures, including the texture memory required for mipmaps. 
	 * However, for Cube Textures, the memory limit is 256 MB.
	 * 
	 * You cannot create Context3D objects with the Context3D constructor. 
	 * It is constructed and available as a property of a Stage3D instance. 
	 * The Context3D class can be used on both desktop and mobile platforms, both when running in Flash Player and AIR.
	 * 
	 * @author pkulikov
	 * 
	 */	
	export  class Context3D extends EventDispatcher
	{
		/**
		 * Helpers 
		 */		
		protected static sHelperRect:Rectangle = asc.sti(Context3D,()=>{ Context3D.sHelperRect = new Rectangle; });
		
		/**
		 * Limits 
		 */		
		public static MAX_SAMPLERS:number = 8;
		public static MAX_ATTRIBUTES:number = 16;
		public static MAX_PROGRAM_REGISTERS:number = 128;
		
		/**
		 * Other
		 */		
		public static TEXTURE_MAX_ANISOTROPY_EXT:number = 0;
		public static DEPTH_STENCIL:number = 0;
		
		/**
		 * State cache 
		 */		
		private static __stateCache:Context3DStateCache = asc.sti(Context3D,()=>{ Context3D.__stateCache = new Context3DStateCache (); });
		
		/**
		 * Specifies whether errors encountered by the renderer are reported to the application. 
		 * @return 
		 * 
		 */		
		public enableErrorChecking:boolean;
		
		/**
		 * Specifies the maximum width of the back buffer. 
		 * @return 
		 * 
		 */
		public maxBackBufferWidth:number;
		
		/**
		 * Specifies the maximum height of the back buffer. 
		 * @return 
		 * 
		 */
		public maxBackBufferHeight:number;
		
		/**
		 * Specifies the maximum width of the texture. 
		 * @return 
		 * 
		 */
		public maxTextureWidth:number;
		
		/**
		 * Specifies the maximum height of the texture. 
		 * @return 
		 * 
		 */
		public maxTextureHeight:number;
		
		/**
		 * Returns the total GPU memory allocated by Stage3D data structures of an application. 
		 * Whenever a GPU resource object is created, memory utilized is stored in Context3D. 
		 * @return 
		 * 
		 */
		public totalGPUMemory:number;
		
		private __backBufferWidth:number;
		private __backBufferHeight:number;
		private __driverInfo:string;
		private __profile:string;
		
		private __backBufferAntiAlias:number;
		private __backBufferEnableDepthAndStencil:boolean;
		private __backBufferWantsBestResolution:boolean;
		private __depthRenderBuffer:WebGLRenderbuffer;
		private __depthStencilRenderBuffer:WebGLRenderbuffer;
		private __fragmentConstants:any; // Float32Array || Array
		private __vertexConstants:any; // Float32Array || Array
		private __framebuffer:WebGLFramebuffer;
		private __maxAnisotropyCubeTexture:number;
		private __maxAnisotropyTexture2D:number;
		private __positionScale:Float32Array;
		private __program:Program3D;
		private __renderToTexture:TextureBase;
		private __enableDepthAndStencil:boolean;
		private __rttDepthAndStencil:boolean;
		private __samplerDirty:number;
		private __samplerTextures:TextureBase[];
		private __samplerStates:SamplerState[];
		private __scissorRectangle:Rectangle;
		private __stage3D:Stage3D;
		private __canvas:HTMLCanvasElement;
		private __gl:WebGLRenderingContext;
		private __stencilCompareMode:string;
		private __stencilRef:number;
		private __stencilReadMask:number;
		private __stencilRenderBuffer:WebGLRenderbuffer;
		private __supportsAnisotropicFiltering:boolean;
		private __supportsPackedDepthStencil:boolean;
		private __pixels:Uint8Array;
		private __optimizeUniforms:boolean;
		private __poolFloat32Array:any;
		
		private glMax:number;
		private glMin:number;
		
		/**
		 * Constructor
		 */		
		constructor(canvas:HTMLCanvasElement, params:any = null, stage3D:Stage3D = null)
		{
			/**/ canvas = strict(canvas, HTMLCanvasElement); stage3D = strict(stage3D, Stage3D);
			/**/ this.enableErrorChecking === void 0 && (this.enableErrorChecking = false);
			/**/ this.maxBackBufferWidth === void 0 && (this.maxBackBufferWidth = 0);
			/**/ this.maxBackBufferHeight === void 0 && (this.maxBackBufferHeight = 0);
			/**/ this.maxTextureWidth === void 0 && (this.maxTextureWidth = 0);
			/**/ this.maxTextureHeight === void 0 && (this.maxTextureHeight = 0);
			/**/ this.totalGPUMemory === void 0 && (this.totalGPUMemory = 0);
			/**/ this.__backBufferWidth === void 0 && (this.__backBufferWidth = 0);
			/**/ this.__backBufferHeight === void 0 && (this.__backBufferHeight = 0);
			/**/ this.__driverInfo === void 0 && (this.__driverInfo = 'OpenGL (Direct blitting)');
			/**/ this.__profile === void 0 && (this.__profile = Context3DProfile.BASELINE);
			/**/ this.__backBufferAntiAlias === void 0 && (this.__backBufferAntiAlias = 0);
			/**/ this.__backBufferEnableDepthAndStencil === void 0 && (this.__backBufferEnableDepthAndStencil = false);
			/**/ this.__backBufferWantsBestResolution === void 0 && (this.__backBufferWantsBestResolution = false);
			/**/ this.__depthRenderBuffer === void 0 && (this.__depthRenderBuffer = null);
			/**/ this.__depthStencilRenderBuffer === void 0 && (this.__depthStencilRenderBuffer = null);
			/**/ this.__fragmentConstants === void 0 && (this.__fragmentConstants = null);
			/**/ this.__vertexConstants === void 0 && (this.__vertexConstants = null);
			/**/ this.__framebuffer === void 0 && (this.__framebuffer = null);
			/**/ this.__maxAnisotropyCubeTexture === void 0 && (this.__maxAnisotropyCubeTexture = 0);
			/**/ this.__maxAnisotropyTexture2D === void 0 && (this.__maxAnisotropyTexture2D = 0);
			/**/ this.__positionScale === void 0 && (this.__positionScale = null);
			/**/ this.__program === void 0 && (this.__program = null);
			/**/ this.__renderToTexture === void 0 && (this.__renderToTexture = null);
			/**/ this.__enableDepthAndStencil === void 0 && (this.__enableDepthAndStencil = false);
			/**/ this.__rttDepthAndStencil === void 0 && (this.__rttDepthAndStencil = false);
			/**/ this.__samplerDirty === void 0 && (this.__samplerDirty = 0);
			/**/ this.__samplerTextures === void 0 && (this.__samplerTextures = undefined);
			/**/ this.__samplerStates === void 0 && (this.__samplerStates = undefined);
			/**/ this.__scissorRectangle === void 0 && (this.__scissorRectangle = null);
			/**/ this.__stage3D === void 0 && (this.__stage3D = null);
			/**/ this.__canvas === void 0 && (this.__canvas = null);
			/**/ this.__gl === void 0 && (this.__gl = null);
			/**/ this.__stencilCompareMode === void 0 && (this.__stencilCompareMode = null);
			/**/ this.__stencilRef === void 0 && (this.__stencilRef = 0);
			/**/ this.__stencilReadMask === void 0 && (this.__stencilReadMask = 0);
			/**/ this.__stencilRenderBuffer === void 0 && (this.__stencilRenderBuffer = null);
			/**/ this.__supportsAnisotropicFiltering === void 0 && (this.__supportsAnisotropicFiltering = false);
			/**/ this.__supportsPackedDepthStencil === void 0 && (this.__supportsPackedDepthStencil = false);
			/**/ this.__pixels === void 0 && (this.__pixels = null);
			/**/ this.__optimizeUniforms === void 0 && (this.__optimizeUniforms = false);
			/**/ this.__poolFloat32Array === void 0 && (this.__poolFloat32Array = null);
			/**/ this.glMax === void 0 && (this.glMax = 0);
			/**/ this.glMin === void 0 && (this.glMin = 0);
			super ();
			
			this.__optimizeUniforms =Boolean( params.optimizeUniforms);
			
			this.__stage3D = stage3D;
			this.__createWebGLContext(canvas, params);

			if (this.__optimizeUniforms) {
				
				this.__poolFloat32Array = [];
				this.__vertexConstants = [];
				this.__fragmentConstants = [];
				
			} else {
				
				this.__vertexConstants = new Float32Array (4 * Context3D.MAX_PROGRAM_REGISTERS);
				this.__fragmentConstants = new Float32Array (4 * Context3D.MAX_PROGRAM_REGISTERS);
				
			}
			
			this.__positionScale = new Float32Array ([ 1.0, 1.0, 1.0, 1.0 ]);
			this.__samplerDirty = 0;
			this.__samplerTextures = new Array<TextureBase> (Context3D.MAX_SAMPLERS);
			this.__samplerStates = new Array;
			
			for (var i = 0; i < Context3D.MAX_SAMPLERS; ++i) {
				
				this.__samplerStates[i] = new SamplerState (this.__gl.LINEAR, this.__gl.LINEAR, this.__gl.CLAMP_TO_EDGE, this.__gl.CLAMP_TO_EDGE);
				
			}
			
			var dims = this.__gl.getParameter (this.__gl.MAX_VIEWPORT_DIMS);
			if (dims) {
				
				this.maxBackBufferWidth =(( dims[0]) >> 0);
				this.maxBackBufferHeight =(( dims[1]) >> 0);
				
			} else {
				
				this.maxBackBufferWidth =(( Capabilities.screenResolutionX) >> 0);
				this.maxBackBufferHeight =(( Capabilities.screenResolutionY) >> 0);
				
			}
			
			this.maxTextureWidth = this.maxTextureHeight =(( this.__gl.getParameter (this.__gl.MAX_TEXTURE_SIZE) || 2048) >> 0);
			
			this.__backBufferAntiAlias = 0;
			this.__backBufferEnableDepthAndStencil = true;
			this.__backBufferWantsBestResolution = false;
			
			this.__rttDepthAndStencil = false;
			this.__samplerDirty = 0;
			this.__stencilCompareMode = Context3DCompareMode.ALWAYS;
			this.__stencilRef = 0;
			this.__stencilReadMask = 0xFF;
			
			var anisoExtension = this.__gl.getExtension ("EXT_texture_filter_anisotropic");
			if (anisoExtension == null || !("MAX_TEXTURE_MAX_ANISOTROPY_EXT" in anisoExtension)) {
				
				anisoExtension = this.__gl.getExtension ("MOZ_EXT_texture_filter_anisotropic");
				
			}
			
			if (anisoExtension == null || !("MAX_TEXTURE_MAX_ANISOTROPY_EXT" in anisoExtension)) {
				
				anisoExtension = this.__gl.getExtension ("WEBKIT_EXT_texture_filter_anisotropic");
				
			}
			
			this.__supportsPackedDepthStencil = true;
			Context3D.DEPTH_STENCIL =(( this.__gl.DEPTH_STENCIL) >> 0);
			
			this.__supportsAnisotropicFiltering = (anisoExtension != null);
			
			if (this.__supportsAnisotropicFiltering) {
				
				Context3D.TEXTURE_MAX_ANISOTROPY_EXT =(( anisoExtension.TEXTURE_MAX_ANISOTROPY_EXT) >> 0);
				
				var maxAnisotropy:number =  ((this.__gl.getParameter (anisoExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)) >> 0);
				this.__maxAnisotropyTexture2D = maxAnisotropy;
				this.__maxAnisotropyTexture2D = maxAnisotropy;
				
			}
			
			var vendor = this.__gl.getParameter (this.__gl.VENDOR);
			var version = this.__gl.getParameter (this.__gl.VERSION);
			var renderer = this.__gl.getParameter (this.__gl.RENDERER);
			var glslVersion = this.__gl.getParameter (this.__gl.SHADING_LANGUAGE_VERSION);
			
			this.__driverInfo = "OpenGL" +
				" Vendor=" + vendor +
				" Version=" + version +
				" Renderer=" + renderer +
				" GLSL=" + glslVersion;
			
			Context3D.__stateCache.clearSettings ();
		}
		
		/**
		 * Specifies the width of the back buffer, which can be changed by a successful call to the configureBackBuffer() method. 
		 * @return 
		 * 
		 */		
		public get backBufferWidth ():number
		{
			return this.__backBufferWidth;
		}
		
		/**
		 * Specifies the height of the back buffer, which can be changed by a successful call to the configureBackBuffer() method. 
		 * @return 
		 * 
		 */
		public get backBufferHeight ():number
		{
			return this.__backBufferHeight;
		}
		
		/**
		 * Specifies the width of the render buffer, which can be changed by a successful call to the setRenderToTexture() method. 
		 * @return 
		 * 
		 */		
		public get renderBufferWidth ():number
		{
			var renderToTexture = this.__getRenderToTexture();
			return renderToTexture ? renderToTexture.__width : 0;
		}
		
		/**
		 * Specifies the height of the render buffer, which can be changed by a successful call to the setRenderToTexture() method. 
		 * @return 
		 * 
		 */
		public get renderBufferHeight ():number
		{
			var renderToTexture = this.__getRenderToTexture();
			return renderToTexture ? renderToTexture.__height : 0;
		}
		
		/**
		 * The type of graphics library driver used by this rendering context. 
		 * @return 
		 * 
		 */		
		public get driverInfo():string
		{
			return this.__driverInfo;
		}
		
		/**
		 * The feature-support profile in use by this Context3D object. 
		 * @return 
		 * 
		 */
		public get profile():string
		{
			return this.__profile;
		}
		
		/**
		 * Indicates if Context3D supports video texture. 
		 * @return 
		 * 
		 */		
		public static get supportsVideoTexture():boolean
		{
			return true;
		}
		
		/**
		 * Frees all resources and internal storage associated with this Context3D. 
		 * @param recreate
		 * 
		 */		
		public dispose(recreate:boolean = true):void
		{
			
		/**/ recreate = Boolean(recreate);
			
		}
		
		/**
		 * Sets the viewport dimensions and other attributes of the rendering buffer. 
		 * @param width
		 * @param height
		 * @param antiAlias
		 * @param enableDepthAndStencil
		 * @param wantsBestResolution
		 * 
		 */		
		public configureBackBuffer(width:number, height:number, antiAlias:number, enableDepthAndStencil:boolean = true, wantsBestResolution:boolean = false):void
		{
			/**/ width = ((width) >> 0); height = ((height) >> 0); antiAlias = ((antiAlias) >> 0); enableDepthAndStencil = Boolean(enableDepthAndStencil); wantsBestResolution = Boolean(wantsBestResolution);
			this.__configureBackBuffer(width, height, antiAlias, enableDepthAndStencil, wantsBestResolution);
		}
		
		/**
		 * Clears the color, depth, and stencil buffers associated with this Context3D object and fills them with the specified values. 
		 * @param red
		 * @param green
		 * @param blue
		 * @param alpha
		 * @param depth
		 * @param stencil
		 * @param mask
		 * 
		 */		
		public clear(red:number = 0, green:number = 0, blue:number = 0, alpha:number = 1, depth:number = 1, stencil:number = 0, mask:number = 4294967295):void
		{
			/**/ red = (+(red)); green = (+(green)); blue = (+(blue)); alpha = (+(alpha)); depth = (+(depth)); stencil = ((stencil) >>> 0); mask = ((mask) >>> 0);
			this.__clear(red, green, blue, alpha, depth, stencil, mask);
		}
		
		/**
		 * Render the specified triangles using the current buffers and state of this Context3D object. 
		 * @param indexBuffer
		 * @param firstIndex
		 * @param numTriangles
		 * 
		 */		
		public drawTriangles(indexBuffer:IndexBuffer3D, firstIndex:number = 0, numTriangles:number = -1):void
		{
			/**/ indexBuffer = strict(indexBuffer, IndexBuffer3D); firstIndex = ((firstIndex) >> 0); numTriangles = ((numTriangles) >> 0);
			this.__drawTriangles(indexBuffer, firstIndex, numTriangles);
			
		}
		
		/**
		 * Displays the back rendering buffer. 
		 * 
		 */		
		public present():void
		{
			
		}
		
		/**
		 * Sets vertex and fragment shader programs to use for subsequent rendering. 
		 * @param program
		 * 
		 */		
		public setProgram(program:Program3D):void
		{
			/**/ program = strict(program, Program3D);
			this.__setProgram(program);
		}
		
		/**
		 * Sets the constant inputs for the shader programs. 
		 * @param programType
		 * @param firstRegister
		 * @param data
		 * @param numRegisters
		 * 
		 */		
		public setProgramConstantsFromVector(programType:string, firstRegister:number, data:number[], numRegisters:number = -1):void
		{
			/**/ programType = as(programType, 'String'); firstRegister = ((firstRegister) >> 0); numRegisters = ((numRegisters) >> 0);
			this.__setProgramConstantsFromVector(programType, firstRegister, data, numRegisters);
		}
		
		/**
		 * Sets constants for use by shader programs using values stored in a Matrix3D. 
		 * @param programType
		 * @param firstRegister
		 * @param matrix
		 * @param transposedMatrix
		 * 
		 */		
		public setProgramConstantsFromMatrix(programType:string, firstRegister:number, matrix:Matrix3D, transposedMatrix:boolean = false):void
		{
			/**/ programType = as(programType, 'String'); firstRegister = ((firstRegister) >> 0); matrix = strict(matrix, Matrix3D); transposedMatrix = Boolean(transposedMatrix);
			this.__setProgramConstantsFromMatrix(programType, firstRegister, matrix, transposedMatrix);
		}
		
		/**
		 * Set constants for use by shader programs using values stored in a ByteArray. 
		 * @param programType
		 * @param firstRegister
		 * @param numRegisters
		 * @param data
		 * @param byteArrayOffset
		 * 
		 */		
		public setProgramConstantsFromByteArray(programType:string, firstRegister:number, numRegisters:number, data:ByteArray, byteArrayOffset:number):void
		{
			/**/ programType = as(programType, 'String'); firstRegister = ((firstRegister) >> 0); numRegisters = ((numRegisters) >> 0); data = strict(data, ByteArray); byteArrayOffset = ((byteArrayOffset) >>> 0);
			if (numRegisters == 0) return;
			
			if (numRegisters == -1) {
				
				numRegisters =(( ((data.length >> 2) - byteArrayOffset)) >> 0);
				
			}
			
			var isVertex = (programType == Context3DProgramType.VERTEX);
			var dest = isVertex ? this.__vertexConstants : this.__fragmentConstants;
			
			var floatData = new Float32Array (data.buffer);
			var outOffset = firstRegister * 4;
			var inOffset = ((byteArrayOffset / 4) >> 0);
			
			for (var i = 0, len = numRegisters * 4; i < len; ++i) {
				
				dest[outOffset + i] = floatData[inOffset + i];
				
			}
			
			if (this.__program != null) {
				
				this.__program.__markDirty (isVertex, firstRegister, numRegisters);
				
			}
		}
		
		/**
		 * Specifies which vertex data components correspond to a single vertex shader program input. 
		 * @param index
		 * @param buffer
		 * @param bufferOffset
		 * @param format
		 * 
		 */		
		public setVertexBufferAt(index:number, buffer:VertexBuffer3D, bufferOffset:number = 0, format:string = "float4"):void
		{
			/**/ index = ((index) >> 0); buffer = strict(buffer, VertexBuffer3D); bufferOffset = ((bufferOffset) >> 0); format = as(format, 'String');
			this.__setVertexBufferAt(index, buffer, bufferOffset, format);
		}
		
		/**
		 * Specifies the factors used to blend the output color of a drawing operation with the existing color. 
		 * @param sourceFactor
		 * @param destinationFactor
		 * 
		 */		
		public setBlendFactors(sourceFactor:string, destinationFactor:string, equation:string = 'add'):void
		{
			/**/ sourceFactor = as(sourceFactor, 'String'); destinationFactor = as(destinationFactor, 'String'); equation = as(equation, 'String');
			this.__setBlendFactorsSeparate(sourceFactor, destinationFactor, equation, null, null, null);
		}
		
		public setBlendFactorsSeparate(sourceFactorRGB:string, destinationFactorRGB:string, equationRGB:string, sourceFactorAlpha: string, destinationFactorAlpha: string, equationAlpha:string):void
		{
			/**/ sourceFactorRGB = as(sourceFactorRGB, 'String'); destinationFactorRGB = as(destinationFactorRGB, 'String'); equationRGB = as(equationRGB, 'String'); sourceFactorAlpha = as(sourceFactorAlpha, 'String'); destinationFactorAlpha = as(destinationFactorAlpha, 'String'); equationAlpha = as(equationAlpha, 'String');
			this.__setBlendFactorsSeparate(sourceFactorRGB, destinationFactorRGB, equationRGB, sourceFactorAlpha, destinationFactorAlpha, equationAlpha);
		}
		
		/**
		 * Sets the mask used when writing colors to the render buffer. 
		 * @param red
		 * @param green
		 * @param blue
		 * @param alpha
		 * 
		 */		
		public setColorMask(red:boolean, green:boolean, blue:boolean, alpha:boolean):void
		{
			/**/ red = Boolean(red); green = Boolean(green); blue = Boolean(blue); alpha = Boolean(alpha);
			this.__gl.colorMask (red, green, blue, alpha);
		}
		
		/**
		 * Sets type of comparison used for depth testing. 
		 * @param depthMask
		 * @param passCompareMode
		 * 
		 */		
		public setDepthTest(depthMask:boolean, passCompareMode:string):void
		{
			/**/ depthMask = Boolean(depthMask); passCompareMode = as(passCompareMode, 'String');
			var depthTestEnabled = this.__backBufferEnableDepthAndStencil;
			
			if (Context3D.__stateCache.updateDepthTestEnabled (depthTestEnabled)) {
				
				if (depthTestEnabled) {
					
					this.__gl.enable (this.__gl.DEPTH_TEST);
					
				} else {
					
					this.__gl.disable (this.__gl.DEPTH_TEST);
					
				}
				
			}
			
			if (Context3D.__stateCache.updateDepthTestMask (depthMask)) {
				
				this.__gl.depthMask (depthMask);
				
			}
			
			if (Context3D.__stateCache.updateDepthCompareMode (passCompareMode)) {
				
				switch (passCompareMode) {
					
					case Context3DCompareMode.ALWAYS: this.__gl.depthFunc (this.__gl.ALWAYS); break;
					case Context3DCompareMode.EQUAL: this.__gl.depthFunc (this.__gl.EQUAL); break;
					case Context3DCompareMode.GREATER: this.__gl.depthFunc (this.__gl.GREATER); break;
					case Context3DCompareMode.GREATER_EQUAL: this.__gl.depthFunc (this.__gl.GEQUAL); break;
					case Context3DCompareMode.LESS: this.__gl.depthFunc (this.__gl.LESS); break;
					case Context3DCompareMode.LESS_EQUAL: this.__gl.depthFunc (this.__gl.LEQUAL); break;
					case Context3DCompareMode.NEVER: this.__gl.depthFunc (this.__gl.NEVER); break;
					case Context3DCompareMode.NOT_EQUAL: this.__gl.depthFunc (this.__gl.NOTEQUAL); break;
					default:
						
						throw new IllegalOperationError ();
						
				}
				
			}
		}
		
		/**
		 * Specifies the texture to use for a texture input register of a fragment program. 
		 * @param sampler
		 * @param texture
		 * 
		 */		
		public setTextureAt(sampler:number, texture:TextureBase):void
		{
			/**/ sampler = ((sampler) >> 0); texture = strict(texture, TextureBase);
			this.__setTextureAt(sampler, texture);
		}
		
		/**
		 * Sets the specified texture as the rendering target. 
		 * @param texture
		 * @param enableDepthAndStencil
		 * @param antiAlias
		 * @param surfaceSelector
		 * @param colorOutputIndex
		 * 
		 */		
		public setRenderToTexture(texture:TextureBase, enableDepthAndStencil:boolean = false, antiAlias:number = 0, surfaceSelector:number = 0, colorOutputIndex:number = 0):void
		{
			/**/ texture = strict(texture, TextureBase); enableDepthAndStencil = Boolean(enableDepthAndStencil); antiAlias = ((antiAlias) >> 0); surfaceSelector = ((surfaceSelector) >> 0); colorOutputIndex = ((colorOutputIndex) >> 0);
			this.__setRenderToTexture(texture, enableDepthAndStencil, antiAlias, surfaceSelector, colorOutputIndex);
		}
		
		/**
		 * Sets the back rendering buffer as the render target. 
		 * 
		 */		
		public setRenderToBackBuffer():void
		{
			if (this.__getRenderToTexture() == null) {
				
				return;
				
			}
			
			this.__gl.bindFramebuffer (this.__gl.FRAMEBUFFER, null);
			
			this.__gl.frontFace (this.__gl.CCW);
			
			if (this.__renderToTexture) {
				
				delete this.__renderToTexture._parent;
				
			}
			
			this.__renderToTexture = null;
			this.__enableDepthAndStencil = false;
			this.__scissorRectangle = null;
			this.__updateBackbufferViewport ();
			this.__updateScissorRectangle ();
			this.__updateDepthAndStencilState ();
			
			this.__positionScale[1] = 1.0;
			
			if (this.__program != null) {
				
				this.__program.__setPositionScale (this.__positionScale);
				
			}
		}
		
		/**
		 * Sets triangle culling mode. 
		 * @param triangleFaceToCull
		 * 
		 */		
		public setCulling(triangleFaceToCull:string):void
		{
			/**/ triangleFaceToCull = as(triangleFaceToCull, 'String');
			if (Context3D.__stateCache.updateCullingMode (triangleFaceToCull)) {
				
				switch (triangleFaceToCull) {
					
					case Context3DTriangleFace.NONE:
						
						this.__gl.disable (this.__gl.CULL_FACE);
						break;
						
					case Context3DTriangleFace.BACK:
						
						this.__gl.enable (this.__gl.CULL_FACE);
						this.__gl.cullFace (this.__gl.FRONT);
						break;
						
					case Context3DTriangleFace.FRONT:
						
						this.__gl.enable (this.__gl.CULL_FACE);
						this.__gl.cullFace (this.__gl.BACK);
						break;
						
					case Context3DTriangleFace.FRONT_AND_BACK:
						
						this.__gl.enable (this.__gl.CULL_FACE);
						this.__gl.cullFace (this.__gl.FRONT_AND_BACK);
						break;
						
					default:
						
						throw new IllegalOperationError ();
						
				}
				
			}
		}
		
		/**
		 * Sets stencil mode and operation. 
		 * @param triangleFace
		 * @param compareMode
		 * @param actionOnBothPass
		 * @param actionOnDepthFail
		 * @param actionOnDepthPassStencilFail
		 * 
		 */		
		public setStencilActions(triangleFace:string = "frontAndBack", compareMode:string = "always", actionOnBothPass:string = "keep", actionOnDepthFail:string = "keep", actionOnDepthPassStencilFail:string = "keep"):void
		{
			/**/ triangleFace = as(triangleFace, 'String'); compareMode = as(compareMode, 'String'); actionOnBothPass = as(actionOnBothPass, 'String'); actionOnDepthFail = as(actionOnDepthFail, 'String'); actionOnDepthPassStencilFail = as(actionOnDepthPassStencilFail, 'String');
			this.__stencilCompareMode = compareMode;
			this.__gl.stencilOp (this.__getGLStencilAction (actionOnDepthFail), this.__getGLStencilAction (actionOnDepthPassStencilFail), this.__getGLStencilAction (actionOnBothPass));
			this.__gl.stencilFunc (this.__getGLCompareMode (this.__stencilCompareMode), this.__stencilRef, this.__stencilReadMask);
		}
		
		/**
		 * Sets the stencil comparison value used for stencil tests. 
		 * @param referenceValue
		 * @param readMask
		 * @param writeMask
		 * 
		 */		
		public setStencilReferenceValue(referenceValue:number, readMask:number = 255, writeMask:number = 255):void
		{
			/**/ referenceValue = ((referenceValue) >>> 0); readMask = ((readMask) >>> 0); writeMask = ((writeMask) >>> 0);
			this.__stencilReadMask =(( readMask) >> 0);
			this.__stencilRef =(( referenceValue) >> 0);
			
			this.__gl.stencilFunc (this.__getGLCompareMode (this.__stencilCompareMode), this.__stencilRef, this.__stencilReadMask);
			this.__gl.stencilMask (writeMask);
		}
		
		/**
		 * Sets a scissor rectangle, which is type of drawing mask. 
		 * @param rectangle
		 * 
		 */		
		public setScissorRectangle(rectangle:Rectangle):void
		{
			/**/ rectangle = strict(rectangle, Rectangle);
			this.__setScissorRectangle(rectangle);
		}
		
		/**
		 * Creates a VertexBuffer3D object. 
		 * @param numVertices
		 * @param data32PerVertex
		 * @param bufferUsage
		 * @return 
		 * 
		 */		
		public createVertexBuffer(numVertices:number, data32PerVertex:number, bufferUsage:string = "staticDraw"):VertexBuffer3D
		{
			/**/ numVertices = ((numVertices) >> 0); data32PerVertex = ((data32PerVertex) >> 0); bufferUsage = as(bufferUsage, 'String');
			return new VertexBuffer3D (this, numVertices, data32PerVertex, bufferUsage);
		}
		
		/**
		 * Creates an IndexBuffer3D object. 
		 * @param numIndices
		 * @param bufferUsage
		 * @return 
		 * 
		 */		
		public createIndexBuffer(numIndices:number, bufferUsage:string = "staticDraw"):IndexBuffer3D
		{
			/**/ numIndices = ((numIndices) >> 0); bufferUsage = as(bufferUsage, 'String');
			return new IndexBuffer3D (this, numIndices, bufferUsage);
		}
		
		/**
		 * Creates a Texture object. 
		 * @param width
		 * @param height
		 * @param format
		 * @param optimizeForRenderToTexture
		 * @param streamingLevels
		 * @return 
		 * 
		 */		
		public createTexture(width:number, height:number, format:string, optimizeForRenderToTexture:boolean, streamingLevels:number = 0):Texture
		{
			/**/ width = ((width) >> 0); height = ((height) >> 0); format = as(format, 'String'); optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture); streamingLevels = ((streamingLevels) >> 0);
			return new Texture (this, width, height, format, optimizeForRenderToTexture, streamingLevels);
		}
		
		/**
		 * Creates a CubeTexture object. 
		 * @param size
		 * @param format
		 * @param optimizeForRenderToTexture
		 * @param streamingLevels
		 * @return 
		 * 
		 */		
		public createCubeTexture(size:number, format:string, optimizeForRenderToTexture:boolean, streamingLevels:number = 0):CubeTexture
		{ 
			/**/ size = ((size) >> 0); format = as(format, 'String'); optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture); streamingLevels = ((streamingLevels) >> 0); 
			return new CubeTexture (this, size, format, optimizeForRenderToTexture, streamingLevels);
		}
		
		/**
		 * Creates a Rectangle Texture object. 
		 * @param width
		 * @param height
		 * @param format
		 * @param optimizeForRenderToTexture
		 * @return 
		 * 
		 */		
		public createRectangleTexture(width:number, height:number, format:string, optimizeForRenderToTexture:boolean):RectangleTexture 
		{ 
			/**/ width = ((width) >> 0); height = ((height) >> 0); format = as(format, 'String'); optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture); 
			return new RectangleTexture (this, width, height, format, optimizeForRenderToTexture);
		}
		
		/**
		 * Creates a Program3D object. 
		 * @return 
		 * 
		 */		
		public createProgram():Program3D
		{
			return new Program3D (this);
		}
		
		/**
		 * Draws the current render buffer to a bitmap. 
		 * @param destination
		 * 
		 */		
		public drawToBitmapData(destination:BitmapData):void
		{
			/**/ destination = strict(destination, BitmapData);
			if (destination == null) return;
			
			var x:number = 0;
			var y:number = this.__positionScale[1] == 1.0 ? this.__backBufferHeight - destination.height : 0;
			var width:number = destination.width;
			var height:number = destination.height;
			
			this.__gl.readPixels (x, y, width, height, this.__gl.RGBA, this.__gl.UNSIGNED_BYTE, this.__pixels);
			destination.__fromPixels(this.__pixels, width, height, !this.__renderToTexture);
		}
		
		/**
		 * Manually override texture sampler state. 
		 * @param sampler
		 * @param wrap
		 * @param filter
		 * @param mipfilter
		 * 
		 */		
		public setSamplerStateAt(sampler:number, wrap:string, filter:string, mipfilter:string):void
		{
			/**/ sampler = ((sampler) >> 0); wrap = as(wrap, 'String'); filter = as(filter, 'String'); mipfilter = as(mipfilter, 'String');
			this.__setSamplerStateAt(sampler, wrap, filter, mipfilter);
		}
		
		/**
		 * Creates a VideoTexture object. 
		 * @return 
		 * 
		 */		
		public createVideoTexture():VideoTexture
		{ 
			return new VideoTexture (this);
		}
		
		/*[internal]*/ protected __getRenderToTexture():TextureBase
		{
			return this.__renderToTexture;
		}
		
		/*[internal]*/ protected __setBlendFactorsSeparate(sourceFactorRGB:string, destinationFactorRGB:string, equationRGB:string, sourceFactorAlpha: string, destinationFactorAlpha: string, equationAlpha:string):void
		{
			// sourceFactorRGB = as(sourceFactorRGB, 'String'); destinationFactorRGB = as(destinationFactorRGB, 'String'); equationRGB = as(equationRGB, 'String'); sourceFactorAlpha = as(sourceFactorAlpha, 'String'); destinationFactorAlpha = as(destinationFactorAlpha, 'String'); equationAlpha = as(equationAlpha, 'String');
			var updateSrc = Context3D.__stateCache.updateBlendSrcFactor (sourceFactorRGB);
			var updateSrcAlpha = Context3D.__stateCache.updateBlendSrcFactorAlpha (sourceFactorAlpha);
			var updateDest = Context3D.__stateCache.updateBlendDestFactor (destinationFactorRGB);
			var updateDestAlpha = Context3D.__stateCache.updateBlendDestFactorAlpha (destinationFactorAlpha);
			var updateEquation = Context3D.__stateCache.updateBlendEquation (equationRGB);
			var updateEquationAlpha = Context3D.__stateCache.updateBlendEquationAlpha (equationAlpha);
			if (updateSrc || updateSrcAlpha || updateDest || updateDestAlpha || updateEquation || updateEquationAlpha) {
				
				this.__updateBlendFactors ();
				
			}
		}
		
		/*[internal]*/ protected __flushSamplerState ():void {
			
			var sampler = 0;
			
			while (this.__samplerDirty != 0) {
				
				if ((this.__samplerDirty & (1 << sampler)) != 0) {
					
					if (Context3D.__stateCache.updateActiveTextureSample (sampler)) {
						
						this.__gl.activeTexture (this.__gl.TEXTURE0 + sampler);
						
					}
					
					var texture = this.__samplerTextures[sampler];
					
					if (texture != null) {
						
						var target = texture.__textureTarget;
						
						this.__gl.bindTexture (target, texture.__getTexture ());
						
						texture.__setSamplerState (this.__samplerStates[sampler]);
						
					} else {
						
						this.__gl.bindTexture (this.__gl.TEXTURE_2D, null);
						
					}
					
					this.__samplerDirty &= ~(1 << sampler);
					
				}
				
				sampler++;
				
			}
			
		}
		
		
		/*[internal]*/ protected __getGLCompareMode (compareMode:string):number {
			
			// compareMode = as(compareMode, 'String');
			
			switch (compareMode) {
				
				case Context3DCompareMode.ALWAYS: return this.__gl.ALWAYS;
				case Context3DCompareMode.EQUAL: return this.__gl.EQUAL;
				case Context3DCompareMode.GREATER: return this.__gl.GREATER;
				case Context3DCompareMode.GREATER_EQUAL: return this.__gl.GEQUAL;
				case Context3DCompareMode.LESS: return this.__gl.LESS;
				case Context3DCompareMode.LESS_EQUAL: return this.__gl.LEQUAL; // TODO : wrong value
				case Context3DCompareMode.NEVER: return this.__gl.NEVER;
				case Context3DCompareMode.NOT_EQUAL: return this.__gl.NOTEQUAL;
				default: return this.__gl.EQUAL;
					
			}
			
		}
		
		
		/*[internal]*/ protected __getGLStencilAction (stencilAction:Context3DStencilAction):number {
			
			// stencilAction = strict(stencilAction, Context3DStencilAction);
			
			switch (stencilAction) {
				
				case Context3DStencilAction.DECREMENT_SATURATE: return this.__gl.DECR;
				case Context3DStencilAction.DECREMENT_WRAP: return this.__gl.DECR_WRAP;
				case Context3DStencilAction.INCREMENT_SATURATE: return this.__gl.INCR;
				case Context3DStencilAction.INCREMENT_WRAP: return this.__gl.INCR_WRAP;
				case Context3DStencilAction.INVERT: return this.__gl.INVERT;
				case Context3DStencilAction.KEEP: return this.__gl.KEEP;
				case Context3DStencilAction.SET: return this.__gl.REPLACE;
				case Context3DStencilAction.ZERO: return this.__gl.ZERO;
				default: return this.__gl.KEEP;
					
			}
			
		}
		
		/*[internal]*/ protected __getGLBlendFactor (factor:string):number {
			
			// factor = as(factor, 'String');
			
			switch (factor) {
				
				case Context3DBlendFactor.ONE: return this.__gl.ONE;
				case Context3DBlendFactor.ZERO: return this.__gl.ZERO;
				case Context3DBlendFactor.SOURCE_COLOR: return this.__gl.SRC_COLOR;
				case Context3DBlendFactor.SOURCE_ALPHA: return this.__gl.SRC_ALPHA;
				case Context3DBlendFactor.DESTINATION_ALPHA: return this.__gl.DST_ALPHA;
				case Context3DBlendFactor.DESTINATION_COLOR: return this.__gl.DST_COLOR;
				case Context3DBlendFactor.ONE_MINUS_SOURCE_COLOR: return this.__gl.ONE_MINUS_SRC_COLOR;
				case Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA: return this.__gl.ONE_MINUS_SRC_ALPHA;
				case Context3DBlendFactor.ONE_MINUS_DESTINATION_ALPHA: return this.__gl.ONE_MINUS_DST_ALPHA;
				case Context3DBlendFactor.ONE_MINUS_DESTINATION_COLOR: return this.__gl.ONE_MINUS_DST_COLOR;
				default:
					throw new IllegalOperationError ();
					
			}
			
		}
		
		
		/*[internal]*/ protected __getGLBlendEquation (equation:string):number {
			
			// equation = as(equation, 'String');
			
			switch (equation) {
				
				case Context3DBlendEquation.ADD: return this.__gl.FUNC_ADD;
				case Context3DBlendEquation.SUBTRACT: return this.__gl.FUNC_SUBTRACT;
				case Context3DBlendEquation.REVERSE_SUBTRACT: return this.__gl.FUNC_REVERSE_SUBTRACT;
				case Context3DBlendEquation.MIN: return this.glMin; // GL_MIN
				case Context3DBlendEquation.MAX: return this.glMax; // GL_MAX
				default:
					throw new IllegalOperationError ();
					
			}
			
		}
		
		
		/*[internal]*/ protected __hasGLExtension (name:string):boolean {
			
			// name = as(name, 'String');
			
			return (this.__gl.getSupportedExtensions ().indexOf (name) != -1);
			
		}
		
		
		/*[internal]*/ protected __setViewport (originX:number, originY:number, width:number, height:number):void {
			
			// originX = ((originX) >> 0); originY = ((originY) >> 0); width = ((width) >> 0); height = ((height) >> 0);
			
			if (this.__renderToTexture != null) originY *= -1;
			
			if (Context3D.__stateCache.updateViewport (originX, originY, width, height)) {
				
				this.__gl.viewport (originX, originY, width, height);
				
			}
			
		}
		
		
		/*[internal]*/ protected __updateDepthAndStencilState ():void {
			
			var depthAndStencil = this.__renderToTexture != null ? this.__rttDepthAndStencil : this.__backBufferEnableDepthAndStencil;
			
			if (depthAndStencil) {
				
				this.__gl.enable (this.__gl.DEPTH_TEST);
				this.__gl.enable (this.__gl.STENCIL_TEST);
				
			} else {
				
				this.__gl.disable (this.__gl.DEPTH_TEST);
				this.__gl.disable (this.__gl.STENCIL_TEST);
				
			}
			
		}
		
		
		/*[internal]*/ protected __updateBlendFactors ():void {
			
			if (Context3D.__stateCache._srcBlendFactor == null || Context3D.__stateCache._destBlendFactor == null) {

				this.__gl.disable (this.__gl.BLEND);
				return;
				
			}
			
			var eqa = this.__getGLBlendEquation(Context3D.__stateCache._equation);
			var eqaA;
			if (Context3D.__stateCache._equationAlpha) {
				eqaA = this.__getGLBlendEquation(Context3D.__stateCache._equationAlpha);
			}
			
			if (eqaA) {
				
				this.__gl.blendEquationSeparate(eqa, eqaA);
				
			} else {
				
				this.__gl.blendEquation(eqa);
				
			}
			
			var src = this.__getGLBlendFactor(Context3D.__stateCache._srcBlendFactor);
			var dest = this.__getGLBlendFactor(Context3D.__stateCache._destBlendFactor);
			
			var srcA, destA;
			if (Context3D.__stateCache._srcBlendFactorAlpha && Context3D.__stateCache._destBlendFactorAlpha) {
				
				srcA = this.__getGLBlendFactor(Context3D.__stateCache._srcBlendFactorAlpha);
				destA = this.__getGLBlendFactor(Context3D.__stateCache._destBlendFactorAlpha);
				
			}
			
			this.__gl.enable (this.__gl.BLEND);
			
			if (srcA && destA) {
				
				this.__gl.blendFuncSeparate (src, dest, srcA, destA);
				
			} else {
				
				this.__gl.blendFunc (src, dest);
				
			}
		}
		
		
		/*[internal]*/ protected __updateScissorRectangle ():void {
			
			if (this.__scissorRectangle == null) {
				
				this.__gl.disable (this.__gl.SCISSOR_TEST);
				return;
				
			}
			
			this.__gl.enable (this.__gl.SCISSOR_TEST);
			
			var height:number = 0;
			var offsetX:number = this.__stage3D ? this.__stage3D.x : 0;
			var offsetY:number = this.__stage3D ? this.__stage3D.y : 0;
			
			if (this.__renderToTexture != null) {
				
				if (is(this.__renderToTexture , Texture)) {
					
					var texture2D:Texture = as(this.__renderToTexture , Texture);
					height = texture2D.__height;
					
				} else if (is(this.__renderToTexture , RectangleTexture)) {
					
					var rectTexture:RectangleTexture = as(this.__renderToTexture , RectangleTexture);
					height = rectTexture.__height;
					
				}
				
			} else {
				
				height = this.backBufferHeight;
				
			}
			
			var sX = this.__scissorRectangle.x;
			var sY = this.__scissorRectangle.y;
			var sWidth = this.__scissorRectangle.width;
			var sHeight = this.__scissorRectangle.height;
			
			this.__gl.scissor (
				sX + offsetX,
				height - sY - sHeight + offsetY,
				sWidth,
				sHeight
			);
			
		}
		
		
		/*[internal]*/ protected __updateBackbufferViewport ():void {
			
			if (this.__canvas) {
				
				if (this.__canvas.width != this.__backBufferWidth || this.__canvas.height != this.__backBufferHeight) {
					
					this.__canvas.width = this.__backBufferWidth;
					this.__canvas.height = this.__backBufferHeight;
					
				}
				
			}
			
			if (!this.__getRenderToTexture() && this.__backBufferWidth > 0 && this.__backBufferHeight > 0) {
				
				this.__setViewport (this.__stage3D ? this.__stage3D.x : 0, this.__stage3D ? this.__stage3D.y : 0, this.__backBufferWidth, this.__backBufferHeight);
				
			}
			
		}
		
		/**
		 * Specifies the texture to use for a texture input register of a fragment program. 
		 * @param sampler
		 * @param texture
		 * 
		 */		
		/*[internal]*/ protected __setTextureAt(sampler:number, texture:TextureBase):boolean
		{
			// sampler = ((sampler) >> 0); texture = strict(texture, TextureBase);
			if (this.__samplerTextures[sampler] != texture) {
				
				this.__samplerTextures[sampler] = texture;
				this.__samplerDirty |= (1 << sampler);
				return true;
				
			}
			
			if (!texture) {
				
				return false;
				
			}
			
			var state = this.__samplerStates[sampler];
			if (!state) {
				
				return false;
				
			}
			
			if (!state.equals(texture.__samplerState)) {
				
				this.__samplerDirty |= (1 << sampler);
				
			}
		}
		
		/**
		 * Specifies which vertex data components correspond to a single vertex shader program input. 
		 * @param index
		 * @param buffer
		 * @param bufferOffset
		 * @param format
		 * 
		 */		
		/*[internal]*/ protected __setVertexBufferAt(index:number, buffer:VertexBuffer3D, bufferOffset:number = 0, format:string = "float4"):void
		{
			// index = ((index) >> 0); buffer = strict(buffer, VertexBuffer3D); bufferOffset = ((bufferOffset) >> 0); format = as(format, 'String');
			if (buffer == null) {
								
				this.__gl.disableVertexAttribArray (index);
				this.__gl.bindBuffer (this.__gl.ARRAY_BUFFER, null);
				
				return;
				
			}
			
			
			this.__gl.enableVertexAttribArray (index);
			
			this.__gl.bindBuffer (this.__gl.ARRAY_BUFFER, buffer.__id);
			
			var byteOffset = bufferOffset * 4;
			
			switch (format) {
				
				case Context3DVertexBufferFormat.BYTES_4:
					
					this.__gl.vertexAttribPointer (index, 4, this.__gl.UNSIGNED_BYTE, true, buffer.__stride, byteOffset);
					break;
				
				case Context3DVertexBufferFormat.FLOAT_4:
					
					this.__gl.vertexAttribPointer (index, 4, this.__gl.FLOAT, false, buffer.__stride, byteOffset);
					break;
				
				case Context3DVertexBufferFormat.FLOAT_3:
					
					this.__gl.vertexAttribPointer (index, 3, this.__gl.FLOAT, false, buffer.__stride, byteOffset);
					break;
				
				case Context3DVertexBufferFormat.FLOAT_2:
					
					this.__gl.vertexAttribPointer (index, 2, this.__gl.FLOAT, false, buffer.__stride, byteOffset);
					break;
				
				case Context3DVertexBufferFormat.FLOAT_1:
					
					this.__gl.vertexAttribPointer (index, 1, this.__gl.FLOAT, false, buffer.__stride, byteOffset);
					break;
				
				default:
					
					throw new IllegalOperationError ();
					
			}
		}
		
		/**
		 * Sets constants for use by shader programs using values stored in a Matrix3D. 
		 * @param programType
		 * @param firstRegister
		 * @param matrix
		 * @param transposedMatrix
		 * 
		 */		
		/*[internal]*/ protected __setProgramConstantsFromMatrix(programType:string, firstRegister:number, matrix:Matrix3D, transposedMatrix:boolean = false):void
		{
			// programType = as(programType, 'String'); firstRegister = ((firstRegister) >> 0); matrix = strict(matrix, Matrix3D); transposedMatrix = Boolean(transposedMatrix);
			var isVertex:boolean = programType == Context3DProgramType.VERTEX;
			var dest = isVertex ? this.__vertexConstants : this.__fragmentConstants;
			var source:number[] = matrix.rawData;
			var i = firstRegister * 4;
			
			if (transposedMatrix) {
				
				dest[i++] = source[0];
				dest[i++] = source[4];
				dest[i++] = source[8];
				dest[i++] = source[12];
				
				dest[i++] = source[1];
				dest[i++] = source[5];
				dest[i++] = source[9];
				dest[i++] = source[13];
				
				dest[i++] = source[2];
				dest[i++] = source[6];
				dest[i++] = source[10];
				dest[i++] = source[14];
				
				dest[i++] = source[3];
				dest[i++] = source[7];
				dest[i++] = source[11];
				dest[i++] = source[15];
				
			} else {
				
				if (this.__optimizeUniforms) {
					
					this.__releaseFloat32ArrayToPool(dest[i]);
					dest[i] = this.__getFloat32ArrayFromPool(source);
					
				} else {
					
					dest[i++] = source[0];
					dest[i++] = source[1];
					dest[i++] = source[2];
					dest[i++] = source[3];
					
					dest[i++] = source[4];
					dest[i++] = source[5];
					dest[i++] = source[6];
					dest[i++] = source[7];
					
					dest[i++] = source[8];
					dest[i++] = source[9];
					dest[i++] = source[10];
					dest[i++] = source[11];
					
					dest[i++] = source[12];
					dest[i++] = source[13];
					dest[i++] = source[14];
					dest[i++] = source[15];
					
				}
			}
			
			if (this.__program != null) {
				
				this.__program.__markDirty (isVertex, firstRegister, 4);
				
			}
		}
		
		/**
		 * Sets vertex and fragment shader programs to use for subsequent rendering. 
		 * @param program
		 * 
		 */		
		/*[internal]*/ protected __setProgram(program:Program3D):void
		{
			// program = strict(program, Program3D);
			if (program == null) {
				
				throw new IllegalOperationError ();
				
			}
			
			if (Context3D.__stateCache.updateProgram3D (program)) {
				
				program.__use ();
				program.__setPositionScale (this.__positionScale);
				
				this.__program = program;
				
				this.__samplerDirty |= this.__program.__samplerUsageMask;
				
				for (var i = 0; i < Context3D.MAX_SAMPLERS; ++i) {
					
					this.__samplerStates[i].copyFrom (this.__program.__getSamplerState (i));
					
				}
				
			}
		}
		
		/**
		 * Sets the constant inputs for the shader programs. 
		 * @param programType
		 * @param firstRegister
		 * @param data
		 * @param numRegisters
		 * 
		 */		
		/*[internal]*/ protected __setProgramConstantsFromVector(programType:string, firstRegister:number, data:number[], numRegisters:number = -1):void
		{
			// programType = as(programType, 'String'); firstRegister = ((firstRegister) >> 0); numRegisters = ((numRegisters) >> 0);
			if (numRegisters == 0) return;
			
			if (numRegisters == -1) {
				
				numRegisters = (data.length >> 2);
				
			}
			
			var isVertex = (programType == Context3DProgramType.VERTEX);
			var dest = isVertex ? this.__vertexConstants : this.__fragmentConstants;
			var source = data;
			
			var sourceIndex = 0;
			var destIndex = firstRegister * 4;
			
			if (this.__optimizeUniforms) {
				
				this.__releaseFloat32ArrayToPool(dest[destIndex]);
				dest[destIndex] = this.__getFloat32ArrayFromPool(source);
				
			} else {
				
				for (var i = 0; i < numRegisters; ++i) {
					
					dest[destIndex++] = source[sourceIndex++];
					dest[destIndex++] = source[sourceIndex++];
					dest[destIndex++] = source[sourceIndex++];
					dest[destIndex++] = source[sourceIndex++];
					
				}
				
			}
			
			if (this.__program != null) {
				
				this.__program.__markDirty (isVertex, firstRegister, numRegisters);
				
			}
		}
		
		/**
		 * Clears the color, depth, and stencil buffers associated with this Context3D object and fills them with the specified values. 
		 * @param red
		 * @param green
		 * @param blue
		 * @param alpha
		 * @param depth
		 * @param stencil
		 * @param mask
		 * 
		 */		
		/*[internal]*/ protected __clear(red:number = 0, green:number = 0, blue:number = 0, alpha:number = 1, depth:number = 1, stencil:number = 0, mask:number = 4294967295):void
		{
			// red = (+(red)); green = (+(green)); blue = (+(blue)); alpha = (+(alpha)); depth = (+(depth)); stencil = ((stencil) >>> 0); mask = ((mask) >>> 0);
			var clearMask = 0;
			
			if (mask & Context3DClearMask.COLOR != 0) {
				
				clearMask |= this.__gl.COLOR_BUFFER_BIT;
				
				this.__gl.clearColor (red, green, blue, alpha);
				
			}
			
			if (mask & Context3DClearMask.DEPTH != 0) {
				
				clearMask |= this.__gl.DEPTH_BUFFER_BIT;
				
				this.__gl.depthMask (true);
				this.__gl.clearDepth (depth);
				
			}
			
			if (mask & Context3DClearMask.STENCIL != 0) {
				
				clearMask |= this.__gl.STENCIL_BUFFER_BIT;
				
				this.__gl.clearStencil (stencil);
				
			}
			
			this.__gl.clear (clearMask);
		}
		
		/**
		 * Render the specified triangles using the current buffers and state of this Context3D object. 
		 * @param indexBuffer
		 * @param firstIndex
		 * @param numTriangles
		 * 
		 */		
		/*[internal]*/ protected __drawTriangles(indexBuffer:IndexBuffer3D, firstIndex:number = 0, numTriangles:number = -1):void
		{
			// indexBuffer = strict(indexBuffer, IndexBuffer3D); firstIndex = ((firstIndex) >> 0); numTriangles = ((numTriangles) >> 0);
			if (this.__program == null) {
				
				return;
				
			}
			
			this.__flushSamplerState ();
			this.__program.__flush ();
			
			var count = (numTriangles == -1) ? indexBuffer.__numIndices : (numTriangles * 3);
			
			this.__gl.bindBuffer (this.__gl.ELEMENT_ARRAY_BUFFER, indexBuffer.__id);
			
			this.__gl.drawElements (this.__gl.TRIANGLES, count, indexBuffer.__elementType, firstIndex);
			
		}
		
		/**
		 * Sets a scissor rectangle, which is type of drawing mask. 
		 * @param rectangle
		 * 
		 */		
		/*[internal]*/ protected __setScissorRectangle(rectangle:Rectangle):void
		{
			// rectangle = strict(rectangle, Rectangle);
			if (rectangle) {
				Context3D.sHelperRect.__copyFrom(rectangle);
				this.__scissorRectangle = Context3D.sHelperRect;
			} else {
				this.__scissorRectangle = null;
			}
			this.__updateScissorRectangle ();
		}
		
		/**
		 * Manually override texture sampler state. 
		 * @param sampler
		 * @param wrap
		 * @param filter
		 * @param mipfilter
		 * 
		 */		
		/*[internal]*/ protected __setSamplerStateAt(sampler:number, wrap:string, filter:string, mipfilter:string):void
		{
			// sampler = ((sampler) >> 0); wrap = as(wrap, 'String'); filter = as(filter, 'String'); mipfilter = as(mipfilter, 'String');
			if (sampler < 0 || sampler > Context3D.MAX_SAMPLERS) {
				
				throw new Error ("sampler out of range");
				
			}
			
			var state = this.__samplerStates[sampler];
			
			switch (wrap) {
				
				case Context3DWrapMode.CLAMP:
					
					state.wrapModeS = this.__gl.CLAMP_TO_EDGE;
					state.wrapModeT = this.__gl.CLAMP_TO_EDGE;
					break;
				
				case Context3DWrapMode.CLAMP_U_REPEAT_V:
					
					state.wrapModeS = this.__gl.CLAMP_TO_EDGE;
					state.wrapModeT = this.__gl.REPEAT;
					break;
				
				case Context3DWrapMode.REPEAT:
					
					state.wrapModeS = this.__gl.REPEAT;
					state.wrapModeT = this.__gl.REPEAT;
					break;
				
				case Context3DWrapMode.REPEAT_U_CLAMP_V:
					
					state.wrapModeS = this.__gl.REPEAT;
					state.wrapModeT = this.__gl.CLAMP_TO_EDGE;
					break;
				
				default:
					
					throw new Error ("wrap bad enum");
					
			}
			
			switch (filter) {
				
				case Context3DTextureFilter.LINEAR:
					
					state.magFilter = this.__gl.LINEAR;
					
					if (this.__supportsAnisotropicFiltering) {
						
						state.maxAniso = 1;
						
					}
					break;
				
				case Context3DTextureFilter.NEAREST:
					
					state.magFilter = this.__gl.NEAREST;
					
					if (this.__supportsAnisotropicFiltering) {
						
						state.maxAniso = 1;
						
					}
					break;
				
				case Context3DTextureFilter.ANISOTROPIC2X:
					
					if (this.__supportsAnisotropicFiltering) {
						
						state.maxAniso = (this.__maxAnisotropyTexture2D < 2 ? this.__maxAnisotropyTexture2D : 2);
						
					}
					break;
				
				case Context3DTextureFilter.ANISOTROPIC4X:
					
					if (this.__supportsAnisotropicFiltering) {
						
						state.maxAniso = (this.__maxAnisotropyTexture2D < 4 ? this.__maxAnisotropyTexture2D : 4);
						
					}
					break;
				
				case Context3DTextureFilter.ANISOTROPIC8X:
					
					if (this.__supportsAnisotropicFiltering) {
						
						state.maxAniso = (this.__maxAnisotropyTexture2D < 8 ? this.__maxAnisotropyTexture2D : 8);
						
					}
					break;
				
				case Context3DTextureFilter.ANISOTROPIC16X:
					
					if (this.__supportsAnisotropicFiltering) {
						
						state.maxAniso = (this.__maxAnisotropyTexture2D < 16 ? this.__maxAnisotropyTexture2D : 16);
						
					}
					break;
				
				default:
					
					throw new Error ("filter bad enum");
					
			}
			
			switch (mipfilter) {
				
				case Context3DMipFilter.MIPLINEAR:
					
					state.minFilter = filter == Context3DTextureFilter.NEAREST ? this.__gl.NEAREST_MIPMAP_LINEAR : this.__gl.LINEAR_MIPMAP_LINEAR;
					break;
				
				case Context3DMipFilter.MIPNEAREST:
					
					state.minFilter = filter == Context3DTextureFilter.NEAREST ? this.__gl.NEAREST_MIPMAP_NEAREST : this.__gl.LINEAR_MIPMAP_NEAREST;
					break;
				
				case Context3DMipFilter.MIPNONE:
					
					state.minFilter = filter == Context3DTextureFilter.NEAREST ? this.__gl.NEAREST : this.__gl.LINEAR;
					break;
				
				default:
					
					throw new Error ("mipfiter bad enum");
					
			}
		}
		
		/*[internal]*/ protected __createWebGLContext(canvas:HTMLCanvasElement, params:any = null):void
		{
			// canvas = strict(canvas, HTMLCanvasElement);
			// params
			params =params || {};
			
			// alpha: Boolean that indicates if the canvas contains an alpha buffer.
			if (params.alpha == undefined) params.alpha = false;
			
			// depth: Boolean that indicates that the drawing buffer has a depth buffer of at least 16 bits.
			if (params.depth == undefined) params.depth = false;
			
			// stencil: Boolean that indicates that the drawing buffer has a stencil buffer of at least 8 bits.
			if (params.stencil == undefined) params.stencil = false;
			
			// antialias: Boolean that indicates whether or not to perform anti-aliasing.
			if (params.antialias == undefined) params.antialias = false;
			
			// premultipliedAlpha: Boolean that indicates that the page compositor will assume the drawing buffer contains colors with pre-multiplied alpha.
			if (params.premultipliedAlpha == undefined) params.premultipliedAlpha = false;
			
			// preserveDrawingBuffer: If the value is true the buffers will not be cleared and will preserve their values until cleared or overwritten by the author.
			if (params.preserveDrawingBuffer == undefined) params.preserveDrawingBuffer = false;
			
			// failIfMajorPerformanceCaveat: Boolean that indicates if a context will be created if the system performance is low.
			if (params.failIfMajorPerformanceCaveat == undefined) params.failIfMajorPerformanceCaveat = false;
			
			// WebKit bug
			// https://bugs.webkit.org/show_bug.cgi?id=181317
			// https://bugs.webkit.org/show_bug.cgi?id=181007
			// https://jsfiddle.net/greggman/2rk7pmx3/
			if (params.alpha == false && Capabilities.browser == 'Safari') {
				
				(params.alpha = true) && (canvas.style.background = 'black');
				
			}
			
			// canvas
			this.__canvas = canvas;
			
			// WebGL 1.0
			try { this.__gl =strict( this.__canvas.getContext("webgl", params), WebGLRenderingContext); } catch (e) {e = window.asc.e2e(e);}
			
			// WebGL 1.0 Experimental
			try { this.__gl = this.__gl || this.__canvas.getContext("experimental-webgl", params); } catch (e) {e = window.asc.e2e(e);}
			
			// validate
			if (!this.__gl) {
				
				this.__throwWebGLNotAvailable();
				
			} else {
				
				var ext = this.__gl.getExtension('EXT_blend_minmax');
				if (ext) {
					this.glMax =(( ext.MAX_EXT) >> 0);
					this.glMin =(( ext.MIN_EXT) >> 0);
				}
				
			}
			
			// context loss
			this.__canvas.addEventListener('webglcontextlost', this.__throwWebGLNotAvailable.__bind(this), false);
		}
		
		/*[internal]*/ protected __throwWebGLNotAvailable():void
		{
			throw new Error('WebGL is not available. Please restart your browser.', 3710); // Aka: Requested Stage3D Operation failed to complete.
		}
		
		/**
		 * Sets the specified texture as the rendering target. 
		 * @param texture
		 * @param enableDepthAndStencil
		 * @param antiAlias
		 * @param surfaceSelector
		 * @param colorOutputIndex
		 * 
		 */		
		/*[internal]*/ protected __setRenderToTexture(texture:TextureBase, enableDepthAndStencil:boolean = false, antiAlias:number = 0, surfaceSelector:number = 0, colorOutputIndex:number = 0):void
		{
			// texture = strict(texture, TextureBase); enableDepthAndStencil = Boolean(enableDepthAndStencil); antiAlias = ((antiAlias) >> 0); surfaceSelector = ((surfaceSelector) >> 0); colorOutputIndex = ((colorOutputIndex) >> 0);
			if (this.__getRenderToTexture() == texture && this.__enableDepthAndStencil == enableDepthAndStencil) {
				
				return;
				
			}
			
			var width = 0;
			var height = 0;
			
			if (this.__framebuffer == null) {
				
				this.__framebuffer =strict( this.__gl.createFramebuffer (), WebGLFramebuffer);
				
			}
			
			this.__gl.bindFramebuffer (this.__gl.FRAMEBUFFER, this.__framebuffer);
			
			if (is(texture , Texture)) {
				
				var texture2D:Texture = as(texture , Texture);
				width = texture2D.__width;
				height = texture2D.__height;
				
				this.__gl.framebufferTexture2D (this.__gl.FRAMEBUFFER, this.__gl.COLOR_ATTACHMENT0, this.__gl.TEXTURE_2D, texture.__textureID, 0);
				
			} else if (is(texture , RectangleTexture)) {
				
				var rectTexture:RectangleTexture = as(texture , RectangleTexture);
				width = rectTexture.__width;
				height = rectTexture.__height;
				
				this.__gl.framebufferTexture2D (this.__gl.FRAMEBUFFER, this.__gl.COLOR_ATTACHMENT0, this.__gl.TEXTURE_2D, texture.__textureID, 0);
				
			} else if (is(texture , CubeTexture)) {
				
				var cubeTexture:CubeTexture = as(texture , CubeTexture);
				width = cubeTexture.__size;
				height = cubeTexture.__size;
				
				for (var i = 0; i < 6; ++i) {
					
					this.__gl.framebufferTexture2D (this.__gl.FRAMEBUFFER, this.__gl.COLOR_ATTACHMENT0, this.__gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, texture.__textureID, 0);
					
				}
				
			} else {
				
				throw new Error ("Invalid texture");
				
			}
			
			if (enableDepthAndStencil) {
				
				if (this.__supportsPackedDepthStencil) {
					
					if (this.__depthStencilRenderBuffer == null) {
						
						this.__depthStencilRenderBuffer =strict( this.__gl.createRenderbuffer (), WebGLRenderbuffer);
						
					}

					this.__gl.bindRenderbuffer (this.__gl.RENDERBUFFER, this.__depthStencilRenderBuffer);
					this.__gl.renderbufferStorage (this.__gl.RENDERBUFFER, Context3D.DEPTH_STENCIL, width, height);
					
					this.__gl.framebufferRenderbuffer (this.__gl.FRAMEBUFFER, this.__gl.DEPTH_STENCIL_ATTACHMENT, this.__gl.RENDERBUFFER, this.__depthStencilRenderBuffer);
					
				} else {
					
					if (this.__depthRenderBuffer == null) {
						
						this.__depthRenderBuffer =strict( this.__gl.createRenderbuffer (), WebGLRenderbuffer);
						
					}
					
					if (this.__stencilRenderBuffer == null) {
						
						this.__stencilRenderBuffer =strict( this.__gl.createRenderbuffer (), WebGLRenderbuffer);
						
					}
					
					this.__gl.bindRenderbuffer (this.__gl.RENDERBUFFER, this.__depthRenderBuffer);
					this.__gl.renderbufferStorage (this.__gl.RENDERBUFFER, this.__gl.DEPTH_COMPONENT16, width, height);
					this.__gl.bindRenderbuffer (this.__gl.RENDERBUFFER, this.__stencilRenderBuffer);
					this.__gl.renderbufferStorage (this.__gl.RENDERBUFFER, this.__gl.STENCIL_INDEX8, width, height);
					
					this.__gl.framebufferRenderbuffer (this.__gl.FRAMEBUFFER, this.__gl.DEPTH_ATTACHMENT, this.__gl.RENDERBUFFER, this.__depthRenderBuffer);
					this.__gl.framebufferRenderbuffer (this.__gl.FRAMEBUFFER, this.__gl.STENCIL_ATTACHMENT, this.__gl.RENDERBUFFER, this.__stencilRenderBuffer);
					
				}
				
				this.__gl.bindRenderbuffer (this.__gl.RENDERBUFFER, null);
				
			}
			
			this.__setViewport (0, 0, width, height);
			
			if (this.enableErrorChecking) {
				
				var code = this.__gl.checkFramebufferStatus (this.__gl.FRAMEBUFFER);
				
				if (code != this.__gl.FRAMEBUFFER_COMPLETE) {
					
					trace ("Error: Context3D.setRenderToTexture status:${code} width:${texture2D.__width} height:${texture2D.__height}");
					
				}
				
			}
			
			this.__positionScale[1] = -1.0;
			
			if (this.__program != null) {
				
				this.__program.__setPositionScale (this.__positionScale);
				
			}
			
			this.__gl.frontFace (this.__gl.CW);
			
			if (this.__renderToTexture) {
				
				delete this.__renderToTexture._parent;
				
			}
			
			this.__renderToTexture = texture;
			this.__enableDepthAndStencil = enableDepthAndStencil;
			this.__scissorRectangle = null;
			this.__rttDepthAndStencil = enableDepthAndStencil;
			this.__updateScissorRectangle ();
			this.__updateDepthAndStencilState ();
		}
		
		/**
		 * Sets the viewport dimensions and other attributes of the rendering buffer. 
		 * @param width
		 * @param height
		 * @param antiAlias
		 * @param enableDepthAndStencil
		 * @param wantsBestResolution
		 * 
		 */		
		/*[internal]*/ protected __configureBackBuffer(width:number, height:number, antiAlias:number, enableDepthAndStencil:boolean = true, wantsBestResolution:boolean = false):void
		{
			// width = ((width) >> 0); height = ((height) >> 0); antiAlias = ((antiAlias) >> 0); enableDepthAndStencil = Boolean(enableDepthAndStencil); wantsBestResolution = Boolean(wantsBestResolution);
			var length:number =  ((getNextPowerOfTwo(width) * getNextPowerOfTwo(height) * 4) >> 0);
			if (!this.__pixels || this.__pixels.length < length) {
				
				this.__pixels = new Uint8Array(length);
				
			}
			
			this.__backBufferWidth = width;
			this.__backBufferHeight = height;
			
			this.__backBufferAntiAlias = antiAlias;
			this.__backBufferEnableDepthAndStencil = enableDepthAndStencil;
			this.__backBufferWantsBestResolution = wantsBestResolution;
			
			this.__updateBackbufferViewport ();
			
			Context3D.__stateCache.clearSettings ();
		}
		
		/*[internal]*/ protected __getFloat32ArrayFromPool (value:any[]):Float32Array
		{
			// value = strict(value, Array);
			if (!value) {
				
				return;
				
			}
			
			var object;
			var len = value.length;
			var pool = this.__poolFloat32Array[len] || (this.__poolFloat32Array[len] = []);
			if (pool.length) {
				
				object = pool.pop();
				
			} else {
				
				object = new Float32Array(len);
				
			}
			
			switch (len) {
				
				case 1:
					object[0] = value[0];
					break;
				
				case 2:
					object[0] = value[0];
					object[1] = value[1];
					break;
				
				case 4:
					object[0] = value[0];
					object[1] = value[1];
					object[2] = value[2];
					object[3] = value[3];
					break;
				
				case 16:
					object[0] = value[0];
					object[1] = value[1];
					object[2] = value[2];
					object[3] = value[3];
					object[4] = value[4];
					object[5] = value[5];
					object[6] = value[6];
					object[7] = value[7];
					object[8] = value[8];
					object[9] = value[9];
					object[10] = value[10];
					object[11] = value[11];
					object[12] = value[12];
					object[13] = value[13];
					object[14] = value[14];
					object[15] = value[15];
					break;
				
				default:
					throw new Error('internal optimize uniform error: unsupported len ' + len);
			}
			
			return object;
		}
		
		/*[internal]*/ protected __releaseFloat32ArrayToPool (object:Float32Array):void
		{
			// object = strict(object, Float32Array);
			if (!object) {
				
				return;
				
			}
			
			var len = object.length;
			var pool = this.__poolFloat32Array[len] || (this.__poolFloat32Array[len] = []);
			pool[pool.length] = object;
		}
	}
}