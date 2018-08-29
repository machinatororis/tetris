/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFTimelineContainer.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
	
	
	export  class TagDefineSprite extends SWFTimelineContainer implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE : number = 39;
		
		/*[internal]*/ public frameCount : number;
		
		/*[internal]*/ protected _characterId : number;
		
		/*[internal]*/ public get characterId () : number { return this._characterId; }
		/*[internal]*/ public set characterId (value : number) { // value = ((value) >>> 0); this._characterId = value; }
		
		/*[internal]*/ public parse (data : SWFData, length : number, version : number, async : boolean = false) : void
		{
			// data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.frameCount = data.readUI16();
			
			if (async) {
			
				this.parseTagsAsync (data, version);
			
			} else {
			
				this.parseTags (data, version);
			
			}
		}
		
		public publish(data:SWFData, version:number):void
		{
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData;
			body.writeUI16(this.characterId);
			body.writeUI16(this.frameCount); // TODO: get the real number of frames from controlTags
			this.publishTags(body, version);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag
		{
			var tag:TagDefineSprite = new TagDefineSprite();
			throw(new Error("Not implemented yet."));
			return tag;
		}
		
		public get type():number { return TagDefineSprite.TYPE; }
		public get name():string { return "DefineSprite"; }
		public get version():number { return 3; }
		public get level():number { return 1; }
	
		/*override*/ public toString(indent:number = 0, flags:number = 0):string
		{
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) + 
				"ID: " + this.characterId + ", " +
				"FrameCount: " + this.frameCount +
				super.toString(indent);
		}
	}

}