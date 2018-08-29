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
                    var SWFSymbol = (function () {
                        function SWFSymbol(data) {
                            if (data === void 0) { data = null; }
                            this.tagId = 0;
                            this.name = null;
                            data = strict(data, data_1.SWFData);
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        SWFSymbol.create = function (tagId, name) {
                            tagId = ((tagId) >>> 0);
                            name = as(name, 'String');
                            var swfSymbol = new SWFSymbol;
                            swfSymbol.tagId = tagId;
                            swfSymbol.name = name;
                            return swfSymbol;
                        };
                        SWFSymbol.prototype.parse = function (data) {
                            data = strict(data, data_1.SWFData);
                            this.tagId = data.readUI16();
                            this.name = data.readString();
                        };
                        SWFSymbol.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            data.writeUI16(this.tagId);
                            data.writeString(this.name);
                        };
                        SWFSymbol.prototype.toString = function () {
                            return "TagID: " + this.tagId + ", Name: " + this.name;
                        };
                        return SWFSymbol;
                    }());
                    data_1.SWFSymbol = SWFSymbol;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFSymbol.js.map