var flash;
(function (flash) {
    var display;
    (function (display) {
        display.SystemBitmapData = flash.__native.display.SystemBitmapData;
        display.GLCacheDisplayObject = flash.__native.renderer.webgl.GLCacheDisplayObject;
        display.Bounds = flash.__native.utils.Bounds;
        display.Matrix = flash.geom.Matrix;
        display.Rectangle = flash.geom.Rectangle;
        var Graphics = (function () {
            function Graphics() {
                this._commands = [];
                this._commandsSize = 0;
                this._combinedBounds = new display.Bounds;
                this._combinedRect = new display.Rectangle;
                this._lastX = this._lastY = 0;
                this._boundsIncludeLastCoordinates = true;
                this._topLeftStrokeWidth = this._bottomRightStrokeWidth = 0;
            }
            Graphics.prototype.clear = function () {
                this._commands.length = 0;
                this._commandsSize = 0;
                this._dirtyRect = true;
                this._combinedBounds.setToSentinels();
                this._combinedRect.setEmpty();
                this._lastX = this._lastY = 0;
                this._boundsIncludeLastCoordinates = true;
                this._topLeftStrokeWidth = this._bottomRightStrokeWidth = 0;
                this.__invalidate();
            };
            Graphics.prototype.beginFill = function (color, alpha) {
                if (alpha === void 0) { alpha = 1.0; }
                color = ((color) >>> 0);
                alpha = (+(alpha));
                this.__cmd(Graphics.BEGIN_FILL, [color, alpha]);
            };
            Graphics.prototype.beginGradientFill = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
                if (matrix === void 0) { matrix = null; }
                if (spreadMethod === void 0) { spreadMethod = "pad"; }
                if (interpolationMethod === void 0) { interpolationMethod = "rgb"; }
                if (focalPointRatio === void 0) { focalPointRatio = 0; }
                type = as(type, 'String');
                colors = strict(colors, Array);
                alphas = strict(alphas, Array);
                ratios = strict(ratios, Array);
                matrix = strict(matrix, display.Matrix);
                spreadMethod = as(spreadMethod, 'String');
                interpolationMethod = as(interpolationMethod, 'String');
                focalPointRatio = (+(focalPointRatio));
                var i, len;
                for (i = 0, len = alphas.length; i < len; ++i) {
                    alphas[i] = Math.max(0, Math.min(alphas[i], 1));
                }
                for (i = 0, len = ratios.length; i < len; ++i) {
                    ratios[i] = Math.max(0, Math.min(ratios[i], 255));
                }
                this.__cmd(Graphics.BEGIN_GRADIENT_FILL, [type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio]);
            };
            Graphics.prototype.beginBitmapFill = function (bitmap, matrix, repeat, smooth) {
                if (matrix === void 0) { matrix = null; }
                if (repeat === void 0) { repeat = true; }
                if (smooth === void 0) { smooth = false; }
                bitmap = strict(bitmap, display.BitmapData);
                matrix = strict(matrix, display.Matrix);
                repeat = Boolean(repeat);
                smooth = Boolean(smooth);
                if (!bitmap) {
                    throw new TypeError("Parameter bitmap must be non-null.", 2007);
                }
                this.__cmd(Graphics.BEGIN_BITMAP_FILL, [bitmap, matrix, repeat, smooth]);
            };
            Graphics.prototype.lineGradientStyle = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
                if (matrix === void 0) { matrix = null; }
                if (spreadMethod === void 0) { spreadMethod = "pad"; }
                if (interpolationMethod === void 0) { interpolationMethod = "rgb"; }
                if (focalPointRatio === void 0) { focalPointRatio = 0; }
                type = as(type, 'String');
                colors = strict(colors, Array);
                alphas = strict(alphas, Array);
                ratios = strict(ratios, Array);
                matrix = strict(matrix, display.Matrix);
                spreadMethod = as(spreadMethod, 'String');
                interpolationMethod = as(interpolationMethod, 'String');
                focalPointRatio = (+(focalPointRatio));
                var i, len;
                for (i = 0, len = alphas.length; i < len; ++i) {
                    alphas[i] = Math.max(0, Math.min(alphas[i], 1));
                }
                for (i = 0, len = ratios.length; i < len; ++i) {
                    ratios[i] = Math.max(0, Math.min(ratios[i], 255));
                }
                this.__cmd(Graphics.LINE_GRADIENT_STYLE, [type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio]);
            };
            Graphics.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
                if (thickness === void 0) { thickness = NaN; }
                if (color === void 0) { color = 0; }
                if (alpha === void 0) { alpha = 1.0; }
                if (pixelHinting === void 0) { pixelHinting = false; }
                if (scaleMode === void 0) { scaleMode = "normal"; }
                if (caps === void 0) { caps = null; }
                if (joints === void 0) { joints = null; }
                if (miterLimit === void 0) { miterLimit = 3; }
                thickness = (+(thickness));
                color = ((color) >>> 0);
                alpha = (+(alpha));
                pixelHinting = Boolean(pixelHinting);
                scaleMode = as(scaleMode, 'String');
                caps = as(caps, 'String');
                joints = as(joints, 'String');
                miterLimit = (+(miterLimit));
                if (thickness < 1) {
                    thickness = 1;
                }
                this.__cmd(Graphics.LINE_STYLE, [thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit]);
                if (isNaN(thickness)) {
                    this.__setStrokeWidth(0);
                    return;
                }
                this.__setStrokeWidth(thickness);
            };
            Graphics.prototype.drawRect = function (x, y, width, height) {
                x = (+(x));
                y = (+(y));
                width = (+(width));
                height = (+(height));
                var x2 = x + width;
                var y2 = y + height;
                this.__cmd(Graphics.MOVE_TO, [x, y]);
                this.__cmd(Graphics.LINE_TO, [x2, y]);
                this.__cmd(Graphics.LINE_TO, [x2, y2]);
                this.__cmd(Graphics.LINE_TO, [x, y2]);
                this.__cmd(Graphics.LINE_TO, [x, y]);
                this.__applyLastCoordinates(x, y);
                this.__inflateBounds(x2, y2);
                this.__invalidate();
            };
            Graphics.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
                if (ellipseHeight === void 0) { ellipseHeight = NaN; }
                x = (+(x));
                y = (+(y));
                width = (+(width));
                height = (+(height));
                ellipseWidth = (+(ellipseWidth));
                ellipseHeight = (+(ellipseHeight));
                if (isNaN(ellipseHeight)) {
                    ellipseHeight = ellipseWidth;
                }
                if (!ellipseHeight || !ellipseWidth) {
                    this.drawRect(x, y, width, height);
                    return;
                }
                var radiusX = ellipseWidth >> 1;
                var radiusY = ellipseHeight >> 1;
                var hw = width >> 1;
                var hh = height >> 1;
                if (radiusX > hw) {
                    radiusX = ((hw) >> 0);
                }
                if (radiusY > hh) {
                    radiusY = ((hh) >> 0);
                }
                if (hw == radiusX && hh == radiusY) {
                    if (radiusX == radiusY) {
                        this.drawCircle(x + radiusX, y + radiusY, radiusX);
                    }
                    else {
                        this.drawEllipse(x, y, radiusX * 2, radiusY * 2);
                    }
                    return;
                }
                var right = x + width;
                var bottom = y + height;
                var xlw = x + radiusX;
                var xrw = right - radiusX;
                var ytw = y + radiusY;
                var ybw = bottom - radiusY;
                this.__cmd(Graphics.MOVE_TO, [right, ybw]);
                this.__cmd(Graphics.CURVE_TO, [right, bottom, xrw, bottom]);
                this.__cmd(Graphics.LINE_TO, [xlw, bottom]);
                this.__cmd(Graphics.CURVE_TO, [x, bottom, x, ybw]);
                this.__cmd(Graphics.LINE_TO, [x, ytw]);
                this.__cmd(Graphics.CURVE_TO, [x, y, xlw, y]);
                this.__cmd(Graphics.LINE_TO, [xrw, y]);
                this.__cmd(Graphics.CURVE_TO, [right, y, right, ytw]);
                this.__cmd(Graphics.LINE_TO, [right, ybw]);
                this.__applyLastCoordinates(x, y);
                this.__inflateBounds(right, bottom);
                this.__invalidate();
            };
            Graphics.prototype.drawRoundRectComplex = function (x, y, width, height, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius) {
                x = (+(x));
                y = (+(y));
                width = (+(width));
                height = (+(height));
                topLeftRadius = (+(topLeftRadius));
                topRightRadius = (+(topRightRadius));
                bottomLeftRadius = (+(bottomLeftRadius));
                bottomRightRadius = (+(bottomRightRadius));
                if (!(topLeftRadius | topRightRadius | bottomLeftRadius | bottomRightRadius)) {
                    this.drawRect(x, y, width, height);
                    return;
                }
                var right = x + width;
                var bottom = y + height;
                var xtl = x + topLeftRadius;
                this.__cmd(this.moveTo.__bind(this), [right, bottom - bottomRightRadius]);
                this.__cmd(this.curveTo.__bind(this), [right, bottom, right - bottomRightRadius, bottom]);
                this.__cmd(this.lineTo.__bind(this), [x + bottomLeftRadius, bottom]);
                this.__cmd(this.curveTo.__bind(this), [x, bottom, x, bottom - bottomLeftRadius]);
                this.__cmd(this.lineTo.__bind(this), [x, y + topLeftRadius]);
                this.__cmd(this.curveTo.__bind(this), [x, y, xtl, y]);
                this.__cmd(this.lineTo.__bind(this), [right - topRightRadius, y]);
                this.__cmd(this.curveTo.__bind(this), [right, y, right, y + topRightRadius]);
                this.__cmd(this.lineTo.__bind(this), [right, bottom - bottomRightRadius]);
                this.__applyLastCoordinates(x, y);
                this.__inflateBounds(right, bottom);
                this.__invalidate();
            };
            Graphics.prototype.drawCircle = function (x, y, radius) {
                x = (+(x));
                y = (+(y));
                radius = (+(radius));
                this.drawEllipse(x - radius, y - radius, radius * 2, radius * 2);
            };
            Graphics.prototype.drawEllipse = function (x, y, width, height) {
                x = (+(x));
                y = (+(y));
                width = (+(width));
                height = (+(height));
                var rx = width >> 1;
                var ry = height >> 1;
                x += rx;
                y += ry;
                var currentX = x + rx;
                var currentY = y;
                this.moveTo(currentX, currentY);
                var startAngle = 0;
                var u = 1;
                var v = 0;
                for (var i = 0; i < 4; i++) {
                    var endAngle = startAngle + Math.PI / 2;
                    var kappa = (4 / 3) * Math.tan((endAngle - startAngle) / 4);
                    var cp1x = currentX - v * kappa * rx;
                    var cp1y = currentY + u * kappa * ry;
                    u = Math.cos(endAngle);
                    v = Math.sin(endAngle);
                    currentX = x + u * rx;
                    currentY = y + v * ry;
                    var cp2x = currentX + v * kappa * rx;
                    var cp2y = currentY - u * kappa * ry;
                    this.cubicCurveTo(cp1x, cp1y, cp2x, cp2y, currentX, currentY);
                    startAngle = (+(endAngle));
                }
                this.__invalidate();
            };
            Graphics.prototype.moveTo = function (x, y) {
                x = (+(x));
                y = (+(y));
                this.__cmd(Graphics.MOVE_TO, [x, y]);
                this._lastX = x;
                this._lastY = y;
                this._boundsIncludeLastCoordinates = false;
            };
            Graphics.prototype.lineTo = function (x, y) {
                x = (+(x));
                y = (+(y));
                this.__cmd(Graphics.LINE_TO, [x, y]);
                this.__applyLastCoordinates(x, y);
                this.__invalidate();
            };
            Graphics.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
                controlX = (+(controlX));
                controlY = (+(controlY));
                anchorX = (+(anchorX));
                anchorY = (+(anchorY));
                this.__cmd(Graphics.CURVE_TO, [controlX, controlY, anchorX, anchorY]);
                if (controlX < this._lastX || controlX > anchorX) {
                    this.__inflateBoundsX(this.__quadraticBezierExtreme(this._lastX, controlX, anchorX));
                }
                if (controlY < this._lastY || controlY > anchorY) {
                    this.__inflateBoundsY(this.__quadraticBezierExtreme(this._lastY, controlY, anchorY));
                }
                this.__applyLastCoordinates(anchorX, anchorY);
                this.__invalidate();
            };
            Graphics.prototype.cubicCurveTo = function (controlX1, controlY1, controlX2, controlY2, anchorX, anchorY) {
                controlX1 = (+(controlX1));
                controlY1 = (+(controlY1));
                controlX2 = (+(controlX2));
                controlY2 = (+(controlY2));
                anchorX = (+(anchorX));
                anchorY = (+(anchorY));
                this.__cmd(Graphics.CUBIC_CURVE_TO, [controlX1, controlY1, controlX2, controlY2, anchorX, anchorY]);
                var i;
                var extremes;
                var fromX = this._lastX;
                var fromY = this._lastY;
                if (controlX1 < fromX || controlX2 < fromX || controlX1 > anchorX || controlX2 > anchorX) {
                    extremes = this.__cubicBezierExtremes(fromX, controlX1, controlX2, anchorX);
                    for (i = extremes.length; i--;) {
                        this.__inflateBoundsX(extremes[i]);
                    }
                }
                if (controlY1 < fromY || controlY2 < fromY || controlY1 > anchorY || controlY2 > anchorY) {
                    extremes = this.__cubicBezierExtremes(fromY, controlY1, controlY2, anchorY);
                    for (i = extremes.length; i--;) {
                        this.__inflateBoundsY(extremes[i]);
                    }
                }
                this.__applyLastCoordinates(anchorX, anchorY);
                this.__invalidate();
            };
            Graphics.prototype.endFill = function () {
                this.__cmd(Graphics.END_FILL);
                this.__invalidate();
            };
            Graphics.prototype.copyFrom = function (sourceGraphics) {
                sourceGraphics = strict(sourceGraphics, Graphics);
                this._commands.length = 0;
                this._commandsSize = sourceGraphics._commandsSize;
                for (var i = 0; i < this._commandsSize; ++i) {
                    this._commands[i] = sourceGraphics._commands[i];
                }
                this._combinedBounds.copyFrom(sourceGraphics._combinedBounds);
                this._lastX = sourceGraphics._lastX;
                this._lastY = sourceGraphics._lastY;
                this._boundsIncludeLastCoordinates = sourceGraphics._boundsIncludeLastCoordinates;
                this._topLeftStrokeWidth = sourceGraphics._topLeftStrokeWidth;
                this._bottomRightStrokeWidth = sourceGraphics._bottomRightStrokeWidth;
                this.__invalidate();
            };
            Graphics.prototype.lineBitmapStyle = function (bitmap, matrix, repeat, smooth) {
                if (matrix === void 0) { matrix = null; }
                if (repeat === void 0) { repeat = true; }
                if (smooth === void 0) { smooth = false; }
                bitmap = strict(bitmap, display.BitmapData);
                matrix = strict(matrix, display.Matrix);
                repeat = Boolean(repeat);
                smooth = Boolean(smooth);
                if (!bitmap) {
                    throw new TypeError("Parameter bitmap must be non-null.", 2007);
                }
                this.__cmd(Graphics.LINE_BITMAP_STYLE, [bitmap, matrix, repeat, smooth]);
            };
            Graphics.prototype.drawPath = function (commands, data, winding) {
                if (winding === void 0) { winding = "evenOdd"; }
                winding = as(winding, 'String');
                var p = 0;
                for (var i = 0, len = commands.length; i < len; ++i) {
                    switch (commands[i]) {
                        case display.GraphicsPathCommand.MOVE_TO:
                            this.moveTo(data[p++], data[p++]);
                            break;
                        case display.GraphicsPathCommand.LINE_TO:
                            this.lineTo(data[p++], data[p++]);
                            break;
                        case display.GraphicsPathCommand.WIDE_MOVE_TO:
                            p += 2;
                            this.moveTo(data[p++], data[p++]);
                            break;
                        case display.GraphicsPathCommand.WIDE_LINE_TO:
                            p += 2;
                            this.lineTo(data[p++], data[p++]);
                            break;
                        case display.GraphicsPathCommand.CURVE_TO:
                            this.curveTo(data[p++], data[p++], data[p++], data[p++]);
                            break;
                        case display.GraphicsPathCommand.CUBIC_CURVE_TO:
                            this.cubicCurveTo(data[p++], data[p++], data[p++], data[p++], data[p++], data[p++]);
                            break;
                    }
                }
            };
            Graphics.prototype.drawTriangles = function (vertices, indices, uvtData, culling) {
                if (indices === void 0) { indices = null; }
                if (uvtData === void 0) { uvtData = null; }
                if (culling === void 0) { culling = "none"; }
                culling = as(culling, 'String');
                if (vertices == null || vertices.length == 0)
                    return;
                if (indices == null) {
                    var vertLength = ((vertices.length / 2) >> 0);
                    if (vertLength % 3 != 0) {
                        throw new ArgumentError("Not enough vertices to close a triangle.");
                    }
                    indices = [];
                    for (var i = 0; i < vertLength; +i) {
                        indices.push(i);
                    }
                }
                for (var i = 0, len = indices.length; i < len;) {
                    var i0 = ((indices[i++]) >> 0);
                    var i1 = ((indices[i++]) >> 0);
                    var i2 = ((indices[i++]) >> 0);
                    var x0 = (+(vertices[2 * i0]));
                    var y0 = (+(vertices[2 * i0 + 1]));
                    var x1 = (+(vertices[2 * i1]));
                    var y1 = (+(vertices[2 * i1 + 1]));
                    var x2 = (+(vertices[2 * i2]));
                    var y2 = (+(vertices[2 * i2 + 1]));
                    this.moveTo(x0, y0);
                    this.lineTo(x1, y1);
                    this.lineTo(x2, y2);
                    this.lineTo(x0, y0);
                }
                this.__invalidate();
            };
            Graphics.prototype.drawGraphicsData = function (graphicsData) {
                for (var i = 0, len = graphicsData.length; i < len; i++) {
                    var item = graphicsData[i];
                    if (is(item, 'implements_flash_display_IGraphicsPath')) {
                        if (is(item, display.GraphicsPath)) {
                            this.drawPath(item.commands, item.data, item.winding);
                        }
                        else if (is(item, display.GraphicsTrianglePath)) {
                            this.drawTriangles(item.vertices, item.indices, item.uvtData, item.culling);
                        }
                    }
                    else if (is(item, 'implements_flash_display_IGraphicsFill')) {
                        if (is(item, display.GraphicsEndFill)) {
                            this.endFill();
                        }
                        else if (is(item, display.GraphicsSolidFill)) {
                            this.beginFill(item.color, item.alpha);
                        }
                        else if (is(item, display.GraphicsGradientFill)) {
                            this.beginGradientFill(item.type, item.colors, item.alphas, item.ratios, item.matrix, item.spreadMethod, item.interpolationMethod, item.focalPointRatio);
                        }
                        else if (is(item, display.GraphicsBitmapFill)) {
                            this.beginBitmapFill(item.bitmapData, item.matrix, item.repeat, item.smooth);
                        }
                    }
                    else if (is(item, 'implements_flash_display_IGraphicsStroke')) {
                        var fill;
                        var stroke;
                        if (item != null && is(item, display.GraphicsStroke)) {
                            stroke = as(item, display.GraphicsStroke);
                        }
                        if (stroke && stroke.fill && is(stroke.fill, 'implements_flash_display_IGraphicsFill')) {
                            fill = stroke.fill;
                        }
                        if (stroke == null || fill == null) {
                            this.lineStyle();
                        }
                        else if (is(fill, display.GraphicsSolidFill)) {
                            this.lineStyle(stroke.thickness, fill.color, fill.alpha, stroke.pixelHinting, stroke.scaleMode, stroke.caps, stroke.joints, stroke.miterLimit);
                        }
                        else if (is(fill, display.GraphicsGradientFill)) {
                            this.lineStyle(stroke.thickness, 0, 1, stroke.pixelHinting, stroke.scaleMode, stroke.caps, stroke.joints, stroke.miterLimit);
                            this.lineGradientStyle(fill.type, fill.colors, fill.alphas, fill.ratios, fill.matrix, fill.spreadMethod, fill.interpolationMethod, fill.focalPointRatio);
                        }
                        else if (is(fill, display.GraphicsBitmapFill)) {
                            this.lineStyle(stroke.thickness, 0, 1, stroke.pixelHinting, stroke.scaleMode, stroke.caps, stroke.joints, stroke.miterLimit);
                            this.lineBitmapStyle(fill.bitmapData, fill.matrix, fill.repeat, fill.smooth);
                        }
                    }
                }
            };
            Graphics.prototype.readGraphicsData = function (recurse) {
                if (recurse === void 0) { recurse = true; }
                recurse = Boolean(recurse);
                var result = new Array;
                var path;
                var fill;
                var stroke;
                for (var i = 0, len = this._commandsSize; i < len; ++i) {
                    var info = this._commands[i];
                    var cmd = info[0];
                    var data = info[1];
                    switch (cmd) {
                        case Graphics.BEGIN_FILL:
                        case Graphics.BEGIN_GRADIENT_FILL:
                        case Graphics.BEGIN_BITMAP_FILL:
                            if (path) {
                                result.push(path);
                                path = null;
                            }
                            if (cmd == Graphics.BEGIN_GRADIENT_FILL) {
                                result.push(new display.GraphicsGradientFill(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]));
                            }
                            else if (cmd == Graphics.BEGIN_BITMAP_FILL) {
                                result.push(new display.GraphicsBitmapFill(data[0], data[1], data[2], data[3]));
                            }
                            else {
                                result.push(new display.GraphicsSolidFill(data[0], data[1]));
                            }
                            break;
                        case Graphics.END_FILL:
                            if (path) {
                                result.push(path);
                                result.push(new display.GraphicsEndFill);
                                path = null;
                            }
                            break;
                        case Graphics.LINE_STYLE:
                            stroke = new display.GraphicsStroke(data[0], data[3], data[4], data[5], data[6], data[7], new display.GraphicsSolidFill(data[1], data[2]));
                            result.push(stroke);
                            break;
                        case Graphics.LINE_GRADIENT_STYLE:
                            if (stroke) {
                                stroke.fill = new display.GraphicsGradientFill(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]);
                            }
                            break;
                        case Graphics.LINE_BITMAP_STYLE:
                            if (stroke) {
                                stroke.fill = new display.GraphicsBitmapFill(data[0], data[1], data[2], data[3]);
                            }
                            break;
                        case Graphics.MOVE_TO:
                            path = path || new display.GraphicsPath;
                            path.moveTo(data[0], data[1]);
                            break;
                        case Graphics.LINE_TO:
                            path = path || new display.GraphicsPath;
                            path.lineTo(data[0], data[1]);
                            break;
                        case Graphics.CURVE_TO:
                            path = path || new display.GraphicsPath;
                            path.curveTo(data[0], data[1], data[2], data[3]);
                            break;
                        case Graphics.CUBIC_CURVE_TO:
                            path = path || new display.GraphicsPath;
                            path.cubicCurveTo(data[0], data[1], data[2], data[3], data[4], data[5]);
                            break;
                    }
                }
                if (path) {
                    result.push(path);
                    result.push(new display.GraphicsEndFill);
                }
                return result;
            };
            Graphics.prototype.__getBounds = function (rect, matrix) {
                if (matrix === void 0) { matrix = null; }
                if (this._dirtyRect) {
                    if (this._combinedBounds.isEmpty()) {
                        this._combinedRect.setEmpty();
                    }
                    else {
                        this._combinedRect.__setTo(this._combinedBounds.xMin, this._combinedBounds.yMin, Math.abs(this._combinedBounds.width), Math.abs(this._combinedBounds.height));
                    }
                    this._dirtyRect = false;
                }
                var bounds = display.Rectangle.__pool.get();
                if (matrix) {
                    this._combinedRect.__transform(bounds, matrix);
                }
                else {
                    bounds.__copyFrom(this._combinedRect);
                }
                rect.__expand(bounds.x, bounds.y, bounds.width, bounds.height);
                display.Rectangle.__pool.release(bounds);
            };
            Graphics.prototype.__invalidate = function () {
                this.dirty = true;
                this.__invalidateCache();
            };
            Graphics.prototype.__invalidateCache = function () {
                if (this._cache) {
                    this._cache.dispose();
                    this._cache = null;
                }
            };
            Graphics.prototype.__inflateBounds = function (x, y) {
                this.__inflateBoundsX(x);
                this.__inflateBoundsY(y);
            };
            Graphics.prototype.__inflateBoundsX = function (x) {
                if (this._combinedBounds.xMin == 0x8000000) {
                    this._combinedBounds.xMin = x - this._topLeftStrokeWidth;
                    this._combinedBounds.xMax = x + this._bottomRightStrokeWidth;
                }
                else {
                    this._combinedBounds.xMin = Math.min(x - this._topLeftStrokeWidth, this._combinedBounds.xMin);
                    this._combinedBounds.xMax = Math.max(x + this._bottomRightStrokeWidth, this._combinedBounds.xMax);
                }
                this._dirtyRect = true;
            };
            Graphics.prototype.__inflateBoundsY = function (y) {
                if (this._combinedBounds.yMin == 0x8000000) {
                    this._combinedBounds.yMin = y - this._topLeftStrokeWidth;
                    this._combinedBounds.yMax = y + this._bottomRightStrokeWidth;
                }
                else {
                    this._combinedBounds.yMin = Math.min(y - this._topLeftStrokeWidth, this._combinedBounds.yMin);
                    this._combinedBounds.yMax = Math.max(y + this._bottomRightStrokeWidth, this._combinedBounds.yMax);
                }
                this._dirtyRect = true;
            };
            Graphics.prototype.__applyLastCoordinates = function (x, y) {
                if (!this._boundsIncludeLastCoordinates) {
                    this.__inflateBounds(this._lastX, this._lastY);
                }
                this._boundsIncludeLastCoordinates = true;
                this._lastX = x;
                this._lastY = y;
                this.__inflateBounds(x, y);
            };
            Graphics.prototype.__setStrokeWidth = function (width) {
                switch (width) {
                    case 1:
                        this._topLeftStrokeWidth = 1;
                        this._bottomRightStrokeWidth = 1;
                        break;
                    case 3:
                        this._topLeftStrokeWidth = 2;
                        this._bottomRightStrokeWidth = 2;
                        break;
                    default:
                        var half = width / 2;
                        this._topLeftStrokeWidth = half;
                        this._bottomRightStrokeWidth = half;
                }
            };
            Graphics.prototype.__quadraticBezier = function (from, cp, to, t) {
                var inverseT = 1 - t;
                return from * inverseT * inverseT + 2 * cp * inverseT * t + to * t * t;
            };
            Graphics.prototype.__quadraticBezierExtreme = function (from, cp, to) {
                var t = (from - cp) / (from - 2 * cp + to);
                if (t < 0) {
                    return from;
                }
                if (t > 1) {
                    return to;
                }
                return this.__quadraticBezier(from, cp, to, t);
            };
            Graphics.prototype.__cubicBezier = function (from, cp, cp2, to, t) {
                var tSq = t * t;
                var inverseT = 1 - t;
                var inverseTSq = inverseT * inverseT;
                return from * inverseT * inverseTSq + 3 * cp * t * inverseTSq +
                    3 * cp2 * inverseT * tSq + to * t * tSq;
            };
            Graphics.prototype.__cubicBezierExtremes = function (from, cp, cp2, to) {
                var d1 = cp - from;
                var d2 = cp2 - cp;
                d2 *= 2;
                var d3 = to - cp2;
                if (d1 + d3 === d2) {
                    d3 *= 1.0001;
                }
                var fHead = 2 * d1 - d2;
                var part1 = d2 - 2 * d1;
                var fCenter = Math.sqrt(part1 * part1 - 4 * d1 * (d1 - d2 + d3));
                var fTail = 2 * (d1 - d2 + d3);
                var t1 = (fHead + fCenter) / fTail;
                var t2 = (fHead - fCenter) / fTail;
                var result = [];
                if (t1 >= 0 && t1 <= 1) {
                    result.push(Math.round(this.__cubicBezier(from, cp, cp2, to, t1)));
                }
                if (t2 >= 0 && t2 <= 1) {
                    result.push(Math.round(this.__cubicBezier(from, cp, cp2, to, t2)));
                }
                return result;
            };
            Graphics.prototype.__cmd = function (command, params) {
                this._commands[this._commandsSize++] = [command, params];
            };
            Graphics.prototype.__getCache = function (worldTransform) {
                var b = Graphics.sHelperRectangle;
                var m = Graphics.sHelperMatrix;
                b.__setTo(0, 0, 0, 0);
                m.__copyFrom(worldTransform, false);
                this.__getBounds(b, m);
                if (b.isEmpty()) {
                    this.__invalidateCache();
                    return null;
                }
                if (this._cache && this._cache.isCacheValid(worldTransform)) {
                    return this._cache;
                }
                this.__invalidateCache();
                b.__inflateCeil(1, 1);
                m.__translate(-b.x, -b.y);
                var data = new display.SystemBitmapData(display.SystemBitmapData.VECTOR, Math.ceil(b.width), Math.ceil(b.height), true, 0x0)
                    .__fromGraphics(this, m);
                this._cache = new display.GLCacheDisplayObject(data, worldTransform);
                this._cache.cacheTransform.__translate(b.x, b.y);
                return this._cache;
            };
            Graphics.BEGIN_FILL = 0;
            Graphics.BEGIN_GRADIENT_FILL = 1;
            Graphics.BEGIN_BITMAP_FILL = 2;
            Graphics.LINE_STYLE = 3;
            Graphics.LINE_GRADIENT_STYLE = 4;
            Graphics.LINE_BITMAP_STYLE = 5;
            Graphics.MOVE_TO = 6;
            Graphics.LINE_TO = 7;
            Graphics.CURVE_TO = 8;
            Graphics.CUBIC_CURVE_TO = 9;
            Graphics.END_FILL = 10;
            Graphics.sHelperRectangle = asc.sti(Graphics, function () { Graphics.sHelperRectangle = new display.Rectangle; });
            Graphics.sHelperMatrix = asc.sti(Graphics, function () { Graphics.sHelperMatrix = new display.Matrix; });
            return Graphics;
        }());
        display.Graphics = Graphics;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Graphics.js.map