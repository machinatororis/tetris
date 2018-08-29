var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var tags;
                (function (tags) {
                    tags.SWFData = flash.__native.format.swf.SWFData;
                    tags.SWFZoneRecord = flash.__native.format.swf.data.SWFZoneRecord;
                    tags.CSMTableHint = flash.__native.format.swf.data.consts.CSMTableHint;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagDefineFontAlignZones = (function () {
                        function TagDefineFontAlignZones() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.fontId = 0;
                            this.csmTableHint = 0;
                            this._zoneTable = undefined;
                            this._zoneTable = new Array();
                        }
                        Object.defineProperty(TagDefineFontAlignZones.prototype, "zoneTable", {
                            get: function () { return this._zoneTable; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFontAlignZones.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.fontId = data.readUI16();
                            this.csmTableHint = (((data.readUI8() >> 6)) >>> 0);
                            var recordsEndPos = ((data.position + length - 3) >>> 0);
                            while (data.position < recordsEndPos) {
                                this._zoneTable.push(data.readZONERECORD());
                            }
                        };
                        TagDefineFontAlignZones.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.fontId);
                            body.writeUI8(this.csmTableHint << 6);
                            for (var i = 0, len = ((this._zoneTable.length) >>> 0); i < len; i++) {
                                body.writeZONERECORD(this._zoneTable[i]);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagDefineFontAlignZones.prototype, "type", {
                            get: function () { return TagDefineFontAlignZones.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontAlignZones.prototype, "name", {
                            get: function () { return "DefineFontAlignZones"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontAlignZones.prototype, "version", {
                            get: function () { return 8; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontAlignZones.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFontAlignZones.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "FontID: " + this.fontId + ", " +
                                "CSMTableHint: " + tags.CSMTableHint.toString(this.csmTableHint) + ", " +
                                "Records: " + this._zoneTable.length;
                            for (var i = 0, len = ((this._zoneTable.length) >>> 0); i < len; i++) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "[" + i + "] " + this._zoneTable[i].toString(indent + 2);
                            }
                            return str;
                        };
                        TagDefineFontAlignZones.TYPE = 73;
                        return TagDefineFontAlignZones;
                    }());
                    tags.TagDefineFontAlignZones = TagDefineFontAlignZones;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineFontAlignZones.js.map