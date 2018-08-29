var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var data;
                (function (data_1) {
                    data_1.SWFData = flash.__native.format.swf.SWFData;
                    var SWFAsset = (function () {
                        function SWFAsset(data) {
                            if (data === void 0) { data = null; }
                            this.characterId = 0;
                            this.name = null;
                            data = strict(data, data_1.SWFData);
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        SWFAsset.create = function (characterId, name) {
                            characterId = ((characterId) >>> 0);
                            name = as(name, 'String');
                            var swfSymbol = new SWFAsset;
                            swfSymbol.characterId = characterId;
                            swfSymbol.name = name;
                            return swfSymbol;
                        };
                        SWFAsset.prototype.parse = function (data) {
                            data = strict(data, data_1.SWFData);
                            this.characterId = data.readUI16();
                            this.name = data.readString();
                        };
                        SWFAsset.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            data.writeUI16(this.characterId);
                            data.writeString(this.name);
                        };
                        SWFAsset.prototype.toString = function () {
                            return "CharacterID: " + this.characterId + ", Name: " + this.name;
                        };
                        return SWFAsset;
                    }());
                    data_1.SWFAsset = SWFAsset;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFAsset.js.map