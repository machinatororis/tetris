/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/consts/SoundCompression.ts" />
/// <reference path="../data/consts/SoundType.ts" />
/// <reference path="../data/consts/SoundSize.ts" />
/// <reference path="../data/consts/SoundRate.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SoundRate = flash.__native.format.swf.data.consts.SoundRate;
	export import SoundSize = flash.__native.format.swf.data.consts.SoundSize;
	export import SoundType = flash.__native.format.swf.data.consts.SoundType;
	export import SoundCompression = flash.__native.format.swf.data.consts.SoundCompression;
	
	
	export  class TagSoundStreamHead2 extends TagSoundStreamHead implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 45;
		
		constructor() {
			super(); }
		
		/*override*/ public get type():number { return TagSoundStreamHead2.TYPE; }
		/*override*/ public get name():string { return "SoundStreamHead2"; }
		/*override*/ public get version():number { return 3; }
		/*override*/ public get level():number { return 2; }

		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent);
			if(this.streamSoundSampleCount > 0) {
				str += "Format: " + SoundCompression.toString(this.streamSoundCompression) + ", " +
					"Rate: " + SoundRate.toString(this.streamSoundRate) + ", " +
					"Size: " + SoundSize.toString(this.streamSoundSize) + ", " +
					"Type: " + SoundType.toString(this.streamSoundType) + ", ";
			}
			str += "Samples: " + this.streamSoundSampleCount;
			return str;
		}
	}

}