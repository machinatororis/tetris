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
                    var SWFZoneData = (function () {
                        function SWFZoneData(data) {
                            if (data === void 0) { data = null; }
                            this.alignmentCoordinate = NaN;
                            this.range = NaN;
                            data = strict(data, data_1.SWFData);
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        SWFZoneData.prototype.parse = function (data) {
                            data = strict(data, data_1.SWFData);
                            this.alignmentCoordinate = data.readFLOAT16();
                            this.range = data.readFLOAT16();
                        };
                        SWFZoneData.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            data.writeFLOAT16(this.alignmentCoordinate);
                            data.writeFLOAT16(this.range);
                        };
                        SWFZoneData.prototype.toString = function () {
                            return "(" + this.alignmentCoordinate + "," + this.range + ")";
                        };
                        return SWFZoneData;
                    }());
                    data_1.SWFZoneData = SWFZoneData;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFZoneData.js.map