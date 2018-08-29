/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagPlaceObject2 extends TagPlaceObject implements IDisplayListTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDisplayListTag = null;
		public static TYPE : number = 26;
		
		/*[internal]*/ /*override*/ public parse (data : SWFData, length : number, version : number, async : boolean = false) : void
		{
			// data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			var flags : number = data.readUI8();
			this.hasClipActions = (flags & 0x80) != 0;
			this.hasClipDepth = (flags & 0x40) != 0;
			this.hasName = (flags & 0x20) != 0;
			this.hasRatio = (flags & 0x10) != 0;
			this.hasColorTransform = (flags & 0x08) != 0;
			this.hasMatrix = (flags & 0x04) != 0;
			this.hasCharacter = (flags & 0x02) != 0;
			this.hasMove = (flags & 0x01) != 0;
			this.depth = data.readUI16();
			
			if (this.hasCharacter) {
				this.characterId = data.readUI16();
			}
			
			if (this.hasMatrix) {
				this.matrix = data.readMATRIX();
			}
			
			if (this.hasColorTransform) {
				this.colorTransform = data.readCXFORMWITHALPHA();
			}
			
			if (this.hasRatio) {
				this.ratio = data.readUI16();
			}
			
			if (this.hasName) {
				this.instanceName = data.readString();
			}
			
			if (this.hasClipDepth) {
				this.clipDepth = data.readUI16();
			}
			
			if (this.hasClipActions) {
				this.clipActions = data.readCLIPACTIONS(version);
			}
		}
		
		/*override*/ public publish (data : SWFData, version : number) : void
		{
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var flags:number = 0;
			var body:SWFData = new SWFData();
			
			if (this.hasMove) { flags |= 0x01; }
			if (this.hasCharacter) { flags |= 0x02; }
			if (this.hasMatrix) { flags |= 0x04; }
			if (this.hasColorTransform) { flags |= 0x08; }
			if (this.hasRatio) { flags |= 0x10; }
			if (this.hasName) { flags |= 0x20; }
			if (this.hasClipDepth) { flags |= 0x40; }
			if (this.hasClipActions) { flags |= 0x80; }
			
			body.writeUI8(flags);
			body.writeUI16(this.depth);
			
			if (this.hasCharacter) {
				body.writeUI16(this.characterId);
			}
			
			if (this.hasMatrix) {
				body.writeMATRIX(this.matrix);
			}
			
			if (this.hasColorTransform) {
				body.writeCXFORM(this.colorTransform);
			}
			
			if (this.hasRatio) {
				body.writeUI16(this.ratio);
			}
			
			if (this.hasName) {
				body.writeString(this.instanceName);
			}
			
			if (this.hasClipDepth) {
				body.writeUI16(this.clipDepth);
			}
			
			if (this.hasClipActions) {
				body.writeCLIPACTIONS(this.clipActions, version);
			}
			
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		/*override*/ public get type () : number { return TagPlaceObject2.TYPE; }
		/*override*/ public get name () : string { return "PlaceObject2"; }
		/*override*/ public get version () : number { return 3; }
		/*override*/ public get level () : number { return 2; }

		/*override*/ public toString (indent : number = 0, flags : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"Depth: " + this.depth;
			if (this.hasCharacter) { str += ", CharacterID: " + this.characterId; }
			if (this.hasMatrix) { str += ", Matrix: " + this.matrix.toString(); }
			if (this.hasColorTransform) { str += ", ColorTransform: " + this.colorTransform; }
			if (this.hasRatio) { str += ", Ratio: " + this.ratio; }
			if (this.hasName) { str += ", Name: " + this.instanceName; }
			if (this.hasClipDepth) { str += ", ClipDepth: " + this.clipDepth; }
			if (this.hasClipActions && this.clipActions != null) {
				str += "\n" + StringUtils.repeat(indent + 2) + this.clipActions.toString(indent + 2, flags);
			}
			return str;
		}
	}

}