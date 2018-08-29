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
            textures.Context3DTextureFormat = flash.display3D.Context3DTextureFormat;
            textures.IllegalOperationError = flash.errors.IllegalOperationError;
            textures.Event = flash.events.Event;
            textures.ByteArray = flash.utils.ByteArray;
            textures.setTimeout = flash.utils.setTimeout;
            var CubeTexture = (function (_super) {
                __extends(CubeTexture, _super);
                function CubeTexture(context, size, format, optimizeForRenderToTexture, streamingLevels) {
                    var _this = this;
                    context = strict(context, textures.Context3D);
                    size = ((size) >> 0);
                    format = strict(format, textures.Context3DTextureFormat);
                    optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture);
                    streamingLevels = ((streamingLevels) >> 0);
                    _this.__size === void 0 && (_this.__size = 0);
                    _this.__uploadedSides === void 0 && (_this.__uploadedSides = 0);
                    _this = _super.call(this, context) || this;
                    _this.__textureTarget = ((_this.__gl.TEXTURE_CUBE_MAP) >> 0);
                    _this.__size = size;
                    _this.__optimizeForRenderToTexture = optimizeForRenderToTexture;
                    _this.__streamingLevels = streamingLevels;
                    _this.__uploadedSides = 0;
                    return _this;
                }
                CubeTexture.prototype.uploadFromBitmapData = function (source, side, miplevel) {
                    if (miplevel === void 0) { miplevel = 0; }
                    source = strict(source, textures.BitmapData);
                    side = ((side) >>> 0);
                    miplevel = ((miplevel) >>> 0);
                    if (source == null)
                        return;
                    var size = this.__size >> miplevel;
                    if (size == 0)
                        return;
                    this.uploadFromTypedArray(source.__getP2Pixels(), side, miplevel);
                };
                CubeTexture.prototype.uploadFromByteArray = function (data, byteArrayOffset, side, miplevel) {
                    if (miplevel === void 0) { miplevel = 0; }
                    data = strict(data, textures.ByteArray);
                    byteArrayOffset = ((byteArrayOffset) >>> 0);
                    side = ((side) >>> 0);
                    miplevel = ((miplevel) >>> 0);
                    if (byteArrayOffset == 0) {
                        this.uploadFromTypedArray(data.buffer, side);
                        return;
                    }
                    this.uploadFromTypedArray(new Uint8Array(data.buffer, byteArrayOffset), side, miplevel);
                };
                CubeTexture.prototype.uploadCompressedTextureFromByteArray = function (data, byteArrayOffset, async) {
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
                CubeTexture.prototype.uploadFromTypedArray = function (data, side, miplevel) {
                    if (miplevel === void 0) { miplevel = 0; }
                    side = ((side) >>> 0);
                    miplevel = ((miplevel) >>> 0);
                    if (data == null)
                        return;
                    var size = this.__size >> miplevel;
                    if (size == 0)
                        return;
                    var target;
                    switch (side) {
                        case 0:
                            target = this.__gl.TEXTURE_CUBE_MAP_POSITIVE_X;
                            break;
                        case 1:
                            target = this.__gl.TEXTURE_CUBE_MAP_NEGATIVE_X;
                            break;
                        case 2:
                            target = this.__gl.TEXTURE_CUBE_MAP_POSITIVE_Y;
                            break;
                        case 3:
                            target = this.__gl.TEXTURE_CUBE_MAP_NEGATIVE_Y;
                            break;
                        case 4:
                            target = this.__gl.TEXTURE_CUBE_MAP_POSITIVE_Z;
                            break;
                        case 5:
                            target = this.__gl.TEXTURE_CUBE_MAP_NEGATIVE_Z;
                            break;
                        default: throw new textures.IllegalOperationError();
                    }
                    var current = this.__gl.getParameter(this.__gl.TEXTURE_BINDING_2D);
                    this.__gl.bindTexture(this.__gl.TEXTURE_CUBE_MAP, this.__textureID);
                    this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                    this.__gl.texImage2D(target, miplevel, this.__internalFormat, size, size, 0, this.__format, this.__gl.UNSIGNED_BYTE, data);
                    this.__gl.bindTexture(this.__textureTarget, current);
                    this.__uploadedSides |= 1 << side;
                };
                CubeTexture.prototype.__setSamplerState = function (state) {
                    state = strict(state, textures.SamplerState);
                    if (!state.equals(this.__samplerState)) {
                        if (state.minFilter != this.__gl.NEAREST && state.minFilter != this.__gl.LINEAR && !state.mipmapGenerated) {
                            this.__gl.generateMipmap(this.__gl.TEXTURE_CUBE_MAP);
                            state.mipmapGenerated = true;
                        }
                        if (state.maxAniso != 0.0) {
                            this.__gl.texParameterf(this.__gl.TEXTURE_CUBE_MAP, textures.Context3D.TEXTURE_MAX_ANISOTROPY_EXT, state.maxAniso);
                        }
                    }
                    _super.prototype.__setSamplerState.call(this, state);
                };
                CubeTexture.prototype.__uploadATFTextureFromByteArray = function (data, byteArrayOffset) {
                    data = strict(data, textures.ByteArray);
                    byteArrayOffset = ((byteArrayOffset) >>> 0);
                };
                return CubeTexture;
            }(textures.TextureBase));
            textures.CubeTexture = CubeTexture;
        })(textures = display3D.textures || (display3D.textures = {}));
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=CubeTexture.js.map