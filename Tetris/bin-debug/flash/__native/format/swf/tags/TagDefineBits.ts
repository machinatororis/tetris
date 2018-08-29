/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../../../../events/IOErrorEvent.ts" />
/// <reference path="../../../../events/Event.ts" />
/// <reference path="../../../../display/Loader.ts" />
/// <reference path="../../../../display/BitmapData.ts" />
/// <reference path="../../../../display/Bitmap.ts" />
/// <reference path="../data/consts/BitmapType.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import BitmapType = flash.__native.format.swf.data.consts.BitmapType;
	export import Bitmap = flash.display.Bitmap;
	export import BitmapData = flash.display.BitmapData;
	export import Loader = flash.display.Loader;
	export import Event = flash.events.Event;
	export import IOErrorEvent = flash.events.IOErrorEvent;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagDefineBits implements IDefinitionBitsTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		implements_flash___native_format_swf_tags_IDefinitionBitsTag = null;
		public static TYPE : number = 6;
		
		public bitmapType : number = BitmapType.JPEG;
		public jpegTablesTag : TagJPEGTables = null;
		
		protected _characterId : number = 0;
		protected _bitmapData : ByteArray = null;
		protected _bitmapAlphaData : ByteArray = null;
		protected _instance : BitmapData = null;
		
		/**
		 * Constructor 
		 * 
		 */		
		constructor()
		{
			this._bitmapData = new ByteArray;
		}
		
		public get bitmapAlphaData():ByteArray { return this._bitmapAlphaData; }
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }

		public get bitmapData():ByteArray { return this._bitmapData; }
		
		public set instance(value:BitmapData) { /**/ value = strict(value, BitmapData); this._instance = value; }
		public get instance():BitmapData { return this._instance || new BitmapData(1, 1, true, 0x66000000); }
		
		public get type():number { return TagDefineBits.TYPE; }
		public get name():string { return "DefineBits"; }
		public get version():number { return 1; }
		public get level():number { return 1; }
		
		public parse (data:SWFData, length:number, version:number, async:boolean = false):void
		{
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			
			if (length > 2) {
				
				data.readBytes (this._bitmapData, 0, length - 2);
				
			}
		}
		
		public publish(data:SWFData, version:number):void
		{
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, this._bitmapData.length + 2, true);
			data.writeUI16(this._characterId);
			
			if (this._bitmapData.length > 0) {
				
				data.writeBytes(this._bitmapData);
				
			}
		}
		
		public clone():IDefinitionTag
		{
			var tag:TagDefineBits = new TagDefineBits;
			tag.characterId = this.characterId;
			tag.bitmapType = this.bitmapType;
			
			if (this._bitmapData.length > 0) {
				
				tag.bitmapData.writeBytes(this._bitmapData);
				
			}
			
			return tag;
		}
		
		/*[internal]*/ protected loader:Loader;
		/*[internal]*/ protected onCompleteCallback:Function;
		
		/*[internal]*/ public exportBitmapData(complete : Function, error : Function = null):void
		{
			this.onCompleteCallback = complete;
			
			this.loader = new Loader;
			this.loader.contentLoaderInfo.addEventListener(Event.COMPLETE, this.__exportCompleteHandler.__bind(this));
			
			if (unbind(error) != unbind(null)) {
				
				this.loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, error);
				
			}
			
			if (this._bitmapAlphaData) {
				
				this._bitmapAlphaData.uncompress ();
				this.loader._predefinedAlphaData = this._bitmapAlphaData;
				
			}
			
			//if (bitmapType == BitmapType.JPEG && jpegTablesTag) {
				
			//	var b:ByteArray = ByteArray.__pool.get();
				
			//	b.writeBytes(jpegTablesTag.jpegTables);
			//	b.writeBytes(_bitmapData);
			//	loader.loadBytes(b);
				
			//	ByteArray.__pool.release(b);
				
			//} else {
				
				this.loader.loadBytes(this._bitmapData);
				
			//}
		}
		
		/*[internal]*/ protected __exportCompleteHandler(event:Event):void
		{
			// event = strict(event, Event);
			var bitmapData = (as(this.loader.content , Bitmap)).bitmapData;
			this.onCompleteCallback(bitmapData);
		}
		
		public toString(indent:number = 0, flags:number = 0):string
		{
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"BitmapLength: " + this._bitmapData.length;
		}
		
		
	}

}