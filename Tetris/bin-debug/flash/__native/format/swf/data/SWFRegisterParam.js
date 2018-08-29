var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var data;
                (function (data_1) {
                    data_1.SWFData = flash.__native.format.swf.SWFData;
                    var SWFRegisterParam = (function () {
                        function SWFRegisterParam(data) {
                            if (data === void 0) { data = null; }
                            this.register = 0;
                            this.name = null;
                            data = strict(data, data_1.SWFData);
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        SWFRegisterParam.prototype.parse = function (data) {
                            data = strict(data, data_1.SWFData);
                            this.register = data.readUI8();
                            this.name = data.readString();
                        };
                        SWFRegisterParam.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            data.writeUI8(this.register);
                            data.writeString(this.name);
                        };
                        SWFRegisterParam.prototype.toString = function () {
                            return "$" + this.register + ":" + this.name;
                        };
                        return SWFRegisterParam;
                    }());
                    data_1.SWFRegisterParam = SWFRegisterParam;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFRegisterParam.js.map