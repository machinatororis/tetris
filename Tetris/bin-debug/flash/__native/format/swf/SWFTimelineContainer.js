var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                swf.SWFAsset = flash.__native.format.swf.data.SWFAsset;
                swf.SWFFrameLabel = flash.__native.format.swf.data.SWFFrameLabel;
                swf.SWFRawTag = flash.__native.format.swf.data.SWFRawTag;
                swf.SWFScene = flash.__native.format.swf.data.SWFScene;
                swf.SWFSymbol = flash.__native.format.swf.data.SWFSymbol;
                swf.SoundCompression = flash.__native.format.swf.data.consts.SoundCompression;
                swf.SWFErrorEvent = flash.__native.format.swf.events.SWFErrorEvent;
                swf.SWFEventDispatcher = flash.__native.format.swf.events.SWFEventDispatcher;
                swf.SWFProgressEvent = flash.__native.format.swf.events.SWFProgressEvent;
                swf.SWFWarningEvent = flash.__native.format.swf.events.SWFWarningEvent;
                swf.ISWFTagFactory = flash.__native.format.swf.factories.ISWFTagFactory;
                swf.SWFTagFactory = flash.__native.format.swf.factories.SWFTagFactory;
                swf.Bitmap = flash.__native.format.swf.instance.Bitmap;
                swf.MovieClip = flash.__native.format.swf.instance.MovieClip;
                swf.IDefinitionTag = flash.__native.format.swf.tags.IDefinitionTag;
                swf.IDisplayListTag = flash.__native.format.swf.tags.IDisplayListTag;
                swf.ITag = flash.__native.format.swf.tags.ITag;
                swf.TagBroken = flash.__native.format.swf.tags.TagBroken;
                swf.TagDefineBits = flash.__native.format.swf.tags.TagDefineBits;
                swf.TagDefineBitsJPEG2 = flash.__native.format.swf.tags.TagDefineBitsJPEG2;
                swf.TagDefineBitsJPEG3 = flash.__native.format.swf.tags.TagDefineBitsJPEG3;
                swf.TagDefineBitsJPEG4 = flash.__native.format.swf.tags.TagDefineBitsJPEG4;
                swf.TagDefineBitsLossless = flash.__native.format.swf.tags.TagDefineBitsLossless;
                swf.TagDefineBitsLossless2 = flash.__native.format.swf.tags.TagDefineBitsLossless2;
                swf.TagDefineButton2 = flash.__native.format.swf.tags.TagDefineButton2;
                swf.TagDefineButtonSound = flash.__native.format.swf.tags.TagDefineButtonSound;
                swf.TagDefineEditText = flash.__native.format.swf.tags.TagDefineEditText;
                swf.TagDefineMorphShape = flash.__native.format.swf.tags.TagDefineMorphShape;
                swf.TagDefineScalingGrid = flash.__native.format.swf.tags.TagDefineScalingGrid;
                swf.TagDefineSceneAndFrameLabelData = flash.__native.format.swf.tags.TagDefineSceneAndFrameLabelData;
                swf.TagDefineShape = flash.__native.format.swf.tags.TagDefineShape;
                swf.TagDefineText = flash.__native.format.swf.tags.TagDefineText;
                swf.TagDoABC = flash.__native.format.swf.tags.TagDoABC;
                swf.TagEnd = flash.__native.format.swf.tags.TagEnd;
                swf.TagExportAssets = flash.__native.format.swf.tags.TagExportAssets;
                swf.TagFrameLabel = flash.__native.format.swf.tags.TagFrameLabel;
                swf.TagJPEGTables = flash.__native.format.swf.tags.TagJPEGTables;
                swf.TagPlaceObject = flash.__native.format.swf.tags.TagPlaceObject;
                swf.TagPlaceObject2 = flash.__native.format.swf.tags.TagPlaceObject2;
                swf.TagPlaceObject3 = flash.__native.format.swf.tags.TagPlaceObject3;
                swf.TagRemoveObject = flash.__native.format.swf.tags.TagRemoveObject;
                swf.TagRemoveObject2 = flash.__native.format.swf.tags.TagRemoveObject2;
                swf.TagSetBackgroundColor = flash.__native.format.swf.tags.TagSetBackgroundColor;
                swf.TagShowFrame = flash.__native.format.swf.tags.TagShowFrame;
                swf.TagSoundStreamBlock = flash.__native.format.swf.tags.TagSoundStreamBlock;
                swf.TagSoundStreamHead = flash.__native.format.swf.tags.TagSoundStreamHead;
                swf.TagSoundStreamHead2 = flash.__native.format.swf.tags.TagSoundStreamHead2;
                swf.TagSymbolClass = flash.__native.format.swf.tags.TagSymbolClass;
                swf.Frame = flash.__native.format.swf.timeline.Frame;
                swf.Layer = flash.__native.format.swf.timeline.Layer;
                swf.LayerStrip = flash.__native.format.swf.timeline.LayerStrip;
                swf.Scene = flash.__native.format.swf.timeline.Scene;
                swf.SoundStream = flash.__native.format.swf.timeline.SoundStream;
                swf.StringUtils = flash.__native.utils.StringUtils;
                swf.DisplayObject = flash.display.DisplayObject;
                swf.Sprite = flash.display.Sprite;
                swf.Event = flash.events.Event;
                swf.ByteArray = flash.utils.ByteArray;
                swf.Dictionary = flash.utils.Dictionary;
                swf.Endian = flash.utils.Endian;
                swf.getTimer = flash.utils.getTimer;
                var SWFTimelineContainer = (function (_super) {
                    __extends(SWFTimelineContainer, _super);
                    function SWFTimelineContainer() {
                        var _this = this;
                        _this.backgroundColor === void 0 && (_this.backgroundColor = 0xffffff);
                        _this._tmpVersion === void 0 && (_this._tmpVersion = 0);
                        _this._tmpTagIterator === void 0 && (_this._tmpTagIterator = 0);
                        _this = _super.call(this) || this;
                        if (SWFTimelineContainer.sScalingGrids == null) {
                            SWFTimelineContainer.sScalingGrids = new swf.Dictionary;
                        }
                        _this._tags = new Array();
                        _this._tagsRaw = new Array();
                        _this._tagsImageData = new Array;
                        _this._assets = new Array;
                        _this._symbols = new Array;
                        _this._dictionary = new swf.Dictionary;
                        _this._dictionarySound = new swf.Dictionary;
                        _this._scenes = new Array;
                        _this._frames = new Array;
                        _this._layers = new Array;
                        _this._tagFactory = new swf.SWFTagFactory;
                        _this.backgroundColor = 0xffffff;
                        _this.rootTimelineContainer = _this;
                        _this.enterFrameProvider = new swf.Sprite();
                        return _this;
                    }
                    SWFTimelineContainer.prototype.getTag = function (characterId) {
                        var tagIndex = this.rootTimelineContainer._dictionary.get(characterId);
                        if (tagIndex >= 0 && tagIndex < this.rootTimelineContainer._tags.length) {
                            return this.rootTimelineContainer._tags[tagIndex];
                        }
                        if (characterId == 0) {
                            return this.rootTimelineContainer;
                        }
                        return null;
                    };
                    SWFTimelineContainer.prototype.getTagSound = function (characterId) {
                        var tagIndex = this.rootTimelineContainer._dictionarySound.get(characterId);
                        if (tagIndex >= 0 && tagIndex < this.rootTimelineContainer._tags.length) {
                            return this.rootTimelineContainer._tags[tagIndex];
                        }
                        return null;
                    };
                    SWFTimelineContainer.prototype.getSWFAsset = function (value) {
                        var asset;
                        switch (typeof value) {
                            case 'string':
                                var assetName = value;
                                {
                                    var __for0 = window.asc.of(this.rootTimelineContainer._assets);
                                    for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                                        asset = __for0_1[_i];
                                        if (asset.name == assetName) {
                                            return asset;
                                        }
                                    }
                                    break;
                                }
                                ;
                            case 'number':
                                var characterId = value;
                                {
                                    var __for1 = window.asc.of(this.rootTimelineContainer._assets);
                                    for (var _a = 0, __for1_1 = __for1; _a < __for1_1.length; _a++) {
                                        asset = __for1_1[_a];
                                        if (asset.characterId == characterId) {
                                            return asset;
                                        }
                                    }
                                    break;
                                }
                                ;
                        }
                        return null;
                    };
                    SWFTimelineContainer.prototype.getSWFSymbol = function (value) {
                        var symbol;
                        switch (typeof value) {
                            case 'string':
                                var symbolName = value;
                                {
                                    var __for2 = window.asc.of(this.rootTimelineContainer._symbols);
                                    for (var _i = 0, __for2_1 = __for2; _i < __for2_1.length; _i++) {
                                        symbol = __for2_1[_i];
                                        if (symbol.name == symbolName) {
                                            return symbol;
                                        }
                                    }
                                    break;
                                }
                                ;
                            case 'number':
                                var tagId = value;
                                {
                                    var __for3 = window.asc.of(this.rootTimelineContainer._symbols);
                                    for (var _a = 0, __for3_1 = __for3; _a < __for3_1.length; _a++) {
                                        symbol = __for3_1[_a];
                                        if (symbol.tagId == tagId) {
                                            return symbol;
                                        }
                                    }
                                    break;
                                }
                                ;
                        }
                        return null;
                    };
                    SWFTimelineContainer.prototype.getDisplayObject = function (characterId, parent, index) {
                        var cl = this.getDisplayObjectConstructor(characterId);
                        if (!cl) {
                            return null;
                        }
                        var args = [this.getTag(characterId)];
                        var displayObject = window.asc.createDisplayObject(cl, args, parent, index);
                        if (is(displayObject, swf.MovieClip)) {
                            var grid = this.getScalingGrid(characterId);
                            if (grid) {
                                displayObject.scale9Grid = grid.splitter.rect.clone();
                            }
                        }
                        return displayObject;
                    };
                    SWFTimelineContainer.prototype.getDisplayObjectConstructor = function (characterId) {
                        var tag = this.getTag(characterId);
                        var info = this.getSWFAsset(characterId) || this.getSWFSymbol(characterId);
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
                                }
                                catch (e) {
                                    e = window.asc.e2e(e);
                                }
                                if (cl) {
                                    if (window.asc.iscl(cl, flash.display.DisplayObject)) {
                                        return hashMap[name] = cl;
                                    }
                                    else if (window.asc.iscl(cl, flash.__native.format.swf.instance.BitmapData)) {
                                        return hashMap[name] = window.asc.getSWFClass(flash.__native.format.swf.instance.Bitmap, [tag]);
                                    }
                                    else {
                                        trace('Error: decompiled class "' + (path || name) + '" is not DisplayObject');
                                        hashMap[name] = SWFTimelineContainer.sDisplayObjectNoContructor;
                                    }
                                }
                                else {
                                    trace('Error: decompiled class "' + (path || name) + '" wasn\'t found');
                                    hashMap[name] = SWFTimelineContainer.sDisplayObjectNoContructor;
                                }
                            }
                            else if (cl != SWFTimelineContainer.sDisplayObjectNoContructor) {
                                return cl;
                            }
                        }
                        if (!tag || is(tag, SWFTimelineContainer)) {
                            return flash.__native.format.swf.instance.MovieClip;
                        }
                        if (is(tag, swf.TagDefineBitsLossless) || is(tag, swf.TagDefineBits)) {
                            return flash.__native.format.swf.instance.Bitmap;
                        }
                        if (is(tag, swf.TagDefineShape)) {
                            return flash.__native.format.swf.instance.Shape;
                        }
                        if (is(tag, swf.TagDefineText)) {
                            return flash.__native.format.swf.instance.StaticText;
                        }
                        if (is(tag, swf.TagDefineEditText)) {
                            return flash.__native.format.swf.instance.DynamicText;
                        }
                        if (is(tag, swf.TagDefineButton2)) {
                            return flash.__native.format.swf.instance.SimpleButton;
                        }
                        if (is(tag, swf.TagDefineMorphShape)) {
                            return flash.__native.format.swf.instance.MorphShape;
                        }
                        return null;
                    };
                    SWFTimelineContainer.prototype.getScalingGrid = function (characterId) {
                        if (characterId in SWFTimelineContainer.sScalingGrids) {
                            return as(this.rootTimelineContainer._tags[SWFTimelineContainer.sScalingGrids.get(characterId)], swf.TagDefineScalingGrid);
                        }
                        return null;
                    };
                    SWFTimelineContainer.prototype.parseTags = function (data, version) {
                        var tag;
                        this.parseTagsInit(data, version);
                        while ((tag = this.parseTag(data)) && tag.type != swf.TagEnd.TYPE) {
                            tag.root = data.root;
                        }
                        ;
                        this.parseTagsFinalize();
                    };
                    SWFTimelineContainer.prototype.parseTagsAsync = function (data, version) {
                        this.parseTagsInit(data, version);
                        this.enterFrameProvider.addEventListener(swf.Event.ENTER_FRAME, this.parseTagsAsyncHandler.__bind(this));
                    };
                    SWFTimelineContainer.prototype.parseTagsAsyncHandler = function (event) {
                        this.enterFrameProvider.removeEventListener(swf.Event.ENTER_FRAME, this.parseTagsAsyncHandler.__bind(this));
                        if (this.dispatchEvent(new swf.SWFProgressEvent(swf.SWFProgressEvent.PROGRESS, this._tmpData.position, this._tmpData.length, false, true))) {
                            this.parseTagsAsyncInternal();
                        }
                    };
                    SWFTimelineContainer.prototype.parseTagsAsyncInternal = function () {
                        var tag;
                        var time = swf.getTimer();
                        while ((tag = this.parseTag(this._tmpData, true)) && tag.type != swf.TagEnd.TYPE) {
                            if ((swf.getTimer() - time) > SWFTimelineContainer.sTimeout) {
                                this.enterFrameProvider.addEventListener(swf.Event.ENTER_FRAME, this.parseTagsAsyncHandler.__bind(this));
                                return;
                            }
                        }
                        this.parseTagsFinalize();
                        if (this.eof) {
                            this.dispatchEvent(new swf.SWFErrorEvent(swf.SWFErrorEvent.ERROR, swf.SWFErrorEvent.REASON_EOF));
                        }
                        else {
                            this.dispatchEvent(new swf.SWFProgressEvent(swf.SWFProgressEvent.PROGRESS, this._tmpData.position, this._tmpData.length));
                            this.dispatchEvent(new swf.SWFProgressEvent(swf.SWFProgressEvent.COMPLETE, this._tmpData.position, this._tmpData.length));
                        }
                    };
                    SWFTimelineContainer.prototype.parseTagsInit = function (data, version) {
                        this.bytes = data;
                        this.currentFrame = new swf.Frame;
                        this.frameLabels = new swf.Dictionary;
                        this.frameIndexes = new swf.Dictionary;
                        this.hasSoundStream = false;
                        this._tags.length = 0;
                        this._frames.length = 0;
                        this._layers.length = 0;
                        this._dictionary = new swf.Dictionary;
                        this._dictionarySound = new swf.Dictionary;
                        this._tmpData = data;
                        this._tmpVersion = version;
                    };
                    SWFTimelineContainer.prototype.parseTag = function (data, async) {
                        if (async === void 0) { async = false; }
                        var pos = data.position;
                        this.eof = pos >= data.length;
                        if (this.eof) {
                            trace("WARNING: end of file encountered, no end tag.");
                            return null;
                        }
                        var tagRaw = data.readRawTag();
                        var tagHeader = tagRaw.header;
                        var tag = this._tagFactory.create(tagHeader.type);
                        try {
                            if (is(tag, SWFTimelineContainer)) {
                                tag._tagFactory = this._tagFactory;
                                tag.rootTimelineContainer = this;
                            }
                            tag.parse(data, tagHeader.contentLength, this._tmpVersion, async);
                        }
                        catch (e) {
                            e = window.asc.e2e(e);
                            trace("WARNING: parse error: " + e.message + ", Tag: " + tag.name + ", Index: " + this._tags.length);
                            throw (e);
                        }
                        this._tags[this._tags.length] = tag;
                        this._tagsRaw[this._tagsRaw.length] = tagRaw;
                        this.processTag(tag);
                        if (data.position != pos + tagHeader.tagLength) {
                            var index = this._tags.length - 1;
                            var excessBytes = data.position - (pos + tagHeader.tagLength);
                            var eventType = (excessBytes < 0) ? swf.SWFWarningEvent.UNDERFLOW : swf.SWFWarningEvent.OVERFLOW;
                            var eventData = {
                                pos: pos,
                                bytes: (excessBytes < 0) ? -excessBytes : excessBytes
                            };
                            if (this.rootTimelineContainer == this) {
                                trace("WARNING: excess bytes: " + excessBytes + ", " +
                                    "Tag: " + tag.name + ", " +
                                    "Index: " + index);
                            }
                            else {
                                eventData.indexRoot = this.rootTimelineContainer._tags.length;
                                trace("WARNING: excess bytes: " + excessBytes + ", " +
                                    "Tag: " + tag.name + ", " +
                                    "Index: " + index + ", " +
                                    "IndexRoot: " + eventData.indexRoot);
                            }
                            var event = new swf.SWFWarningEvent(eventType, index, eventData, false, true);
                            var cancelled = !this.dispatchEvent(event);
                            if (cancelled) {
                                tag = new swf.TagBroken(tag);
                            }
                            data.position = ((pos + tagHeader.tagLength) >>> 0);
                        }
                        return tag;
                    };
                    SWFTimelineContainer.prototype.parseTagsFinalize = function () {
                        if (this._soundStream && this._soundStream.data.length == 0) {
                            this._soundStream = null;
                        }
                        if (SWFTimelineContainer.sAutobuildLayers) {
                            this.buildLayers();
                        }
                        this.linkJpegTablesTag();
                    };
                    SWFTimelineContainer.prototype.publishTags = function (data, version) {
                        var tag;
                        var tagRaw;
                        for (var i = 0, len = ((this._tags.length) >>> 0); i < len; i++) {
                            tag = strict(this._tags[i], 'implements_flash___native_format_swf_tags_ITag');
                            tagRaw = strict((i < this._tagsRaw.length) ? this._tagsRaw[i] : null, swf.SWFRawTag);
                            this.publishTag(data, tag, tagRaw, version);
                        }
                    };
                    SWFTimelineContainer.prototype.publishTagsAsync = function (data, version) {
                        this._tmpData = data;
                        this._tmpVersion = version;
                        this._tmpTagIterator = 0;
                        this.enterFrameProvider.addEventListener(swf.Event.ENTER_FRAME, this.publishTagsAsyncHandler.__bind(this));
                    };
                    SWFTimelineContainer.prototype.publishTagsAsyncHandler = function (event) {
                        this.enterFrameProvider.removeEventListener(swf.Event.ENTER_FRAME, this.publishTagsAsyncHandler.__bind(this));
                        if (this.dispatchEvent(new swf.SWFProgressEvent(swf.SWFProgressEvent.PROGRESS, this._tmpTagIterator, this._tags.length))) {
                            this.publishTagsAsyncInternal();
                        }
                    };
                    SWFTimelineContainer.prototype.publishTagsAsyncInternal = function () {
                        var tag;
                        var tagRaw;
                        var time = swf.getTimer();
                        do {
                            tag = strict((this._tmpTagIterator < this._tags.length) ? this._tags[this._tmpTagIterator] : null, 'implements_flash___native_format_swf_tags_ITag');
                            tagRaw = strict((this._tmpTagIterator < this._tagsRaw.length) ? this._tagsRaw[this._tmpTagIterator] : null, swf.SWFRawTag);
                            this.publishTag(this._tmpData, tag, tagRaw, this._tmpVersion);
                            this._tmpTagIterator++;
                            if ((swf.getTimer() - time) > SWFTimelineContainer.sTimeout) {
                                this.enterFrameProvider.addEventListener(swf.Event.ENTER_FRAME, this.publishTagsAsyncHandler.__bind(this));
                                return;
                            }
                        } while (tag.type != swf.TagEnd.TYPE);
                        this.dispatchEvent(new swf.SWFProgressEvent(swf.SWFProgressEvent.PROGRESS, this._tmpTagIterator, this._tags.length));
                        this.dispatchEvent(new swf.SWFProgressEvent(swf.SWFProgressEvent.COMPLETE, this._tmpTagIterator, this._tags.length));
                    };
                    SWFTimelineContainer.prototype.publishTag = function (data, tag, rawTag, version) {
                        try {
                            tag.publish(data, version);
                        }
                        catch (e) {
                            e = window.asc.e2e(e);
                            trace("WARNING: publish error: " + e.message + " (tag: " + tag.name + ")");
                            if (rawTag) {
                                rawTag.publish(data);
                            }
                            else {
                                trace("FATAL: publish error: No raw tag fallback");
                            }
                        }
                    };
                    SWFTimelineContainer.prototype.processTag = function (tag) {
                        var currentTagIndex = ((this._tags.length - 1) >>> 0);
                        if (is(tag, 'implements_flash___native_format_swf_tags_IDefinitionTag')) {
                            this.processDefinitionTag(tag, currentTagIndex);
                            return;
                        }
                        else if (is(tag, 'implements_flash___native_format_swf_tags_IDisplayListTag')) {
                            this.processDisplayListTag(tag, currentTagIndex);
                            return;
                        }
                        switch (tag.type) {
                            case swf.TagFrameLabel.TYPE:
                            case swf.TagDefineSceneAndFrameLabelData.TYPE:
                                this.processFrameLabelTag(tag, currentTagIndex);
                                break;
                            case swf.TagSoundStreamHead.TYPE:
                            case swf.TagSoundStreamHead2.TYPE:
                            case swf.TagSoundStreamBlock.TYPE:
                                if (SWFTimelineContainer.sExtractSoundStream) {
                                    this.processSoundStreamTag(tag, currentTagIndex);
                                }
                                break;
                            case swf.TagSetBackgroundColor.TYPE:
                                this.processBackgroundColorTag(tag, currentTagIndex);
                                break;
                            case swf.TagJPEGTables.TYPE:
                                this.processJPEGTablesTag(tag, currentTagIndex);
                                break;
                            case swf.TagDefineScalingGrid.TYPE:
                                this.processScalingGridTag(tag, currentTagIndex);
                                break;
                            case swf.TagDoABC.TYPE:
                                this.processAS3Tag(tag, currentTagIndex);
                                break;
                            case swf.TagSymbolClass.TYPE:
                            case swf.TagExportAssets.TYPE:
                                this.processAssets(tag, currentTagIndex);
                                break;
                        }
                    };
                    SWFTimelineContainer.prototype.linkJpegTablesTag = function () {
                        if (!this.jpegTablesTag) {
                            return;
                        }
                        var __for4 = window.asc.of(this._tags);
                        for (var _i = 0, __for4_1 = __for4; _i < __for4_1.length; _i++) {
                            var tag = __for4_1[_i];
                            if (!(is(tag, swf.TagDefineBits))) {
                                continue;
                            }
                            (as(tag, swf.TagDefineBits)).jpegTablesTag = this.jpegTablesTag;
                        }
                    };
                    SWFTimelineContainer.prototype.processDefinitionTag = function (tag, currentTagIndex) {
                        if (tag.characterId > 0) {
                            if (is(tag, swf.TagDefineButtonSound)) {
                                this._dictionarySound.set(tag.characterId, currentTagIndex);
                            }
                            else {
                                this._dictionary.set(tag.characterId, currentTagIndex);
                            }
                            this.currentFrame.characters.push(tag.characterId);
                        }
                        switch (tag.type) {
                            case swf.TagDefineBits.TYPE:
                            case swf.TagDefineBitsJPEG2.TYPE:
                            case swf.TagDefineBitsJPEG3.TYPE:
                            case swf.TagDefineBitsJPEG4.TYPE:
                            case swf.TagDefineBitsLossless.TYPE:
                            case swf.TagDefineBitsLossless2.TYPE:
                                if (SWFTimelineContainer.sDecodeImageData) {
                                    this.processImageDataTag(tag, currentTagIndex);
                                }
                                break;
                        }
                    };
                    SWFTimelineContainer.prototype.processDisplayListTag = function (tag, currentTagIndex) {
                        switch (tag.type) {
                            case swf.TagShowFrame.TYPE:
                                this.currentFrame.tagIndexEnd = currentTagIndex;
                                if (this.currentFrame.label == null && this.frameLabels.get(this.currentFrame.frameNumber)) {
                                    this.currentFrame.label = as(this.frameLabels.get(this.currentFrame.frameNumber), 'String');
                                }
                                this._frames[this._frames.length] = this.currentFrame;
                                this.currentFrame = this.currentFrame.clone();
                                this.currentFrame.frameNumber = ((this._frames.length) >>> 0);
                                this.currentFrame.tagIndexStart = ((currentTagIndex + 1) >>> 0);
                                break;
                            case swf.TagPlaceObject.TYPE:
                            case swf.TagPlaceObject2.TYPE:
                            case swf.TagPlaceObject3.TYPE:
                                this.currentFrame.placeObject(currentTagIndex, tag);
                                break;
                            case swf.TagRemoveObject.TYPE:
                            case swf.TagRemoveObject2.TYPE:
                                this.currentFrame.removeObject(tag);
                                break;
                        }
                    };
                    SWFTimelineContainer.prototype.processFrameLabelTag = function (tag, currentTagIndex) {
                        switch (tag.type) {
                            case swf.TagDefineSceneAndFrameLabelData.TYPE:
                                var tagSceneAndFrameLabelData = as(tag, swf.TagDefineSceneAndFrameLabelData);
                                var i = 0, len = 0;
                                for (i = 0, len = tagSceneAndFrameLabelData.frameLabels.length; i < len; i++) {
                                    var frameLabel = strict(as(tagSceneAndFrameLabelData.frameLabels[i], swf.SWFFrameLabel), swf.SWFFrameLabel);
                                    this.frameLabels.set(frameLabel.frameNumber, frameLabel.name);
                                    this.frameIndexes.set(frameLabel.name, frameLabel.frameNumber + 1);
                                }
                                for (i = 0, len = tagSceneAndFrameLabelData._scenes.length; i < len; i++) {
                                    var scene = strict(as(tagSceneAndFrameLabelData._scenes[i], swf.SWFScene), swf.SWFScene);
                                    this._scenes.push(new swf.Scene(scene.offset, scene.name));
                                }
                                break;
                            case swf.TagFrameLabel.TYPE:
                                var tagFrameLabel = as(tag, swf.TagFrameLabel);
                                this.currentFrame.label = tagFrameLabel.frameName;
                                this.frameLabels.set(this.currentFrame.frameNumber, tagFrameLabel.frameName);
                                this.frameIndexes.set(tagFrameLabel.frameName, this.currentFrame.frameNumber + 1);
                                break;
                        }
                    };
                    SWFTimelineContainer.prototype.processSoundStreamTag = function (tag, currentTagIndex) {
                        switch (tag.type) {
                            case swf.TagSoundStreamHead.TYPE:
                            case swf.TagSoundStreamHead2.TYPE:
                                var tagSoundStreamHead = as(tag, swf.TagSoundStreamHead);
                                this._soundStream = new swf.SoundStream();
                                this._soundStream.compression = tagSoundStreamHead.streamSoundCompression;
                                this._soundStream.rate = tagSoundStreamHead.streamSoundRate;
                                this._soundStream.size = tagSoundStreamHead.streamSoundSize;
                                this._soundStream.type = tagSoundStreamHead.streamSoundType;
                                this._soundStream.numFrames = 0;
                                this._soundStream.numSamples = 0;
                                break;
                            case swf.TagSoundStreamBlock.TYPE:
                                if (this._soundStream != null) {
                                    if (!this.hasSoundStream) {
                                        this.hasSoundStream = true;
                                        this._soundStream.startFrame = this.currentFrame.frameNumber;
                                    }
                                    var tagSoundStreamBlock = as(tag, swf.TagSoundStreamBlock);
                                    var soundData = tagSoundStreamBlock.soundData;
                                    soundData.endian = swf.Endian.LITTLE_ENDIAN;
                                    soundData.position = 0;
                                    switch (this._soundStream.compression) {
                                        case swf.SoundCompression.ADPCM:
                                            break;
                                        case swf.SoundCompression.MP3:
                                            var numSamples = soundData.readUnsignedShort();
                                            var seekSamples = soundData.readShort();
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
                    };
                    SWFTimelineContainer.prototype.processImageDataTag = function (tag, currentTagIndex) {
                        this._tagsImageData[this._tagsImageData.length] = tag;
                    };
                    SWFTimelineContainer.prototype.processAssets = function (tag, currentTagIndex) {
                        if (is(tag, swf.TagSymbolClass)) {
                            this._symbols = this._symbols.concat((as(tag, swf.TagSymbolClass)).symbols);
                        }
                        else if (is(tag, swf.TagExportAssets)) {
                            this._assets = this._assets.concat((as(tag, swf.TagExportAssets)).assets);
                        }
                    };
                    SWFTimelineContainer.prototype.processBackgroundColorTag = function (tag, currentTagIndex) {
                        this.backgroundColor = tag.color;
                    };
                    SWFTimelineContainer.prototype.processJPEGTablesTag = function (tag, currentTagIndex) {
                        this.jpegTablesTag = tag;
                    };
                    SWFTimelineContainer.prototype.processScalingGridTag = function (tag, currentTagIndex) {
                        SWFTimelineContainer.sScalingGrids.set(tag.characterId, currentTagIndex);
                    };
                    SWFTimelineContainer.prototype.processAS3Tag = function (tag, currentTagIndex) {
                    };
                    SWFTimelineContainer.prototype.buildLayers = function () {
                        var i = 0;
                        var len = 0;
                        var depth;
                        var depthInt = 0;
                        var depths = new swf.Dictionary();
                        var depthsAvailable = [];
                        for (i = 0, len = this._frames.length; i < len; i++) {
                            var frame = strict(this._frames[i], swf.Frame);
                            var __for5 = window.asc.in(frame.objects);
                            for (var _i = 0, __for5_1 = __for5; _i < __for5_1.length; _i++) {
                                depth = __for5_1[_i];
                                depthInt = ((parseInt(depth)) >>> 0);
                                if (depthsAvailable.indexOf(depthInt) > -1) {
                                    (as(depths.get(depth), Array)).push(frame.frameNumber);
                                }
                                else {
                                    depths.set(depth, [frame.frameNumber]);
                                    depthsAvailable.push(depthInt);
                                }
                            }
                        }
                        depthsAvailable.sort(Array.NUMERIC);
                        for (i = 0, len = depthsAvailable.length; i < len; i++) {
                            var layer = new swf.Layer(depthsAvailable[i], this._frames.length);
                            var frameIndices = strict(depths.get(depthsAvailable[i].toString()), Array);
                            var frameIndicesLen = frameIndices.length;
                            if (frameIndicesLen > 0) {
                                var curStripType = swf.LayerStrip.TYPE_EMPTY;
                                var startFrameIndex = ((uint.MAX_VALUE) >>> 0);
                                var endFrameIndex = ((uint.MAX_VALUE) >>> 0);
                                for (var j = 0; j < frameIndicesLen; j++) {
                                    var curFrameIndex = ((frameIndices[j]) >>> 0);
                                    var curFrameObject = this._frames[curFrameIndex].objects[layer.depth];
                                    if (curFrameObject.isKeyframe) {
                                        layer.appendStrip(curStripType, startFrameIndex, endFrameIndex);
                                        startFrameIndex = curFrameIndex;
                                        curStripType = (is(this.getTag(curFrameObject.characterId), swf.TagDefineMorphShape)) ? swf.LayerStrip.TYPE_SHAPETWEEN : swf.LayerStrip.TYPE_STATIC;
                                    }
                                    else if (curStripType == swf.LayerStrip.TYPE_STATIC && curFrameObject.lastModifiedAtIndex > -1) {
                                        curStripType = swf.LayerStrip.TYPE_MOTIONTWEEN;
                                    }
                                    endFrameIndex = curFrameIndex;
                                }
                                layer.appendStrip(curStripType, startFrameIndex, endFrameIndex);
                            }
                            this._layers.push(layer);
                        }
                        for (i = 0, len = this._frames.length; i < len; i++) {
                            var frameObjs = this._frames[i].objects;
                            var __for6 = window.asc.in(frameObjs);
                            for (var _a = 0, __for6_1 = __for6; _a < __for6_1.length; _a++) {
                                depth = __for6_1[_a];
                                frameObjs[depth].layer = depthsAvailable.indexOf(+depth);
                            }
                        }
                    };
                    SWFTimelineContainer.prototype.toString = function (indent, flags) {
                        if (indent === void 0) { indent = 0; }
                        if (flags === void 0) { flags = 0; }
                        indent = ((indent) >>> 0);
                        flags = ((flags) >>> 0);
                        var i = 0;
                        var len = 0;
                        var str = '';
                        if ((len = ((this._tags.length) >>> 0)) > 0) {
                            str += "\n" + swf.StringUtils.repeat(indent + 2) + "Tags:";
                            for (i = 0; i < len; i++) {
                                str += "\n" + this._tags[i].toString(indent + 4);
                            }
                        }
                        if ((flags & swf.SWF.TOSTRING_FLAG_TIMELINE_STRUCTURE) != 0) {
                            if ((len = ((this._scenes.length) >>> 0)) > 0) {
                                str += "\n" + swf.StringUtils.repeat(indent + 2) + "Scenes:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + this._scenes[i].toString(indent + 4);
                                }
                            }
                            if ((len = ((this._frames.length) >>> 0)) > 0) {
                                str += "\n" + swf.StringUtils.repeat(indent + 2) + "Frames:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + this._frames[i].toString(indent + 4);
                                }
                            }
                            if ((len = ((this._layers.length) >>> 0)) > 0) {
                                str += "\n" + swf.StringUtils.repeat(indent + 2) + "Layers:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + swf.StringUtils.repeat(indent + 4) +
                                        "[" + i + "] " + this._layers[i].toString(indent + 4);
                                }
                            }
                        }
                        return str;
                    };
                    SWFTimelineContainer.sTimeout = 50;
                    SWFTimelineContainer.sAutobuildLayers = false;
                    SWFTimelineContainer.sExtractSoundStream = true;
                    SWFTimelineContainer.sDecodeImageData = true;
                    SWFTimelineContainer.sScalingGrids = null;
                    SWFTimelineContainer.sDisplayObjectContructorMap = {};
                    SWFTimelineContainer.sDisplayObjectNoContructor = {};
                    return SWFTimelineContainer;
                }(swf.SWFEventDispatcher));
                swf.SWFTimelineContainer = SWFTimelineContainer;
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFTimelineContainer.js.map