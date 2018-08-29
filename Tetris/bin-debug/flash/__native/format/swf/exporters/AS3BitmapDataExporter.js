var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var exporters;
                (function (exporters) {
                    exporters.SystemBitmapData = flash.__native.display.SystemBitmapData;
                    exporters.BitmapFormat = flash.__native.format.swf.data.consts.BitmapFormat;
                    exporters.ITag = flash.__native.format.swf.tags.ITag;
                    exporters.TagDefineBits = flash.__native.format.swf.tags.TagDefineBits;
                    exporters.TagDefineBitsLossless = flash.__native.format.swf.tags.TagDefineBitsLossless;
                    exporters.BitmapData = flash.display.BitmapData;
                    exporters.ErrorEvent = flash.events.ErrorEvent;
                    var AS3BitmapDataExporter = (function () {
                        function AS3BitmapDataExporter() {
                        }
                        AS3BitmapDataExporter.exportBitmapData = function (tag, complete, error) {
                            if (complete === void 0) { complete = null; }
                            if (error === void 0) { error = null; }
                            tag = strict(tag, 'implements_flash___native_format_swf_tags_ITag');
                            var bitmapData;
                            if (is(tag, exporters.TagDefineBitsLossless)) {
                                var x, y;
                                var dataLossless = tag;
                                var bitmapWidth = dataLossless.bitmapWidth;
                                var bitmapHeight = dataLossless.bitmapHeight;
                                var transparent = dataLossless.level > 1;
                                var buffer = dataLossless._zlibBitmapData;
                                var padding = (4 - bitmapWidth % 4) % 4;
                                bitmapData = new exporters.SystemBitmapData(exporters.SystemBitmapData.SWF, bitmapWidth, bitmapHeight, transparent, 0x0, false);
                                var pixels = bitmapData.__beginModifyPixels();
                                buffer.uncompress();
                                buffer.position = 0;
                                if (dataLossless.bitmapFormat == exporters.BitmapFormat.BIT_8) {
                                    var colorTable = new Array(dataLossless.bitmapColorTableSize * 4);
                                    var colorTableSize = colorTable.length;
                                    if (transparent) {
                                        for (var i = 0; i < colorTableSize; i += 4) {
                                            var color = buffer.readUnsignedInt();
                                            var r = color >> 24 & 0xff;
                                            var g = color >> 16 & 0xff;
                                            var b = color >> 8 & 0xff;
                                            var a = color & 0xff;
                                            colorTable[i] = r;
                                            colorTable[i + 1] = g;
                                            colorTable[i + 2] = b;
                                            colorTable[i + 3] = a;
                                        }
                                    }
                                    else {
                                        for (var i = 0; i < colorTableSize; i += 4) {
                                            var color = buffer.readUnsignedShort();
                                            var r = color >> 8 & 0xff;
                                            var g = color & 0xff;
                                            var b = buffer.readUnsignedByte();
                                            colorTable[i] = r;
                                            colorTable[i + 1] = g;
                                            colorTable[i + 2] = b;
                                            colorTable[i + 3] = 0xff;
                                        }
                                    }
                                    var byteIndex = 0;
                                    var byte0, byte1, byte2, byte3;
                                    var groupLength = ((bitmapWidth * bitmapHeight) / 4) | 0;
                                    for (y = 0; y < bitmapHeight; ++y) {
                                        for (x = 0; x < bitmapWidth; ++x) {
                                            var index = -1;
                                            if (groupLength > 0 || byteIndex > 0) {
                                                if (byteIndex == 0) {
                                                    var group = buffer.readUnsignedInt();
                                                    byte0 = group >> 24 & 0xff;
                                                    byte1 = group >> 16 & 0xff;
                                                    byte2 = group >> 8 & 0xff;
                                                    byte3 = group & 0xff;
                                                    groupLength--;
                                                    index = byte0;
                                                    byteIndex++;
                                                }
                                                else if (byteIndex == 1) {
                                                    index = byte1;
                                                    byteIndex++;
                                                }
                                                else if (byteIndex == 2) {
                                                    index = byte2;
                                                    byteIndex++;
                                                }
                                                else if (byteIndex == 3) {
                                                    index = byte3;
                                                    byteIndex = 0;
                                                }
                                            }
                                            if (index == -1) {
                                                index = buffer.readUnsignedByte();
                                            }
                                            index *= 4;
                                            if (index < 0 || index >= colorTableSize) {
                                                continue;
                                            }
                                            var p = (y * bitmapWidth + x) * 4;
                                            pixels[p] = colorTable[index];
                                            pixels[p + 1] = colorTable[index + 1];
                                            pixels[p + 2] = colorTable[index + 2];
                                            pixels[p + 3] = colorTable[index + 3];
                                        }
                                        buffer.position += padding;
                                    }
                                }
                                else {
                                    for (y = 0; y < bitmapHeight; ++y) {
                                        for (x = 0; x < bitmapWidth; ++x) {
                                            var color = buffer.readUnsignedInt();
                                            var a = color >> 24 & 0xff;
                                            var r = color >> 16 & 0xff;
                                            var g = color >> 8 & 0xff;
                                            var b = color & 0xff;
                                            var p = (y * bitmapWidth + x) * 4;
                                            pixels[p] = r;
                                            pixels[p + 1] = g;
                                            pixels[p + 2] = b;
                                            pixels[p + 3] = a;
                                        }
                                    }
                                }
                                bitmapData.__endModifyPixels();
                            }
                            else if (is(tag, exporters.TagDefineBits)) {
                                tag.exportBitmapData(onComplete.__bind(this), onError.__bind(this));
                            }
                            bitmapData && onComplete.__bind(this)(bitmapData);
                            function onComplete(data) {
                                data = strict(data, exporters.BitmapData);
                                tag['instance'] = data;
                                unbind(complete) != unbind(null) && complete(data);
                            }
                            function onError(event) {
                                event = strict(event, exporters.ErrorEvent);
                                unbind(error) != unbind(null) && error(event);
                            }
                        };
                        return AS3BitmapDataExporter;
                    }());
                    exporters.AS3BitmapDataExporter = AS3BitmapDataExporter;
                })(exporters = swf.exporters || (swf.exporters = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=AS3BitmapDataExporter.js.map