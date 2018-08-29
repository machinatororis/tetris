var flash;
(function (flash) {
    var display;
    (function (display) {
        var GraphicsStroke = (function () {
            function GraphicsStroke(thickness, pixelHinting, scaleMode, caps, joints, miterLimit, fill) {
                if (thickness === void 0) { thickness = NaN; }
                if (pixelHinting === void 0) { pixelHinting = false; }
                if (scaleMode === void 0) { scaleMode = "normal"; }
                if (caps === void 0) { caps = "none"; }
                if (joints === void 0) { joints = "round"; }
                if (miterLimit === void 0) { miterLimit = 3.0; }
                if (fill === void 0) { fill = null; }
                this.implements_flash_display_IGraphicsData = null;
                this.implements_flash_display_IGraphicsStroke = null;
                this.thickness = NaN;
                this.pixelHinting = false;
                this.miterLimit = NaN;
                this.fill = null;
                this.caps = null;
                this.joints = null;
                this.scaleMode = null;
                thickness = (+(thickness));
                pixelHinting = Boolean(pixelHinting);
                scaleMode = as(scaleMode, 'String');
                caps = as(caps, 'String');
                joints = as(joints, 'String');
                miterLimit = (+(miterLimit));
                fill = strict(fill, 'implements_flash_display_IGraphicsFill');
                this.thickness = thickness;
                this.pixelHinting = pixelHinting;
                this.caps = caps;
                this.joints = joints;
                this.miterLimit = miterLimit;
                this.scaleMode = scaleMode;
                this.fill = fill;
            }
            return GraphicsStroke;
        }());
        display.GraphicsStroke = GraphicsStroke;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GraphicsStroke.js.map