var flash;
(function (flash) {
    var display;
    (function (display) {
        var GraphicsPath = (function () {
            function GraphicsPath(commands, data, winding) {
                if (commands === void 0) { commands = null; }
                if (data === void 0) { data = null; }
                if (winding === void 0) { winding = "evenOdd"; }
                this.implements_flash_display_IGraphicsData = null;
                this.implements_flash_display_IGraphicsPath = null;
                this.commands = undefined;
                this.data = undefined;
                this.winding = null;
                winding = as(winding, 'String');
                this.commands = commands || new Array;
                this.data = data || new Array;
                this.winding = winding;
            }
            GraphicsPath.prototype.clear = function () {
                this.commands.length = 0;
                this.data.length = 0;
            };
            GraphicsPath.prototype.moveTo = function (x, y) {
                x = (+(x));
                y = (+(y));
                this.commands.push(display.GraphicsPathCommand.MOVE_TO);
                this.data.push(x, y);
            };
            GraphicsPath.prototype.lineTo = function (x, y) {
                x = (+(x));
                y = (+(y));
                this.commands.push(display.GraphicsPathCommand.LINE_TO);
                this.data.push(x, y);
            };
            GraphicsPath.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
                controlX = (+(controlX));
                controlY = (+(controlY));
                anchorX = (+(anchorX));
                anchorY = (+(anchorY));
                this.commands.push(display.GraphicsPathCommand.CURVE_TO);
                this.data.push(controlX, controlY, anchorX, anchorY);
            };
            GraphicsPath.prototype.cubicCurveTo = function (controlX1, controlY1, controlX2, controlY2, anchorX, anchorY) {
                controlX1 = (+(controlX1));
                controlY1 = (+(controlY1));
                controlX2 = (+(controlX2));
                controlY2 = (+(controlY2));
                anchorX = (+(anchorX));
                anchorY = (+(anchorY));
                this.commands.push(display.GraphicsPathCommand.CUBIC_CURVE_TO);
                this.data.push(controlX1, controlY1, controlX2, controlY2, anchorX, anchorY);
            };
            GraphicsPath.prototype.wideLineTo = function (x, y) {
                x = (+(x));
                y = (+(y));
                this.commands.push(display.GraphicsPathCommand.WIDE_LINE_TO);
                this.data.push(0.0, 0.0, x, y);
            };
            GraphicsPath.prototype.wideMoveTo = function (x, y) {
                x = (+(x));
                y = (+(y));
                this.commands.push(display.GraphicsPathCommand.WIDE_MOVE_TO);
                this.data.push(0.0, 0.0, x, y);
            };
            return GraphicsPath;
        }());
        display.GraphicsPath = GraphicsPath;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GraphicsPath.js.map