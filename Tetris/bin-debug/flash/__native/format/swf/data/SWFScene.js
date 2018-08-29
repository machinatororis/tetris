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
                    var SWFScene = (function () {
                        function SWFScene(offset, name) {
                            this.offset = 0;
                            this.name = null;
                            offset = ((offset) >>> 0);
                            name = as(name, 'String');
                            this.offset = offset;
                            this.name = name;
                        }
                        SWFScene.prototype.toString = function () {
                            return "Frame: " + this.offset + ", Name: " + this.name;
                        };
                        return SWFScene;
                    }());
                    data.SWFScene = SWFScene;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFScene.js.map