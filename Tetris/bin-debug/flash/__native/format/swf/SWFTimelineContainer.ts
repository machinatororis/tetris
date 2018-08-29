/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../utils/getTimer.ts" />
/// <reference path="../../../utils/Endian.ts" />
/// <reference path="../../../utils/Dictionary.ts" />
/// <reference path="../../../utils/ByteArray.ts" />
/// <reference path="../../../events/Event.ts" />
/// <reference path="../../../display/Sprite.ts" />
/// <reference path="../../../display/DisplayObject.ts" />
/// <reference path="../../utils/StringUtils.ts" />
/// <reference path="timeline/SoundStream.ts" />
/// <reference path="timeline/Scene.ts" />
/// <reference path="timeline/LayerStrip.ts" />
/// <reference path="timeline/Layer.ts" />
/// <reference path="timeline/Frame.ts" />
/// <reference path="tags/TagSymbolClass.ts" />
/// <reference path="tags/TagSoundStreamHead2.ts" />
/// <reference path="tags/TagSoundStreamHead.ts" />
/// <reference path="tags/TagSoundStreamBlock.ts" />
/// <reference path="tags/TagShowFrame.ts" />
/// <reference path="tags/TagSetBackgroundColor.ts" />
/// <reference path="tags/TagRemoveObject2.ts" />
/// <reference path="tags/TagRemoveObject.ts" />
/// <reference path="tags/TagPlaceObject3.ts" />
/// <reference path="tags/TagPlaceObject2.ts" />
/// <reference path="tags/TagPlaceObject.ts" />
/// <reference path="tags/TagJPEGTables.ts" />
/// <reference path="tags/TagFrameLabel.ts" />
/// <reference path="tags/TagExportAssets.ts" />
/// <reference path="tags/TagEnd.ts" />
/// <reference path="tags/TagDoABC.ts" />
/// <reference path="tags/TagDefineText.ts" />
/// <reference path="tags/TagDefineShape.ts" />
/// <reference path="tags/TagDefineSceneAndFrameLabelData.ts" />
/// <reference path="tags/TagDefineScalingGrid.ts" />
/// <reference path="tags/TagDefineMorphShape.ts" />
/// <reference path="tags/TagDefineEditText.ts" />
/// <reference path="tags/TagDefineButtonSound.ts" />
/// <reference path="tags/TagDefineButton2.ts" />
/// <reference path="tags/TagDefineBitsLossless2.ts" />
/// <reference path="tags/TagDefineBitsLossless.ts" />
/// <reference path="tags/TagDefineBitsJPEG4.ts" />
/// <reference path="tags/TagDefineBitsJPEG3.ts" />
/// <reference path="tags/TagDefineBitsJPEG2.ts" />
/// <reference path="tags/TagDefineBits.ts" />
/// <reference path="tags/TagBroken.ts" />
/// <reference path="tags/ITag.ts" />
/// <reference path="tags/IDisplayListTag.ts" />
/// <reference path="tags/IDefinitionTag.ts" />
/// <reference path="instance/MovieClip.ts" />
/// <reference path="instance/Bitmap.ts" />
/// <reference path="factories/SWFTagFactory.ts" />
/// <reference path="factories/ISWFTagFactory.ts" />
/// <reference path="events/SWFWarningEvent.ts" />
/// <reference path="events/SWFProgressEvent.ts" />
/// <reference path="events/SWFEventDispatcher.ts" />
/// <reference path="events/SWFErrorEvent.ts" />
/// <reference path="data/consts/SoundCompression.ts" />
/// <reference path="data/SWFSymbol.ts" />
/// <reference path="data/SWFScene.ts" />
/// <reference path="data/SWFRawTag.ts" />
/// <reference path="data/SWFFrameLabel.ts" />
/// <reference path="data/SWFAsset.ts" />

