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
                    var SWFMorphGradient = (function () {
                        function SWFMorphGradient(data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            this.spreadMode = 0;
                            this.interpolationMode = 0;
                            this.startFocalPoint = 0.0;
                            this.endFocalPoint = 0.0;
                            this._records = undefined;
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            this._records = new Array();
                            if (data != null) {
                                this.parse(data, level);
                            }
                        }
                        Object.defineProperty(SWFMorphGradient.prototype, "records", {
                            get: function () { return this._records; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFMorphGradient.prototype.parse = function (data, level) {
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            data.resetBitsPending();
                            this.spreadMode = data.readUB(2);
                            this.interpolationMode = data.readUB(2);
                            var numGradients = data.readUB(4);
                            for (var i = 0; i < numGradients; i++) {
                                this._records.push(data.readMORPHGRADIENTRECORD());
                            }
                        };
                        SWFMorphGradient.prototype.publish = function (data, level) {
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            var numGradients = ((this.records.length) >>> 0);
                            data.resetBitsPending();
                            data.writeUB(2, this.spreadMode);
                            data.writeUB(2, this.interpolationMode);
                            data.writeUB(4, numGradients);
                            for (var i = 0; i < numGradients; i++) {
                                data.writeMORPHGRADIENTRECORD(this._records[i]);
                            }
                        };
                        SWFMorphGradient.prototype.getMorphedGradient = function (ratio) {
                            if (ratio === void 0) { ratio = 0; }
                            ratio = (+(ratio));
                            var gradient = new data_1.SWFGradient();
                            for (var i = 0, len = ((this.records.length) >>> 0); i < len; i++) {
                                gradient.records.push(this.records[i].getMorphedGradientRecord(ratio));
                            }
                            return gradient;
                        };
                        SWFMorphGradient.prototype.toString = function () {
                            return "(" + this._records.join(",") + "), spread:" + this.spreadMode + ", interpolation:" + this.interpolationMode;
                        };
                        return SWFMorphGradient;
                    }());
                    data_1.SWFMorphGradient = SWFMorphGradient;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFMorphGradient.js.map