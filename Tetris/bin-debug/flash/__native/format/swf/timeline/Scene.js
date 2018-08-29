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
                    var Scene = (function () {
                        function Scene(frameNumber, name) {
                            this.frameNumber = 0;
                            this.name = null;
                            frameNumber = ((frameNumber) >>> 0);
                            name = as(name, 'String');
                            this.frameNumber = frameNumber;
                            this.name = name;
                        }
                        Scene.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            return timeline.StringUtils.repeat(indent) +
                                "Name: " + this.name + ", " +
                                "Frame: " + this.frameNumber;
                        };
                        return Scene;
                    }());
                    timeline.Scene = Scene;
                })(timeline = swf.timeline || (swf.timeline = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Scene.js.map