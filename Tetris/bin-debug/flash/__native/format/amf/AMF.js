var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var amf;
            (function (amf) {
                amf.XML = global.XML;
                amf.describeTypeJSON = avmplus.describeTypeJSON;
                amf.ObjectEncoding = flash.net.ObjectEncoding;
                amf.getAliasByClass = flash.net.getAliasByClass;
                amf.getClassByAlias = flash.net.getClassByAlias;
                amf.ByteArray = flash.utils.ByteArray;
                amf.Dictionary = flash.utils.Dictionary;
                amf.getDefinitionByName = flash.utils.getDefinitionByName;
                amf.getQualifiedClassName = flash.utils.getQualifiedClassName;
                var AMF3ReferenceTables = (function () {
                    function AMF3ReferenceTables() {
                        this.strings = [];
                        this.objects = [];
                        this.traits = [];
                        this.traitNames = [];
                    }
                    return AMF3ReferenceTables;
                }());
                var AMF0Marker = (function () {
                    function AMF0Marker() {
                    }
                    AMF0Marker.NUMBER = 0x00;
                    AMF0Marker.BOOLEAN = 0x01;
                    AMF0Marker.STRING = 0x02;
                    AMF0Marker.OBJECT = 0x03;
                    AMF0Marker.NULL = 0x05;
                    AMF0Marker.UNDEFINED = 0;
                    AMF0Marker.REFERENCE = 0x07;
                    AMF0Marker.ECMA_ARRAY = 0x08;
                    AMF0Marker.OBJECT_END = 0x09;
                    AMF0Marker.STRICT_ARRAY = 0x0A;
                    AMF0Marker.DATE = 0x0B;
                    AMF0Marker.LONG_STRING = 0x0C;
                    AMF0Marker.XML = 0x0F;
                    AMF0Marker.TYPED_OBJECT = 0x10;
                    AMF0Marker.AVMPLUS = 0x11;
                    return AMF0Marker;
                }());
                var AMF3Marker = (function () {
                    function AMF3Marker() {
                    }
                    AMF3Marker.UNDEFINED = 0x00;
                    AMF3Marker.NULL = 0x01;
                    AMF3Marker.FALSE = 0x02;
                    AMF3Marker.TRUE = 0x03;
                    AMF3Marker.INTEGER = 0x04;
                    AMF3Marker.DOUBLE = 0x05;
                    AMF3Marker.STRING = 0x06;
                    AMF3Marker.XML_DOCUMENT = 0x07;
                    AMF3Marker.DATE = 0x08;
                    AMF3Marker.ARRAY = 0x09;
                    AMF3Marker.OBJECT = 0x0A;
                    AMF3Marker.XML = 0x0B;
                    AMF3Marker.BYTEARRAY = 0x0C;
                    AMF3Marker.VECTOR_INT = 0x0D;
                    AMF3Marker.VECTOR_UINT = 0x0E;
                    AMF3Marker.VECTOR_DOUBLE = 0x0F;
                    AMF3Marker.VECTOR_OBJECT = 0x10;
                    AMF3Marker.DICTIONARY = 0x11;
                    return AMF3Marker;
                }());
                function isNumeric(object) {
                    return is(object, 'int') || is(object, 'uint') || is(object, 'Number');
                }
                function axGetPublicProperty(object, nm) {
                    if (is(object, amf.Dictionary)) {
                        return object.get(nm);
                    }
                    if (is(object, amf.ByteArray)) {
                        if (isNumeric(nm)) {
                            return object.get(nm);
                        }
                    }
                    return object[nm];
                }
                function axSetPublicProperty(object, nm, value) {
                    if (is(object, amf.Dictionary)) {
                        object.set(nm, value);
                    }
                    if (is(object, amf.ByteArray)) {
                        if (isNumeric(nm)) {
                            object.set(nm, value);
                        }
                    }
                    object[nm] = value;
                }
                function forEachPublicProperty(object, callbackfn) {
                    var exclude = [];
                    var axClassName = amf.getQualifiedClassName(object);
                    if (axClassName) {
                        var axClass = amf.getDefinitionByName(axClassName);
                        if (axClass) {
                            var classInfo = getClassInfo(axClass);
                            if (classInfo) {
                                exclude = getSlotTraitNames(classInfo, 'traits').concat(getSlotTraitNames(classInfo, 'privates'));
                            }
                        }
                    }
                    var properties = Object.keys(object);
                    var len = properties.length;
                    for (var i = 0; i < len; i++) {
                        var property = properties[i];
                        if (exclude.indexOf(property) >= 0)
                            continue;
                        callbackfn.call(object, property, axGetPublicProperty(object, property));
                    }
                }
                function getClassInfo(cl) {
                    return amf.describeTypeJSON(cl, avmplus.INCLUDE_BASES |
                        avmplus.INCLUDE_VARIABLES |
                        avmplus.INCLUDE_ACCESSORS |
                        avmplus.INCLUDE_TRAITS |
                        avmplus.INCLUDE_PRIVATES |
                        avmplus.USE_ITRAITS |
                        avmplus.HIDE_OBJECT);
                }
                function getSlotTraitNames(classInfo, field) {
                    field = as(field, 'String');
                    if (!classInfo || !classInfo[field]) {
                        return [];
                    }
                    var arr = [], i = 0, len = 0, o;
                    if (classInfo[field].variables) {
                        len = ((classInfo[field].variables.length) >>> 0);
                        for (i = 0; i < len; ++i) {
                            o = classInfo[field].variables[i];
                            if (o.access != 'readwrite')
                                continue;
                            arr.push(o.name);
                        }
                    }
                    if (classInfo[field].accessors) {
                        len = ((classInfo[field].accessors.length) >>> 0);
                        for (i = 0; i < len; ++i) {
                            o = classInfo[field].accessors[i];
                            if (o.access != 'readwrite')
                                continue;
                            arr.push(o.name);
                        }
                    }
                    return arr;
                }
                function writeString(ba, s) {
                    ba = strict(ba, amf.ByteArray);
                    s = as(s, 'String');
                    if (s.length > 0xFFFF) {
                        throw "AMF short string exceeded";
                    }
                    if (!s.length) {
                        ba.writeByte(0x00);
                        ba.writeByte(0x00);
                        return;
                    }
                    var bytes = new amf.ByteArray;
                    bytes.writeUTFBytes(s);
                    ba.writeByte((bytes.length >> 8) & 255);
                    ba.writeByte(bytes.length & 255);
                    ba.writeBytes(bytes);
                }
                function readString(ba) {
                    ba = strict(ba, amf.ByteArray);
                    var byteLength = (ba.readByte() << 8) | ba.readByte();
                    if (!byteLength) {
                        return '';
                    }
                    return ba.readUTFBytes(byteLength);
                }
                function writeDouble(ba, value) {
                    ba = strict(ba, amf.ByteArray);
                    value = (+(value));
                    var buffer = new ArrayBuffer(8);
                    var view = new DataView(buffer);
                    view.setFloat64(0, value, false);
                    var len = buffer.byteLength;
                    for (var i = 0; i < len; i++) {
                        ba.writeByte(view.getUint8(i));
                    }
                }
                function readDouble(ba) {
                    ba = strict(ba, amf.ByteArray);
                    var buffer = new ArrayBuffer(8);
                    var view = new DataView(buffer);
                    var len = buffer.byteLength;
                    for (var i = 0; i < len; i++) {
                        view.setUint8(i, ba.readByte());
                    }
                    return view.getFloat64(0, false);
                }
                function readU29(ba) {
                    ba = strict(ba, amf.ByteArray);
                    var b1 = ba.readByte();
                    if ((b1 & 0x80) == 0) {
                        return b1;
                    }
                    var b2 = ba.readByte();
                    if ((b2 & 0x80) == 0) {
                        return ((b1 & 0x7F) << 7) | b2;
                    }
                    var b3 = ba.readByte();
                    if ((b3 & 0x80) == 0) {
                        return ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | b3;
                    }
                    var b4 = ba.readByte();
                    return ((b1 & 0x7F) << 22) | ((b2 & 0x7F) << 15) | ((b3 & 0x7F) << 8) | b4;
                }
                function writeU29(ba, value) {
                    ba = strict(ba, amf.ByteArray);
                    value = (+(value));
                    if ((value & 0xFFFFFF80) == 0) {
                        ba.writeByte(value & 0x7F);
                    }
                    else if ((value & 0xFFFFC000) == 0) {
                        ba.writeByte(0x80 | ((value >> 7) & 0x7F));
                        ba.writeByte(value & 0x7F);
                    }
                    else if ((value & 0xFFE00000) == 0) {
                        ba.writeByte(0x80 | ((value >> 14) & 0x7F));
                        ba.writeByte(0x80 | ((value >> 7) & 0x7F));
                        ba.writeByte(value & 0x7F);
                    }
                    else if ((value & 0xC0000000) == 0) {
                        ba.writeByte(0x80 | ((value >> 22) & 0x7F));
                        ba.writeByte(0x80 | ((value >> 15) & 0x7F));
                        ba.writeByte(0x80 | ((value >> 8) & 0x7F));
                        ba.writeByte(value & 0xFF);
                    }
                    else {
                        throw "AMF3 U29 range";
                    }
                }
                function readUTF8VR(ba, references) {
                    ba = strict(ba, amf.ByteArray);
                    references = strict(references, AMF3ReferenceTables);
                    var u29s = readU29(ba);
                    if (u29s == 0x01) {
                        return "";
                    }
                    var strings = references.strings;
                    if ((u29s & 1) == 0) {
                        return strings[u29s >> 1];
                    }
                    var byteLength = u29s >> 1;
                    var value = ba.readUTFBytes(byteLength);
                    strings.push(value);
                    return value;
                }
                function writeUTF8VR(ba, s, references) {
                    ba = strict(ba, amf.ByteArray);
                    s = as(s, 'String');
                    references = strict(references, AMF3ReferenceTables);
                    if (s == "") {
                        ba.writeByte(0x01);
                        return;
                    }
                    var strings = references.strings;
                    var index = strings.indexOf(s);
                    if (index >= 0) {
                        writeU29(ba, index << 1);
                        return;
                    }
                    strings.push(s);
                    var bytes = new amf.ByteArray;
                    bytes.writeUTFBytes(s);
                    writeU29(ba, 1 | (bytes.length << 1));
                    ba.writeBytes(bytes);
                }
                function readBytes(ba, references) {
                    ba = strict(ba, amf.ByteArray);
                    references = strict(references, AMF3ReferenceTables);
                    var u29o = readU29(ba);
                    if (u29o == 0x01) {
                        return new amf.ByteArray;
                    }
                    if ((u29o & 1) == 0) {
                        return references.objects[u29o >> 1];
                    }
                    var bytes = new amf.ByteArray;
                    references.objects.push(bytes);
                    var byteLength = u29o >> 1;
                    bytes.writeBytes(ba, ba.position, byteLength);
                    bytes.position = 0;
                    return bytes;
                }
                function writeBytes(ba, bytes, references) {
                    ba = strict(ba, amf.ByteArray);
                    bytes = strict(bytes, amf.ByteArray);
                    references = strict(references, AMF3ReferenceTables);
                    if (bytes.length == 0) {
                        ba.writeByte(0x01);
                        return;
                    }
                    var objects = references.objects;
                    var index = objects.indexOf(bytes);
                    if (index >= 0) {
                        writeU29(ba, index << 1);
                        return;
                    }
                    objects.push(bytes);
                    writeU29(ba, 1 | (bytes.length << 1));
                    ba.writeBytes(bytes);
                }
                function readAMF3Value(ba, references) {
                    ba = strict(ba, amf.ByteArray);
                    references = strict(references, AMF3ReferenceTables);
                    var marker = ba.readByte();
                    switch (marker) {
                        case AMF3Marker.NULL:
                            return null;
                        case AMF3Marker.UNDEFINED:
                            return undefined;
                        case AMF3Marker.FALSE:
                            return false;
                        case AMF3Marker.TRUE:
                            return true;
                        case AMF3Marker.INTEGER:
                            return readU29(ba);
                        case AMF3Marker.DOUBLE:
                            return readDouble(ba);
                        case AMF3Marker.STRING:
                            return readUTF8VR(ba, references);
                        case AMF3Marker.DATE:
                            var u29o = readU29(ba);
                            if ((u29o & 1) == 0) {
                                return references.objects[u29o >> 1];
                            }
                            var date = new Date;
                            date.time = readDouble(ba);
                            references.objects.push(date);
                            return date;
                        case AMF3Marker.OBJECT:
                            var u29o = readU29(ba);
                            if ((u29o & 1) == 0) {
                                return references.objects[u29o >> 1];
                            }
                            var axClass;
                            var traits;
                            var isDynamic = true;
                            var traitNames;
                            if ((u29o & 2) == 0) {
                                traits = axClass = references.traits[u29o >> 2];
                                traitNames = references.traitNames[u29o >> 2];
                                isDynamic = traitNames.isDynamic;
                            }
                            else {
                                var alias = readUTF8VR(ba, references);
                                if (alias) {
                                    traits = axClass = amf.getClassByAlias(alias);
                                }
                                isDynamic = (u29o & 8) != 0;
                                traitNames = [];
                                for (var i = 0, j = u29o >> 4; i < j; i++) {
                                    traitNames.push(readUTF8VR(ba, references));
                                }
                                references.traits.push(traits);
                                references.traitNames.push(traitNames);
                                traitNames.isDynamic = isDynamic;
                            }
                            var object = axClass ? new axClass : {};
                            references.objects.push(object);
                            var len = traitNames.length;
                            for (var i = 0; i < len; i++) {
                                var value = readAMF3Value(ba, references);
                                axSetPublicProperty(object, traitNames[i], value);
                            }
                            if (isDynamic) {
                                while (true) {
                                    var key = readUTF8VR(ba, references);
                                    if (!key.length)
                                        break;
                                    var value = readAMF3Value(ba, references);
                                    axSetPublicProperty(object, key, value);
                                }
                            }
                            return object;
                        case AMF3Marker.ARRAY:
                            var u29o = readU29(ba);
                            if ((u29o & 1) == 0) {
                                return references.objects[u29o >> 1];
                            }
                            var array = [];
                            references.objects.push(array);
                            var densePortionLength = u29o >> 1;
                            while (true) {
                                var key = readUTF8VR(ba, references);
                                if (!key.length)
                                    break;
                                var value = readAMF3Value(ba, references);
                                axSetPublicProperty(array, key, value);
                            }
                            for (var i = 0; i < densePortionLength; i++) {
                                var value = readAMF3Value(ba, references);
                                axSetPublicProperty(array, i, value);
                            }
                            return array;
                        case AMF3Marker.XML:
                            var u29o = readU29(ba);
                            if ((u29o & 1) == 0) {
                                return references.objects[u29o >> 1];
                            }
                            var byteLength = u29o >> 1;
                            var xml = new amf.XML(ba.readUTFBytes(byteLength));
                            references.objects.push(xml);
                            return xml;
                        case AMF3Marker.BYTEARRAY:
                            return readBytes(ba, references);
                        case AMF3Marker.DICTIONARY:
                            var u29o = readU29(ba);
                            if ((u29o & 1) == 0) {
                                return references.objects[u29o >> 1];
                            }
                            var keysLength = u29o >> 1;
                            var dict = new amf.Dictionary(ba.readByte() == 0x01);
                            for (var j = 0; j < keysLength; j++) {
                                axSetPublicProperty(dict, readAMF3Value(ba, references), readAMF3Value(ba, references));
                            }
                            references.objects.push(dict);
                            return dict;
                        case AMF3Marker.VECTOR_INT:
                        case AMF3Marker.VECTOR_UINT:
                        case AMF3Marker.VECTOR_DOUBLE:
                        case AMF3Marker.VECTOR_OBJECT:
                            throw "Not implemented AMF3 marker " + marker;
                        default:
                            throw "AMF3 Unknown marker " + marker;
                    }
                }
                function writeAMF3Value(ba, value, references) {
                    ba = strict(ba, amf.ByteArray);
                    references = strict(references, AMF3ReferenceTables);
                    switch (typeof value) {
                        case "undefined":
                            ba.writeByte(AMF3Marker.UNDEFINED);
                            break;
                        case "boolean":
                            if (value) {
                                ba.writeByte(AMF3Marker.TRUE);
                            }
                            else {
                                ba.writeByte(AMF3Marker.FALSE);
                            }
                            break;
                        case "number":
                            var useInteger = value === (value | 0);
                            if (useInteger) {
                                var MAX_INT = 268435456 - 1;
                                var MIN_INT = -268435456;
                                if (value > MAX_INT || value < MIN_INT) {
                                    useInteger = false;
                                }
                            }
                            if (useInteger) {
                                ba.writeByte(AMF3Marker.INTEGER);
                                writeU29(ba, value);
                            }
                            else {
                                ba.writeByte(AMF3Marker.DOUBLE);
                                writeDouble(ba, value);
                            }
                            break;
                        case "string":
                            ba.writeByte(AMF3Marker.STRING);
                            writeUTF8VR(ba, value, references);
                            break;
                        case "object":
                            if (value === null || value === undefined) {
                                ba.writeByte(AMF3Marker.NULL);
                            }
                            else if (is(value, Array)) {
                                ba.writeByte(AMF3Marker.ARRAY);
                                if (tryWriteU29ORef(ba, value, references)) {
                                    break;
                                }
                                var densePortionLength = 0;
                                while (value.hasOwnProperty(densePortionLength)) {
                                    ++densePortionLength;
                                }
                                writeU29(ba, (densePortionLength << 1) | 1);
                                forEachPublicProperty(value, function (i, value) {
                                    if (isNumeric(i) && i >= 0 && i < densePortionLength) {
                                        return;
                                    }
                                    writeUTF8VR(ba, i, references);
                                    writeAMF3Value(ba, value, references);
                                }.__bind(this));
                                writeUTF8VR(ba, '', references);
                                for (var j = 0; j < densePortionLength; j++) {
                                    writeAMF3Value(ba, axGetPublicProperty(value, j), references);
                                }
                            }
                            else if (is(value, Date)) {
                                ba.writeByte(AMF3Marker.DATE);
                                if (tryWriteU29ORef(ba, value, references)) {
                                    break;
                                }
                                writeU29(ba, 1);
                                writeDouble(ba, value.valueOf());
                            }
                            else if (is(value, amf.XML)) {
                                ba.writeByte(AMF3Marker.XML);
                                if (tryWriteU29ORef(ba, value, references)) {
                                    break;
                                }
                                var bytes = new amf.ByteArray;
                                bytes.writeUTFBytes(value.toXMLString());
                                writeU29(ba, 1 | (bytes.length << 1));
                                ba.writeBytes(bytes);
                            }
                            else if (is(value, amf.ByteArray)) {
                                ba.writeByte(AMF3Marker.BYTEARRAY);
                                writeBytes(ba, value, references);
                            }
                            else if (is(value, amf.Dictionary)) {
                                ba.writeByte(AMF3Marker.DICTIONARY);
                                if (tryWriteU29ORef(ba, value, references)) {
                                    break;
                                }
                                var keys = value.__iterator(false);
                                var keysLength = keys.length;
                                writeU29(ba, (keysLength << 1) | 1);
                                ba.writeByte(value.__weak ? 0x01 : 0x00);
                                for (var j = 0; j < keysLength; j++) {
                                    writeAMF3Value(ba, keys[j], references);
                                    writeAMF3Value(ba, axGetPublicProperty(value, keys[j]), references);
                                }
                            }
                            else {
                                ba.writeByte(AMF3Marker.OBJECT);
                                if (tryWriteU29ORef(ba, value, references)) {
                                    break;
                                }
                                var isDynamic = true;
                                var axClassName = amf.getQualifiedClassName(value);
                                var axClass = amf.getDefinitionByName(axClassName), i, len;
                                if (axClass) {
                                    var classInfo = getClassInfo(axClass);
                                    isDynamic = classInfo.isDynamic;
                                    var alias = amf.getAliasByClass(axClass) || "";
                                    var traitsRef = references.traits.indexOf(axClass);
                                    var traitNames = null;
                                    if (traitsRef < 0) {
                                        traitNames = getSlotTraitNames(classInfo, 'traits');
                                        references.traits.push(axClass);
                                        references.traitNames.push(traitNames);
                                        writeU29(ba, (isDynamic ? 0x0B : 0x03) + (traitNames.length << 4));
                                        writeUTF8VR(ba, alias, references);
                                        len = traitNames.length;
                                        for (i = 0; i < len; i++) {
                                            writeUTF8VR(ba, traitNames[i], references);
                                        }
                                    }
                                    else {
                                        traitNames = strict(references.traitNames[traitsRef], Array);
                                        writeU29(ba, 0x01 + (traitsRef << 2));
                                    }
                                    len = traitNames.length;
                                    for (i = 0; i < len; i++) {
                                        writeAMF3Value(ba, axGetPublicProperty(value, traitNames[i]), references);
                                    }
                                }
                                else {
                                    writeU29(ba, 0x0B);
                                    writeUTF8VR(ba, "", references);
                                }
                                if (isDynamic) {
                                    forEachPublicProperty(value, function (i, value) {
                                        writeUTF8VR(ba, i, references);
                                        writeAMF3Value(ba, value, references);
                                    }.__bind(this));
                                    writeUTF8VR(ba, "", references);
                                }
                            }
                            return;
                    }
                }
                function tryWriteU29ORef(ba, object, references) {
                    ba = strict(ba, amf.ByteArray);
                    references = strict(references, AMF3ReferenceTables);
                    var objects = references.objects;
                    var index = objects.indexOf(object);
                    if (index < 0) {
                        objects.push(object);
                        return false;
                    }
                    writeU29(ba, index << 1);
                    return true;
                }
                var AMF = (function () {
                    function AMF() {
                    }
                    AMF.write = function (objectEncoding, ba, object) {
                        objectEncoding = ((objectEncoding) >>> 0);
                        ba = strict(ba, amf.ByteArray);
                        switch (objectEncoding) {
                            case amf.ObjectEncoding.AMF0:
                                AMF.writeAMF0(ba, object);
                                break;
                            case amf.ObjectEncoding.AMF3:
                                writeAMF3Value(ba, object, new AMF3ReferenceTables);
                                break;
                            default:
                                throw new Error("Object Encoding");
                        }
                    };
                    AMF.read = function (objectEncoding, ba) {
                        objectEncoding = ((objectEncoding) >>> 0);
                        ba = strict(ba, amf.ByteArray);
                        switch (objectEncoding) {
                            case amf.ObjectEncoding.AMF0:
                                return AMF.readAMF0(ba);
                            case amf.ObjectEncoding.AMF3:
                                return readAMF3Value(ba, new AMF3ReferenceTables);
                            default:
                                throw new Error("Object Encoding");
                        }
                    };
                    AMF.writeAMF0 = function (ba, value) {
                        ba = strict(ba, amf.ByteArray);
                        switch (typeof value) {
                            case "boolean":
                                ba.writeByte(AMF0Marker.BOOLEAN);
                                ba.writeByte(value ? 0x01 : 0x00);
                                break;
                            case "number":
                                ba.writeByte(AMF0Marker.NUMBER);
                                writeDouble(ba, value);
                                break;
                            case "undefined":
                                ba.writeByte(AMF0Marker.UNDEFINED);
                                break;
                            case "string":
                                ba.writeByte(AMF0Marker.STRING);
                                writeString(ba, value);
                                break;
                            case "object":
                                var object = value;
                                if (object === null || object === undefined) {
                                    ba.writeByte(AMF0Marker.NULL);
                                }
                                else if (is(object, Array)) {
                                    var array = as(object, Array);
                                    ba.writeByte(AMF0Marker.ECMA_ARRAY);
                                    ba.writeByte((array.length >>> 24) & 255);
                                    ba.writeByte((array.length >> 16) & 255);
                                    ba.writeByte((array.length >> 8) & 255);
                                    ba.writeByte(array.length & 255);
                                    forEachPublicProperty(array, function (key, value) {
                                        writeString(ba, key);
                                        AMF.writeAMF0(ba, value);
                                    }.__bind(this));
                                    ba.writeByte(0x00);
                                    ba.writeByte(0x00);
                                    ba.writeByte(AMF0Marker.OBJECT_END);
                                }
                                else {
                                    ba.writeByte(AMF0Marker.OBJECT);
                                    forEachPublicProperty(object, function (key, value) {
                                        writeString(ba, key);
                                        AMF.writeAMF0(ba, value);
                                    }.__bind(this));
                                    ba.writeByte(0x00);
                                    ba.writeByte(0x00);
                                    ba.writeByte(AMF0Marker.OBJECT_END);
                                }
                                return;
                        }
                    };
                    AMF.readAMF0 = function (ba) {
                        ba = strict(ba, amf.ByteArray);
                        var marker = ba.readByte();
                        switch (marker) {
                            case AMF0Marker.NUMBER:
                                return readDouble(ba);
                            case AMF0Marker.BOOLEAN:
                                return !!ba.readByte();
                            case AMF0Marker.STRING:
                                return readString(ba);
                            case AMF0Marker.OBJECT:
                                var object = {};
                                while (true) {
                                    var key = readString(ba);
                                    if (!key.length)
                                        break;
                                    axSetPublicProperty(object, key, AMF.readAMF0(ba));
                                }
                                if (ba.readByte() != AMF0Marker.OBJECT_END) {
                                    throw "AMF0 End marker is not found";
                                }
                                return object;
                            case AMF0Marker.NULL:
                                return null;
                            case AMF0Marker.UNDEFINED:
                                return undefined;
                            case AMF0Marker.ECMA_ARRAY:
                                var array = [];
                                array.length = (ba.readByte() << 24) | (ba.readByte() << 16) |
                                    (ba.readByte() << 8) | ba.readByte();
                                while (true) {
                                    var key = readString(ba);
                                    if (!key.length)
                                        break;
                                    axSetPublicProperty(array, key, AMF.readAMF0(ba));
                                }
                                if (ba.readByte() != AMF0Marker.OBJECT_END) {
                                    throw "AMF0 End marker is not found";
                                }
                                return array;
                            case AMF0Marker.STRICT_ARRAY:
                                var array = [];
                                var length = array.length = (ba.readByte() << 24) | (ba.readByte() << 16) |
                                    (ba.readByte() << 8) | ba.readByte();
                                for (var i = 0; i < length; i++) {
                                    axSetPublicProperty(array, i, AMF.readAMF0(ba));
                                }
                                return array;
                            case AMF0Marker.AVMPLUS:
                                return readAMF3Value(ba, new AMF3ReferenceTables);
                            default:
                                throw "AMF0 Unknown marker " + marker;
                        }
                    };
                    AMF.classMap = asc.sti(AMF, function () { AMF.classMap = new amf.Dictionary; });
                    AMF.nameMap = {};
                    return AMF;
                }());
                amf.AMF = AMF;
            })(amf = format.amf || (format.amf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=AMF.js.map