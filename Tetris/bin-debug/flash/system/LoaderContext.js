var flash;
(function (flash) {
    var system;
    (function (system) {
        system.DisplayObjectContainer = flash.display.DisplayObjectContainer;
        var LoaderContext = (function () {
            function LoaderContext(checkPolicyFile, applicationDomain, securityDomain) {
                if (checkPolicyFile === void 0) { checkPolicyFile = false; }
                if (applicationDomain === void 0) { applicationDomain = null; }
                if (securityDomain === void 0) { securityDomain = null; }
                this.allowCodeImport = false;
                this.allowLoadBytesCodeExecution = false;
                this.applicationDomain = null;
                this.checkPolicyFile = false;
                this.imageDecodingPolicy = null;
                this.parameters = null;
                this.requestedContentParent = null;
                this.securityDomain = null;
                checkPolicyFile = Boolean(checkPolicyFile);
                applicationDomain = strict(applicationDomain, system.ApplicationDomain);
                securityDomain = strict(securityDomain, system.SecurityDomain);
                this.checkPolicyFile = checkPolicyFile;
                this.applicationDomain = applicationDomain;
                this.securityDomain = securityDomain;
            }
            return LoaderContext;
        }());
        system.LoaderContext = LoaderContext;
    })(system = flash.system || (flash.system = {}));
})(flash || (flash = {}));
//# sourceMappingURL=LoaderContext.js.map