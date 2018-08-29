var flash;
(function (flash) {
    var text;
    (function (text) {
        var CSMSettings = (function () {
            function CSMSettings(fontSize, insideCutoff, outsideCutoff) {
                this.fontSize = NaN;
                this.insideCutoff = NaN;
                this.outsideCutoff = NaN;
                fontSize = (+(fontSize));
                insideCutoff = (+(insideCutoff));
                outsideCutoff = (+(outsideCutoff));
                this.fontSize = fontSize;
                this.insideCutoff = insideCutoff;
                this.outsideCutoff = outsideCutoff;
            }
            return CSMSettings;
        }());
        text.CSMSettings = CSMSettings;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=CSMSettings.js.map