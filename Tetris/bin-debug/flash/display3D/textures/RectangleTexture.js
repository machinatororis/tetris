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
            textures.ByteArray = flash.utils.ByteArray;
            var RectangleTexture = (function (_super) {
                __extends(RectangleTexture, _super);
                function RectangleTexture(context, width, height, format, optimizeForRenderToTexture) {
                    var _this = this;
                    context = strict(context, textures.Context3D);
                    width = ((width) >> 0);
                    height = ((height) >> 0);
                    format = as(format, 'String');
                    optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture);
                    _this = _super.call(this, context) || this;
                    _this.__textureTarget = ((_this.__gl.TEXTURE_2D) >> 0);
                    _this.__width = width;
                    _this.__height = height;
                    _this.__optimizeForRenderToTexture = optimizeForRenderToTexture;
                    _this.uploadFromTypedArray(null);
                    return _this;
                }
                RectangleTexture.prototype.uploadFromBitmapData = function (source) {
                    source = strict(source, textures.BitmapData);
                    if (source == null)
                        return;
                    this.uploadFromTypedArray(source.__getP2Pixels());
                };
                RectangleTexture.prototype.uploadFromByteArray = function (data, byteArrayOffset) {
                    data = strict(data, textures.ByteArray);
                    byteArrayOffset = ((byteArrayOffset) >>> 0);
                    if (byteArrayOffset == 0) {
                        this.uploadFromTypedArray(data.buffer);
                        return;
                    }
                    this.uploadFromTypedArray(new Uint8Array(data.buffer, byteArrayOffset));
                };
                RectangleTexture.prototype.uploadFromTypedArray = function (data) {
                    var current = this.__gl.getParameter(this.__gl.TEXTURE_BINDING_2D);
                    this.__gl.bindTexture(this.__textureTarget, this.__textureID);
                    this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                    this.__gl.texImage2D(this.__textureTarget, 0, this.__internalFormat, this.__width, this.__height, 0, this.__format, this.__gl.UNSIGNED_BYTE, data);
                    this.__gl.bindTexture(this.__textureTarget, current);
                };
                RectangleTexture.prototype.__setSamplerState = function (state) {
                    state = strict(state, textures.SamplerState);
                    if (!state.equals(this.__samplerState)) {
                        if (state.maxAniso != 0.0) {
                            this.__gl.texParameterf(this.__gl.TEXTURE_2D, textures.Context3D.TEXTURE_MAX_ANISOTROPY_EXT, state.maxAniso);
                        }
                    }
                    _super.prototype.__setSamplerState.call(this, state);
                };
                return RectangleTexture;
            }(textures.TextureBase));
            textures.RectangleTexture = RectangleTexture;
        })(textures = display3D.textures || (display3D.textures = {}));
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=RectangleTexture.js.map