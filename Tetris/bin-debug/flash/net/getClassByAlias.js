var flash;
(function (flash) {
    var net;
    (function (net) {
        net.AMF = flash.__native.format.amf.AMF;
        function getClassByAlias(aliasName) {
            aliasName = as(aliasName, 'String');
            return net.AMF.nameMap[aliasName];
        }
        net.getClassByAlias = getClassByAlias;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=getClassByAlias.js.map