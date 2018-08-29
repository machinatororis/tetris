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
                    timeline.StringUtils = flash.__native.utils.StringUtils;
                    var FrameObject = (function () {
                        function FrameObject(tagIndex, tag) {
                            this.layer = -1;
                            if (tagIndex < 0 || !tag) {
                                return;
                            }
                            this.depth = tag.depth;
                            this.clipDepth = tag.clipDepth;
                            this.characterId = tag.characterId;
                            this.className = tag.className;
                            this.placedAtIndex = ((tagIndex) >>> 0);
                            this.isKeyframe = true;
                            this.setLastModifiedFromTag(tagIndex, tag, 0);
                        }
                        FrameObject.prototype.setLastModifiedFromTag = function (tagIndex, tag, update) {
                            this.lastModifiedNameAtIndex = tag.hasName ? tagIndex : (update ? this.lastModifiedNameAtIndex : -1);
                            this.lastModifiedMatrixAtIndex = tag.hasMatrix ? tagIndex : (update ? this.lastModifiedMatrixAtIndex : -1);
                            this.lastModifiedColorTransformAtIndex = tag.hasColorTransform ? tagIndex : (update ? this.lastModifiedColorTransformAtIndex : -1);
                            this.lastModifiedFilterListAtIndex = tag.hasFilterList ? tagIndex : (update ? this.lastModifiedFilterListAtIndex : -1);
                            this.lastModifiedRatioAtIndex = tag.hasRatio ? tagIndex : (update ? this.lastModifiedRatioAtIndex : -1);
                        };
                        FrameObject.prototype.clone = function () {
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
                        };
                        FrameObject.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            var str = "\n" + timeline.StringUtils.repeat(indent + 2) +
                                "Depth: " + this.depth + (this.layer > -1 ? " (Layer " + this.layer + ")" : "") + ", " +
                                "CharacterId: " + this.characterId + ", ";
                            if (this.className != null) {
                                str += "ClassName: " + this.className + ", ";
                            }
                            str += "PlacedAt: " + this.placedAtIndex;
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
                        };
                        return FrameObject;
                    }());
                    timeline.FrameObject = FrameObject;
                })(timeline = swf.timeline || (swf.timeline = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FrameObject.js.map