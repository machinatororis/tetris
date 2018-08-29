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
            textures.BitmapData = flash.display.BitmapData;
            textures.Context3D = flash.display3D.Context3D;
            textures.IllegalOperationError = flash.errors.IllegalOperationError;
            textures.Event = flash.events.Event;
            textures.ByteArray = flash.utils.ByteArray;
            textures.setTimeout = flash.utils.setTimeout;
            var Texture = (function (_super) {
                __extends(Texture, _super);
                function Texture(context, width, height, format, optimizeForRenderToTexture, streamingLevels) {
                    var _this = this;
                    context = strict(context, textures.Context3D);
                    width = ((width) >> 0);
                    height = ((height) >> 0);
                    format = as(format, 'String');
                    optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture);
                    streamingLevels = ((streamingLevels) >> 0);
                    _this = _super.call(this, context) || this;
                    _this.__textureTarget = ((_this.__gl.TEXTURE_2D) >> 0);
                    _this.__width = width;
                    _this.__height = height;
                    _this.__optimizeForRenderToTexture = optimizeForRenderToTexture;
                    _this.__streamingLevels = streamingLevels;
                    var current = _this.__gl.getParameter(_this.__gl.TEXTURE_BINDING_2D);
                    _this.__gl.bindTexture(_this.__textureTarget, _this.__textureID);
                    _this.__gl.pixelStorei(_this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                    _this.__gl.texImage2D(_this.__textureTarget, 0, _this.__internalFormat, width, height, 0, _this.__format, _this.__gl.UNSIGNED_BYTE, null);
                    _this.__gl.bindTexture(_this.__textureTarget, current);
                    return _this;
                }
                Texture.prototype.uploadFromBitmapData = function (source, miplevel) {
                    if (miplevel === void 0) { miplevel = 0; }
                    source = strict(source, textures.BitmapData);
                    miplevel = ((miplevel) >>> 0);
                    if (source == null)
                        return;
                    var width = this.__width >> miplevel;
                    var height = this.__height >> miplevel;
                    if (width == 0 && height == 0)
                        return;
                    if (width == 0)
                        width = 1;
                    if (height == 0)
                        height = 1;
                    if (source._width != width || source._height != height) {
                        var copy = new textures.BitmapData(width, height, true, 0x0);
                        copy.draw(source);
                        source = strict(copy, textures.BitmapData);
                    }
                    this.uploadFromTypedArray(source.__getP2Pixels(), miplevel);
                    if (copy) {
                        copy.dispose();
                    }
                };
                Texture.prototype.uploadFromByteArray = function (data, byteArrayOffset, miplevel) {
                    if (miplevel === void 0) { miplevel = 0; }
                    data = strict(data, textures.ByteArray);
                    byteArrayOffset = ((byteArrayOffset) >>> 0);
                    miplevel = ((miplevel) >>> 0);
                    if (byteArrayOffset == 0) {
                        this.uploadFromTypedArray(data.buffer, miplevel);
                        return;
                    }
                    this.uploadFromTypedArray(new Uint8Array(data.buffer, byteArrayOffset), miplevel);
                };
                Texture.prototype.uploadCompressedTextureFromByteArray = function (data, byteArrayOffset, async) {
                    if (async === void 0) { async = false; }
                    data = strict(data, textures.ByteArray);
                    byteArrayOffset = ((byteArrayOffset) >>> 0);
                    async = Boolean(async);
                    data.position = byteArrayOffset;
                    var signature = data.readUTFBytes(3);
                    data.position = byteArrayOffset;
                    if (signature == "ATF") {
                        var current = this.__gl.getParameter(this.__gl.TEXTURE_BINDING_2D);
                        this.__gl.bindTexture(this.__textureTarget, this.__textureID);
                        this.__uploadATFTextureFromByteArray(data, byteArrayOffset);
                        this.__gl.bindTexture(this.__textureTarget, current);
                    }
                    else {
                    }
                    if (async) {
                        textures.setTimeout(function () {
                            this.dispatchEvent(new textures.Event(textures.Event.TEXTURE_READY));
                        }.__bind(this), 1);
                    }
                };
                Texture.prototype.uploadFromElement = function (data, miplevel) {
                    if (miplevel === void 0) { miplevel = 0; }
                    miplevel = ((miplevel) >>> 0);
                    var width = this.__width >> miplevel;
                    var height = this.__height >> miplevel;
                    if (width == 0 && height == 0)
                        return;
                    if (width == 0)
                        width = 1;
                    if (height == 0)
                        height = 1;
                    if (data.width != width || data.height != height) {
                        data.width = width;
                        data.height = height;
                    }
                    var current = this.__gl.getParameter(this.__gl.TEXTURE_BINDING_2D);
                    this.__gl.bindTexture(this.__textureTarget, this.__textureID);
                    this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                    this.__gl.texImage2D(this.__textureTarget, 0, this.__internalFormat, this.__format, this.__gl.UNSIGNED_BYTE, data);
                    this.__gl.bindTexture(this.__textureTarget, current);
                };
                Texture.prototype.uploadFromTypedArray = function (data, miplevel) {
                    if (miplevel === void 0) { miplevel = 0; }
                    miplevel = ((miplevel) >>> 0);
                    if (data == null)
                        return;
                    var width = this.__width >> miplevel;
                    var height = this.__height >> miplevel;
                    if (width == 0 && height == 0)
                        return;
                    if (width == 0)
                        width = 1;
                    if (height == 0)
                        height = 1;
                    var current = this.__gl.getParameter(this.__gl.TEXTURE_BINDING_2D);
                    this.__gl.bindTexture(this.__textureTarget, this.__textureID);
                    this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                    this.__gl.texImage2D(this.__textureTarget, miplevel, this.__internalFormat, width, height, 0, this.__format, this.__gl.UNSIGNED_BYTE, data);
                    this.__gl.bindTexture(this.__textureTarget, current);
                };
                Texture.prototype.__setSamplerState = function (state) {
                    if (!state.equals(this.__samplerState)) {
                        if (state.__minFilter != this.__gl.NEAREST && state.__minFilter != this.__gl.LINEAR && !state.mipmapGenerated) {
                            this.__gl.generateMipmap(this.__textureTarget);
                            state.mipmapGenerated = true;
                        }
                        if (state.__maxAniso != 0.0) {
                            this.__gl.texParameterf(this.__textureTarget, textures.Context3D.TEXTURE_MAX_ANISOTROPY_EXT, state.__maxAniso);
                        }
                    }
                    _super.prototype.__setSamplerState.call(this, state);
                };
                Texture.prototype.__uploadATFTextureFromByteArray = function (data, byteArrayOffset) {
                    data.position = byteArrayOffset;
                    var version = 0;
                    var length = 0;
                    if (data.get(byteArrayOffset + 6) == 0xff) {
                        version = data.get(byteArrayOffset + 7);
                        data.position = ((byteArrayOffset + 8) >>> 0);
                        length = this.__readUInt32(data);
                    }
                    else {
                        version = 0;
                        data.position = ((byteArrayOffset + 3) >>> 0);
                        length = this.__readUInt24(data);
                    }
                    if (((byteArrayOffset + length) >> 0) > data.length) {
                        throw new textures.IllegalOperationError("ATF length exceeds byte array length");
                    }
                    var tdata = data.readUnsignedByte();
                    var type = ((tdata >> 7) >> 0);
                    if (type != Texture.NORMAL) {
                        throw new textures.IllegalOperationError("ATF Cube maps are not supported");
                    }
                    var format = ((tdata & 0x7f) >> 0);
                    switch (format) {
                        case Texture.RAW_COMPRESSED:
                            this.__format = textures.TextureBase.__textureFormatCompressed;
                            break;
                        case Texture.RAW_COMPRESSED_ALPHA:
                            this.__format = textures.TextureBase.__textureFormatCompressedAlpha;
                            break;
                        default: throw new textures.IllegalOperationError("Only ATF block compressed textures without JPEG-XR+LZMA are supported");
                    }
                    var width = (1 << data.readUnsignedByte());
                    var height = (1 << data.readUnsignedByte());
                    if (width != this.__width || height != this.__height) {
                        throw new textures.IllegalOperationError("ATF width and height dont match");
                    }
                    var mipCount = ((data.readUnsignedByte()) >> 0);
                    var gpuFormats = (version < 3) ? 3 : 4;
                    for (var level = 0; level < mipCount; ++level) {
                        for (var gpuFormat = 0; gpuFormat < gpuFormats; ++gpuFormat) {
                            var blockLength = (version == 0) ? this.__readUInt24(data) : this.__readUInt32(data);
                            if ((data.position + blockLength) > data.length) {
                                throw new textures.IllegalOperationError("Block length exceeds ATF file length");
                            }
                            if (blockLength > 0) {
                                if (gpuFormat == 0) {
                                    var bytes = new textures.ByteArray;
                                    data.readBytes(bytes, 0, blockLength);
                                    this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                                    this.__gl.compressedTexImage2D(this.__textureTarget, level, this.__format, width >> level, height >> level, 0, blockLength, bytes);
                                }
                                else {
                                    data.position += blockLength;
                                }
                            }
                        }
                    }
                };
                Texture.NORMAL = 0;
                Texture.CUBE_MAP = 1;
                Texture.RGB888 = 0;
                Texture.RGBA8888 = 1;
                Texture.COMPRESSED = 2;
                Texture.RAW_COMPRESSED = 3;
                Texture.COMPRESSED_ALPHA = 4;
                Texture.RAW_COMPRESSED_ALPHA = 5;
                return Texture;
            }(textures.TextureBase));
            textures.Texture = Texture;
        })(textures = display3D.textures || (display3D.textures = {}));
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Texture.js.map