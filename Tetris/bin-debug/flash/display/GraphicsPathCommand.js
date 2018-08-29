var flash;
(function (flash) {
    var display;
    (function (display) {
        var GraphicsPathCommand = (function () {
            function GraphicsPathCommand() {
            }
            GraphicsPathCommand.NO_OP = 0;
            GraphicsPathCommand.MOVE_TO = 1;
            GraphicsPathCommand.LINE_TO = 2;
            GraphicsPathCommand.CURVE_TO = 3;
            GraphicsPathCommand.WIDE_MOVE_TO = 4;
            GraphicsPathCommand.WIDE_LINE_TO = 5;
            GraphicsPathCommand.CUBIC_CURVE_TO = 6;
            return GraphicsPathCommand;
        }());
        display.GraphicsPathCommand = GraphicsPathCommand;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GraphicsPathCommand.js.map