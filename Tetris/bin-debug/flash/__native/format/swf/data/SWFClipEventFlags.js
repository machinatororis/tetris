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
                    var SWFClipEventFlags = (function () {
                        function SWFClipEventFlags(data, version) {
                            if (data === void 0) { data = null; }
                            if (version === void 0) { version = 0; }
                            this.keyUpEvent = false;
                            this.keyDownEvent = false;
                            this.mouseUpEvent = false;
                            this.mouseDownEvent = false;
                            this.mouseMoveEvent = false;
                            this.unloadEvent = false;
                            this.enterFrameEvent = false;
                            this.loadEvent = false;
                            this.dragOverEvent = false;
                            this.rollOutEvent = false;
                            this.rollOverEvent = false;
                            this.releaseOutsideEvent = false;
                            this.releaseEvent = false;
                            this.pressEvent = false;
                            this.initializeEvent = false;
                            this.dataEvent = false;
                            this.constructEvent = false;
                            this.keyPressEvent = false;
                            this.dragOutEvent = false;
                            data = strict(data, data_1.SWFData);
                            version = ((version) >>> 0);
                            if (data != null) {
                                this.parse(data, version);
                            }
                        }
                        SWFClipEventFlags.prototype.parse = function (data, version) {
                            data = strict(data, data_1.SWFData);
                            version = ((version) >>> 0);
                            var flags1 = data.readUI8();
                            this.keyUpEvent = ((flags1 & 0x80) != 0);
                            this.keyDownEvent = ((flags1 & 0x40) != 0);
                            this.mouseUpEvent = ((flags1 & 0x20) != 0);
                            this.mouseDownEvent = ((flags1 & 0x10) != 0);
                            this.mouseMoveEvent = ((flags1 & 0x08) != 0);
                            this.unloadEvent = ((flags1 & 0x04) != 0);
                            this.enterFrameEvent = ((flags1 & 0x02) != 0);
                            this.loadEvent = ((flags1 & 0x01) != 0);
                            var flags2 = data.readUI8();
                            this.dragOverEvent = ((flags2 & 0x80) != 0);
                            this.rollOutEvent = ((flags2 & 0x40) != 0);
                            this.rollOverEvent = ((flags2 & 0x20) != 0);
                            this.releaseOutsideEvent = ((flags2 & 0x10) != 0);
                            this.releaseEvent = ((flags2 & 0x08) != 0);
                            this.pressEvent = ((flags2 & 0x04) != 0);
                            this.initializeEvent = ((flags2 & 0x02) != 0);
                            this.dataEvent = ((flags2 & 0x01) != 0);
                            if (version >= 6) {
                                var flags3 = data.readUI8();
                                this.constructEvent = ((flags3 & 0x04) != 0);
                                this.keyPressEvent = ((flags3 & 0x02) != 0);
                                this.dragOutEvent = ((flags3 & 0x01) != 0);
                                data.readUI8();
                            }
                        };
                        SWFClipEventFlags.prototype.publish = function (data, version) {
                            data = strict(data, data_1.SWFData);
                            version = ((version) >>> 0);
                            var flags1 = 0;
                            if (this.keyUpEvent) {
                                flags1 |= 0x80;
                            }
                            if (this.keyDownEvent) {
                                flags1 |= 0x40;
                            }
                            if (this.mouseUpEvent) {
                                flags1 |= 0x20;
                            }
                            if (this.mouseDownEvent) {
                                flags1 |= 0x10;
                            }
                            if (this.mouseMoveEvent) {
                                flags1 |= 0x08;
                            }
                            if (this.unloadEvent) {
                                flags1 |= 0x04;
                            }
                            if (this.enterFrameEvent) {
                                flags1 |= 0x02;
                            }
                            if (this.loadEvent) {
                                flags1 |= 0x01;
                            }
                            data.writeUI8(flags1);
                            var flags2 = 0;
                            if (this.dragOverEvent) {
                                flags2 |= 0x80;
                            }
                            if (this.rollOutEvent) {
                                flags2 |= 0x40;
                            }
                            if (this.rollOverEvent) {
                                flags2 |= 0x20;
                            }
                            if (this.releaseOutsideEvent) {
                                flags2 |= 0x10;
                            }
                            if (this.releaseEvent) {
                                flags2 |= 0x08;
                            }
                            if (this.pressEvent) {
                                flags2 |= 0x04;
                            }
                            if (this.initializeEvent) {
                                flags2 |= 0x02;
                            }
                            if (this.dataEvent) {
                                flags2 |= 0x01;
                            }
                            data.writeUI8(flags2);
                            if (version >= 6) {
                                var flags3 = 0;
                                if (this.constructEvent) {
                                    flags3 |= 0x04;
                                }
                                if (this.keyPressEvent) {
                                    flags3 |= 0x02;
                                }
                                if (this.dragOutEvent) {
                                    flags3 |= 0x01;
                                }
                                data.writeUI8(flags3);
                                data.writeUI8(0);
                            }
                        };
                        SWFClipEventFlags.prototype.toString = function () {
                            var a = [];
                            if (this.keyUpEvent) {
                                a.push("keyup");
                            }
                            if (this.keyDownEvent) {
                                a.push("keydown");
                            }
                            if (this.mouseUpEvent) {
                                a.push("mouseup");
                            }
                            if (this.mouseDownEvent) {
                                a.push("mousedown");
                            }
                            if (this.mouseMoveEvent) {
                                a.push("mousemove");
                            }
                            if (this.unloadEvent) {
                                a.push("unload");
                            }
                            if (this.enterFrameEvent) {
                                a.push("enterframe");
                            }
                            if (this.loadEvent) {
                                a.push("load");
                            }
                            if (this.dragOverEvent) {
                                a.push("dragover");
                            }
                            if (this.rollOutEvent) {
                                a.push("rollout");
                            }
                            if (this.rollOverEvent) {
                                a.push("rollover");
                            }
                            if (this.releaseOutsideEvent) {
                                a.push("releaseoutside");
                            }
                            if (this.releaseEvent) {
                                a.push("release");
                            }
                            if (this.pressEvent) {
                                a.push("press");
                            }
                            if (this.initializeEvent) {
                                a.push("initialize");
                            }
                            if (this.dataEvent) {
                                a.push("data");
                            }
                            if (this.constructEvent) {
                                a.push("construct");
                            }
                            if (this.keyPressEvent) {
                                a.push("keypress");
                            }
                            if (this.dragOutEvent) {
                                a.push("dragout");
                            }
                            return a.join(",");
                        };
                        return SWFClipEventFlags;
                    }());
                    data_1.SWFClipEventFlags = SWFClipEventFlags;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFClipEventFlags.js.map