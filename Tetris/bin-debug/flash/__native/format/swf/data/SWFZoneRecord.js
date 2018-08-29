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
                    var SWFZoneRecord = (function () {
                        function SWFZoneRecord(data) {
                            if (data === void 0) { data = null; }
                            this.maskX = false;
                            this.maskY = false;
                            this._zoneData = undefined;
                            data = strict(data, data_1.SWFData);
                            this._zoneData = new Array();
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        Object.defineProperty(SWFZoneRecord.prototype, "zoneData", {
                            get: function () { return this._zoneData; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFZoneRecord.prototype.parse = function (data) {
                            data = strict(data, data_1.SWFData);
                            var numZoneData = data.readUI8();
                            for (var i = 0; i < numZoneData; i++) {
                                this._zoneData.push(data.readZONEDATA());
                            }
                            var mask = data.readUI8();
                            this.maskX = ((mask & 0x01) != 0);
                            this.maskY = ((mask & 0x02) != 0);
                        };
                        SWFZoneRecord.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            var numZoneData = ((this._zoneData.length) >>> 0);
                            data.writeUI8(numZoneData);
                            for (var i = 0; i < numZoneData; i++) {
                                data.writeZONEDATA(this._zoneData[i]);
                            }
                            var mask = 0;
                            if (this.maskX) {
                                mask |= 0x01;
                            }
                            if (this.maskY) {
                                mask |= 0x02;
                            }
                            data.writeUI8(mask);
                        };
                        SWFZoneRecord.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            var str = "MaskY: " + this.maskY + ", MaskX: " + this.maskX;
                            for (var i = 0; i < this._zoneData.length; i++) {
                                str += ", " + i + ": " + this._zoneData[i].toString();
                            }
                            return str;
                        };
                        return SWFZoneRecord;
                    }());
                    data_1.SWFZoneRecord = SWFZoneRecord;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFZoneRecord.js.map