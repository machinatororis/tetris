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
    var filters;
    (function (filters) {
        filters.WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
        filters.BitmapData = flash.display.BitmapData;
        filters.BlendMode = flash.display.BlendMode;
        filters.Context3D = flash.display3D.Context3D;
        filters.Context3DProgramType = flash.display3D.Context3DProgramType;
        filters.TextureBase = flash.display3D.textures.TextureBase;
        filters.Rectangle = flash.geom.Rectangle;
        var DropShadowFilter = (function (_super) {
            __extends(DropShadowFilter, _super);
            function DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject) {
                if (distance === void 0) { distance = 4.0; }
                if (angle === void 0) { angle = 45; }
                if (color === void 0) { color = 0x0; }
                if (alpha === void 0) { alpha = 1.0; }
                if (blurX === void 0) { blurX = 4.0; }
                if (blurY === void 0) { blurY = 4.0; }
                if (strength === void 0) { strength = 1.0; }
                if (quality === void 0) { quality = 1; }
                if (inner === void 0) { inner = false; }
                if (knockout === void 0) { knockout = false; }
                if (hideObject === void 0) { hideObject = false; }
                var _this = this;
                distance = (+(distance));
                angle = (+(angle));
                color = ((color) >>> 0);
                alpha = (+(alpha));
                blurX = (+(blurX));
                blurY = (+(blurY));
                strength = (+(strength));
                quality = ((quality) >> 0);
                inner = Boolean(inner);
                knockout = Boolean(knockout);
                hideObject = Boolean(hideObject);
                _this.alpha === void 0 && (_this.alpha = NaN);
                _this.hideObject === void 0 && (_this.hideObject = false);
                _this.inner === void 0 && (_this.inner = false);
                _this.knockout === void 0 && (_this.knockout = false);
                _this.strength === void 0 && (_this.strength = NaN);
                _this.__red === void 0 && (_this.__red = NaN);
                _this.__green === void 0 && (_this.__green = NaN);
                _this.__blue === void 0 && (_this.__blue = NaN);
                _this.__color === void 0 && (_this.__color = NaN);
                _this.__angle === void 0 && (_this.__angle = NaN);
                _this.__distance === void 0 && (_this.__distance = NaN);
                _this.__dataColor === void 0 && (_this.__dataColor = undefined);
                _this.__dataMath === void 0 && (_this.__dataMath = undefined);
                _this = _super.call(this, blurX, blurY, quality) || this;
                _this.distance = distance;
                _this.angle = angle;
                _this.color = color;
                _this.alpha = alpha;
                _this.strength = strength;
                _this.inner = inner;
                _this.knockout = knockout;
                _this.hideObject = hideObject;
                _this.__dataColor = [0.0, 0.0, 0.0, 0.0];
                _this.__dataMath = [0.0, 0.0, 0.0, 0.0];
                return _this;
            }
            Object.defineProperty(DropShadowFilter.prototype, "angle", {
                get: function () { return this.__angle; },
                set: function (value) {
                    value = (+(value));
                    this.__angle = (value % 360 + 360) % 360;
                    this.__setOffset(this.__distance, this.__angle);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DropShadowFilter.prototype, "color", {
                get: function () { return this.__color; },
                set: function (value) {
                    value = ((value) >>> 0);
                    this.__color = value;
                    this.__red = (value >> 16 & 0xFF) / 255;
                    this.__green = (value >> 8 & 0xFF) / 255;
                    this.__blue = (value & 0xFF) / 255;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DropShadowFilter.prototype, "distance", {
                get: function () { return this.__distance; },
                set: function (value) {
                    value = (+(value));
                    this.__distance = value;
                    this.__setOffset(this.__distance, this.__angle);
                },
                enumerable: true,
                configurable: true
            });
            DropShadowFilter.prototype.clone = function () {
                return new DropShadowFilter(this.distance, this.angle, this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout, this.hideObject);
            };
            DropShadowFilter.prototype.__bounds = function (rect) {
                rect = rect || new filters.Rectangle;
                if (this.inner)
                    return rect;
                _super.prototype.__bounds.call(this, rect);
                rect.offset(this.__offsetX, this.__offsetY);
                if (rect.left > 0)
                    rect.left = 0;
                if (rect.top > 0)
                    rect.top = 0;
                return rect;
            };
            DropShadowFilter.prototype.__getHash = function () {
                return this.__fixedHash || [this.distance, this.angle, this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout, this.hideObject].toString();
            };
            DropShadowFilter.prototype.__apply = function (ctx, target, useSystemBuffers) {
                if (useSystemBuffers === void 0) { useSystemBuffers = false; }
                var width = target._systemWidth || target._width, height = target._systemHeight || target._height, transparent = target._transparent;
                var resultBuff = _super.prototype.__apply.call(this, ctx, target, useSystemBuffers);
                if (!this.hideObject || this.inner) {
                    ctx.saveAndReset().clipRect(0, 0, width, height);
                    if (this.inner) {
                        ctx.blendMode(this.hideObject || this.knockout ? filters.BlendMode.ALPHA : filters.BlendMode.INTERSECT_INTERCHANGE);
                    }
                    else {
                        ctx.blendMode(this.knockout ? filters.BlendMode.ERASE : filters.BlendMode.NORMAL);
                    }
                    ctx.setRenderToBitmapData(resultBuff);
                    ctx.drawImage(target);
                    ctx.restore();
                }
                return resultBuff;
            };
            DropShadowFilter.prototype.__setup = function (ctx, texture, pass) {
                if (pass === void 0) { pass = 0; }
                _super.prototype.__setup.call(this, ctx, texture, pass);
                var context = ctx.context;
                var singlePass = this.blurX <= 0 || this.blurY <= 0;
                if (pass == 0) {
                    this.__dataColor[0] = this.__red;
                    this.__dataColor[1] = this.__green;
                    this.__dataColor[2] = this.__blue;
                    this.__dataColor[3] = this.alpha;
                    this.__dataMath[0] = 1.0;
                    this.__dataMath[1] = 1.0;
                    this.__dataMath[2] = this.inner ? 1.0 : 0.0;
                    if (singlePass) {
                        this.__dataColor[3] *= this.strength;
                    }
                }
                else {
                    this.__dataColor[0] = 0.0;
                    this.__dataColor[1] = 0.0;
                    this.__dataColor[2] = 0.0;
                    this.__dataColor[3] = this.strength;
                    this.__dataMath[0] = 0.0;
                    this.__dataMath[1] = 1.0;
                    this.__dataMath[2] = 0.0;
                }
                context.__setProgramConstantsFromVector(filters.Context3DProgramType.FRAGMENT, 32, this.__dataMath, 1);
                context.__setProgramConstantsFromVector(filters.Context3DProgramType.FRAGMENT, 33, this.__dataColor, 1);
                return true;
            };
            DropShadowFilter.prototype.__privateShaderTemplate = function (type) {
                if (type == filters.Context3DProgramType.VERTEX)
                    return filters.BlurFilter.VERTEX_SHADER_TEMPLATE;
                else
                    return DropShadowFilter.FRAG_SHADER_TEMPLATE;
            };
            DropShadowFilter.prototype.__setOffset = function (distance, angle) {
                var r = angle * DropShadowFilter.DEG_TO_RAD;
                this.__offsetX = Math.cos(r) * distance;
                this.__offsetY = Math.sin(r) * distance;
            };
            DropShadowFilter.DEG_TO_RAD = asc.sti(DropShadowFilter, function () { DropShadowFilter.DEG_TO_RAD = Math.PI / 180; });
            DropShadowFilter.FRAG_SHADER_TEMPLATE = "precision lowp float;\n" +
                "uniform vec4 fc32;\n" +
                "uniform vec4 fc33;\n" +
                "uniform vec2 {{delta}};\n" +
                "uniform sampler2D fs0;\n" +
                "varying vec2 vUV;\n" +
                "void main(void) {\n" +
                " vec4 color = vec4(0.0);\n" +
                " float total = 0.0;\n" +
                " for (float t = -{{iterations}}; t <= {{iterations}}; t++) {\n" +
                "  float percent = t / {{iterations}};\n" +
                "  float weight = 1.0 - abs(percent);\n" +
                "  vec4 sample = texture2D(fs0, vUV + {{delta}} * percent);\n" +
                "  if (fc32[2] > 0.0) {\n" +
                "    sample.a = 1.0 - sample.a;\n" +
                "  }\n" +
                "  color += sample * weight;\n" +
                "  total += weight;\n" +
                " }\n" +
                " vec4 nc = color/total;\n" +
                " if (fc32[0] > 0.0 || fc32[1] > 0.0) {\n" +
                "  if (nc.a > 0.0) nc.rgb /= nc.a;\n" +
                "  if (fc32[0] > 0.0) {\n" +
                "    nc.rgb = fc33.rgb;\n" +
                "  }\n" +
                "  if (fc32[1] > 0.0) {\n" +
                "    nc.a *= fc33.a;\n" +
                "    if (nc.a > 1.0) nc.a = 1.0;\n" +
                "  }\n" +
                "  gl_FragColor = nc;\n" +
                "  gl_FragColor.rgb *= gl_FragColor.a;\n" +
                " } else {\n" +
                "  gl_FragColor = nc;\n" +
                " }\n" +
                "}";
            return DropShadowFilter;
        }(filters.BlurFilter));
        filters.DropShadowFilter = DropShadowFilter;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=DropShadowFilter.js.map