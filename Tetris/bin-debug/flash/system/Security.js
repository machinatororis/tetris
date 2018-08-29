var flash;
(function (flash) {
    var system;
    (function (system) {
        var Security = (function () {
            function Security() {
            }
            Security.exactSettings = function () {
                return false;
            };
            Object.defineProperty(Security, "pageDomain", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Security, "sandboxType", {
                get: function () {
                    return Security.APPLICATION;
                },
                enumerable: true,
                configurable: true
            });
            Security.allowDomain = function () {
                var domains = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    domains[_i] = arguments[_i];
                }
            };
            Security.allowInsecureDomain = function () {
                var domains = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    domains[_i] = arguments[_i];
                }
            };
            Security.loadPolicyFile = function (url) {
                url = as(url, 'String');
            };
            Security.showSettings = function (panel) {
                if (panel === void 0) { panel = "default"; }
                panel = as(panel, 'String');
            };
            Security.APPLICATION = "application";
            Security.LOCAL_TRUSTED = "localTrusted";
            Security.LOCAL_WITH_FILE = "localWithFile";
            Security.LOCAL_WITH_NETWORK = "localWithNetwork";
            Security.REMOTE = "remote";
            return Security;
        }());
        system.Security = Security;
    })(system = flash.system || (flash.system = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Security.js.map