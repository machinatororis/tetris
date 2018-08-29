var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var timeline;
                (function (timeline) {
                    timeline.TagPlaceObject = flash.__native.format.swf.tags.TagPlaceObject;
                    timeline.TagRemoveObject = flash.__native.format.swf.tags.TagRemoveObject;
                    timeline.StringUtils = flash.__native.utils.StringUtils;
                    var Frame = (function () {
                        function Frame(frameNumber, tagIndexStart) {
                            if (frameNumber === void 0) { frameNumber = 0; }
                            if (tagIndexStart === void 0) { tagIndexStart = 0; }
                            this.tagIndexEnd = 0;
                            frameNumber = ((frameNumber) >>> 0);
                            tagIndexStart = ((tagIndexStart) >>> 0);
                            this.frameNumber = frameNumber;
                            this.tagIndexStart = tagIndexStart;
                            this.objects = {};
                            this.characters = [];
                        }
                        Frame.prototype.getObjectsSortedByDepth = function () {
                            if (this._objectsSortedByDepth == null) {
                                var depths = Object.keys(this.objects);
                                depths.sort(Array.NUMERIC);
                                this._objectsSortedByDepth = [];
                                for (var i = 0, len = depths.length; i < len; i++) {
                                    this._objectsSortedByDepth[i] = this.objects[depths[i]];
                                }
                            }
                            return this._objectsSortedByDepth;
                        };
                        Object.defineProperty(Frame.prototype, "tagCount", {
                            get: function () {
                                return this.tagIndexEnd - this.tagIndexStart + 1;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Frame.prototype.placeObject = function (tagIndex, tag) {
                            var frameObject = this.objects[tag.depth];
                            if (frameObject) {
                                if (tag.characterId == 0) {
                                    frameObject.isKeyframe = false;
                                    frameObject.setLastModifiedFromTag(tagIndex, tag, tag.hasMove ? 1 : 0);
                                }
                                else {
                                    frameObject.isKeyframe = true;
                                    if (tag.characterId != frameObject.characterId) {
                                        frameObject.placedAtIndex = tagIndex;
                                        frameObject.characterId = tag.characterId;
                                        frameObject.setLastModifiedFromTag(tagIndex, tag, tag.hasMove ? 1 : 0);
                                    }
                                    else {
                                        frameObject.setLastModifiedFromTag(tagIndex, tag, 1);
                                    }
                                }
                            }
                            else {
                                this.objects[tag.depth] = new timeline.FrameObject(tagIndex, tag);
                            }
                            this._objectsSortedByDepth = null;
                        };
                        Frame.prototype.removeObject = function (tag) {
                            tag = strict(tag, timeline.TagRemoveObject);
                            delete this.objects[tag.depth];
                            this._objectsSortedByDepth = null;
                        };
                        Frame.prototype.clone = function () {
                            var frame = new Frame;
                            var frameObjects = frame.objects;
                            var __for0 = window.asc.in(this.objects);
                            for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                                var depth = __for0_1[_i];
                                frameObjects[depth] = this.objects[depth].clone();
                            }
                            return frame;
                        };
                        Frame.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            var str = timeline.StringUtils.repeat(indent) + "[" + this.frameNumber + "] " +
                                "Start: " + this.tagIndexStart + ", " +
                                "Length: " + this.tagCount;
                            if (this.label != null && this.label != "") {
                                str += ", Label: " + this.label;
                            }
                            if (this.characters.length > 0) {
                                str += "\n" + timeline.StringUtils.repeat(indent + 2) + "Defined CharacterIDs: " + this.characters.join(", ");
                            }
                            var __for1 = window.asc.in(this.objects);
                            for (var _i = 0, __for1_1 = __for1; _i < __for1_1.length; _i++) {
                                var depth = __for1_1[_i];
                                str += this.objects[depth].toString(indent);
                            }
                            return str;
                        };
                        return Frame;
                    }());
                    timeline.Frame = Frame;
                })(timeline = swf.timeline || (swf.timeline = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Frame.js.map