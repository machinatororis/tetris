var flash;
(function (flash) {
    var display;
    (function (display) {
        var GraphicsPathWinding = (function () {
            function GraphicsPathWinding() {
            }
            GraphicsPathWinding.EVEN_ODD = "evenOdd";
            GraphicsPathWinding.NON_ZERO = "nonZero";
            return GraphicsPathWinding;
        }());
        display.GraphicsPathWinding = GraphicsPathWinding;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GraphicsPathWinding.js.map