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
                    var SWFGradient = (function () {
                        function SWFGradient(data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            this.spreadMode = 0;
                            this.interpolationMode = 0;
                            this.focalPoint = 0.0;
                            this._records = undefined;
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            this._records = new Array();
                            if (data != null) {
                                this.parse(data, level);
                            }
                        }
                        Object.defineProperty(SWFGradient.prototype, "records", {
                            get: function () { return this._records; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFGradient.prototype.parse = function (data, level) {
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            data.resetBitsPending();
                            this.spreadMode = data.readUB(2);
                            this.interpolationMode = data.readUB(2);
                            var numGradients = data.readUB(4);
                            for (var i = 0; i < numGradients; i++) {
                                this._records.push(data.readGRADIENTRECORD(level));
                            }
                        };
                        SWFGradient.prototype.publish = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            var numRecords = ((this.records.length) >>> 0);
                            data.resetBitsPending();
                            data.writeUB(2, this.spreadMode);
                            data.writeUB(2, this.interpolationMode);
                            data.writeUB(4, numRecords);
                            for (var i = 0; i < numRecords; i++) {
                                data.writeGRADIENTRECORD(this.records[i], level);
                            }
                        };
                        SWFGradient.prototype.clone = function () {
                            var gradient = new SWFGradient();
                            gradient.spreadMode = this.spreadMode;
                            gradient.interpolationMode = this.interpolationMode;
                            gradient.focalPoint = this.focalPoint;
                            for (var i = 0; i < this.records.length; i++) {
                                gradient.records.push(this.records[i].clone());
                            }
                            return gradient;
                        };
                        SWFGradient.prototype.toString = function () {
                            return "(" + this._records.join(",") + "), SpreadMode: " + this.spreadMode + ", InterpolationMode: " + this.interpolationMode;
                        };
                        return SWFGradient;
                    }());
                    data_1.SWFGradient = SWFGradient;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFGradient.js.map