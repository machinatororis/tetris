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
                    tags.SWFMorphFillStyle = flash.__native.format.swf.data.SWFMorphFillStyle;
                    tags.SWFMorphLineStyle = flash.__native.format.swf.data.SWFMorphLineStyle;
                    tags.SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
                    tags.SWFShape = flash.__native.format.swf.data.SWFShape;
                    tags.SWFShapeRecord = flash.__native.format.swf.data.SWFShapeRecord;
                    tags.SWFShapeRecordCurvedEdge = flash.__native.format.swf.data.SWFShapeRecordCurvedEdge;
                    tags.SWFShapeRecordStraightEdge = flash.__native.format.swf.data.SWFShapeRecordStraightEdge;
                    tags.SWFShapeRecordStyleChange = flash.__native.format.swf.data.SWFShapeRecordStyleChange;
                    tags.IShapeExporter = flash.__native.format.swf.exporters.core.IShapeExporter;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagDefineMorphShape = (function () {
                        function TagDefineMorphShape() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.startBounds = null;
                            this.endBounds = null;
                            this.startEdges = null;
                            this.endEdges = null;
                            this._characterId = 0;
                            this._morphFillStyles = undefined;
                            this._morphLineStyles = undefined;
                            this._shape = null;
                            this._morphFillStyles = new Array;
                            this._morphLineStyles = new Array;
                            this._shape = new tags.SWFShape;
                        }
                        Object.defineProperty(TagDefineMorphShape.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineMorphShape.prototype, "morphFillStyles", {
                            get: function () { return this._morphFillStyles; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineMorphShape.prototype, "morphLineStyles", {
                            get: function () { return this._morphLineStyles; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineMorphShape.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.startBounds = data.readRECT();
                            this.endBounds = data.readRECT();
                            var offset = data.readUI32();
                            var i = 0;
                            var fillStyleCount = data.readUI8();
                            if (fillStyleCount == 0xff) {
                                fillStyleCount = data.readUI16();
                            }
                            for (i = 0; i < fillStyleCount; i++) {
                                this._morphFillStyles.push(data.readMORPHFILLSTYLE());
                            }
                            var lineStyleCount = data.readUI8();
                            if (lineStyleCount == 0xff) {
                                lineStyleCount = data.readUI16();
                            }
                            for (i = 0; i < lineStyleCount; i++) {
                                this._morphLineStyles.push(data.readMORPHLINESTYLE());
                            }
                            this.startEdges = data.readSHAPE();
                            this.endEdges = data.readSHAPE();
                        };
                        TagDefineMorphShape.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData;
                            body.writeUI16(this.characterId);
                            body.writeRECT(this.startBounds);
                            body.writeRECT(this.endBounds);
                            var startBytes = new tags.SWFData;
                            var i = 0;
                            var fillStyleCount = ((this._morphFillStyles.length) >>> 0);
                            if (fillStyleCount > 0xfe) {
                                startBytes.writeUI8(0xff);
                                startBytes.writeUI16(fillStyleCount);
                            }
                            else {
                                startBytes.writeUI8(fillStyleCount);
                            }
                            for (i = 0; i < fillStyleCount; i++) {
                                startBytes.writeMORPHFILLSTYLE(this._morphFillStyles[i]);
                            }
                            var lineStyleCount = ((this._morphLineStyles.length) >>> 0);
                            if (lineStyleCount > 0xfe) {
                                startBytes.writeUI8(0xff);
                                startBytes.writeUI16(lineStyleCount);
                            }
                            else {
                                startBytes.writeUI8(lineStyleCount);
                            }
                            for (i = 0; i < lineStyleCount; i++) {
                                startBytes.writeMORPHLINESTYLE(this._morphLineStyles[i]);
                            }
                            startBytes.writeSHAPE(this.startEdges);
                            body.writeUI32(startBytes.length);
                            body.writeBytes(startBytes);
                            body.writeSHAPE(this.endEdges);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineMorphShape.prototype.clone = function () {
                            throw new Error("Not implemented yet.");
                        };
                        TagDefineMorphShape.prototype.exportMorphShape = function (handler, ratio) {
                            if (handler === void 0) { handler = null; }
                            if (ratio === void 0) { ratio = 0; }
                            handler = strict(handler, 'implements_flash___native_format_swf_exporters_core_IShapeExporter');
                            ratio = (+(ratio));
                            var i = 0;
                            var j = 0;
                            var len = 0;
                            this._shape.clearPaths();
                            this._shape.records.length = 0;
                            this._shape.fillStyles.length = 0;
                            this._shape.lineStyles.length = 0;
                            var numEdges = ((this.startEdges.records.length) >>> 0);
                            for (i = 0; i < numEdges; i++) {
                                var startRecord = strict(this.startEdges.records[i], tags.SWFShapeRecord);
                                var endRecord = strict(this.endEdges.records[j++], tags.SWFShapeRecord);
                                var exportRecord;
                                if (startRecord.type == tags.SWFShapeRecord.TYPE_CURVEDEDGE && endRecord.type == tags.SWFShapeRecord.TYPE_STRAIGHTEDGE) {
                                    endRecord = this.convertToCurvedEdge(endRecord);
                                }
                                else if (startRecord.type == tags.SWFShapeRecord.TYPE_STRAIGHTEDGE && endRecord.type == tags.SWFShapeRecord.TYPE_CURVEDEDGE) {
                                    startRecord = this.convertToCurvedEdge(startRecord);
                                }
                                switch (startRecord.type) {
                                    case tags.SWFShapeRecord.TYPE_STYLECHANGE:
                                        var startStyleChange = strict(startRecord.clone(), tags.SWFShapeRecordStyleChange);
                                        startStyleChange.stateMoveTo = true;
                                        if (endRecord.type == tags.SWFShapeRecord.TYPE_STYLECHANGE) {
                                            var endStyleChange = strict(endRecord, tags.SWFShapeRecordStyleChange);
                                            startStyleChange.moveDeltaX += (endStyleChange.moveDeltaX - startStyleChange.moveDeltaX) * ratio;
                                            startStyleChange.moveDeltaY += (endStyleChange.moveDeltaY - startStyleChange.moveDeltaY) * ratio;
                                        }
                                        else {
                                            startStyleChange.moveDeltaX += (-startStyleChange.moveDeltaX) * ratio;
                                            startStyleChange.moveDeltaY += (-startStyleChange.moveDeltaY) * ratio;
                                            j--;
                                        }
                                        exportRecord = startStyleChange;
                                        break;
                                    case tags.SWFShapeRecord.TYPE_STRAIGHTEDGE:
                                        var startStraightEdge = strict(startRecord.clone(), tags.SWFShapeRecordStraightEdge);
                                        var endStraightEdge = strict(endRecord, tags.SWFShapeRecordStraightEdge);
                                        startStraightEdge.deltaX += (endStraightEdge.deltaX - startStraightEdge.deltaX) * ratio;
                                        startStraightEdge.deltaY += (endStraightEdge.deltaY - startStraightEdge.deltaY) * ratio;
                                        if (startStraightEdge.deltaX != 0 && startStraightEdge.deltaY != 0) {
                                            startStraightEdge.generalLineFlag = true;
                                            startStraightEdge.vertLineFlag = false;
                                        }
                                        else {
                                            startStraightEdge.generalLineFlag = false;
                                            startStraightEdge.vertLineFlag = startStraightEdge.deltaX == 0;
                                        }
                                        exportRecord = startStraightEdge;
                                        break;
                                    case tags.SWFShapeRecord.TYPE_CURVEDEDGE:
                                        var startCurvedEdge = strict(startRecord.clone(), tags.SWFShapeRecordCurvedEdge);
                                        var endCurvedEdge = strict(endRecord, tags.SWFShapeRecordCurvedEdge);
                                        startCurvedEdge.controlDeltaX += (endCurvedEdge.controlDeltaX - startCurvedEdge.controlDeltaX) * ratio;
                                        startCurvedEdge.controlDeltaY += (endCurvedEdge.controlDeltaY - startCurvedEdge.controlDeltaY) * ratio;
                                        startCurvedEdge.anchorDeltaX += (endCurvedEdge.anchorDeltaX - startCurvedEdge.anchorDeltaX) * ratio;
                                        startCurvedEdge.anchorDeltaY += (endCurvedEdge.anchorDeltaY - startCurvedEdge.anchorDeltaY) * ratio;
                                        exportRecord = startCurvedEdge;
                                        break;
                                    case tags.SWFShapeRecord.TYPE_END:
                                        exportRecord = startRecord.clone();
                                        break;
                                }
                                this._shape.records.push(exportRecord);
                            }
                            for (i = 0, len = this.morphFillStyles.length; i < len; i++) {
                                this._shape.fillStyles.push(this.morphFillStyles[i].getMorphedFillStyle(ratio));
                            }
                            for (i = 0, len = this.morphLineStyles.length; i < len; i++) {
                                this._shape.lineStyles.push(this.morphLineStyles[i].getMorphedLineStyle(ratio));
                            }
                            this._shape.exportShape(handler);
                        };
                        TagDefineMorphShape.prototype.convertToCurvedEdge = function (straightEdge) {
                            straightEdge = strict(straightEdge, tags.SWFShapeRecordStraightEdge);
                            var curvedEdge = new tags.SWFShapeRecordCurvedEdge;
                            curvedEdge.controlDeltaX = ((straightEdge.deltaX / 2) >> 0);
                            curvedEdge.controlDeltaY = ((straightEdge.deltaY / 2) >> 0);
                            curvedEdge.anchorDeltaX = ((straightEdge.deltaX / 2) >> 0);
                            curvedEdge.anchorDeltaY = ((straightEdge.deltaY / 2) >> 0);
                            return curvedEdge;
                        };
                        Object.defineProperty(TagDefineMorphShape.prototype, "type", {
                            get: function () { return TagDefineMorphShape.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineMorphShape.prototype, "name", {
                            get: function () { return "DefineMorphShape"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineMorphShape.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineMorphShape.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineMorphShape.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var i = 0;
                            var len = 0;
                            var indent2 = tags.StringUtils.repeat(indent + 2);
                            var indent4 = tags.StringUtils.repeat(indent + 4);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) + "ID: " + this.characterId;
                            str += "\n" + indent2 + "Bounds:";
                            str += "\n" + indent4 + "StartBounds: " + this.startBounds.toString();
                            str += "\n" + indent4 + "EndBounds: " + this.endBounds.toString();
                            if ((len = ((this._morphFillStyles.length) >>> 0)) > 0) {
                                str += "\n" + indent2 + "FillStyles:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + indent4 + "[" + (i + 1) + "] " + this._morphFillStyles[i].toString();
                                }
                            }
                            if ((len = ((this._morphLineStyles.length) >>> 0)) > 0) {
                                str += "\n" + indent2 + "LineStyles:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + indent4 + "[" + (i + 1) + "] " + this._morphLineStyles[i].toString();
                                }
                            }
                            str += this.startEdges.toString(indent + 2);
                            str += this.endEdges.toString(indent + 2);
                            return str;
                        };
                        TagDefineMorphShape.TYPE = 46;
                        return TagDefineMorphShape;
                    }());
                    tags.TagDefineMorphShape = TagDefineMorphShape;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineMorphShape.js.map