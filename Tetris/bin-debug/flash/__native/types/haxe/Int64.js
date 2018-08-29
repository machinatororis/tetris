var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var types;
        (function (types) {
            var haxe;
            (function (haxe) {
                var Int64 = (function () {
                    function Int64(high, low) {
                        this.high = null;
                        this.low = null;
                        high = strict(high, haxe.Int32);
                        low = strict(low, haxe.Int32);
                        this.high = high;
                        this.low = low;
                    }
                    Int64.prototype.toString = function () {
                        var str = '';
                        var neg = false;
                        var i = this;
                        if (Int64.isNeg(i)) {
                            neg = true;
                            i = Int64.neg(i);
                        }
                        var ten = Int64.ofInt(10);
                        while (!Int64.isZero(i)) {
                            var r = Int64.divMod(i, ten);
                            str = r.modulus.low.toInt() + str;
                            i = strict(r.quotient, Int64);
                        }
                        if (neg)
                            str = "-" + str;
                        return str == '' ? '0' : str;
                    };
                    Int64.make = function (high, low) {
                        high = ((high) >> 0);
                        low = ((low) >> 0);
                        return new Int64(new haxe.Int32(high), new haxe.Int32(low));
                    };
                    Int64.ofInt = function (x) {
                        x = ((x) >> 0);
                        return new Int64(new haxe.Int32(x >> 31), new haxe.Int32(x));
                    };
                    Int64.ofInt32 = function (x) {
                        x = strict(x, haxe.Int32);
                        return new Int64(x.shr(31), x);
                    };
                    Int64.toInt = function (x) {
                        x = strict(x, Int64);
                        if (x.high.toInt() != 0) {
                            if (x.high.isNeg())
                                return -Int64.toInt(Int64.neg(x));
                            throw "Overflow";
                        }
                        return x.low.toInt();
                    };
                    Int64.getLow = function (x) {
                        x = strict(x, Int64);
                        return x.low;
                    };
                    Int64.getHigh = function (x) {
                        x = strict(x, Int64);
                        return x.high;
                    };
                    Int64.add = function (a, b) {
                        a = strict(a, Int64);
                        b = strict(b, Int64);
                        var high = a.high.add(b.high);
                        var low = a.low.add(b.low);
                        if (haxe.Int32.ucompare(low, a.low) < 0)
                            high = high.add(new haxe.Int32(1));
                        return new Int64(high, low);
                    };
                    Int64.sub = function (a, b) {
                        a = strict(a, Int64);
                        b = strict(b, Int64);
                        var high = a.high.sub(b.high);
                        var low = a.low.sub(b.low);
                        if (haxe.Int32.ucompare(a.low, b.low) < 0)
                            high = high.sub(new haxe.Int32(1));
                        return new Int64(high, low);
                    };
                    Int64.mul = function (a, b) {
                        a = strict(a, Int64);
                        b = strict(b, Int64);
                        var mask = new haxe.Int32(0xFFFF);
                        var al = a.low.and(mask), ah = a.low.ushr(16);
                        var bl = b.low.and(mask), bh = b.low.ushr(16);
                        var p00 = al.mul(bl);
                        var p10 = ah.mul(bl);
                        var p01 = al.mul(bh);
                        var p11 = ah.mul(bh);
                        var low = p00;
                        var high = p11.add(p01.ushr(16)).add(p10.ushr(16));
                        p01 = p01.shl(16);
                        low = low.add(p01);
                        if (haxe.Int32.ucompare(low, p01) < 0)
                            high = high.add(new haxe.Int32(1));
                        p10 = p10.shl(16);
                        low = low.add(p10);
                        if (haxe.Int32.ucompare(low, p10) < 0)
                            high = high.add(new haxe.Int32(1));
                        high = high.add(a.low.mul(b.high));
                        high = high.add(a.high.mul(b.low));
                        return new Int64(high, low);
                    };
                    Int64.divMod = function (modulus, divisor) {
                        modulus = strict(modulus, Int64);
                        divisor = strict(divisor, Int64);
                        var quotient = new Int64(new haxe.Int32(0), new haxe.Int32(0));
                        var mask = new Int64(new haxe.Int32(0), new haxe.Int32(1));
                        divisor = new Int64(divisor.high, divisor.low);
                        while (!divisor.high.isNeg()) {
                            var cmp = Int64.ucompare(divisor, modulus);
                            divisor.high = divisor.high.shl(1).or(divisor.low.ushr(31));
                            divisor.low = divisor.low.shl(1);
                            mask.high = mask.high.shl(1).or(mask.low.ushr(31));
                            mask.low = mask.low.shl(1);
                            if (cmp >= 0)
                                break;
                        }
                        while (!mask.low.or(mask.high).isZero()) {
                            if (Int64.ucompare(modulus, divisor) >= 0) {
                                quotient.high = quotient.high.or(mask.high);
                                quotient.low = quotient.low.or(mask.low);
                                modulus = Int64.sub(modulus, divisor);
                            }
                            mask.low = mask.low.ushr(1).or(mask.high.shl(31));
                            mask.high = mask.high.ushr(1);
                            divisor.low = divisor.low.ushr(1).or(divisor.high.shl(31));
                            divisor.high = divisor.high.ushr(1);
                        }
                        return { quotient: quotient, modulus: modulus };
                    };
                    Int64.div = function (a, b) {
                        a = strict(a, Int64);
                        b = strict(b, Int64);
                        var sign = a.high.or(b.high).isNeg();
                        if (a.high.isNeg())
                            a = Int64.neg(a);
                        if (b.high.isNeg())
                            b = Int64.neg(b);
                        var q = strict(Int64.divMod(a, b).quotient, Int64);
                        return sign ? Int64.neg(q) : q;
                    };
                    Int64.mod = function (a, b) {
                        a = strict(a, Int64);
                        b = strict(b, Int64);
                        var sign = a.high.or(b.high).isNeg();
                        if (a.high.isNeg())
                            a = Int64.neg(a);
                        if (b.high.isNeg())
                            b = Int64.neg(b);
                        var m = strict(Int64.divMod(a, b).modulus, Int64);
                        return sign ? Int64.neg(m) : m;
                    };
                    Int64.shl = function (a, b) {
                        a = strict(a, Int64);
                        b = ((b) >> 0);
                        if (b & 63 == 0)
                            return a;
                        else if (b & 63 < 32)
                            return new Int64(a.high.shl(b).or(a.low.ushr(32 - (b & 63))), a.low.shl(b));
                        else
                            return new Int64(a.low.shl(b - 32), new haxe.Int32(0));
                    };
                    Int64.shr = function (a, b) {
                        a = strict(a, Int64);
                        b = ((b) >> 0);
                        if (b & 63 == 0)
                            return a;
                        else if (b & 63 < 32)
                            return new Int64(a.high.shr(b), a.low.ushr(b).or(a.high.shl(32 - (b & 63))));
                        else
                            return new Int64(a.high.shr(31), a.high.shr(b - 32));
                    };
                    Int64.ushr = function (a, b) {
                        a = strict(a, Int64);
                        b = ((b) >> 0);
                        if (b & 63 == 0)
                            return a;
                        else if (b & 63 < 32)
                            return new Int64(a.high.ushr(b), a.low.ushr(b).or(a.high.shl(32 - (b & 63))));
                        else
                            return new Int64(new haxe.Int32(0), a.high.ushr(b - 32));
                    };
                    Int64.and = function (a, b) {
                        a = strict(a, Int64);
                        b = strict(b, Int64);
                        return new Int64(a.high.and(b.high), a.low.and(b.low));
                    };
                    Int64.or = function (a, b) {
                        a = strict(a, Int64);
                        b = strict(b, Int64);
                        return new Int64(a.high.or(b.high), a.low.or(b.low));
                    };
                    Int64.xor = function (a, b) {
                        a = strict(a, Int64);
                        b = strict(b, Int64);
                        return new Int64(a.high.xor(b.high), a.low.xor(b.low));
                    };
                    Int64.neg = function (a) {
                        a = strict(a, Int64);
                        var high = haxe.Int32.complement(a.high);
                        var low = haxe.Int32.neg(a.low);
                        if (low.isZero())
                            high = high.add(new haxe.Int32(1));
                        return new Int64(high, low);
                    };
                    Int64.isNeg = function (a) {
                        a = strict(a, Int64);
                        return a.high.isNeg();
                    };
                    Int64.isZero = function (a) {
                        a = strict(a, Int64);
                        return a.high.or(a.low).isZero();
                    };
                    Int64.compare = function (a, b) {
                        a = strict(a, Int64);
                        b = strict(b, Int64);
                        var v = haxe.Int32.compare(a.high, b.high);
                        if (v != 0)
                            return v;
                        else
                            return haxe.Int32.ucompare(a.low, b.low);
                    };
                    Int64.ucompare = function (a, b) {
                        a = strict(a, Int64);
                        b = strict(b, Int64);
                        var v = haxe.Int32.ucompare(a.high, b.high);
                        if (v != 0)
                            return v;
                        else
                            return haxe.Int32.ucompare(a.low, b.low);
                    };
                    return Int64;
                }());
                haxe.Int64 = Int64;
            })(haxe = types.haxe || (types.haxe = {}));
        })(types = __native.types || (__native.types = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Int64.js.map