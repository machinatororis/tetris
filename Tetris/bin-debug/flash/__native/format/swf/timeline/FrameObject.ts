/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../tags/TagPlaceObject.ts" />

namespace flash.__native.format.swf.timeline
{
	export import TagPlaceObject = flash.__native.format.swf.tags.TagPlaceObject;
	export import StringUtils = flash.__native.utils.StringUtils;
	

	export  class FrameObject
	{
		// The clipping depth of this display object
		/*[internal]*/ public clipDepth : number;
		
		// The depth of this display object
		/*[internal]*/ public depth : number;
		
		// The character id of this display object
		/*[internal]*/ public characterId : number;
		
		// The class name of this display object
		/*[internal]*/ public className : string;
		
		// The tag index of the PlaceObject tag that placed this object on the display list
		/*[internal]*/ public placedAtIndex : number;
		
		// The tag index of the PlaceObject tag that modified this object (optional)
		/*[internal]*/ public lastModifiedNameAtIndex : number;
		/*[internal]*/ public lastModifiedMatrixAtIndex : number;
		/*[internal]*/ public lastModifiedColorTransformAtIndex : number;
		/*[internal]*/ public lastModifiedFilterListAtIndex : number;
		/*[internal]*/ public lastModifiedRatioAtIndex : number;
		
		// Whether this is a keyframe or not
		/*[internal]*/ public isKeyframe : boolean;
		
		// The index of the layer this object resides on 
		/*[internal]*/ public layer : number = -1;
		
		/**
		 * Constructor 
		 * @param depth
		 * @param clipDepth
		 * @param characterId
		 * @param className
		 * @param placedAtIndex
		 * @param lastModifiedAtIndex
		 * @param isKeyframe
		 * 
		 */		
		/*[internal]*/ constructor (tagIndex : number, tag : TagPlaceObject)
		{
			// tagIndex = ((tagIndex) >> 0); tag = strict(tag, TagPlaceObject);
			if (tagIndex < 0 || !tag) {
				
				return;
				
			}
			
			this.depth = tag.depth;
			this.clipDepth = tag.clipDepth;
			this.characterId = tag.characterId;
			this.className = tag.className;
			this.placedAtIndex =(( tagIndex) >>> 0);
			this.isKeyframe = true;
			
			this.setLastModifiedFromTag(tagIndex, tag, 0);
		}
		
		/*[internal]*/ public setLastModifiedFromTag (tagIndex : number, tag : TagPlaceObject, update : number) : void
		{
			// tagIndex = ((tagIndex) >> 0); tag = strict(tag, TagPlaceObject); update = ((update) >> 0);
			this.lastModifiedNameAtIndex = tag.hasName ? tagIndex : (update ? this.lastModifiedNameAtIndex : -1);
			this.lastModifiedMatrixAtIndex = tag.hasMatrix ? tagIndex : (update ? this.lastModifiedMatrixAtIndex : -1);
			this.lastModifiedColorTransformAtIndex = tag.hasColorTransform ? tagIndex : (update ? this.lastModifiedColorTransformAtIndex : -1);
			this.lastModifiedFilterListAtIndex = tag.hasFilterList ? tagIndex : (update ? this.lastModifiedFilterListAtIndex : -1);
			this.lastModifiedRatioAtIndex = tag.hasRatio ? tagIndex : (update ? this.lastModifiedRatioAtIndex : -1);
		}
		
		/*[internal]*/ public clone () : FrameObject
		{
			var copy = new FrameObject;
			copy.depth = this.depth;
			copy.clipDepth = this.clipDepth;
			copy.characterId = this.characterId;
			copy.className = this.className;
			copy.placedAtIndex = this.placedAtIndex;
			copy.lastModifiedNameAtIndex = this.lastModifiedNameAtIndex;
			copy.lastModifiedMatrixAtIndex = this.lastModifiedMatrixAtIndex;
			copy.lastModifiedColorTransformAtIndex = this.lastModifiedColorTransformAtIndex;
			copy.lastModifiedFilterListAtIndex = this.lastModifiedFilterListAtIndex;
			copy.lastModifiedRatioAtIndex = this.lastModifiedRatioAtIndex;
			return copy;
		}
		
		public toString (indent : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0);
			var str:string = "\n" + StringUtils.repeat(indent + 2) +
				"Depth: " + this.depth + (this.layer > -1 ? " (Layer " + this.layer + ")" : "") + ", " +
				"CharacterId: " + this.characterId + ", ";
			
			if (this.className != null) {
				
				str += "ClassName: " + this.className + ", ";
				
			}
			
			str += "PlacedAt: "  + this.placedAtIndex;
			
			if (this.lastModifiedNameAtIndex > -1) {
				
				str += ", LastModifiedNameAt: " + this.lastModifiedNameAtIndex;
				
			}
			
			if (this.lastModifiedMatrixAtIndex > -1) {
				
				str += ", LastModifiedMatrixAt: " + this.lastModifiedMatrixAtIndex;
				
			}
			
			if (this.lastModifiedColorTransformAtIndex > -1) {
				
				str += ", LastModifiedColorTransformAt: " + this.lastModifiedColorTransformAtIndex;
				
			}
			
			if (this.lastModifiedFilterListAtIndex > -1) {
				
				str += ", LastModifiedFilterListAt: " + this.lastModifiedFilterListAtIndex;
				
			}
			
			if (this.isKeyframe) {
				
				str += ", IsKeyframe";
				
			}
			
			return str;
		}
	}
}