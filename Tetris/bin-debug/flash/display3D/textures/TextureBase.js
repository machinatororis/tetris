var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        var textures;
        (function (textures) {
            textures.SamplerState = flash.__native.renderer.webgl.SamplerState;
            textures.Context3D = flash.display3D.Context3D;
            textures.IllegalOperationError = flash.errors.IllegalOperationError;
            textures.EventDispatcher = flash.events.EventDispatcher;
            textures.ByteArray = flash.utils.ByteArray;
            var TextureBase = (function (_super) {
                __extends(TextureBase, _super);
                function TextureBase(context) {
                    var _this = this;
                    context = strict(context, textures.Context3D);
                    _this.__alphaTexture === void 0 && (_this.__alphaTexture = null);
                    _this.__compressedMemoryUsage === void 0 && (_this.__compressedMemoryUsage = 0);
                    _this.__context === void 0 && (_this.__context = null);
                    _this.__gl === void 0 && (_this.__gl = null);
                    _this.__format === void 0 && (_this.__format = 0);
                    _this.__height === void 0 && (_this.__height = 0);
                    _this.__internalFormat === void 0 && (_this.__internalFormat = 0);
                    _this.__memoryUsage === void 0 && (_this.__memoryUsage = 0);
                    _this.__optimizeForRenderToTexture === void 0 && (_this.__optimizeForRenderToTexture = false);
                    _this.__outputTextureMemoryUsage === void 0 && (_this.__outputTextureMemoryUsage = false);
                    _this.__samplerState === void 0 && (_this.__samplerState = null);
                    _this.__streamingLevels === void 0 && (_this.__streamingLevels = 0);
                    _this.__textureID === void 0 && (_this.__textureID = null);
                    _this.__textureTarget === void 0 && (_this.__textureTarget = 0);
                    _this.__width === void 0 && (_this.__width = 0);
                    _this = _super.call(this) || this;
                    _this.__gl = strict((_this.__context = context).__gl, WebGLRenderingContext);
                    _this.__textureID = _this.__gl.createTexture();
                    TextureBase.__textureInternalFormat = ((_this.__gl.RGBA) >> 0);
                    TextureBase.__textureFormat = ((_this.__gl.RGBA) >> 0);
                    if (TextureBase.__supportsCompressed == null) {
                        var compressedExtension = _this.__gl.getExtension("WEBGL_compressed_texture_s3tc");
                        if (compressedExtension != null) {
                            TextureBase.__supportsCompressed = true;
                            TextureBase.__textureFormatCompressed = ((compressedExtension.COMPRESSED_RGBA_S3TC_DXT1_EXT) >> 0);
                            TextureBase.__textureFormatCompressedAlpha = ((compressedExtension.COMPRESSED_RGBA_S3TC_DXT5_EXT) >> 0);
                        }
                        else {
                            TextureBase.__supportsCompressed = false;
                        }
                    }
                    _this.__internalFormat = TextureBase.__textureInternalFormat;
                    _this.__format = TextureBase.__textureFormat;
                    return _this;
                }
                TextureBase.prototype.dispose = function () {
                    if (this.__alphaTexture != null) {
                        this.__alphaTexture.dispose();
                    }
                    this.__gl.deleteTexture(this.__textureID);
                };
                TextureBase.prototype.__getATFVersion = function (data) {
                    data = strict(data, textures.ByteArray);
                    var signature = data.readUTFBytes(3);
                    if (signature != "ATF") {
                        throw new textures.IllegalOperationError("ATF signature not found");
                    }
                    var position = data.position;
                    var version = 0;
                    if (data.bytesAvailable >= 5) {
                        var sig = this.__readUInt32(data);
                        if (sig == 0xff) {
                            version = data.readUnsignedByte();
                        }
                        else {
                            data.position = ((position) >>> 0);
                        }
                    }
                    return version;
                };
                TextureBase.prototype.__getTexture = function () {
                    return this.__textureID;
                };
                TextureBase.prototype.__readUInt24 = function (data) {
                    data = strict(data, textures.ByteArray);
                    var value = 0;
                    value = (((data.readUnsignedByte() << 16)) >>> 0);
                    value |= (data.readUnsignedByte() << 8);
                    value |= data.readUnsignedByte();
                    return value;
                };
                TextureBase.prototype.__readUInt32 = function (data) {
                    data = strict(data, textures.ByteArray);
                    var value = 0;
                    value = (((data.readUnsignedByte() << 24)) >>> 0);
                    value |= (data.readUnsignedByte() << 16);
                    value |= (data.readUnsignedByte() << 8);
                    value |= data.readUnsignedByte();
                    return value;
                };
                TextureBase.prototype.__setSamplerState = function (state) {
                    if (!state.equals(this.__samplerState)) {
                        this.__gl.bindTexture(this.__textureTarget, this.__textureID);
                        this.__gl.texParameteri(this.__textureTarget, this.__gl.TEXTURE_MIN_FILTER, state.__minFilter);
                        this.__gl.texParameteri(this.__textureTarget, this.__gl.TEXTURE_MAG_FILTER, state.__magFilter);
                        this.__gl.texParameteri(this.__textureTarget, this.__gl.TEXTURE_WRAP_S, state.__wrapModeS);
                        this.__gl.texParameteri(this.__textureTarget, this.__gl.TEXTURE_WRAP_T, state.__wrapModeT);
                        if (state.__lodBias != 0.0) {
                        }
                        if (!this.__samplerState) {
                            if (state && !state.ignoreSampler) {
                                this.__samplerState = new textures.SamplerState(state.__minFilter, state.__magFilter, state.__wrapModeS, state.__wrapModeT, state.__lodBias, state.__maxAniso, state.ignoreSampler, state.centroid, state.mipmapGenerated);
                            }
                            else {
                                this.__samplerState = new textures.SamplerState;
                            }
                        }
                        else if (state && !state.ignoreSampler) {
                            this.__samplerState.copyFrom(state);
                        }
                        this.__samplerState.__samplerDirty = false;
                    }
                };
                TextureBase.__textureFormat = 0;
                TextureBase.__textureInternalFormat = 0;
                TextureBase.__supportsCompressed = null;
                TextureBase.__textureFormatCompressed = 0;
                TextureBase.__textureFormatCompressedAlpha = 0;
                return TextureBase;
            }(textures.EventDispatcher));
            textures.TextureBase = TextureBase;
        })(textures = display3D.textures || (display3D.textures = {}));
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextureBase.js.map