namespace flash.__native.format.swf
{
	export import SWFAsset = flash.__native.format.swf.data.SWFAsset;
	export import SWFFrameLabel = flash.__native.format.swf.data.SWFFrameLabel;
	export import SWFRawTag = flash.__native.format.swf.data.SWFRawTag;
	export import SWFScene = flash.__native.format.swf.data.SWFScene;
	export import SWFSymbol = flash.__native.format.swf.data.SWFSymbol;
	export import SoundCompression = flash.__native.format.swf.data.consts.SoundCompression;
	export import SWFErrorEvent = flash.__native.format.swf.events.SWFErrorEvent;
	export import SWFEventDispatcher = flash.__native.format.swf.events.SWFEventDispatcher;
	export import SWFProgressEvent = flash.__native.format.swf.events.SWFProgressEvent;
	export import SWFWarningEvent = flash.__native.format.swf.events.SWFWarningEvent;
	export import ISWFTagFactory = flash.__native.format.swf.factories.ISWFTagFactory;
	export import SWFTagFactory = flash.__native.format.swf.factories.SWFTagFactory;
	export import Bitmap = flash.__native.format.swf.instance.Bitmap;
	export import MovieClip = flash.__native.format.swf.instance.MovieClip;
	export import IDefinitionTag = flash.__native.format.swf.tags.IDefinitionTag;
	export import IDisplayListTag = flash.__native.format.swf.tags.IDisplayListTag;
	export import ITag = flash.__native.format.swf.tags.ITag;
	export import TagBroken = flash.__native.format.swf.tags.TagBroken;
	export import TagDefineBits = flash.__native.format.swf.tags.TagDefineBits;
	export import TagDefineBitsJPEG2 = flash.__native.format.swf.tags.TagDefineBitsJPEG2;
	export import TagDefineBitsJPEG3 = flash.__native.format.swf.tags.TagDefineBitsJPEG3;
	export import TagDefineBitsJPEG4 = flash.__native.format.swf.tags.TagDefineBitsJPEG4;
	export import TagDefineBitsLossless = flash.__native.format.swf.tags.TagDefineBitsLossless;
	export import TagDefineBitsLossless2 = flash.__native.format.swf.tags.TagDefineBitsLossless2;
	export import TagDefineButton2 = flash.__native.format.swf.tags.TagDefineButton2;
	export import TagDefineButtonSound = flash.__native.format.swf.tags.TagDefineButtonSound;
	export import TagDefineEditText = flash.__native.format.swf.tags.TagDefineEditText;
	export import TagDefineMorphShape = flash.__native.format.swf.tags.TagDefineMorphShape;
	export import TagDefineScalingGrid = flash.__native.format.swf.tags.TagDefineScalingGrid;
	export import TagDefineSceneAndFrameLabelData = flash.__native.format.swf.tags.TagDefineSceneAndFrameLabelData;
	export import TagDefineShape = flash.__native.format.swf.tags.TagDefineShape;
	export import TagDefineText = flash.__native.format.swf.tags.TagDefineText;
	export import TagDoABC = flash.__native.format.swf.tags.TagDoABC;
	export import TagEnd = flash.__native.format.swf.tags.TagEnd;
	export import TagExportAssets = flash.__native.format.swf.tags.TagExportAssets;
	export import TagFrameLabel = flash.__native.format.swf.tags.TagFrameLabel;
	export import TagJPEGTables = flash.__native.format.swf.tags.TagJPEGTables;
	export import TagPlaceObject = flash.__native.format.swf.tags.TagPlaceObject;
	export import TagPlaceObject2 = flash.__native.format.swf.tags.TagPlaceObject2;
	export import TagPlaceObject3 = flash.__native.format.swf.tags.TagPlaceObject3;
	export import TagRemoveObject = flash.__native.format.swf.tags.TagRemoveObject;
	export import TagRemoveObject2 = flash.__native.format.swf.tags.TagRemoveObject2;
	export import TagSetBackgroundColor = flash.__native.format.swf.tags.TagSetBackgroundColor;
	export import TagShowFrame = flash.__native.format.swf.tags.TagShowFrame;
	export import TagSoundStreamBlock = flash.__native.format.swf.tags.TagSoundStreamBlock;
	export import TagSoundStreamHead = flash.__native.format.swf.tags.TagSoundStreamHead;
	export import TagSoundStreamHead2 = flash.__native.format.swf.tags.TagSoundStreamHead2;
	export import TagSymbolClass = flash.__native.format.swf.tags.TagSymbolClass;
	export import Frame = flash.__native.format.swf.timeline.Frame;
	export import Layer = flash.__native.format.swf.timeline.Layer;
	export import LayerStrip = flash.__native.format.swf.timeline.LayerStrip;
	export import Scene = flash.__native.format.swf.timeline.Scene;
	export import SoundStream = flash.__native.format.swf.timeline.SoundStream;
	export import StringUtils = flash.__native.utils.StringUtils;
	export import DisplayObject = flash.display.DisplayObject;
	export import Sprite = flash.display.Sprite;
	export import Event = flash.events.Event;
	export import ByteArray = flash.utils.ByteArray;
	export import Dictionary = flash.utils.Dictionary;
	export import Endian = flash.utils.Endian;
	export import getTimer = flash.utils.getTimer;
	

	export  class SWFTimelineContainer extends SWFEventDispatcher
	{
		public static sTimeout : number = 50;
		public static sAutobuildLayers : boolean = false;
		public static sExtractSoundStream : boolean = true;
		public static sDecodeImageData : boolean = true;
		public static sScalingGrids : Dictionary = null;
		public static sDisplayObjectContructorMap : any = {};
		public static sDisplayObjectNoContructor : any = {};

		/*[internal]*/ public bytes : SWFData;
		/*[internal]*/ public frameLabels : Dictionary;
		/*[internal]*/ public frameIndexes : Dictionary;
		/*[internal]*/ public backgroundColor : number;
		/*[internal]*/ public jpegTablesTag : TagJPEGTables;
		
		/*[internal]*/ protected currentFrame : Frame;
		/*[internal]*/ protected hasSoundStream : boolean;
		/*[internal]*/ protected rootTimelineContainer : SWFTimelineContainer;
		/*[internal]*/ protected enterFrameProvider : Sprite;
		/*[internal]*/ protected eof : boolean;
		
		/*[internal]*/ protected _tags : ITag[];
		/*[internal]*/ protected _tagsRaw : SWFRawTag[];
		/*[internal]*/ protected _tagsImageData : ITag[];
		/*[internal]*/ protected _assets : SWFAsset[];
		/*[internal]*/ protected _symbols : SWFSymbol[];
		/*[internal]*/ protected _dictionary : Dictionary;
		/*[internal]*/ protected _dictionarySound : Dictionary;
		/*[internal]*/ protected _scenes : Scene[];
		/*[internal]*/ protected _frames : Frame[];
		/*[internal]*/ protected _layers : Layer[];
		/*[internal]*/ protected _soundStream : SoundStream;
		/*[internal]*/ protected _tagFactory : ISWFTagFactory;

		/*[internal]*/ protected _tmpData : SWFData;
		/*[internal]*/ protected _tmpVersion : number;
		/*[internal]*/ protected _tmpTagIterator : number;
		
