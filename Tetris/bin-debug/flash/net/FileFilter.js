var flash;
(function (flash) {
    var net;
    (function (net) {
        var FileFilter = (function () {
            function FileFilter(description, extension, macType) {
                if (macType === void 0) { macType = null; }
                this.description = null;
                this.extension = null;
                this.macType = null;
                description = as(description, 'String');
                extension = as(extension, 'String');
                macType = as(macType, 'String');
                this.description = description;
                this.extension = extension;
                this.macType = macType;
            }
            return FileFilter;
        }());
        net.FileFilter = FileFilter;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FileFilter.js.map