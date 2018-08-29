/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../geom/Matrix.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	export import Matrix = flash.geom.Matrix;
	
	
	export  class SWFMatrix
	{
		/*[internal]*/ public scaleX : number = 1.0;
		/*[internal]*/ public scaleY : number = 1.0;
		/*[internal]*/ public rotateSkew0 : number = 0.0;
		/*[internal]*/ public rotateSkew1 : number = 0.0;
		/*[internal]*/ public translateX : number = 0;
		/*[internal]*/ public translateY : number = 0;
		/*[internal]*/ public matrix : Matrix;
		
		/**
		 * Constructor 
		 * @param data
		 * 
		 */		
		/*[internal]*/ constructor (data : SWFData)
		{
			// data = strict(data, SWFData);
			if (data != null) {
				
				this.parse(data);
				
			}
		}
		
		public updateMatrix () : void
		{
			if (!this.matrix) {
				
				this.matrix = new Matrix(this.scaleX, this.rotateSkew0, this.rotateSkew1, this.scaleY, this.translateX / 20, this.translateY / 20);
				
			} else {
				
				this.matrix.__setTo(this.scaleX, this.rotateSkew0, this.rotateSkew1, this.scaleY, this.translateX / 20, this.translateY / 20);
				
			}
		}
		
		/*[internal]*/ public parse (data : SWFData) : void
		{
			// data = strict(data, SWFData);
			data.resetBitsPending();
			this.scaleX = 1.0;
			this.scaleY = 1.0;
			
			if (data.readUB(1) == 1) {
				
				var scaleBits : number = data.readUB(5);
				this.scaleX = data.readFB(scaleBits);
				this.scaleY = data.readFB(scaleBits);
				
			}
			
			this.rotateSkew0 = 0.0;
			this.rotateSkew1 = 0.0;
			
			if (data.readUB(1) == 1) {
				
				var rotateBits : number = data.readUB(5);
				this.rotateSkew0 = data.readFB(rotateBits);
				this.rotateSkew1 = data.readFB(rotateBits);
				
			}
			
			var translateBits : number = data.readUB(5);
			this.translateX = data.readSB(translateBits);
			this.translateY = data.readSB(translateBits);
			
			this.updateMatrix();
		}
		
		public clone () : SWFMatrix
		{
			var matrix = new SWFMatrix;
			
			matrix.scaleX = this.scaleX;
			matrix.scaleY = this.scaleY;
			matrix.rotateSkew0 = this.rotateSkew0;
			matrix.rotateSkew1 = this.rotateSkew1;
			matrix.translateX = this.translateX;
			matrix.translateY = this.translateY;
			matrix.updateMatrix();
			
			return matrix;
		}
		
		public isIdentity () : boolean
		{
			return (this.scaleX == 1 && this.scaleY == 1
				&& this.rotateSkew0 == 0 && this.rotateSkew1 == 0 && this.translateX == 0 && this.translateY == 0);
		}
		
		public toString () : string
		{
			return "(" + this.scaleX + "," + this.rotateSkew0 + "," + this.rotateSkew1 + "," + this.scaleY + "," + this.translateX + "," + this.translateY + ")";
		}
	}

}