var avmplus;
(function (avmplus) {
    avmplus.getDefinitionByName = flash.utils.getDefinitionByName;
    function describeTypeJSON(o, flags) {
        flags = ((flags) >>> 0);
        var nullOrUndefined = o === null || o === undefined;
        if (flags & avmplus.USE_ITRAITS && nullOrUndefined) {
            return null;
        }
        if (nullOrUndefined) {
            return createNullOrUndefinedDescription(o, flags);
        }
        var className = avmplus.getQualifiedClassName(o), cls;
        try {
            cls = avmplus.getDefinitionByName(className);
        }
        catch (e) {
            e = window.asc.e2e(e);
            return null;
        }
        var describeClass = o.prototype && !(flags & avmplus.USE_ITRAITS);
        var info = window.asc.classInfo[className];
        if (!info) {
            return null;
        }
        var hash = className + flags;
        var cached = window.asc.cache[hash];
        if (cached) {
            return cached;
        }
        var description = {
            name: info.name,
            isStatic: describeClass,
            isFinal: describeClass || info.isFinal,
            isDynamic: describeClass || info.isDynamic
        };
        if (flags & avmplus.INCLUDE_TRAITS) {
            description.traits = addTraits(cls, info, flags, describeClass);
        }
        if (flags & avmplus.INCLUDE_PRIVATES) {
            description.privates = addTraits(cls, info, flags, describeClass, true);
        }
        return window.asc.cache[hash] = description;
    }
    avmplus.describeTypeJSON = describeTypeJSON;
    function createNullOrUndefinedDescription(o, flags) {
        flags = ((flags) >>> 0);
        var obj = {
            name: 'null',
            isStatic: false,
            isFinal: true,
            isDynamic: false,
            traits: null
        };
        if (flags & avmplus.INCLUDE_TRAITS) {
            obj.traits = {
                variables: null,
                accessors: null,
                constructor: null,
                methods: null,
                metadata: flags & avmplus.INCLUDE_METADATA ? [] : null,
                interfaces: flags & avmplus.INCLUDE_INTERFACES ? [] : null,
                bases: flags & avmplus.INCLUDE_BASES ? [] : null
            };
        }
        return obj;
    }
    function addTraits(cls, info, flags, describingClass, describingPrivates) {
        if (describingPrivates === void 0) { describingPrivates = false; }
        flags = ((flags) >>> 0);
        describingClass = Boolean(describingClass);
        describingPrivates = Boolean(describingPrivates);
        var includeBases = flags & avmplus.INCLUDE_BASES;
        var includeMethods = flags & avmplus.INCLUDE_METHODS;
        var obj = {};
        var variablesVal = obj.variables = flags & avmplus.INCLUDE_VARIABLES ? [] : null;
        var accessorsVal = obj.accessors = flags & avmplus.INCLUDE_ACCESSORS ? [] : null;
        var metadataList = null;
        if (flags & avmplus.INCLUDE_METADATA && !describingClass && !describingPrivates) {
            metadataList = strict(info.factory.traits.metadata, Array);
        }
        obj.metadata = metadataList || [];
        if (flags & avmplus.INCLUDE_CONSTRUCTOR && !describingClass && !describingPrivates) {
            obj.constructor = info.factory.traits.constructor;
        }
        if (flags & avmplus.INCLUDE_INTERFACES) {
            obj.interfaces = [];
        }
        else {
            obj.interfaces = null;
        }
        var methodsVal = obj.methods = includeMethods ? [] : null;
        var basesVal = obj.bases = includeBases ? [] : null;
        var addBase = false;
        var isInterface = info.type == 'interface';
        var className = info.name;
        var fieldName = describingPrivates ? 'privates' : 'traits';
        while (cls) {
            if (includeBases && addBase && !describingClass) {
                basesVal.push(className);
            }
            else {
                addBase = true;
            }
            if (flags & avmplus.HIDE_OBJECT && cls === Object) {
                break;
            }
            if (!describingClass) {
                describeTraits.__bind(this)(info.factory[fieldName], isInterface);
                if (obj.interfaces && info.interfaces && !describingPrivates) {
                    info.interfaces.forEach(function (iface) {
                        if (obj.interfaces.indexOf(iface) == -1) {
                            obj.interfaces.push(iface);
                        }
                    }.__bind(this));
                }
            }
            else {
                describeTraits.__bind(this)(info[fieldName], isInterface);
            }
            try {
                className = avmplus.getQualifiedSuperclassName(cls);
                info = window.asc.classInfo[className];
                if (info) {
                    cls = avmplus.getDefinitionByName(className);
                }
                else {
                    cls = null;
                }
            }
            catch (e) {
                e = window.asc.e2e(e);
                cls = null;
            }
        }
        if (describingClass && !describingPrivates) {
            var val;
            if (flags & avmplus.INCLUDE_ACCESSORS && flags & avmplus.HIDE_OBJECT) {
                val = {};
                val.name = 'prototype';
                val.type = '*';
                val.access = "readonly";
                val.metadata = null;
                val.uri = null;
                val.declaredBy = 'Class';
                accessorsVal.push(val);
            }
            if (flags & avmplus.INCLUDE_VARIABLES && flags & avmplus.HIDE_OBJECT) {
                val = {};
                val.name = 'length';
                val.type = 'int';
                val.access = "readonly";
                val.metadata = null;
                val.uri = null;
                variablesVal.push(val);
            }
            if (includeBases) {
                basesVal.pop();
                basesVal.push('Class', 'Object');
            }
        }
        function describeTraits(traits, isInterface) {
            isInterface = Boolean(isInterface);
            if (flags & avmplus.INCLUDE_VARIABLES) {
                iterate.__bind(this)('variables');
            }
            if (flags & avmplus.INCLUDE_ACCESSORS) {
                iterate.__bind(this)('accessors');
            }
            if (flags & avmplus.INCLUDE_METHODS) {
                iterate.__bind(this)('methods');
            }
            function iterate(field) {
                field = as(field, 'String');
                var list = strict(traits ? traits[field] : null, Array), len = ((list ? list.length : 0) >> 0);
                for (var i = 0; i < len; i++) {
                    var t = list[i], val = {};
                    var __for0 = window.asc.in(t);
                    for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                        var f = __for0_1[_i];
                        if (f == 'metadata' && !(flags & avmplus.INCLUDE_METADATA)) {
                            continue;
                        }
                        val[f] = t[f];
                    }
                    obj[field].push(val);
                }
            }
        }
        if (!methodsVal || (methodsVal && methodsVal.length == 0)) {
            obj.methods = null;
        }
        if (!variablesVal || (variablesVal && variablesVal.length == 0)) {
            obj.variables = null;
        }
        return obj;
    }
})(avmplus || (avmplus = {}));
//# sourceMappingURL=describeTypeJSON.js.map