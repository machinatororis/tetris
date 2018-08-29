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
                    instance.IDefinitionBitsTag = flash.__native.format.swf.tags.IDefinitionBitsTag;
                    var BitmapAsset = (function (_super) {
                        __extends(BitmapAsset, _super);
                        function BitmapAsset(tag) {
                            var _this = this;
                            tag = strict(tag, 'implements_flash___native_format_swf_tags_IDefinitionBitsTag');
                            _this = _super.call(this, tag) || this;
                            return _this;
                        }
                        return BitmapAsset;
                    }(flash.__native.format.swf.instance.Bitmap));
                    instance.BitmapAsset = BitmapAsset;
                })(instance = swf.instance || (swf.instance = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BitmapAsset.js.map