var flash;
(function (flash) {
    var external;
    (function (external) {
        external.XML = global.XML;
        external.XMLList = global.XMLList;
        var ExternalInterface = (function () {
            function ExternalInterface() {
                throw new Error('Abstract class error');
            }
            Object.defineProperty(ExternalInterface, "available", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ExternalInterface, "objectID", {
                get: function () {
                    return ExternalInterface.__OBJECT_ID;
                },
                set: function (value) {
                    value = as(value, 'String');
                    ExternalInterface.__OBJECT_ID = value;
                },
                enumerable: true,
                configurable: true
            });
            ExternalInterface.addCallback = function (functionName, closure) {
                functionName = as(functionName, 'String');
                ExternalInterface.__init();
                ExternalInterface.__self[functionName] = closure;
            };
            ExternalInterface.call = function (functionName) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var CDATA = '<![CDATA[';
                ExternalInterface.__init();
                var CDATAIndex = -1;
                if (is(functionName, external.XML)) {
                    var text = strict(functionName.text(), external.XMLList);
                    if (text.length()) {
                        functionName = text[0].getValue();
                    }
                    else {
                        functionName = functionName.toXMLString();
                    }
                    CDATAIndex = ((functionName.indexOf(CDATA)) >> 0);
                    if (CDATAIndex >= 0) {
                        functionName = functionName.substring(CDATAIndex + CDATA.length, functionName.indexOf(']]>'));
                    }
                }
                var functionIndex = ((functionName.indexOf('function')) >> 0);
                if (functionIndex >= 0) {
                    functionName = functionName.substring(functionName.indexOf('{', functionIndex) + 1, functionName.lastIndexOf('}'));
                }
                if (CDATAIndex == -1 && functionName.indexOf('=') == -1 && functionName.indexOf('{') == -1) {
                    if (functionName.indexOf('return') == -1) {
                        functionName = 'return ' + functionName;
                        if (functionName.indexOf('(') == -1) {
                            functionName += '(' + ExternalInterface.newParameters(args.length).join(',') + ')';
                        }
                    }
                }
                return ExternalInterface.newFunction(functionName, ExternalInterface.newParameters(args.length)).apply(null, args);
            };
            ExternalInterface.__init = function () {
                if (ExternalInterface.__inited)
                    return;
                ExternalInterface.__self = document.createElement('object');
                ExternalInterface.__self.id = ExternalInterface.__OBJECT_ID;
                document.getElementsByTagName('head')[0].appendChild(ExternalInterface.__self);
                ExternalInterface.__inited = true;
            };
            ExternalInterface.newFunction = function (code, args) {
                code = as(code, 'String');
                args = strict(args, Array);
                if (!args.length) {
                    return new Function(code);
                }
                else {
                    return new Function(args.join(','), code);
                }
            };
            ExternalInterface.newParameters = function (length) {
                length = ((length) >> 0);
                var list = [];
                while (list.length < length)
                    list.push('__arg' + list.length);
                return list;
            };
            ExternalInterface.__OBJECT_ID = null;
            ExternalInterface.__self = null;
            ExternalInterface.__inited = false;
            return ExternalInterface;
        }());
        external.ExternalInterface = ExternalInterface;
    })(external = flash.external || (flash.external = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ExternalInterface.js.map