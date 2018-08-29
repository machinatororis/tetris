var flash;
(function (flash) {
    var system;
    (function (system) {
        var SecurityPanel = (function () {
            function SecurityPanel() {
            }
            SecurityPanel.CAMERA = "camera";
            SecurityPanel.DEFAULT = "default";
            SecurityPanel.DISPLAY = "display";
            SecurityPanel.LOCAL_STORAGE = "localStorage";
            SecurityPanel.MICROPHONE = "microphone";
            SecurityPanel.PRIVACY = "privacy";
            SecurityPanel.SETTINGS_MANAGER = "settingsManager";
            return SecurityPanel;
        }());
        system.SecurityPanel = SecurityPanel;
    })(system = flash.system || (flash.system = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SecurityPanel.js.map