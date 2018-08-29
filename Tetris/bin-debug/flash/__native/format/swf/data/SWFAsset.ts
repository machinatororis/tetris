/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFAsset
	{
		public characterId:number = 0;
		public name:string = null;
		
		constructor(data:SWFData = null)
		{
			/**/ data = strict(data, SWFData);
			if (data != null) {
				
				this.parse(data);
				
			}
		}

		public static create(characterId:number, name:string):SWFAsset
		{
			/**/ characterId = ((characterId) >>> 0); name = as(name, 'String');
			var swfSymbol:SWFAsset = new SWFAsset;
			swfSymbol.characterId = characterId;
			swfSymbol.name = name;
			return swfSymbol;
		}
		
		public parse(data:SWFData):void
		{
			/**/ data = strict(data, SWFData);
			this.characterId = data.readUI16();
			this.name = data.readString();
		}
		
		public publish(data:SWFData):void
		{
			/**/ data = strict(data, SWFData);
			data.writeUI16(this.characterId);
			data.writeString(this.name);
		}
		
		public toString():string
		{
			return "CharacterID: " + this.characterId + ", Name: " + this.name;
		}
	}

}