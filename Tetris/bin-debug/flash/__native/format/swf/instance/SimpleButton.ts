/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../display/Sprite.ts" />
/// <reference path="../../../../display/DisplayObjectContainer.ts" />
/// <reference path="../../../../display/DisplayObject.ts" />
/// <reference path="../../../../display/BlendMode.ts" />
/// <reference path="../tags/TagDefineButton2.ts" />
/// <reference path="../tags/TagDefineButton.ts" />
/// <reference path="../data/SWFButtonRecord.ts" />
/// <reference path="../SWFTimelineContainer.ts" />
﻿
namespace flash.__native.format.swf.instance
{
	
	export import SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
	export import SWFButtonRecord = flash.__native.format.swf.data.SWFButtonRecord;
	export import TagDefineButton = flash.__native.format.swf.tags.TagDefineButton;
	export import TagDefineButton2 = flash.__native.format.swf.tags.TagDefineButton2;
	export import BlendMode = flash.display.BlendMode;
	export import DisplayObject = flash.display.DisplayObject;
	export import DisplayObjectContainer = flash.display.DisplayObjectContainer;
	export import Sprite = flash.display.Sprite;
	

	/**
	 * @author pkulikov
	 */
	export  class SimpleButton extends flash.display.SimpleButton
	{
		//TODO: Check why BlendModes in the SWF spec follow this order, and why the difference between cpp and flash order
		/*[internal]*/ private static blendModes : string[] = asc.sti(SimpleButton,()=>{ SimpleButton.blendModes = new Array<string>([BlendMode.NORMAL, BlendMode.NORMAL, BlendMode.LAYER, BlendMode.MULTIPLY, BlendMode.SCREEN, BlendMode.LIGHTEN, BlendMode.DARKEN, BlendMode.DIFFERENCE, BlendMode.ADD, 	BlendMode.SUBTRACT,	BlendMode.INVERT, BlendMode.ALPHA, BlendMode.ERASE, BlendMode.OVERLAY, BlendMode.HARDLIGHT, BlendMode.SHADER]); });
		
		/*[internal]*/ protected tag : TagDefineButton2;
		/*[internal]*/ protected data : SWFTimelineContainer;
		
		/**
		 * Constructor 
		 * @param data
		 * @param tag
		 * 
		 */		
		constructor (tag : TagDefineButton2)
		{
			/**/ tag = strict(tag, TagDefineButton2);
			if (!tag) {
				
				return;
				
			}
			
			this.tag = tag;
			this.data =strict( tag.root, SWFTimelineContainer);
			
			// TODO
			// data.getTagSound (tag._characterId)
			
			super(
				this.processState('upState', tag.getRecordsByState(TagDefineButton.STATE_UP)),
				this.processState('overState', tag.getRecordsByState(TagDefineButton.STATE_OVER)),
				this.processState('downState', tag.getRecordsByState(TagDefineButton.STATE_DOWN)),
				this.processState('hitTestState', tag.getRecordsByState(TagDefineButton.STATE_HIT))
			);
		}
		
		/*[internal]*/ private processState (field : string, recs : SWFButtonRecord[]) : DisplayObject
		{
			// field = as(field, 'String');
			var container = new Sprite;
			for (var i = 0, len = recs.length; i < len; ++i) {
				
				var rec = recs[i];
				var displayObject = this.data.getDisplayObject(rec.characterId);
				if (!displayObject) {
					
					continue;
					
				}
				
				this.placeButtonRecord(displayObject, rec, container);
				
			}
			
			return container;
		}
		
		/*[internal]*/ private placeButtonRecord (displayObject : DisplayObject, record : SWFButtonRecord, container : DisplayObjectContainer) : void
		{
			// displayObject = strict(displayObject, DisplayObject); record = strict(record, SWFButtonRecord); container = strict(container, DisplayObjectContainer);
			if (record.placeMatrix != null) {
				
				displayObject.transform._matrix.__copyFrom(record.placeMatrix.matrix);
				
			}
			
			if (record.hasFilterList) {
				
				displayObject.__setSWFFilters(record.filterList);
				
			}
			
			if (record.hasBlendMode) {
				
				displayObject.blendMode =as( SimpleButton.blendModes[record.blendMode], 'String');
				
			}
			
			if (record.colorTransform != null) {
				
				displayObject.transform.colorTransform = record.colorTransform.colorTransform;
				
			}
			
			container.__addChildAt(displayObject, (record.placeDepth < container._childrenLength)? record.placeDepth - 1 : container._childrenLength);
		}
	}	
}