var flash;
(function (flash) {
    var system;
    (function (system) {
        system.XML = global.XML;
        var System = (function () {
            function System() {
            }
            Object.defineProperty(System, "ime", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            System.setClipboard = function (text) {
                text = as(text, 'String');
                var textArea = document.createElement("textarea");
                textArea.style.position = 'fixed';
                textArea.style.top = 0;
                textArea.style.left = 0;
                textArea.style.width = '2em';
                textArea.style.height = '2em';
                textArea.style.padding = 0;
                textArea.style.border = 'none';
                textArea.style.outline = 'none';
                textArea.style.boxShadow = 'none';
                textArea.style.background = 'transparent';
                textArea.value = text;
                document.body.appendChild(as(textArea, HTMLElement));
                textArea.select();
                try {
                    var successful = Boolean(document.execCommand('copy'));
                    var msg = successful ? 'successful' : 'unsuccessful';
                    trace('Copying text command was ' + msg);
                }
                catch (err) {
                    err = window.asc.e2e(err);
                    trace('Oops, unable to copy');
                }
                document.body.removeChild(as(textArea, HTMLElement));
            };
            Object.defineProperty(System, "totalMemory", {
                get: function () {
                    return ((System.totalMemoryNumber) >>> 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(System, "totalMemoryNumber", {
                get: function () {
                    return System.memory.totalJSHeapSize;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(System, "freeMemory", {
                get: function () {
                    return Math.max(System.memory.jsHeapSizeLimit - System.totalMemoryNumber, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(System, "privateMemory", {
                get: function () {
                    return System.memory.usedJSHeapSize;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(System, "useCodePage", {
                get: function () { return false; },
                set: function (param1) { param1 = Boolean(param1); },
                enumerable: true,
                configurable: true
            });
            System.pause = function () {
            };
            System.resume = function () {
            };
            System.exit = function (param1) {
                param1 = ((param1) >>> 0);
            };
            System.gc = function () {
            };
            System.pauseForGCIfCollectionImminent = function (param1) {
                if (param1 === void 0) { param1 = 0.75; }
                param1 = (+(param1));
            };
            System.disposeXML = function (value) {
                value = strict(value, system.XML);
                if (value && 'dispose' in value) {
                    value.dispose();
                }
            };
            Object.defineProperty(System, "memory", {
                get: function () {
                    if ('memory' in window.performance)
                        return window.performance['memory'];
                    return { jsHeapSizeLimit: 0, totalJSHeapSize: 0, usedJSHeapSize: 0 };
                },
                enumerable: true,
                configurable: true
            });
            return System;
        }());
        system.System = System;
    })(system = flash.system || (flash.system = {}));
})(flash || (flash = {}));
//# sourceMappingURL=System.js.map