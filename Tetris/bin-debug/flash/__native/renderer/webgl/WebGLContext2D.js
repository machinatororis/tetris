var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var webgl;
            (function (webgl) {
                webgl.SystemBitmapData = flash.__native.display.SystemBitmapData;
                webgl.GLBlendModeShaders = flash.__native.renderer.webgl.shader.GLBlendModeShaders;
                webgl.BitmapData = flash.display.BitmapData;
                webgl.BlendMode = flash.display.BlendMode;
                webgl.DisplayObject = flash.display.DisplayObject;
                webgl.Graphics = flash.display.Graphics;
                webgl.Context3D = flash.display3D.Context3D;
                webgl.Context3DBlendEquation = flash.display3D.Context3DBlendEquation;
                webgl.Context3DBlendFactor = flash.display3D.Context3DBlendFactor;
                webgl.Context3DMipFilter = flash.display3D.Context3DMipFilter;
                webgl.Context3DProgramType = flash.display3D.Context3DProgramType;
                webgl.Context3DTextureFilter = flash.display3D.Context3DTextureFilter;
                webgl.Context3DTriangleFace = flash.display3D.Context3DTriangleFace;
                webgl.Context3DVertexBufferFormat = flash.display3D.Context3DVertexBufferFormat;
                webgl.Context3DWrapMode = flash.display3D.Context3DWrapMode;
                webgl.Program3D = flash.display3D.Program3D;
                webgl.TextureBase = flash.display3D.textures.TextureBase;
                webgl.ColorTransform = flash.geom.ColorTransform;
                webgl.Matrix = flash.geom.Matrix;
                webgl.Matrix3D = flash.geom.Matrix3D;
                webgl.Rectangle = flash.geom.Rectangle;
                webgl.TextFormat = flash.text.TextFormat;
                webgl.Dictionary = flash.utils.Dictionary;
                var WebGLContext2D = (function () {
                    function WebGLContext2D(canvas) {
                        this.context = null;
                        this.mCanvas = null;
                        this.mMatrix = null;
                        this.mMatrix3d = null;
                        this.mUvMatrix3d = null;
                        this.mMatrixHelp = null;
                        this.mColorTransform = null;
                        this.mDataColorMultiplier = undefined;
                        this.mDataColorOffset = undefined;
                        this.mBlendMode = null;
                        this.mClipRect = null;
                        this.mStates = null;
                        this.mStatesPos = 0;
                        this.mBatch = null;
                        this.mBatchEnabled = false;
                        this.mDirty = false;
                        this.mBitmapDrawable = null;
                        this.mLastBlendMode = null;
                        this.mLastProgram = null;
                        this.mVertexProgramInited = null;
                        canvas = strict(canvas, HTMLCanvasElement);
                        this.mCanvas = canvas;
                        this.mMatrix = new webgl.Matrix;
                        this.mClipRect = new webgl.Rectangle;
                        this.mColorTransform = new webgl.ColorTransform;
                        this.mStates = [];
                        this.mStatesPos = -1;
                        this.mMatrix3d = new webgl.Matrix3D;
                        this.mUvMatrix3d = new webgl.Matrix3D;
                        this.mMatrixHelp = new webgl.Matrix;
                        this.mBlendMode = webgl.BlendMode.NORMAL;
                        this.mVertexProgramInited = new webgl.Dictionary;
                        this.context = new webgl.Context3D(this.mCanvas, {
                            alpha: true,
                            premultipliedAlpha: true,
                            optimizeUniforms: true
                        });
                        this.context.setCulling(webgl.Context3DTriangleFace.NONE);
                        this.context.__configureBackBuffer(this.mCanvas.width, this.mCanvas.height, 0, false, false);
                        var posData = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
                        var indexData = new Uint16Array([0, 2, 1, 2, 1, 3]);
                        this.mBitmapDrawable = new webgl.GLDrawable(posData, posData, indexData, this.context.__gl.STATIC_DRAW);
                        this.mDataColorMultiplier = [1.0, 1.0, 1.0, 1.0];
                        this.mDataColorOffset = [0.0, 0.0, 0.0, 0.0];
                    }
                    WebGLContext2D.prototype.dirty = function () {
                        return this.mDirty;
                    };
                    WebGLContext2D.prototype.clear = function () {
                        this.context.__clear(0, 0, 0, 0);
                        if (!this.context.__getRenderToTexture()) {
                            this.mDirty = true;
                        }
                        return this;
                    };
                    WebGLContext2D.prototype.save = function () {
                        var state = this.mStates[++this.mStatesPos] = this.mStates[this.mStatesPos] || new webgl.GLCanvasState;
                        state.matrix.__copyFrom(this.mMatrix);
                        state.color.__copyFrom(this.mColorTransform);
                        state.blendMode = this.mBlendMode;
                        state.rect.__copyFrom(this.mClipRect);
                        state.renderToTexture = this.context.__getRenderToTexture();
                        return this;
                    };
                    WebGLContext2D.prototype.saveTransform = function () {
                        var state = this.mStates[++this.mStatesPos] = this.mStates[this.mStatesPos] || new webgl.GLCanvasState;
                        state.matrix.__copyFrom(this.mMatrix);
                        return this;
                    };
                    WebGLContext2D.prototype.resetTransform = function () {
                        this.mMatrix.identity();
                        return this;
                    };
                    WebGLContext2D.prototype.restore = function () {
                        var state = this.mStates[this.mStatesPos--];
                        this.mMatrix.__copyFrom(state.matrix);
                        this.mColorTransform.__copyFrom(state.color);
                        this.mBlendMode = as(state.blendMode, 'String');
                        this.mClipRect.__copyFrom(state.rect);
                        if (this.context.__getRenderToTexture() != state.renderToTexture) {
                            this.setRenderToTexture(state.renderToTexture);
                        }
                        else {
                            this.__setScissorRectangle(this.mClipRect);
                        }
                        return this;
                    };
                    WebGLContext2D.prototype.restoreTransform = function () {
                        var state = this.mStates[this.mStatesPos--];
                        this.mMatrix.__copyFrom(state.matrix);
                        return this;
                    };
                    WebGLContext2D.prototype.saveAndReset = function () {
                        this.save();
                        this.mMatrix.identity();
                        this.mColorTransform.identity();
                        this.mBlendMode = 'normal';
                        this.mClipRect.setEmpty();
                        this.setRenderToTexture(null);
                        return this;
                    };
                    Object.defineProperty(WebGLContext2D.prototype, "currentTransform", {
                        get: function () {
                            return this.mMatrix;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    WebGLContext2D.prototype.translate = function (x, y) {
                        this.mMatrix.__translate(x, y);
                        return this;
                    };
                    WebGLContext2D.prototype.rotate = function (angle) {
                        this.mMatrix.rotate(angle);
                        return this;
                    };
                    WebGLContext2D.prototype.scale = function (x, y) {
                        this.mMatrix.scale(x, y);
                        return this;
                    };
                    WebGLContext2D.prototype.setTransform = function (a, b, c, d, tx, ty) {
                        this.mMatrix.__setTo(a, b, c, d, tx, ty);
                        return this;
                    };
                    WebGLContext2D.prototype.setTransformFromMatrix = function (value) {
                        this.mMatrix.__copyFrom(value);
                        return this;
                    };
                    WebGLContext2D.prototype.transform = function (value) {
                        this.mMatrix.__concat(value);
                        return this;
                    };
                    WebGLContext2D.prototype.clearRect = function (x, y, w, h) {
                        this.save();
                        this.clipRect(x, y, w, h);
                        this.context.__clear(0, 0, 0, 0);
                        this.restore();
                        return this;
                    };
                    WebGLContext2D.prototype.fillRect = function (x, y, w, h, color) {
                        this.save();
                        var a = (color >>> 24 & 0xff) / 255;
                        var r = (color >> 16 & 0xff) / 255;
                        var g = (color >> 8 & 0xff) / 255;
                        var b = (color & 0xff) / 255;
                        this.clipRect(x, y, w, h);
                        this.context.__clear(r * a, g * a, b * a, a);
                        this.restore();
                        return this;
                    };
                    WebGLContext2D.prototype.colorTransform = function (value) {
                        this.mColorTransform.__concat(value);
                        return this;
                    };
                    WebGLContext2D.prototype.blendMode = function (value) {
                        this.mBlendMode = value || 'normal';
                        return this;
                    };
                    WebGLContext2D.prototype.clipRect = function (x, y, width, height) {
                        this.mClipRect.__setTo(x, y, width, height);
                        if (this.mClipRect.isEmpty()) {
                            this.__setScissorRectangle(null);
                            return this;
                        }
                        this.__setScissorRectangle(this.mClipRect, true);
                        return this;
                    };
                    WebGLContext2D.prototype.clipRectWithTransformMatrix = function (x, y, width, height) {
                        this.mClipRect.__setTo(x, y, width, height);
                        this.mMatrix.__transformRectangleInPlace(this.mClipRect);
                        if (this.mClipRect.isEmpty()) {
                            this.__setScissorRectangle(null);
                            return this;
                        }
                        for (var i = this.mStatesPos; i > 0; --i) {
                            var state = this.mStates[i];
                            var rect = state.rect;
                            if (rect.isEmpty()) {
                                continue;
                            }
                            this.mClipRect.__intersectInPlace(rect);
                        }
                        this.__setScissorRectangle(this.mClipRect, true);
                        return this;
                    };
                    WebGLContext2D.prototype.setRenderToBitmapData = function (destination) {
                        if (!destination) {
                            return this.setRenderToTexture(null);
                        }
                        var texture = destination.__getTexture();
                        texture._parent = destination;
                        return this.setRenderToTexture(texture);
                    };
                    WebGLContext2D.prototype.setRenderToTexture = function (destination) {
                        if (!destination) {
                            this.context.setRenderToBackBuffer();
                        }
                        else {
                            this.context.__setRenderToTexture(destination);
                        }
                        this.__setScissorRectangle(this.mClipRect);
                        return this;
                    };
                    WebGLContext2D.prototype.copyScreenToBitmapData = function (destination) {
                        this.context.drawToBitmapData(destination);
                    };
                    WebGLContext2D.prototype.enter = function () {
                    };
                    WebGLContext2D.prototype.present = function () {
                        this.mDirty = false;
                        this.context.present();
                    };
                    WebGLContext2D.prototype.drawImage = function (data, smoothing, externalProgram) {
                        if (smoothing === void 0) { smoothing = false; }
                        if (externalProgram === void 0) { externalProgram = false; }
                        this.__drawImage(data, null, smoothing, externalProgram);
                    };
                    WebGLContext2D.prototype.drawGraphics = function (target, graphics) {
                        var worldTransform = target.__getWorldTransform();
                        var cache = graphics.__getCache(worldTransform);
                        if (!cache) {
                            return;
                        }
                        cache.draw(this, worldTransform);
                    };
                    WebGLContext2D.prototype.drawText = function (target, text, textFormat, x, y, width, height) {
                        width = Math.ceil(width);
                        height = Math.ceil(height);
                        if (width <= 0 || height <= 0) {
                            return;
                        }
                        var worldTransform = target.__getWorldTransform();
                        var hash = text + textFormat.__getHash();
                        var lines = WebGLContext2D.sHelperTextLine[hash] = WebGLContext2D.sHelperTextLine[hash] || [];
                        var minRatio, validIndex = -1;
                        for (var i = 0, len = lines.length; i < len; ++i) {
                            var c = lines[i];
                            if (c.isCacheValid(worldTransform)) {
                                var r = c.getCacheRatio(worldTransform);
                                if (r < minRatio || isNaN(minRatio)) {
                                    minRatio = r;
                                    validIndex = i;
                                }
                            }
                        }
                        var cache;
                        if (validIndex >= 0) {
                            cache = lines[validIndex];
                        }
                        else {
                            var m = webgl.Matrix.__pool.get();
                            m.__copyFrom(worldTransform, false);
                            var b = webgl.Rectangle.__pool.get();
                            b.__setTo(0, 0, width, height);
                            m.__transformRectangleInPlace(b);
                            b.__inflateCeil(1, 1);
                            m.__translate(-b.x, -b.y);
                            cache = new webgl.GLCacheDisplayObject(new webgl.SystemBitmapData(webgl.SystemBitmapData.TEXT, b.width, b.height, true, 0x0).__fromText(text, textFormat, m), worldTransform);
                            var cacheTransform = cache.cacheTransform;
                            cacheTransform.__translate(b.x, b.y);
                            lines[lines.length] = cache;
                            webgl.Rectangle.__pool.release(b);
                            webgl.Matrix.__pool.release(m);
                        }
                        WebGLContext2D.sHelperMatrix.__copyFrom(worldTransform);
                        WebGLContext2D.sHelperMatrix.__translateTransformed(x, y);
                        WebGLContext2D.sHelperMatrix.tx = WebGLContext2D.sHelperMatrix.tx | 0;
                        WebGLContext2D.sHelperMatrix.ty = WebGLContext2D.sHelperMatrix.ty | 0;
                        cache.draw(this, WebGLContext2D.sHelperMatrix);
                    };
                    WebGLContext2D.prototype.__drawAtlasImage = function (entry, smoothing) {
                        if (smoothing === void 0) { smoothing = false; }
                        var rect = entry.node.rect;
                        var image = entry.image;
                        WebGLContext2D.sHelperRect.__setTo(rect.x, rect.y, image._width, image._height);
                        this.__drawImage(entry.atlas.getAtlas(), WebGLContext2D.sHelperRect, smoothing);
                    };
                    WebGLContext2D.prototype.__drawImage = function (data, rect, smoothing, externalProgram) {
                        if (smoothing === void 0) { smoothing = false; }
                        if (externalProgram === void 0) { externalProgram = false; }
                        var texture = data.__getTexture(), sampler = 0, drawable = this.mBitmapDrawable, colorTransform = this.mColorTransform, posmatr = this.mMatrix, uvmatr = null, scaleWithImage = true, scaleWithImageUV = true;
                        if (!texture) {
                            return;
                        }
                        var tw = texture.__width;
                        var th = texture.__height;
                        var iw = data._width;
                        var ih = data._height;
                        var fullRect = !rect || data._rect.__equals(rect);
                        if (fullRect) {
                            iw = tw;
                            ih = th;
                        }
                        else {
                            uvmatr = WebGLContext2D.sHelperMatrix2;
                            uvmatr.identity();
                            uvmatr.__translate(rect.x, rect.y);
                            iw = rect.width;
                            ih = rect.height;
                        }
                        var sw, sh;
                        var renderToTexture = this.context.__getRenderToTexture();
                        if (renderToTexture) {
                            sw = renderToTexture.__width;
                            sh = renderToTexture.__height;
                        }
                        else {
                            sw = this.context.__backBufferWidth;
                            sh = this.context.__backBufferHeight;
                        }
                        var useMultipleTexture = !!(!externalProgram && renderToTexture && webgl.GLBlendModeShaders.hasProgram(this.mBlendMode));
                        var withColorMultiplier = this.mColorTransform.isMultiplier;
                        var withColorOffset = this.mColorTransform.isOffset;
                        var destinationBuff;
                        if (useMultipleTexture) {
                            var parent = renderToTexture._parent;
                            if (!parent) {
                                try {
                                    throw new Error('Internal: renderToTexture._parent == void 0');
                                }
                                catch (e) {
                                    e = window.asc.e2e(e);
                                    trace(e.getStackTrace());
                                }
                            }
                            destinationBuff = webgl.SystemBitmapData.__popBuffer(iw, ih, data._transparent, true);
                            destinationBuff.__drawWithQuality(parent);
                        }
                        this.__setBlendMode(!useMultipleTexture ? this.mBlendMode : null);
                        var prog;
                        if (!externalProgram) {
                            prog = webgl.GLBlendModeShaders.getProgram(this.context, this.mBlendMode, withColorMultiplier, withColorOffset);
                            this.__setProgram(prog);
                        }
                        this.context.__setSamplerStateAt(sampler + (useMultipleTexture ? 1 : 0), webgl.Context3DWrapMode.CLAMP, smoothing ? webgl.Context3DTextureFilter.LINEAR : webgl.Context3DTextureFilter.NEAREST, webgl.Context3DMipFilter.MIPNONE);
                        if (useMultipleTexture) {
                            this.context.__setTextureAt(sampler, destinationBuff.__getTexture());
                            this.context.__setTextureAt(sampler + 1, texture);
                        }
                        else {
                            this.context.__setTextureAt(sampler, texture);
                        }
                        if (prog && !this.mVertexProgramInited.get(prog)) {
                            this.context.__setVertexBufferAt(0, drawable.pos.getBuff(this.context), 0, webgl.Context3DVertexBufferFormat.FLOAT_2);
                            this.context.__setVertexBufferAt(1, drawable.uv.getBuff(this.context), 0, webgl.Context3DVertexBufferFormat.FLOAT_2);
                            this.mVertexProgramInited.set(prog, 1);
                        }
                        this.mMatrix3d.rawData[0] = posmatr.a * 2 / sw;
                        this.mMatrix3d.rawData[1] = -posmatr.b * 2 / sh;
                        this.mMatrix3d.rawData[4] = posmatr.c * 2 / sw;
                        this.mMatrix3d.rawData[5] = -posmatr.d * 2 / sh;
                        this.mMatrix3d.rawData[12] = posmatr.tx * 2 / sw - 1;
                        this.mMatrix3d.rawData[13] = 1 - posmatr.ty * 2 / sh;
                        if (scaleWithImage) {
                            this.mMatrix3d.rawData[0] *= iw;
                            this.mMatrix3d.rawData[1] *= iw;
                            this.mMatrix3d.rawData[4] *= ih;
                            this.mMatrix3d.rawData[5] *= ih;
                        }
                        this.context.__setProgramConstantsFromMatrix(webgl.Context3DProgramType.VERTEX, 0, this.mMatrix3d);
                        if (uvmatr) {
                            this.mMatrixHelp.__copyFrom(uvmatr);
                            this.mMatrixHelp.invert();
                            this.mUvMatrix3d.rawData[0] = this.mMatrixHelp.a / tw;
                            this.mUvMatrix3d.rawData[1] = -this.mMatrixHelp.b / tw;
                            this.mUvMatrix3d.rawData[4] = -this.mMatrixHelp.c / th;
                            this.mUvMatrix3d.rawData[5] = this.mMatrixHelp.d / th;
                            this.mUvMatrix3d.rawData[12] = -this.mMatrixHelp.tx / tw;
                            this.mUvMatrix3d.rawData[13] = -this.mMatrixHelp.ty / th;
                            if (scaleWithImageUV) {
                                this.mUvMatrix3d.rawData[0] *= iw;
                                this.mUvMatrix3d.rawData[1] *= iw;
                                this.mUvMatrix3d.rawData[4] *= ih;
                                this.mUvMatrix3d.rawData[5] *= ih;
                            }
                        }
                        this.context.__setProgramConstantsFromMatrix(webgl.Context3DProgramType.VERTEX, 4, this.mUvMatrix3d);
                        if (withColorMultiplier) {
                            this.mDataColorMultiplier[0] = colorTransform.redMultiplier;
                            this.mDataColorMultiplier[1] = colorTransform.greenMultiplier;
                            this.mDataColorMultiplier[2] = colorTransform.blueMultiplier;
                            this.mDataColorMultiplier[3] = colorTransform.alphaMultiplier;
                            this.context.__setProgramConstantsFromVector(webgl.Context3DProgramType.FRAGMENT, 0, this.mDataColorMultiplier, 1);
                        }
                        if (withColorOffset) {
                            this.mDataColorOffset[0] = colorTransform.redOffset / 255;
                            this.mDataColorOffset[1] = colorTransform.greenOffset / 255;
                            this.mDataColorOffset[2] = colorTransform.blueOffset / 255;
                            this.mDataColorOffset[3] = colorTransform.alphaOffset / 255;
                            this.context.__setProgramConstantsFromVector(webgl.Context3DProgramType.FRAGMENT, 1, this.mDataColorOffset, 1);
                        }
                        this.context.__drawTriangles(drawable.index.getBuff(this.context), 0, drawable.numTriangles);
                        if (destinationBuff) {
                            destinationBuff.dispose();
                        }
                    };
                    WebGLContext2D.prototype.__setScissorRectangle = function (value, strictMode) {
                        if (strictMode === void 0) { strictMode = false; }
                        if (!value || (value.isEmpty() && !strictMode)) {
                            this.context.__setScissorRectangle(null);
                            return;
                        }
                        var renderToTexture = this.context.__getRenderToTexture();
                        if (renderToTexture) {
                            WebGLContext2D.sHelperRect.__setTo(value.x, renderToTexture.__height - value.y - value.height, value.width, value.height);
                            this.context.__setScissorRectangle(WebGLContext2D.sHelperRect);
                            return;
                        }
                        this.context.__setScissorRectangle(value);
                    };
                    WebGLContext2D.prototype.__setProgram = function (value) {
                        if (this.mLastProgram == value) {
                            return;
                        }
                        this.mLastProgram = value;
                        this.context.__setProgram(value);
                    };
                    WebGLContext2D.prototype.__setBlendMode = function (value) {
                        if (this.mLastBlendMode == value) {
                            return;
                        }
                        if ((this.mLastBlendMode = value) == null) {
                            this.context.__setBlendFactorsSeparate(null, null, null, null, null, null);
                            return;
                        }
                        this.context.__setBlendFactorsSeparate.apply(this.context, WebGLContext2D.sHelperBlendModes[value] || WebGLContext2D.sHelperBlendModes['normal']);
                    };
                    WebGLContext2D.sHelperRect = asc.sti(WebGLContext2D, function () { WebGLContext2D.sHelperRect = new webgl.Rectangle; });
                    WebGLContext2D.sHelperMatrix = asc.sti(WebGLContext2D, function () { WebGLContext2D.sHelperMatrix = new webgl.Matrix; });
                    WebGLContext2D.sHelperMatrix2 = asc.sti(WebGLContext2D, function () { WebGLContext2D.sHelperMatrix2 = new webgl.Matrix; });
                    WebGLContext2D.sHelperTextLine = {};
                    WebGLContext2D.sHelperBlendModes = {};
                    WebGLContext2D.__block0 = function () {
                        function $() {
                            WebGLContext2D.sHelperBlendModes[webgl.BlendMode.NORMAL] = [
                                webgl.Context3DBlendFactor.ONE, webgl.Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA, webgl.Context3DBlendEquation.ADD,
                                null, null, null
                            ];
                            WebGLContext2D.sHelperBlendModes[webgl.BlendMode.SCREEN] = [
                                webgl.Context3DBlendFactor.ONE_MINUS_DESTINATION_COLOR, webgl.Context3DBlendFactor.ONE, webgl.Context3DBlendEquation.ADD,
                                webgl.Context3DBlendFactor.ONE, webgl.Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA, webgl.Context3DBlendEquation.ADD
                            ];
                            WebGLContext2D.sHelperBlendModes[webgl.BlendMode.ADD] = [
                                webgl.Context3DBlendFactor.ONE, webgl.Context3DBlendFactor.ONE, webgl.Context3DBlendEquation.ADD,
                                null, null, null
                            ];
                            WebGLContext2D.sHelperBlendModes[webgl.BlendMode.SUBTRACT] = [
                                webgl.Context3DBlendFactor.ONE, webgl.Context3DBlendFactor.ONE, webgl.Context3DBlendEquation.REVERSE_SUBTRACT,
                                webgl.Context3DBlendFactor.ONE, webgl.Context3DBlendFactor.ONE, webgl.Context3DBlendEquation.ADD
                            ];
                            WebGLContext2D.sHelperBlendModes[webgl.BlendMode.ALPHA] = [
                                webgl.Context3DBlendFactor.ZERO, webgl.Context3DBlendFactor.SOURCE_ALPHA, webgl.Context3DBlendEquation.ADD,
                                null, null, null
                            ];
                            WebGLContext2D.sHelperBlendModes[webgl.BlendMode.ERASE] = [
                                webgl.Context3DBlendFactor.ZERO, webgl.Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA, webgl.Context3DBlendEquation.ADD,
                                null, null, null
                            ];
                            WebGLContext2D.sHelperBlendModes[webgl.BlendMode.INTERSECT_INTERCHANGE] = [
                                webgl.Context3DBlendFactor.ONE_MINUS_DESTINATION_ALPHA, webgl.Context3DBlendFactor.SOURCE_ALPHA, webgl.Context3DBlendEquation.ADD,
                                webgl.Context3DBlendFactor.ZERO, webgl.Context3DBlendFactor.ONE, webgl.Context3DBlendEquation.ADD
                            ];
                        }
                        asc.stb(WebGLContext2D, $);
                    }();
                    return WebGLContext2D;
                }());
                webgl.WebGLContext2D = WebGLContext2D;
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=WebGLContext2D.js.map