/// <reference path="../../../base.d.ts" />
/// <reference path="../../geom/Rectangle.ts" />

namespace flash.__native.utils
{
	
	export import Rectangle = flash.geom.Rectangle;
	

	/**
	 * Faster release version of bounds.
	 * @author pkulikov
	 * 
	 */	
	export  class Bounds
	{
		public xMin: number = NaN;
		public yMin: number = NaN;
		public xMax: number = NaN;
		public yMax: number = NaN;
		
		/**
		 * Constructor 
		 * @param xMin
		 * @param yMin
		 * @param xMax
		 * @param yMax
		 * 
		 */		
		constructor(xMin: number = 0x8000000, yMin: number = 0x8000000, xMax: number = 0x8000000, yMax: number = 0x8000000)
		{
			/**/ xMin = (+(xMin)); yMin = (+(yMin)); xMax = (+(xMax)); yMax = (+(yMax));
			this.xMin = xMin;
			this.yMin = yMin;
			this.xMax = xMax;
			this.yMax = yMax;
		}
		
		public static fromRectangle (source: Rectangle): Bounds {
			/**/ source = strict(source, Rectangle);
			return new Bounds(source.x, source.y, (source.x + source.width), (source.y + source.height));
		}
		
		public setElements (xMin: number, yMin: number, xMax: number, yMax: number): void {
			/**/ xMin = (+(xMin)); yMin = (+(yMin)); xMax = (+(xMax)); yMax = (+(yMax));
			this.xMin = xMin;
			this.yMin = yMin;
			this.xMax = xMax;
			this.yMax = yMax;
		}
		
		public copyFrom (source: Bounds): void {
			/**/ source = strict(source, Bounds);
			this.setElements(source.xMin, source.yMin, source.xMax, source.yMax);
		}
		
		public contains (x: number, y: number): boolean {
			/**/ x = (+(x)); y = (+(y));
			return x < this.xMin != x < this.xMax &&
				y < this.yMin != y < this.yMax;
		}
		
		public unionInPlace (other: Bounds): void {
			/**/ other = strict(other, Bounds);
			if (other.isEmpty()) {
				return;
			}
			this.extendByPoint(other.xMin, other.yMin);
			this.extendByPoint(other.xMax, other.yMax);
		}
		
		public extendByPoint (x: number, y: number): void {
			/**/ x = (+(x)); y = (+(y));
			this.extendByX(x);
			this.extendByY(y);
		}
		
		public extendByX (x: number): void {
			/**/ x = (+(x));
			// Exclude default values.
			if (this.xMin == 0x8000000) {
				this.xMin = this.xMax = x;
				return;
			}
			this.xMin = Math.min(this.xMin, x);
			this.xMax = Math.max(this.xMax, x);
		}
		
		public extendByY (y: number): void {
			/**/ y = (+(y));
			// Exclude default values.
			if (this.yMin == 0x8000000) {
				this.yMin = this.yMax = y;
				return;
			}
			this.yMin = Math.min(this.yMin, y);
			this.yMax = Math.max(this.yMax, y);
		}
		
		public intersects(toIntersect: Bounds): boolean {
			/**/ toIntersect = strict(toIntersect, Bounds);
			return this.contains(toIntersect.xMin, toIntersect.yMin) ||
				this.contains(toIntersect.xMax, toIntersect.yMax);
		}
		
		public isEmpty (): boolean {
			return this.xMax <= this.xMin || this.yMax <= this.yMin;
		}
		
		public get width(): number {
			return this.xMax - this.xMin;
		}
		
		public set width(value: number) {
			/**/ value = (+(value));
			this.xMax = this.xMin + value;
		}
		
		public get height(): number {
			return this.yMax - this.yMin;
		}
		
		public set height(value: number) {
			/**/ value = (+(value));
			this.yMax = this.yMin + value;
		}
		
		public getBaseWidth(angle: number): number {
			/**/ angle = (+(angle));
			var u = Math.abs(Math.cos(angle));
			var v = Math.abs(Math.sin(angle));
			return u * (this.xMax - this.xMin) + v * (this.yMax - this.yMin);
		}
		
		public getBaseHeight(angle: number): number {
			/**/ angle = (+(angle));
			var u = Math.abs(Math.cos(angle));
			var v = Math.abs(Math.sin(angle));
			return v * (this.xMax - this.xMin) + u * (this.yMax - this.yMin);
		}
		
		public setEmpty (): void {
			this.xMin = this.yMin = this.xMax = this.yMax = 0;
		}
		
		/**
		 * Set all fields to the sentinel value 0x8000000.
		 *
		 * This is what Flash uses to indicate uninitialized bounds. Important for bounds calculation
		 * in `Graphics` instances, which start out with empty bounds but must not just extend them
		 * from an 0,0 origin.
		 */
		public setToSentinels (): void {
			this.xMin = this.yMin = this.xMax = this.yMax = 0x8000000;
		}
		
		public clone (): Bounds {
			return new Bounds(this.xMin, this.yMin, this.xMax, this.yMax);
		}
		
		/*override*/ public toString(): string {
			return "{ " +
				"xMin: " + this.xMin + ", " +
				"xMin: " + this.yMin + ", " +
				"xMax: " + this.xMax + ", " +
				"xMax: " + this.yMax +
				" }";
		}
	}
}