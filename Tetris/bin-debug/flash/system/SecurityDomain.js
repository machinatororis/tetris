var flash;
(function (flash) {
    var system;
    (function (system) {
        var SecurityDomain = (function () {
            function SecurityDomain() {
            }
            Object.defineProperty(SecurityDomain, "currentDomain", {
                get: function () {
                    SecurityDomain.sCurrentDomain = SecurityDomain.sCurrentDomain || new SecurityDomain;
                    return SecurityDomain.sCurrentDomain;
                },
                enumerable: true,
                configurable: true
            });
            SecurityDomain.sCurrentDomain = null;
            return SecurityDomain;
        }());
        system.SecurityDomain = SecurityDomain;
    })(system = flash.system || (flash.system = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SecurityDomain.js.map