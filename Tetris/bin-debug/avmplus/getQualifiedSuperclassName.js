var avmplus;
(function (avmplus) {
    function getQualifiedSuperclassName(value) {
        if (value === null || value === undefined) {
            return null;
        }
        if (typeof value.__extends != 'undefined') {
            return avmplus.getQualifiedClassName(value.__extends);
        }
        var constructor = value.constructor;
        if (constructor && typeof constructor.__extends != 'undefined') {
            return avmplus.getQualifiedClassName(constructor.__extends);
        }
        if (avmplus.getQualifiedClassName(value) == 'Object') {
            return null;
        }
        return 'Object';
    }
    avmplus.getQualifiedSuperclassName = getQualifiedSuperclassName;
})(avmplus || (avmplus = {}));
//# sourceMappingURL=getQualifiedSuperclassName.js.map