		/**
		 * Constructor 
		 * 
		 */		
		/*[internal]*/ constructor()
		{
			/**/ this.backgroundColor === void 0 && (this.backgroundColor = 0xffffff);
			/**/ this._tmpVersion === void 0 && (this._tmpVersion = 0);
			/**/ this._tmpTagIterator === void 0 && (this._tmpTagIterator = 0);
			super(); 
			if (SWFTimelineContainer.sScalingGrids == null) {
				
				SWFTimelineContainer.sScalingGrids = new Dictionary;
				
			}
			
			this._tags = new Array<ITag>();
			this._tagsRaw = new Array<SWFRawTag>();
			this._tagsImageData = new Array;
			this._assets = new Array;
			this._symbols = new Array;
			this._dictionary = new Dictionary;
			this._dictionarySound = new Dictionary;
			this._scenes = new Array;
			this._frames = new Array;
			this._layers = new Array;
			this._tagFactory = new SWFTagFactory;
			
			this.backgroundColor = 0xffffff;
			this.rootTimelineContainer = this;
			
			this.enterFrameProvider = new Sprite();
		}
		
		/*[internal]*/ public getTag (characterId:number):IDefinitionTag
		{
			// characterId = ((characterId) >>> 0);
			var tagIndex = this.rootTimelineContainer._dictionary.get(characterId);
			if (tagIndex >= 0 && tagIndex < this.rootTimelineContainer._tags.length) {
				
				return this.rootTimelineContainer._tags[tagIndex];
				
			}
			
			if (characterId == 0) {
				
				return this.rootTimelineContainer;
				
			}
			
			return null;
		}
		
		/*[internal]*/ public getTagSound (characterId:number):IDefinitionTag
		{
			// characterId = ((characterId) >>> 0);
			var tagIndex = this.rootTimelineContainer._dictionarySound.get(characterId);
			if (tagIndex >= 0 && tagIndex < this.rootTimelineContainer._tags.length) {
				
				return this.rootTimelineContainer._tags[tagIndex];
				
			}
			
			return null;
		}
		
		/*[internal]*/ public getSWFAsset (value:any):SWFSymbol
		{
			var asset:SWFAsset;
			switch (typeof value) {
				
				case 'string':
					var assetName = value;
					{var __for0 = window.asc.of(this.rootTimelineContainer._assets);for  (asset of __for0) {
						
						if (asset.name == assetName) {
							
							return asset;
							
						}
						
					}
					break};
				
				case 'number':
					var characterId = value;
					{var __for1 = window.asc.of(this.rootTimelineContainer._assets);for  (asset of __for1) {
						
						if (asset.characterId == characterId) {
							
							return asset;
							
						}
						
					}
					break};
				
			}
			
			return null;
		}
		
		/*[internal]*/ public getSWFSymbol (value:any):SWFSymbol
		{
			var symbol:SWFSymbol;
			switch (typeof value) {
				
				case 'string':
					var symbolName = value;
					{var __for2 = window.asc.of(this.rootTimelineContainer._symbols);for  (symbol of __for2) {
						
						if (symbol.name == symbolName) {
							
							return symbol;
							
						}
						
					}
					break};
				
				case 'number':
					var tagId = value;
					{var __for3 = window.asc.of(this.rootTimelineContainer._symbols);for  (symbol of __for3) {
						
						if (symbol.tagId == tagId) {
							
							return symbol;
							
						}
						
					}
					break};
				
			}
			
			return null;
		}
		
		/*[internal]*/ public getDisplayObject (characterId : number, parent : DisplayObject, index : number) : DisplayObject
		{
			// characterId = ((characterId) >> 0); parent = strict(parent, DisplayObject); index = ((index) >> 0);
			var cl = this.getDisplayObjectConstructor(characterId);
			if (!cl) {
				
				return null;
				
			}
			
			var args = [ this.getTag (characterId) ];
			var displayObject = window.asc.createDisplayObject(cl, args, parent, index);
			
			if (is(displayObject , MovieClip)) {
				
				var grid = this.getScalingGrid (characterId);
				if (grid) {
					
					displayObject.scale9Grid = grid.splitter.rect.clone();
					
				}
				
			}
			
			return displayObject;
		}
		
