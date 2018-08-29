var flash;
(function (flash) {
    var net;
    (function (net) {
        net.Event = flash.events.Event;
        net.IOErrorEvent = flash.events.IOErrorEvent;
        net.SecurityErrorEvent = flash.events.SecurityErrorEvent;
        function sendToURL(request) {
            request = strict(request, net.URLRequest);
            var loader = new net.URLLoader;
            loader.addEventListener(net.Event.COMPLETE, finish.__bind(this));
            loader.addEventListener(net.IOErrorEvent.IO_ERROR, finish.__bind(this));
            loader.addEventListener(net.SecurityErrorEvent.SECURITY_ERROR, finish.__bind(this));
            try {
                loader.load(request);
            }
            catch (e) {
                e = window.asc.e2e(e);
                finish.__bind(this)();
            }
            function finish(e) {
                e = strict(e, net.Event);
                loader.removeEventListener(net.Event.COMPLETE, finish.__bind(this));
                loader.removeEventListener(net.IOErrorEvent.IO_ERROR, finish.__bind(this));
                loader.removeEventListener(net.SecurityErrorEvent.SECURITY_ERROR, finish.__bind(this));
            }
        }
        net.sendToURL = sendToURL;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=sendToURL.js.map