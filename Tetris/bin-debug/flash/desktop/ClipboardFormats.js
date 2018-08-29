var flash;
(function (flash) {
    var desktop;
    (function (desktop) {
        var ClipboardFormats = (function () {
            function ClipboardFormats() {
                throw new Error('Abstract class Error');
            }
            ClipboardFormats.BITMAP_FORMAT = "air:bitmap";
            ClipboardFormats.FILE_LIST_FORMAT = "air:file list";
            ClipboardFormats.FILE_PROMISE_LIST_FORMAT = "air:file promise list";
            ClipboardFormats.HTML_FORMAT = "air:html";
            ClipboardFormats.RICH_TEXT_FORMAT = "air:rtf";
            ClipboardFormats.TEXT_FORMAT = "air:text";
            ClipboardFormats.URL_FORMAT = "air:url";
            return ClipboardFormats;
        }());
        desktop.ClipboardFormats = ClipboardFormats;
    })(desktop = flash.desktop || (flash.desktop = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ClipboardFormats.js.map