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
                    var BitmapData = (function (_super) {
                        __extends(BitmapData, _super);
                        function BitmapData() {
                            var _this = this;
                            var tag;
                            var length = arguments.length;
                            for (var i = 0; i < length; ++i) {
                                var arg = arguments[i];
                                if (arg == null) {
                                    continue;
                                }
                                if (is(arg, 'implements_flash___native_format_swf_tags_IDefinitionBitsTag')) {
                                    tag = arg;
                                    break;
                                }
                            }
                            if (tag) {
                                var source = tag.instance;
                                _this = _super.call(this, source._width, source._height, source._transparent, 0x0, false) || this;
                                BitmapData.__clone(source, _this);
                            }
                            else {
                                switch (length) {
                                    case 4:
                                        _this = _super.call(this, arguments[0], arguments[1], arguments[2], arguments[3]) || this;
                                        break;
                                    case 3:
                                        _this = _super.call(this, arguments[0], arguments[1], arguments[2]) || this;
                                        break;
                                    case 2:
                                        _this = _super.call(this, arguments[0], arguments[1]) || this;
                                        break;
                                    case 1:
                                        _this = _super.call(this, arguments[0]) || this;
                                        break;
                                    default:
                                        _this = _super.call(this) || this;
                                }
                            }
                            return _this;
                        }
                        return BitmapData;
                    }(flash.display.BitmapData));
                    instance.BitmapData = BitmapData;
                })(instance = swf.instance || (swf.instance = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BitmapData.js.map