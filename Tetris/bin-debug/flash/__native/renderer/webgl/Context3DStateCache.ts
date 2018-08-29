/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../display3D/Program3D.ts" />

namespace flash.__native.renderer.webgl
{
	
	export import Program3D = flash.display3D.Program3D;
	

	export  class Context3DStateCache
	{
		public static FLOATS_PER_REGISTER:number = 4;
		public static MAX_NUM_REGISTERS:number = 1024;
		
		private static disableCache:boolean = true;
		
		private _activeTexture:number = 0;
		private _activeVertexArray:number = 0;
		private _cullingMode:string = null;
		private _depthTestCompareMode:string = null;
		private _depthTestEnabled:boolean = false;
		private _depthTestMask:boolean = false;
		private _destBlendFactor:string = null;
		private _destBlendFactorAlpha:string = null;
		private _program:Program3D = null;
		private _registers = new Array<number> (Context3DStateCache.MAX_NUM_REGISTERS * Context3DStateCache.FLOATS_PER_REGISTER);
		private _srcBlendFactor:string = null;
		private _srcBlendFactorAlpha:string = null;
		private _equation:string = null;
		private _equationAlpha:string = null;
		private _viewportHeight:number = 0;
		private _viewportOriginX:number = 0;
		private _viewportOriginY:number = 0;
		private _viewportWidth:number = 0;
		
		constructor()
		{
			this.clearSettings ();
		}
		
