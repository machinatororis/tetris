var flash;
(function (flash) {
    var system;
    (function (system) {
        var ImageDecodingPolicy = (function () {
            function ImageDecodingPolicy() {
            }
            ImageDecodingPolicy.ON_DEMAND = "onDemand";
            ImageDecodingPolicy.ON_LOAD = "onLoad";
            return ImageDecodingPolicy;
        }());
        system.ImageDecodingPolicy = ImageDecodingPolicy;
    })(system = flash.system || (flash.system = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ImageDecodingPolicy.js.map