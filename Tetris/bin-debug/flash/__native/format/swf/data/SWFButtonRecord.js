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
                    data_1.BlendMode = flash.__native.format.swf.data.consts.BlendMode;
                    data_1.IFilter = flash.__native.format.swf.data.filters.IFilter;
                    data_1.StringUtils = flash.__native.utils.StringUtils;
                    var SWFButtonRecord = (function () {
                        function SWFButtonRecord(data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            this.hasBlendMode = false;
                            this.hasFilterList = false;
                            this.stateHitTest = false;
                            this.stateDown = false;
                            this.stateOver = false;
                            this.stateUp = false;
                            this.characterId = 0;
                            this.placeDepth = 0;
                            this.placeMatrix = null;
                            this.colorTransform = null;
                            this.blendMode = 0;
                            this._filterList = undefined;
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            this._filterList = new Array();
                            if (data != null) {
                                this.parse(data, level);
                            }
                        }
                        Object.defineProperty(SWFButtonRecord.prototype, "filterList", {
                            get: function () { return this._filterList; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFButtonRecord.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            var flags = data.readUI8();
                            this.stateHitTest = ((flags & 0x08) != 0);
                            this.stateDown = ((flags & 0x04) != 0);
                            this.stateOver = ((flags & 0x02) != 0);
                            this.stateUp = ((flags & 0x01) != 0);
                            this.characterId = data.readUI16();
                            this.placeDepth = data.readUI16();
                            this.placeMatrix = data.readMATRIX();
                            if (level >= 2) {
                                this.colorTransform = data.readCXFORMWITHALPHA();
                                this.hasFilterList = ((flags & 0x10) != 0);
                                if (this.hasFilterList) {
                                    var numberOfFilters = data.readUI8();
                                    for (var i = 0; i < numberOfFilters; i++) {
                                        this._filterList.push(data.readFILTER());
                                    }
                                }
                                this.hasBlendMode = ((flags & 0x20) != 0);
                                if (this.hasBlendMode) {
                                    this.blendMode = data.readUI8();
                                }
                            }
                        };
                        SWFButtonRecord.prototype.publish = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            var flags = 0;
                            if (level >= 2 && this.hasBlendMode) {
                                flags |= 0x20;
                            }
                            if (level >= 2 && this.hasFilterList) {
                                flags |= 0x10;
                            }
                            if (this.stateHitTest) {
                                flags |= 0x08;
                            }
                            if (this.stateDown) {
                                flags |= 0x04;
                            }
                            if (this.stateOver) {
                                flags |= 0x02;
                            }
                            if (this.stateUp) {
                                flags |= 0x01;
                            }
                            data.writeUI8(flags);
                            data.writeUI16(this.characterId);
                            data.writeUI16(this.placeDepth);
                            data.writeMATRIX(this.placeMatrix);
                            if (level >= 2) {
                                data.writeCXFORMWITHALPHA(this.colorTransform);
                                if (this.hasFilterList) {
                                    var numberOfFilters = ((this.filterList.length) >>> 0);
                                    data.writeUI8(numberOfFilters);
                                    for (var i = 0; i < numberOfFilters; i++) {
                                        data.writeFILTER(this.filterList[i]);
                                    }
                                }
                                if (this.hasBlendMode) {
                                    data.writeUI8(this.blendMode);
                                }
                            }
                        };
                        SWFButtonRecord.prototype.clone = function () {
                            var data = new SWFButtonRecord();
                            data.hasBlendMode = this.hasBlendMode;
                            data.hasFilterList = this.hasFilterList;
                            data.stateHitTest = this.stateHitTest;
                            data.stateDown = this.stateDown;
                            data.stateOver = this.stateOver;
                            data.stateUp = this.stateUp;
                            data.characterId = this.characterId;
                            data.placeDepth = this.placeDepth;
                            data.placeMatrix = this.placeMatrix.clone();
                            if (this.colorTransform) {
                                data.colorTransform = as(this.colorTransform.clone(), data_1.SWFColorTransformWithAlpha);
                            }
                            for (var i = 0; i < this.filterList.length; i++) {
                                data.filterList.push(this.filterList[i].clone());
                            }
                            data.blendMode = this.blendMode;
                            return data;
                        };
                        SWFButtonRecord.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            var str = "Depth: " + this.placeDepth + ", CharacterID: " + this.characterId + ", States: ";
                            var states = [];
                            if (this.stateUp) {
                                states.push("up");
                            }
                            if (this.stateOver) {
                                states.push("over");
                            }
                            if (this.stateDown) {
                                states.push("down");
                            }
                            if (this.stateHitTest) {
                                states.push("hit");
                            }
                            str += states.join(",");
                            if (this.hasBlendMode) {
                                str += ", BlendMode: " + data_1.BlendMode.toString(this.blendMode);
                            }
                            if (this.placeMatrix && !this.placeMatrix.isIdentity()) {
                                str += "\n" + data_1.StringUtils.repeat(indent + 2) + "Matrix: " + this.placeMatrix;
                            }
                            if (this.colorTransform && !this.colorTransform.isIdentity()) {
                                str += "\n" + data_1.StringUtils.repeat(indent + 2) + "ColorTransform: " + this.colorTransform;
                            }
                            if (this.hasFilterList) {
                                str += "\n" + data_1.StringUtils.repeat(indent + 2) + "Filters:";
                                for (var i = 0; i < this.filterList.length; i++) {
                                    str += "\n" + data_1.StringUtils.repeat(indent + 4) + "[" + i + "] " + this.filterList[i].toString(indent + 4);
                                }
                            }
                            return str;
                        };
                        return SWFButtonRecord;
                    }());
                    data_1.SWFButtonRecord = SWFButtonRecord;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFButtonRecord.js.map