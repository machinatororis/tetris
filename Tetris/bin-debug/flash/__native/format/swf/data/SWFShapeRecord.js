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
                    var SWFShapeRecord = (function () {
                        function SWFShapeRecord(data, level) {
                            if (level === void 0) { level = 1; }
                            if (data != null) {
                                this.parse(data, level);
                            }
                        }
                        Object.defineProperty(SWFShapeRecord.prototype, "type", {
                            get: function () { return SWFShapeRecord.TYPE_UNKNOWN; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFShapeRecord.prototype, "isEdgeRecord", {
                            get: function () {
                                return (this.type == SWFShapeRecord.TYPE_STRAIGHTEDGE || this.type == SWFShapeRecord.TYPE_CURVEDEDGE);
                            },
                            enumerable: true,
                            configurable: true
                        });
                        SWFShapeRecord.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                        };
                        SWFShapeRecord.prototype.publish = function (data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                        };
                        SWFShapeRecord.prototype.clone = function () { return null; };
                        SWFShapeRecord.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            return "[SWFShapeRecord]";
                        };
                        SWFShapeRecord.TYPE_UNKNOWN = 0;
                        SWFShapeRecord.TYPE_END = 1;
                        SWFShapeRecord.TYPE_STYLECHANGE = 2;
                        SWFShapeRecord.TYPE_STRAIGHTEDGE = 3;
                        SWFShapeRecord.TYPE_CURVEDEDGE = 4;
                        return SWFShapeRecord;
                    }());
                    data_1.SWFShapeRecord = SWFShapeRecord;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFShapeRecord.js.map