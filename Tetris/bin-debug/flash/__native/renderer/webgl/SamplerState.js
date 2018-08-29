var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var webgl;
            (function (webgl) {
                var SamplerState = (function () {
                    function SamplerState(minFilter, magFilter, wrapModeS, wrapModeT, lodBias, maxAniso, ignoreSampler, centroid, mipmapGenerated) {
                        if (lodBias === void 0) { lodBias = 0.0; }
                        if (maxAniso === void 0) { maxAniso = 0.0; }
                        if (ignoreSampler === void 0) { ignoreSampler = false; }
                        if (centroid === void 0) { centroid = false; }
                        if (mipmapGenerated === void 0) { mipmapGenerated = false; }
                        this.centroid = false;
                        this.ignoreSampler = false;
                        this.mipmapGenerated = false;
                        this.__lodBias = NaN;
                        this.__magFilter = 0;
                        this.__maxAniso = NaN;
                        this.__minFilter = 0;
                        this.__wrapModeS = 0;
                        this.__wrapModeT = 0;
                        this.__samplerDirty = false;
                        minFilter = ((minFilter) >> 0);
                        magFilter = ((magFilter) >> 0);
                        wrapModeS = ((wrapModeS) >> 0);
                        wrapModeT = ((wrapModeT) >> 0);
                        lodBias = (+(lodBias));
                        maxAniso = (+(maxAniso));
                        ignoreSampler = Boolean(ignoreSampler);
                        centroid = Boolean(centroid);
                        mipmapGenerated = Boolean(mipmapGenerated);
                        this.minFilter = minFilter;
                        this.magFilter = magFilter;
                        this.wrapModeS = wrapModeS;
                        this.wrapModeT = wrapModeT;
                        this.lodBias = lodBias;
                        this.maxAniso = maxAniso;
                        this.ignoreSampler = ignoreSampler;
                        this.centroid = centroid;
                        this.mipmapGenerated = mipmapGenerated;
                        this.__samplerDirty = true;
                    }
                    SamplerState.prototype.copyFrom = function (other) {
                        if (other == null || other.ignoreSampler) {
                            return;
                        }
                        this.minFilter = other.__minFilter;
                        this.magFilter = other.__magFilter;
                        this.wrapModeS = other.__wrapModeS;
                        this.wrapModeT = other.__wrapModeT;
                        this.lodBias = other.__lodBias;
                        this.maxAniso = other.__maxAniso;
                        this.centroid = other.centroid;
                        this.mipmapGenerated = other.mipmapGenerated;
                    };
                    SamplerState.prototype.equals = function (other) {
                        if (this == other) {
                            return !this.__samplerDirty;
                        }
                        if (other == null) {
                            return false;
                        }
                        return (this.__minFilter == other.__minFilter && this.__magFilter == other.__magFilter && this.__wrapModeS == other.__wrapModeS && this.__wrapModeT == other.__wrapModeT && this.__lodBias == other.__lodBias && this.__maxAniso == other.__maxAniso && this.mipmapGenerated == other.mipmapGenerated);
                    };
                    Object.defineProperty(SamplerState.prototype, "lodBias", {
                        get: function () { return this.__lodBias; },
                        set: function (value) {
                            value = (+(value));
                            if (this.__lodBias != value)
                                this.__samplerDirty = true;
                            this.__lodBias = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(SamplerState.prototype, "magFilter", {
                        get: function () { return this.__magFilter; },
                        set: function (value) {
                            value = ((value) >> 0);
                            if (this.__magFilter != value)
                                this.__samplerDirty = true;
                            this.__magFilter = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(SamplerState.prototype, "maxAniso", {
                        get: function () { return this.__maxAniso; },
                        set: function (value) {
                            value = (+(value));
                            if (this.__maxAniso != value)
                                this.__samplerDirty = true;
                            this.__maxAniso = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(SamplerState.prototype, "minFilter", {
                        get: function () { return this.__minFilter; },
                        set: function (value) {
                            value = ((value) >> 0);
                            if (this.__minFilter != value)
                                this.__samplerDirty = true;
                            this.__minFilter = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(SamplerState.prototype, "wrapModeS", {
                        get: function () { return this.__wrapModeS; },
                        set: function (value) {
                            value = ((value) >> 0);
                            if (this.__wrapModeS != value)
                                this.__samplerDirty = true;
                            this.__wrapModeS = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(SamplerState.prototype, "wrapModeT", {
                        get: function () { return this.__wrapModeT; },
                        set: function (value) {
                            value = ((value) >> 0);
                            if (this.__wrapModeT != value)
                                this.__samplerDirty = true;
                            this.__wrapModeT = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return SamplerState;
                }());
                webgl.SamplerState = SamplerState;
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SamplerState.js.map