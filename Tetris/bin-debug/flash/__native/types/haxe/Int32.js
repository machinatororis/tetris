var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var types;
        (function (types) {
            var haxe;
            (function (haxe) {
                var Int32 = (function () {
                    function Int32(x) {
                        this.x = 0;
                        x = ((x) >> 0);
                        this.x = x;
                    }
                    Int32.make = function (a, b) {
                        a = ((a) >> 0);
                        b = ((b) >> 0);
                        return new Int32((a << 16) | b);
                    };
                    Int32.prototype.ofInt = function () {
                        return this;
                    };
                    Int32.prototype.toInt = function () {
                        return this.x;
                    };
                    Int32.prototype.add = function (b) {
                        b = strict(b, Int32);
                        return new Int32(this.x + b.x);
                    };
                    Int32.prototype.sub = function (b) {
                        b = strict(b, Int32);
                        return new Int32(this.x - b.x);
                    };
                    Int32.prototype.mul = function (b) {
                        b = strict(b, Int32);
                        return new Int32(this.x * b.x);
                    };
                    Int32.prototype.div = function (b) {
                        b = strict(b, Int32);
                        return new Int32(this.x / b.x);
                    };
                    Int32.prototype.mod = function (b) {
                        b = strict(b, Int32);
                        return new Int32(this.x % b.x);
                    };
                    Int32.prototype.shl = function (b) {
                        b = ((b) >> 0);
                        return new Int32(this.x << b);
                    };
                    Int32.prototype.shr = function (b) {
                        b = ((b) >> 0);
                        return new Int32(this.x >> b);
                    };
                    Int32.prototype.ushr = function (b) {
                        b = ((b) >> 0);
                        return new Int32(this.x >>> b);
                    };
                    Int32.prototype.and = function (b) {
                        b = strict(b, Int32);
                        return new Int32(this.x & b.x);
                    };
                    Int32.prototype.or = function (b) {
                        b = strict(b, Int32);
                        return new Int32(this.x | b.x);
                    };
                    Int32.prototype.xor = function (b) {
                        b = strict(b, Int32);
                        return new Int32(this.x ^ b.x);
                    };
                    Int32.neg = function (a) {
                        a = strict(a, Int32);
                        return new Int32(-a.x);
                    };
                    Int32.prototype.isNeg = function () {
                        return this.x < 0;
                    };
                    Int32.prototype.isZero = function () {
                        return this.x == 0;
                    };
                    Int32.complement = function (a) {
                        a = strict(a, Int32);
                        return new Int32(~a.x);
                    };
                    Int32.compare = function (a, b) {
                        a = strict(a, Int32);
                        b = strict(b, Int32);
                        return a.x - b.x;
                    };
                    Int32.ucompare = function (a, b) {
                        a = strict(a, Int32);
                        b = strict(b, Int32);
                        if (a.isNeg())
                            return b.isNeg() ? Int32.compare(Int32.complement(b), Int32.complement(a)) : 1;
                        return b.isNeg() ? -1 : Int32.compare(a, b);
                    };
                    return Int32;
                }());
                haxe.Int32 = Int32;
            })(haxe = types.haxe || (types.haxe = {}));
        })(types = __native.types || (__native.types = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Int32.js.map