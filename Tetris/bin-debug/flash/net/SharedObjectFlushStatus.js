var flash;
(function (flash) {
    var net;
    (function (net) {
        var SharedObjectFlushStatus = (function () {
            function SharedObjectFlushStatus() {
                throw new Error('Abstract class error');
            }
            SharedObjectFlushStatus.FLUSHED = "flushed";
            SharedObjectFlushStatus.PENDING = "pending";
            return SharedObjectFlushStatus;
        }());
        net.SharedObjectFlushStatus = SharedObjectFlushStatus;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SharedObjectFlushStatus.js.map