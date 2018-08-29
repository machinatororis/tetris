/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/SWFRectangle.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
	
	
	export  class TagDefineEditText implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 37;
		
		public bounds:SWFRectangle = null;
		public variableName:string = null;
		
		public hasText:boolean = false;
		public wordWrap:boolean = false;
		public multiline:boolean = false;
		public password:boolean = false;
		public readOnly:boolean = false;
		public hasTextColor:boolean = false;
		public hasMaxLength:boolean = false;
		public hasFont:boolean = false;
		public hasFontClass:boolean = false;
		public autoSize:boolean = false;
		public hasLayout:boolean = false;
		public noSelect:boolean = false;
		public border:boolean = false;
		public wasStatic:boolean = false;
		public html:boolean = false;
		public useOutlines:boolean = false;
		
		public fontId:number = 0;
		public fontClass:string = null;
		public fontHeight:number = 0;
		public textColor:number = 0;
		public maxLength:number = 0;
		public align:number = 0;
		public leftMargin:number = 0;
		public rightMargin:number = 0;
		public indent:number = 0;
		public leading:number = 0;
		public initialText:string = null;

		protected _characterId:number = 0;
		
		constructor() {}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.bounds = data.readRECT();
			var flags1:number = data.readUI8();
			this.hasText = ((flags1 & 0x80) != 0);
			this.wordWrap = ((flags1 & 0x40) != 0);
			this.multiline = ((flags1 & 0x20) != 0);
			this.password = ((flags1 & 0x10) != 0);
			this.readOnly = ((flags1 & 0x08) != 0);
			this.hasTextColor = ((flags1 & 0x04) != 0);
			this.hasMaxLength = ((flags1 & 0x02) != 0);
			this.hasFont = ((flags1 & 0x01) != 0);
			var flags2:number = data.readUI8();
			this.hasFontClass = ((flags2 & 0x80) != 0);
			this.autoSize = ((flags2 & 0x40) != 0);
			this.hasLayout = ((flags2 & 0x20) != 0);
			this.noSelect = ((flags2 & 0x10) != 0);
			this.border = ((flags2 & 0x08) != 0);
			this.wasStatic = ((flags2 & 0x04) != 0);
			this.html = ((flags2 & 0x02) != 0);
			this.useOutlines = ((flags2 & 0x01) != 0);
			if (this.hasFont) {
				this.fontId = data.readUI16();
			}
			if (this.hasFontClass) {
				this.fontClass = data.readString();
			}
			if (this.hasFont) {
				this.fontHeight = data.readUI16();
			}
			if (this.hasTextColor) {
				this.textColor = data.readRGBA();
			}
			if (this.hasMaxLength) {
				this.maxLength = data.readUI16();
			}
			if (this.hasLayout) {
				this.align = data.readUI8();
				this.leftMargin = data.readUI16();
				this.rightMargin = data.readUI16();
				this.indent = data.readUI16();
				this.leading = data.readSI16();
			}
			this.variableName = data.readString();
			if (this.hasText) {
				this.initialText = data.readString();
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			body.writeRECT(this.bounds);
			var flags1:number = 0;
			if(this.hasText) { flags1 |= 0x80; }
			if(this.wordWrap) { flags1 |= 0x40; }
			if(this.multiline) { flags1 |= 0x20; }
			if(this.password) { flags1 |= 0x10; }
			if(this.readOnly) { flags1 |= 0x08; }
			if(this.hasTextColor) { flags1 |= 0x04; }
			if(this.hasMaxLength) { flags1 |= 0x02; }
			if(this.hasFont) { flags1 |= 0x01; }
			body.writeUI8(flags1);
			var flags2:number = 0;
			if(this.hasFontClass) { flags2 |= 0x80; }
			if(this.autoSize) { flags2 |= 0x40; }
			if(this.hasLayout) { flags2 |= 0x20; }
			if(this.noSelect) { flags2 |= 0x10; }
			if(this.border) { flags2 |= 0x08; }
			if(this.wasStatic) { flags2 |= 0x04; }
			if(this.html) { flags2 |= 0x02; }
			if(this.useOutlines) { flags2 |= 0x01; }
			body.writeUI8(flags2);
			if (this.hasFont) {
				body.writeUI16(this.fontId);
			}
			if (this.hasFontClass) {
				body.writeString(this.fontClass);
			}
			if (this.hasFont) {
				body.writeUI16(this.fontHeight);
			}
			if (this.hasTextColor) {
				body.writeRGBA(this.textColor);
			}
			if (this.hasMaxLength) {
				body.writeUI16(this.maxLength);
			}
			if (this.hasLayout) {
				body.writeUI8(this.align);
				body.writeUI16(this.leftMargin);
				body.writeUI16(this.rightMargin);
				body.writeUI16(this.indent);
				body.writeSI16(this.leading);
			}
			body.writeString(this.variableName);
			if (this.hasText) {
				body.writeString(this.initialText);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag {
			var tag:TagDefineEditText = new TagDefineEditText();
			tag.characterId = this.characterId;
			tag.bounds = this.bounds.clone();
			tag.variableName = this.variableName;
			tag.hasText = this.hasText;
			tag.wordWrap = this.wordWrap;
			tag.multiline = this.multiline;
			tag.password = this.password;
			tag.readOnly = this.readOnly;
			tag.hasTextColor = this.hasTextColor;
			tag.hasMaxLength = this.hasMaxLength;
			tag.hasFont = this.hasFont;
			tag.hasFontClass = this.hasFontClass;
			tag.autoSize = this.autoSize;
			tag.hasLayout = this.hasLayout;
			tag.noSelect = this.noSelect;
			tag.border = this.border;
			tag.wasStatic = this.wasStatic;
			tag.html = this.html;
			tag.useOutlines = this.useOutlines;
			tag.fontId = this.fontId;
			tag.fontClass = this.fontClass;
			tag.fontHeight = this.fontHeight;
			tag.textColor = this.textColor;
			tag.maxLength = this.maxLength;
			tag.align = this.align;
			tag.leftMargin = this.leftMargin;
			tag.rightMargin = this.rightMargin;
			tag.indent = this.indent;
			tag.leading = this.leading;
			tag.initialText = this.initialText;
			return tag;
		}
		
		public get type():number { return TagDefineEditText.TYPE; }
		public get name():string { return "DefineEditText"; }
		public get version():number { return 4; }
		public get level():number { return 1; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				((this.hasText && this.initialText.length > 0) ? "Text: " + this.initialText + ", " : "") +
				((this.variableName.length > 0) ? "VariableName: " + this.variableName + ", " : "") +
				"Bounds: " + this.bounds;
			return str;
		}
	}

}