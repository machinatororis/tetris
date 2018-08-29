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
                    var LayerStrip = (function () {
                        function LayerStrip(type, startFrameIndex, endFrameIndex) {
                            this.type = LayerStrip.TYPE_EMPTY;
                            this.startFrameIndex = 0;
                            this.endFrameIndex = 0;
                            type = ((type) >>> 0);
                            startFrameIndex = ((startFrameIndex) >>> 0);
                            endFrameIndex = ((endFrameIndex) >>> 0);
                            this.type = type;
                            this.startFrameIndex = startFrameIndex;
                            this.endFrameIndex = endFrameIndex;
                        }
                        LayerStrip.prototype.toString = function () {
                            var str;
                            if (this.startFrameIndex == this.endFrameIndex) {
                                str = "Frame: " + this.startFrameIndex;
                            }
                            else {
                                str = "Frames: " + this.startFrameIndex + "-" + this.endFrameIndex;
                            }
                            str += ", Type: ";
                            switch (this.type) {
                                case LayerStrip.TYPE_EMPTY:
                                    str += "EMPTY";
                                    break;
                                case LayerStrip.TYPE_SPACER:
                                    str += "SPACER";
                                    break;
                                case LayerStrip.TYPE_STATIC:
                                    str += "STATIC";
                                    break;
                                case LayerStrip.TYPE_MOTIONTWEEN:
                                    str += "MOTIONTWEEN";
                                    break;
                                case LayerStrip.TYPE_SHAPETWEEN:
                                    str += "SHAPETWEEN";
                                    break;
                                default:
                                    str += "unknown";
                                    break;
                            }
                            return str;
                        };
                        LayerStrip.TYPE_EMPTY = 0;
                        LayerStrip.TYPE_SPACER = 1;
                        LayerStrip.TYPE_STATIC = 2;
                        LayerStrip.TYPE_MOTIONTWEEN = 3;
                        LayerStrip.TYPE_SHAPETWEEN = 4;
                        return LayerStrip;
                    }());
                    timeline.LayerStrip = LayerStrip;
                })(timeline = swf.timeline || (swf.timeline = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=LayerStrip.js.map