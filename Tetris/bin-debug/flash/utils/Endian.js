var flash;
(function (flash) {
    var utils;
    (function (utils) {
        var Endian = (function () {
            function Endian() {
            }
            Endian.BIG_ENDIAN = "bigEndian";
            Endian.LITTLE_ENDIAN = "littleEndian";
            return Endian;
        }());
        utils.Endian = Endian;
    })(utils = flash.utils || (flash.utils = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Endian.js.map