var flash;
(function (flash) {
    var ui;
    (function (ui) {
        var ContextMenuClipboardItems = (function () {
            function ContextMenuClipboardItems() {
                this.clear = false;
                this.copy = false;
                this.cut = false;
                this.paste = false;
                this.selectAll = false;
            }
            return ContextMenuClipboardItems;
        }());
        ui.ContextMenuClipboardItems = ContextMenuClipboardItems;
    })(ui = flash.ui || (flash.ui = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ContextMenuClipboardItems.js.map