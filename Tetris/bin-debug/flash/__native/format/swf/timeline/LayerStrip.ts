/// <reference path="../../../../../base.d.ts" />

namespace flash.__native.format.swf.timeline
{
	
	export  class LayerStrip
	{
		public static TYPE_EMPTY:number = 0;
		public static TYPE_SPACER:number = 1;
		public static TYPE_STATIC:number = 2;
		public static TYPE_MOTIONTWEEN:number = 3;
		public static TYPE_SHAPETWEEN:number = 4;
		
		public type:number = LayerStrip.TYPE_EMPTY;
		public startFrameIndex:number = 0;
		public endFrameIndex:number = 0;
		
		constructor(type:number, startFrameIndex:number, endFrameIndex:number)
		{
			/**/ type = ((type) >>> 0); startFrameIndex = ((startFrameIndex) >>> 0); endFrameIndex = ((endFrameIndex) >>> 0);
			this.type = type;
			this.startFrameIndex = startFrameIndex;
			this.endFrameIndex = endFrameIndex;
		}
		
		public toString():string {
			var str:string;
			if(this.startFrameIndex == this.endFrameIndex) {
				str = "Frame: " + this.startFrameIndex;
			} else {
				str = "Frames: " + this.startFrameIndex + "-" + this.endFrameIndex;
			}
			str += ", Type: ";
			switch(this.type) {
				case LayerStrip.TYPE_EMPTY: str += "EMPTY"; break;
				case LayerStrip.TYPE_SPACER: str += "SPACER"; break;
				case LayerStrip.TYPE_STATIC: str += "STATIC"; break;
				case LayerStrip.TYPE_MOTIONTWEEN: str += "MOTIONTWEEN"; break;
				case LayerStrip.TYPE_SHAPETWEEN: str += "SHAPETWEEN"; break;
				default: str += "unknown"; break;
			}
			return str;
		}
	}
}