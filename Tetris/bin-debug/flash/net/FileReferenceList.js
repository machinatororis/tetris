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
    var net;
    (function (net) {
        net.Event = flash.events.Event;
        net.EventDispatcher = flash.events.EventDispatcher;
        net.clearTimeout = flash.utils.clearTimeout;
        net.setTimeout = flash.utils.setTimeout;
        var FileReferenceList = (function (_super) {
            __extends(FileReferenceList, _super);
            function FileReferenceList() {
                var _this = this;
                _this._input === void 0 && (_this._input = null);
                _this._files === void 0 && (_this._files = null);
                _this = _super.call(this) || this;
                return _this;
            }
            Object.defineProperty(FileReferenceList.prototype, "fileList", {
                get: function () {
                    return this._files;
                },
                enumerable: true,
                configurable: true
            });
            FileReferenceList.prototype.browse = function (typeFilter) {
                if (typeFilter === void 0) { typeFilter = null; }
                typeFilter = strict(typeFilter, Array);
                var accept;
                var __for0 = window.asc.of(typeFilter);
                for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                    var f = __for0_1[_i];
                    accept = accept || [];
                    var ext = f.extension;
                    if (!ext)
                        continue;
                    ext = ext.substr(ext.lastIndexOf('.'));
                    if (!ext.length)
                        continue;
                    accept.push(ext);
                }
                this._input = document.createElement('input');
                this._input.setAttribute('type', 'file');
                this._input.setAttribute('multiple', 'true');
                if (accept) {
                    this._input.setAttribute('accept', accept.join(','));
                }
                var timeout = 0;
                this._input.addEventListener('change', function (e) {
                    net.clearTimeout(timeout);
                    this._input = null;
                    this._files = [];
                    var files = e.target.files;
                    for (var i = 0, f; f = files[i]; i++) {
                        this._files.push(new net.FileReference()._fromFile(f));
                        this.dispatchEvent(new net.Event(net.Event.SELECT));
                        return;
                    }
                    this.dispatchEvent(new net.Event(net.Event.CANCEL));
                }.__bind(this));
                var onfocus = document.body.onfocus;
                document.body.onfocus = function (e) {
                    document.body.onfocus = onfocus;
                    if (onfocus != undefined)
                        onfocus(e);
                    timeout = net.setTimeout(function () {
                        this._input = null;
                        this.dispatchEvent(new net.Event(net.Event.CANCEL));
                    }.__bind(this), 1000);
                }.__bind(this);
                this._input.click();
                return true;
            };
            return FileReferenceList;
        }(net.EventDispatcher));
        net.FileReferenceList = FileReferenceList;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FileReferenceList.js.map