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
                    var SWFSoundInfo = (function () {
                        function SWFSoundInfo(data) {
                            if (data === void 0) { data = null; }
                            this.syncStop = false;
                            this.syncNoMultiple = false;
                            this.hasEnvelope = false;
                            this.hasLoops = false;
                            this.hasOutPoint = false;
                            this.hasInPoint = false;
                            this.outPoint = 0;
                            this.inPoint = 0;
                            this.loopCount = 0;
                            this._envelopeRecords = undefined;
                            data = strict(data, data_1.SWFData);
                            this._envelopeRecords = new Array();
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        Object.defineProperty(SWFSoundInfo.prototype, "envelopeRecords", {
                            get: function () { return this._envelopeRecords; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFSoundInfo.prototype.parse = function (data) {
                            data = strict(data, data_1.SWFData);
                            var flags = data.readUI8();
                            this.syncStop = ((flags & 0x20) != 0);
                            this.syncNoMultiple = ((flags & 0x10) != 0);
                            this.hasEnvelope = ((flags & 0x08) != 0);
                            this.hasLoops = ((flags & 0x04) != 0);
                            this.hasOutPoint = ((flags & 0x02) != 0);
                            this.hasInPoint = ((flags & 0x01) != 0);
                            if (this.hasInPoint) {
                                this.inPoint = data.readUI32();
                            }
                            if (this.hasOutPoint) {
                                this.outPoint = data.readUI32();
                            }
                            if (this.hasLoops) {
                                this.loopCount = data.readUI16();
                            }
                            if (this.hasEnvelope) {
                                var envPoints = data.readUI8();
                                for (var i = 0; i < envPoints; i++) {
                                    this._envelopeRecords.push(data.readSOUNDENVELOPE());
                                }
                            }
                        };
                        SWFSoundInfo.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            var flags = 0;
                            if (this.syncStop) {
                                flags |= 0x20;
                            }
                            if (this.syncNoMultiple) {
                                flags |= 0x10;
                            }
                            if (this.hasEnvelope) {
                                flags |= 0x08;
                            }
                            if (this.hasLoops) {
                                flags |= 0x04;
                            }
                            if (this.hasOutPoint) {
                                flags |= 0x02;
                            }
                            if (this.hasInPoint) {
                                flags |= 0x01;
                            }
                            data.writeUI8(flags);
                            if (this.hasInPoint) {
                                data.writeUI32(this.inPoint);
                            }
                            if (this.hasOutPoint) {
                                data.writeUI32(this.outPoint);
                            }
                            if (this.hasLoops) {
                                data.writeUI16(this.loopCount);
                            }
                            if (this.hasEnvelope) {
                                var envPoints = ((this._envelopeRecords.length) >>> 0);
                                data.writeUI8(envPoints);
                                for (var i = 0; i < envPoints; i++) {
                                    data.writeSOUNDENVELOPE(this._envelopeRecords[i]);
                                }
                            }
                        };
                        SWFSoundInfo.prototype.clone = function () {
                            var soundInfo = new SWFSoundInfo();
                            soundInfo.syncStop = this.syncStop;
                            soundInfo.syncNoMultiple = this.syncNoMultiple;
                            soundInfo.hasEnvelope = this.hasEnvelope;
                            soundInfo.hasLoops = this.hasLoops;
                            soundInfo.hasOutPoint = this.hasOutPoint;
                            soundInfo.hasInPoint = this.hasInPoint;
                            soundInfo.outPoint = this.outPoint;
                            soundInfo.inPoint = this.inPoint;
                            soundInfo.loopCount = this.loopCount;
                            for (var i = 0; i < this._envelopeRecords.length; i++) {
                                soundInfo.envelopeRecords.push(this._envelopeRecords[i].clone());
                            }
                            return soundInfo;
                        };
                        SWFSoundInfo.prototype.toString = function () {
                            return "[SWFSoundInfo]";
                        };
                        return SWFSoundInfo;
                    }());
                    data_1.SWFSoundInfo = SWFSoundInfo;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFSoundInfo.js.map