		/*[internal]*/ private clearRegisters ():void {
			
			var numFloats = Context3DStateCache.MAX_NUM_REGISTERS * Context3DStateCache.FLOATS_PER_REGISTER;
			
			for (var c = 0; c < numFloats; ++c) {
				
				this._registers [c] = -999999999.0;
				
			}
			
		}
		
		
		/*[internal]*/ public clearSettings ():void {
			
			this._srcBlendFactor = null;
			this._srcBlendFactorAlpha = null;
			this._destBlendFactor = null;
			this._destBlendFactorAlpha = null;
			this._equation = null;
			this._equationAlpha = null;
			this._depthTestEnabled = false;
			this._depthTestMask = false;
			this._depthTestCompareMode = null;
			this._program = null;
			this._cullingMode = null;
			this._activeTexture = -1;
			this._activeVertexArray = -1;
			this._viewportOriginX = -1;
			this._viewportOriginY = -1;
			this._viewportWidth = -1;
			this._viewportHeight = -1;
			
			this.clearRegisters ();
			
		}
		
		
		/*[internal]*/ public updateActiveTextureSample (texture:number):boolean {
			
			// texture = ((texture) >> 0);
			
			if (!Context3DStateCache.disableCache && texture == this._activeTexture) {
				
				return false;
				
			}
			
			this._activeTexture = texture;
			return true;
			
		}
		
		
		/*[internal]*/ public updateActiveVertexArray (vertexArray:number):boolean {
			
			// vertexArray = ((vertexArray) >> 0);
			
			if (!Context3DStateCache.disableCache && vertexArray == this._activeVertexArray) {
				
				return false;
				
			}
			
			this._activeVertexArray = vertexArray;
			return true;
			
		}
		
		
		/*[internal]*/ public updateBlendDestFactor (factor:string):boolean {
			
			// factor = as(factor, 'String');
			
			if (!Context3DStateCache.disableCache && factor == this._destBlendFactor) {
				
				return false;
				
			}
			
			this._destBlendFactor = factor;
			return true;
			
		}
		
		
		/*[internal]*/ public updateBlendSrcFactor (factor:string):boolean {
			
			// factor = as(factor, 'String');
			
			if (!Context3DStateCache.disableCache && factor == this._srcBlendFactor) {
				
				return false;
				
			}
			
			this._srcBlendFactor = factor;
			return true;
			
		}
		
		
		/*[internal]*/ public updateBlendEquation (equation:string):boolean {
			
			// equation = as(equation, 'String');
			
			if (!Context3DStateCache.disableCache && equation == this._equation) {
				
				return false;
				
			}
			
			this._equation = equation;
			return true;
			
		}
		
		
		/*[internal]*/ public updateBlendDestFactorAlpha (factor:string):boolean {
			
			// factor = as(factor, 'String');
			
			if (!Context3DStateCache.disableCache && factor == this._destBlendFactorAlpha) {
				
				return false;
				
			}
			
			this._destBlendFactorAlpha = factor;
			return true;
			
		}
		
		
		/*[internal]*/ public updateBlendSrcFactorAlpha (factor:string):boolean {
			
			// factor = as(factor, 'String');
			
			if (!Context3DStateCache.disableCache && factor == this._srcBlendFactorAlpha) {
				
				return false;
				
			}
			
			this._srcBlendFactorAlpha = factor;
			return true;
			
		}
		
		
		/*[internal]*/ public updateBlendEquationAlpha (equation:string):boolean {
			
			// equation = as(equation, 'String');
			
			if (!Context3DStateCache.disableCache && equation == this._equationAlpha) {
				
				return false;
				
			}
			
			this._equationAlpha = equation;
			return true;
			
		}
		
		
		/*[internal]*/ public updateCullingMode (cullMode:string):boolean {
			
			// cullMode = as(cullMode, 'String');
			
			if (!Context3DStateCache.disableCache && cullMode == this._cullingMode) {
				
				return false;
				
			}
			
			this._cullingMode = cullMode;
			return true;
			
		}
		
		
		/*[internal]*/ public updateDepthCompareMode (mode:string):boolean {
			
			// mode = as(mode, 'String');
			
			if (!Context3DStateCache.disableCache && mode == this._depthTestCompareMode) {
				
				return false;
				
			}
			
			this._depthTestCompareMode = mode;
			return true;
			
		}
		
		
		/*[internal]*/ public updateDepthTestEnabled (test:boolean):boolean {
			
			// test = Boolean(test);
			
			if (!Context3DStateCache.disableCache && test == this._depthTestEnabled) {
				
				return false;
				
			}
			
			this._depthTestEnabled = test;
			return true;
			
		}
		
		
		/*[internal]*/ public updateDepthTestMask (mask:boolean):boolean {
			
			// mask = Boolean(mask);
			
			if (!Context3DStateCache.disableCache && mask == this._depthTestMask) {
				
				return false;
				
			}
			
			this._depthTestMask = mask;
			return true;
			
		}
		
		
		/*[internal]*/ public updateProgram3D (program3d:Program3D):boolean {
			
			// program3d = strict(program3d, Program3D);
			
			if (!Context3DStateCache.disableCache && program3d == this._program) {
				
				return false;
				
			}
			
			this._program = program3d;
			return true;
			
		}
		
		
		/*[internal]*/ public updateRegisters (mTemp:number[], startRegister:number, numRegisters:number):boolean {
			
			// startRegister = ((startRegister) >> 0); numRegisters = ((numRegisters) >> 0);
			
			return true;
			
			/*Bool needToUpdate		= false;
			Int  startFloat 		= startRegister * FLOATS_PER_REGISTER;
			Int  numFloat   		= numRegisters  * FLOATS_PER_REGISTER;
			Int  inCounter 			= 0;
			
			while (numFloat != 0)
			{
			if (_registers [startFloat] != mTemp [inCounter]) 
			{
			_registers [startFloat] = mTemp [inCounter];
			needToUpdate = true;
			}
			
			--numFloat;
			++startFloat;
			++inCounter;
			}
			
			return needToUpdate;*/
			
		}
		
		
		/*[internal]*/ public updateViewport (originX:number, originY:number, width:number, height:number):boolean {
			
			// originX = ((originX) >> 0); originY = ((originY) >> 0); width = ((width) >> 0); height = ((height) >> 0);
			
			if (!Context3DStateCache.disableCache && this._viewportOriginX == originX && this._viewportOriginY == originY && this._viewportWidth == width && this._viewportHeight == height) {
				
				return false;
				
			}
			
			this._viewportOriginX = originX;
			this._viewportOriginY = originY;
			this._viewportWidth = width;
			this._viewportHeight = height;
			
			return true;
			
		}
		
		
	}
}