		/*[internal]*/ public getDisplayObjectConstructor (characterId : number) : {new(...a)}
		{
			// characterId = ((characterId) >> 0);
			var tag = this.getTag (characterId);
			var info = this.getSWFAsset (characterId) || this.getSWFSymbol (characterId);
			if (info && info.name) {
				
				var hash = this.bytes.hash;
				var hashMap = SWFTimelineContainer.sDisplayObjectContructorMap[hash];
				if (!hashMap) {
					
					hashMap = SWFTimelineContainer.sDisplayObjectContructorMap[hash] = {};
					
				}
				
				var name = info.name;
				var cl = hashMap[name], path;
				if (!cl) {

					try {
						
						cl = eval(path = hash + '.' + name);
						
					} catch (e  ) {e = window.asc.e2e(e);}
					
					if (cl) {
						
						if (window.asc.iscl(cl, flash.display.DisplayObject)) {
							
							return hashMap[name] = cl;
							
						} else if (window.asc.iscl(cl, flash.__native.format.swf.instance.BitmapData)) {
							
							return hashMap[name] = window.asc.getSWFClass(flash.__native.format.swf.instance.Bitmap, [tag]);
							
						} else {
							
							trace('Error: decompiled class "' + (path || name) + '" is not DisplayObject');
							hashMap[name] = SWFTimelineContainer.sDisplayObjectNoContructor;
							
						}
						
					} else {
						
						trace('Error: decompiled class "' + (path || name) + '" wasn\'t found');
						hashMap[name] = SWFTimelineContainer.sDisplayObjectNoContructor;
						
					}
					
				} else if (cl != SWFTimelineContainer.sDisplayObjectNoContructor) {
					
					return cl;
					
				}
				
			}
			
			// no as3
			if (!tag || is(tag , SWFTimelineContainer)) {
				
				return flash.__native.format.swf.instance.MovieClip;
				
			}
			
			if (is(tag , TagDefineBitsLossless) || is(tag , TagDefineBits)) {
				
				return flash.__native.format.swf.instance.Bitmap;
				
			}
			
			if (is(tag , TagDefineShape)) {
				
				return flash.__native.format.swf.instance.Shape;
				
			}
			
			if (is(tag , TagDefineText)) {
				
				return flash.__native.format.swf.instance.StaticText;
				
			}
			
			if (is(tag , TagDefineEditText)) {
				
				return flash.__native.format.swf.instance.DynamicText;
				
			}
			
			if (is(tag , TagDefineButton2)) {
				
				return flash.__native.format.swf.instance.SimpleButton;
				
			}
			
			if (is(tag , TagDefineMorphShape)) {
				
				return flash.__native.format.swf.instance.MorphShape;
				
			}
			
			return null;
		}
		
		/*[internal]*/ public getScalingGrid(characterId:number):TagDefineScalingGrid
		{
			// characterId = ((characterId) >>> 0);
			if (characterId in SWFTimelineContainer.sScalingGrids) {
				
				return as(this.rootTimelineContainer._tags[SWFTimelineContainer.sScalingGrids.get(characterId)] , TagDefineScalingGrid);
				
			}
			
			return null;
		}
		
		/*[internal]*/ public parseTags(data : SWFData, version : number) : void
		{
			// data = strict(data, SWFData); version = ((version) >>> 0);
			var tag;
			this.parseTagsInit(data, version);
			
			while ((tag = this.parseTag(data)) && tag.type != TagEnd.TYPE) {
				
				tag.root = data.root; // link to the SWF
				
			};
			
			this.parseTagsFinalize();
		}
		
		/*[internal]*/ public parseTagsAsync(data:SWFData, version:number):void
		{
			// data = strict(data, SWFData); version = ((version) >>> 0);
			this.parseTagsInit(data, version);
			this.enterFrameProvider.addEventListener(Event.ENTER_FRAME, this.parseTagsAsyncHandler.__bind(this));
		}
		
		/*[internal]*/ protected parseTagsAsyncHandler(event:Event):void
		{
			// event = strict(event, Event);
			this.enterFrameProvider.removeEventListener(Event.ENTER_FRAME, this.parseTagsAsyncHandler.__bind(this));
			
			if (this.dispatchEvent(new SWFProgressEvent(SWFProgressEvent.PROGRESS, this._tmpData.position, this._tmpData.length, false, true))) {
				
				this.parseTagsAsyncInternal();
				
			}
		}
		
		/*[internal]*/ protected parseTagsAsyncInternal():void
		{
			var tag:ITag;
			var time:number = getTimer();
			while ((tag = this.parseTag(this._tmpData, true)) && tag.type != TagEnd.TYPE) {
				
				if((getTimer() - time) > SWFTimelineContainer.sTimeout) {
					
					this.enterFrameProvider.addEventListener(Event.ENTER_FRAME, this.parseTagsAsyncHandler.__bind(this));
					return;
					
				}
				
			}
			
			this.parseTagsFinalize();
			
			if (this.eof) {
				
				this.dispatchEvent(new SWFErrorEvent(SWFErrorEvent.ERROR, SWFErrorEvent.REASON_EOF));
				
			} else {
				
				this.dispatchEvent(new SWFProgressEvent(SWFProgressEvent.PROGRESS, this._tmpData.position, this._tmpData.length));
				this.dispatchEvent(new SWFProgressEvent(SWFProgressEvent.COMPLETE, this._tmpData.position, this._tmpData.length));
				
			}
		}
		
		/*[internal]*/ protected parseTagsInit(data:SWFData, version:number):void
		{
			// data = strict(data, SWFData); version = ((version) >>> 0);
			this.bytes = data;
			this.currentFrame = new Frame;
			this.frameLabels = new Dictionary;
			this.frameIndexes = new Dictionary;
			this.hasSoundStream = false;
			
			this._tags.length = 0;
			this._frames.length = 0;
			this._layers.length = 0;
			this._dictionary = new Dictionary;
			this._dictionarySound = new Dictionary;
			
			this._tmpData = data;
			this._tmpVersion = version;
		}
		
