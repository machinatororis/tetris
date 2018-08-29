var flash;
(function (flash) {
    var net;
    (function (net) {
        net.AMF = flash.__native.format.amf.AMF;
        function getAliasByClass(classObject) {
            return net.AMF.classMap.get(classObject);
        }
        net.getAliasByClass = getAliasByClass;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=getAliasByClass.js.map