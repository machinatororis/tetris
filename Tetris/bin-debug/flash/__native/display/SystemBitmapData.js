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
    var __native;
    (function (__native) {
        var display;
        (function (display) {
            display.getNextPowerOfTwo = flash.__native.utils.getNextPowerOfTwo;
            display.BitmapData = flash.display.BitmapData;
            var SystemBitmapData = (function (_super) {
                __extends(SystemBitmapData, _super);
                function SystemBitmapData(type, width, height, transparent, fillColor) {
                    if (transparent === void 0) { transparent = true; }
                    if (fillColor === void 0) { fillColor = 0xffffffff; }
                    var _this = this;
                    type = as(type, 'String');
                    width = ((width) >> 0);
                    height = ((height) >> 0);
                    transparent = Boolean(transparent);
                    fillColor = ((fillColor) >>> 0);
                    _this._type === void 0 && (_this._type = null);
                    if (display.BitmapData.sHelperStats && !display.BitmapData.sHelperStats.mb.system) {
                        var s = display.BitmapData.sHelperStats.mb.system = {};
                        s[SystemBitmapData.BUFFER] = s[SystemBitmapData.SWF] = s[SystemBitmapData.FILTER] = s[SystemBitmapData.DISPLAY] = s[SystemBitmapData.VECTOR] = s[SystemBitmapData.TEXT] = 0;
                    }
                    _this._type = type;
                    _this = _super.call(this, width, height, transparent, fillColor, arguments[5]) || this;
                    return _this;
                }
                SystemBitmapData.prototype.clone = function () {
                    return display.BitmapData.__clone(this, new SystemBitmapData(this._type, this._width, this._height, this._transparent, 0x0, false));
                };
                SystemBitmapData.prototype.dispose = function () {
                    if (this._type == SystemBitmapData.BUFFER) {
                        SystemBitmapData.__pushBuffer(this);
                        return;
                    }
                    this.__dispose();
                };
                SystemBitmapData.prototype.__dispose = function () {
                    _super.prototype.dispose.call(this);
                };
                SystemBitmapData.prototype.__addStats = function () {
                    if (!display.BitmapData.sHelperStats) {
                        return;
                    }
                    var size = (this._width * this._height * 4) / 1024 / 1024;
                    display.BitmapData.sHelperStats.count++;
                    display.BitmapData.sHelperStats.mb.total += size;
                    display.BitmapData.sHelperStats.mb.system[this._type] += size;
                };
                SystemBitmapData.prototype.__removeStats = function () {
                    if (!display.BitmapData.sHelperStats) {
                        return;
                    }
                    var size = (this._width * this._height * 4) / 1024 / 1024;
                    display.BitmapData.sHelperStats.count--;
                    display.BitmapData.sHelperStats.mb.total -= size;
                    display.BitmapData.sHelperStats.mb.system[this._type] -= size;
                };
                SystemBitmapData.__popBuffer = function (width, height, transparent, clear) {
                    if (clear === void 0) { clear = true; }
                    var w = display.getNextPowerOfTwo(width);
                    var h = display.getNextPowerOfTwo(height);
                    var size = (w << 16) | h;
                    var list = SystemBitmapData.sBufferCollection[size] || (SystemBitmapData.sBufferCollection[size] = []);
                    var buff;
                    if (!list.length) {
                        buff = new SystemBitmapData(SystemBitmapData.BUFFER, w, h, transparent, 0x0);
                    }
                    else {
                        buff = strict(list.pop(), SystemBitmapData);
                        buff._transparent = transparent;
                        if (clear) {
                            buff.fillRect(buff._textureRect, 0x0);
                        }
                    }
                    buff._systemWidth = ((width) >> 0);
                    buff._systemHeight = ((height) >> 0);
                    return buff;
                };
                SystemBitmapData.__pushBuffer = function (buff) {
                    if (!buff || buff._type != SystemBitmapData.BUFFER) {
                        return;
                    }
                    var size = (buff._width << 16) | buff._height;
                    var list = SystemBitmapData.sBufferCollection[size];
                    if (list.indexOf(buff) >= 0) {
                        return;
                    }
                    list.push(buff);
                };
                SystemBitmapData.BUFFER = 'buffer';
                SystemBitmapData.EMBED = 'embed';
                SystemBitmapData.LOADER = 'loader';
                SystemBitmapData.SWF = 'swf';
                SystemBitmapData.FILTER = 'filter';
                SystemBitmapData.DISPLAY = 'display';
                SystemBitmapData.VECTOR = 'vector';
                SystemBitmapData.TEXT = 'text';
                SystemBitmapData.sBufferCollection = {};
                return SystemBitmapData;
            }(display.BitmapData));
            display.SystemBitmapData = SystemBitmapData;
        })(display = __native.display || (__native.display = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SystemBitmapData.js.map