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
                    timeline.StringUtils = flash.__native.utils.StringUtils;
                    var Layer = (function () {
                        function Layer(depth, frameCount) {
                            this.depth = 0;
                            this.frameCount = 0;
                            depth = ((depth) >>> 0);
                            frameCount = ((frameCount) >>> 0);
                            this.depth = depth;
                            this.frameCount = frameCount;
                            this.frameStripMap = [];
                            this.strips = [];
                        }
                        Layer.prototype.appendStrip = function (type, start, end) {
                            type = ((type) >>> 0);
                            start = ((start) >>> 0);
                            end = ((end) >>> 0);
                            if (type != timeline.LayerStrip.TYPE_EMPTY) {
                                var i = 0;
                                var stripIndex = this.strips.length;
                                if (stripIndex == 0 && start > 0) {
                                    for (i = 0; i < start; i++) {
                                        this.frameStripMap[i] = stripIndex;
                                    }
                                    this.strips[stripIndex++] = new timeline.LayerStrip(timeline.LayerStrip.TYPE_SPACER, 0, start - 1);
                                }
                                else if (stripIndex > 0) {
                                    var prevStrip = strict(as(this.strips[stripIndex - 1], timeline.LayerStrip), timeline.LayerStrip);
                                    if (prevStrip.endFrameIndex + 1 < start) {
                                        for (i = prevStrip.endFrameIndex + 1; i < start; i++) {
                                            this.frameStripMap[i] = stripIndex;
                                        }
                                        this.strips[stripIndex++] = new timeline.LayerStrip(timeline.LayerStrip.TYPE_SPACER, prevStrip.endFrameIndex + 1, start - 1);
                                    }
                                }
                                for (i = start; i <= end; i++) {
                                    this.frameStripMap[i] = stripIndex;
                                }
                                this.strips[stripIndex] = new timeline.LayerStrip(type, start, end);
                            }
                        };
                        Layer.prototype.getStripsForFrameRegion = function (start, end) {
                            start = ((start) >>> 0);
                            end = ((end) >>> 0);
                            if (start >= this.frameStripMap.length || end < start) {
                                return [];
                            }
                            var startStripIndex = ((this.frameStripMap[start]) >>> 0);
                            var endStripIndex = (((end >= this.frameStripMap.length) ? this.strips.length - 1 : this.frameStripMap[end]) >>> 0);
                            return this.strips.slice(startStripIndex, endStripIndex + 1);
                        };
                        Layer.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            var str = "Depth: " + this.depth + ", Frames: " + this.frameCount;
                            if (this.strips.length > 0) {
                                str += "\n" + timeline.StringUtils.repeat(indent + 2) + "Strips:";
                                for (var i = 0, len = this.strips.length; i < len; i++) {
                                    var strip = strict(as(this.strips[i], timeline.LayerStrip), timeline.LayerStrip);
                                    str += "\n" + timeline.StringUtils.repeat(indent + 4) + "[" + i + "] " + strip.toString();
                                }
                            }
                            return str;
                        };
                        return Layer;
                    }());
                    timeline.Layer = Layer;
                })(timeline = swf.timeline || (swf.timeline = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Layer.js.map