		/*[internal]*/ protected parseTag (data : SWFData, async : boolean = false) : ITag
		{
			// data = strict(data, SWFData); async = Boolean(async);
			var pos = data.position;
			// Bail out if eof
			this.eof = pos >= data.length;
			if (this.eof) {
				
				trace("WARNING: end of file encountered, no end tag.");
				return null;
				
			}
			
			var tagRaw = data.readRawTag ();
			var tagHeader = tagRaw.header;
			var tag = this._tagFactory.create (tagHeader.type);
			try {
				
				if (is(tag , SWFTimelineContainer)) {
					
					// Currently, the only SWFTimelineContainer (other than the SWF root
					// itself) is TagDefineSprite (MovieClips have their own timeline).
					// Inject the current tag factory there.
					tag._tagFactory = this._tagFactory;
					tag.rootTimelineContainer = this;
					
				}
				
				// Parse tag
				tag.parse (data, tagHeader.contentLength, this._tmpVersion, async);
				
			} catch (e  ) {
				
				e = window.asc.e2e(e);
				
				// If we get here there was a problem parsing this particular tag.
				// Corrupted SWF, possible SWF exploit, or obfuscated SWF.
				trace("WARNING: parse error: " + e.message + ", Tag: " + tag.name + ", Index: " + this._tags.length);
				throw(e);
				
			}
			
			// Register tag
			this._tags[this._tags.length] = tag;
			this._tagsRaw[this._tagsRaw.length] = tagRaw;
			
			// Build dictionary and display list etc
			this.processTag(tag);
			
			// Adjust position (just in case the parser under- or overflows)
			if (data.position != pos + tagHeader.tagLength) {
				
				var index = this._tags.length - 1;
				var excessBytes = data.position - (pos + tagHeader.tagLength);
				var eventType = (excessBytes < 0) ? SWFWarningEvent.UNDERFLOW : SWFWarningEvent.OVERFLOW;
				var eventData = {
					pos: pos,
					bytes: (excessBytes < 0) ? -excessBytes : excessBytes
				};
				
				if (this.rootTimelineContainer == this) {
					
					trace("WARNING: excess bytes: " + excessBytes + ", " +
						"Tag: " + tag.name + ", " +
						"Index: " + index
					);
					
				} else {
					
					eventData.indexRoot = this.rootTimelineContainer._tags.length;
					trace("WARNING: excess bytes: " + excessBytes + ", " +
						"Tag: " + tag.name + ", " +
						"Index: " + index + ", " +
						"IndexRoot: " + eventData.indexRoot
					);
					
				}
				
				var event = new SWFWarningEvent(eventType, index, eventData, false, true);
				var cancelled = !this.dispatchEvent(event);
				
				if (cancelled) {
					
					tag = new TagBroken(tag);
					
				}
				
				data.position =(( pos + tagHeader.tagLength) >>> 0);
				
			}
			
			return tag;
		}
		
		/*[internal]*/ protected parseTagsFinalize():void
		{
			if (this._soundStream && this._soundStream.data.length == 0) {
				
				this._soundStream = null;
				
			}
			
			if (SWFTimelineContainer.sAutobuildLayers) {
				
				// TODO: This needs to go into processTags()
				this.buildLayers();
				
			}
			
			// TagJPEGTables
			this.linkJpegTablesTag();
		}
		
		/*[internal]*/ protected publishTags(data:SWFData, version:number):void
		{
			// data = strict(data, SWFData); version = ((version) >>> 0);
			var tag:ITag;
			var tagRaw:SWFRawTag;
			for (var i:number = 0, len:number =  ((this._tags.length) >>> 0); i < len; i++) {
				
				tag =strict( this._tags[i], 'implements_flash___native_format_swf_tags_ITag');
				tagRaw =strict( (i < this._tagsRaw.length) ? this._tagsRaw[i] : null, SWFRawTag);
				this.publishTag(data, tag, tagRaw, version);
				
			}
		}

		/*[internal]*/ public publishTagsAsync(data:SWFData, version:number):void
		{
			// data = strict(data, SWFData); version = ((version) >>> 0);
			this._tmpData = data;
			this._tmpVersion = version;
			this._tmpTagIterator = 0;
			this.enterFrameProvider.addEventListener(Event.ENTER_FRAME, this.publishTagsAsyncHandler.__bind(this));
		}

		/*[internal]*/ protected publishTagsAsyncHandler(event:Event):void
		{
			// event = strict(event, Event);
			this.enterFrameProvider.removeEventListener(Event.ENTER_FRAME, this.publishTagsAsyncHandler.__bind(this));
			
			if (this.dispatchEvent(new SWFProgressEvent(SWFProgressEvent.PROGRESS, this._tmpTagIterator, this._tags.length))) {
				
				this.publishTagsAsyncInternal();
				
			}
		}

		/*[internal]*/ protected publishTagsAsyncInternal():void
		{
			var tag:ITag;
			var tagRaw:SWFRawTag;
			var time:number = getTimer();
			
			do {
				
				tag =strict( (this._tmpTagIterator < this._tags.length) ? this._tags[this._tmpTagIterator] : null, 'implements_flash___native_format_swf_tags_ITag');
				tagRaw =strict( (this._tmpTagIterator < this._tagsRaw.length) ? this._tagsRaw[this._tmpTagIterator] : null, SWFRawTag);
				this.publishTag(this._tmpData, tag, tagRaw, this._tmpVersion);
				this._tmpTagIterator++;
				
				if ((getTimer() - time) > SWFTimelineContainer.sTimeout) {
					
					this.enterFrameProvider.addEventListener(Event.ENTER_FRAME, this.publishTagsAsyncHandler.__bind(this));
					return;
					
				}
				
			} while (tag.type != TagEnd.TYPE);
			
			this.dispatchEvent(new SWFProgressEvent(SWFProgressEvent.PROGRESS, this._tmpTagIterator, this._tags.length));
			this.dispatchEvent(new SWFProgressEvent(SWFProgressEvent.COMPLETE, this._tmpTagIterator, this._tags.length));
		}

