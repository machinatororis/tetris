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
                var tags;
                (function (tags) {
                    var etc;
                    (function (etc) {
                        etc.ITag = flash.__native.format.swf.tags.ITag;
                        etc.TagUnknown = flash.__native.format.swf.tags.TagUnknown;
                        var TagSWFEncryptActions = (function (_super) {
                            __extends(TagSWFEncryptActions, _super);
                            function TagSWFEncryptActions(type) {
                                if (type === void 0) { type = 0; }
                                var _this = this;
                                _this.implements_flash___native_format_swf_tags_ITag = null;
                                type = ((type) >>> 0);
                                _this = _super.call(this) || this;
                                return _this;
                            }
                            Object.defineProperty(TagSWFEncryptActions.prototype, "type", {
                                get: function () { return TagSWFEncryptActions.TYPE; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(TagSWFEncryptActions.prototype, "name", {
                                get: function () { return "SWFEncryptActions"; },
                                enumerable: true,
                                configurable: true
                            });
                            TagSWFEncryptActions.TYPE = 253;
                            return TagSWFEncryptActions;
                        }(etc.TagUnknown));
                        etc.TagSWFEncryptActions = TagSWFEncryptActions;
                    })(etc = tags.etc || (tags.etc = {}));
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagSWFEncryptActions.js.map