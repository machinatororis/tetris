var avmplus;
(function (avmplus) {
    avmplus.Namespace = global.Namespace;
    avmplus.XML = global.XML;
    avmplus.XMLList = global.XMLList;
    function describeParams(x, parameters) {
        x = strict(x, avmplus.XML);
        avmplus.parameterXml = avmplus.parameterXml || new avmplus.XML("<parameter />");
        var c = x.children();
        var __for0 = window.asc.in(parameters);
        for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
            var i = __for0_1[_i];
            var p = parameters[i];
            var f = avmplus.parameterXml.copy();
            f.setAttribute('index', ((i) >> 0) + 1);
            f.setAttribute('type', p.type);
            f.setAttribute('optional', p.optional);
            c[c.length()] = f;
        }
    }
    function describeMetadata(x, metadata) {
        x = strict(x, avmplus.XML);
        metadata = strict(metadata, Array);
        avmplus.metadataXml = avmplus.metadataXml || new avmplus.XML("<metadata />");
        avmplus.argXml = avmplus.argXml || new avmplus.XML("<arg />");
        var c = x.children();
        var __for1 = window.asc.of(metadata);
        for (var _i = 0, __for1_1 = __for1; _i < __for1_1.length; _i++) {
            var md = __for1_1[_i];
            var m = avmplus.metadataXml.copy();
            m.setAttribute('name', md.name);
            var __for2 = window.asc.of(md.value);
            for (var _a = 0, __for2_1 = __for2; _a < __for2_1.length; _a++) {
                var i = __for2_1[_a];
                var a = avmplus.argXml.copy();
                a.setAttribute('key', i.key);
                a.setAttribute('value', i.value);
                m.appendChild(a);
            }
            c[c.length()] = m;
        }
    }
    function finish(e, i) {
        e = strict(e, avmplus.XML);
        if (i.uri)
            e.setAttribute('uri', i.uri);
        if (i.metadata)
            describeMetadata(e, i.metadata);
    }
    function describeTraits(x, traits) {
        x = strict(x, avmplus.XML);
        avmplus.extendsXml = avmplus.extendsXml || new avmplus.XML("<extendsClass />");
        avmplus.implementsXml = avmplus.implementsXml || new avmplus.XML("<implementsInterface />");
        avmplus.constructorXml = avmplus.constructorXml || new avmplus.XML("<constructor />");
        avmplus.constantXml = avmplus.constantXml || new avmplus.XML("<constant />");
        avmplus.variableXml = avmplus.variableXml || new avmplus.XML("<variable />");
        avmplus.accessorXml = avmplus.accessorXml || new avmplus.XML("<accessor />");
        avmplus.methodXml = avmplus.methodXml || new avmplus.XML("<method />");
        var c = x.children();
        var __for3 = window.asc.of(traits.bases);
        for (var _i = 0, __for3_1 = __for3; _i < __for3_1.length; _i++) {
            var base = __for3_1[_i];
            var e = avmplus.extendsXml.copy();
            e.setAttribute('type', base);
            c[c.length()] = e;
        }
        var __for4 = window.asc.of(traits.interfaces);
        for (var _a = 0, __for4_1 = __for4; _a < __for4_1.length; _a++) {
            var interf = __for4_1[_a];
            var e = avmplus.implementsXml.copy();
            e.setAttribute('type', interf);
            c[c.length()] = e;
        }
        if (traits.constructor !== null) {
            var e = avmplus.constructorXml.copy();
            describeParams(e, traits.constructor);
            c[c.length()] = e;
        }
        var __for5 = window.asc.of(traits.variables);
        for (var _b = 0, __for5_1 = __for5; _b < __for5_1.length; _b++) {
            var variable = __for5_1[_b];
            var e = (variable.access == "readonly") ? avmplus.constantXml.copy() : avmplus.variableXml.copy();
            e.setAttribute('name', variable.name);
            e.setAttribute('type', variable.type);
            finish(e, variable);
            c[c.length()] = e;
        }
        var __for6 = window.asc.of(traits.accessors);
        for (var _c = 0, __for6_1 = __for6; _c < __for6_1.length; _c++) {
            var accessor = __for6_1[_c];
            var e = avmplus.accessorXml.copy();
            e.setAttribute('name', accessor.name);
            e.setAttribute('access', accessor.access);
            e.setAttribute('type', accessor.type);
            e.setAttribute('declaredBy', accessor.declaredBy);
            finish(e, accessor);
            c[c.length()] = e;
        }
        var __for7 = window.asc.of(traits.methods);
        for (var _d = 0, __for7_1 = __for7; _d < __for7_1.length; _d++) {
            var method = __for7_1[_d];
            var e = avmplus.methodXml.copy();
            e.setAttribute('name', method.name);
            e.setAttribute('declaredBy', method.declaredBy);
            e.setAttribute('returnType', method.returnType);
            describeParams(e, method.parameters);
            finish(e, method);
            c[c.length()] = e;
        }
        describeMetadata(x, traits.metadata);
    }
    avmplus.HIDE_NSURI_METHODS = 0x0001;
    avmplus.INCLUDE_BASES = 0x0002;
    avmplus.INCLUDE_INTERFACES = 0x0004;
    avmplus.INCLUDE_VARIABLES = 0x0008;
    avmplus.INCLUDE_ACCESSORS = 0x0010;
    avmplus.INCLUDE_METHODS = 0x0020;
    avmplus.INCLUDE_METADATA = 0x0040;
    avmplus.INCLUDE_CONSTRUCTOR = 0x0080;
    avmplus.INCLUDE_TRAITS = 0x0100;
    avmplus.USE_ITRAITS = 0x0200;
    avmplus.HIDE_OBJECT = 0x0400;
    avmplus.INCLUDE_PRIVATES = 0x0800;
    avmplus.FLASH10_FLAGS = ((0x0002 |
        0x0004 |
        0x0008 |
        0x0010 |
        0x0020 |
        0x0040 |
        0x0080 |
        0x0100 |
        0x0001 |
        0x0400) >>> 0);
    function describeType(value, flags) {
        flags = ((flags) >>> 0);
        avmplus.typeXml = avmplus.typeXml || new avmplus.XML("<type />");
        avmplus.factoryXml = avmplus.factoryXml || new avmplus.XML("<factory />");
        var x, prevE4X = avmplus.XML.ignoreECMAScriptForXML;
        try {
            avmplus.XML.ignoreECMAScriptForXML = true;
            var o = avmplus.describeTypeJSON(value, flags);
            x = avmplus.typeXml.copy();
            if (!o) {
                throw new Error('can not describeTypeJSON');
            }
            o.traits = o.traits || {};
            o.traits.bases = o.traits.bases || [];
            x.setAttribute('name', o.name);
            if (o.traits.bases.length) {
                x.setAttribute('base', o.traits.bases[0]);
            }
            x.setAttribute('isDynamic', o.isDynamic);
            x.setAttribute('isFinal', o.isFinal);
            x.setAttribute('isStatic', o.isStatic);
            describeTraits(x, o.traits);
            o = avmplus.describeTypeJSON(value, flags | avmplus.USE_ITRAITS);
            if (o) {
                o.traits = o.traits || {};
                o.traits.bases = o.traits.bases || [];
                var e = avmplus.factoryXml.copy();
                e.setAttribute('type', o.name);
                describeTraits(e, o.traits);
                x.appendChild(e);
            }
        }
        catch (error) {
            error = window.asc.e2e(error);
            trace(error.getStackTrace());
        }
        finally {
            avmplus.XML.ignoreECMAScriptForXML = prevE4X;
            if (x) {
                x.e4x();
            }
        }
        return x;
    }
    avmplus.describeType = describeType;
})(avmplus || (avmplus = {}));
//# sourceMappingURL=describeType.js.map