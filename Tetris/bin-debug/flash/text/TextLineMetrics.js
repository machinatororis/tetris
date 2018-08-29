var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextLineMetrics = (function () {
            function TextLineMetrics(x, width, height, ascent, descent, leading) {
                this.x = NaN;
                this.width = NaN;
                this.height = NaN;
                this.ascent = NaN;
                this.descent = NaN;
                this.leading = NaN;
                x = (+(x));
                width = (+(width));
                height = (+(height));
                ascent = (+(ascent));
                descent = (+(descent));
                leading = (+(leading));
                this.x = x;
                this.width = width;
                this.height = height;
                this.ascent = ascent;
                this.descent = descent;
                this.leading = leading;
            }
            return TextLineMetrics;
        }());
        text.TextLineMetrics = TextLineMetrics;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextLineMetrics.js.map