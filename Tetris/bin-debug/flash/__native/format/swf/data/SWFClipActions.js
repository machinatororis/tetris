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
                    data_1.StringUtils = flash.__native.utils.StringUtils;
                    var SWFClipActions = (function () {
                        function SWFClipActions(data, version) {
                            if (data === void 0) { data = null; }
                            if (version === void 0) { version = 0; }
                            this.eventFlags = null;
                            this._records = undefined;
                            data = strict(data, data_1.SWFData);
                            version = ((version) >>> 0);
                            this._records = new Array();
                            if (data != null) {
                                this.parse(data, version);
                            }
                        }
                        Object.defineProperty(SWFClipActions.prototype, "records", {
                            get: function () { return this._records; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFClipActions.prototype.parse = function (data, version) {
                            data = strict(data, data_1.SWFData);
                            version = ((version) >>> 0);
                            data.readUI16();
                            this.eventFlags = data.readCLIPEVENTFLAGS(version);
                            var record;
                            while ((record = data.readCLIPACTIONRECORD(version)) != null) {
                                this._records.push(record);
                            }
                        };
                        SWFClipActions.prototype.publish = function (data, version) {
                            data = strict(data, data_1.SWFData);
                            version = ((version) >>> 0);
                            data.writeUI16(0);
                            data.writeCLIPEVENTFLAGS(this.eventFlags, version);
                            for (var i = 0; i < this.records.length; i++) {
                                data.writeCLIPACTIONRECORD(this.records[i], version);
                            }
                            if (version >= 6) {
                                data.writeUI32(0);
                            }
                            else {
                                data.writeUI16(0);
                            }
                        };
                        SWFClipActions.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = "ClipActions (" + this.eventFlags.toString() + "):";
                            for (var i = 0; i < this._records.length; i++) {
                                str += "\n" + data_1.StringUtils.repeat(indent + 2) + "[" + i + "] " + this._records[i].toString(indent + 2, flags);
                            }
                            return str;
                        };
                        return SWFClipActions;
                    }());
                    data_1.SWFClipActions = SWFClipActions;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFClipActions.js.map