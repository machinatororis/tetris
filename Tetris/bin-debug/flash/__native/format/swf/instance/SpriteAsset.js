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
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var instance;
                (function (instance) {
                    instance.SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
                    var SpriteAsset = (function (_super) {
                        __extends(SpriteAsset, _super);
                        function SpriteAsset(data) {
                            var _this = this;
                            data = strict(data, instance.SWFTimelineContainer);
                            _this = _super.call(this, data) || this;
                            return _this;
                        }
                        return SpriteAsset;
                    }(flash.__native.format.swf.instance.MovieClip));
                    instance.SpriteAsset = SpriteAsset;
                })(instance = swf.instance || (swf.instance = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SpriteAsset.js.map