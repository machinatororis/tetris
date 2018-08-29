var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var instance;
                (function (instance) {
                    instance.FrameObject = flash.__native.format.swf.timeline.FrameObject;
                    instance.DisplayObject = flash.display.DisplayObject;
                    var ChildObject = (function () {
                        function ChildObject(object, frameObject) {
                            this.object = object;
                            this.frameObject = frameObject;
                        }
                        return ChildObject;
                    }());
                    instance.ChildObject = ChildObject;
                })(instance = swf.instance || (swf.instance = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ChildObject.js.map