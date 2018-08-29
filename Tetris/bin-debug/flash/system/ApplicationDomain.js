var flash;
(function (flash) {
    var system;
    (function (system) {
        system.ByteArray = flash.utils.ByteArray;
        var ApplicationDomain = (function () {
            function ApplicationDomain(parentDomain) {
                if (parentDomain === void 0) { parentDomain = null; }
                parentDomain = strict(parentDomain, ApplicationDomain);
            }
            Object.defineProperty(ApplicationDomain, "currentDomain", {
                get: function () {
                    ApplicationDomain.sCurrentDomain = ApplicationDomain.sCurrentDomain || new ApplicationDomain;
                    return ApplicationDomain.sCurrentDomain;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ApplicationDomain, "MIN_DOMAIN_MEMORY_LENGTH", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            ApplicationDomain.prototype.domainMemory = function () {
                return null;
            };
            Object.defineProperty(ApplicationDomain.prototype, "parentDomain", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            ApplicationDomain.prototype.getDefinition = function (name) {
                name = as(name, 'String');
                return null;
            };
            ApplicationDomain.prototype.getQualifiedDefinitionNames = function () {
                return null;
            };
            ApplicationDomain.prototype.hasDefinition = function (name) {
                name = as(name, 'String');
                return false;
            };
            ApplicationDomain.sCurrentDomain = null;
            return ApplicationDomain;
        }());
        system.ApplicationDomain = ApplicationDomain;
    })(system = flash.system || (flash.system = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ApplicationDomain.js.map