		/*[internal]*/ protected publishTag(data:SWFData, tag:ITag, rawTag:SWFRawTag, version:number):void
		{
			// data = strict(data, SWFData); tag = strict(tag, 'implements_flash___native_format_swf_tags_ITag'); rawTag = strict(rawTag, SWFRawTag); version = ((version) >>> 0);
			try {
				
				tag.publish(data, version);
				
			} catch (e) {
				
				e = window.asc.e2e(e);
				
				trace("WARNING: publish error: " + e.message + " (tag: " + tag.name + ")");
				
				if (rawTag) {
					
					rawTag.publish(data);
					
				} else {
					
					trace("FATAL: publish error: No raw tag fallback");
					
				}
				
			}
		}

		/*[internal]*/ protected processTag (tag : ITag) : void
		{
			// tag = strict(tag, 'implements_flash___native_format_swf_tags_ITag');
			var currentTagIndex:number =  ((this._tags.length - 1) >>> 0);
			if (is(tag , 'implements_flash___native_format_swf_tags_IDefinitionTag')) {
				
				this.processDefinitionTag(tag, currentTagIndex);
				return;
				
			} else if (is(tag , 'implements_flash___native_format_swf_tags_IDisplayListTag')) {
				
				this.processDisplayListTag(tag, currentTagIndex);
				return;
				
			}
			
			switch (tag.type) {
				
				// Frame labels and scenes
				case TagFrameLabel.TYPE:
				case TagDefineSceneAndFrameLabelData.TYPE:
					this.processFrameLabelTag(tag, currentTagIndex);
					break;
				
				// Sound stream
				case TagSoundStreamHead.TYPE:
				case TagSoundStreamHead2.TYPE:
				case TagSoundStreamBlock.TYPE:
					if (SWFTimelineContainer.sExtractSoundStream) {
						
						this.processSoundStreamTag(tag, currentTagIndex);
						
					}
					break;
				
				// Background color
				case TagSetBackgroundColor.TYPE:
					this.processBackgroundColorTag(tag, currentTagIndex);
					break;
				
				// Global JPEG Table
				case TagJPEGTables.TYPE:
					this.processJPEGTablesTag(tag, currentTagIndex);
					break;
				
				// Scale-9 grids
				case TagDefineScalingGrid.TYPE:
					this.processScalingGridTag(tag, currentTagIndex);
					break;
				
				// Actionscript 3
				case TagDoABC.TYPE:
					this.processAS3Tag(tag, currentTagIndex);
					break;
				
				case TagSymbolClass.TYPE:
				case TagExportAssets.TYPE:
					this.processAssets(tag, currentTagIndex);
					break;
			}
		}
		
		/*[internal]*/ protected linkJpegTablesTag():void
		{
			if (!this.jpegTablesTag) {
				
				return;
				
			}
			
			var __for4 = window.asc.of(this._tags);
			for  (var tag of __for4) {
				
				if (!(is(tag , TagDefineBits))) {
					
					continue;
					
				}
				
				(as(tag , TagDefineBits)).jpegTablesTag = this.jpegTablesTag;
				
			}
		}
		
		/*[internal]*/ protected processDefinitionTag(tag:IDefinitionTag, currentTagIndex:number):void
		{
			// tag = strict(tag, 'implements_flash___native_format_swf_tags_IDefinitionTag'); currentTagIndex = ((currentTagIndex) >>> 0);
			if (tag.characterId > 0) {
				
				// Register definition tag in dictionary
				// key: character id
				// value: definition tag index
				if (is(tag , TagDefineButtonSound)) {
					
					this._dictionarySound.set(tag.characterId,  currentTagIndex);
					
				} else {
					
					this._dictionary.set(tag.characterId,  currentTagIndex);
					
				}
				
				// Register character id in the current frame's character array
				this.currentFrame.characters.push(tag.characterId);
				
			}
			
			switch (tag.type) {
				
				case TagDefineBits.TYPE:
				case TagDefineBitsJPEG2.TYPE:
				case TagDefineBitsJPEG3.TYPE:
				case TagDefineBitsJPEG4.TYPE:
				case TagDefineBitsLossless.TYPE:
				case TagDefineBitsLossless2.TYPE:
					if (SWFTimelineContainer.sDecodeImageData) {
						
						this.processImageDataTag(tag, currentTagIndex);
						
					}
					break;
				
			}
		}

		/*[internal]*/ protected processDisplayListTag(tag:IDisplayListTag, currentTagIndex:number):void
		{
			// tag = strict(tag, 'implements_flash___native_format_swf_tags_IDisplayListTag'); currentTagIndex = ((currentTagIndex) >>> 0);
			switch (tag.type) {
				
				case TagShowFrame.TYPE:
					
					this.currentFrame.tagIndexEnd = currentTagIndex;
					if (this.currentFrame.label == null && this.frameLabels.get(this.currentFrame.frameNumber)) {
						
						this.currentFrame.label =as( this.frameLabels.get(this.currentFrame.frameNumber), 'String');
						
					}
					
					this._frames[this._frames.length] = this.currentFrame;
					this.currentFrame = this.currentFrame.clone ();
					this.currentFrame.frameNumber =(( this._frames.length) >>> 0);
					this.currentFrame.tagIndexStart =(( currentTagIndex + 1) >>> 0);
					break;
				
				case TagPlaceObject.TYPE:
				case TagPlaceObject2.TYPE:
				case TagPlaceObject3.TYPE:
					this.currentFrame.placeObject(currentTagIndex, tag);
					break;
				
				case TagRemoveObject.TYPE:
				case TagRemoveObject2.TYPE:
					this.currentFrame.removeObject(tag);
					break;
				
			}
		}

