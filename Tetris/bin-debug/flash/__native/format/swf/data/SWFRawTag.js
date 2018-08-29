var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var data;
                (function (data_1) {
                    data_1.SWFData = flash.__native.format.swf.SWFData;
                    var SWFRawTag = (function () {
                        function SWFRawTag(data) {
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        SWFRawTag.prototype.parse = function (data) {
                            var pos = data._position;
                            this.header = data.readTagHeader();
                            this.bytes = new data_1.SWFData(data, pos, pos + this.header.headerLength + this.header.contentLength);
                        };
                        SWFRawTag.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            data.writeBytes(this.bytes);
                        };
                        return SWFRawTag;
                    }());
                    data_1.SWFRawTag = SWFRawTag;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFRawTag.js.map