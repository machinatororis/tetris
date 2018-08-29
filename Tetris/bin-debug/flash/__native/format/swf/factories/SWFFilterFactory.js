var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var factories;
                (function (factories) {
                    factories.FilterBevel = flash.__native.format.swf.data.filters.FilterBevel;
                    factories.FilterBlur = flash.__native.format.swf.data.filters.FilterBlur;
                    factories.FilterColorMatrix = flash.__native.format.swf.data.filters.FilterColorMatrix;
                    factories.FilterConvolution = flash.__native.format.swf.data.filters.FilterConvolution;
                    factories.FilterDropShadow = flash.__native.format.swf.data.filters.FilterDropShadow;
                    factories.FilterGlow = flash.__native.format.swf.data.filters.FilterGlow;
                    factories.FilterGradientBevel = flash.__native.format.swf.data.filters.FilterGradientBevel;
                    factories.FilterGradientGlow = flash.__native.format.swf.data.filters.FilterGradientGlow;
                    factories.IFilter = flash.__native.format.swf.data.filters.IFilter;
                    var SWFFilterFactory = (function () {
                        function SWFFilterFactory() {
                        }
                        SWFFilterFactory.create = function (id) {
                            var cl = SWFFilterFactory.sTypeToClass[id];
                            if (!cl) {
                                throw new Error("Unknown filter ID: " + id);
                            }
                            return new cl(id);
                        };
                        SWFFilterFactory.sTypeToClass = [];
                        SWFFilterFactory.__block0 = function () {
                            function $() {
                                SWFFilterFactory.sTypeToClass[0] = factories.FilterDropShadow;
                                SWFFilterFactory.sTypeToClass[1] = factories.FilterBlur;
                                SWFFilterFactory.sTypeToClass[2] = factories.FilterGlow;
                                SWFFilterFactory.sTypeToClass[3] = factories.FilterBevel;
                                SWFFilterFactory.sTypeToClass[4] = factories.FilterGradientGlow;
                                SWFFilterFactory.sTypeToClass[5] = factories.FilterConvolution;
                                SWFFilterFactory.sTypeToClass[6] = factories.FilterColorMatrix;
                                SWFFilterFactory.sTypeToClass[7] = factories.FilterGradientBevel;
                            }
                            asc.stb(SWFFilterFactory, $);
                        }();
                        return SWFFilterFactory;
                    }());
                    factories.SWFFilterFactory = SWFFilterFactory;
                })(factories = swf.factories || (swf.factories = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFFilterFactory.js.map