var global;
(function (global) {
    var XMLList = (function () {
        function XMLList() {
            this._xmlArray = [];
            this._targetObject = undefined;
            this._targetProperty = undefined;
            this.addIndex(0);
        }
        XMLList.prototype.e4x = function (flags, targets) {
            if (flags === void 0) { flags = 7; }
            if (targets === void 0) { targets = null; }
            flags = ((flags) >>> 0);
            targets = strict(targets, Array);
            if (global.XML.ignoreECMAScriptForXML) {
                return this;
            }
            return global.XML.__index(this, flags, targets);
        };
        XMLList.prototype.addIndex = function (idx) {
            idx = ((idx) >> 0);
            Object.defineProperty(this, idx, {
                get: function () {
                    return this._xmlArray[idx].e4x();
                },
                set: function (newValue) {
                    if (idx >= this._xmlArray.length)
                        this.append(newValue);
                    else
                        this.replaceChildAt(idx, newValue);
                },
                enumerable: false,
                configurable: true
            });
        };
        XMLList.prototype.append = function (child) {
            child = strict(child, global.XML);
            this._xmlArray[this._xmlArray.length] = child;
            this.addIndex(this._xmlArray.length);
            do {
                if (!this._targetObject) {
                    break;
                }
                if (!this._targetProperty) {
                    this._targetObject.appendChild(child);
                    break;
                }
                var objToAppend = strict(this._targetObject.child(this._targetProperty), XMLList);
                if (!objToAppend.length()) {
                    this._targetObject.appendChild(child);
                    break;
                }
                this._targetObject.insertChildAfter(objToAppend[objToAppend.length() - 1], child);
            } while (false);
        };
        XMLList.prototype.appendChild = function (child) {
            if (this.isSingle()) {
                return this._xmlArray[0].appendChild(child);
            }
            return null;
        };
        XMLList.prototype.attribute = function (attributeName) {
            var retVal = new XMLList;
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var list = strict(this._xmlArray[i].attribute(attributeName), XMLList);
                if (list.length()) {
                    retVal.concat(list);
                }
            }
            return retVal;
        };
        XMLList.prototype.attributes = function () {
            var retVal = new XMLList;
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var list = strict(this._xmlArray[i].attributes(), XMLList);
                if (list.length()) {
                    retVal.concat(list);
                }
            }
            return retVal;
        };
        XMLList.prototype.child = function (propertyName) {
            var retVal = new XMLList;
            var propNum = ((propertyName) >> 0);
            if (propNum.toString() == propertyName) {
                if (propNum >= 0 && propNum < this._xmlArray.length) {
                    var child = this._xmlArray[propNum];
                    retVal.append(child);
                    retVal.targetObject = child;
                }
                return retVal.e4x();
            }
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var list = strict(this._xmlArray[i].child(propertyName), XMLList);
                if (list.length()) {
                    retVal.concat(list);
                }
            }
            return retVal.e4x();
        };
        XMLList.prototype.childIndex = function () {
            if (this.isSingle()) {
                return this._xmlArray[0].childIndex();
            }
            throw new Error("childIndex can only be called on an XMLList with one item.");
        };
        XMLList.prototype.children = function () {
            var retVal = new XMLList;
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var list = strict(this._xmlArray[i].children(), XMLList);
                if (list.length()) {
                    retVal.concat(list);
                }
            }
            return retVal.e4x();
        };
        XMLList.prototype.comments = function () {
            var retVal = new XMLList;
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var list = strict(this._xmlArray[i].comments(), XMLList);
                if (list.length()) {
                    retVal.concat(list);
                }
            }
            return retVal;
        };
        XMLList.prototype.concat = function (list) {
            if (is(list, global.XML)) {
                var newList = new XMLList;
                newList.append(list);
                list = newList;
            }
            if (!(is(list, XMLList))) {
                throw new TypeError("invalid type");
            }
            var item;
            var len = ((list.length()) >> 0);
            var i = 0;
            while (i < len) {
                this.append(list[i++]);
            }
            return this.e4x();
        };
        XMLList.prototype.contains = function (value) {
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                if (this._xmlArray[i].contains(value)) {
                    return true;
                }
            }
            return false;
        };
        XMLList.prototype.copy = function () {
            var retVal = new XMLList;
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                retVal.append(this._xmlArray[i].copy());
            }
            return retVal.e4x();
        };
        XMLList.prototype.descendants = function (name) {
            if (name === void 0) { name = "*"; }
            var retVal = new XMLList;
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var list = strict(this._xmlArray[i].descendants(name), XMLList);
                if (list.length()) {
                    retVal.concat(list);
                }
            }
            return retVal.e4x();
        };
        XMLList.prototype.elements = function (name) {
            if (name === void 0) { name = "*"; }
            var retVal = new XMLList;
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var list = strict(this._xmlArray[i].elements(name), XMLList);
                if (list.length()) {
                    retVal.concat(list);
                }
            }
            return retVal.e4x();
        };
        XMLList.prototype.elementNames = function () {
            var retVal = [];
            var i = 0, len = this._xmlArray.length;
            while (i < len) {
                retVal.push(i++);
            }
            return retVal;
        };
        XMLList.prototype.equals = function (list) {
            return false;
        };
        XMLList.prototype.filter = function (callback) {
            var list = new XMLList;
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var child = strict(this._xmlArray[i].e4x(), global.XML);
                if (callback(child)) {
                    list.append(child);
                }
            }
            list.targetObject = this._targetObject;
            list.targetProperty = this._targetProperty;
            return list.e4x();
        };
        XMLList.prototype.hasComplexContent = function () {
            if (this.isEmpty()) {
                return false;
            }
            var len = this._xmlArray.length;
            for (var i = 1; i < len; i++) {
                if (this._xmlArray[i].hasComplexContent()) {
                    return true;
                }
            }
            return false;
        };
        XMLList.prototype.hasOwnProperty = function (propertyName) {
            var propNum = ((propertyName) >> 0);
            if (propNum.toString() == propertyName) {
                return propNum < this._xmlArray.length;
            }
            var len = this._xmlArray.length;
            for (var i = 1; i < len; i++) {
                if (this._xmlArray[i].hasOwnProperty(propertyName)) {
                    return true;
                }
            }
            return false;
        };
        XMLList.prototype.hasSimpleContent = function () {
            if (this.isEmpty()) {
                return true;
            }
            var len = this._xmlArray.length;
            for (var i = 1; i < len; i++) {
                if (this._xmlArray[i].hasComplexContent()) {
                    return false;
                }
            }
            return true;
        };
        XMLList.prototype.length = function () {
            return this._xmlArray.length;
        };
        XMLList.prototype.name = function () {
            if (this.isSingle()) {
                return this._xmlArray[0].name();
            }
            return null;
        };
        XMLList.prototype.normalize = function () {
            return this;
        };
        XMLList.prototype.parent = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            var retVal = strict(this._xmlArray[0].parent(), global.XML);
            var len = this._xmlArray.length;
            for (var i = 1; i < len; i++) {
                if (this._xmlArray[i].parent() != retVal) {
                    return undefined;
                }
            }
            return retVal;
        };
        XMLList.prototype.plus = function (rightHand) {
            if (is(rightHand, global.XML) || is(rightHand, XMLList)) {
                var list = new XMLList;
                list.concat(this);
                list.concat(rightHand);
                if (is(rightHand, global.XML)) {
                    list.targetObject = rightHand;
                }
                else {
                    list.targetObject = rightHand.targetObject;
                    list.targetProperty = rightHand.targetProperty;
                }
                return list;
            }
            if (is(rightHand, 'String'))
                return this.toString() + rightHand;
            if (is(rightHand, 'Number') && isNaN(rightHand))
                return NaN;
            if (isNaN((+(this.toString()))) || isNaN((+(rightHand.toString()))))
                return this.toString() + rightHand.toString();
            return (+(this.toString())) + rightHand;
        };
        XMLList.prototype.processingInstructions = function (name) {
            if (name === void 0) { name = "*"; }
            name = as(name, 'String');
            var retVal = new XMLList;
            if (!name) {
                return retVal;
            }
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var child = this._xmlArray[i];
                if (child.nodeKind() != "processing-instruction") {
                    continue;
                }
                if (name == "*") {
                    retVal.append(child);
                }
                else if (name == child.localName) {
                    retVal.append(child);
                }
            }
            return retVal.e4x();
        };
        XMLList.prototype.removeChild = function (child) {
            var i = 0;
            var len = 0;
            if (is(child, 'String')) {
                var propNum = ((child) >> 0);
                if (propNum.toString() == child) {
                    this.removeChildAt(propNum);
                }
                else if (this.isSingle()) {
                    this._xmlArray[0].removeChild(child);
                }
                return;
            }
            if (is(child, 'Number')) {
                i = ((child) >> 0);
                this.removeChildAt(i);
                return;
            }
            if (is(child, XMLList)) {
                len = ((child.length()) >> 0);
                for (i = 0; i < len; i++) {
                    this.removeChild(child[i]);
                }
            }
            else if (is(child, global.XML)) {
                len = ((this._xmlArray.length - 1) >> 0);
                for (i = len; i >= 0; i--) {
                    if (this._xmlArray[i] == child) {
                        this._xmlArray.splice(i, 1);
                        if (child.hasAncestor(this._targetObject)) {
                            child.parent().removeChild(child);
                        }
                    }
                }
            }
        };
        XMLList.prototype.removeChildAt = function (idx) {
            idx = ((idx) >> 0);
            if (idx >= 0 && idx < this._xmlArray.length) {
                var child = strict(this._xmlArray[idx], global.XML);
                this._xmlArray.splice(idx, 1);
                if (child.hasAncestor(this._targetObject)) {
                    child.parent().removeChild(child);
                }
            }
        };
        XMLList.prototype.replaceChildAt = function (idx, child) {
            idx = ((idx) >> 0);
            var i = 0;
            var childToReplace = strict(this._xmlArray[idx], global.XML);
            if (childToReplace && this._targetObject) {
                this._targetObject.replaceChildAt(childToReplace.childIndex(), child);
            }
            if (is(child, global.XML)) {
                this._xmlArray[idx] = child;
            }
            else if (is(child, XMLList)) {
                var len = ((child.length()) >> 0);
                for (i = 0; i < len; i++) {
                    if (i == 0)
                        this._xmlArray[idx] = child[i];
                    else
                        this._xmlArray.splice(idx + i, 0, child[i]);
                }
            }
            while (idx++ < this._xmlArray.length) {
                if (!this.hasOwnProperty(idx))
                    this.addIndex(idx);
            }
        };
        Object.defineProperty(XMLList.prototype, "targetObject", {
            get: function () {
                return this._targetObject;
            },
            set: function (value) {
                this._targetObject = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XMLList.prototype, "targetProperty", {
            get: function () {
                return this._targetProperty;
            },
            set: function (value) {
                this._targetProperty = value;
            },
            enumerable: true,
            configurable: true
        });
        XMLList.prototype.setAttribute = function (attr, value) {
            value = as(value, 'String');
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                this._xmlArray[i].setAttribute(attr, value);
            }
        };
        XMLList.prototype.hasAncestor = function (obj) {
            if (this.isSingle()) {
                return this._xmlArray[0].hasAncestor(obj);
            }
            return false;
        };
        XMLList.prototype.insertChildAfter = function (child1, child2) {
            child1 = strict(child1, global.XML);
            child2 = strict(child2, global.XML);
            if (this.isSingle()) {
                return this._xmlArray[0].insertChildAfter(child1, child2);
            }
            return null;
        };
        XMLList.prototype.insertChildBefore = function (child1, child2) {
            child1 = strict(child1, global.XML);
            child2 = strict(child2, global.XML);
            if (this.isSingle()) {
                return this._xmlArray[0].insertChildAfter(child1, child2);
            }
            return null;
        };
        XMLList.prototype.namespace = function (prefix) {
            if (prefix === void 0) { prefix = null; }
            prefix = as(prefix, 'String');
            if (this.isSingle()) {
                return this._xmlArray[0].namespace(prefix);
            }
            return null;
        };
        XMLList.prototype.nodeKind = function () {
            if (this.isSingle()) {
                return this._xmlArray[0].nodeKind();
            }
            return null;
        };
        XMLList.prototype.removeNamespace = function (ns) {
            if (this.isSingle()) {
                return this._xmlArray[0].removeNamespace(ns);
            }
            return null;
        };
        XMLList.prototype.replace = function (propertyName, value) {
            if (this.isSingle()) {
                return this._xmlArray[0].replace(propertyName, value);
            }
        };
        XMLList.prototype.setChild = function (elementName, elements) {
            if (this.isSingle()) {
                this._xmlArray[0].setChild(elementName, elements);
            }
        };
        XMLList.prototype.setParent = function (parent) {
            parent = strict(parent, global.XML);
            if (this.isSingle()) {
                this._xmlArray[0].setParent(parent);
            }
        };
        XMLList.prototype.setChildren = function (value) {
            if (this.isSingle()) {
                return this._xmlArray[0].setChildren(value);
            }
            return null;
        };
        XMLList.prototype.setLocalName = function (name) {
            name = as(name, 'String');
            if (this.isSingle()) {
                this._xmlArray[0].setLocalName(name);
            }
        };
        XMLList.prototype.setName = function (name) {
            name = as(name, 'String');
            if (this.isSingle()) {
                this._xmlArray[0].setName(name);
            }
        };
        XMLList.prototype.setNamespace = function (ns) {
            ns = strict(ns, global.Namespace);
            if (this.isSingle()) {
                this._xmlArray[0].setNamespace(ns);
            }
        };
        XMLList.prototype.text = function () {
            var retVal = new XMLList;
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var list = strict(this._xmlArray[i].text(), XMLList);
                if (list.length()) {
                    retVal.concat(list);
                }
            }
            return retVal;
        };
        XMLList.prototype.toLocaleString = function () {
            var retVal = [];
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var str = as(this._xmlArray[i].toLocaleString(), 'String');
                if (str) {
                    retVal.push(str);
                }
            }
            return retVal.join('');
        };
        XMLList.prototype.toString = function () {
            var retVal = [];
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var str = as(this._xmlArray[i].toString(), 'String');
                if (str) {
                    retVal.push(str);
                }
            }
            return retVal.join('');
        };
        XMLList.prototype.toXMLString = function () {
            var retVal = [];
            var len = this._xmlArray.length;
            for (var i = 0; i < len; i++) {
                var str = as(this._xmlArray[i].toXMLString(), 'String');
                if (str) {
                    retVal.push(str);
                }
            }
            return retVal.join('\n');
        };
        XMLList.prototype.valueOf = function () {
            if (this.isEmpty()) {
                return '';
            }
            if (this.isSingle()) {
                return this._xmlArray[0].valueOf();
            }
            return this.toString();
        };
        XMLList.prototype.anchor = function (name) {
            name = as(name, 'String');
            return this.isSingle() ? this._xmlArray[0].anchor(name) : "";
        };
        XMLList.prototype.charAt = function (index) {
            index = (+(index));
            return this.isSingle() ? this._xmlArray[0].charAt(index) : "";
        };
        XMLList.prototype.charCodeAt = function (index) {
            index = (+(index));
            return this.isSingle() ? this._xmlArray[0].charCodeAt(index) : -1;
        };
        XMLList.prototype.codePointAt = function (pos) {
            pos = (+(pos));
            return this.isSingle() ? this._xmlArray[0].codePointAt(pos) : -1;
        };
        XMLList.prototype.indexOf = function (searchValue, fromIndex) {
            if (fromIndex === void 0) { fromIndex = 0; }
            searchValue = as(searchValue, 'String');
            fromIndex = (+(fromIndex));
            return this.isSingle() ? this._xmlArray[0].indexOf(searchValue, fromIndex) : -1;
        };
        XMLList.prototype.lastIndexOf = function (searchValue, fromIndex) {
            if (fromIndex === void 0) { fromIndex = 0; }
            searchValue = as(searchValue, 'String');
            fromIndex = (+(fromIndex));
            return this.isSingle() ? this._xmlArray[0].lastIndexOf(searchValue, fromIndex) : -1;
        };
        XMLList.prototype.localeCompare = function (compareString, locales, options) {
            if (locales === void 0) { locales = undefined; }
            if (options === void 0) { options = undefined; }
            compareString = as(compareString, 'String');
            return this.isSingle() ? this._xmlArray[0].localeCompare(compareString, locales, options) : NaN;
        };
        XMLList.prototype.match = function (regexp) {
            return this.isSingle() ? this._xmlArray[0].match(regexp) : null;
        };
        XMLList.prototype.search = function (regexp) {
            return this.isSingle() ? this._xmlArray[0].search(regexp) : -1;
        };
        XMLList.prototype.slice = function (beginSlice, endSlice) {
            if (endSlice === void 0) { endSlice = undefined; }
            beginSlice = (+(beginSlice));
            return this.isSingle() ? this._xmlArray[0].slice(beginSlice, endSlice) : null;
        };
        XMLList.prototype.split = function (separator, limit) {
            if (separator === void 0) { separator = undefined; }
            if (limit === void 0) { limit = undefined; }
            return this.isSingle() ? this._xmlArray[0].split(separator, limit) : null;
        };
        XMLList.prototype.substr = function (start, length) {
            if (length === void 0) { length = undefined; }
            start = (+(start));
            return this.isSingle() ? this._xmlArray[0].substr(start, length) : null;
        };
        XMLList.prototype.substring = function (indexStart, indexEnd) {
            if (indexEnd === void 0) { indexEnd = undefined; }
            indexStart = (+(indexStart));
            return this.isSingle() ? this._xmlArray[0].substring(indexStart, indexEnd) : null;
        };
        XMLList.prototype.toLocaleLowerCase = function () {
            return this.isSingle() ? this._xmlArray[0].toLocaleLowerCase() : null;
        };
        XMLList.prototype.toLocaleUpperCase = function () {
            return this.isSingle() ? this._xmlArray[0].toLocaleUpperCase() : null;
        };
        XMLList.prototype.toLowerCase = function () {
            return this.isSingle() ? this._xmlArray[0].toLowerCase() : null;
        };
        XMLList.prototype.toUpperCase = function () {
            return this.isSingle() ? this._xmlArray[0].toUpperCase() : null;
        };
        XMLList.prototype.trim = function () {
            return this.isSingle() ? this._xmlArray[0].trim() : null;
        };
        XMLList.prototype.toExponential = function (fractionDigits) {
            if (fractionDigits === void 0) { fractionDigits = undefined; }
            return this.isSingle() ? this._xmlArray[0].toExponential(fractionDigits) : NaN;
        };
        XMLList.prototype.toFixed = function (digits) {
            if (digits === void 0) { digits = undefined; }
            return this.isSingle() ? this._xmlArray[0].toFixed(digits) : NaN;
        };
        XMLList.prototype.toPrecision = function (precision) {
            if (precision === void 0) { precision = undefined; }
            return this.isSingle() ? this._xmlArray[0].toPrecision(precision) : NaN;
        };
        XMLList.prototype.isEmpty = function () {
            return this._xmlArray.length == 0;
        };
        XMLList.prototype.isSingle = function () {
            return this._xmlArray.length == 1;
        };
        XMLList.prototype.__iterator = function (forEach) {
            var l = this.length();
            var a = [], al = 0;
            for (var i = 0; i < l; ++i) {
                var v = this[i];
                if (v == null) {
                    continue;
                }
                if (forEach) {
                    a[al++] = v;
                }
                else {
                    a[al++] = i;
                }
            }
            return a;
        };
        return XMLList;
    }());
    global.XMLList = XMLList;
})(global || (global = {}));
//# sourceMappingURL=XMLList.js.map