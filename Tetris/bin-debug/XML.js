var global;
(function (global) {
    var XML = (function () {
        function XML(xml) {
            if (xml === void 0) { xml = null; }
            this._children = null;
            this._attributes = [];
            this._processingInstructions = null;
            this._parent = null;
            this._value = null;
            this._version = null;
            this._encoding = null;
            this._appliedNamespace = null;
            this._namespaces = [];
            this._origStr = null;
            this._name = null;
            this._nodeKind = "element";
            xml = as(xml, 'String');
            this._children = [];
            if (xml) {
                var parser = new DOMParser();
                var errorNS;
                try {
                    errorNS = as(parser.parseFromString('<', 'application/xml').getElementsByTagName("parsererror")[0].namespaceURI, 'String');
                }
                catch (e) {
                    e = window.asc.e2e(e);
                }
                var doc = strict(parser.parseFromString(xml, "application/xml"), Document);
                var errors = doc.getElementsByTagNameNS(errorNS, 'parsererror');
                if (errors.length > 0) {
                    throw new Error('XML parse error: ' + errors);
                }
                var len = (+(doc.childNodes.length));
                for (var i = 0; i < len; i++) {
                    var node = doc.childNodes[i];
                    if (node.nodeType == 1) {
                        this._version = as(doc.xmlVersion, 'String');
                        this._encoding = as(doc.xmlEncoding, 'String');
                        this._name = new global.QName;
                        this._name.prefix = as(node.prefix, 'String');
                        this._name.uri = as(node.namespaceURI, 'String');
                        this._name.localName = as(node.localName, 'String');
                        XML.iterateElement(node, this);
                    }
                    else {
                    }
                }
                this.normalize();
            }
            Object.defineProperty(this, "0", {
                get: function () {
                    return this.e4x();
                },
                set: function (newValue) {
                },
                enumerable: false,
                configurable: true
            });
        }
        XML.setDefaultNamespace = function (ns) {
        };
        Object.defineProperty(XML, "prettyIndent", {
            get: function () {
                return XML._prettyIndent;
            },
            set: function (value) {
                value = ((value) >> 0);
                XML._prettyIndent = value;
                XML._indentStr = "";
                for (var i = 0; i < value; i++) {
                    XML._indentStr = XML._indentStr + XML.INDENT_CHAR;
                }
            },
            enumerable: true,
            configurable: true
        });
        XML.escapeAttributeValue = function (value) {
            value = as(value, 'String');
            if (value == null) {
                return '';
            }
            var outArr = [];
            var arr = value.split('');
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                switch (arr[i]) {
                    case "<":
                        outArr[i] = "&lt;";
                        break;
                    case "&":
                        outArr[i] = "&amp;";
                        break;
                    case "\u000A":
                        outArr[i] = "&#xA;";
                        break;
                    case "\u000D":
                        outArr[i] = "&#xD;";
                        break;
                    case "\u0009":
                        outArr[i] = "&#x9;";
                        break;
                    default:
                        outArr[i] = arr[i];
                        break;
                }
            }
            return outArr.join('');
        };
        XML.escapeElementValue = function (value) {
            value = as(value, 'String');
            if (value == null) {
                return '';
            }
            var outArr = [];
            var arr = value.split("");
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                switch (arr[i]) {
                    case "<":
                        outArr[i] = "&lt;";
                        break;
                    case ">":
                        outArr[i] = "&gt;";
                        break;
                    case "&":
                        outArr[i] = "&amp;";
                        break;
                    default:
                        outArr[i] = arr[i];
                        break;
                }
            }
            return outArr.join('');
        };
        XML.insertAttribute = function (att, parent) {
            att = strict(att, Attr);
            parent = strict(parent, XML);
            var xml = new XML;
            xml.setParent(parent);
            xml.setNodeKind("attribute");
            xml.setName(att.name);
            xml.setValue(att.value);
            parent.addChildInternal(xml);
            return xml;
        };
        XML.iterateElement = function (node, xml) {
            xml = strict(xml, XML);
            var attrs = node.attributes;
            var len = ((attrs.length) >>> 0);
            for (var i = 0; i < len; i++) {
                XML.insertAttribute(attrs[i], xml);
            }
            var childNodes = strict(node.childNodes, NodeList);
            len = ((childNodes.length) >>> 0);
            for (i = 0; i < len; i++) {
                xml.addChildInternal(XML.fromNode(childNodes[i]));
            }
        };
        XML.fromNode = function (node) {
            var xml;
            var i = 0;
            var data = node.nodeValue;
            var qname = new global.QName(node.namespaceURI, node.nodeName);
            qname.prefix = as(node.prefix, 'String');
            switch (node.nodeType) {
                case 1:
                    xml = new XML;
                    xml.setNodeKind("element");
                    xml.setName(qname);
                    XML.iterateElement(node, xml);
                    break;
                case 3:
                    xml = new XML;
                    xml.setNodeKind("text");
                    xml.setName(qname);
                    xml.setValue(data);
                    break;
                case 4:
                    xml = new XML;
                    xml.setName(qname);
                    xml.setNodeKind("text");
                    data = "<![CDATA[" + data + "]]>";
                    xml.setValue(data);
                    break;
                case 7:
                    xml = new XML;
                    xml.setNodeKind("processing-instruction");
                    xml.setName(qname);
                    xml.setValue(data);
                    break;
                case 8:
                    xml = new XML;
                    xml.setNodeKind("comment");
                    xml.setValue(data);
                    break;
                default:
                    throw new TypeError("Unknown XML node type!");
                    break;
            }
            return xml;
        };
        XML.namespaceInArray = function (ns, arr, considerPrefix) {
            if (considerPrefix === void 0) { considerPrefix = true; }
            ns = strict(ns, global.Namespace);
            arr = strict(arr, Array);
            considerPrefix = Boolean(considerPrefix);
            if (!arr) {
                return false;
            }
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                var a = arr[i];
                if (ns.uri == a.uri) {
                    if (!considerPrefix) {
                        return true;
                    }
                    if (ns.prefix == a.prefix) {
                        return true;
                    }
                }
            }
            return false;
        };
        XML.trimXMLWhitespace = function (value) {
            value = as(value, 'String');
            return value.replace(/^\s+|\s+$/gm, '');
        };
        XML.defaultSettings = function () {
            return {
                ignoreComments: true,
                ignoreProcessingInstructions: true,
                ignoreWhitespace: true,
                prettyIndent: 2,
                prettyPrinting: true
            };
        };
        XML.setSettings = function (value) {
            if (!value) {
                return;
            }
            XML.ignoreComments = Boolean(value.ignoreComments === undefined ? XML.ignoreComments : value.ignoreComments);
            XML.ignoreProcessingInstructions = Boolean(value.ignoreProcessingInstructions === undefined ? XML.ignoreProcessingInstructions : value.ignoreProcessingInstructions);
            XML.ignoreWhitespace = Boolean(value.ignoreWhitespace === undefined ? XML.ignoreWhitespace : value.ignoreWhitespace);
            XML.prettyIndent = ((value.prettyIndent === undefined ? XML.prettyIndent : value.prettyIndent) >> 0);
            XML.prettyPrinting = Boolean(value.prettyPrinting === undefined ? XML.prettyPrinting : value.prettyPrinting);
        };
        XML.settings = function () {
            return {
                ignoreComments: XML.ignoreComments,
                ignoreProcessingInstructions: XML.ignoreProcessingInstructions,
                ignoreWhitespace: XML.ignoreWhitespace,
                prettyIndent: XML.prettyIndent,
                prettyPrinting: XML.prettyPrinting
            };
        };
        XML.prototype.dispose = function () {
            this._children = [];
            this._attributes = [];
            this._namespaces = [];
        };
        XML.prototype.addChild = function (child) {
            child = strict(child, XML);
            if (!child) {
                return;
            }
            this.addChildInternal(child);
            this.normalize();
        };
        XML.prototype.addChildInternal = function (child) {
            child = strict(child, XML);
            if (XML.ignoreWhitespace && child.nodeKind() == 'text' && !child.getValue().replace(/[\n\r\t]/g, '').length) {
                return;
            }
            var kind = child.nodeKind();
            child.setParent(this);
            if (kind == 'attribute') {
                if (!this._attributes) {
                    this._attributes = [];
                }
                this._attributes.push(child);
            }
            else {
                this._children.push(child);
            }
            this.e4x(kind == 'attribute' ? XML.INDEX_ATTRIBUTES : XML.INDEX_CHILDREN, [child]);
        };
        XML.prototype.addNamespace = function (ns) {
            ns = strict(ns, global.Namespace);
            if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
                return this;
            }
            if (ns.prefix == null) {
                return this;
            }
            if (ns.prefix == "" && this.name().uri == "") {
                return this;
            }
            var match = null;
            var len = this._namespaces.length;
            for (var i = 0; i < len; i++) {
                var ns = strict(this._namespaces[i], global.Namespace);
                if (ns.prefix == ns.prefix) {
                    match = ns;
                    break;
                }
            }
            if (match) {
                this._namespaces[i] = ns;
            }
            else {
                this._namespaces.push(ns);
            }
            if (ns.prefix == this.name().prefix) {
                this.name().prefix = null;
            }
            len = this._attributes.length;
            for (i = 0; i < len; i++) {
                var name = this._attributes[i].name();
                if (name.prefix == ns.prefix) {
                    name.prefix = null;
                }
            }
            return this;
        };
        XML.prototype.appendChild = function (child) {
            if (!(is(child, 'Object'))) {
                child = child.toString();
                var xml = new XML;
                xml.setNodeKind("text");
                xml.setValue(child);
                child = xml;
            }
            if (is(child, global.XMLList)) {
                child = child[0];
            }
            child.setParent(this);
            this._children.push(child);
            this.normalize();
            this.e4x(XML.INDEX_CHILDREN, [child]);
            return child;
        };
        XML.prototype.e4x = function (flags, targets) {
            if (flags === void 0) { flags = 7; }
            if (targets === void 0) { targets = null; }
            flags = ((flags) >>> 0);
            targets = strict(targets, Array);
            if (XML.ignoreECMAScriptForXML) {
                return this;
            }
            return XML.__index(this, flags, targets);
        };
        XML.prototype.filter = function (callback) {
            if (callback(this.e4x())) {
                return this;
            }
            return new XML;
        };
        XML.prototype.attribute = function (attributeName) {
            var i = 0;
            if (attributeName == '*') {
                return this.attributes();
            }
            attributeName = this.toAttributeName(attributeName);
            this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
            var list = new global.XMLList;
            var len = this._attributes.length;
            for (i = 0; i < len; i++) {
                var a = this._attributes[i];
                if (a.name().matches(attributeName)) {
                    list.append(a);
                }
            }
            list.targetObject = this;
            list.targetProperty = attributeName;
            return list;
        };
        XML.prototype.attributes = function () {
            this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
            var list = new global.XMLList;
            var len = this._attributes.length;
            for (var i = 0; i < len; i++) {
                list.append(this._attributes[i]);
            }
            list.targetObject = this;
            return list;
        };
        XML.prototype.child = function (propertyName) {
            var i = 0, len = 0;
            var list = new global.XMLList;
            if ((((propertyName) >> 0)).toString() == propertyName) {
                if (propertyName != "0") {
                    return null;
                }
                list.append(this);
                list.targetObject = this;
                return list.e4x();
            }
            propertyName = this.toXMLName(propertyName);
            if (propertyName.isAttribute) {
                this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
                len = this._attributes.length;
                for (i = 0; i < len; i++) {
                    var a = this._attributes[i];
                    if (propertyName.matches(a.name())) {
                        list.append(a);
                    }
                }
            }
            else {
                len = this._children.length;
                for (i = 0; i < len; i++) {
                    var c = this._children[i];
                    if (propertyName.matches(c.name())) {
                        list.append(c);
                    }
                }
            }
            list.targetObject = this;
            list.targetProperty = propertyName;
            return list.e4x();
        };
        XML.prototype.childIndex = function () {
            if (!this._parent) {
                return -1;
            }
            return this._parent.getIndexOf(this);
        };
        XML.prototype.children = function () {
            var list = new global.XMLList;
            var len = this._children.length;
            for (var i = 0; i < len; i++) {
                list.append(this._children[i]);
            }
            list.targetObject = this;
            return list.e4x();
        };
        XML.prototype.comments = function () {
            var list = new global.XMLList;
            var len = this._children.length;
            for (var i = 0; i < len; i++) {
                var c = this._children[i];
                if (c.nodeKind() == "comment") {
                    list.append(c);
                }
            }
            list.targetObject = this;
            return list;
        };
        XML.prototype.concat = function (list) {
            if (is(list, XML)) {
                var newList = new global.XMLList;
                newList.append(list);
                list = newList;
            }
            if (!(is(list, global.XMLList))) {
                throw new TypeError("invalid type");
            }
            var retVal = new global.XMLList;
            retVal.append(this);
            var item;
            var __for0 = window.asc.of(list);
            for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                item = __for0_1[_i];
                retVal.append(item);
            }
            return retVal.e4x();
        };
        XML.prototype.contains = function (value) {
            if (is(value, XML) || is(value, global.XMLList)) {
                return this.equals(value);
            }
            return value == this;
        };
        XML.prototype.copy = function () {
            var xml = new XML;
            xml.setNodeKind(this._nodeKind);
            xml.setName(this.name());
            xml.setValue(this._value);
            var i = 0, len = this._namespaces.length;
            for (i = 0; i < len; i++) {
                xml.addNamespace(new global.Namespace(this._namespaces[i]));
            }
            this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
            len = this._attributes.length;
            for (i = 0; i < len; i++) {
                xml.addChildInternal(this._attributes[i].copy());
            }
            len = this._children.length;
            for (i = 0; i < len; i++) {
                xml.addChildInternal(this._children[i].copy());
            }
            return xml.e4x(XML.INDEX_ATTRIBUTES | XML.INDEX_CHILDREN);
        };
        XML.prototype.deleteChildAt = function (idx) {
            idx = ((idx) >> 0);
            if (idx < 0) {
                return;
            }
            if (idx >= this._children.length) {
                return;
            }
            var child = strict(this._children[idx], XML);
            child.setParent(null);
            this._children.splice(idx, 1);
        };
        XML.prototype.descendants = function (name) {
            if (name === void 0) { name = "*"; }
            var i = 0, len = 0;
            if (!name) {
                name = "*";
            }
            name = this.toXMLName(name);
            var list = new global.XMLList;
            if (name.isAttribute) {
                this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
                len = this._attributes.length;
                for (i = 0; i < len; i++) {
                    var a = this._attributes[i];
                    if (name.matches(a.name())) {
                        list.append(a);
                    }
                }
            }
            len = this._children.length;
            for (i = 0; i < len; i++) {
                var c = this._children[i];
                if (c.nodeKind() == "element") {
                    if (name.matches(c.name())) {
                        list.append(c);
                    }
                    list.concat(c.descendants(name));
                }
            }
            return list.e4x();
        };
        XML.prototype.elements = function (name) {
            if (name === void 0) { name = "*"; }
            if (!name) {
                name = "*";
            }
            name = this.toXMLName(name);
            var list = new global.XMLList;
            var len = this._children.length;
            for (var i = 0; i < len; i++) {
                var child = this._children[i];
                if (child.nodeKind() == 'element' && name.matches(child.name())) {
                    list.append(child);
                }
            }
            list.targetObject = this;
            list.targetProperty = name;
            return list.e4x();
        };
        XML.prototype.equals = function (xml) {
            var i = 0, len = 0;
            if (!(is(xml, XML)))
                return false;
            if (xml.nodeKind() != this._nodeKind)
                return false;
            if (!this.name().equals(xml.name()))
                return false;
            this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
            var selfAttrs = this.getAttributeArray();
            var xmlAttrs = strict(xml.getAttributeArray(), Array);
            if (selfAttrs.length != xmlAttrs.length)
                return false;
            if (this.getValue() != xml.getValue())
                return false;
            len = selfAttrs.length;
            for (i = 0; i < len; i++) {
                if (!xml.hasAttribute(selfAttrs[i])) {
                    return false;
                }
            }
            var selfChldrn = this.getChildrenArray();
            var xmlChildren = strict(xml.getChildrenArray(), Array);
            if (selfChldrn.length != xmlChildren.length)
                return false;
            len = selfChldrn.length;
            for (i = 0; i < len; i++) {
                if (!selfChldrn[i].equals(xmlChildren[i])) {
                    return false;
                }
            }
            return true;
        };
        XML.prototype.hasAttribute = function (nameOrXML, value) {
            if (value === void 0) { value = null; }
            value = as(value, 'String');
            if (!this._attributes) {
                return false;
            }
            var name;
            if (is(nameOrXML, XML)) {
                name = strict(nameOrXML.name(), global.QName);
                value = as(nameOrXML.getValue(), 'String');
            }
            else {
                name = new global.QName(nameOrXML);
            }
            this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
            var len = this._attributes.length;
            for (var i = 0; i < len; i++) {
                var a = this._attributes[i];
                if (name.matches(a.name())) {
                    if (!value) {
                        return true;
                    }
                    return value == a.getValue();
                }
            }
            return false;
        };
        XML.prototype.getAncestorNamespaces = function (namespaces) {
            namespaces = strict(namespaces, Array);
            namespaces = namespaces.slice();
            var nsIdx = 0;
            var pIdx = 0;
            if (this._parent) {
                var parentNS = this._parent.inScopeNamespaces();
                var len = ((parentNS.length) >> 0);
                for (pIdx = 0; pIdx < len; pIdx++) {
                    var curNS = strict(parentNS[pIdx], global.Namespace);
                    var doInsert = true;
                    var nsLen = namespaces.length;
                    for (nsIdx = 0; nsIdx < nsLen; nsIdx++) {
                        var ns = strict(namespaces[nsIdx], global.Namespace);
                        if (curNS.uri == ns.uri && curNS.prefix == ns.prefix) {
                            doInsert = false;
                            break;
                        }
                    }
                    if (doInsert) {
                        namespaces.push(curNS);
                    }
                }
                namespaces = this._parent.getAncestorNamespaces(namespaces);
            }
            return namespaces;
        };
        XML.prototype.getAttributeArray = function () {
            return this._attributes ? this._attributes.slice() : [];
        };
        XML.prototype.getChildrenArray = function () {
            return this._children ? this._children.slice() : [];
        };
        XML.prototype.getIndexOf = function (elem) {
            elem = strict(elem, XML);
            return this._children.indexOf(elem);
        };
        XML.prototype.getURI = function (prefix) {
            prefix = as(prefix, 'String');
            var namespaces = this.getAncestorNamespaces(this._namespaces);
            var len = namespaces.length;
            for (var i = 0; i < len; i++) {
                var ns = namespaces[i];
                if (ns.prefix == prefix) {
                    return ns.uri;
                }
            }
            return "";
        };
        XML.prototype.getValue = function () {
            return this._value;
        };
        XML.prototype.hasAncestor = function (obj) {
            if (!obj) {
                return false;
            }
            var parent = strict(this.parent(), XML);
            while (parent) {
                if (obj == parent) {
                    return true;
                }
                parent = parent.parent();
            }
            return false;
        };
        XML.prototype.hasComplexContent = function () {
            if (this._nodeKind == "attribute" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "text") {
                return false;
            }
            var len = this._children.length;
            for (var i = 0; i < len; i++) {
                if (this._children[i].nodeKind() == "element") {
                    return true;
                }
            }
            return false;
        };
        XML.prototype.hasOwnProperty = function (p) {
            if ((((p) >> 0)).toString() == p) {
                return p == "0";
            }
            var name = this.toXMLName(p);
            this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
            var i = 0, len = this._attributes.length;
            for (i = 0; i < len; i++) {
                if (this._attributes[i].name().matches(name)) {
                    return true;
                }
            }
            len = this._children.length;
            for (i = 0; i < len; i++) {
                var c = this._children[i];
                if (c.nodeKind() != "element") {
                    continue;
                }
                if (c.name().matches(name)) {
                    return true;
                }
            }
            return false;
        };
        XML.prototype.hasSimpleContent = function () {
            if (this._nodeKind == "comment" || this._nodeKind == "processing-instruction") {
                return false;
            }
            var len = this._children.length;
            for (var i = 0; i < len; i++) {
                if (this._children[i].nodeKind() == "element") {
                    return false;
                }
            }
            return true;
        };
        XML.prototype.inScopeNamespaces = function () {
            return this._namespaces.slice();
        };
        XML.prototype.insertChildAt = function (child, idx) {
            child = strict(child, XML);
            idx = ((idx) >> 0);
            if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
                return;
            }
            if (!child) {
                return;
            }
            var parent = strict(child.parent(), XML);
            if (parent) {
                parent.removeChild(child);
            }
            child.setParent(this);
            this._children.splice(idx, 0, child);
            this.e4x(XML.INDEX_CHILDREN, [child]);
        };
        XML.prototype.insertChildAfter = function (child1, child2) {
            child1 = strict(child1, XML);
            child2 = strict(child2, XML);
            if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
                return null;
            }
            if (!child1) {
                this.insertChildAt(child2, 0);
                return child2;
            }
            var idx = this._children.indexOf(child1);
            if (idx >= 0) {
                this.insertChildAt(child2, idx + 1);
            }
            return child2;
        };
        XML.prototype.insertChildBefore = function (child1, child2) {
            child1 = strict(child1, XML);
            child2 = strict(child2, XML);
            if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
                return null;
            }
            if (!child1) {
                this.insertChildAt(child2, this._children.length);
                return child2;
            }
            var idx = this._children.indexOf(child1);
            if (idx >= 0) {
                this.insertChildAt(child2, idx);
            }
            return child2;
        };
        XML.prototype.length = function () {
            return 1;
        };
        XML.prototype.localName = function () {
            return this.name().localName;
        };
        XML.prototype.name = function () {
            if (!this._name) {
                this._name = new global.QName;
            }
            return this._name;
        };
        XML.prototype.namespace = function (prefix) {
            if (prefix === void 0) { prefix = null; }
            prefix = as(prefix, 'String');
            if (prefix) {
                var len = this._namespaces.length;
                for (var i = 0; i < len; i++) {
                    var ns = strict(this._namespaces[i], global.Namespace);
                    if (ns.prefix == prefix) {
                        return ns;
                    }
                }
                if (this._parent) {
                    return this._parent.namespace(prefix);
                }
                return null;
            }
            if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction") {
                return null;
            }
            return this.name().getNamespace(this.namespaceDeclarations());
        };
        XML.prototype.namespaceDeclarations = function () {
            var i = 0;
            var retVal = [];
            if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
                return retVal;
            }
            var declaredNS = this._namespaces.slice();
            var parent = this._parent;
            while (parent) {
                var parentNS = parent.inScopeNamespaces();
                var idx = 0, pIdx = 0;
                var pNsLen = parentNS.length;
                for (pIdx = 0; i < pNsLen; pIdx++) {
                    var uri = as(parentNS[pIdx].uri, 'String');
                    var prefix = as(parentNS[pIdx].prefix, 'String');
                    var decLen = declaredNS.length;
                    for (idx = 0; i < decLen; idx++) {
                        if (declaredNS[idx].uri == uri && declaredNS[idx].prefix == prefix) {
                            declaredNS.push(parentNS[pIdx]);
                            break;
                        }
                    }
                }
                parent = parent.parent();
            }
            return declaredNS;
        };
        XML.prototype.nodeKind = function () {
            return this._nodeKind;
        };
        XML.prototype.normalize = function () {
            var lastChild;
            var len = ((this._children.length - 1) >> 0);
            for (var i = len; i >= 0; i--) {
                var child = strict(this._children[i], XML);
                if (child.nodeKind() == "element") {
                    child.normalize();
                }
                else if (child.nodeKind() == "text") {
                    if (lastChild && lastChild.nodeKind() == "text") {
                        child.setValue(child.text() + lastChild.text());
                        this.deleteChildAt(i + 1);
                    }
                    if (!child.text()) {
                        this.deleteChildAt(i);
                    }
                }
                lastChild = child;
            }
            return this;
        };
        XML.prototype.parent = function () {
            return this._parent;
        };
        XML.prototype.plus = function (rightHand) {
            var list = new global.XMLList;
            list.append(this);
            return list.plus(rightHand);
        };
        XML.prototype.prependChild = function (child) {
            child = strict(child, XML);
            child.setParent(this);
            this._children.unshift(child);
            this.e4x(XML.INDEX_CHILDREN, [child]);
            return child;
        };
        XML.prototype.processingInstructions = function (name) {
            if (name === void 0) { name = "*"; }
            name = as(name, 'String');
            var list = new global.XMLList;
            var len = this._children.length;
            for (var i = 0; i < len; i++) {
                var c = this._children[i];
                if (c.nodeKind() == "processing-instruction") {
                    list.append(c);
                }
            }
            list.targetObject = this;
            return list;
        };
        XML.prototype.removeChild = function (child) {
            child = strict(child, XML);
            var removed;
            if (!child) {
                return false;
            }
            if (!this._attributes) {
                return false;
            }
            if (!(is(child, XML))) {
                return this.removeChildByName(child);
            }
            if (child.nodeKind() == "attribute") {
                var len = this._attributes.length;
                for (var i = 0; i < len; i++) {
                    var a = this._attributes[i];
                    if (child.equals(a)) {
                        removed = a;
                        removed.setParent(null);
                        this._attributes.splice(i, 1);
                        return true;
                    }
                }
            }
            var idx = this._children.indexOf(child);
            if (idx < 0) {
                return false;
            }
            removed = this._children.splice(idx, 1);
            child.setParent(null);
            return removed;
        };
        XML.prototype.removeChildByName = function (name) {
            var i = 0;
            name = this.toXMLName(name);
            var child = null;
            var removedItem = false;
            if (name.isAttribute) {
                if (!this._attributes) {
                    return false;
                }
                for (i = this._attributes.length - 1; i >= 0; i--) {
                    var a = this._attributes[i];
                    if (a.name().matches(name)) {
                        child = a;
                        child.setParent(null);
                        this._attributes.splice(i, 1);
                        removedItem = true;
                    }
                }
                return removedItem;
            }
            if (!this._children) {
                return false;
            }
            for (i = this._children.length - 1; i >= 0; i--) {
                var c = this._children[i];
                if (c.name().matches(name)) {
                    child = c;
                    child.setParent(null);
                    this._children.splice(i, 1);
                    removedItem = true;
                }
            }
            return removedItem;
        };
        XML.prototype.removeChildAt = function (index) {
            index = ((index) >> 0);
            throw new Error("Cannot call delete on XML");
        };
        XML.prototype.removeNamespace = function (ns) {
            if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
                return this;
            }
            if (!(is(ns, global.Namespace))) {
                ns = new global.Namespace(ns);
            }
            if (ns == this.name().getNamespace(this._namespaces)) {
                return this;
            }
            var i = 0, len = this._attributes.length;
            for (i = 0; i < len; i++) {
                if (ns == this._attributes[i].name().getNamespace(this._namespaces)) {
                    return this;
                }
            }
            for (i = this._namespaces.length - 1; i >= 0; i--) {
                if (this._namespaces[i].uri == ns.uri && this._namespaces[i].prefix == ns.prefix) {
                    this._namespaces.splice(i, 1);
                }
                else if (ns.prefix == null && this._namespaces[i].uri == ns.uri) {
                    this._namespaces.splice(i, 1);
                }
            }
            len = this._children.length;
            for (i = 0; i < len; i++) {
                var c = this._children[i];
                if (c.nodeKind() == "element") {
                    c.removeNamespace(ns);
                }
            }
            return this;
        };
        XML.prototype.replace = function (propertyName, value) {
            if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
                return this.s().replace(propertyName, value);
            }
            if (value === null || value === undefined) {
                return this;
            }
            if (is(value, XML) || is(value, global.XMLList)) {
                value = value.copy();
            }
            else {
                value = value.toString();
            }
            return null;
        };
        XML.prototype.replaceChildAt = function (idx, v) {
            idx = ((idx) >> 0);
            if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
                return;
            }
            if (idx > this._children.length) {
                idx = ((this._children.length) >> 0);
            }
            if (is(v, XML) && v.nodeKind() != "attribute") {
                if (v.nodeKind() == "element" && (v == this || this.isAncestor(v))) {
                    throw new TypeError("cannot assign parent xml as child");
                }
                v.setParent(this);
                if (this._children[idx]) {
                    this.removeChild(this._children[idx]);
                }
                this.insertChildAt(v, idx);
            }
            else if (is(v, global.XMLList)) {
                if (this._children[idx]) {
                    this._children[idx].setParent(null);
                }
                var len = ((v.length()) >> 0);
                v[0].setParent(this);
                this._children[idx] = v[0];
                var listIdx = 1;
                var chld = strict(v[0], XML);
                while (listIdx < len) {
                    chld = v[listIdx];
                    this.insertChildAt(chld, idx + listIdx);
                    listIdx++;
                }
            }
            else {
            }
        };
        XML.prototype.isAncestor = function (xml) {
            xml = strict(xml, XML);
            var p = strict(this.parent(), XML);
            while (p) {
                if (p == xml) {
                    return true;
                }
                p = p.parent();
            }
            return false;
        };
        XML.prototype.setAttribute = function (attr, value) {
            value = as(value, 'String');
            var i = 0, len = 0, a;
            if (!this._attributes) {
                this._attributes = [];
            }
            if (is(attr, XML)) {
                if (attr.nodeKind() == "attribute") {
                    len = this._attributes.length;
                    for (i = 0; i < len; i++) {
                        a = this._attributes[i];
                        if (a.name().equals(attr.name())) {
                            a.setValue(value);
                            return;
                        }
                    }
                    if (value) {
                        attr.setValue(value);
                    }
                    this.addChild(attr);
                }
                return;
            }
            if (attr.indexOf("xmlns") == 0) {
                var ns = new global.Namespace(value.toString());
                if (attr.indexOf("xmlns:") == 0) {
                    ns.prefix = as(attr.split(":")[1], 'String');
                }
                this.addNamespace(ns);
            }
            else {
                var qname = this.toAttributeName(attr);
                var attrXML = new XML;
                attrXML.setNodeKind("attribute");
                attrXML.setName(this.toAttributeName(attr));
                attrXML.setValue(value);
                len = this._attributes.length;
                for (i = 0; i < len; i++) {
                    a = this._attributes[i];
                    if (a.name().equals(attrXML.name())) {
                        a.setValue(value);
                        return;
                    }
                }
                this.addChild(attrXML);
            }
        };
        XML.prototype.setChild = function (elementName, elements) {
            var i = 0;
            var len = 0;
            var chld;
            if (is(elements, XML)) {
                var list = new global.XMLList;
                list[0] = elements;
                elements = list;
            }
            if (is(elements, global.XMLList)) {
                var chldrn = this.child(elementName);
                var childIdx = ((this.children().length() - 1) >> 0);
                if (chldrn.length()) {
                    childIdx = ((chldrn[0].childIndex() - 1) >> 0);
                }
                len = ((chldrn.length() - 1) >> 0);
                for (i = len; i >= 0; i--) {
                    this.removeChild(chldrn[i]);
                }
                var curChild = strict(this._children[childIdx], XML);
                len = elements.length();
                for (i = 0; i < len; i++) {
                    chld = elements[i];
                    if (!curChild) {
                        if (childIdx < 0)
                            curChild = this.prependChild(chld);
                        else
                            curChild = this.appendChild(chld);
                    }
                    else {
                        curChild = this.insertChildAfter(curChild, chld);
                    }
                }
            }
        };
        XML.prototype.setChildren = function (value) {
            var i = 0;
            var len = 0;
            var chld;
            if (is(value, XML)) {
                var list = new global.XMLList;
                list[0] = value;
                value = list;
            }
            if (is(value, global.XMLList)) {
                var chldrn = this.children();
                var childIdx = ((chldrn.length() - 1) >> 0);
                if (chldrn.length()) {
                    childIdx = ((chldrn[0].childIndex()) >> 0);
                }
                len = ((chldrn.length() - 1) >> 0);
                for (i = len; i >= 0; i--) {
                    this.removeChild(chldrn[i]);
                }
                var curChild = strict(this._children[childIdx], XML);
                len = value.length();
                for (i = 0; i < len; i++) {
                    chld = value[i];
                    if (!curChild) {
                        curChild = this.appendChild(chld);
                    }
                    else {
                        curChild = this.insertChildAfter(curChild, chld);
                    }
                }
            }
            return this;
        };
        XML.prototype.setLocalName = function (name) {
            name = as(name, 'String');
            if (!this._name) {
                this._name = new global.QName();
            }
            this._name.localName = name;
        };
        XML.prototype.setName = function (name) {
            if (is(name, global.QName)) {
                this._name = strict(name, global.QName);
            }
            else {
                this._name = new global.QName(name);
            }
        };
        XML.prototype.setNamespace = function (ns) {
            if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction") {
                return;
            }
            var ns2 = new global.Namespace(ns);
            this._name = new global.QName(ns2, this.name());
            if (this._nodeKind == "attribute") {
                this._name.isAttribute = true;
                if (this._parent == null) {
                    return;
                }
                this._parent.addNamespace(ns2);
            }
            if (this._nodeKind == "element") {
                this.addNamespace(ns2);
            }
        };
        XML.prototype.setNodeKind = function (value) {
            value = as(value, 'String');
            this._nodeKind = value;
        };
        XML.prototype.setParent = function (parent) {
            parent = strict(parent, XML);
            if (parent == this._parent) {
                return;
            }
            var oldParent = this._parent;
            this._parent = parent;
            if (oldParent) {
                oldParent.removeChild(this);
            }
        };
        XML.prototype.setValue = function (value) {
            value = as(value, 'String');
            this._value = value;
        };
        XML.prototype.text = function () {
            var list = new global.XMLList();
            var len = this._children.length;
            for (var i = 0; i < len; i++) {
                var c = this._children[i];
                if (c.nodeKind() == "text") {
                    list.append(c);
                }
            }
            list.targetObject = this;
            return list;
        };
        XML.prototype.toString = function () {
            if (this._nodeKind == "text" || this._nodeKind == "attribute")
                return this._value;
            if (this._nodeKind == "comment")
                return "";
            if (this._nodeKind == "processing-instruction")
                return "";
            if (this.hasSimpleContent()) {
                var s = '';
                var len = this._children.length;
                for (var i = 0; i < len; i++) {
                    var c = this._children[i];
                    if (c.nodeKind() == "comment" || c.nodeKind() == "processing-instruction") {
                        continue;
                    }
                    s = s + c.toString();
                }
                return s;
            }
            return this.toXMLString();
        };
        XML.prototype.toAttributeName = function (name) {
            var qname;
            if (!(is(name, global.QName))) {
                name = name.toString();
                var i = ((name.indexOf("$")) >> 0);
                if (i >= 0) {
                    name = name.substring(i);
                }
            }
            qname = this.toXMLName(name);
            qname.isAttribute = true;
            return qname;
        };
        XML.prototype.toXMLName = function (name) {
            var qname;
            if (name.toString().indexOf('$') >= 0) {
                return this.toAttributeName(name);
            }
            if ((((name) >> 0)).toString() == name) {
                throw new TypeError("invalid element name");
            }
            if (!is(name, global.QName)) {
                var nameStr = as(name.toString(), 'String');
                if (nameStr.indexOf(":") >= 0) {
                    qname = new global.QName;
                    qname.prefix = nameStr.substring(0, nameStr.indexOf(":"));
                    qname.localName = nameStr.substring(nameStr.lastIndexOf(":") + 1);
                    qname.uri = this.getURI(qname.prefix);
                }
                else {
                    qname = new global.QName(this.name());
                    if (!qname.uri && XML.defaultNamespace) {
                        qname = new global.QName(XML.defaultNamespace);
                    }
                    qname.localName = nameStr;
                }
            }
            else {
                qname = new global.QName(name);
            }
            return qname;
        };
        XML.prototype.toXMLString = function (indentLevel, ancestors) {
            if (indentLevel === void 0) { indentLevel = 0; }
            if (ancestors === void 0) { ancestors = null; }
            indentLevel = ((indentLevel) >> 0);
            ancestors = strict(ancestors, Array);
            this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
            var ns;
            var strArr = [];
            indentLevel = isNaN(indentLevel) ? 0 : indentLevel;
            var indentArr = [];
            for (var i = 0; i < indentLevel; i++) {
                indentArr.push(XML._indentStr);
            }
            var indent = indentArr.join("");
            if (this.nodeKind() == "text") {
                if (XML.prettyPrinting) {
                    var v = XML.trimXMLWhitespace(this._value);
                    return indent + XML.escapeElementValue(v);
                }
                return XML.escapeElementValue(this._value);
            }
            if (this.nodeKind() == "attribute")
                return indent + XML.escapeAttributeValue(this._value);
            if (this.nodeKind() == "comment")
                return indent + "<!--" + this._value + "-->";
            if (this.nodeKind() == "processing-instruction")
                return indent + "<?" + this.name().localName + " " + this._value + "?>";
            if (!ancestors) {
                ancestors = [];
            }
            var declarations = [];
            var len = this._namespaces.length;
            for (i = 0; i < len; i++) {
                ns = this._namespaces[i];
                if (!XML.namespaceInArray(ns, ancestors)) {
                    declarations.push(new global.Namespace(ns));
                }
            }
            len = this._attributes.length;
            for (i = 0; i < len; i++) {
                ns = new global.Namespace(this._attributes[i].name().getNamespace(ancestors.concat(declarations)));
                if (ns.prefix == null) {
                    ns.prefix = "";
                    declarations.push(ns);
                }
            }
            ns = new global.Namespace(this.name().getNamespace(ancestors.concat(declarations)));
            if (ns.prefix == null) {
                ns.prefix = "";
                declarations.push(ns);
            }
            if (XML.prettyPrinting) {
                strArr.push(new Array(indentLevel).join(' '));
            }
            strArr.push("<");
            if (ns.prefix) {
                strArr.push(ns.prefix + ":");
            }
            strArr.push(this.name().localName);
            len = declarations.length;
            for (i = 0; i < len; i++) {
                var decVal = XML.escapeAttributeValue(declarations[i].uri);
                if (decVal) {
                    strArr.push(" xmlns");
                    var d = declarations[i];
                    if (d.prefix) {
                        strArr.push(":");
                        strArr.push(d.prefix);
                    }
                    strArr.push('="');
                    strArr.push(decVal);
                    strArr.push('"');
                }
            }
            len = this._attributes.length;
            for (i = 0; i < len; i++) {
                strArr.push(" ");
                var a = this._attributes[i];
                var aName = strict(a.name(), global.QName);
                var ans = aName.getNamespace(ancestors.concat(declarations));
                if (ans.prefix) {
                    strArr.push(ans.prefix);
                    strArr.push(":");
                }
                strArr.push(aName.localName);
                strArr.push('="');
                strArr.push(XML.escapeAttributeValue(a.getValue()));
                strArr.push('"');
            }
            if (this._children.length == 0) {
                strArr.push("/>");
                return strArr.join("");
            }
            strArr.push(">");
            var indentChildren = this._children.length > 1 || (this._children.length == 1 && this._children[0].nodeKind() != "text");
            var nextIndentLevel = 0;
            if (XML.prettyPrinting && indentChildren) {
                nextIndentLevel = ((indentLevel + XML.prettyIndent) >> 0);
            }
            else {
                nextIndentLevel = 0;
            }
            len = this._children.length;
            for (i = 0; i < len; i++) {
                if (XML.prettyPrinting && indentChildren) {
                    strArr.push("\n");
                }
                strArr.push(this._children[i].toXMLString(nextIndentLevel, ancestors.concat(declarations)));
            }
            if (XML.prettyPrinting && indentChildren) {
                strArr.push("\n");
                strArr.push(new Array(indentLevel + 1).join(' '));
            }
            strArr.push("</");
            if (ns.prefix) {
                strArr.push(ns.prefix);
                strArr.push(":");
            }
            strArr.push(this.name().localName);
            strArr.push(">");
            return strArr.join("");
        };
        XML.prototype.valueOf = function () {
            var str = this.toString();
            var num = (+(str));
            return isNaN(num) ? str : num;
        };
        XML.prototype.charAt = function (index) {
            index = (+(index));
            return this.s().charAt(index);
        };
        XML.prototype.charCodeAt = function (index) {
            index = (+(index));
            return this.s().charCodeAt(index);
        };
        XML.prototype.codePointAt = function (pos) {
            pos = (+(pos));
            return this.s().codePointAt(pos);
        };
        XML.prototype.indexOf = function (searchValue, fromIndex) {
            if (fromIndex === void 0) { fromIndex = 0; }
            searchValue = as(searchValue, 'String');
            fromIndex = (+(fromIndex));
            return this.s().indexOf(searchValue, fromIndex);
        };
        XML.prototype.lastIndexOf = function (searchValue, fromIndex) {
            if (fromIndex === void 0) { fromIndex = 0; }
            searchValue = as(searchValue, 'String');
            fromIndex = (+(fromIndex));
            return this.s().lastIndexOf(searchValue, fromIndex);
        };
        XML.prototype.localeCompare = function (compareString, locales, options) {
            if (locales === void 0) { locales = undefined; }
            if (options === void 0) { options = undefined; }
            compareString = as(compareString, 'String');
            return this.s().localeCompare(compareString, locales, options);
        };
        XML.prototype.match = function (regexp) {
            return this.s().match(regexp);
        };
        XML.prototype.search = function (regexp) {
            return this.s().search(regexp);
        };
        XML.prototype.slice = function (beginSlice, endSlice) {
            if (endSlice === void 0) { endSlice = undefined; }
            beginSlice = (+(beginSlice));
            return this.s().slice(beginSlice, endSlice);
        };
        XML.prototype.split = function (separator, limit) {
            if (separator === void 0) { separator = undefined; }
            if (limit === void 0) { limit = undefined; }
            return this.s().split(separator, limit);
        };
        XML.prototype.substr = function (start, length) {
            if (length === void 0) { length = undefined; }
            start = (+(start));
            return this.s().substr(start, length);
        };
        XML.prototype.substring = function (indexStart, indexEnd) {
            if (indexEnd === void 0) { indexEnd = undefined; }
            indexStart = (+(indexStart));
            return this.s().substring(indexStart, indexEnd);
        };
        XML.prototype.toLocaleLowerCase = function () {
            return this.s().toLocaleLowerCase();
        };
        XML.prototype.toLocaleUpperCase = function () {
            return this.s().toLocaleUpperCase();
        };
        XML.prototype.toLowerCase = function () {
            return this.s().toLowerCase();
        };
        XML.prototype.toUpperCase = function () {
            return this.s().toUpperCase();
        };
        XML.prototype.trim = function () {
            return this.s().trim();
        };
        XML.prototype.toExponential = function (fractionDigits) {
            if (fractionDigits === void 0) { fractionDigits = undefined; }
            return (+(this.v().toExponential(fractionDigits)));
        };
        XML.prototype.toFixed = function (digits) {
            if (digits === void 0) { digits = undefined; }
            return (+(this.v().toFixed(digits)));
        };
        XML.prototype.toPrecision = function (precision) {
            if (precision === void 0) { precision = undefined; }
            return (+(this.v().toPrecision(precision)));
        };
        XML.prototype.s = function () {
            return this.toString();
        };
        XML.prototype.v = function () {
            return (+(this.s()));
        };
        XML.prototype.__iterator = function (forEach) {
            if (forEach) {
                return [this];
            }
            return [0];
        };
        XML.__index = function (target, flags, targets) {
            flags = ((flags) >>> 0);
            targets = strict(targets, Array);
            var list, child, localName, len = 0;
            if (flags & XML.INDEX_CHILDREN) {
                var prev = XML.ignoreECMAScriptForXML;
                XML.ignoreECMAScriptForXML = true;
                try {
                    list = targets || target.elements('*');
                    len = ((targets ? list.length : list.length()) >> 0);
                }
                catch (error) {
                    error = window.asc.e2e(error);
                    trace(error.getStackTrace());
                }
                finally {
                    XML.ignoreECMAScriptForXML = prev;
                }
                for (var i = 0; i < len; i++) {
                    child = as(list[i], XML);
                    if (!child)
                        continue;
                    localName = as(child.name().localName, 'String');
                    XML.__mapElement(target, localName);
                }
            }
            if (flags & XML.INDEX_UNATTACHED_ATTRIBUTES || flags & XML.INDEX_ATTRIBUTES) {
                XML.__addAttribute(target);
            }
            if (flags & XML.INDEX_ATTRIBUTES) {
                list = targets || target.attributes();
                len = ((targets ? list.length : list.length()) >> 0);
                for (var i = 0; i < len; i++) {
                    child = as(list[i], XML);
                    if (!child)
                        continue;
                    localName = as(child.name().localName, 'String');
                    XML.__mapAttribute(target, localName);
                }
            }
            return target;
        };
        XML.__addAttribute = function (target) {
            var itm, keys = Object.keys(target), len = keys.length;
            for (var i = 0; i < len; ++i) {
                var a = as(keys[i], 'String');
                if (a[0] != '$') {
                    continue;
                }
                if (a.length < 2) {
                    continue;
                }
                var itm = target[a];
                if (is(itm, global.XMLList)) {
                    continue;
                }
                delete target[a];
                target.setAttribute(a.substr(1), itm);
            }
            return target;
        };
        XML.__mapElement = function (target, propertyName) {
            propertyName = as(propertyName, 'String');
            if (Object.getOwnPropertyDescriptor(target, propertyName)) {
                return;
            }
            Object.defineProperty(target, propertyName, {
                get: function () {
                    return target.elements(propertyName);
                },
                enumerable: false,
                configurable: true
            });
        };
        XML.__mapAttribute = function (target, attributeName) {
            attributeName = as(attributeName, 'String');
            var n = '$' + attributeName;
            if (Object.getOwnPropertyDescriptor(target, n)) {
                return;
            }
            Object.defineProperty(target, n, {
                get: function () {
                    return target.attribute(attributeName);
                },
                set: function (newValue) {
                    target.setAttribute(attributeName, newValue);
                },
                enumerable: false,
                configurable: true
            });
        };
        XML.defaultNamespace = null;
        XML.ignoreECMAScriptForXML = false;
        XML.ignoreComments = true;
        XML.ignoreProcessingInstructions = true;
        XML.ignoreWhitespace = true;
        XML._prettyIndent = 2;
        XML._indentStr = "  ";
        XML.INDENT_CHAR = " ";
        XML.prettyPrinting = true;
        XML.INDEX_CHILDREN = 0x0001;
        XML.INDEX_ATTRIBUTES = 0x0002;
        XML.INDEX_UNATTACHED_ATTRIBUTES = 0x0004;
        return XML;
    }());
    global.XML = XML;
})(global || (global = {}));
//# sourceMappingURL=XML.js.map