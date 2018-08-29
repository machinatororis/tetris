var flash;
(function (flash) {
    var desktop;
    (function (desktop) {
        var ClipboardTransferMode = (function () {
            function ClipboardTransferMode() {
                throw new Error('Abstract class Error');
            }
            ClipboardTransferMode.CLONE_ONLY = "cloneOnly";
            ClipboardTransferMode.CLONE_PREFERRED = "clonePreferred";
            ClipboardTransferMode.ORIGINAL_ONLY = "originalOnly";
            ClipboardTransferMode.ORIGINAL_PREFERRED = "originalPreferred";
            return ClipboardTransferMode;
        }());
        desktop.ClipboardTransferMode = ClipboardTransferMode;
    })(desktop = flash.desktop || (flash.desktop = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ClipboardTransferMode.js.map