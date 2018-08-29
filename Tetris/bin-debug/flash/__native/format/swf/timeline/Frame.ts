/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../tags/TagRemoveObject.ts" />
/// <reference path="../tags/TagPlaceObject.ts" />

namespace flash.__native.format.swf.timeline
{
	export import TagPlaceObject = flash.__native.format.swf.tags.TagPlaceObject;
	export import TagRemoveObject = flash.__native.format.swf.tags.TagRemoveObject;
	export import StringUtils = flash.__native.utils.StringUtils;
	

	export  class Frame
	{
		/*[internal]*/ public frameNumber : number;
		/*[internal]*/ public tagIndexStart : number;
		/*[internal]*/ public tagIndexEnd : number = 0;
		/*[internal]*/ public label : string;
		/*[internal]*/ public objects : any;
		/*[internal]*/ public characters : any[];
		
		/*[internal]*/ protected _objectsSortedByDepth : any[];
		
		/**
		 * Constructor 
		 * @param frameNumber
		 * @param tagIndexStart
		 * 
		 */		
		constructor (frameNumber : number = 0, tagIndexStart : number = 0)
		{
			/**/ frameNumber = ((frameNumber) >>> 0); tagIndexStart = ((tagIndexStart) >>> 0);
			this.frameNumber = frameNumber;
			this.tagIndexStart = tagIndexStart;
			
			this.objects = {};
			this.characters = [];
		}
		
		public getObjectsSortedByDepth () : any[]
		{
			if (this._objectsSortedByDepth == null) {
				
				var depths = Object.keys(this.objects);
				depths.sort(Array.NUMERIC);
				
				this._objectsSortedByDepth = [];
				for (var i = 0, len = depths.length; i < len; i++) {
					
					this._objectsSortedByDepth[i] = this.objects[depths[i]];
					
				}
				
			}
			
			return this._objectsSortedByDepth;
		}
		
		public get tagCount () : number
		{
			return this.tagIndexEnd - this.tagIndexStart + 1;
		}
		
		/*[internal]*/ public placeObject (tagIndex : number, tag : TagPlaceObject) : void
		{
			// tagIndex = ((tagIndex) >>> 0); tag = strict(tag, TagPlaceObject);
			var frameObject = this.objects[tag.depth];
			if (frameObject) {
				
				// A character is already available at the specified depth
				if (tag.characterId == 0) {
					
					// The PlaceObject tag has no character id defined:
					// This means that the previous character is reused 
					// and most likely modified by transforms
					frameObject.isKeyframe = false;
					frameObject.setLastModifiedFromTag(tagIndex, tag, tag.hasMove ? 1 : 0);
					
				} else {
					
					// A character id is defined:
					// This means that the previous character is replaced 
					// (possible transforms defined in previous frames are discarded)
					frameObject.isKeyframe = true;

					if (tag.characterId != frameObject.characterId) {

						// The character id does not match the previous character:
						// An entirely new character is placed at this depth.
						frameObject.placedAtIndex = tagIndex;
						frameObject.characterId = tag.characterId;
						frameObject.setLastModifiedFromTag(tagIndex, tag, tag.hasMove ? 1 : 0);
						
					} else {
						
						frameObject.setLastModifiedFromTag(tagIndex, tag, 1);
						
					}
					
				}
				
			} else {
				
				// No character defined at specified depth. Create one.
				this.objects[tag.depth] = new FrameObject (tagIndex, tag);
				
			}
			
			this._objectsSortedByDepth = null;
		}
		
		public removeObject (tag : TagRemoveObject) : void
		{
			/**/ tag = strict(tag, TagRemoveObject);
			delete this.objects[tag.depth];
			this._objectsSortedByDepth = null;
		}
		
		public clone () : Frame
		{
			var frame = new Frame;
			var frameObjects = frame.objects;
			
			var __for0 = window.asc.in(this.objects);
			for (var depth of __for0) {
				
				frameObjects[depth] = this.objects[depth].clone ();
				
			}
			
			return frame;
		}
		
		public toString (indent : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0);
			var str:string = StringUtils.repeat(indent) + "[" + this.frameNumber + "] " +
				"Start: " + this.tagIndexStart + ", " +
				"Length: " + this.tagCount;
			
			if (this.label != null && this.label != "") {
				
				str += ", Label: " + this.label;
				
			}
			
			if (this.characters.length > 0) {
				
				str += "\n" + StringUtils.repeat(indent + 2) + "Defined CharacterIDs: " + this.characters.join(", ");
				
			}
			
			var __for1 = window.asc.in(this.objects);
			for (var depth of __for1) {
				
				str += this.objects[depth].toString(indent);
				
			}
			
			return str;
		}
	}
}