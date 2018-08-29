/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />

namespace flash.__native.format.swf.timeline
{
	export import StringUtils = flash.__native.utils.StringUtils;
	

	export  class Layer
	{
		/*[internal]*/ public depth : number = 0;
		/*[internal]*/ public frameCount : number = 0;
		
		/*[internal]*/ public frameStripMap : any[];
		/*[internal]*/ public strips : any[];
		
		constructor (depth : number, frameCount : number)
		{
			/**/ depth = ((depth) >>> 0); frameCount = ((frameCount) >>> 0);
			this.depth = depth;
			this.frameCount = frameCount;
			this.frameStripMap = [];
			this.strips = [];
		}
		
		public appendStrip(type:number, start:number, end:number):void {
			/**/ type = ((type) >>> 0); start = ((start) >>> 0); end = ((end) >>> 0);
			if(type != LayerStrip.TYPE_EMPTY) {
				var i:number = 0;
				var stripIndex:number = this.strips.length;
				if(stripIndex == 0 && start > 0) {
					for(i = 0; i < start; i++) {
						this.frameStripMap[i] = stripIndex;
					}
					this.strips[stripIndex++] = new LayerStrip(LayerStrip.TYPE_SPACER, 0, start - 1);
				} else if(stripIndex > 0) {
					var prevStrip:LayerStrip =  strict(as(this.strips[stripIndex - 1] , LayerStrip), LayerStrip);
					if(prevStrip.endFrameIndex + 1 < start) {
						for(i = prevStrip.endFrameIndex + 1; i < start; i++) {
							this.frameStripMap[i] = stripIndex;
						}
						this.strips[stripIndex++] = new LayerStrip(LayerStrip.TYPE_SPACER, prevStrip.endFrameIndex + 1, start - 1);
					}
				}
				for(i = start; i <= end; i++) {
					this.frameStripMap[i] = stripIndex;
				}
				this.strips[stripIndex] = new LayerStrip(type, start, end);
			}
		}
		
		public getStripsForFrameRegion(start:number, end:number):any[] {
			/**/ start = ((start) >>> 0); end = ((end) >>> 0);
			if(start >= this.frameStripMap.length || end < start) {
				return [];
			}
			var startStripIndex:number =  ((this.frameStripMap[start]) >>> 0);
			var endStripIndex:number =  (((end >= this.frameStripMap.length) ? this.strips.length - 1 : this.frameStripMap[end) >>> 0)];
			return this.strips.slice(startStripIndex, endStripIndex + 1);
		}
		
		public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "Depth: " + this.depth + ", Frames: " + this.frameCount;
			if(this.strips.length > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Strips:";
				for(var i:number = 0, len:number = this.strips.length; i < len; i++) {
					var strip:LayerStrip =  strict(as(this.strips[i] , LayerStrip), LayerStrip);
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + strip.toString();
				}
			}
			return str;
		}
	}
}