		/*[internal]*/ protected processFrameLabelTag(tag:ITag, currentTagIndex:number):void
		{
			// tag = strict(tag, 'implements_flash___native_format_swf_tags_ITag'); currentTagIndex = ((currentTagIndex) >>> 0);
			switch (tag.type) {
				
				case TagDefineSceneAndFrameLabelData.TYPE:
					var tagSceneAndFrameLabelData:TagDefineSceneAndFrameLabelData = as(tag , TagDefineSceneAndFrameLabelData);
					var i:number = 0, len:number = 0;
					for (i = 0, len = tagSceneAndFrameLabelData.frameLabels.length; i < len; i++) {
						
						var frameLabel:SWFFrameLabel =  strict(as(tagSceneAndFrameLabelData.frameLabels[i] , SWFFrameLabel), SWFFrameLabel);
						this.frameLabels.set(frameLabel.frameNumber,  frameLabel.name);
						this.frameIndexes.set(frameLabel.name,  frameLabel.frameNumber + 1);
						
					}
					for (i = 0, len = tagSceneAndFrameLabelData._scenes.length; i < len; i++) {
						
						var scene:SWFScene =  strict(as(tagSceneAndFrameLabelData._scenes[i] , SWFScene), SWFScene);
						this._scenes.push(new Scene(scene.offset, scene.name));
						
					}
					break;
				
				case TagFrameLabel.TYPE:
					var tagFrameLabel:TagFrameLabel = as(tag , TagFrameLabel);
					this.currentFrame.label = tagFrameLabel.frameName;
					this.frameLabels.set(this.currentFrame.frameNumber,  tagFrameLabel.frameName);
					this.frameIndexes.set(tagFrameLabel.frameName,  this.currentFrame.frameNumber + 1);
					break;
				
			}
		}
		
		/*[internal]*/ protected processSoundStreamTag(tag:ITag, currentTagIndex:number):void
		{
			// tag = strict(tag, 'implements_flash___native_format_swf_tags_ITag'); currentTagIndex = ((currentTagIndex) >>> 0);
			switch (tag.type) {
				
				case TagSoundStreamHead.TYPE:
				case TagSoundStreamHead2.TYPE:
					var tagSoundStreamHead:TagSoundStreamHead = as(tag , TagSoundStreamHead);
					this._soundStream = new SoundStream();
					this._soundStream.compression = tagSoundStreamHead.streamSoundCompression;
					this._soundStream.rate = tagSoundStreamHead.streamSoundRate;
					this._soundStream.size = tagSoundStreamHead.streamSoundSize;
					this._soundStream.type = tagSoundStreamHead.streamSoundType;
					this._soundStream.numFrames = 0;
					this._soundStream.numSamples = 0;
					break;
				
				case TagSoundStreamBlock.TYPE:
					if (this._soundStream != null) {
						
						if (!this.hasSoundStream) {
							
							this.hasSoundStream = true;
							this._soundStream.startFrame = this.currentFrame.frameNumber;
							
						}
						
						var tagSoundStreamBlock:TagSoundStreamBlock = as(tag , TagSoundStreamBlock);
						var soundData:ByteArray = tagSoundStreamBlock.soundData;
						soundData.endian = Endian.LITTLE_ENDIAN;
						soundData.position = 0;
						switch (this._soundStream.compression) {
							
							case SoundCompression.ADPCM: // ADPCM
								// TODO
								break;
							
							case SoundCompression.MP3: // MP3
								var numSamples:number = soundData.readUnsignedShort();
								var seekSamples:number = soundData.readShort();
								if (numSamples > 0) {
									this._soundStream.numSamples += numSamples;
									this._soundStream.data.writeBytes(soundData, 4);
								}
								break;
							
						}
						
						this._soundStream.numFrames++;
						
					}
					break;
				
			}
		}
		
		/*[internal]*/ protected processImageDataTag(tag:ITag, currentTagIndex:number):void
		{
			// tag = strict(tag, 'implements_flash___native_format_swf_tags_ITag'); currentTagIndex = ((currentTagIndex) >>> 0);
			this._tagsImageData[this._tagsImageData.length] = tag;
		}
		
		/*[internal]*/ protected processAssets(tag:ITag, currentTagIndex:number):void
		{
			// tag = strict(tag, 'implements_flash___native_format_swf_tags_ITag'); currentTagIndex = ((currentTagIndex) >>> 0);
			if (is(tag , TagSymbolClass)) {
				
				this._symbols = this._symbols.concat((as(tag , TagSymbolClass)).symbols);
				
			} else if (is(tag , TagExportAssets)) {
				
				this._assets = this._assets.concat((as(tag , TagExportAssets)).assets);
				
			}
		}

		/*[internal]*/ protected processBackgroundColorTag(tag:TagSetBackgroundColor, currentTagIndex:number):void
		{
			// tag = strict(tag, TagSetBackgroundColor); currentTagIndex = ((currentTagIndex) >>> 0);
			this.backgroundColor = tag.color;
		}

		/*[internal]*/ protected processJPEGTablesTag(tag:TagJPEGTables, currentTagIndex:number):void
		{
			// tag = strict(tag, TagJPEGTables); currentTagIndex = ((currentTagIndex) >>> 0);
			this.jpegTablesTag = tag;
		}
		
		/*[internal]*/ protected processScalingGridTag(tag:TagDefineScalingGrid, currentTagIndex:number):void
		{
			// tag = strict(tag, TagDefineScalingGrid); currentTagIndex = ((currentTagIndex) >>> 0);
			SWFTimelineContainer.sScalingGrids.set(tag.characterId,  currentTagIndex);
		}
		
