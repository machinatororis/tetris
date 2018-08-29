var flash;
(function (flash) {
    var sampler;
    (function (sampler) {
        function getSize(o) {
            var bytes = 0;
            return sizeOf.__bind(this)(o);
            function sizeOf(obj) {
                if (obj !== null && obj !== undefined) {
                    switch (typeof obj) {
                        case 'number':
                            bytes += 8;
                            break;
                        case 'string':
                            bytes += obj.length * 2;
                            break;
                        case 'boolean':
                            bytes += 4;
                            break;
                        case 'object':
                            var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                            if (objClass == 'Object' || objClass == 'Array') {
                                var __for0 = window.asc.in(obj);
                                for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                                    var key = __for0_1[_i];
                                    if (!obj.hasOwnProperty(key))
                                        continue;
                                    sizeOf.__bind(this)(obj[key]);
                                }
                            }
                            else
                                bytes += obj.toString().length * 2;
                            break;
                    }
                }
                return bytes;
            }
        }
        sampler.getSize = getSize;
    })(sampler = flash.sampler || (flash.sampler = {}));
})(flash || (flash = {}));
//# sourceMappingURL=getSize.js.map