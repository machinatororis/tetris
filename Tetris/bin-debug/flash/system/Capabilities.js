var flash;
(function (flash) {
    var system;
    (function (system) {
        system.Stage = flash.display.Stage;
        system.Sound = flash.media.Sound;
        var Capabilities = (function () {
            function Capabilities() {
                throw new Error('Abstract class error');
            }
            Object.defineProperty(Capabilities, "isEmbeddedInAcrobat", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasEmbeddedVideo", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasAudio", {
                get: function () {
                    return system.Sound.__getCtx() != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "avHardwareDisable", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasAccessibility", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasAudioEncoder", {
                get: function () { return Capabilities.hasMP3; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasMP3", {
                get: function () { return Capabilities.hasAudio; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasPrinting", {
                get: function () {
                    return 'print' in window;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasScreenBroadcast", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasScreenPlayback", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasStreamingAudio", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasStreamingVideo", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasVideoEncoder", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "isDebugger", {
                get: function () {
                    return !window.asc.release || (window.location || '').search.substr(1).indexOf('debug=true') >= 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "localFileReadDisable", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "language", {
                get: function () {
                    return 'languages' in navigator && navigator.languages.length > 0 ?
                        navigator.languages[0] :
                        navigator.language ||
                            navigator.userLanguage ||
                            'en';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "languages", {
                get: function () {
                    var list = strict('languages' in navigator ? navigator['languages'] : [], Array);
                    if (!list.length && Capabilities.language) {
                        list.push(Capabilities.language);
                    }
                    return list;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "manufacturer", {
                get: function () {
                    return 'ASCJS';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "os", {
                get: function () {
                    var js = Capabilities.__getJS();
                    var v = js.os;
                    if (js.osVersion != '-') {
                        v += ' ' + js.osVersion;
                    }
                    return v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "browser", {
                get: function () {
                    return Capabilities.__getJS().browser;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "cpuArchitecture", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "playerType", {
                get: function () {
                    return 'PlugIn';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "serverString", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "version", {
                get: function () {
                    var js = Capabilities.__getJS();
                    var v = js.browserVersion;
                    var tmp = v.split('.');
                    if (tmp.length > 2) {
                        tmp.length = 2;
                    }
                    if (tmp.length > 1 && tmp[1].length > 1) {
                        tmp[1] = tmp[1].substr(0, 1);
                    }
                    return tmp.join('.');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "isMobile", {
                get: function () {
                    return Capabilities.__getJS().mobile;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "systemFontFamily", {
                get: function () {
                    return Capabilities.__getJS().font;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "isCookieEnabled", {
                get: function () {
                    return Capabilities.__getJS().cookies;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "screenColor", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "pixelAspectRatio", {
                get: function () { return 1; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "screenDPI", {
                get: function () {
                    var match = window.matchMedia;
                    if (typeof match == 'function' && match('(min-resolution: 10dpi)').matches) {
                        for (var i = 768; i > 0 && !match('(min-resolution: ' + (i | 0) + 'dpi)').matches; i /= 2) { }
                        for (var j = i; j < i * 2 && match('(min-resolution: ' + ((j + 1) | 0) + 'dpi)').matches; j++) { }
                        if (Capabilities.isMobile) {
                            return j;
                        }
                        else {
                            return j / Capabilities.__getPixelAspectRatio();
                        }
                    }
                    return 96;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "screenResolutionX", {
                get: function () {
                    var s = system.Stage.sCurrent;
                    if (s && s.__isNeedFixedOrientationCalc()) {
                        return Capabilities.__getScreenResolutionY();
                    }
                    return Capabilities.__getScreenResolutionX();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "screenResolutionY", {
                get: function () {
                    var s = system.Stage.sCurrent;
                    if (s && s.__isNeedFixedOrientationCalc()) {
                        return Capabilities.__getScreenResolutionX();
                    }
                    return Capabilities.__getScreenResolutionY();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "touchscreenType", {
                get: function () {
                    return ('ontouchstart' in window || ('msMaxTouchPoints' in navigator && navigator['msMaxTouchPoints'] > 0)) ?
                        'finger' : 'none';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasIME", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "hasTLS", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "maxLevelIDC", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "supports32BitProcesses", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Capabilities, "supports64BitProcesses", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Capabilities.hasMultiChannelAudio = function (param1) { param1 = as(param1, 'String'); return false; };
            Capabilities.__getScreenResolutionX = function () {
                var sw = window.screen.width, sh = window.screen.height;
                var ow = window.outerWidth, oh = window.outerHeight;
                var sp = sw / sh, ip = ow / oh;
                var isValid = (sp > 1 && ip > 1) || (sp < 1 && ip < 1);
                if (!isValid) {
                    var tmp = sw;
                    sw = sh;
                    sh = tmp;
                }
                if (ow > sw) {
                    sw = ow;
                }
                if (Capabilities.isMobile) {
                    return sw * Capabilities.__getPixelAspectRatio();
                }
                return sw;
            };
            Capabilities.__getScreenResolutionY = function () {
                var sw = window.screen.width, sh = window.screen.height;
                var ow = window.outerWidth, oh = window.outerHeight;
                var sp = sw / sh, ip = ow / oh;
                var isValid = (sp > 1 && ip > 1) || (sp < 1 && ip < 1);
                if (!isValid) {
                    var tmp = sw;
                    sw = sh;
                    sh = tmp;
                }
                if (oh > sh) {
                    sh = oh;
                }
                if (Capabilities.isMobile) {
                    return sh * Capabilities.__getPixelAspectRatio();
                }
                return sh;
            };
            Capabilities.__getPixelAspectRatio = function () {
                if (window.devicePixelRatio > 0) {
                    return window.devicePixelRatio;
                }
                return 1.0;
            };
            Capabilities.__getJS = function () {
                return window.asc.system.Capabilities;
            };
            return Capabilities;
        }());
        system.Capabilities = Capabilities;
    })(system = flash.system || (flash.system = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Capabilities.js.map