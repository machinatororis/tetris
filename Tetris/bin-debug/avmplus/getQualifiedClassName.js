var avmplus;
(function (avmplus) {
    function getQualifiedClassName(value) {
        if (value === null) {
            return 'null';
        }
        if (value === undefined) {
            return 'void';
        }
        if (value === Math) {
            return 'Math';
        }
        if (value.__className) {
            return value.__className;
        }
        var constructor = value.constructor, name;
        if (constructor && (name = constructor.__className)) {
            return name;
        }
        var type = typeof value;
        if (type == 'function' && (name = value.name) && name != 'anonymous') {
            return name;
        }
        if (constructor && (name = constructor.name)) {
            switch (name) {
                case 'Number':
                    if ((value | 0) === value)
                        return 'int';
            }
            return name;
        }
        return null;
    }
    avmplus.getQualifiedClassName = getQualifiedClassName;
})(avmplus || (avmplus = {}));
//# sourceMappingURL=getQualifiedClassName.js.map