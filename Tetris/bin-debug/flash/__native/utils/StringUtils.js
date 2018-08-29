var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var utils;
        (function (utils) {
            var StringUtils = (function () {
                function StringUtils() {
                }
                StringUtils.trim = function (input) {
                    input = as(input, 'String');
                    return StringUtils.ltrim(StringUtils.rtrim(input));
                };
                StringUtils.ltrim = function (input) {
                    input = as(input, 'String');
                    if (input != null) {
                        var size = input.length;
                        for (var i = 0; i < size; i++) {
                            if (input.charCodeAt(i) > 32) {
                                return input.substring(i);
                            }
                        }
                    }
                    return "";
                };
                StringUtils.rtrim = function (input) {
                    input = as(input, 'String');
                    if (input != null) {
                        var size = input.length;
                        for (var i = size; i > 0; i--) {
                            if (input.charCodeAt(i - 1) > 32) {
                                return input.substring(0, i);
                            }
                        }
                    }
                    return "";
                };
                StringUtils.simpleEscape = function (input) {
                    input = as(input, 'String');
                    input = input.split("\n").join("\\n");
                    input = input.split("\r").join("\\r");
                    input = input.split("\t").join("\\t");
                    input = input.split("\f").join("\\f");
                    input = input.split("\b").join("\\b");
                    return input;
                };
                StringUtils.strictEscape = function (input, trim) {
                    if (trim === void 0) { trim = true; }
                    input = as(input, 'String');
                    trim = Boolean(trim);
                    if (input != null && input.length > 0) {
                        if (trim) {
                            input = StringUtils.trim(input);
                        }
                        input = encodeURIComponent(input);
                        var a = input.split("");
                        for (var i = 0; i < a.length; i++) {
                            switch (a[i]) {
                                case "!":
                                    a[i] = "%21";
                                    break;
                                case "'":
                                    a[i] = "%27";
                                    break;
                                case "(":
                                    a[i] = "%28";
                                    break;
                                case ")":
                                    a[i] = "%29";
                                    break;
                                case "*":
                                    a[i] = "%2A";
                                    break;
                                case "-":
                                    a[i] = "%2D";
                                    break;
                                case ".":
                                    a[i] = "%2E";
                                    break;
                                case "_":
                                    a[i] = "%5F";
                                    break;
                                case "~":
                                    a[i] = "%7E";
                                    break;
                            }
                        }
                        return a.join("");
                    }
                    return "";
                };
                StringUtils.repeat = function (n, str) {
                    if (str === void 0) { str = " "; }
                    n = ((n) >>> 0);
                    str = as(str, 'String');
                    return new Array(n + 1).join(str);
                };
                StringUtils.printf = function (format) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    format = as(format, 'String');
                    var result = "";
                    var indexValue = 0;
                    var isIndexed = -1;
                    var typeLookup = "diufFeEgGxXoscpn";
                    for (i = 0; StringUtils.i < format.length; StringUtils.i++) {
                        var c = format.charAt(StringUtils.i);
                        if (c == "%") {
                            if (++StringUtils.i < format.length) {
                                c = format.charAt(StringUtils.i);
                                if (c == "%") {
                                    result += c;
                                }
                                else {
                                    var flagSign = false;
                                    var flagLeftAlign = false;
                                    var flagAlternate = false;
                                    var flagLeftPad = false;
                                    var flagZeroPad = false;
                                    var width = -1;
                                    var precision = -1;
                                    var type = "";
                                    var value;
                                    var j = 0;
                                    var idx = StringUtils.getIndex(format);
                                    if (idx < -1 || idx == 0) {
                                        trace("ERR parsing index");
                                        break;
                                    }
                                    else if (idx == -1) {
                                        if (isIndexed == 1) {
                                            trace("ERR: indexed placeholder expected");
                                            break;
                                        }
                                        if (isIndexed == -1) {
                                            isIndexed = 0;
                                        }
                                        indexValue++;
                                    }
                                    else {
                                        if (isIndexed == 0) {
                                            trace("ERR: non-indexed placeholder expected");
                                            break;
                                        }
                                        if (isIndexed == -1) {
                                            isIndexed = 1;
                                        }
                                        indexValue = idx;
                                    }
                                    while ((c = format.charAt(StringUtils.i)) == "+" || c == "-" || c == "#" || c == " " || c == "0") {
                                        switch (c) {
                                            case "+":
                                                flagSign = true;
                                                break;
                                            case "-":
                                                flagLeftAlign = true;
                                                break;
                                            case "#":
                                                flagAlternate = true;
                                                break;
                                            case " ":
                                                flagLeftPad = true;
                                                break;
                                            case "0":
                                                flagZeroPad = true;
                                                break;
                                        }
                                        if (++StringUtils.i == format.length) {
                                            break;
                                        }
                                        c = format.charAt(StringUtils.i);
                                    }
                                    if (StringUtils.i == format.length) {
                                        break;
                                    }
                                    if (c == "*") {
                                        var widthIndex = 0;
                                        if (++StringUtils.i == format.length) {
                                            break;
                                        }
                                        idx = StringUtils.getIndex(format);
                                        if (idx < -1 || idx == 0) {
                                            trace("ERR parsing index for width");
                                            break;
                                        }
                                        else if (idx == -1) {
                                            if (isIndexed == 1) {
                                                trace("ERR: indexed placeholder expected for width");
                                                break;
                                            }
                                            if (isIndexed == -1) {
                                                isIndexed = 0;
                                            }
                                            widthIndex = ((indexValue++) >> 0);
                                        }
                                        else {
                                            if (isIndexed == 0) {
                                                trace("ERR: non-indexed placeholder expected for width");
                                                break;
                                            }
                                            if (isIndexed == -1) {
                                                isIndexed = 1;
                                            }
                                            widthIndex = idx;
                                        }
                                        widthIndex--;
                                        if (args.length > widthIndex && widthIndex >= 0) {
                                            width = parseInt(args[widthIndex]);
                                            if (isNaN(width)) {
                                                width = -1;
                                                trace("ERR NaN while parsing width");
                                                break;
                                            }
                                        }
                                        else {
                                            trace("ERR index out of bounds while parsing width");
                                            break;
                                        }
                                        c = format.charAt(StringUtils.i);
                                    }
                                    else {
                                        var hasWidth = false;
                                        while (c >= "0" && c <= "9") {
                                            if (width == -1) {
                                                width = 0;
                                            }
                                            width = (((width * 10) + ((c) >>> 0)) >> 0);
                                            if (++StringUtils.i == format.length) {
                                                break;
                                            }
                                            c = format.charAt(StringUtils.i);
                                        }
                                        if (width != -1 && StringUtils.i == format.length) {
                                            trace("ERR eof while parsing width");
                                            break;
                                        }
                                    }
                                    if (c == ".") {
                                        if (++StringUtils.i == format.length) {
                                            break;
                                        }
                                        c = format.charAt(StringUtils.i);
                                        if (c == "*") {
                                            var precisionIndex = 0;
                                            if (++StringUtils.i == format.length) {
                                                break;
                                            }
                                            idx = StringUtils.getIndex(format);
                                            if (idx < -1 || idx == 0) {
                                                trace("ERR parsing index for precision");
                                                break;
                                            }
                                            else if (idx == -1) {
                                                if (isIndexed == 1) {
                                                    trace("ERR: indexed placeholder expected for precision");
                                                    break;
                                                }
                                                if (isIndexed == -1) {
                                                    isIndexed = 0;
                                                }
                                                precisionIndex = ((indexValue++) >> 0);
                                            }
                                            else {
                                                if (isIndexed == 0) {
                                                    trace("ERR: non-indexed placeholder expected for precision");
                                                    break;
                                                }
                                                if (isIndexed == -1) {
                                                    isIndexed = 1;
                                                }
                                                precisionIndex = idx;
                                            }
                                            precisionIndex--;
                                            if (args.length > precisionIndex && precisionIndex >= 0) {
                                                precision = parseInt(args[precisionIndex]);
                                                if (isNaN(precision)) {
                                                    precision = -1;
                                                    trace("ERR NaN while parsing precision");
                                                    break;
                                                }
                                            }
                                            else {
                                                trace("ERR index out of bounds while parsing precision");
                                                break;
                                            }
                                            c = format.charAt(StringUtils.i);
                                        }
                                        else {
                                            while (c >= "0" && c <= "9") {
                                                if (precision == -1) {
                                                    precision = 0;
                                                }
                                                precision = (((precision * 10) + ((c) >>> 0)) >> 0);
                                                if (++StringUtils.i == format.length) {
                                                    break;
                                                }
                                                c = format.charAt(StringUtils.i);
                                            }
                                            if (precision != -1 && StringUtils.i == format.length) {
                                                trace("ERR eof while parsing precision");
                                                break;
                                            }
                                        }
                                    }
                                    switch (c) {
                                        case "h":
                                        case "l":
                                            if (++StringUtils.i == format.length) {
                                                trace("ERR eof after length");
                                                break;
                                            }
                                            var c1 = format.charAt(StringUtils.i);
                                            if ((c == "h" && c1 == "h") || (c == "l" && c1 == "l")) {
                                                if (++StringUtils.i == format.length) {
                                                    trace("ERR eof after length");
                                                    break;
                                                }
                                                c = format.charAt(StringUtils.i);
                                            }
                                            else {
                                                c = c1;
                                            }
                                            break;
                                        case "L":
                                        case "z":
                                        case "j":
                                        case "t":
                                            if (++StringUtils.i == format.length) {
                                                trace("ERR eof after length");
                                                break;
                                            }
                                            c = format.charAt(StringUtils.i);
                                            break;
                                    }
                                    if (typeLookup.indexOf(c) >= 0) {
                                        type = c;
                                    }
                                    else {
                                        trace("ERR unknown type: " + c);
                                        break;
                                    }
                                    if (args.length >= indexValue && indexValue > 0) {
                                        value = args[indexValue - 1];
                                    }
                                    else {
                                        trace("ERR value index out of bounds (" + indexValue + ")");
                                        break;
                                    }
                                    var valueStr;
                                    var valueFloat = NaN;
                                    var valueInt = 0;
                                    var sign = StringUtils.SIGN_UNDEF;
                                    switch (type) {
                                        case "s":
                                            valueStr = as(value.toString(), 'String');
                                            if (precision != -1) {
                                                valueStr = valueStr.substr(0, precision);
                                            }
                                            break;
                                        case "c":
                                            valueStr = as(value.toString().getAt(0), 'String');
                                            break;
                                        case "d":
                                        case "i":
                                            valueInt = ((typeof value == "number") ? ((value) >> 0) : parseInt(value));
                                            valueStr = Math.abs(valueInt).toString();
                                            sign = (valueInt < 0) ? StringUtils.SIGN_NEG : StringUtils.SIGN_POS;
                                            break;
                                        case "u":
                                            valueStr = ((typeof value == "number") ? ((value) >>> 0) : ((parseInt(value)) >>> 0)).toString();
                                            break;
                                        case "f":
                                        case "F":
                                        case "e":
                                        case "E":
                                        case "g":
                                        case "G":
                                            if (precision == -1) {
                                                precision = 6;
                                            }
                                            var exp10 = Math.pow(10, precision);
                                            valueFloat = (typeof value == "number") ? (+(value)) : parseFloat(value);
                                            valueStr = as((Math.round(Math.abs(valueFloat) * exp10) / exp10).toString(), 'String');
                                            if (precision > 0) {
                                                var numZerosToAppend = 0;
                                                var dotPos = valueStr.indexOf(".");
                                                if (dotPos == -1) {
                                                    valueStr += ".";
                                                    numZerosToAppend = precision;
                                                }
                                                else {
                                                    numZerosToAppend = ((precision - (valueStr.length - dotPos - 1)) >> 0);
                                                }
                                                for (j = 0; j < numZerosToAppend; j++) {
                                                    valueStr += "0";
                                                }
                                            }
                                            sign = (valueFloat < 0) ? StringUtils.SIGN_NEG : StringUtils.SIGN_POS;
                                            break;
                                        case "x":
                                        case "X":
                                        case "p":
                                            valueStr = ((typeof value == "number") ? ((value) >>> 0) : parseInt(value)).toString(16);
                                            if (type == "X") {
                                                valueStr = valueStr.toUpperCase();
                                            }
                                            break;
                                        case "o":
                                            valueStr = ((typeof value == "number") ? ((value) >>> 0) : parseInt(value)).toString(8);
                                            break;
                                    }
                                    var hasSign = ((sign == StringUtils.SIGN_NEG) || flagSign || flagLeftPad);
                                    if (width > -1) {
                                        var numFill = ((width - valueStr.length) >> 0);
                                        if (hasSign) {
                                            numFill--;
                                        }
                                        if (numFill > 0) {
                                            var fillChar = (flagZeroPad && !flagLeftAlign) ? "0" : " ";
                                            if (flagLeftAlign) {
                                                for (j = 0; j < numFill; j++) {
                                                    valueStr += fillChar;
                                                }
                                            }
                                            else {
                                                for (j = 0; j < numFill; j++) {
                                                    valueStr = fillChar + valueStr;
                                                }
                                            }
                                        }
                                    }
                                    if (hasSign) {
                                        if (sign == StringUtils.SIGN_POS) {
                                            valueStr = (flagLeftPad ? " " : "0") + valueStr;
                                        }
                                        else {
                                            valueStr = "-" + valueStr;
                                        }
                                    }
                                    result += valueStr;
                                }
                            }
                            else {
                                result += c;
                            }
                        }
                        else {
                            result += c;
                        }
                    }
                    return result;
                };
                StringUtils.getIndex = function (format) {
                    format = as(format, 'String');
                    var result = 0;
                    var isIndexed = false;
                    var c = "";
                    var iTmp = StringUtils.i;
                    while ((c = format.charAt(StringUtils.i)) >= "0" && c <= "9") {
                        isIndexed = true;
                        result = (((result * 10) + ((c) >>> 0)) >> 0);
                        if (++StringUtils.i == format.length) {
                            return -2;
                        }
                    }
                    if (isIndexed) {
                        if (c != "$") {
                            StringUtils.i = iTmp;
                            return -1;
                        }
                        if (++StringUtils.i == format.length) {
                            return -2;
                        }
                        return result;
                    }
                    else {
                        return -1;
                    }
                };
                StringUtils.i = 0;
                StringUtils.SIGN_UNDEF = 0;
                StringUtils.SIGN_POS = -1;
                StringUtils.SIGN_NEG = 1;
                return StringUtils;
            }());
            utils.StringUtils = StringUtils;
        })(utils = __native.utils || (__native.utils = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StringUtils.js.map