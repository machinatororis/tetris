var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextExtent = (function () {
            function TextExtent(width, height, textFieldWidth, textFieldHeight, ascent, descent) {
                this.width = NaN;
                this.height = NaN;
                this.textFieldWidth = NaN;
                this.textFieldHeight = NaN;
                this.ascent = NaN;
                this.descent = NaN;
                width = (+(width));
                height = (+(height));
                textFieldWidth = (+(textFieldWidth));
                textFieldHeight = (+(textFieldHeight));
                ascent = (+(ascent));
                descent = (+(descent));
                this.width = width;
                this.height = height;
                this.textFieldWidth = textFieldWidth;
                this.textFieldHeight = textFieldHeight;
                this.ascent = ascent;
                this.descent = descent;
            }
            return TextExtent;
        }());
        text.TextExtent = TextExtent;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextExtent.js.map