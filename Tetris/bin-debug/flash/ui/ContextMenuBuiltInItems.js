var flash;
(function (flash) {
    var ui;
    (function (ui) {
        var ContextMenuBuiltInItems = (function () {
            function ContextMenuBuiltInItems() {
                this.forwardAndBack = false;
                this.loop = false;
                this.play = false;
                this.print = false;
                this.quality = false;
                this.rewind = false;
                this.save = false;
                this.zoom = false;
            }
            return ContextMenuBuiltInItems;
        }());
        ui.ContextMenuBuiltInItems = ContextMenuBuiltInItems;
    })(ui = flash.ui || (flash.ui = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ContextMenuBuiltInItems.js.map