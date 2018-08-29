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
                    var SWFKerningRecord = (function () {
                        function SWFKerningRecord(data, wideCodes) {
                            if (wideCodes === void 0) { wideCodes = false; }
                            if (data != null) {
                                this.parse(data, wideCodes);
                            }
                        }
                        SWFKerningRecord.prototype.parse = function (data, wideCodes) {
                            this.code1 = wideCodes ? data.readUI16() : data.readUI8();
                            this.code2 = wideCodes ? data.readUI16() : data.readUI8();
                            this.adjustment = data.readSI16();
                        };
                        SWFKerningRecord.prototype.publish = function (data, wideCodes) {
                            data = strict(data, data_1.SWFData);
                            wideCodes = Boolean(wideCodes);
                            if (wideCodes) {
                                data.writeUI16(this.code1);
                            }
                            else {
                                data.writeUI8(this.code1);
                            }
                            if (wideCodes) {
                                data.writeUI16(this.code2);
                            }
                            else {
                                data.writeUI8(this.code2);
                            }
                            data.writeSI16(this.adjustment);
                        };
                        SWFKerningRecord.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            return "Code1: " + this.code1 + ", " + "Code2: " + this.code2 + ", " + "Adjustment: " + this.adjustment;
                        };
                        return SWFKerningRecord;
                    }());
                    data_1.SWFKerningRecord = SWFKerningRecord;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFKerningRecord.js.map