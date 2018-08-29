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
                    data_1.ColorUtils = flash.__native.format.swf.utils.ColorUtils;
                    data_1.StringUtils = flash.__native.utils.StringUtils;
                    var SWFTextRecord = (function () {
                        function SWFTextRecord(data, glyphBits, advanceBits, previousRecord, level) {
                            if (data === void 0) { data = null; }
                            if (glyphBits === void 0) { glyphBits = 0; }
                            if (advanceBits === void 0) { advanceBits = 0; }
                            if (previousRecord === void 0) { previousRecord = null; }
                            if (level === void 0) { level = 1; }
                            this.type = 0;
                            this.hasFont = false;
                            this.hasColor = false;
                            this.hasXOffset = false;
                            this.hasYOffset = false;
                            this.fontId = 0;
                            this.textColor = 0;
                            this.textHeight = 0;
                            this.xOffset = 0;
                            this.yOffset = 0;
                            this._glyphEntries = undefined;
                            this._level = 0;
                            data = strict(data, data_1.SWFData);
                            glyphBits = ((glyphBits) >>> 0);
                            advanceBits = ((advanceBits) >>> 0);
                            previousRecord = strict(previousRecord, SWFTextRecord);
                            level = ((level) >>> 0);
                            this._glyphEntries = new Array();
                            if (data != null) {
                                this.parse(data, glyphBits, advanceBits, previousRecord, level);
                            }
                        }
                        Object.defineProperty(SWFTextRecord.prototype, "glyphEntries", {
                            get: function () { return this._glyphEntries; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFTextRecord.prototype.parse = function (data, glyphBits, advanceBits, previousRecord, level) {
                            if (previousRecord === void 0) { previousRecord = null; }
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            glyphBits = ((glyphBits) >>> 0);
                            advanceBits = ((advanceBits) >>> 0);
                            previousRecord = strict(previousRecord, SWFTextRecord);
                            level = ((level) >>> 0);
                            this._level = level;
                            var styles = data.readUI8();
                            this.type = ((styles >> 7) >>> 0);
                            this.hasFont = ((styles & 0x08) != 0);
                            this.hasColor = ((styles & 0x04) != 0);
                            this.hasYOffset = ((styles & 0x02) != 0);
                            this.hasXOffset = ((styles & 0x01) != 0);
                            if (this.hasFont) {
                                this.fontId = data.readUI16();
                            }
                            else if (previousRecord != null) {
                                this.fontId = previousRecord.fontId;
                            }
                            if (this.hasColor) {
                                this.textColor = (level < 2) ? data.readRGB() : data.readRGBA();
                            }
                            else if (previousRecord != null) {
                                this.textColor = previousRecord.textColor;
                            }
                            if (this.hasXOffset) {
                                this.xOffset = ((data.readSI16() / 20) >> 0);
                            }
                            else if (previousRecord != null) {
                                this.xOffset = previousRecord.xOffset;
                            }
                            if (this.hasYOffset) {
                                this.yOffset = ((data.readSI16() / 20) >> 0);
                            }
                            else if (previousRecord != null) {
                                this.yOffset = previousRecord.yOffset;
                            }
                            if (this.hasFont) {
                                this.textHeight = ((data.readUI16() / 20) >>> 0);
                            }
                            else if (previousRecord != null) {
                                this.textHeight = previousRecord.textHeight;
                            }
                            var glyphCount = data.readUI8();
                            for (var i = 0; i < glyphCount; i++) {
                                this._glyphEntries.push(data.readGLYPHENTRY(glyphBits, advanceBits));
                            }
                        };
                        SWFTextRecord.prototype.publish = function (data, glyphBits, advanceBits, previousRecord, level) {
                            if (previousRecord === void 0) { previousRecord = null; }
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            glyphBits = ((glyphBits) >>> 0);
                            advanceBits = ((advanceBits) >>> 0);
                            previousRecord = strict(previousRecord, SWFTextRecord);
                            level = ((level) >>> 0);
                            var flags = (((this.type << 7)) >>> 0);
                            this.hasFont = (previousRecord == null
                                || (previousRecord.fontId != this.fontId)
                                || (previousRecord.textHeight != this.textHeight));
                            this.hasColor = (previousRecord == null || (previousRecord.textColor != this.textColor));
                            this.hasXOffset = (previousRecord == null || (previousRecord.xOffset != this.xOffset));
                            this.hasYOffset = (previousRecord == null || (previousRecord.yOffset != this.yOffset));
                            if (this.hasFont) {
                                flags |= 0x08;
                            }
                            if (this.hasColor) {
                                flags |= 0x04;
                            }
                            if (this.hasYOffset) {
                                flags |= 0x02;
                            }
                            if (this.hasXOffset) {
                                flags |= 0x01;
                            }
                            data.writeUI8(flags);
                            if (this.hasFont) {
                                data.writeUI16(this.fontId);
                            }
                            if (this.hasColor) {
                                if (level >= 2) {
                                    data.writeRGBA(this.textColor);
                                }
                                else {
                                    data.writeRGB(this.textColor);
                                }
                            }
                            if (this.hasXOffset) {
                                data.writeSI16(this.xOffset);
                            }
                            if (this.hasYOffset) {
                                data.writeSI16(this.yOffset);
                            }
                            if (this.hasFont) {
                                data.writeUI16(this.textHeight);
                            }
                            var glyphCount = ((this._glyphEntries.length) >>> 0);
                            data.writeUI8(glyphCount);
                            for (var i = 0; i < glyphCount; i++) {
                                data.writeGLYPHENTRY(this._glyphEntries[i], glyphBits, advanceBits);
                            }
                        };
                        SWFTextRecord.prototype.clone = function () {
                            var record = new SWFTextRecord();
                            record.type = this.type;
                            record.hasFont = this.hasFont;
                            record.hasColor = this.hasColor;
                            record.hasXOffset = this.hasXOffset;
                            record.hasYOffset = this.hasYOffset;
                            record.fontId = this.fontId;
                            record.textColor = this.textColor;
                            record.textHeight = this.textHeight;
                            record.xOffset = this.xOffset;
                            record.yOffset = this.yOffset;
                            for (var i = 0; i < this._glyphEntries.length; i++) {
                                record.glyphEntries.push(this._glyphEntries[i].clone());
                            }
                            return record;
                        };
                        SWFTextRecord.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            var params = ["Glyphs: " + this._glyphEntries.length.toString()];
                            if (this.hasFont) {
                                params.push("FontID: " + this.fontId);
                                params.push("Height: " + this.textHeight);
                            }
                            if (this.hasColor) {
                                params.push("Color: " + ((this._level <= 2) ? data_1.ColorUtils.rgbToString(this.textColor) : data_1.ColorUtils.rgbaToString(this.textColor)));
                            }
                            if (this.hasXOffset) {
                                params.push("XOffset: " + this.xOffset);
                            }
                            if (this.hasYOffset) {
                                params.push("YOffset: " + this.yOffset);
                            }
                            var str = params.join(", ");
                            for (var i = 0; i < this._glyphEntries.length; i++) {
                                str += "\n" + data_1.StringUtils.repeat(indent + 2) + "[" + i + "] " + this._glyphEntries[i].toString();
                            }
                            return str;
                        };
                        return SWFTextRecord;
                    }());
                    data_1.SWFTextRecord = SWFTextRecord;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFTextRecord.js.map