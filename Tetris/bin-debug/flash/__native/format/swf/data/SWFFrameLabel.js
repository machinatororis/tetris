var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var data;
                (function (data) {
                    var SWFFrameLabel = (function () {
                        function SWFFrameLabel(frameNumber, name) {
                            this.frameNumber = 0;
                            this.name = null;
                            frameNumber = ((frameNumber) >>> 0);
                            name = as(name, 'String');
                            this.frameNumber = frameNumber;
                            this.name = name;
                        }
                        SWFFrameLabel.prototype.toString = function () {
                            return "Frame: " + this.frameNumber + ", Name: " + this.name;
                        };
                        return SWFFrameLabel;
                    }());
                    data.SWFFrameLabel = SWFFrameLabel;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFFrameLabel.js.map