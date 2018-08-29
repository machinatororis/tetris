var flash;
(function (flash) {
    var geom;
    (function (geom) {
        var ColorTransform = (function () {
            function ColorTransform(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
                if (redMultiplier === void 0) { redMultiplier = 1.0; }
                if (greenMultiplier === void 0) { greenMultiplier = 1.0; }
                if (blueMultiplier === void 0) { blueMultiplier = 1.0; }
                if (alphaMultiplier === void 0) { alphaMultiplier = 1.0; }
                if (redOffset === void 0) { redOffset = 0; }
                if (greenOffset === void 0) { greenOffset = 0; }
                if (blueOffset === void 0) { blueOffset = 0; }
                if (alphaOffset === void 0) { alphaOffset = 0; }
                this.redOffset = NaN;
                this.greenOffset = NaN;
                this.blueOffset = NaN;
                this.alphaOffset = NaN;
                this.redMultiplier = NaN;
                this.greenMultiplier = NaN;
                this.blueMultiplier = NaN;
                this.alphaMultiplier = NaN;
                redMultiplier = (+(redMultiplier));
                greenMultiplier = (+(greenMultiplier));
                blueMultiplier = (+(blueMultiplier));
                alphaMultiplier = (+(alphaMultiplier));
                redOffset = (+(redOffset));
                greenOffset = (+(greenOffset));
                blueOffset = (+(blueOffset));
                alphaOffset = (+(alphaOffset));
                this.redMultiplier = redMultiplier;
                this.greenMultiplier = greenMultiplier;
                this.blueMultiplier = blueMultiplier;
                this.alphaMultiplier = alphaMultiplier;
                this.redOffset = redOffset;
                this.greenOffset = greenOffset;
                this.blueOffset = blueOffset;
                this.alphaOffset = alphaOffset;
            }
            Object.defineProperty(ColorTransform.prototype, "color", {
                get: function () {
                    return this.redOffset << 16 | this.greenOffset << 8 | this.blueOffset;
                },
                set: function (newColor) {
                    newColor = ((newColor) >>> 0);
                    this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 0;
                    this.redOffset = newColor >> 16 & 255;
                    this.greenOffset = newColor >> 8 & 255;
                    this.blueOffset = newColor & 255;
                },
                enumerable: true,
                configurable: true
            });
            ColorTransform.prototype.concat = function (second) {
                second = strict(second, ColorTransform);
                this.__concat(second);
            };
            ColorTransform.prototype.toString = function () {
                return "(redMultiplier=" + this.redMultiplier + ", greenMultiplier=" + this.greenMultiplier + ", blueMultiplier=" + this.blueMultiplier + ", alphaMultiplier=" + this.alphaMultiplier + ", redOffset=" + this.redOffset + ", greenOffset=" + this.greenOffset + ", blueOffset=" + this.blueOffset + ", alphaOffset=" + this.alphaOffset + ")";
            };
            ColorTransform.prototype.copyFrom = function (sourceTransform) {
                sourceTransform = strict(sourceTransform, ColorTransform);
                this.redMultiplier = sourceTransform.redMultiplier;
                this.greenMultiplier = sourceTransform.greenMultiplier;
                this.blueMultiplier = sourceTransform.blueMultiplier;
                this.alphaMultiplier = sourceTransform.alphaMultiplier;
                this.redOffset = sourceTransform.redOffset;
                this.greenOffset = sourceTransform.greenOffset;
                this.blueOffset = sourceTransform.blueOffset;
                this.alphaOffset = sourceTransform.alphaOffset;
            };
            ColorTransform.prototype.identity = function () {
                this.redMultiplier = this.greenMultiplier = this.blueMultiplier = this.alphaMultiplier = 1.0;
                this.redOffset = this.greenOffset = this.blueOffset = this.alphaOffset = 0;
            };
            Object.defineProperty(ColorTransform.prototype, "isIdentity", {
                get: function () {
                    return !this.isMultiplier && !this.isOffset;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorTransform.prototype, "isMultiplier", {
                get: function () {
                    return this.redMultiplier != 1 || this.greenMultiplier != 1 || this.blueMultiplier != 1 || this.alphaMultiplier != 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorTransform.prototype, "isOffset", {
                get: function () {
                    return this.redOffset != 0 || this.greenOffset != 0 || this.blueOffset != 0 || this.alphaOffset != 0;
                },
                enumerable: true,
                configurable: true
            });
            ColorTransform.prototype.__copyFrom = function (sourceTransform) {
                this.redMultiplier = sourceTransform.redMultiplier;
                this.greenMultiplier = sourceTransform.greenMultiplier;
                this.blueMultiplier = sourceTransform.blueMultiplier;
                this.alphaMultiplier = sourceTransform.alphaMultiplier;
                this.redOffset = sourceTransform.redOffset;
                this.greenOffset = sourceTransform.greenOffset;
                this.blueOffset = sourceTransform.blueOffset;
                this.alphaOffset = sourceTransform.alphaOffset;
            };
            ColorTransform.prototype.__concat = function (second) {
                this.alphaOffset += this.alphaMultiplier * second.alphaOffset;
                this.alphaMultiplier *= second.alphaMultiplier;
                this.redOffset += this.redMultiplier * second.redOffset;
                this.redMultiplier *= second.redMultiplier;
                this.greenOffset += this.greenMultiplier * second.greenOffset;
                this.greenMultiplier *= second.greenMultiplier;
                this.blueOffset += this.blueMultiplier * second.blueOffset;
                this.blueMultiplier *= second.blueMultiplier;
            };
            return ColorTransform;
        }());
        geom.ColorTransform = ColorTransform;
    })(geom = flash.geom || (flash.geom = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ColorTransform.js.map