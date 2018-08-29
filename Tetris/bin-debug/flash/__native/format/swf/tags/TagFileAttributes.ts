/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagFileAttributes implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 69;
		
		public useDirectBlit:boolean = false;
		public useGPU:boolean = false;
		public hasMetadata:boolean = false;
		public actionscript3:boolean = true;
		public useNetwork:boolean = false;

		constructor() {}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			var flags:number = data.readUI8();
			this.useDirectBlit = ((flags & 0x40) != 0);
			this.useGPU = ((flags & 0x20) != 0);
			this.hasMetadata = ((flags & 0x10) != 0);
			this.actionscript3 = ((flags & 0x08) != 0);
			this.useNetwork = ((flags & 0x01) != 0);
			data.skipBytes(3);
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, 4);
			var flags:number = 0;
			if (this.useNetwork) { flags |= 0x01; }
			if (this.actionscript3) { flags |= 0x08; }
			if (this.hasMetadata) { flags |= 0x10; }
			if (this.useGPU) { flags |= 0x20; }
			if (this.useDirectBlit) { flags |= 0x40; }
			data.writeUI8(flags);
			data.writeUI8(0);
			data.writeUI8(0);
			data.writeUI8(0);
		}
		
		public get type():number { return TagFileAttributes.TYPE; }
		public get name():string { return "FileAttributes"; }
		public get version():number { return 8; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"AS3: " + this.actionscript3 + ", " +
				"HasMetadata: " + this.hasMetadata + ", " +
				"UseDirectBlit: " + this.useDirectBlit + ", " +
				"UseGPU: " + this.useGPU + ", " +
				"UseNetwork: " + this.useNetwork;
		}
	}

}