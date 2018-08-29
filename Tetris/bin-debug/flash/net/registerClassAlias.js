var flash;
(function (flash) {
    var net;
    (function (net) {
        net.AMF = flash.__native.format.amf.AMF;
        function registerClassAlias(aliasName, classObject) {
            aliasName = as(aliasName, 'String');
            net.AMF.classMap.set(classObject, aliasName);
            net.AMF.nameMap[aliasName] = classObject;
        }
        net.registerClassAlias = registerClassAlias;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=registerClassAlias.js.map