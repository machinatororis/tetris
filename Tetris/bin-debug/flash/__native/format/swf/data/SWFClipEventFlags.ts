/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFClipEventFlags
	{
		public keyUpEvent:boolean = false;
		public keyDownEvent:boolean = false;
		public mouseUpEvent:boolean = false;
		public mouseDownEvent:boolean = false;
		public mouseMoveEvent:boolean = false;
		public unloadEvent:boolean = false;
		public enterFrameEvent:boolean = false;
		public loadEvent:boolean = false;
		public dragOverEvent:boolean = false; // SWF6
		public rollOutEvent:boolean = false; // SWF6
		public rollOverEvent:boolean = false; // SWF6
		public releaseOutsideEvent:boolean = false; // SWF6
		public releaseEvent:boolean = false; // SWF6
		public pressEvent:boolean = false; // SWF6
		public initializeEvent:boolean = false; // SWF6
		public dataEvent:boolean = false;
		public constructEvent:boolean = false; // SWF7
		public keyPressEvent:boolean = false; // SWF6
		public dragOutEvent:boolean = false; // SWF6
		
		constructor(data:SWFData = null, version:number = 0) {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			if (data != null) {
				this.parse(data, version);
			}
		}
		
		public parse(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var flags1:number = data.readUI8();
			this.keyUpEvent = ((flags1 & 0x80) != 0);
			this.keyDownEvent = ((flags1 & 0x40) != 0);
			this.mouseUpEvent = ((flags1 & 0x20) != 0);
			this.mouseDownEvent = ((flags1 & 0x10) != 0);
			this.mouseMoveEvent = ((flags1 & 0x08) != 0);
			this.unloadEvent = ((flags1 & 0x04) != 0);
			this.enterFrameEvent = ((flags1 & 0x02) != 0);
			this.loadEvent = ((flags1 & 0x01) != 0);
			var flags2:number = data.readUI8();
			this.dragOverEvent = ((flags2 & 0x80) != 0);
			this.rollOutEvent = ((flags2 & 0x40) != 0);
			this.rollOverEvent = ((flags2 & 0x20) != 0);
			this.releaseOutsideEvent = ((flags2 & 0x10) != 0);
			this.releaseEvent = ((flags2 & 0x08) != 0);
			this.pressEvent = ((flags2 & 0x04) != 0);
			this.initializeEvent = ((flags2 & 0x02) != 0);
			this.dataEvent = ((flags2 & 0x01) != 0);
			if (version >= 6) {
				var flags3:number = data.readUI8();
				this.constructEvent = ((flags3 & 0x04) != 0);
				this.keyPressEvent = ((flags3 & 0x02) != 0);
				this.dragOutEvent = ((flags3 & 0x01) != 0);
				data.readUI8(); // reserved, always 0
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var flags1:number = 0;
			if(this.keyUpEvent) { flags1 |= 0x80; }
			if(this.keyDownEvent) { flags1 |= 0x40; }
			if(this.mouseUpEvent) { flags1 |= 0x20; }
			if(this.mouseDownEvent) { flags1 |= 0x10; }
			if(this.mouseMoveEvent) { flags1 |= 0x08; }
			if(this.unloadEvent) { flags1 |= 0x04; }
			if(this.enterFrameEvent) { flags1 |= 0x02; }
			if(this.loadEvent) { flags1 |= 0x01; }
			data.writeUI8(flags1);
			var flags2:number = 0;
			if(this.dragOverEvent) { flags2 |= 0x80; }
			if(this.rollOutEvent) { flags2 |= 0x40; }
			if(this.rollOverEvent) { flags2 |= 0x20; }
			if(this.releaseOutsideEvent) { flags2 |= 0x10; }
			if(this.releaseEvent) { flags2 |= 0x08; }
			if(this.pressEvent) { flags2 |= 0x04; }
			if(this.initializeEvent) { flags2 |= 0x02; }
			if(this.dataEvent) { flags2 |= 0x01; }
			data.writeUI8(flags2);
			if (version >= 6) {
				var flags3:number = 0;
				if(this.constructEvent) { flags3 |= 0x04; }
				if(this.keyPressEvent) { flags3 |= 0x02; }
				if(this.dragOutEvent) { flags3 |= 0x01; }
				data.writeUI8(flags3);
				data.writeUI8(0); // reserved, always 0
			}
		}
		
		public toString():string {
			var a:any[] = [];
			if (this.keyUpEvent) { a.push("keyup"); }
			if (this.keyDownEvent) { a.push("keydown"); }
			if (this.mouseUpEvent) { a.push("mouseup"); }
			if (this.mouseDownEvent) { a.push("mousedown"); }
			if (this.mouseMoveEvent) { a.push("mousemove"); }
			if (this.unloadEvent) { a.push("unload"); }
			if (this.enterFrameEvent) { a.push("enterframe"); }
			if (this.loadEvent) { a.push("load"); }
			if (this.dragOverEvent) { a.push("dragover"); }
			if (this.rollOutEvent) { a.push("rollout"); }
			if (this.rollOverEvent) { a.push("rollover"); }
			if (this.releaseOutsideEvent) { a.push("releaseoutside"); }
			if (this.releaseEvent) { a.push("release"); }
			if (this.pressEvent) { a.push("press"); }
			if (this.initializeEvent) { a.push("initialize"); }
			if (this.dataEvent) { a.push("data"); }
			if (this.constructEvent) { a.push("construct"); }
			if (this.keyPressEvent) { a.push("keypress"); }
			if (this.dragOutEvent) { a.push("dragout"); }
			return a.join(",");
		}
	}

}