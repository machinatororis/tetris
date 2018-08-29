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
                    var SWFRecordHeader = (function () {
                        function SWFRecordHeader(type, contentLength, headerLength) {
                            this.type = 0;
                            this.contentLength = 0;
                            this.headerLength = 0;
                            type = ((type) >>> 0);
                            contentLength = ((contentLength) >>> 0);
                            headerLength = ((headerLength) >>> 0);
                            this.type = type;
                            this.contentLength = contentLength;
                            this.headerLength = headerLength;
                        }
                        Object.defineProperty(SWFRecordHeader.prototype, "tagLength", {
                            get: function () {
                                return this.headerLength + this.contentLength;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        SWFRecordHeader.prototype.toString = function () {
                            return "[SWFRecordHeader] type: " + this.type + ", headerLength: " + this.headerLength + ", contentlength: " + this.contentLength;
                        };
                        return SWFRecordHeader;
                    }());
                    data.SWFRecordHeader = SWFRecordHeader;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFRecordHeader.js.map