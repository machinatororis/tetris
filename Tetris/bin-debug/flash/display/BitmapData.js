var flash;
(function (flash) {
    var display;
    (function (display) {
        display.SystemBitmapData = flash.__native.display.SystemBitmapData;
        display.CanvasRenderer = flash.__native.renderer.canvas.CanvasRenderer;
        display.WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
        display.Base64 = flash.__native.utils.Base64;
        display.Random = flash.__native.utils.Random;
        display.getNextPowerOfTwo = flash.__native.utils.getNextPowerOfTwo;
        display.Context3DTextureFormat = flash.display3D.Context3DTextureFormat;
        display.Texture = flash.display3D.textures.Texture;
        display.BitmapFilter = flash.filters.BitmapFilter;
        display.ColorMatrixFilter = flash.filters.ColorMatrixFilter;
        display.NoiseFilter = flash.filters.NoiseFilter;
        display.ColorTransform = flash.geom.ColorTransform;
        display.Matrix = flash.geom.Matrix;
        display.Point = flash.geom.Point;
        display.Rectangle = flash.geom.Rectangle;
        display.TextFormat = flash.text.TextFormat;
        display.ByteArray = flash.utils.ByteArray;
        var BitmapData = (function () {
            function BitmapData(width, height, transparent, fillColor) {
                if (transparent === void 0) { transparent = true; }
                if (fillColor === void 0) { fillColor = 0xffffffff; }
                this.implements_flash_display_IBitmapDrawable = null;
                this._ctx = null;
                this._element = null;
                this._texture = null;
                this._pixels = null;
                this._p2pixels = null;
                this._transparent = false;
                this._width = 0;
                this._height = 0;
                this._p2width = 0;
                this._p2height = 0;
                this._rect = null;
                this._textureRect = null;
                this._dirtyPixels = false;
                this._dirtyTexture = false;
                this._dirtyDisplayObject = false;
                this._modifiedPixels = false;
                this._invalid = false;
                this._systemWidth = 0;
                this._systemHeight = 0;
                this._uid = 0;
                this._version = 0;
                this._listenerDispose = null;
                width = ((width) >> 0);
                height = ((height) >> 0);
                transparent = Boolean(transparent);
                fillColor = ((fillColor) >>> 0);
                if (width <= 0 || height <= 0) {
                    throw new ArgumentError('Invalid BitmapData', 2015);
                }
                this._uid = ((BitmapData.sBitmapDataUID++) >> 0);
                var stageId = display.Stage.sCurrent ? display.Stage.sCurrent.mId : 0;
                this._ctx = strict(window.asc.getCtx(stageId), display.WebGLContext2D);
                this._transparent = transparent;
                this._width = width;
                this._height = height;
                this._p2width = display.getNextPowerOfTwo(this._width);
                this._p2height = display.getNextPowerOfTwo(this._height);
                this._rect = strict(display.Rectangle.__pool.get(), display.Rectangle);
                this._rect.__setTo(0, 0, this._width, this._height);
                this._textureRect = strict(display.Rectangle.__pool.get(), display.Rectangle);
                this._textureRect.__setTo(0, 0, this._p2width, this._p2height);
                this._texture = this._texture || this._ctx.context.createTexture(this._p2width, this._p2height, display.Context3DTextureFormat.BGRA, false);
                this.__addStats();
                if ((transparent && fillColor == 0x0) || arguments[4] == false) {
                    return;
                }
                this.fillRect(this._rect, fillColor);
            }
            BitmapData.prototype.clone = function () {
                return BitmapData.__clone(this, new BitmapData(this._width, this._height, this._transparent, 0x0, false));
            };
            Object.defineProperty(BitmapData.prototype, "width", {
                get: function () { return this._width; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BitmapData.prototype, "height", {
                get: function () { return this._height; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BitmapData.prototype, "transparent", {
                get: function () { return this._transparent; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BitmapData.prototype, "rect", {
                get: function () { return this._rect; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BitmapData.prototype, "textureRect", {
                get: function () { return this._textureRect; },
                enumerable: true,
                configurable: true
            });
            BitmapData.prototype.applyFilter = function (sourceBitmapData, sourceRect, destPoint, filter) {
                sourceBitmapData = strict(sourceBitmapData, BitmapData);
                sourceRect = strict(sourceRect, display.Rectangle);
                destPoint = strict(destPoint, display.Point);
                filter = strict(filter, display.BitmapFilter);
                if (!filter || filter.__notImplemented) {
                    return;
                }
                this._ctx.saveAndReset();
                var prevContent = !filter.__replaceContent;
                var source2filter;
                var filteredSource;
                var r = display.Rectangle.__pool.get();
                r.__setTo(0, 0, sourceRect.width, sourceRect.height);
                var bounds = filter.__bounds(r);
                try {
                    var p = display.Point.__pool.get();
                    p.__setTo(-bounds.x, -bounds.y);
                    source2filter = sourceBitmapData.__slice(sourceRect, p, true, prevContent, prevContent);
                    filteredSource = filter.__apply(this._ctx, source2filter, true);
                    var x = destPoint.x + bounds.x, y = destPoint.y + bounds.y;
                    var width = Math.ceil(Math.min(bounds.width, this._width - x)), height = Math.ceil(Math.min(bounds.height, this._height - y));
                    var m = display.Matrix.__pool.get();
                    m.__translate(x, y);
                    this._ctx.setRenderToBitmapData(this).clearRect(x, y, width, height).clipRect(x, y, width, height);
                    this._ctx.setTransformFromMatrix(m);
                    this._ctx.drawImage(filteredSource, false, true);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    trace(e.getStackTrace());
                }
                finally {
                    if (filteredSource) {
                        filteredSource.dispose();
                    }
                    if (source2filter) {
                        source2filter.dispose();
                    }
                    this._ctx.restore();
                    display.Rectangle.__pool.release(r);
                    display.Point.__pool.release(p);
                    display.Matrix.__pool.release(m);
                }
                this._version++;
                this._element = null;
                this._dirtyPixels = this._dirtyDisplayObject = true;
            };
            BitmapData.prototype.getPixel = function (x, y) {
                x = ((x) >> 0);
                y = ((y) >> 0);
                this.__getPixels();
                var p = (y * this._width + x) * 4;
                return (this._pixels[p] << 16) | (this._pixels[p + 1] << 8) | this._pixels[p + 2];
            };
            BitmapData.prototype.getPixel32 = function (x, y) {
                x = ((x) >> 0);
                y = ((y) >> 0);
                this.__getPixels();
                var p = (y * this._width + x) * 4;
                var a = this._pixels[p + 3];
                var npm = a / 255.0;
                return (a << 24) | (((this._pixels[p] / npm) & 0xff) << 16) | (((this._pixels[p + 1] / npm) & 0xff) << 8) | ((this._pixels[p + 2] / npm) & 0xff);
            };
            BitmapData.prototype.setPixel = function (x, y, color) {
                x = ((x) >> 0);
                y = ((y) >> 0);
                color = ((color) >>> 0);
                this.__getPixels();
                var p = (y * this._width + x) * 4;
                this._pixels[p] = (color >> 16) & 0xff;
                this._pixels[p + 1] = (color >> 8) & 0xff;
                this._pixels[p + 2] = color & 0xff;
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
            };
            BitmapData.prototype.setPixel32 = function (x, y, color) {
                x = ((x) >> 0);
                y = ((y) >> 0);
                color = ((color) >>> 0);
                this.__getPixels();
                var p = (y * this._width + x) * 4;
                var a = (color >> 24) & 0xff;
                var pm = a / 255;
                this._pixels[p] = (((color >> 16) & 0xff) * pm) & 0xff;
                this._pixels[p + 1] = (((color >> 8) & 0xff) * pm) & 0xff;
                this._pixels[p + 2] = ((color & 0xff) * pm) & 0xff;
                this._pixels[p + 3] = a;
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
            };
            BitmapData.prototype.colorTransform = function (rect, ct) {
                rect = strict(rect, display.Rectangle);
                ct = strict(ct, display.ColorTransform);
                BitmapData.sHelperColorMatrixFilter.matrix = [
                    ct.redMultiplier, 0, 0, 0, ct.redOffset,
                    0, ct.greenMultiplier, 0, 0, ct.greenOffset,
                    0, 0, ct.blueMultiplier, 0, ct.blueOffset,
                    0, 0, 0, ct.alphaMultiplier, ct.alphaOffset
                ];
                var p = display.Point.__pool.get();
                this.applyFilter(this, rect, p, BitmapData.sHelperColorMatrixFilter);
                display.Point.__pool.release(p);
            };
            BitmapData.prototype.compare = function (otherBitmapData) {
                otherBitmapData = strict(otherBitmapData, BitmapData);
                if (!otherBitmapData) {
                    throw new TypeError('Parameter otherBitmapData must be non-null.', 2007);
                }
                if (otherBitmapData == this) {
                    return 0;
                }
                if (this._width != otherBitmapData._width) {
                    return -3;
                }
                if (this._height != otherBitmapData._height) {
                    return -4;
                }
                var isTransparent = (this._transparent || otherBitmapData._transparent);
                var resultBitmapData = new BitmapData(this._width, this._height, isTransparent, 0x0);
                this.__getPixels();
                var otherPixels = otherBitmapData.__getPixels();
                var resultPixels = resultBitmapData.__getPixels();
                var isEqual = true;
                for (var i = 0, len = this._pixels.byteLength; i < len; i += 4) {
                    var currentAlpha = this._pixels[i + 3];
                    var currentNpm = currentAlpha / 255;
                    var currentRed = (this._pixels[i] / currentNpm) & 0xff;
                    var currentGreen = (this._pixels[i + 1] / currentNpm) & 0xff;
                    var currentBlue = (this._pixels[i + 2] / currentNpm) & 0xff;
                    var otherAlpha = otherPixels[i + 3];
                    var otherNpm = otherAlpha / 255;
                    var otherRed = (otherPixels[i] / otherNpm) & 0xff;
                    var otherGreen = (otherPixels[i + 1] / otherNpm) & 0xff;
                    var otherBlue = (otherPixels[i + 2] / otherNpm) & 0xff;
                    if (currentRed !== otherRed || currentGreen !== otherGreen || currentBlue !== otherBlue) {
                        resultPixels[i] = (currentRed - otherRed) & 0xff;
                        resultPixels[i + 1] = (currentGreen - otherGreen) & 0xff;
                        resultPixels[i + 2] = (currentBlue - otherBlue) & 0xff;
                        resultPixels[i + 3] = 0xff;
                    }
                    else if (currentAlpha !== otherAlpha) {
                        resultPixels[i + 3] = currentAlpha - otherAlpha;
                        resultPixels[i] = resultPixels[i + 1] =
                            resultPixels[i + 2] = isTransparent ? resultPixels[i + 3] : 0xff;
                    }
                    else {
                        continue;
                    }
                    isEqual = false;
                }
                if (isEqual) {
                    return 0;
                }
                return resultBitmapData;
            };
            BitmapData.prototype.copyChannel = function (sourceBitmapData, sourceRect, destPoint, sourceChannel, destChannel) {
                sourceBitmapData = strict(sourceBitmapData, BitmapData);
                sourceRect = strict(sourceRect, display.Rectangle);
                destPoint = strict(destPoint, display.Point);
                sourceChannel = ((sourceChannel) >>> 0);
                destChannel = ((destChannel) >>> 0);
                if (destChannel == display.BitmapDataChannel.ALPHA && !this.transparent)
                    return;
                if (sourceRect.width <= 0 || sourceRect.height <= 0)
                    return;
                var srcIndex = 0;
                switch (sourceChannel) {
                    case display.BitmapDataChannel.RED:
                        srcIndex = 0;
                        break;
                    case display.BitmapDataChannel.GREEN:
                        srcIndex = 1;
                        break;
                    case display.BitmapDataChannel.BLUE:
                        srcIndex = 2;
                        break;
                    case display.BitmapDataChannel.ALPHA:
                        srcIndex = 3;
                        break;
                }
                var destIndex = 0;
                switch (destChannel) {
                    case display.BitmapDataChannel.RED:
                        destIndex = 0;
                        break;
                    case display.BitmapDataChannel.GREEN:
                        destIndex = 1;
                        break;
                    case display.BitmapDataChannel.BLUE:
                        destIndex = 2;
                        break;
                    case display.BitmapDataChannel.ALPHA:
                        destIndex = 3;
                        break;
                }
                var sx = sourceRect.x | 0, sy = sourceRect.y | 0;
                var smw = (sourceRect.width | 0) + sx, smh = (sourceRect.height | 0) + sy;
                var dx = destPoint.x | 0, dy = destPoint.y | 0;
                var srcPixels = sourceBitmapData.__getPixels();
                var destPixels = this.__getPixels();
                var srcWidth = sourceBitmapData._width;
                for (var y = sy; y < smh; ++y) {
                    for (var x = sx; x < smw; ++x) {
                        var srcP = (y * srcWidth + x) * 4;
                        var destP = ((y + dy) * this._width + x + dx) * 4;
                        var srcChannel = srcPixels[srcP + srcIndex];
                        var srcAlpha = srcPixels[srcP + 3];
                        var srcAlphaMultiplier = srcAlpha / 255;
                        if (srcIndex != 3) {
                            if (srcAlphaMultiplier != 0.0) {
                                srcChannel /= srcAlphaMultiplier;
                            }
                            else {
                                srcChannel = 0;
                            }
                        }
                        var destAlpha = destPixels[destP + 3];
                        var destAlphaMultiplier = destAlpha / 255;
                        if (destIndex == 3) {
                            if (destAlphaMultiplier != 1.0) {
                                if (destAlphaMultiplier != 0.0) {
                                    destPixels[destP] /= destAlphaMultiplier;
                                    destPixels[destP + 1] /= destAlphaMultiplier;
                                    destPixels[destP + 2] /= destAlphaMultiplier;
                                }
                                else {
                                    destPixels[destP] = destPixels[destP + 1] = destPixels[destP + 2] = 0;
                                }
                            }
                            var srcChannelMultiplier = srcChannel / 255;
                            if (srcChannelMultiplier != 1.0) {
                                if (srcChannelMultiplier != 0.0) {
                                    destPixels[destP] *= srcChannelMultiplier;
                                    destPixels[destP + 1] *= srcChannelMultiplier;
                                    destPixels[destP + 2] *= srcChannelMultiplier;
                                }
                                else {
                                    destPixels[destP] = destPixels[destP + 1] = destPixels[destP + 2] = 0;
                                }
                            }
                            destPixels[destP + 3] = srcChannel;
                        }
                        else {
                            destPixels[destP + destIndex] = srcChannel * destAlphaMultiplier;
                        }
                    }
                }
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
            };
            BitmapData.prototype.copyPixels = function (sourceBitmapData, sourceRect, destPoint, alphaBitmapData, alphaPoint, mergeAlpha) {
                if (alphaBitmapData === void 0) { alphaBitmapData = null; }
                if (alphaPoint === void 0) { alphaPoint = null; }
                if (mergeAlpha === void 0) { mergeAlpha = false; }
                sourceBitmapData = strict(sourceBitmapData, BitmapData);
                sourceRect = strict(sourceRect, display.Rectangle);
                destPoint = strict(destPoint, display.Point);
                alphaBitmapData = strict(alphaBitmapData, BitmapData);
                alphaPoint = strict(alphaPoint, display.Point);
                mergeAlpha = Boolean(mergeAlpha);
                if (!sourceBitmapData) {
                    throw new TypeError('Parameter sourceBitmapData must be non-null.', 2007);
                }
                if (!sourceRect) {
                    throw new TypeError('Parameter sourceRect must be non-null.', 2007);
                }
                if (!destPoint) {
                    throw new TypeError('Parameter destPoint must be non-null.', 2007);
                }
                var useAlphaBitmapData = (alphaBitmapData && alphaBitmapData._transparent);
                var blend = (mergeAlpha || (useAlphaBitmapData && !sourceBitmapData._transparent));
                var rx = sourceRect.x | 0;
                var ry = sourceRect.y | 0;
                var deltaX = (destPoint.x - rx) | 0;
                var deltaY = (destPoint.y - ry) | 0;
                var minX = Math.max(rx, 0, -deltaX);
                var minY = Math.max(ry, 0, -deltaY);
                var maxX = Math.min(sourceRect.width + rx, sourceBitmapData._width, this._width - deltaX);
                var maxY = Math.min(sourceRect.height + ry, sourceBitmapData._height, this._height - deltaY);
                if (maxX <= minX || maxY <= minY) {
                    return;
                }
                var sourcePixels = sourceBitmapData.__getPixels();
                this.__getPixels();
                if (useAlphaBitmapData) {
                    var alphaPixels = alphaBitmapData.__getPixels();
                    var alphaPixelsLen = alphaPixels.byteLength;
                    var alphaPointX = 0;
                    var alphaPointY = 0;
                    if (alphaPoint) {
                        alphaPointX = alphaPoint.x;
                        alphaPointY = alphaPoint.y;
                    }
                    var alphaDeltaX = (alphaPointX - rx) | 0;
                    var alphaDeltaY = (alphaPointY - ry) | 0;
                    minX = Math.max(minX, -alphaPointX);
                    minY = Math.max(minY, -alphaPointY);
                    maxX = Math.min(maxX, alphaBitmapData._width - alphaDeltaX);
                    maxY = Math.min(maxY, alphaBitmapData._height - alphaDeltaY);
                    if (maxX <= minX || maxY <= minY) {
                        return;
                    }
                    if (blend) {
                        for (var y = minY; y < maxY; y++) {
                            var sFirstPixelInRow = y * sourceBitmapData._width;
                            var cFirstPixelInRow = (y + deltaY) * this._width;
                            var aFirstPixelInRow = (y + alphaDeltaY) * alphaBitmapData._width;
                            for (var x = minX; x < maxX; x++) {
                                var sPixel = (sFirstPixelInRow + x) * 4;
                                var cPixel = (cFirstPixelInRow + x + deltaX) * 4;
                                var aPixel = (aFirstPixelInRow + x + alphaDeltaX) * 4;
                                var sourceAlpha = (aPixel > 0 && aPixel < alphaPixelsLen) ?
                                    (alphaPixels[aPixel + 3] / 255) * (sourcePixels[sPixel + 3] / 255) : 0;
                                if (sourceAlpha > 0) {
                                    var destAlpha = this._pixels[cPixel + 3] / 255;
                                    var oneMinusSourceAlpha = 1 - sourceAlpha;
                                    var blendAlpha = sourceAlpha + (destAlpha * oneMinusSourceAlpha);
                                    var cRed = (this._pixels[cPixel] / destAlpha) & 0xff;
                                    var cGreen = (this._pixels[cPixel + 1] / destAlpha) & 0xff;
                                    var cBlue = (this._pixels[cPixel + 2] / destAlpha) & 0xff;
                                    var sNpm = sourcePixels[sPixel + 3] / 255;
                                    var sRed = (sourcePixels[sPixel] / sNpm) & 0xff;
                                    var sGreen = (sourcePixels[sPixel + 1] / sNpm) & 0xff;
                                    var sBlue = (sourcePixels[sPixel + 2] / sNpm) & 0xff;
                                    var fAlpha = (blendAlpha * 255);
                                    var fRed = (sRed * sourceAlpha + cRed * destAlpha * oneMinusSourceAlpha);
                                    var fGreen = (sGreen * sourceAlpha + cGreen * destAlpha * oneMinusSourceAlpha);
                                    var fBlue = (sBlue * sourceAlpha + cBlue * destAlpha * oneMinusSourceAlpha);
                                    this._pixels[cPixel] = fRed & 0xff;
                                    this._pixels[cPixel + 1] = fGreen & 0xff;
                                    this._pixels[cPixel + 2] = fBlue & 0xff;
                                    this._pixels[cPixel + 3] = fAlpha | 0;
                                }
                            }
                        }
                    }
                    else {
                        for (var y = minY; y < maxY; y++) {
                            var sFirstPixelInRow = y * sourceBitmapData._width;
                            var cFirstPixelInRow = (y + deltaY) * this._width;
                            var aFirstPixelInRow = (y + alphaDeltaY) * alphaBitmapData._width;
                            for (var x = minX; x < maxX; x++) {
                                var sPixel = (sFirstPixelInRow + x) * 4;
                                var cPixel = (cFirstPixelInRow + x + deltaX) * 4;
                                var aPixel = (aFirstPixelInRow + x + alphaDeltaX) * 4;
                                var sourceAlpha = (aPixel > 0 && aPixel < alphaPixelsLen) ?
                                    (alphaPixels[aPixel + 3] / 255) * (sourcePixels[sPixel + 3] / 255) : 0;
                                var cNpm = this._pixels[cPixel] / 255;
                                var cRed = (this._pixels[cPixel] / cNpm) & 0xff;
                                var cGreen = (this._pixels[cPixel + 1] / cNpm) & 0xff;
                                var cBlue = (this._pixels[cPixel + 2] / cNpm) & 0xff;
                                var sNpm = sourcePixels[sPixel + 3] / 255;
                                var sRed = (sourcePixels[sPixel] / sNpm) & 0xff;
                                var sGreen = (sourcePixels[sPixel + 1] / sNpm) & 0xff;
                                var sBlue = (sourcePixels[sPixel + 2] / sNpm) & 0xff;
                                this._pixels[cPixel] = ((sRed & 0xff) * sourceAlpha) & 0xff;
                                this._pixels[cPixel + 1] = ((sGreen & 0xff) * sourceAlpha) & 0xff;
                                this._pixels[cPixel + 2] = ((sBlue & 0xff) * sourceAlpha) & 0xff;
                                this._pixels[cPixel + 3] = (sourceAlpha * 255) | 0;
                            }
                        }
                    }
                }
                else {
                    if (blend) {
                        for (var y = minY; y < maxY; y++) {
                            var cFirstPixelInRow = (y + deltaY) * this._width;
                            var sFirstPixelInRow = y * sourceBitmapData._width;
                            for (var x = minX; x < maxX; x++) {
                                var cPixel = (cFirstPixelInRow + x + deltaX) * 4;
                                var sPixel = (sFirstPixelInRow + x) * 4;
                                var sourceAlpha = sourcePixels[sPixel + 3] / 255;
                                var destAlpha = this._pixels[cPixel + 3] / 255;
                                var oneMinusSourceAlpha = 1 - sourceAlpha;
                                var blendAlpha = sourceAlpha + (destAlpha * oneMinusSourceAlpha);
                                if (blendAlpha == 0) {
                                    this._pixels[cPixel + 3] = 0;
                                }
                                else {
                                    var cRed = (this._pixels[cPixel] / destAlpha) & 0xff;
                                    var cGreen = (this._pixels[cPixel + 1] / destAlpha) & 0xff;
                                    var cBlue = (this._pixels[cPixel + 2] / destAlpha) & 0xff;
                                    var sRed = (sourcePixels[sPixel] / sourceAlpha) & 0xff;
                                    var sGreen = (sourcePixels[sPixel + 1] / sourceAlpha) & 0xff;
                                    var sBlue = (sourcePixels[sPixel + 2] / sourceAlpha) & 0xff;
                                    var fAlpha = (blendAlpha * 255);
                                    var fRed = (sRed * sourceAlpha + cRed * destAlpha * oneMinusSourceAlpha);
                                    var fGreen = (sGreen * sourceAlpha + cGreen * destAlpha * oneMinusSourceAlpha);
                                    var fBlue = (sBlue * sourceAlpha + cBlue * destAlpha * oneMinusSourceAlpha);
                                    this._pixels[cPixel] = fRed & 0xff;
                                    this._pixels[cPixel + 1] = fGreen & 0xff;
                                    this._pixels[cPixel + 2] = fBlue & 0xff;
                                    this._pixels[cPixel + 3] = fAlpha | 0;
                                }
                            }
                        }
                    }
                    else {
                        for (var y = minY; y < maxY; y++) {
                            var cFirstPixelInRow = (y + deltaY) * this._width;
                            var sFirstPixelInRow = y * sourceBitmapData._width;
                            for (var x = minX; x < maxX; x++) {
                                var cPixel = (cFirstPixelInRow + x + deltaX) * 4;
                                var sPixel = (sFirstPixelInRow + x) * 4;
                                this._pixels[cPixel] = sourcePixels[sPixel];
                                this._pixels[cPixel + 1] = sourcePixels[sPixel + 1];
                                this._pixels[cPixel + 2] = sourcePixels[sPixel + 2];
                                this._pixels[cPixel + 3] = sourcePixels[sPixel + 3];
                            }
                        }
                    }
                }
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
            };
            BitmapData.prototype.dispose = function () {
                if (!this._invalid) {
                    this.__removeStats();
                }
                if (this._texture) {
                    this._texture.dispose();
                    this._texture = null;
                }
                if (this._rect) {
                    display.Rectangle.__pool.release(this._rect);
                    this._rect = null;
                }
                if (this._textureRect) {
                    display.Rectangle.__pool.release(this._textureRect);
                    this._textureRect = null;
                }
                this._ctx = null;
                this._width = this._height = 0;
                this._pixels = this._p2pixels = null;
                this._element = null;
                this._dirtyPixels = this._dirtyTexture = this._modifiedPixels = false;
                this._dirtyDisplayObject = true;
                this._invalid = true;
                if (this._listenerDispose) {
                    this._listenerDispose(this);
                    this._listenerDispose = null;
                }
            };
            BitmapData.prototype.draw = function (source, matrix, colorTransform, blendMode, clipRect, smoothing) {
                if (matrix === void 0) { matrix = null; }
                if (colorTransform === void 0) { colorTransform = null; }
                if (blendMode === void 0) { blendMode = null; }
                if (clipRect === void 0) { clipRect = null; }
                if (smoothing === void 0) { smoothing = false; }
                source = strict(source, 'implements_flash_display_IBitmapDrawable');
                matrix = strict(matrix, display.Matrix);
                colorTransform = strict(colorTransform, display.ColorTransform);
                blendMode = as(blendMode, 'String');
                clipRect = strict(clipRect, display.Rectangle);
                smoothing = Boolean(smoothing);
                this.__drawWithQuality(source, matrix, colorTransform, blendMode, clipRect, smoothing);
            };
            BitmapData.prototype.drawWithQuality = function (source, matrix, colorTransform, blendMode, clipRect, smoothing, quality) {
                if (matrix === void 0) { matrix = null; }
                if (colorTransform === void 0) { colorTransform = null; }
                if (blendMode === void 0) { blendMode = null; }
                if (clipRect === void 0) { clipRect = null; }
                if (smoothing === void 0) { smoothing = false; }
                if (quality === void 0) { quality = null; }
                source = strict(source, 'implements_flash_display_IBitmapDrawable');
                matrix = strict(matrix, display.Matrix);
                colorTransform = strict(colorTransform, display.ColorTransform);
                blendMode = as(blendMode, 'String');
                clipRect = strict(clipRect, display.Rectangle);
                smoothing = Boolean(smoothing);
                quality = as(quality, 'String');
                this.__drawWithQuality(source, matrix, colorTransform, blendMode, clipRect, smoothing, quality);
            };
            BitmapData.prototype.encode = function (rect, compressor, byteArray) {
                if (byteArray === void 0) { byteArray = null; }
                rect = strict(rect, display.Rectangle);
                byteArray = strict(byteArray, display.ByteArray);
                var mime;
                var quality = 100;
                if (is(compressor, display.PNGEncoderOptions)) {
                    mime = 'image/png';
                }
                if (is(compressor, display.JPEGEncoderOptions)) {
                    mime = 'image/jpeg';
                    quality = (((as(compressor, display.JPEGEncoderOptions)).quality) >> 0);
                }
                if (is(compressor, display.JPEGXREncoderOptions)) {
                    throw new Error('JPEGXREncoderOptions is not implemented');
                }
                if (mime) {
                    var buff = BitmapData.__popSystemCtx(this._p2width, this._p2height, true);
                    var canvas = buff.canvas;
                    canvas.width = this._width;
                    canvas.height = this._height;
                    var dataURL = this.__toCanvas(buff).toDataURL(mime, quality / 100);
                    canvas.width = this._p2width;
                    canvas.height = this._p2height;
                    BitmapData.__pushSystemCtx(buff);
                    var tmp = display.Base64.decode(dataURL.substr(dataURL.indexOf(',') + 1));
                    if (byteArray) {
                        return byteArray.__fromByteArray(tmp);
                    }
                    return tmp;
                }
                return null;
            };
            BitmapData.prototype.fillRect = function (rect, fillColor) {
                rect = strict(rect, display.Rectangle);
                fillColor = ((fillColor) >>> 0);
                var argb = this._transparent ? fillColor : (0xff << 24) | fillColor;
                var x = rect.x | 0, y = rect.y | 0, w = rect.width | 0, h = rect.height | 0;
                this._ctx.saveAndReset();
                this._ctx.setRenderToBitmapData(this).clearRect(x, y, w, h).fillRect(x, y, w, h, argb);
                this._ctx.restore();
                this._version++;
                this._element = null;
                this._dirtyPixels = this._dirtyDisplayObject = true;
            };
            BitmapData.prototype.floodFill = function (x, y, color) {
                x = ((x) >> 0);
                y = ((y) >> 0);
                color = ((color) >>> 0);
                if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
                    return;
                }
                if (!this._transparent) {
                    color = (((0xff << 24) | color) >>> 0);
                }
                this.__getPixels();
                var startColor = this.__getPixel32__pure(x, y);
                if (startColor == color) {
                    return;
                }
                var buffer = [x, y];
                while (buffer.length) {
                    var xPoint = buffer.shift();
                    var yPoint = buffer.shift();
                    for (var xLeft = xPoint; 0 < xLeft; xLeft--) {
                        if (this.__getPixel32__pure(xLeft - 1, yPoint) != startColor) {
                            break;
                        }
                    }
                    for (var xRight = xPoint; xRight < this._width - 1; xRight++) {
                        if (this.__getPixel32__pure(xRight + 1, yPoint) != startColor) {
                            break;
                        }
                    }
                    for (var i = xLeft; i <= xRight; i++) {
                        this.__setPixel32__pure(i, yPoint, color);
                    }
                    if (yPoint + 1 < this._height) {
                        __scanLine.__bind(this)(xLeft, xRight, yPoint + 1, startColor, buffer);
                    }
                    if (yPoint > 0) {
                        __scanLine.__bind(this)(xLeft, xRight, yPoint - 1, startColor, buffer);
                    }
                }
                function __scanLine(xLeft, xRight, y, targetColor, buffer) {
                    while (xLeft <= xRight) {
                        while (this.__getPixel32__pure(xLeft, y) != targetColor && xRight > xLeft++)
                            ;
                        if (xRight < xLeft) {
                            break;
                        }
                        xLeft++;
                        while (this.__getPixel32__pure(xLeft, y) == targetColor && xRight > xLeft++)
                            ;
                        buffer.push(xLeft - 1);
                        buffer.push(y);
                    }
                }
                this._element = null;
                this._dirtyDisplayObject = this._dirtyTexture = this._modifiedPixels = true;
            };
            BitmapData.prototype.generateFilterRect = function (sourceRect, filter) {
                sourceRect = strict(sourceRect, display.Rectangle);
                filter = strict(filter, display.BitmapFilter);
                return filter.__bounds(sourceRect.clone());
            };
            BitmapData.prototype.getColorBoundsRect = function (mask, color, findColor) {
                if (findColor === void 0) { findColor = true; }
                mask = ((mask) >>> 0);
                color = ((color) >>> 0);
                findColor = Boolean(findColor);
                if (!this._transparent) {
                    mask = (((0xff << 24) | mask) >>> 0);
                    color = (((0xff << 24) | color) >>> 0);
                }
                this.__getPixels();
                var xMin, xMax, yMin, yMax;
                for (var i = 0, len = this._pixels.byteLength; i < len; i += 4) {
                    var a = this._pixels[i + 3];
                    var npm = a / 255;
                    var pixelColor32 = ((a << 24) |
                        (((this._pixels[i] / npm) & 0xff) << 16) |
                        (((this._pixels[i + 1] / npm) & 0xff) << 8) |
                        ((this._pixels[i + 2] / npm) & 0xff)
                            & mask) >>> 0;
                    if ((findColor && pixelColor32 == color) || (!findColor && pixelColor32 != color)) {
                        var pixelIndex = i / 4;
                        var pixelX = pixelIndex % this._width;
                        var pixelY = (pixelIndex / this._width) | 0;
                        if (xMin == undefined) {
                            xMin = xMax = pixelX;
                            yMin = yMax = pixelY;
                        }
                        else {
                            if (pixelX < xMin)
                                xMin = pixelX;
                            else if (pixelX > xMax)
                                xMax = pixelX;
                            if (pixelY < yMin)
                                yMin = pixelY;
                            else if (pixelY > yMax)
                                yMax = pixelY;
                        }
                    }
                    if (xMin == 0 && xMax === this._width - 1 && yMin == 0 && yMax === this._height - 1) {
                        break;
                    }
                }
                return xMin == undefined ?
                    new display.Rectangle(0, 0, 0, 0) :
                    new display.Rectangle(xMin, yMin, xMax - xMin + 1, yMax - yMin + 1);
            };
            BitmapData.prototype.getPixels = function (rect) {
                rect = strict(rect, display.Rectangle);
                var dest = new display.ByteArray;
                if (rect.width <= 0 || rect.height <= 0) {
                    return dest;
                }
                var sx = rect.x | 0, sy = rect.y | 0;
                var sw = rect.width | 0, sh = rect.height | 0;
                dest.length = sw * sh * 4;
                this.__getPixels();
                for (var y = sy; y < sh; ++y) {
                    for (var x = sx; x < sw; ++x) {
                        dest.writeUnsignedInt(this.getPixel32(x, y));
                    }
                }
                return dest;
            };
            BitmapData.prototype.copyPixelsToByteArray = function (rect, data) {
                rect = strict(rect, display.Rectangle);
                data = strict(data, display.ByteArray);
                if (rect.width <= 0 || rect.height <= 0)
                    return;
                var sx = rect.x | 0, sy = rect.y | 0;
                var sw = rect.width | 0, sh = rect.height | 0;
                this.__getPixels();
                for (var y = sy; y < sh; ++y) {
                    for (var x = sx; x < sw; ++x) {
                        data.writeUnsignedInt(this.getPixel32(x, y));
                    }
                }
            };
            BitmapData.prototype.getVector = function (rect) {
                rect = strict(rect, display.Rectangle);
                var dest = new Array;
                if (rect.width <= 0 || rect.height <= 0)
                    return dest;
                var sx = rect.x | 0, sy = rect.y | 0;
                var sw = rect.width | 0, sh = rect.height | 0;
                this.__getPixels();
                for (var y = sy; y < sh; ++y) {
                    for (var x = sx; x < sw; ++x) {
                        dest[dest.length] = this.getPixel32(x, y);
                    }
                }
                return dest;
            };
            BitmapData.prototype.hitTest = function (firstPoint, firstAlphaThreshold, secondObject, secondBitmapDataPoint, secondAlphaThreshold) {
                if (secondBitmapDataPoint === void 0) { secondBitmapDataPoint = null; }
                if (secondAlphaThreshold === void 0) { secondAlphaThreshold = 1; }
                firstPoint = strict(firstPoint, display.Point);
                firstAlphaThreshold = ((firstAlphaThreshold) >>> 0);
                secondBitmapDataPoint = strict(secondBitmapDataPoint, display.Point);
                secondAlphaThreshold = ((secondAlphaThreshold) >>> 0);
                if (!firstPoint) {
                    throw new TypeError('Parameter firstPoint must be non-null', 2007);
                }
                if (!(is(secondObject, display.Point) || is(secondObject, display.Rectangle) || (is(secondObject, display.Bitmap) && secondObject.bitmapData) || is(secondObject, BitmapData))) {
                    throw new ArgumentError('Parameter 0 is of the incorrect type. Should be type one of the types: Point, Rectangle, Bitmap, BitmapData', 2005);
                }
                this.__getPixels();
                var fx = firstPoint.x;
                var fy = firstPoint.y;
                var sx, sy;
                if (is(secondObject, display.Point)) {
                    sx = (secondObject.x - fx) | 0;
                    sy = (secondObject.y - fy) | 0;
                    if (sx >= this._width || sy >= this._height || sx < 0 || sy < 0) {
                        return false;
                    }
                    return firstAlphaThreshold <= this._pixels[((this._width * sy) + sx) * 4 + 3];
                }
                var secondRect = display.Rectangle.__pool.get();
                if (is(secondObject, display.Rectangle)) {
                    secondRect.__copyFrom(secondObject);
                    secondRect.x = (secondRect.x - fx) | 0;
                    secondRect.y = (secondRect.y - fy) | 0;
                    secondRect.__intersectInPlace(this._rect);
                    if (secondRect.isEmpty()) {
                        display.Rectangle.__pool.release(secondRect);
                        return false;
                    }
                    for (var y = secondRect.y, h = y + secondRect.height; y < h; y++) {
                        for (var x = secondRect.x, w = x + secondRect.width; x < w; x++) {
                            if (firstAlphaThreshold <= this._pixels[((this._width * y) + x) * 4 + 3]) {
                                display.Rectangle.__pool.release(secondRect);
                                return true;
                            }
                        }
                    }
                }
                else {
                    if (is(secondObject, display.Bitmap)) {
                        secondObject = secondObject.bitmapData;
                    }
                    secondRect.__copyFrom(secondObject._rect);
                    secondRect.__intersectInPlace(this._rect);
                    if (secondRect.isEmpty()) {
                        display.Rectangle.__pool.release(secondRect);
                        return false;
                    }
                    var secondPixels = secondObject.__getPixels();
                    var sx = (secondBitmapDataPoint.x - fx) | 0;
                    var sy = (secondBitmapDataPoint.y - fy) | 0;
                    var sw = secondRect.width;
                    var sh = secondRect.height;
                    for (var y = sy, h = y + sh; y < h; y++) {
                        for (var x = sx, w = x + sw; x < w; x++) {
                            var alpha = this._pixels[((this._width * y) + x) * 4 + 3];
                            var secondAlpha = secondPixels[((sw * (y - sy)) + (x - sx)) * 4 + 3];
                            if (firstAlphaThreshold <= alpha && secondAlphaThreshold <= secondAlpha) {
                                display.Rectangle.__pool.release(secondRect);
                                return true;
                            }
                        }
                    }
                }
                display.Rectangle.__pool.release(secondRect);
                return false;
            };
            BitmapData.prototype.merge = function (sourceBitmapData, sourceRect, destPoint, redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier) {
                sourceBitmapData = strict(sourceBitmapData, BitmapData);
                sourceRect = strict(sourceRect, display.Rectangle);
                destPoint = strict(destPoint, display.Point);
                redMultiplier = ((redMultiplier) >>> 0);
                greenMultiplier = ((greenMultiplier) >>> 0);
                blueMultiplier = ((blueMultiplier) >>> 0);
                alphaMultiplier = ((alphaMultiplier) >>> 0);
                if (!sourceBitmapData) {
                    throw new TypeError('Parameter sourceBitmapData must be non-null.', 2007);
                }
                if (!sourceRect) {
                    throw new TypeError('Parameter sourceRect must be non-null.', 2007);
                }
                if (!destPoint) {
                    throw new TypeError('Parameter destPoint must be non-null.', 2007);
                }
                var rx = sourceRect.x | 0;
                var ry = sourceRect.y | 0;
                var deltaX = (destPoint.x - rx) | 0;
                var deltaY = (destPoint.y - ry) | 0;
                var minX = Math.max(rx, 0, -deltaX);
                var minY = Math.max(ry, 0, -deltaY);
                var maxX = Math.min(sourceRect.width + rx, sourceBitmapData._width - 1, this._width - deltaX - 1);
                var maxY = Math.min(sourceRect.height + ry, sourceBitmapData._height - 1, this._height - deltaY - 1);
                if (maxX <= minX || maxY <= minY) {
                    return;
                }
                this.__getPixels();
                var pixels = this._pixels;
                var sourcePixels = sourceBitmapData.__getPixels();
                var maxMultiplier = 0x100;
                var buffer;
                if (sourceBitmapData === this) {
                    buffer = this.clone();
                }
                internalMerge.__bind(this)();
                if (sourceBitmapData === this) {
                    pixels = buffer.__getPixels();
                    minX = Math.max(deltaX + minX, minX);
                    minY = Math.max(deltaY + minY, minY);
                    maxX = Math.min(deltaX + maxX, maxX);
                    maxY = Math.min(deltaY + maxY, maxY);
                    internalMerge.__bind(this)();
                    buffer.dispose();
                }
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
                function internalMerge() {
                    for (var x = minX; x < maxX; x++) {
                        var cx = x + deltaX;
                        for (var y = minY; y < maxY; y++) {
                            var cy = y + deltaY;
                            var cPixel = (cy * this._width + cx) * 4;
                            var cAlpha = pixels[cPixel + 3];
                            var cNpm = cAlpha / 255;
                            var cRed = (pixels[cPixel] / cNpm) & 0xff;
                            var cGreen = (pixels[cPixel + 1] / cNpm) & 0xff;
                            var cBlue = (pixels[cPixel + 2] / cNpm) & 0xff;
                            var sPixel = (y * sourceBitmapData._width + x) * 4;
                            var sAlpha = sourcePixels[sPixel + 3];
                            var sNpm = sAlpha / 255;
                            var sRed = (sourcePixels[sPixel] / sNpm) & 0xff;
                            var sGreen = (sourcePixels[sPixel + 1] / sNpm) & 0xff;
                            var sBlue = (sourcePixels[sPixel + 2] / sNpm) & 0xff;
                            var fAlpha = ((sAlpha * alphaMultiplier) + (cAlpha * (maxMultiplier - alphaMultiplier))) / maxMultiplier;
                            var fNpm = fAlpha / 255;
                            var fRed = ((sRed * redMultiplier) + (cRed * (maxMultiplier - redMultiplier))) / maxMultiplier;
                            var fGreen = ((sGreen * greenMultiplier) + (cGreen * (maxMultiplier - greenMultiplier))) / maxMultiplier;
                            var fBlue = ((sBlue * blueMultiplier) + (cBlue * (maxMultiplier - blueMultiplier))) / maxMultiplier;
                            this._pixels[cPixel] = ((fRed & 0xff) * fNpm) & 0xff;
                            this._pixels[cPixel + 1] = ((fGreen & 0xff) * fNpm) & 0xff;
                            this._pixels[cPixel + 2] = ((fBlue & 0xff) * fNpm) & 0xff;
                            this._pixels[cPixel + 3] = fAlpha;
                        }
                    }
                }
            };
            BitmapData.prototype.noise = function (randomSeed, low, high, channelOptions, grayScale) {
                if (low === void 0) { low = 0; }
                if (high === void 0) { high = 255; }
                if (channelOptions === void 0) { channelOptions = 7; }
                if (grayScale === void 0) { grayScale = false; }
                randomSeed = ((randomSeed) >> 0);
                low = ((low) >>> 0);
                high = ((high) >>> 0);
                channelOptions = ((channelOptions) >>> 0);
                grayScale = Boolean(grayScale);
                BitmapData.sHelperNoiseFilter.randomSeed = randomSeed;
                BitmapData.sHelperNoiseFilter.low = low;
                BitmapData.sHelperNoiseFilter.high = high;
                BitmapData.sHelperNoiseFilter.channelOptions = channelOptions;
                BitmapData.sHelperNoiseFilter.grayScale = grayScale;
                BitmapData.sHelperNoiseFilter.transparent = this._transparent;
                var p = display.Point.__pool.get();
                this.applyFilter(this, this.rect, p, BitmapData.sHelperNoiseFilter);
                display.Point.__pool.release(p);
            };
            BitmapData.prototype.paletteMap = function (sourceBitmapData, sourceRect, destPoint, redArray, greenArray, blueArray, alphaArray) {
                if (redArray === void 0) { redArray = null; }
                if (greenArray === void 0) { greenArray = null; }
                if (blueArray === void 0) { blueArray = null; }
                if (alphaArray === void 0) { alphaArray = null; }
                sourceBitmapData = strict(sourceBitmapData, BitmapData);
                sourceRect = strict(sourceRect, display.Rectangle);
                destPoint = strict(destPoint, display.Point);
                redArray = strict(redArray, Array);
                greenArray = strict(greenArray, Array);
                blueArray = strict(blueArray, Array);
                alphaArray = strict(alphaArray, Array);
                if (!sourceBitmapData) {
                    throw new TypeError('Parameter sourceBitmapData must be non-null.', 2007);
                }
                if (!sourceRect) {
                    throw new TypeError('Parameter sourceRect must be non-null.', 2007);
                }
                if (!destPoint) {
                    throw new TypeError('Parameter destPoint must be non-null.', 2007);
                }
                var rx = sourceRect.x | 0;
                var ry = sourceRect.y | 0;
                var deltaX = (destPoint.x - rx) | 0;
                var deltaY = (destPoint.y - ry) | 0;
                var minX = Math.max(rx, 0, -deltaX);
                var minY = Math.max(ry, 0, -deltaY);
                var maxX = Math.min(sourceRect.width + rx, sourceBitmapData._width - 1, this._width - deltaX - 1);
                var maxY = Math.min(sourceRect.height + ry, sourceBitmapData._height - 1, this._height - deltaY - 1);
                if (maxX <= minX || maxY <= minY) {
                    return;
                }
                this.__getPixels();
                var sourcePixels = sourceBitmapData.__getPixels();
                internalPaletteMap.__bind(this)();
                if (sourceBitmapData === this) {
                    minX = Math.max(deltaX + minX, minX);
                    minY = Math.max(deltaY + minY, minY);
                    maxX = Math.min(deltaX + maxX, maxX);
                    maxY = Math.min(deltaY + maxY, maxY);
                    internalPaletteMap.__bind(this)();
                }
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
                function internalPaletteMap() {
                    for (var x = minX; x < maxX; x++) {
                        var cx = x + deltaX;
                        for (var y = minY; y < maxY; y++) {
                            var cy = y + deltaY;
                            var sPixel = (y * sourceBitmapData._width + x) * 4;
                            var sAlpha = sourcePixels[sPixel + 3];
                            var sNpm = sAlpha / 255;
                            var sRed = (sourcePixels[sPixel] / sNpm) & 0xff;
                            var sGreen = (sourcePixels[sPixel + 1] / sNpm) & 0xff;
                            var sBlue = (sourcePixels[sPixel + 2] / sNpm) & 0xff;
                            var chRed = redArray ? redArray[sRed] : sRed << 16;
                            var chGreen = greenArray ? greenArray[sGreen] : sGreen << 8;
                            var chBlue = blueArray ? blueArray[sBlue] : sBlue << 0;
                            var chAlpha = alphaArray ? alphaArray[sAlpha] : (sAlpha << 24) >>> 0;
                            var fAlpha = ((chRed >> 24 & 0xff) + (chGreen >> 24 & 0xff) + (chBlue >> 24 & 0xff) + (chAlpha >> 24 & 0xff)) % 256;
                            var fNpm = fAlpha / 255;
                            var fRed = ((chRed >> 16 & 0xff) + (chGreen >> 16 & 0xff) + (chBlue >> 16 & 0xff) + (chAlpha >> 16 & 0xff)) % 256;
                            var fGreen = ((chRed >> 8 & 0xff) + (chGreen >> 8 & 0xff) + (chBlue >> 8 & 0xff) + (chAlpha >> 8 & 0xff)) % 256;
                            var fBlue = ((chRed & 0xff) + (chGreen & 0xff) + (chBlue & 0xff) + (chAlpha & 0xff)) % 256;
                            var cPixel = (cy * this._width + cx) * 4;
                            this._pixels[cPixel] = ((fRed & 0xff) * fNpm) & 0xff;
                            this._pixels[cPixel + 1] = ((fGreen & 0xff) * fNpm) & 0xff;
                            this._pixels[cPixel + 2] = ((fBlue & 0xff) * fNpm) & 0xff;
                            this._pixels[cPixel + 3] = fAlpha;
                        }
                    }
                }
            };
            BitmapData.prototype.perlinNoise = function (baseX, baseY, numOctaves, randomSeed, stitch, fractalNoise, channelOptions, grayScale, offsets) {
                if (channelOptions === void 0) { channelOptions = 7; }
                if (grayScale === void 0) { grayScale = false; }
                if (offsets === void 0) { offsets = null; }
                baseX = (+(baseX));
                baseY = (+(baseY));
                numOctaves = ((numOctaves) >>> 0);
                randomSeed = ((randomSeed) >> 0);
                stitch = Boolean(stitch);
                fractalNoise = Boolean(fractalNoise);
                channelOptions = ((channelOptions) >>> 0);
                grayScale = Boolean(grayScale);
                offsets = strict(offsets, Array);
                this.__getPixels();
                for (var y = 0; y < this._height; ++y) {
                    for (var x = 0; x < this._width; ++x) {
                        var p = (y * this._width + x) * 4;
                        this._pixels[p] = 0x0;
                        this._pixels[p + 1] = 0x0;
                        this._pixels[p + 2] = 0x0;
                        this._pixels[p + 3] = 0xff;
                    }
                }
                var bw = this._width;
                var bh = this._height;
                var chs = [];
                if (channelOptions & display.BitmapDataChannel.RED)
                    chs.push([0, randomSeed]);
                if (channelOptions & display.BitmapDataChannel.GREEN)
                    chs.push([1, randomSeed + (grayScale ? 0 : 5)]);
                if (channelOptions & display.BitmapDataChannel.BLUE)
                    chs.push([2, randomSeed + (grayScale ? 0 : 10)]);
                var chlen = chs.length;
                var octaves = numOctaves;
                var totalAmplitude = 0;
                var amplitude = 1;
                var baseXB = baseX;
                var baseYB = baseY;
                var persistance = 0.6;
                while (true) {
                    totalAmplitude += amplitude;
                    baseX = ((baseX) >> 0);
                    baseY = ((baseY) >> 0);
                    if (octaves <= 0 || baseX <= 1 || baseY <= 1) {
                        break;
                    }
                    amplitude *= persistance;
                    octaves--;
                    baseX /= 2;
                    baseY /= 2;
                }
                baseX = (+(baseXB));
                baseY = (+(baseYB));
                amplitude = 1;
                octaves = numOctaves;
                while (true) {
                    baseX = ((baseX) >> 0);
                    baseY = ((baseY) >> 0);
                    if (octaves <= 0 || baseX <= 1 || baseY <= 1) {
                        break;
                    }
                    var offsetX = 0;
                    var offsetY = 0;
                    if (offsets) {
                        var offset = offsets[numOctaves - octaves];
                        if (offset) {
                            offsetX = ((offset.x / 16) >> 0);
                            offsetY = ((offset.y / 16) >> 0);
                        }
                    }
                    var nx = Math.ceil(bw / baseX);
                    var ny = Math.ceil(bh / baseY);
                    for (var y = 0; y <= ny; y++) {
                        for (var x = 0; x <= nx; x++) {
                            if (x != 0 && y != 0) {
                                for (var i = 0; i < chlen; i++) {
                                    var chci = chs[i][0];
                                    var chpi = chs[i][1];
                                    var r00 = BitmapData.sHelperPerlinNoise[((x - 1 + chpi + offsetX) % 16) + ((y - 1 + chpi + offsetY) % 16) * 16];
                                    var r10 = BitmapData.sHelperPerlinNoise[((x + chpi + offsetX) % 16) + ((y - 1 + chpi + offsetY) % 16) * 16];
                                    var r01 = BitmapData.sHelperPerlinNoise[((x - 1 + chpi + offsetX) % 16) + ((y + chpi + offsetY) % 16) * 16];
                                    var r11 = BitmapData.sHelperPerlinNoise[((x + chpi + offsetX) % 16) + ((y + chpi + offsetY) % 16) * 16];
                                    var w = x * baseX;
                                    if (w > bw) {
                                        w = bw;
                                    }
                                    var h = y * baseY;
                                    if (h > bh) {
                                        h = bh;
                                    }
                                    var sx = (((x - 1) * baseX) >> 0);
                                    var sy = (((y - 1) * baseY) >> 0);
                                    for (var bx = sx; bx < w; bx++) {
                                        var tx = (bx - sx) / baseX;
                                        tx = tx * tx * (3 - 2 * tx);
                                        for (var by = sy; by < h; by++) {
                                            var ty = (by - sy) / baseY;
                                            ty = ty * ty * (3 - 2 * ty);
                                            var cx0 = r10 * tx + r00 * (1 - tx);
                                            var cx1 = r11 * tx + r01 * (1 - tx);
                                            var c = cx1 * ty + cx0 * (1 - ty);
                                            this._pixels[(bx + by * bw) * 4 + chci] += c * amplitude / totalAmplitude;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    octaves--;
                    baseX /= 2;
                    baseY /= 2;
                    amplitude *= persistance;
                }
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
            };
            BitmapData.prototype.pixelDissolve = function (sourceBitmapData, sourceRect, destPoint, randomSeed, numPixels, fillColor) {
                if (randomSeed === void 0) { randomSeed = 0; }
                if (numPixels === void 0) { numPixels = 0; }
                if (fillColor === void 0) { fillColor = 0; }
                sourceBitmapData = strict(sourceBitmapData, BitmapData);
                sourceRect = strict(sourceRect, display.Rectangle);
                destPoint = strict(destPoint, display.Point);
                randomSeed = ((randomSeed) >> 0);
                numPixels = ((numPixels) >> 0);
                fillColor = ((fillColor) >>> 0);
                if (!sourceBitmapData) {
                    throw new TypeError('Parameter sourceBitmapData must be non-null.', 2007);
                }
                if (!sourceRect) {
                    throw new TypeError('Parameter sourceRect must be non-null.', 2007);
                }
                if (!destPoint) {
                    throw new TypeError('Parameter destPoint must be non-null.', 2007);
                }
                if (numPixels < 0) {
                    throw new TypeError('Parameter numPixels must be a non-negative number.', 2027);
                }
                var sw = sourceRect.width | 0;
                var sh = sourceRect.height | 0;
                var rx = sourceRect.x | 0;
                var ry = sourceRect.y | 0;
                var isSame = (sourceBitmapData === this);
                var deltaX = isSame ? 0 : (destPoint.x - rx) | 0;
                var deltaY = isSame ? 0 : (destPoint.y - ry) | 0;
                var minX = Math.max(rx, 0, -deltaX);
                var minY = Math.max(ry, 0, -deltaY);
                var maxX = Math.min(sw + rx, sourceBitmapData._width, this._width - deltaX);
                var maxY = Math.min(sh + ry, sourceBitmapData._height, this._height - deltaY);
                if (maxX <= minX || maxY <= minY) {
                    return;
                }
                this.__getPixels();
                var sourcePixels = sourceBitmapData.__getPixels();
                var pixelsCount = sw * sh;
                numPixels = numPixels || (pixelsCount / 30) | 0;
                var red, green, blue, alpha;
                if (isSame) {
                    alpha = sourceBitmapData._transparent ? (fillColor >> 24 & 0xff) : 0xff;
                    var pm = alpha / 255;
                    red = ((fillColor >> 16 & 0xff) * pm) & 0xff;
                    green = ((fillColor >> 8 & 0xff) * pm) & 0xff;
                    blue = ((fillColor & 0xff) * pm) & 0xff;
                }
                display.Random.seed(randomSeed);
                while (0 < numPixels) {
                    var randomX = display.Random.range(minX, maxX);
                    var randomY = display.Random.range(minY, maxY);
                    var p = randomY * sourceBitmapData._width + randomX;
                    var cx = randomX + deltaX;
                    var cy = randomY + deltaY;
                    numPixels--;
                    var cPixel = (cy * this._width + cx) * 4;
                    if (isSame) {
                        this._pixels[cPixel] = red;
                        this._pixels[cPixel + 1] = green;
                        this._pixels[cPixel + 2] = blue;
                        this._pixels[cPixel + 3] = alpha;
                    }
                    else {
                        var sPixel = p * 4;
                        this._pixels[cPixel] = sourcePixels[sPixel];
                        this._pixels[cPixel + 1] = sourcePixels[sPixel + 1];
                        this._pixels[cPixel + 2] = sourcePixels[sPixel + 2];
                        this._pixels[cPixel + 3] = sourcePixels[sPixel + 3];
                    }
                }
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
                return display.Random.short();
            };
            BitmapData.prototype.scroll = function (x, y) {
                x = ((x) >> 0);
                y = ((y) >> 0);
                var ax = Math.abs(x), ay = Math.abs(y);
                if ((x == 0 && y == 0) || ax > this._width || ay > this._height) {
                    return;
                }
                this._ctx.saveAndReset();
                try {
                    var backBuffer = display.SystemBitmapData.__popBuffer(this._width, this._height, this._transparent, true);
                    this._ctx.setRenderToBitmapData(backBuffer);
                    var m = display.Matrix.__pool.get();
                    m.__translate(x, y);
                    var width = this._width - ax;
                    var height = this._height - ay;
                    if (x < 0)
                        x = 0;
                    if (y < 0)
                        y = 0;
                    this._ctx.drawImage(this);
                    this._ctx.setRenderToBitmapData(this).clearRect(x, y, width, height).clipRect(x, y, width, height);
                    this._ctx.setTransformFromMatrix(m);
                    this._ctx.drawImage(backBuffer);
                    this._element = null;
                    this._dirtyTexture = false;
                    this._dirtyPixels = this._dirtyDisplayObject = true;
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    trace(e.getStackTrace());
                }
                finally {
                    display.Matrix.__pool.release(m);
                    if (backBuffer) {
                        backBuffer.dispose();
                    }
                    this._ctx.restore();
                }
            };
            BitmapData.prototype.setPixels = function (rect, inputByteArray) {
                rect = strict(rect, display.Rectangle);
                inputByteArray = strict(inputByteArray, display.ByteArray);
                if (rect.width <= 0 || rect.height <= 0) {
                    return;
                }
                var sx = rect.x | 0, sy = rect.y | 0;
                var smw = (rect.width | 0) + sx, smh = (rect.height | 0) + sy;
                this.__getPixels();
                for (var y = sy; y < smh; ++y) {
                    for (var x = sx; x < smw; ++x) {
                        var color = inputByteArray.readUnsignedInt();
                        var p = (y * this._width + x) * 4;
                        var a = color >>> 24;
                        var pm = a / 255;
                        this._pixels[p] = (((color >> 16) & 0xff) * pm) & 0xff;
                        this._pixels[p + 1] = (((color >> 8) & 0xff) * pm) & 0xff;
                        this._pixels[p + 2] = ((color & 0xff) * pm) & 0xff;
                        this._pixels[p + 3] = a;
                    }
                }
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
            };
            BitmapData.prototype.setVector = function (rect, value) {
                rect = strict(rect, display.Rectangle);
                if (rect.width <= 0 || rect.height <= 0)
                    return;
                var sx = rect.x | 0, sy = rect.y | 0;
                var smw = (rect.width | 0) + sx, smh = (rect.height | 0) + sy;
                this.__getPixels();
                for (var y = sy; y < smh; ++y) {
                    for (var x = sx; x < smw; ++x) {
                        var color = ((value[x + y * this._width]) >>> 0);
                        var p = (y * this._width + x) * 4;
                        var a = color >>> 24;
                        var pm = a / 255;
                        this._pixels[p] = (((color >> 16) & 0xff) * pm) & 0xff;
                        this._pixels[p + 1] = (((color >> 8) & 0xff) * pm) & 0xff;
                        this._pixels[p + 2] = ((color & 0xff) * pm) & 0xff;
                        this._pixels[p + 3] = a;
                    }
                }
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
            };
            BitmapData.prototype.threshold = function (sourceBitmapData, sourceRect, destPoint, operation, threshold, color, mask, copySource) {
                if (color === void 0) { color = 0; }
                if (mask === void 0) { mask = 0xFFFFFFFF; }
                if (copySource === void 0) { copySource = false; }
                sourceBitmapData = strict(sourceBitmapData, BitmapData);
                sourceRect = strict(sourceRect, display.Rectangle);
                destPoint = strict(destPoint, display.Point);
                operation = as(operation, 'String');
                threshold = ((threshold) >>> 0);
                color = ((color) >>> 0);
                mask = ((mask) >>> 0);
                copySource = Boolean(copySource);
                if (!sourceBitmapData) {
                    throw new TypeError('Parameter sourceBitmapData must be non-null.', 2007);
                }
                if (!sourceRect) {
                    throw new TypeError('Parameter sourceRect must be non-null.', 2007);
                }
                if (!destPoint) {
                    throw new TypeError('Parameter destPoint must be non-null.', 2007);
                }
                var operationNum;
                switch (operation) {
                    case '!=':
                        operationNum = 0;
                        break;
                    case '==':
                        operationNum = 1;
                        break;
                    case '<':
                        operationNum = 2;
                        break;
                    case '<=':
                        operationNum = 3;
                        break;
                    case '>':
                        operationNum = 4;
                        break;
                    case '>=':
                        operationNum = 5;
                        break;
                    default:
                        throw new ArgumentError('Parameter 0 is of the incorrect type. Should be type Operation', 2005);
                }
                var rx = sourceRect.x | 0;
                var ry = sourceRect.y | 0;
                var deltaX = (destPoint.x - rx) | 0;
                var deltaY = (destPoint.y - ry) | 0;
                var minX = Math.max(rx, 0, -deltaX);
                var minY = Math.max(ry, 0, -deltaY);
                var maxX = Math.min(sourceRect.width + rx, sourceBitmapData._width - 1, this._width - deltaX - 1);
                var maxY = Math.min(sourceRect.height + ry, sourceBitmapData._height - 1, this._height - deltaY - 1);
                if (maxX <= minX || maxY <= minY) {
                    return 0;
                }
                this.__getPixels();
                var sourcePixels = sourceBitmapData.__getPixels();
                var alpha = (color >> 24) & 0xff;
                var pm = alpha / 255;
                var red = (((color >> 16) & 0xff) * pm) & 0xff;
                var green = (((color >> 8) & 0xff) * pm) & 0xff;
                var blue = ((color & 0xff) * pm) & 0xff;
                var thresholdWithMask = threshold & mask;
                var hits = 0;
                internalThreshold.__bind(this)();
                if (sourceBitmapData === this) {
                    minX = Math.max(deltaX + minX, minX);
                    minY = Math.max(deltaY + minY, minY);
                    maxX = Math.min(deltaX + maxX, maxX);
                    maxY = Math.min(deltaY + maxY, maxY);
                    internalThreshold.__bind(this)();
                }
                function internalThreshold() {
                    hits = 0;
                    for (var x = minX; x < maxX; x++) {
                        var cx = x + deltaX;
                        for (var y = minY; y < maxY; y++) {
                            var cy = y + deltaY;
                            var sPixel = (y * sourceBitmapData._width + x) * 4;
                            var sAlpha = sourcePixels[sPixel + 3];
                            var sNpm = sAlpha / 255;
                            var sRed = (sourcePixels[sPixel] / sNpm) & 0xff;
                            var sGreen = (sourcePixels[sPixel + 1] / sNpm) & 0xff;
                            var sBlue = (sourcePixels[sPixel + 2] / sNpm) & 0xff;
                            var pixelValue = (sourcePixels[sPixel + 3] << 24 |
                                sourcePixels[sPixel] << 16 |
                                sourcePixels[sPixel + 1] << 8 |
                                sourcePixels[sPixel + 2]) & mask;
                            if ((operationNum == 0 && pixelValue !== thresholdWithMask) ||
                                (operationNum == 1 && pixelValue === thresholdWithMask) ||
                                (operationNum == 2 && pixelValue < thresholdWithMask) ||
                                (operationNum == 3 && pixelValue <= thresholdWithMask) ||
                                (operationNum == 4 && pixelValue > thresholdWithMask) ||
                                (operationNum == 5 && pixelValue >= thresholdWithMask)) {
                                var cPixel = (cy * this._width + cx) * 4;
                                this._pixels[cPixel] = red;
                                this._pixels[cPixel + 1] = green;
                                this._pixels[cPixel + 2] = blue;
                                this._pixels[cPixel + 3] = alpha;
                                hits++;
                            }
                            else if (copySource) {
                                var cPixel = (cy * this._width + cx) * 4;
                                this._pixels[cPixel] = sourcePixels[sPixel];
                                this._pixels[cPixel + 1] = sourcePixels[sPixel + 1];
                                this._pixels[cPixel + 2] = sourcePixels[sPixel + 2];
                                this._pixels[cPixel + 3] = sourcePixels[sPixel + 3];
                            }
                        }
                    }
                }
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = (hits > 0);
                return hits;
            };
            BitmapData.prototype.lock = function () {
            };
            BitmapData.prototype.unlock = function (changeRect) {
                if (changeRect === void 0) { changeRect = null; }
                changeRect = strict(changeRect, display.Rectangle);
            };
            BitmapData.prototype.histogram = function (rect) {
                if (rect === void 0) { rect = null; }
                rect = strict(rect, display.Rectangle);
                rect = rect || this._rect;
                this.__getPixels();
                var histogramData = [[], [], [], []];
                for (var i = 0; i < 4; i++) {
                    histogramData[i].length = 256;
                    histogramData[i].fill(0);
                }
                var x = rect.x | 0, y = rect.y | 0;
                var width = rect.width | 0, height = rect.height | 0;
                for (var sx = x; sx < x + width; sx++) {
                    for (var sy = y; sy < y + height; sy++) {
                        var p = (sy * this._width + sx) * 4;
                        var a = this._pixels[p + 3];
                        var npm = a / 255;
                        histogramData[0][(this._pixels[p] / npm) & 0xff]++;
                        histogramData[1][(this._pixels[p + 1] / npm) & 0xff]++;
                        histogramData[2][(this._pixels[p + 2] / npm) & 0xff]++;
                        histogramData[3][a]++;
                    }
                }
                return histogramData;
            };
            BitmapData.prototype.__getPixel__pure = function (x, y) {
                var p = (y * this._width + x) * 4;
                return (this._pixels[p] << 16) | (this._pixels[p + 1] << 8) | this._pixels[p + 2];
            };
            BitmapData.prototype.__setPixel__pure = function (x, y, color) {
                var p = (y * this._width + x) * 4;
                this._pixels[p] = (color >> 16) & 0xff;
                this._pixels[p + 1] = (color >> 8) & 0xff;
                this._pixels[p + 2] = color & 0xff;
            };
            BitmapData.prototype.__getPixel32__pure = function (x, y) {
                var p = (y * this._width + x) * 4;
                var a = this._pixels[p + 3];
                var npm = a / 255.0;
                return (a << 24) | (((this._pixels[p] / npm) & 0xff) << 16) | (((this._pixels[p + 1] / npm) & 0xff) << 8) | ((this._pixels[p + 2] / npm) & 0xff);
            };
            BitmapData.prototype.__setPixel32__pure = function (x, y, color) {
                var p = (y * this._width + x) * 4;
                var a = (color >> 24) & 0xff;
                var pm = a / 255;
                this._pixels[p] = (((color >> 16) & 0xff) * pm) & 0xff;
                this._pixels[p + 1] = (((color >> 8) & 0xff) * pm) & 0xff;
                this._pixels[p + 2] = ((color & 0xff) * pm) & 0xff;
                this._pixels[p + 3] = a;
            };
            BitmapData.prototype.__beginModifyPixels = function () {
                return this.__getPixels();
            };
            BitmapData.prototype.__endModifyPixels = function () {
                this._element = null;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
            };
            BitmapData.prototype.__fromElement = function (element, matrix) {
                if (matrix === void 0) { matrix = null; }
                var ctx2d = BitmapData.__popSystemCtx(this._p2width, this._p2height, true);
                var canvas = ctx2d.canvas;
                ctx2d.save();
                if (matrix) {
                    ctx2d.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                }
                else {
                    ctx2d.setTransform(1, 0, 0, 1, 0, 0);
                }
                display.CanvasRenderer.renderImage(ctx2d, element, true);
                this._texture.uploadFromElement(canvas);
                ctx2d.restore();
                BitmapData.__pushSystemCtx(ctx2d);
                this._element = element;
                this._version++;
                this._dirtyPixels = this._dirtyDisplayObject = true;
                this._dirtyTexture = false;
                return this;
            };
            BitmapData.prototype.__fromGraphics = function (graphics, matrix) {
                if (matrix === void 0) { matrix = null; }
                var ctx2d = BitmapData.__popSystemCtx(this._p2width, this._p2height, true);
                var canvas = ctx2d.canvas;
                ctx2d.save();
                if (matrix && !matrix.__isIdentical()) {
                    ctx2d.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                }
                else {
                    matrix = null;
                    ctx2d.setTransform(1, 0, 0, 1, 0, 0);
                }
                display.CanvasRenderer.renderGraphics(ctx2d, graphics, matrix);
                this._texture.uploadFromElement(canvas);
                ctx2d.restore();
                BitmapData.__pushSystemCtx(ctx2d);
                this._version++;
                this._element = null;
                this._dirtyPixels = this._dirtyDisplayObject = true;
                this._dirtyTexture = false;
                return this;
            };
            BitmapData.prototype.__fromText = function (text, textFormat, matrix) {
                if (matrix === void 0) { matrix = null; }
                var ctx2d = BitmapData.__popSystemCtx(this._p2width, this._p2height, true);
                var canvas = ctx2d.canvas;
                ctx2d.save();
                if (matrix) {
                    ctx2d.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                }
                else {
                    ctx2d.setTransform(1, 0, 0, 1, 0, 0);
                }
                var font = textFormat.__getCss();
                var color = textFormat.__getCssColor();
                display.CanvasRenderer.renderText(ctx2d, text, font, color, 'left', 'alphabetic', 0, textFormat.size);
                this._texture.uploadFromElement(canvas);
                ctx2d.restore();
                BitmapData.__pushSystemCtx(ctx2d);
                this._version++;
                this._element = null;
                this._dirtyPixels = this._dirtyDisplayObject = true;
                this._dirtyTexture = false;
                return this;
            };
            BitmapData.prototype.__fromPixels = function (source, sourceWidth, sourceHeight, lowerLeft) {
                if (lowerLeft === void 0) { lowerLeft = false; }
                if (!source || !sourceWidth || !sourceHeight) {
                    return;
                }
                this._pixels = this._pixels || new Uint8Array(this._width * this._height * 4);
                BitmapData.__setPixels(this._pixels, this._width, this._height, source, sourceWidth, sourceHeight, lowerLeft);
                this._element = null;
                this._dirtyPixels = false;
                this._modifiedPixels = this._dirtyTexture = this._dirtyDisplayObject = true;
                return this;
            };
            BitmapData.prototype.__slice = function (sourceRect, inflate, systemBuffer, preClean, copyContent) {
                if (inflate === void 0) { inflate = null; }
                if (systemBuffer === void 0) { systemBuffer = false; }
                if (preClean === void 0) { preClean = true; }
                if (copyContent === void 0) { copyContent = true; }
                this._ctx.saveAndReset();
                var sliced;
                var x = -sourceRect.x;
                var y = -sourceRect.y;
                var width = Math.ceil(sourceRect.width);
                var height = Math.ceil(sourceRect.height);
                if (inflate) {
                    x += inflate.x;
                    y += inflate.y;
                    width += inflate.x * 2;
                    height += inflate.y * 2;
                }
                try {
                    if (systemBuffer) {
                        sliced = display.SystemBitmapData.__popBuffer(width, height, this._transparent, preClean);
                    }
                    else {
                        sliced = new BitmapData(width, height, this._transparent, 0x0, preClean);
                    }
                    if (copyContent) {
                        var m = display.Matrix.__pool.get();
                        m.__translate(x, y);
                        this._ctx.setRenderToBitmapData(sliced).clipRect(x, y, width, height).setTransformFromMatrix(m);
                        this._ctx.drawImage(this);
                    }
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    trace(e.getStackTrace());
                }
                finally {
                    this._ctx.restore();
                    display.Matrix.__pool.release(m);
                }
                return sliced;
            };
            BitmapData.prototype.__getPixels = function () {
                if (!this._dirtyPixels) {
                    if (this._pixels) {
                        return this._pixels;
                    }
                    else {
                        return this._pixels = new Uint8Array(this._width * this._height * 4);
                    }
                }
                if (this._modifiedPixels) {
                    throw new Error('Conflict: texture and pixels async modified.');
                }
                this._ctx.saveAndReset();
                try {
                    var backBuffer = display.SystemBitmapData.__popBuffer(this._width, this._height, this._transparent, true);
                    this._ctx.setRenderToBitmapData(backBuffer);
                    this._ctx.drawImage(this);
                    this._ctx.copyScreenToBitmapData(this);
                    this._dirtyTexture = true;
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    trace(e.getStackTrace());
                }
                finally {
                    if (backBuffer) {
                        backBuffer.dispose();
                    }
                    this._ctx.restore();
                }
                this._dirtyPixels = false;
                return this._pixels;
            };
            BitmapData.prototype.__getP2Pixels = function () {
                this.__getPixels();
                this._p2pixels = this._p2pixels || new Uint8Array(this._p2width * this._p2height * 4);
                return BitmapData.__setPixels(this._p2pixels, this._p2width, this._p2height, this._pixels, this._width, this._height);
            };
            BitmapData.prototype.__getTexture = function () {
                if (!this._ctx) {
                    return null;
                }
                if (this._texture && !this._dirtyTexture) {
                    return this._texture;
                }
                if (this._modifiedPixels) {
                    this._pixels = this._pixels || new Uint8Array(this._width * this._height * 4);
                    this._p2pixels = this._p2pixels || new Uint8Array(this._p2width * this._p2height * 4);
                    BitmapData.__setPixels(this._p2pixels, this._p2width, this._p2height, this._pixels, this._width, this._height);
                    this._texture.uploadFromTypedArray(this._p2pixels);
                    this._modifiedPixels = false;
                }
                this._version++;
                this._dirtyTexture = false;
                return this._texture;
            };
            BitmapData.prototype.__createPattern = function (ctx2d, repeat) {
                try {
                    var buff = BitmapData.__popSystemCtx(this._p2width, this._p2height, true);
                    var canvas = buff.canvas;
                    if (repeat) {
                        canvas.width = this._width;
                        canvas.height = this._height;
                    }
                    var pattern = ctx2d.createPattern(this.__toCanvas(buff), repeat ? 'repeat' : 'no-repeat');
                    if (repeat) {
                        canvas.width = this._p2width;
                        canvas.height = this._p2height;
                    }
                    BitmapData.__pushSystemCtx(buff);
                    return pattern;
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    trace(e.getStackTrace());
                }
                return null;
            };
            BitmapData.prototype.__toCanvas = function (ctx2d) {
                var canvas = ctx2d.canvas;
                if (this._element) {
                    display.CanvasRenderer.renderImage(ctx2d, this._element, true);
                }
                else {
                    this.__getPixels();
                    var imageData = ctx2d.createImageData(this._width, this._height);
                    var data = imageData.data;
                    for (var i = 0, len = this._pixels.byteLength; i < len; i += 4) {
                        var a = this._pixels[i + 3];
                        var npm = a / 255;
                        data[i] = this._pixels[i] / npm;
                        data[i + 1] = this._pixels[i + 1] / npm;
                        data[i + 2] = this._pixels[i + 2] / npm;
                        data[i + 3] = a;
                    }
                    ctx2d.putImageData(imageData, 0, 0);
                }
                return canvas;
            };
            BitmapData.prototype.__drawWithQuality = function (source, matrix, colorTransform, blendMode, clipRect, smoothing, quality) {
                if (matrix === void 0) { matrix = null; }
                if (colorTransform === void 0) { colorTransform = null; }
                if (blendMode === void 0) { blendMode = null; }
                if (clipRect === void 0) { clipRect = null; }
                if (smoothing === void 0) { smoothing = false; }
                if (quality === void 0) { quality = null; }
                this._ctx.saveAndReset().setRenderToBitmapData(this);
                if (clipRect) {
                    var r = display.Rectangle.__pool.get();
                    r.width = this._systemWidth || this._width;
                    r.height = this._systemHeight || this._height;
                    r.__intersectInPlace(clipRect);
                    this._ctx.clipRect(r.x, r.y, r.width, r.height);
                    display.Rectangle.__pool.release(r);
                }
                else {
                    this._ctx.clipRect(0, 0, this._systemWidth || this._width, this._systemHeight || this._height);
                }
                try {
                    if (colorTransform) {
                        this._ctx.colorTransform(colorTransform);
                    }
                    if (blendMode) {
                        this._ctx.blendMode(blendMode);
                    }
                    if (is(source, BitmapData)) {
                        if (display.DisplayObject.sDebugCache) {
                            this._ctx.fillRect(0, 0, this._systemWidth || this._width, this._systemHeight || this._height, 0x430000ff);
                        }
                        if (matrix) {
                            this._ctx.setTransformFromMatrix(matrix);
                        }
                        else {
                            this._ctx.setTransform(1, 0, 0, 1, 0, 0);
                        }
                        this._ctx.drawImage(source, smoothing);
                    }
                    else if (is(source, display.DisplayObject)) {
                        if (display.DisplayObject.sDebugCache) {
                            this._ctx.fillRect(0, 0, this._systemWidth || this._width, this._systemHeight || this._height, 0x4300ff00);
                        }
                        var sourceDO = as(source, display.DisplayObject);
                        var sourceMatrix = sourceDO.transform._matrix;
                        var sourceRenderParent = sourceDO._renderParent;
                        var m = display.Matrix.__pool.get();
                        m.__copyFrom(sourceMatrix);
                        if (matrix) {
                            sourceMatrix.__copyFrom(matrix);
                        }
                        else {
                            sourceMatrix.identity();
                        }
                        var ctx = this._ctx;
                        sourceDO.__setRenderParent(BitmapData.sHelperRootDisplayObject);
                        sourceDO.__predraw(ctx, false);
                        sourceDO.__updateContextTransformation(ctx);
                        sourceDO.__draw(ctx);
                        sourceDO.__setRenderParent(sourceRenderParent);
                        sourceMatrix.__copyFrom(m);
                    }
                    this._version++;
                    this._element = null;
                    this._dirtyPixels = this._dirtyDisplayObject = true;
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    trace(e.getStackTrace());
                }
                finally {
                    this._ctx.restore();
                    display.Matrix.__pool.release(m);
                }
            };
            BitmapData.prototype.__startListeningDispose = function (listener) {
                this._listenerDispose = listener;
            };
            BitmapData.prototype.__stopListeningDispose = function () {
                this._listenerDispose = null;
            };
            BitmapData.prototype.__addStats = function () {
                if (!BitmapData.sHelperStats) {
                    return;
                }
                var size = (this._width * this._height * 4) / 1024 / 1024;
                BitmapData.sHelperStats.count++;
                BitmapData.sHelperStats.mb.total += size;
                BitmapData.sHelperStats.mb.app += size;
            };
            BitmapData.prototype.__removeStats = function () {
                if (!BitmapData.sHelperStats) {
                    return;
                }
                var size = (this._width * this._height * 4) / 1024 / 1024;
                BitmapData.sHelperStats.count--;
                BitmapData.sHelperStats.mb.total -= size;
                BitmapData.sHelperStats.mb.app -= size;
            };
            BitmapData.__getElementFromImageAndRawAlpha = function (image, rawAlpha) {
                var width = ((image.width || 1) >> 0);
                var height = ((image.height || 1) >> 0);
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                var ctx2d = canvas.getContext('2d');
                display.CanvasRenderer.renderImage(ctx2d, image, true);
                var imageData = ctx2d.getImageData(0, 0, width, height);
                var data = imageData.data;
                var len = rawAlpha.length;
                var byteIndex = 0;
                var byte0, byte1, byte2, byte3;
                var groupLength = (len / 4) | 0;
                for (var i = 0; i < len; ++i) {
                    var a = -1;
                    if (groupLength > 0 || byteIndex > 0) {
                        if (byteIndex == 0) {
                            var group = rawAlpha.readUnsignedInt();
                            byte0 = group >> 24 & 0xff;
                            byte1 = group >> 16 & 0xff;
                            byte2 = group >> 8 & 0xff;
                            byte3 = group & 0xff;
                            groupLength--;
                            a = byte0;
                            byteIndex++;
                        }
                        else if (byteIndex == 1) {
                            a = byte1;
                            byteIndex++;
                        }
                        else if (byteIndex == 2) {
                            a = byte2;
                            byteIndex++;
                        }
                        else if (byteIndex == 3) {
                            a = byte3;
                            byteIndex = 0;
                        }
                    }
                    if (a == -1) {
                        a = rawAlpha.readUnsignedByte();
                    }
                    var p = i * 4;
                    var npm = a / 255.0;
                    data[p] /= npm;
                    data[p + 1] /= npm;
                    data[p + 2] /= npm;
                    data[p + 3] = a;
                }
                ctx2d.putImageData(imageData, 0, 0);
                return canvas;
            };
            BitmapData.__setPixels = function (destination, destinationWidth, destinationHeight, source, sourceWidth, sourceHeight, lowerLeft) {
                if (lowerLeft === void 0) { lowerLeft = false; }
                var destPosition = 0;
                var sourcePosition = 0;
                var destRowLength = (destinationWidth * 4) | 0;
                var sourceRowLength = (sourceWidth * 4) | 0;
                var minRowLength = Math.min(destRowLength, sourceRowLength);
                var minHeight = Math.min(destinationHeight, sourceHeight);
                var shiftSourceRowLength = sourceRowLength;
                if (lowerLeft) {
                    sourcePosition = sourceRowLength * (sourceHeight - 1);
                    shiftSourceRowLength *= -1;
                }
                destination.fill(0x0);
                if (destinationWidth == sourceWidth && destinationHeight <= sourceHeight && !lowerLeft) {
                    destination.set(source.subarray(0, destRowLength * destinationHeight));
                }
                else {
                    for (var i = 0; i < minHeight; ++i) {
                        destination.set(source.subarray(sourcePosition, sourcePosition + minRowLength), destPosition);
                        destPosition += destRowLength;
                        sourcePosition += shiftSourceRowLength;
                    }
                }
                return destination;
            };
            BitmapData.__clone = function (from, to) {
                if (from._element) {
                    to.__fromElement(from._element);
                }
                else if (!from._dirtyTexture) {
                    to.__drawWithQuality(from);
                }
                else if (!from._dirtyPixels) {
                    to.__fromPixels(from.__getPixels(), from._width, from._height, false);
                }
                else {
                    throw new Error('What the fuck is going on?!');
                }
                return to;
            };
            BitmapData.__popSystemCtx = function (width, height, clear) {
                if (clear === void 0) { clear = true; }
                width = display.getNextPowerOfTwo(width);
                height = display.getNextPowerOfTwo(height);
                var size = width << 16 | height;
                var list = BitmapData.sHelperCanvasPowerOf2Pool[size] || (BitmapData.sHelperCanvasPowerOf2Pool[size] = []);
                var buff;
                if (!list.length) {
                    buff = document.createElement('canvas').getContext('2d');
                    buff.canvas.width = width;
                    buff.canvas.height = height;
                }
                else {
                    buff = list.pop();
                    if (clear) {
                        buff.clearRect(0, 0, width, height);
                    }
                    var canvas = buff.canvas;
                    if (canvas.width != width) {
                        buff.canvas.width = width;
                    }
                    if (canvas.height != height) {
                        buff.canvas.height = height;
                    }
                }
                return buff;
            };
            BitmapData.__pushSystemCtx = function (buff) {
                if (!buff || !buff.canvas) {
                    return;
                }
                var width = buff.canvas.width;
                var height = buff.canvas.height;
                var size = width << 16 | height;
                var list = BitmapData.sHelperCanvasPowerOf2Pool[size];
                if (list.indexOf(buff) >= 0) {
                    return;
                }
                list.push(buff);
            };
            BitmapData.sBitmapDataUID = 0;
            BitmapData.sHelperCanvasPowerOf2Pool = {};
            BitmapData.sHelperNoiseFilter = asc.sti(BitmapData, function () { BitmapData.sHelperNoiseFilter = new display.NoiseFilter; });
            BitmapData.sHelperColorMatrixFilter = asc.sti(BitmapData, function () { BitmapData.sHelperColorMatrixFilter = new display.ColorMatrixFilter; });
            BitmapData.sHelperColorTransform = asc.sti(BitmapData, function () { BitmapData.sHelperColorTransform = new display.ColorTransform; });
            BitmapData.sHelperRootDisplayObject = asc.sti(BitmapData, function () { BitmapData.sHelperRootDisplayObject = new display.DisplayObject; });
            BitmapData.sHelperStats = { count: 0, mb: { total: 0, app: 0 } };
            BitmapData.sHelperPerlinNoise = [
                151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69,
                142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252,
                219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171,
                168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
                60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161,
                1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159,
                86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118,
                126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170,
                213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39,
                253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251,
                34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239,
                107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4,
                150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61,
                156, 180, 151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36,
                103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197,
                62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125,
                136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229,
                122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63,
                161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188,
                159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147,
                118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223,
                183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
                129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97,
                228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249,
                14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50,
                45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128,
                195, 78, 66, 215, 61, 156, 180
            ];
            return BitmapData;
        }());
        display.BitmapData = BitmapData;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BitmapData.js.map