var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var tags;
                (function (tags) {
                    tags.SWFData = flash.__native.format.swf.SWFData;
                    tags.SWFClipActions = flash.__native.format.swf.data.SWFClipActions;
                    tags.SWFColorTransform = flash.__native.format.swf.data.SWFColorTransform;
                    tags.SWFMatrix = flash.__native.format.swf.data.SWFMatrix;
                    tags.IFilter = flash.__native.format.swf.data.filters.IFilter;
                    var TagPlaceObject = (function () {
                        function TagPlaceObject() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDisplayListTag = null;
                            this.hasClipActions = false;
                            this.hasClipDepth = false;
                            this.hasName = false;
                            this.hasRatio = false;
                            this.hasColorTransform = false;
                            this.hasMatrix = false;
                            this.hasCharacter = false;
                            this.hasMove = false;
                            this.hasOpaqueBackground = false;
                            this.hasVisible = false;
                            this.hasImage = false;
                            this.hasClassName = false;
                            this.hasCacheAsBitmap = false;
                            this.hasBlendMode = false;
                            this.hasFilterList = false;
                            this.characterId = 0;
                            this.depth = 0;
                            this.matrix = null;
                            this.colorTransform = null;
                            this.ratio = 0;
                            this.instanceName = null;
                            this.clipDepth = 0;
                            this.clipActions = null;
                            this.className = null;
                            this.blendMode = 0;
                            this.bitmapCache = 0;
                            this.bitmapBackgroundColor = 0;
                            this.visible = 0;
                            this.metaData = null;
                            this.surfaceFilterList = undefined;
                            this.surfaceFilterList = new Array();
                        }
                        TagPlaceObject.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            var pos = data.position;
                            this.characterId = data.readUI16();
                            this.depth = data.readUI16();
                            this.matrix = data.readMATRIX();
                            this.hasCharacter = true;
                            this.hasMatrix = true;
                            if (data.position - pos < length) {
                                this.colorTransform = data.readCXFORM();
                                this.hasColorTransform = true;
                            }
                        };
                        TagPlaceObject.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            body.writeUI16(this.depth);
                            body.writeMATRIX(this.matrix);
                            if (this.hasColorTransform) {
                                body.writeCXFORM(this.colorTransform);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagPlaceObject.prototype, "type", {
                            get: function () { return TagPlaceObject.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject.prototype, "name", {
                            get: function () { return "PlaceObject"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagPlaceObject.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "Depth: " + this.depth;
                            if (this.hasCharacter) {
                                str += ", CharacterID: " + this.characterId;
                            }
                            if (this.hasMatrix) {
                                str += ", Matrix: " + this.matrix;
                            }
                            if (this.hasColorTransform) {
                                str += ", ColorTransform: " + this.colorTransform;
                            }
                            return str;
                        };
                        TagPlaceObject.TYPE = 4;
                        return TagPlaceObject;
                    }());
                    tags.TagPlaceObject = TagPlaceObject;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagPlaceObject.js.map