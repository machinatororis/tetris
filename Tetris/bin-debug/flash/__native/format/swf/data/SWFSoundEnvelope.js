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
                    var SWFSoundEnvelope = (function () {
                        function SWFSoundEnvelope(data) {
                            if (data === void 0) { data = null; }
                            this.pos44 = 0;
                            this.leftLevel = 0;
                            this.rightLevel = 0;
                            data = strict(data, data_1.SWFData);
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        SWFSoundEnvelope.prototype.parse = function (data) {
                            data = strict(data, data_1.SWFData);
                            this.pos44 = data.readUI32();
                            this.leftLevel = data.readUI16();
                            this.rightLevel = data.readUI16();
                        };
                        SWFSoundEnvelope.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            data.writeUI32(this.pos44);
                            data.writeUI16(this.leftLevel);
                            data.writeUI16(this.rightLevel);
                        };
                        SWFSoundEnvelope.prototype.clone = function () {
                            var soundEnvelope = new SWFSoundEnvelope();
                            soundEnvelope.pos44 = this.pos44;
                            soundEnvelope.leftLevel = this.leftLevel;
                            soundEnvelope.rightLevel = this.rightLevel;
                            return soundEnvelope;
                        };
                        SWFSoundEnvelope.prototype.toString = function () {
                            return "[SWFSoundEnvelope]";
                        };
                        return SWFSoundEnvelope;
                    }());
                    data_1.SWFSoundEnvelope = SWFSoundEnvelope;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFSoundEnvelope.js.map