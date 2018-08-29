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
            textures.Context3D = flash.display3D.Context3D;
            textures.Event = flash.events.Event;
            textures.Camera = flash.media.Camera;
            textures.setTimeout = flash.utils.setTimeout;
            var VideoTexture = (function (_super) {
                __extends(VideoTexture, _super);
                function VideoTexture(context) {
                    var _this = this;
                    context = strict(context, textures.Context3D);
                    _this.__videoWidth === void 0 && (_this.__videoWidth = 0);
                    _this.__videoHeight === void 0 && (_this.__videoHeight = 0);
                    _this.__netStream === void 0 && (_this.__netStream = null);
                    _this = _super.call(this, context) || this;
                    _this.__textureTarget = ((_this.__gl.TEXTURE_2D) >> 0);
                    return _this;
                }
                VideoTexture.prototype.attachNetStream = function (netStream) {
                    netStream = strict(netStream, NetStream);
                    this.__netStream = netStream;
                    if (this.__netStream.__video.readyState == 4) {
                        textures.setTimeout(function () {
                            this.__textureReady();
                        }.__bind(this), 0);
                    }
                    else {
                        this.__netStream.__video.addEventListener("canplay", function (_) {
                            this.__textureReady();
                        }.__bind(this), false);
                    }
                };
                VideoTexture.prototype.attachCamera = function (theCamera) {
                    theCamera = strict(theCamera, textures.Camera);
                };
                Object.defineProperty(VideoTexture.prototype, "videoWidth", {
                    get: function () { return this.__videoWidth; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(VideoTexture.prototype, "videoHeight", {
                    get: function () { return this.__videoHeight; },
                    enumerable: true,
                    configurable: true
                });
                VideoTexture.prototype.__getTexture = function () {
                    if (!this.__netStream.__video.paused) {
                        this.__gl.bindTexture(this.__textureTarget, this.__textureID);
                        this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                        this.__gl.texImage2D(this.__gl.TEXTURE_2D, 0, this.__gl.RGBA, this.__gl.RGBA, this.__gl.UNSIGNED_BYTE, this.__netStream.__video);
                    }
                    return this.__textureID;
                };
                VideoTexture.prototype.__textureReady = function () {
                    this.__videoWidth = ((this.__netStream.__video.videoWidth) >> 0);
                    this.__videoHeight = ((this.__netStream.__video.videoHeight) >> 0);
                    this.dispatchEvent(new textures.Event(textures.Event.TEXTURE_READY));
                };
                return VideoTexture;
            }(textures.TextureBase));
            textures.VideoTexture = VideoTexture;
        })(textures = display3D.textures || (display3D.textures = {}));
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=VideoTexture.js.map