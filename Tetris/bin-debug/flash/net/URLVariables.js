var flash;
(function (flash) {
    var net;
    (function (net) {
        var URLVariables = (function () {
            function URLVariables(source) {
                if (source === void 0) { source = null; }
                source = as(source, 'String');
                if (source != null) {
                    try {
                        this.decode(source);
                    }
                    catch (e) {
                        e = window.asc.e2e(e);
                    }
                }
            }
            URLVariables.prototype.decode = function (source) {
                source = as(source, 'String');
                if (!source) {
                    return;
                }
                var q = source.indexOf('?');
                if (q >= 0) {
                    source = source.substr(q + 1);
                }
                var param = null;
                var equalsIndex = 0;
                var name = null;
                var value = null;
                var oldValue = undefined;
                var params = source.split("&");
                for (var i = 0; i < params.length; i++) {
                    param = as(params[i], 'String');
                    equalsIndex = param.indexOf("=");
                    if (equalsIndex == -1) {
                        Error.throwError(Error, 2101);
                    }
                    else {
                        name = decodeURI(param.substr(0, equalsIndex));
                        value = decodeURI(param.substr(equalsIndex + 1));
                        oldValue = this[name];
                        if (oldValue != undefined) {
                            if (!(is(oldValue, Array))) {
                                this[name] = oldValue = [oldValue];
                            }
                            oldValue.push(value);
                        }
                        else {
                            this[name] = value;
                        }
                    }
                }
            };
            URLVariables.prototype.toString = function () {
                var name = null;
                var escapedName = null;
                var value = undefined;
                var i = 0;
                var s = "";
                var first = true;
                var __for0 = window.asc.in(this);
                for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                    name = __for0_1[_i];
                    if (name == 'decode') {
                        continue;
                    }
                    escapedName = encodeURI(name);
                    value = this[name];
                    if (is(value, Array)) {
                        for (i = 0; i < value.length; i++) {
                            if (!first) {
                                s = s + "&";
                            }
                            s = s + escapedName;
                            s = s + "=";
                            s = s + encodeURI(as(value[i], 'String'));
                            first = false;
                        }
                    }
                    else {
                        if (!first) {
                            s = s + "&";
                        }
                        s = s + escapedName;
                        s = s + "=";
                        s = s + encodeURI(as(value, 'String'));
                        first = false;
                    }
                }
                return s;
            };
            return URLVariables;
        }());
        net.URLVariables = URLVariables;
    })(net = flash.net || (flash.net = {}));
})(flash || (flash = {}));
//# sourceMappingURL=URLVariables.js.map