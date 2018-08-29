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
                    var filters;
                    (function (filters) {
                        filters.SWFData = flash.__native.format.swf.SWFData;
                        filters.BitmapFilter = flash.filters.BitmapFilter;
                        var Filter = (function () {
                            function Filter(id) {
                                this.implements_flash___native_format_swf_data_filters_IFilter = null;
                                this.id = id;
                            }
                            Filter.prototype.parse = function (data) {
                                data = strict(data, filters.SWFData);
                                throw new Error('Need to override');
                            };
                            Filter.prototype.publish = function (data) {
                                data = strict(data, filters.SWFData);
                                throw new Error('Need to override');
                            };
                            Filter.prototype.clone = function () {
                                throw new Error('Need to override');
                            };
                            Filter.prototype.toString = function (indent) {
                                if (indent === void 0) { indent = 0; }
                                indent = ((indent) >>> 0);
                                return "[Filter]";
                            };
                            return Filter;
                        }());
                        filters.Filter = Filter;
                    })(filters = data_1.filters || (data_1.filters = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Filter.js.map