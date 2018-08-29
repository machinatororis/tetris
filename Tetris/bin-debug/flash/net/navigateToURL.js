var flash;
(function (flash) {
    var net;
    (function (net) {
        function navigateToURL(request, win) {
            if (win === void 0) { win = null; }
            request = strict(request, net.URLRequest);
            win = as(win, 'String');
            if (!request) {
                return;
            }
            if (!win) {
                win = '_blank';
            }
            var method = net.URLRequestMethod.GET;
            if (request.method) {
                switch (request.method.toUpperCase()) {
                    case net.URLRequestMethod.GET:
                    case net.URLRequestMethod.POST:
                    case net.URLRequestMethod.PUT:
                    case net.URLRequestMethod.DELETE:
                    case net.URLRequestMethod.HEAD:
                    case net.URLRequestMethod.OPTIONS:
                        method = request.method;
                        break;
                }
            }
            var params = request.data;
            if (!params) {
                params = {};
            }
            if (method == net.URLRequestMethod.GET) {
                var v = new net.URLVariables(request.url);
                var __for0 = window.asc.in(v);
                for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                    var f = __for0_1[_i];
                    params[f] = v[f];
                }
            }
            var form = document.createElement('form');
            form.setAttribute('method', method);
            form.setAttribute('action', request.url);
            form.setAttribute('target', win);
            var keys = Object.keys(params);
            var len = keys.length;
            for (var i = 0; i < len; i++) {
                var key = keys[i];
                if (!params.hasOwnProperty(key)) {
                    continue;
                }
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = params[key];
                form.appendChild(input);
            }
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
        }
        net.navigateToURL = navigateToURL;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=navigateToURL.js.map