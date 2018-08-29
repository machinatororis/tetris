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
                    data_1.GradientInterpolationMode = flash.__native.format.swf.data.consts.GradientInterpolationMode;
                    data_1.GradientSpreadMode = flash.__native.format.swf.data.consts.GradientSpreadMode;
                    data_1.LineCapsStyle = flash.__native.format.swf.data.consts.LineCapsStyle;
                    data_1.LineJointStyle = flash.__native.format.swf.data.consts.LineJointStyle;
                    data_1.CurvedEdge = flash.__native.format.swf.data.etc.CurvedEdge;
                    data_1.IEdge = flash.__native.format.swf.data.etc.IEdge;
                    data_1.StraightEdge = flash.__native.format.swf.data.etc.StraightEdge;
                    data_1.DefaultShapeExporter = flash.__native.format.swf.exporters.core.DefaultShapeExporter;
                    data_1.IShapeExporter = flash.__native.format.swf.exporters.core.IShapeExporter;
                    data_1.ColorUtils = flash.__native.format.swf.utils.ColorUtils;
                    data_1.StringUtils = flash.__native.utils.StringUtils;
                    data_1.GradientType = flash.display.GradientType;
                    data_1.LineScaleMode = flash.display.LineScaleMode;
                    data_1.Matrix = flash.geom.Matrix;
                    data_1.Dictionary = flash.utils.Dictionary;
                    var SWFShape = (function () {
                        function SWFShape(data, level, unitDivisor) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            if (unitDivisor === void 0) { unitDivisor = 20; }
                            this._records = undefined;
                            this._fillStyles = undefined;
                            this._lineStyles = undefined;
                            this._fillPaths = undefined;
                            this._linePaths = undefined;
                            this._unitDivisor = NaN;
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            unitDivisor = (+(unitDivisor));
                            this._records = new Array;
                            this._fillStyles = new Array;
                            this._lineStyles = new Array;
                            this._unitDivisor = unitDivisor;
                            if (data != null) {
                                this.parse(data, level);
                            }
                        }
                        Object.defineProperty(SWFShape.prototype, "records", {
                            get: function () { return this._records; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFShape.prototype, "fillStyles", {
                            get: function () { return this._fillStyles; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFShape.prototype, "lineStyles", {
                            get: function () { return this._lineStyles; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFShape.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data.resetBitsPending();
                            var numFillBits = data.readUB(4);
                            var numLineBits = data.readUB(4);
                            this.readShapeRecords(data, numFillBits, numLineBits, level);
                        };
                        SWFShape.prototype.readShapeRecords = function (data, fillBits, lineBits, level) {
                            if (level === void 0) { level = 1; }
                            var shapeRecord;
                            while (shapeRecord != SWFShape.sHelperRecordEnd) {
                                var edgeRecord = data.readUB(1) == 1;
                                if (edgeRecord) {
                                    var straightFlag = data.readUB(1) == 1;
                                    var numBits = ((data.readUB(4) + 2) >>> 0);
                                    if (straightFlag) {
                                        shapeRecord = data.readSTRAIGHTEDGERECORD(numBits);
                                    }
                                    else {
                                        shapeRecord = data.readCURVEDEDGERECORD(numBits);
                                    }
                                }
                                else {
                                    var states = data.readUB(5);
                                    if (states == 0) {
                                        shapeRecord = SWFShape.sHelperRecordEnd;
                                    }
                                    else {
                                        var styleChangeRecord = data.readSTYLECHANGERECORD(states, fillBits, lineBits, level);
                                        if (styleChangeRecord.stateNewStyles) {
                                            fillBits = ((styleChangeRecord.numFillBits) >>> 0);
                                            lineBits = ((styleChangeRecord.numLineBits) >>> 0);
                                        }
                                        shapeRecord = styleChangeRecord;
                                    }
                                }
                                this._records[this._records.length] = shapeRecord;
                            }
                        };
                        SWFShape.prototype.exportShape = function (handler) {
                            if (handler === void 0) { handler = null; }
                            if (!this._fillPaths || !this._linePaths) {
                                var fillEdgeMaps = new Array;
                                var lineEdgeMaps = new Array;
                                this.createEdgeMaps(this, this._fillStyles, this._lineStyles, fillEdgeMaps, lineEdgeMaps);
                                this._fillPaths = new Array;
                                this._linePaths = new Array;
                                var count = lineEdgeMaps.length;
                                for (var i = 0; i < count; i++) {
                                    this._fillPaths[this._fillPaths.length] = this.createPathFromEdgeMap(fillEdgeMaps[i]);
                                    this._linePaths[this._linePaths.length] = this.createPathFromEdgeMap(lineEdgeMaps[i]);
                                }
                            }
                            handler = handler || new data_1.DefaultShapeExporter(null);
                            handler.beginShape();
                            for (var i = 0, len = this._linePaths.length; i < len; ++i) {
                                this.exportFillPath(this._fillPaths[i], handler);
                                this.exportLinePath(this._linePaths[i], handler);
                            }
                            handler.endShape();
                        };
                        SWFShape.prototype.createEdgeMaps = function (shape, fillStyles, lineStyles, fillEdgeMaps, lineEdgeMaps) {
                            var xPos = 0;
                            var yPos = 0;
                            var fillStyleIdxOffset = 0;
                            var lineStyleIdxOffset = 0;
                            var currentFillStyleIdx0 = 0;
                            var currentFillStyleIdx1 = 0;
                            var currentLineStyleIdx = 0;
                            var subPath = new Array;
                            var currentFillEdgeMap = new data_1.Dictionary;
                            var currentLineEdgeMap = new data_1.Dictionary;
                            for (var i = 0, len = this._records.length; i < len; i++) {
                                var shapeRecord = this._records[i];
                                switch (shapeRecord.type) {
                                    case data_1.SWFShapeRecord.TYPE_STYLECHANGE:
                                        var styleChangeRecord = shapeRecord;
                                        if (styleChangeRecord.stateLineStyle || styleChangeRecord.stateFillStyle0 || styleChangeRecord.stateFillStyle1) {
                                            this.processSubPath(subPath, currentLineStyleIdx, currentFillStyleIdx0, currentFillStyleIdx1, currentFillEdgeMap, currentLineEdgeMap);
                                            subPath = new Array;
                                        }
                                        if (styleChangeRecord.stateNewStyles) {
                                            fillStyleIdxOffset = fillStyles.length;
                                            lineStyleIdxOffset = lineStyles.length;
                                            this.appendFillStyles(fillStyles, styleChangeRecord.fillStyles);
                                            this.appendLineStyles(lineStyles, styleChangeRecord.lineStyles);
                                        }
                                        if (styleChangeRecord.stateLineStyle && styleChangeRecord.lineStyle == 0 &&
                                            styleChangeRecord.stateFillStyle0 && styleChangeRecord.fillStyle0 == 0 &&
                                            styleChangeRecord.stateFillStyle1 && styleChangeRecord.fillStyle1 == 0) {
                                            this.cleanEdgeMap(currentFillEdgeMap);
                                            this.cleanEdgeMap(currentLineEdgeMap);
                                            fillEdgeMaps[fillEdgeMaps.length] = currentFillEdgeMap;
                                            lineEdgeMaps[lineEdgeMaps.length] = currentLineEdgeMap;
                                            currentFillEdgeMap = new data_1.Dictionary;
                                            currentLineEdgeMap = new data_1.Dictionary;
                                            currentLineStyleIdx = 0;
                                            currentFillStyleIdx0 = 0;
                                            currentFillStyleIdx1 = 0;
                                        }
                                        else {
                                            if (styleChangeRecord.stateLineStyle) {
                                                currentLineStyleIdx = styleChangeRecord.lineStyle;
                                                if (currentLineStyleIdx > 0) {
                                                    currentLineStyleIdx += lineStyleIdxOffset;
                                                }
                                            }
                                            if (styleChangeRecord.stateFillStyle0) {
                                                currentFillStyleIdx0 = styleChangeRecord.fillStyle0;
                                                if (currentFillStyleIdx0 > 0) {
                                                    currentFillStyleIdx0 += fillStyleIdxOffset;
                                                }
                                            }
                                            if (styleChangeRecord.stateFillStyle1) {
                                                currentFillStyleIdx1 = styleChangeRecord.fillStyle1;
                                                if (currentFillStyleIdx1 > 0) {
                                                    currentFillStyleIdx1 += fillStyleIdxOffset;
                                                }
                                            }
                                        }
                                        if (styleChangeRecord.stateMoveTo) {
                                            xPos = styleChangeRecord.moveDeltaX;
                                            yPos = styleChangeRecord.moveDeltaY;
                                        }
                                        break;
                                    case data_1.SWFShapeRecord.TYPE_STRAIGHTEDGE:
                                        var straightEdgeRecord = shapeRecord;
                                        var xPosFrom = xPos;
                                        var yPosFrom = yPos;
                                        if (straightEdgeRecord.generalLineFlag) {
                                            xPos += straightEdgeRecord.deltaX;
                                            yPos += straightEdgeRecord.deltaY;
                                        }
                                        else {
                                            if (straightEdgeRecord.vertLineFlag) {
                                                yPos += straightEdgeRecord.deltaY;
                                            }
                                            else {
                                                xPos += straightEdgeRecord.deltaX;
                                            }
                                        }
                                        subPath[subPath.length] = new data_1.StraightEdge(xPosFrom, yPosFrom, xPos, yPos, currentLineStyleIdx, currentFillStyleIdx1);
                                        break;
                                    case data_1.SWFShapeRecord.TYPE_CURVEDEDGE:
                                        var curvedEdgeRecord = shapeRecord;
                                        var xPosFrom = xPos;
                                        var yPosFrom = yPos;
                                        var xPosControl = xPos + curvedEdgeRecord.controlDeltaX;
                                        var yPosControl = yPos + curvedEdgeRecord.controlDeltaY;
                                        xPos = xPosControl + curvedEdgeRecord.anchorDeltaX;
                                        yPos = yPosControl + curvedEdgeRecord.anchorDeltaY;
                                        subPath[subPath.length] = new data_1.CurvedEdge(xPosFrom, yPosFrom, xPosControl, yPosControl, xPos, yPos, currentLineStyleIdx, currentFillStyleIdx1);
                                        break;
                                    case data_1.SWFShapeRecord.TYPE_END:
                                        this.processSubPath(subPath, currentLineStyleIdx, currentFillStyleIdx0, currentFillStyleIdx1, currentFillEdgeMap, currentLineEdgeMap);
                                        this.cleanEdgeMap(currentFillEdgeMap);
                                        this.cleanEdgeMap(currentLineEdgeMap);
                                        fillEdgeMaps[fillEdgeMaps.length] = currentFillEdgeMap;
                                        lineEdgeMaps[lineEdgeMaps.length] = currentLineEdgeMap;
                                        break;
                                }
                            }
                        };
                        SWFShape.prototype.processSubPath = function (subPath, lineStyleIdx, fillStyleIdx0, fillStyleIdx1, currentFillEdgeMap, currentLineEdgeMap) {
                            var path;
                            if (fillStyleIdx0 != 0) {
                                path = currentFillEdgeMap.get(fillStyleIdx0);
                                if (path == null) {
                                    path = new Array;
                                    currentFillEdgeMap.set(fillStyleIdx0, path);
                                }
                                for (var j = subPath.length - 1; j >= 0; j--) {
                                    path[path.length] = subPath[j].reverseWithNewFillStyle(fillStyleIdx0);
                                }
                            }
                            if (fillStyleIdx1 != 0) {
                                path = currentFillEdgeMap.get(fillStyleIdx1);
                                if (path == null) {
                                    path = new Array;
                                    currentFillEdgeMap.set(fillStyleIdx1, path);
                                }
                                this.appendEdges(path, subPath);
                            }
                            if (lineStyleIdx != 0) {
                                path = currentLineEdgeMap.get(lineStyleIdx);
                                if (path == null) {
                                    path = new Array;
                                    currentLineEdgeMap.set(lineStyleIdx, path);
                                }
                                this.appendEdges(path, subPath);
                            }
                        };
                        SWFShape.prototype.exportFillPath = function (path, handler) {
                            var posX = int.MAX_VALUE;
                            var posY = int.MAX_VALUE;
                            var fillStyleIdx = int.MAX_VALUE;
                            var matrix;
                            if (path.length > 0) {
                                handler.beginFills();
                                for (var i = 0, len = path.length; i < len; i++) {
                                    var e = path[i];
                                    if (fillStyleIdx != e.getFillStyleIdx()) {
                                        if (fillStyleIdx != int.MAX_VALUE) {
                                            handler.endFill();
                                        }
                                        fillStyleIdx = e.getFillStyleIdx();
                                        posX = int.MAX_VALUE;
                                        posY = int.MAX_VALUE;
                                        if (fillStyleIdx - 1 < this._fillStyles.length) {
                                            var fillStyle = this._fillStyles[fillStyleIdx - 1];
                                            switch (fillStyle.type) {
                                                case 0x00:
                                                    handler.beginFill(data_1.ColorUtils.rgb(fillStyle.rgb), data_1.ColorUtils.alpha(fillStyle.rgb));
                                                    break;
                                                case 0x10:
                                                case 0x12:
                                                case 0x13:
                                                    var colors = [];
                                                    var alphas = [];
                                                    var ratios = [];
                                                    var gradientRecord;
                                                    matrix = fillStyle.gradientMatrix.matrix.clone();
                                                    for (var gri = 0, grilen = fillStyle.gradient.records.length; gri < grilen; gri++) {
                                                        gradientRecord = fillStyle.gradient.records[gri];
                                                        colors[colors.length] = data_1.ColorUtils.rgb(gradientRecord.color);
                                                        alphas[alphas.length] = data_1.ColorUtils.alpha(gradientRecord.color);
                                                        ratios[ratios.length] = gradientRecord.ratio;
                                                    }
                                                    handler.beginGradientFill(fillStyle.type == 0x10 ? data_1.GradientType.LINEAR : data_1.GradientType.RADIAL, colors, alphas, ratios, matrix, data_1.GradientSpreadMode.toString(fillStyle.gradient.spreadMode), data_1.GradientInterpolationMode.toString(fillStyle.gradient.interpolationMode), fillStyle.gradient.focalPoint);
                                                    break;
                                                case 0x40:
                                                case 0x41:
                                                case 0x42:
                                                case 0x43:
                                                    var m = fillStyle.bitmapMatrix;
                                                    matrix = new data_1.Matrix(m.scaleX / this._unitDivisor, m.rotateSkew0 / this._unitDivisor, m.rotateSkew1 / this._unitDivisor, m.scaleY / this._unitDivisor, m.translateX / this._unitDivisor, m.translateY / this._unitDivisor);
                                                    handler.beginBitmapFill(fillStyle.bitmapId, matrix, fillStyle.type == 0x40 || fillStyle.type == 0x42, fillStyle.type == 0x40 || fillStyle.type == 0x41);
                                                    break;
                                            }
                                        }
                                        else {
                                            handler.beginFill(0);
                                        }
                                    }
                                    if (posX != e.getFromX() || posY != e.getFromY()) {
                                        handler.moveTo(e.getFromX() / this._unitDivisor, e.getFromY() / this._unitDivisor);
                                    }
                                    if (is(e, data_1.CurvedEdge)) {
                                        handler.curveTo(e.getControlX() / this._unitDivisor, e.getControlY() / this._unitDivisor, e.getToX() / this._unitDivisor, e.getToY() / this._unitDivisor);
                                    }
                                    else {
                                        handler.lineTo(e.getToX() / this._unitDivisor, e.getToY() / this._unitDivisor);
                                    }
                                    posX = e.getToX();
                                    posY = e.getToY();
                                }
                                if (fillStyleIdx != int.MAX_VALUE) {
                                    handler.endFill();
                                }
                                handler.endFills();
                            }
                        };
                        SWFShape.prototype.exportLinePath = function (path, handler) {
                            var posX = int.MAX_VALUE;
                            var posY = int.MAX_VALUE;
                            var lineStyleIdx = int.MAX_VALUE;
                            if (path.length > 0) {
                                var autoClose = true;
                                handler.beginLines();
                                for (var i = 0, len = path.length; i < len; i++) {
                                    var e = path[i];
                                    if (lineStyleIdx != e.getLineStyleIdx()) {
                                        lineStyleIdx = e.getLineStyleIdx();
                                        posX = int.MAX_VALUE;
                                        posY = int.MAX_VALUE;
                                        var lineStyle = null;
                                        try {
                                            lineStyle = this._lineStyles[lineStyleIdx - 1];
                                        }
                                        catch (e) {
                                            e = window.asc.e2e(e);
                                        }
                                        if (lineStyle != null) {
                                            var scaleMode = data_1.LineScaleMode.NORMAL;
                                            autoClose = true;
                                            if (lineStyle.noClose) {
                                                autoClose = false;
                                            }
                                            if (lineStyle.noHScaleFlag && lineStyle.noVScaleFlag) {
                                                scaleMode = data_1.LineScaleMode.NONE;
                                            }
                                            else if (lineStyle.noHScaleFlag) {
                                                scaleMode = data_1.LineScaleMode.HORIZONTAL;
                                            }
                                            else if (lineStyle.noVScaleFlag) {
                                                scaleMode = data_1.LineScaleMode.VERTICAL;
                                            }
                                            handler.lineStyle(lineStyle.width / this._unitDivisor, data_1.ColorUtils.rgb(lineStyle.color), data_1.ColorUtils.alpha(lineStyle.color), lineStyle.pixelHintingFlag, scaleMode, data_1.LineCapsStyle.toString(lineStyle.startCapsStyle), data_1.LineCapsStyle.toString(lineStyle.endCapsStyle), data_1.LineJointStyle.toString(lineStyle.jointStyle), lineStyle.miterLimitFactor);
                                            if (lineStyle.hasFillFlag) {
                                                var fillStyle = lineStyle.fillType;
                                                switch (fillStyle.type) {
                                                    case 0x10:
                                                    case 0x12:
                                                    case 0x13:
                                                        var colors = [];
                                                        var alphas = [];
                                                        var ratios = [];
                                                        var gradientRecord;
                                                        var matrix = fillStyle.gradientMatrix.matrix.clone();
                                                        for (var gri = 0, grilen = fillStyle.gradient.records.length; gri < grilen; gri++) {
                                                            gradientRecord = fillStyle.gradient.records[gri];
                                                            colors[colors.length] = data_1.ColorUtils.rgb(gradientRecord.color);
                                                            alphas[alphas.length] = data_1.ColorUtils.alpha(gradientRecord.color);
                                                            ratios[ratios.length] = gradientRecord.ratio;
                                                        }
                                                        handler.lineGradientStyle(fillStyle.type == 0x10 ? data_1.GradientType.LINEAR : data_1.GradientType.RADIAL, colors, alphas, ratios, matrix, data_1.GradientSpreadMode.toString(fillStyle.gradient.spreadMode), data_1.GradientInterpolationMode.toString(fillStyle.gradient.interpolationMode), fillStyle.gradient.focalPoint);
                                                        break;
                                                }
                                            }
                                        }
                                        else {
                                            handler.lineStyle(NaN);
                                        }
                                    }
                                    if (posX != e.getFromX() || posY != e.getFromY()) {
                                        handler.moveTo(e.getFromX() / this._unitDivisor, e.getFromY() / this._unitDivisor);
                                    }
                                    if (is(e, data_1.CurvedEdge)) {
                                        handler.curveTo(e.getControlX() / this._unitDivisor, e.getControlY() / this._unitDivisor, e.getToX() / this._unitDivisor, e.getToY() / this._unitDivisor);
                                    }
                                    else {
                                        handler.lineTo(e.getToX() / this._unitDivisor, e.getToY() / this._unitDivisor);
                                    }
                                    posX = e.getToX();
                                    posY = e.getToY();
                                }
                                var firstEdge = path[0];
                                handler.endLines(autoClose && firstEdge.getFromX() == posX && firstEdge.getFromY() == posY);
                            }
                        };
                        SWFShape.prototype.createPathFromEdgeMap = function (edgeMap) {
                            var newPath = new Array;
                            var styleIdxArray = new Array;
                            var __for0 = window.asc.in(edgeMap);
                            for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                                var styleIdx = __for0_1[_i];
                                styleIdxArray[styleIdxArray.length] = styleIdx;
                            }
                            styleIdxArray.sort(Array.NUMERIC);
                            for (var i = 0, len = styleIdxArray.length; i < len; i++) {
                                this.appendEdges(newPath, edgeMap.get(styleIdxArray[i]));
                            }
                            return newPath;
                        };
                        SWFShape.prototype.cleanEdgeMap = function (edgeMap) {
                            var __for1 = window.asc.in(edgeMap);
                            for (var _i = 0, __for1_1 = __for1; _i < __for1_1.length; _i++) {
                                var styleIdx = __for1_1[_i];
                                var subPath = edgeMap.get(styleIdx);
                                if (subPath && subPath.length > 0) {
                                    var idx = 0;
                                    var prevEdge = null;
                                    var tmpPath = new Array;
                                    var coordMap = this.createCoordMap(subPath);
                                    var length = subPath.length;
                                    var minIndex = 0;
                                    var maxIndex = length - 1;
                                    while (length > 0) {
                                        idx = minIndex;
                                        while (length > 0) {
                                            if (prevEdge != null) {
                                                var subPathEdge = subPath[idx];
                                                if (prevEdge.getToX() != subPathEdge.getFromX() || prevEdge.getToY() != subPathEdge.getFromY()) {
                                                    var edge = this.findNextEdgeInCoordMap(coordMap, prevEdge);
                                                    if (edge != null) {
                                                        idx = subPath.indexOf(edge);
                                                    }
                                                    else {
                                                        idx = minIndex;
                                                        prevEdge = null;
                                                    }
                                                    continue;
                                                }
                                            }
                                            var edge = subPath[idx];
                                            tmpPath[tmpPath.length] = edge;
                                            this.removeEdgeFromCoordMap(coordMap, edge);
                                            prevEdge = edge;
                                            subPath[idx] = null;
                                            length--;
                                            if (idx == maxIndex) {
                                                while (subPath[idx] == null && idx > minIndex) {
                                                    idx--;
                                                }
                                                maxIndex = idx;
                                                break;
                                            }
                                            else if (idx == minIndex) {
                                                while (subPath[idx] == null && idx < maxIndex) {
                                                    idx++;
                                                }
                                                minIndex = idx;
                                            }
                                            else {
                                                while (subPath[idx] == null && idx < maxIndex) {
                                                    idx++;
                                                }
                                            }
                                        }
                                    }
                                    edgeMap.set(styleIdx, tmpPath);
                                }
                            }
                        };
                        SWFShape.prototype.createCoordMap = function (path) {
                            var coordMap = new data_1.Dictionary;
                            for (var i = 0, len = path.length; i < len; i++) {
                                var edge = path[i];
                                var fromLong = edge.getFromX() * Math.pow(2, 32) + edge.getFromY();
                                var coordMapArray = coordMap.get(fromLong);
                                if (coordMapArray == null) {
                                    coordMap.set(fromLong, [path[i]]);
                                }
                                else {
                                    coordMapArray[coordMapArray.length] = path[i];
                                }
                            }
                            return coordMap;
                        };
                        SWFShape.prototype.removeEdgeFromCoordMap = function (coordMap, edge) {
                            var fromLong = edge.getFromX() * Math.pow(2, 32) + edge.getFromY();
                            var coordMapArray = coordMap.get(fromLong);
                            if (coordMapArray != null) {
                                if (coordMapArray.length == 1) {
                                    coordMap.delete(fromLong);
                                }
                                else {
                                    var i = coordMapArray.indexOf(edge);
                                    if (i > -1) {
                                        coordMapArray.splice(i, 1);
                                    }
                                }
                            }
                        };
                        SWFShape.prototype.findNextEdgeInCoordMap = function (coordMap, edge) {
                            var toLong = edge.getToX() * Math.pow(2, 32) + edge.getToY();
                            var coordMapArray = coordMap.get(toLong);
                            if (coordMapArray != null && coordMapArray.length > 0) {
                                return coordMapArray[0];
                            }
                            return null;
                        };
                        SWFShape.prototype.appendFillStyles = function (v1, v2) {
                            for (var i = 0, len = v2.length; i < len; i++) {
                                v1[v1.length] = v2[i];
                            }
                        };
                        SWFShape.prototype.appendLineStyles = function (v1, v2) {
                            for (var i = 0, len = v2.length; i < len; i++) {
                                v1[v1.length] = v2[i];
                            }
                        };
                        SWFShape.prototype.appendEdges = function (v1, v2) {
                            for (var i = 0, len = v2.length; i < len; i++) {
                                v1[v1.length] = v2[i];
                            }
                        };
                        SWFShape.prototype.publish = function (data, level) {
                            if (level === void 0) { level = 1; }
                            var numFillBits = data.calculateMaxBits(false, [this.getMaxFillStyleIndex()]);
                            var numLineBits = data.calculateMaxBits(false, [this.getMaxLineStyleIndex()]);
                            data.resetBitsPending();
                            data.writeUB(4, numFillBits);
                            data.writeUB(4, numLineBits);
                            this.writeShapeRecords(data, numFillBits, numLineBits, level);
                        };
                        SWFShape.prototype.getMaxFillStyleIndex = function () {
                            var ret = 0;
                            for (var i = 0, len = ((this._records.length) >>> 0); i < len; i++) {
                                var shapeRecord = strict(this._records[i], data_1.SWFShapeRecord);
                                if (shapeRecord.type == data_1.SWFShapeRecord.TYPE_STYLECHANGE) {
                                    var shapeRecordStyleChange = as(shapeRecord, data_1.SWFShapeRecordStyleChange);
                                    if (shapeRecordStyleChange.fillStyle0 > ret) {
                                        ret = shapeRecordStyleChange.fillStyle0;
                                    }
                                    if (shapeRecordStyleChange.fillStyle1 > ret) {
                                        ret = shapeRecordStyleChange.fillStyle1;
                                    }
                                    if (shapeRecordStyleChange.stateNewStyles) {
                                        break;
                                    }
                                }
                            }
                            return ret;
                        };
                        SWFShape.prototype.getMaxLineStyleIndex = function () {
                            var ret = 0;
                            for (var i = 0, len = ((this._records.length) >>> 0); i < len; i++) {
                                var shapeRecord = strict(this._records[i], data_1.SWFShapeRecord);
                                if (shapeRecord.type == data_1.SWFShapeRecord.TYPE_STYLECHANGE) {
                                    var shapeRecordStyleChange = as(shapeRecord, data_1.SWFShapeRecordStyleChange);
                                    if (shapeRecordStyleChange.lineStyle > ret) {
                                        ret = shapeRecordStyleChange.lineStyle;
                                    }
                                    if (shapeRecordStyleChange.stateNewStyles) {
                                        break;
                                    }
                                }
                            }
                            return ret;
                        };
                        SWFShape.prototype.writeShapeRecords = function (data, fillBits, lineBits, level) {
                            if (level === void 0) { level = 1; }
                            if (this._records.length == 0 || !(is(this._records[this._records.length - 1], data_1.SWFShapeRecordEnd))) {
                                this._records.push(new data_1.SWFShapeRecordEnd());
                            }
                            for (var i = 0; i < this._records.length; i++) {
                                var shapeRecord = strict(this._records[i], data_1.SWFShapeRecord);
                                if (shapeRecord.isEdgeRecord) {
                                    data.writeUB(1, 1);
                                    if (shapeRecord.type == data_1.SWFShapeRecord.TYPE_STRAIGHTEDGE) {
                                        data.writeUB(1, 1);
                                        data.writeSTRAIGHTEDGERECORD(strict(shapeRecord, data_1.SWFShapeRecordStraightEdge));
                                    }
                                    else {
                                        data.writeUB(1, 0);
                                        data.writeCURVEDEDGERECORD(strict(shapeRecord, data_1.SWFShapeRecordCurvedEdge));
                                    }
                                }
                                else {
                                    data.writeUB(1, 0);
                                    if (shapeRecord.type == data_1.SWFShapeRecord.TYPE_END) {
                                        data.writeUB(5, 0);
                                    }
                                    else {
                                        var states = 0;
                                        var styleChangeRecord = as(shapeRecord, data_1.SWFShapeRecordStyleChange);
                                        if (styleChangeRecord.stateNewStyles) {
                                            states |= 0x10;
                                        }
                                        if (styleChangeRecord.stateLineStyle) {
                                            states |= 0x08;
                                        }
                                        if (styleChangeRecord.stateFillStyle1) {
                                            states |= 0x04;
                                        }
                                        if (styleChangeRecord.stateFillStyle0) {
                                            states |= 0x02;
                                        }
                                        if (styleChangeRecord.stateMoveTo) {
                                            states |= 0x01;
                                        }
                                        data.writeUB(5, states);
                                        data.writeSTYLECHANGERECORD(styleChangeRecord, fillBits, lineBits, level);
                                        if (styleChangeRecord.stateNewStyles) {
                                            fillBits = styleChangeRecord.numFillBits;
                                            lineBits = styleChangeRecord.numLineBits;
                                        }
                                    }
                                }
                            }
                        };
                        SWFShape.prototype.clearPaths = function () {
                            this._fillPaths = null;
                            this._linePaths = null;
                        };
                        SWFShape.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            var str = "\n" + data_1.StringUtils.repeat(indent) + "ShapeRecords:";
                            for (var i = 0, len = ((this._records.length) >>> 0); i < len; i++) {
                                str += "\n" + data_1.StringUtils.repeat(indent + 2) + "[" + i + "] " + this._records[i].toString(indent + 2);
                            }
                            return str;
                        };
                        SWFShape.sHelperRecordEnd = asc.sti(SWFShape, function () { SWFShape.sHelperRecordEnd = new data_1.SWFShapeRecordEnd; });
                        return SWFShape;
                    }());
                    data_1.SWFShape = SWFShape;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFShape.js.map