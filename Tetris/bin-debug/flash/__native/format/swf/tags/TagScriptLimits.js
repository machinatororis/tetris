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
                    tags.SWFData = flash.__native.format.swf.SWFData;
                    var TagScriptLimits = (function () {
                        function TagScriptLimits() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.maxRecursionDepth = 0;
                            this.scriptTimeoutSeconds = 0;
                        }
                        TagScriptLimits.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.maxRecursionDepth = data.readUI16();
                            this.scriptTimeoutSeconds = data.readUI16();
                        };
                        TagScriptLimits.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, 4);
                            data.writeUI16(this.maxRecursionDepth);
                            data.writeUI16(this.scriptTimeoutSeconds);
                        };
                        Object.defineProperty(TagScriptLimits.prototype, "type", {
                            get: function () { return TagScriptLimits.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagScriptLimits.prototype, "name", {
                            get: function () { return "ScriptLimits"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagScriptLimits.prototype, "version", {
                            get: function () { return 7; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagScriptLimits.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagScriptLimits.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "MaxRecursionDepth: " + this.maxRecursionDepth + ", " +
                                "ScriptTimeoutSeconds: " + this.scriptTimeoutSeconds;
                        };
                        TagScriptLimits.TYPE = 65;
                        return TagScriptLimits;
                    }());
                    tags.TagScriptLimits = TagScriptLimits;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagScriptLimits.js.map