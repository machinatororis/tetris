var flash;
(function (flash) {
    var filters;
    (function (filters) {
        var DisplacementMapFilterMode = (function () {
            function DisplacementMapFilterMode() {
            }
            DisplacementMapFilterMode.CLAMP = "clamp";
            DisplacementMapFilterMode.COLOR = "color";
            DisplacementMapFilterMode.IGNORE = "ignore";
            DisplacementMapFilterMode.WRAP = "wrap";
            return DisplacementMapFilterMode;
        }());
        filters.DisplacementMapFilterMode = DisplacementMapFilterMode;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=DisplacementMapFilterMode.js.map