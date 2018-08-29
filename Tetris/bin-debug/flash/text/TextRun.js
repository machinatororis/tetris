var flash;
(function (flash) {
    var text;
    (function (text) {
        var TextRun = (function () {
            function TextRun(beginIndex, endIndex, textFormat) {
                this.beginIndex = 0;
                this.endIndex = 0;
                this.textFormat = null;
                beginIndex = ((beginIndex) >> 0);
                endIndex = ((endIndex) >> 0);
                textFormat = strict(textFormat, text.TextFormat);
                this.beginIndex = beginIndex;
                this.endIndex = endIndex;
                this.textFormat = textFormat;
            }
            return TextRun;
        }());
        text.TextRun = TextRun;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextRun.js.map