		/*[internal]*/ protected processAS3Tag(tag:TagDoABC, currentTagIndex:number):void {
			// tag = strict(tag, TagDoABC); currentTagIndex = ((currentTagIndex) >>> 0);
			// Just store it for now
			/*abcTag = tag;
			
			//trace("ABC: " + tag.toString());
			
			var bytes = #if flash haxe.io.Bytes.ofData(tag.bytes) #else tag.bytes #end;
			var input = new haxe.io.BytesInput(bytes);
			var reader = new format.abc.Reader(input);
			
			//trace("Reading...");
			abcData = reader.read();
			
			pcode = new Array();
			for (fn in abcData.functions) {
				pcode.push(format.abc.OpReader.decode(new haxe.io.BytesInput(fn.code)));
			}*/
		}
		
		/*[internal]*/ protected buildLayers():void
		{
			var i:number = 0;
			var len:number = 0;
			var depth:string;
			var depthInt:number = 0;
			var depths:Dictionary = new Dictionary();
			var depthsAvailable:any[] = [];
			
			for (i = 0, len = this._frames.length; i < len; i++) {
				
				var frame:Frame =  strict(this._frames[i], Frame);
				var __for5 = window.asc.in(frame.objects);
				for (depth of __for5) {
					
					depthInt =(( parseInt(depth)) >>> 0);
					if (depthsAvailable.indexOf(depthInt) > -1) {
						
						(as(depths.get(depth) , Array)).push(frame.frameNumber);
						
					} else {
						
						depths.set(depth,  [frame.frameNumber]);
						depthsAvailable.push(depthInt);
						
					}
					
				}
				
			}

			depthsAvailable.sort(Array.NUMERIC);

			for (i = 0, len = depthsAvailable.length; i < len; i++) {
				
				var layer:Layer = new Layer(depthsAvailable[i], this._frames.length);
				var frameIndices:any[] =  strict(depths.get(depthsAvailable[i].toString()), Array);
				var frameIndicesLen:number = frameIndices.length;
				if (frameIndicesLen > 0) {
					
					var curStripType:number = LayerStrip.TYPE_EMPTY;
					var startFrameIndex:number =  ((uint.MAX_VALUE) >>> 0);
					var endFrameIndex:number =  ((uint.MAX_VALUE) >>> 0);
					for (var j:number = 0; j < frameIndicesLen; j++) {
						
						var curFrameIndex : number =  ((frameIndices[j]) >>> 0);
						var curFrameObject = this._frames[curFrameIndex].objects[layer.depth];
						if (curFrameObject.isKeyframe) {
							
							// a keyframe marks the start of a new strip: save current strip
							layer.appendStrip(curStripType, startFrameIndex, endFrameIndex);
							
							// set start of new strip
							startFrameIndex = curFrameIndex;
							
							// evaluate type of new strip (motion tween detection see below)
							curStripType = (is(this.getTag (curFrameObject.characterId) , TagDefineMorphShape)) ? LayerStrip.TYPE_SHAPETWEEN : LayerStrip.TYPE_STATIC;
							
						} else if (curStripType == LayerStrip.TYPE_STATIC && curFrameObject.lastModifiedAtIndex > -1) {
							
							// if one of the matrices of an object in a static strip is
							// modified at least once, we are dealing with a motion tween:
							curStripType = LayerStrip.TYPE_MOTIONTWEEN;
							
						}
						
						// update the end of the strip
						endFrameIndex = curFrameIndex;
						
					}
					
					layer.appendStrip(curStripType, startFrameIndex, endFrameIndex);
					
				}
				
				this._layers.push(layer);
			}

			for (i = 0, len = this._frames.length; i < len; i++) {
				
				var frameObjs = this._frames[i].objects;
				var __for6 = window.asc.in(frameObjs);
				for (depth of __for6) {
					
					frameObjs[depth].layer = depthsAvailable.indexOf(+depth);
					
				}
			}	
		}
		
		public toString(indent:number = 0, flags:number = 0):string
		{
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var i:number = 0;
			var len:number = 0;
			var str:string = '';
			if ((len=((this._tags.length) >>> 0)) > 0) {
				
				str += "\n" + StringUtils.repeat(indent + 2) + "Tags:";
				for (i = 0; i < len; i++) {
					
					str += "\n" + this._tags[i].toString(indent + 4);
					
				}
				
			}
			
			if ((flags & SWF.TOSTRING_FLAG_TIMELINE_STRUCTURE) != 0) {
				
				if ((len=((this._scenes.length) >>> 0)) > 0) {
					
					str += "\n" + StringUtils.repeat(indent + 2) + "Scenes:";
					for (i = 0; i < len; i++) {
						str += "\n" + this._scenes[i].toString(indent + 4);
					}
					
				}
				
				if ((len=((this._frames.length) >>> 0)) > 0) {
					
					str += "\n" + StringUtils.repeat(indent + 2) + "Frames:";
					for (i = 0; i < len; i++) {
						
						str += "\n" + this._frames[i].toString(indent + 4);
						
					}
					
				}
				
				if ((len=((this._layers.length) >>> 0)) > 0) {
					
					str += "\n" + StringUtils.repeat(indent + 2) + "Layers:";
					for (i = 0; i < len; i++) {
						
						str += "\n" + StringUtils.repeat(indent + 4) + 
							"[" + i + "] " + this._layers[i].toString(indent + 4);
						
					}
					
				}
				
			}
			
			return str;
		}
	}

}