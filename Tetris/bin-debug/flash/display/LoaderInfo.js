var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flash;
(function (flash) {
    var display;
    (function (display) {
        display.Event = flash.events.Event;
        display.EventDispatcher = flash.events.EventDispatcher;
        display.ProgressEvent = flash.events.ProgressEvent;
        display.UncaughtErrorEvents = flash.events.UncaughtErrorEvents;
        display.ApplicationDomain = flash.system.ApplicationDomain;
        display.ByteArray = flash.utils.ByteArray;
        var LoaderInfo = (function (_super) {
            __extends(LoaderInfo, _super);
            function LoaderInfo() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._bytesLoaded = 0;
                _this._bytesTotal = 0;
                _this._swfVersion = 40;
                _this._frameRate = 60;
                _this._actionScriptVersion = 3;
                _this._parameters = {};
                return _this;
            }
            LoaderInfo.getLoaderInfoByDefinition = function (value) {
                return null;
            };
            Object.defineProperty(LoaderInfo.prototype, "loaderURL", {
                get: function () { return window.location.href; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "url", {
                get: function () { return this._url; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "isURLInaccessible", {
                get: function () { return true; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "bytesLoaded", {
                get: function () { return this._bytesLoaded; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "bytesTotal", {
                get: function () { return this._bytesTotal; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "swfVersion", {
                get: function () { return this._swfVersion; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "actionScriptVersion", {
                get: function () { return this._actionScriptVersion; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "frameRate", {
                get: function () { return this._frameRate; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "parameters", {
                get: function () { return this._parameters; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "width", {
                get: function () { return this._content ? this._content.width : 0; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "height", {
                get: function () { return this._content ? this._content.height : 0; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "contentType", {
                get: function () { return this._contentType; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "sharedEvents", {
                get: function () { return this; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "parentSandboxBridge", {
                get: function () { return null; },
                set: function (param1) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "childSandboxBridge", {
                get: function () { return null; },
                set: function (param1) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "sameDomain", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "childAllowsParent", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "parentAllowsChild", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "loader", {
                get: function () { return this._loader; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "content", {
                get: function () { return this._content; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "bytes", {
                get: function () { return this._bytes; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "applicationDomain", {
                get: function () { return display.ApplicationDomain.currentDomain; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoaderInfo.prototype, "uncaughtErrorEvents", {
                get: function () { return LoaderInfo._uncaughtErrorEvents; },
                enumerable: true,
                configurable: true
            });
            LoaderInfo.prototype.__setProgress = function (loaded, total) {
                var changed;
                if (loaded > this._bytesLoaded) {
                    this._bytesLoaded = loaded;
                    changed = true;
                }
                if (total > this._bytesTotal) {
                    this._bytesTotal = total;
                    changed = true;
                }
                if (changed) {
                    this.dispatchEvent(new display.ProgressEvent(display.ProgressEvent.PROGRESS, false, false, this._bytesLoaded, this._bytesTotal));
                }
            };
            LoaderInfo.prototype.__contentComplete = function () {
                this.__setProgress(this._bytesTotal, this._bytesTotal);
                this.dispatchEvent(new display.Event(display.Event.COMPLETE, false, false, this._bytesLoaded, this._bytesTotal));
            };
            LoaderInfo.prototype.toString = function () {
                return '[object LoaderInfo]';
            };
            LoaderInfo._uncaughtErrorEvents = asc.sti(LoaderInfo, function () { LoaderInfo._uncaughtErrorEvents = new display.UncaughtErrorEvents; });
            return LoaderInfo;
        }(display.EventDispatcher));
        display.LoaderInfo = LoaderInfo;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=LoaderInfo.js.map