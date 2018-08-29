var mx;
(function (mx) {
    var core;
    (function (core) {
        var EdgeMetrics = (function () {
            function EdgeMetrics(param1, param2, param3, param4) {
                if (param1 === void 0) { param1 = 0; }
                if (param2 === void 0) { param2 = 0; }
                if (param3 === void 0) { param3 = 0; }
                if (param4 === void 0) { param4 = 0; }
                this.top = NaN;
                this.left = NaN;
                this.bottom = NaN;
                this.right = NaN;
                param1 = (+(param1));
                param2 = (+(param2));
                param3 = (+(param3));
                param4 = (+(param4));
                this.left = param1;
                this.top = param2;
                this.right = param3;
                this.bottom = param4;
            }
            EdgeMetrics.prototype.clone = function () {
                return new EdgeMetrics(this.left, this.top, this.right, this.bottom);
            };
            EdgeMetrics.VERSION = "3.0.0.0";
            EdgeMetrics.EMPTY = asc.sti(EdgeMetrics, function () { EdgeMetrics.EMPTY = new EdgeMetrics(0, 0, 0, 0); });
            return EdgeMetrics;
        }());
        core.EdgeMetrics = EdgeMetrics;
    })(core = mx.core || (mx.core = {}));
})(mx || (mx = {}));
//# sourceMappingURL=EdgeMetrics.js.map