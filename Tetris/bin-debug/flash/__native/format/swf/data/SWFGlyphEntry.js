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
                    var SWFGlyphEntry = (function () {
                        function SWFGlyphEntry(data, glyphBits, advanceBits) {
                            if (data === void 0) { data = null; }
                            if (glyphBits === void 0) { glyphBits = 0; }
                            if (advanceBits === void 0) { advanceBits = 0; }
                            this.index = 0;
                            this.advance = 0;
                            data = strict(data, data_1.SWFData);
                            glyphBits = ((glyphBits) >>> 0);
                            advanceBits = ((advanceBits) >>> 0);
                            if (data != null) {
                                this.parse(data, glyphBits, advanceBits);
                            }
                        }
                        SWFGlyphEntry.prototype.parse = function (data, glyphBits, advanceBits) {
                            data = strict(data, data_1.SWFData);
                            glyphBits = ((glyphBits) >>> 0);
                            advanceBits = ((advanceBits) >>> 0);
                            this.index = data.readUB(glyphBits);
                            this.advance = ((data.readSB(advanceBits) / 20) >> 0);
                        };
                        SWFGlyphEntry.prototype.publish = function (data, glyphBits, advanceBits) {
                            data = strict(data, data_1.SWFData);
                            glyphBits = ((glyphBits) >>> 0);
                            advanceBits = ((advanceBits) >>> 0);
                            data.writeUB(glyphBits, this.index);
                            data.writeSB(advanceBits, this.advance);
                        };
                        SWFGlyphEntry.prototype.clone = function () {
                            var entry = new SWFGlyphEntry();
                            entry.index = this.index;
                            entry.advance = this.advance;
                            return entry;
                        };
                        SWFGlyphEntry.prototype.toString = function () {
                            return "[SWFGlyphEntry] Index: " + this.index.toString() + ", Advance: " + this.advance.toString();
                        };
                        return SWFGlyphEntry;
                    }());
                    data_1.SWFGlyphEntry = SWFGlyphEntry;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFGlyphEntry.js.map