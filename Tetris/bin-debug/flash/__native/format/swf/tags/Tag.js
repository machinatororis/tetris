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
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var Tag = (function () {
                        function Tag() {
                        }
                        Tag.toStringCommon = function (type, name, indent) {
                            if (indent === void 0) { indent = 0; }
                            type = ((type) >>> 0);
                            name = as(name, 'String');
                            indent = ((indent) >>> 0);
                            return tags.StringUtils.repeat(indent) + "[" + tags.StringUtils.printf("%02d", type) + ":" + name + "] ";
                        };
                        return Tag;
                    }());
                    tags.Tag = Tag;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Tag.js.map