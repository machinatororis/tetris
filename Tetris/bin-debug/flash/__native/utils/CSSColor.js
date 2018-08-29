var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var utils;
        (function (utils) {
            utils.ColorTransform = flash.geom.ColorTransform;
            var CSSColor = (function () {
                function CSSColor() {
                }
                CSSColor.keywordToHex = function (predefinedColor) {
                    predefinedColor = as(predefinedColor, 'String');
                    if (!CSSColor.sDiv) {
                        CSSColor.sDiv = document.createElement('div');
                        document.body.appendChild(CSSColor.sDiv);
                    }
                    CSSColor.sDiv.style.backgroundColor = predefinedColor;
                    return CSSColor.rgbToHex(window.getComputedStyle(CSSColor.sDiv).backgroundColor);
                };
                CSSColor.rgbToHex = function (rgb) {
                    rgb = as(rgb, 'String');
                    var regex = /rgb *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3}) *\)/;
                    var values = regex.exec(rgb) || '';
                    if (values.length != 4) {
                        return 0x0;
                    }
                    var r = parseFloat(values[1]) | 0;
                    var g = parseFloat(values[2]) | 0;
                    var b = parseFloat(values[3]) | 0;
                    return r << 16 | g << 8 | b;
                };
                CSSColor.stringToHex = function (color) {
                    color = as(color, 'String');
                    return parseInt('0x' + ((color || '').replace('#', '').replace('0x', '')));
                };
                CSSColor.hexToString = function (color, alpha, ct) {
                    if (alpha === void 0) { alpha = 1.0; }
                    if (ct === void 0) { ct = null; }
                    color = ((color) >>> 0);
                    alpha = (+(alpha));
                    ct = strict(ct, utils.ColorTransform);
                    var r = ((color >> 16 & 0xff) >>> 0);
                    var g = ((color >> 8 & 0xff) >>> 0);
                    var b = ((color & 0xff) >>> 0);
                    if (ct) {
                        r = ((r * ct.redMultiplier + ct.redOffset) >>> 0);
                        g = ((g * ct.greenMultiplier + ct.greenOffset) >>> 0);
                        b = ((b * ct.blueMultiplier + ct.blueOffset) >>> 0);
                        alpha = alpha * ct.alphaMultiplier + ct.alphaOffset;
                    }
                    if (alpha == 1.0) {
                        return "rgb(" + r + "," + g + "," + b + ")";
                    }
                    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
                };
                CSSColor.ActiveBorder = 'ActiveBorder';
                CSSColor.ActiveCaption = 'ActiveCaption';
                CSSColor.AppWorkspace = 'AppWorkspace';
                CSSColor.Background = 'Background';
                CSSColor.ButtonFace = 'ButtonFace';
                CSSColor.ButtonHighlight = 'ButtonHighlight';
                CSSColor.ButtonShadow = 'ButtonShadow';
                CSSColor.ButtonText = 'ButtonText';
                CSSColor.CaptionText = 'CaptionText';
                CSSColor.GrayText = 'GrayText';
                CSSColor.Highlight = 'Highlight';
                CSSColor.HighlightText = 'HighlightText';
                CSSColor.InactiveBorder = 'InactiveBorder';
                CSSColor.InactiveCaption = 'InactiveCaption';
                CSSColor.InactiveCaptionText = 'InactiveCaptionText';
                CSSColor.InfoBackground = 'InfoBackground';
                CSSColor.InfoText = 'InfoText';
                CSSColor.Menu = 'Menu';
                CSSColor.MenuText = 'MenuText';
                CSSColor.Scrollbar = 'Scrollbar';
                CSSColor.ThreeDDarkShadow = 'ThreeDDarkShadow';
                CSSColor.ThreeDFace = 'ThreeDFace';
                CSSColor.ThreeDHighlight = 'ThreeDHighlight';
                CSSColor.ThreeDLightShadow = 'ThreeDLightShadow';
                CSSColor.ThreeDShadow = 'ThreeDShadow';
                CSSColor.Window = 'Window';
                CSSColor.WindowFrame = 'WindowFrame';
                CSSColor.WindowText = 'WindowText';
                CSSColor.sDiv = null;
                return CSSColor;
            }());
            utils.CSSColor = CSSColor;
        })(utils = __native.utils || (__native.utils = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=CSSColor.js.map