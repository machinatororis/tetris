var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var canvas;
            (function (canvas) {
                canvas.CSSColor = flash.__native.utils.CSSColor;
                canvas.BitmapData = flash.display.BitmapData;
                canvas.CapsStyle = flash.display.CapsStyle;
                canvas.GradientType = flash.display.GradientType;
                canvas.Graphics = flash.display.Graphics;
                canvas.JointStyle = flash.display.JointStyle;
                canvas.Matrix = flash.geom.Matrix;
                canvas.Point = flash.geom.Point;
                canvas.Rectangle = flash.geom.Rectangle;
                canvas.Dictionary = flash.utils.Dictionary;
                var CanvasRenderer = (function () {
                    function CanvasRenderer() {
                    }
                    CanvasRenderer.renderImage = function (ctx, element, smoothing) {
                        if (smoothing === void 0) { smoothing = false; }
                        ctx.save();
                        ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = smoothing;
                        ctx.drawImage(element, 0, 0);
                        ctx.restore();
                    };
                    CanvasRenderer.renderText = function (ctx, text, font, color, align, baseline, x, y) {
                        if (font === void 0) { font = 'Arial'; }
                        if (color === void 0) { color = 'black'; }
                        if (align === void 0) { align = 'left'; }
                        if (baseline === void 0) { baseline = 'top'; }
                        if (x === void 0) { x = 0; }
                        if (y === void 0) { y = 0; }
                        ctx.save();
                        ctx.font = font;
                        ctx.fillStyle = color;
                        ctx.textAlign = align;
                        ctx.textBaseline = baseline;
                        ctx.fillText(text, x, y);
                        ctx.restore();
                    };
                    CanvasRenderer.renderGraphics = function (ctx, graphics, matrix) {
                        if (matrix === void 0) { matrix = null; }
                        CanvasRenderer.__setupCtx(ctx, graphics, matrix);
                        CanvasRenderer.__playCommands(graphics._commands, graphics._commandsSize);
                        CanvasRenderer.__releaseCtx();
                    };
                    CanvasRenderer.__playCommands = function (commands, len) {
                        for (var i = 0; i < len; ++i) {
                            var info = commands[i];
                            var cmd = info[0];
                            var data = info[1];
                            switch (cmd) {
                                case canvas.Graphics.BEGIN_FILL:
                                case canvas.Graphics.BEGIN_GRADIENT_FILL:
                                case canvas.Graphics.BEGIN_BITMAP_FILL:
                                    CanvasRenderer.__endFill();
                                    CanvasRenderer._buff.beginPath();
                                    CanvasRenderer._hasFill = strict(info, Array);
                                    CanvasRenderer._hasPathToFill = false;
                                    if (cmd == canvas.Graphics.BEGIN_GRADIENT_FILL) {
                                        CanvasRenderer.__beginGradientFill(info);
                                    }
                                    else if (cmd == canvas.Graphics.BEGIN_BITMAP_FILL) {
                                        CanvasRenderer.__beginBitmapFill(info);
                                    }
                                    else {
                                        CanvasRenderer.__beginFill(info);
                                    }
                                    break;
                                case canvas.Graphics.END_FILL:
                                    CanvasRenderer.__endFill();
                                    CanvasRenderer._hasFill = null;
                                    break;
                                case canvas.Graphics.LINE_STYLE:
                                    var thickness = data[0];
                                    CanvasRenderer._hasStroke = strict(!isNaN(thickness) ? info : null, Array);
                                    CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = CanvasRenderer._strokeCommandsEmptyInfo;
                                    CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = info;
                                    break;
                                case canvas.Graphics.LINE_GRADIENT_STYLE:
                                case canvas.Graphics.LINE_BITMAP_STYLE:
                                    CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = info;
                                    break;
                                case canvas.Graphics.MOVE_TO:
                                    CanvasRenderer.__endFill(false);
                                    CanvasRenderer._buff.moveTo(CanvasRenderer._lastX = (+(data[0])), CanvasRenderer._lastY = (+(data[1])));
                                    break;
                                case canvas.Graphics.LINE_TO:
                                    if (CanvasRenderer._hasStroke) {
                                        CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = [canvas.Graphics.MOVE_TO, [CanvasRenderer._lastX, CanvasRenderer._lastY]];
                                        CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = info;
                                    }
                                    CanvasRenderer._buff.lineTo(CanvasRenderer._lastX = (+(data[0])), CanvasRenderer._lastY = (+(data[1])));
                                    CanvasRenderer._hasPathToFill = true;
                                    break;
                                case canvas.Graphics.CURVE_TO:
                                    if (CanvasRenderer._hasStroke) {
                                        CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = [canvas.Graphics.MOVE_TO, [CanvasRenderer._lastX, CanvasRenderer._lastY]];
                                        CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = info;
                                    }
                                    CanvasRenderer._buff.quadraticCurveTo(data[0], data[1], CanvasRenderer._lastX = (+(data[2])), CanvasRenderer._lastY = (+(data[3])));
                                    CanvasRenderer._hasPathToFill = true;
                                    break;
                                case canvas.Graphics.CUBIC_CURVE_TO:
                                    if (CanvasRenderer._hasStroke) {
                                        CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = [canvas.Graphics.MOVE_TO, [CanvasRenderer._lastX, CanvasRenderer._lastY]];
                                        CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = info;
                                    }
                                    CanvasRenderer._buff.bezierCurveTo(data[0], data[1], data[2], data[3], CanvasRenderer._lastX = (+(data[4])), CanvasRenderer._lastY = (+(data[5])));
                                    CanvasRenderer._hasPathToFill = true;
                                    break;
                            }
                        }
                        CanvasRenderer.__endFill();
                    };
                    CanvasRenderer.__playStrokeCommands = function () {
                        var toStroke;
                        for (var i = 0, len = CanvasRenderer._strokeCommandsSize; i < len; ++i) {
                            var info = CanvasRenderer._strokeCommands[i];
                            var cmd = info[0];
                            var data = info[1];
                            switch (cmd) {
                                case -1:
                                    if (toStroke) {
                                        CanvasRenderer.__endStroke();
                                        toStroke = false;
                                    }
                                    CanvasRenderer._ctx.beginPath();
                                    break;
                                case canvas.Graphics.LINE_STYLE:
                                    CanvasRenderer.__lineStyle(info);
                                    CanvasRenderer._hasStrokeFill = null;
                                    break;
                                case canvas.Graphics.LINE_GRADIENT_STYLE:
                                    CanvasRenderer.__lineGradientStyle(CanvasRenderer._hasStrokeFill = strict(info, Array));
                                    break;
                                case canvas.Graphics.LINE_BITMAP_STYLE:
                                    CanvasRenderer.__lineBitmapStyle(CanvasRenderer._hasStrokeFill = strict(info, Array));
                                    break;
                                case canvas.Graphics.MOVE_TO:
                                    if (CanvasRenderer._strokeThickness % 2 != 0) {
                                        CanvasRenderer._ctx.moveTo(CanvasRenderer.__strokePos(data[0]), CanvasRenderer.__strokePos(data[1]));
                                    }
                                    else {
                                        CanvasRenderer._ctx.moveTo(data[0], data[1]);
                                    }
                                    break;
                                case canvas.Graphics.LINE_TO:
                                    if (CanvasRenderer._strokeThickness % 2 != 0) {
                                        CanvasRenderer._ctx.lineTo(CanvasRenderer.__strokePos(data[0]), CanvasRenderer.__strokePos(data[1]));
                                    }
                                    else {
                                        CanvasRenderer._ctx.lineTo(data[0], data[1]);
                                    }
                                    toStroke = true;
                                    break;
                                case canvas.Graphics.CURVE_TO:
                                    if (CanvasRenderer._strokeThickness % 2 != 0) {
                                        CanvasRenderer._ctx.quadraticCurveTo(CanvasRenderer.__strokePos(data[0]), CanvasRenderer.__strokePos(data[1]), CanvasRenderer.__strokePos(data[2]), CanvasRenderer.__strokePos(data[3]));
                                    }
                                    else {
                                        CanvasRenderer._ctx.quadraticCurveTo(data[0], data[1], data[2], data[3]);
                                    }
                                    toStroke = true;
                                    break;
                                case canvas.Graphics.CUBIC_CURVE_TO:
                                    if (CanvasRenderer._strokeThickness % 2 != 0) {
                                        CanvasRenderer._ctx.bezierCurveTo(CanvasRenderer.__strokePos(data[0]), CanvasRenderer.__strokePos(data[1]), CanvasRenderer.__strokePos(data[2]), CanvasRenderer.__strokePos(data[3]), CanvasRenderer.__strokePos(data[4]), CanvasRenderer.__strokePos(data[5]));
                                    }
                                    else {
                                        CanvasRenderer._ctx.bezierCurveTo(data[0], data[1], data[2], data[3], data[4], data[5]);
                                    }
                                    toStroke = true;
                                    break;
                            }
                        }
                        if (toStroke) {
                            CanvasRenderer.__endStroke();
                        }
                        CanvasRenderer._ctx.moveTo(CanvasRenderer._lastX, CanvasRenderer._lastY);
                        CanvasRenderer._strokeCommandsSize = 0;
                    };
                    CanvasRenderer.__strokePos = function (v) {
                        if (v % 2 == 0) {
                            v -= 0.5;
                        }
                        return v;
                    };
                    CanvasRenderer.__lineStyle = function (info) {
                        var cmd = info[0], data = info[1];
                        var thickness = data[0];
                        var color = data[1];
                        var alpha = data[2];
                        var pixelHinting = data[3];
                        var scaleMode = data[4];
                        var caps = data[5];
                        var joints = data[6];
                        var miterLimit = data[7];
                        if (isNaN(CanvasRenderer._strokeThickness = (+(thickness)))) {
                            return;
                        }
                        if (!joints) {
                            joints = 'round';
                        }
                        else {
                            joints = joints.toLowerCase();
                        }
                        if (!caps) {
                            caps = 'round';
                        }
                        else if (caps == canvas.CapsStyle.NONE) {
                            caps = 'butt';
                        }
                        else {
                            caps = caps.toLowerCase();
                        }
                        CanvasRenderer._ctx.lineWidth = (+(thickness));
                        CanvasRenderer._ctx.lineCap = as(caps, 'String');
                        CanvasRenderer._ctx.lineJoin = as(joints, 'String');
                        if (joints == canvas.JointStyle.MITER) {
                            CanvasRenderer._ctx.miterLimit = (+(miterLimit));
                        }
                        CanvasRenderer._ctx.strokeStyle = canvas.CSSColor.hexToString(color, alpha);
                    };
                    CanvasRenderer.__lineGradientStyle = function (info) {
                        CanvasRenderer._ctx.strokeStyle = CanvasRenderer.__createGradientPattern(info[1]);
                    };
                    CanvasRenderer.__lineBitmapStyle = function (info) {
                        CanvasRenderer._ctx.strokeStyle = CanvasRenderer.__createBitmapPattern(info[1]);
                    };
                    CanvasRenderer.__beginFill = function (info) {
                        var cmd = info[0], data = info[1];
                        var color = data[0];
                        var alpha = data[1];
                        if (alpha < 0.005) {
                            CanvasRenderer._hasFill = null;
                            return;
                        }
                        CanvasRenderer._buff.fillStyle = canvas.CSSColor.hexToString(color, alpha);
                    };
                    CanvasRenderer.__beginGradientFill = function (info) {
                        CanvasRenderer._buff.fillStyle = CanvasRenderer.__createGradientPattern(info[1]);
                    };
                    CanvasRenderer.__beginBitmapFill = function (info) {
                        CanvasRenderer._buff.fillStyle = CanvasRenderer.__createBitmapPattern(info[1]);
                    };
                    CanvasRenderer.__createGradientPattern = function (data) {
                        var type = data[0];
                        var colors = data[1];
                        var alphas = data[2];
                        var ratios = data[3];
                        var matrix = data[4];
                        var spreadMethod = data[5];
                        var interpolationMethod = data[6];
                        var focalPointRatio = data[7];
                        if (!matrix) {
                            matrix = data[4] = new canvas.Matrix;
                            matrix.createGradientBox(CanvasRenderer._bounds.width, CanvasRenderer._bounds.height, 0);
                        }
                        var hash = data.toString();
                        var gradient = CanvasRenderer._cache.get(hash);
                        if (!gradient) {
                            if (type == canvas.GradientType.LINEAR) {
                                var p1 = canvas.Point.__pool.get();
                                var p2 = canvas.Point.__pool.get();
                                p1.__setTo(-819.2, 0);
                                p2.__setTo(819.2, 0);
                                matrix.__transformPointInPlace(p1);
                                matrix.__transformPointInPlace(p2);
                                CanvasRenderer._cache.set(hash, gradient = CanvasRenderer._ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y));
                                canvas.Point.__pool.release(p1);
                                canvas.Point.__pool.release(p2);
                            }
                            else {
                                var x = Math.min(matrix.tx, matrix.ty);
                                var y = x;
                                var r1 = Math.max(x, 1);
                                CanvasRenderer._cache.set(hash, gradient = CanvasRenderer._ctx.createRadialGradient(x, y, 0, x, y, r1));
                            }
                            for (var i = 0, len = colors.length; i < len; ++i) {
                                gradient.addColorStop(ratios[i] / 255, canvas.CSSColor.hexToString(colors[i], alphas[i]));
                            }
                        }
                        return gradient;
                    };
                    CanvasRenderer.__createBitmapPattern = function (data) {
                        var bitmap = data[0];
                        var matrix = data[1];
                        var repeat = data[2];
                        var smooth = data[3];
                        var pattern;
                        var lib = CanvasRenderer._cache.get(bitmap);
                        if (!lib) {
                            CanvasRenderer._cache.set(bitmap, lib = []);
                        }
                        for (var i = 0, len = lib.length; i < len; ++i) {
                            var e = lib[i];
                            if (e.repeat == repeat && e.smooth == smooth) {
                                pattern = e.pattern;
                                break;
                            }
                        }
                        if (!pattern) {
                            lib.push({
                                repeat: repeat,
                                smooth: smooth,
                                pattern: pattern = bitmap.__createPattern(CanvasRenderer._ctx, repeat)
                            });
                        }
                        return pattern;
                    };
                    CanvasRenderer.__endFill = function (finish) {
                        if (finish === void 0) { finish = true; }
                        if (!CanvasRenderer._hasFill || !CanvasRenderer._hasPathToFill) {
                            CanvasRenderer._hasPathToFill = false;
                            if (finish) {
                                CanvasRenderer.__playStrokeCommands();
                            }
                            return;
                        }
                        var cmd = CanvasRenderer._hasFill[0];
                        var data = CanvasRenderer._hasFill[1];
                        var m;
                        var smooth;
                        if (cmd == canvas.Graphics.BEGIN_BITMAP_FILL) {
                            m = data[1];
                            smooth = data[3];
                        }
                        if (cmd == canvas.Graphics.BEGIN_GRADIENT_FILL) {
                            m = data[4];
                            var sx = 1, sy = 1;
                            if (data[0] == canvas.GradientType.RADIAL) {
                                if (m.tx > m.ty) {
                                    sx = Math.max(m.tx, m.ty) / Math.min(m.tx, m.ty);
                                }
                                else {
                                    sy = Math.max(m.tx, m.ty) / Math.min(m.tx, m.ty);
                                }
                            }
                            CanvasRenderer._helperMatrix.identity();
                            CanvasRenderer._helperMatrix.__scale(sx, sy);
                            m = CanvasRenderer._helperMatrix;
                        }
                        var savedCtx;
                        if (m || smooth != undefined) {
                            (savedCtx = CanvasRenderer._buff).save();
                            if (smooth != undefined) {
                                CanvasRenderer._buff.imageSmoothingEnabled = CanvasRenderer._buff.msImageSmoothingEnabled = Boolean(smooth);
                            }
                            if (m) {
                                CanvasRenderer._buff.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                            }
                        }
                        CanvasRenderer._buff.fill();
                        if (finish) {
                            if (CanvasRenderer._matrix) {
                                CanvasRenderer._ctx.save();
                                CanvasRenderer._ctx.setTransform(1, 0, 0, 1, 0, 0);
                                CanvasRenderer._buff.save();
                                CanvasRenderer._buff.setTransform(1, 0, 0, 1, 0, 0);
                            }
                            CanvasRenderer._ctx.drawImage(CanvasRenderer._buff.canvas, 0, 0);
                            CanvasRenderer._buff.clearRect(0, 0, CanvasRenderer._canvasWidth, CanvasRenderer._canvasHeight);
                            if (CanvasRenderer._matrix) {
                                CanvasRenderer._ctx.restore();
                                CanvasRenderer._buff.restore();
                            }
                        }
                        else {
                            CanvasRenderer._buff.beginPath();
                        }
                        if (savedCtx) {
                            savedCtx.restore();
                        }
                        CanvasRenderer._hasPathToFill = false;
                        if (finish) {
                            CanvasRenderer.__playStrokeCommands();
                        }
                    };
                    CanvasRenderer.__endStroke = function () {
                        if (!CanvasRenderer._hasStrokeFill) {
                            CanvasRenderer._ctx.stroke();
                            return;
                        }
                        var cmd = CanvasRenderer._hasStrokeFill[0];
                        var data = CanvasRenderer._hasStrokeFill[1];
                        var m;
                        var smooth;
                        if (cmd == canvas.Graphics.LINE_BITMAP_STYLE) {
                            smooth = data[3];
                        }
                        if (cmd == canvas.Graphics.LINE_GRADIENT_STYLE) {
                        }
                        var savedCtx;
                        if (m || smooth != undefined) {
                            (savedCtx = CanvasRenderer._ctx).save();
                            if (smooth != undefined) {
                                CanvasRenderer._ctx.imageSmoothingEnabled = CanvasRenderer._ctx.msImageSmoothingEnabled = Boolean(smooth);
                            }
                            if (m) {
                                CanvasRenderer._ctx.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                            }
                        }
                        CanvasRenderer._ctx.stroke();
                        if (savedCtx) {
                            savedCtx.restore();
                        }
                    };
                    CanvasRenderer.__setupCtx = function (ctx, graphics, matrix) {
                        if (matrix === void 0) { matrix = null; }
                        CanvasRenderer._hasPathToFill = false;
                        CanvasRenderer._lastX = CanvasRenderer._lastY = 0;
                        CanvasRenderer._strokeThickness = NaN;
                        CanvasRenderer._strokeCommandsSize = 0;
                        CanvasRenderer._bounds.setEmpty();
                        graphics.__getBounds(CanvasRenderer._bounds, CanvasRenderer._matrix = matrix);
                        CanvasRenderer._ctx = ctx;
                        CanvasRenderer._ctx.save();
                        CanvasRenderer._canvasWidth = ((CanvasRenderer._ctx.canvas.width) >> 0);
                        CanvasRenderer._canvasHeight = ((CanvasRenderer._ctx.canvas.height) >> 0);
                        CanvasRenderer._buff = canvas.BitmapData.__popSystemCtx(CanvasRenderer._canvasWidth, CanvasRenderer._canvasHeight, true);
                        CanvasRenderer._buff.save();
                        if (CanvasRenderer._matrix) {
                            CanvasRenderer._buff.setTransform(CanvasRenderer._matrix.a, CanvasRenderer._matrix.b, CanvasRenderer._matrix.c, CanvasRenderer._matrix.d, CanvasRenderer._matrix.tx, CanvasRenderer._matrix.ty);
                        }
                        else {
                            CanvasRenderer._buff.setTransform(1, 0, 0, 1, 0, 0);
                        }
                        CanvasRenderer._buff.globalCompositeOperation = 'xor';
                    };
                    CanvasRenderer.__releaseCtx = function () {
                        if (CanvasRenderer._ctx) {
                            CanvasRenderer._ctx.restore();
                            CanvasRenderer._ctx = null;
                        }
                        if (CanvasRenderer._buff) {
                            CanvasRenderer._buff.restore();
                            CanvasRenderer._buff = strict(canvas.BitmapData.__pushSystemCtx(CanvasRenderer._buff), CanvasRenderingContext2D);
                            CanvasRenderer._buff = null;
                        }
                        CanvasRenderer._matrix = null;
                        CanvasRenderer._hasFill = null;
                        CanvasRenderer._hasStroke = null;
                        CanvasRenderer._hasStrokeFill = null;
                    };
                    CanvasRenderer._hasFill = null;
                    CanvasRenderer._hasStroke = null;
                    CanvasRenderer._hasStrokeFill = null;
                    CanvasRenderer._hasPathToFill = false;
                    CanvasRenderer._lastX = NaN;
                    CanvasRenderer._lastY = NaN;
                    CanvasRenderer._strokeThickness = NaN;
                    CanvasRenderer._strokeCommands = [];
                    CanvasRenderer._strokeCommandsSize = 0;
                    CanvasRenderer._strokeCommandsEmptyInfo = [-1];
                    CanvasRenderer._ctx = null;
                    CanvasRenderer._buff = null;
                    CanvasRenderer._canvasWidth = 0;
                    CanvasRenderer._canvasHeight = 0;
                    CanvasRenderer._matrix = null;
                    CanvasRenderer._bounds = asc.sti(CanvasRenderer, function () { CanvasRenderer._bounds = new canvas.Rectangle; });
                    CanvasRenderer._cache = asc.sti(CanvasRenderer, function () { CanvasRenderer._cache = new canvas.Dictionary; });
                    CanvasRenderer._helperMatrix = asc.sti(CanvasRenderer, function () { CanvasRenderer._helperMatrix = new canvas.Matrix; });
                    return CanvasRenderer;
                }());
                canvas.CanvasRenderer = CanvasRenderer;
            })(canvas = renderer.canvas || (renderer.canvas = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=CanvasRenderer.js.map