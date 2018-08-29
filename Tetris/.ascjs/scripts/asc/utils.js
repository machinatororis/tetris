(function () {

    // this
    var _this = window.asc || (window.asc = {});

    // utils
    var utils = _this.utils || (_this.utils = {});

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                      Domain                                                        //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getHostName (url) {
        if (typeof url !== 'string') {
            return null;
        }

        if (url.indexOf('file:') === 0) {
            return 'localhost';
        }

        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        }

        return null;
    }

    function getDomain (url) {
        if (typeof url !== 'string') {
            return null;
        }

        if (url.indexOf('file:') === 0) {
            return 'localhost';
        }

        var hostName = utils.getHostName(url);
        var domain = hostName;

        if (hostName != null) {
            var parts = hostName.split('.').reverse();

            if (parts != null && parts.length > 1) {
                domain = parts[1] + '.' + parts[0];

                if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
                    domain = parts[2] + '.' + domain;
                }
            }
        }

        return domain;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                         Map                                                        //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function MapSimple () {
        this.__arr = [];
        this.__len = 0;
        return this;
    }

    Object.defineProperty(MapSimple.prototype, 'get', {
        value: function (k) {
            var i = this.indexOf(k);
            if (i >= 0) return this.__arr[i].v;
            return undefined;
        }
    });

    Object.defineProperty(MapSimple.prototype, 'set', {
        value: function (k, v) {
            var i = this.indexOf(k);
            if (i >= 0) {
                this.__arr[i].v = v;
                return v;
            }
            this.__arr.push({ k: k, v: v });
            this.__len++;
            return v;
        }
    });

    Object.defineProperty(MapSimple.prototype, 'delete', {
        value: function (k) {
            var i = this.indexOf(k);
            if (i >= 0) {
                this.__arr.splice(i, 1);
                this.__len--;
                return true;
            }
            return false;
        }
    });

    Object.defineProperty(MapSimple.prototype, 'indexOf', {
        value: function (k) {
            for (var i = 0; i < this.__len; ++i) {
                if (this.__arr[i].k == k) {
                    return i;
                }
            }
            return -1;
        }
    });

    Object.defineProperty(MapSimple.prototype, 'keys', {
        get: function () {
            return this.__arr.map(function (o) { return o.k; });
        }
    });

    Object.defineProperty(MapSimple.prototype, 'values', {
        get: function () {
            return this.__arr.map(function (o) { return o.v; });
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                       EReg                                                         //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function EReg (r, opt) {
        if (typeof r !== 'string') r = String(r);
        if (typeof opt !== 'string') r = String(opt);
        this.r = new RegExp(r, opt);
        return this;
    }

    Object.defineProperty(EReg.prototype, 'match', {
        value: function (s) {
            if (typeof s !== 'string') r = String(s);
            if (this.r.global) {
                this.r.lastIndex = 0;
            }
            return (this.result = this.r.exec(s)) != null;
        }
    });

    Object.defineProperty(EReg.prototype, 'matched', {
        value: function (n) {
            n = n | 0;
            if (this.result != null && n >= 0 && n < this.result.length) {
                return this.result[n];
            } else {
                throw "EReg::matched";
            }
        }
    });

    Object.defineProperty(EReg.prototype, 'matchedLeft', {
        value: function () {
            if (this.result == null) {
                throw "No string matched";
            }
            return this.result.input.substr(0, this.result.index);
        }
    });

    Object.defineProperty(EReg.prototype, 'matchedRight', {
        value: function () {
            if (this.result == null) {
                throw "No string matched";
            }
            var rl = (this.result.index | 0) + this.result[0].length;
            var s = this.result.input;
            return s.substr(rl, s.length - rl);
        }
    });

    Object.defineProperty(EReg.prototype, 'matchedPos', {
        value: function () {
            if (this.result == null) {
                throw "No string matched";
            }
            return {
                pos: (this.result.index) | 0,
                len: (String(this.result[0]).length) | 0
            };
        }
    });

    Object.defineProperty(EReg.prototype, 'matchSub', {
        value: function (s, pos, len) {
            if (typeof s !== 'string') r = String(s);
            if (typeof len === 'undefined') len = -1;
            pos = pos | 0;
            len = len | 0;
            if (this.r.global) {
                this.r.lastIndex = pos;
                this.result = this.r.exec(len < 0 ? s : s.substr(0, pos + len));
                var b = this.result != null;
                if (b) {
                    this.result.input = s;
                }
                return b;
            } else {
                var b = this.match(len < 0 ? s.substr(pos) : s.substr(pos, len));
                if (b) {
                    this.result.input = s;
                    this.result.index += pos;
                }
                return b;
            }
        }
    });

    Object.defineProperty(EReg.prototype, 'split', {
        value: function (s) {
            if (typeof s !== 'string') r = String(s);
            var d = "#__delim__#";
            return s.replace(this.r, d).split(d);
        }
    });

    Object.defineProperty(EReg.prototype, 'replace', {
        value: function (s, by) {
            if (typeof s !== 'string') r = String(s);
            return s.replace(this.r, by);
        }
    });

    Object.defineProperty(EReg.prototype, 'map', {
        value: function (s, f) {
            if (typeof s !== 'string') r = String(s);
            var offset = 0;
            var buf = '';
            var first = true;
            do {
                if (offset >= s.length) {
                    break;
                } else if (!this.matchSub(s, offset)) {
                    buf += s.substr(offset);
                    break;
                }
                var p = this.matchedPos();
                buf += s.substr(offset, p.pos - offset);
                buf += f(this);
                if (p.len == 0) {
                    buf += s.substr(p.pos, 1);
                    offset = p.pos + 1;
                } else {
                    offset = p.pos + p.len;
                }
                first = false;
            } while (this.r.global);

            if (!this.r.global && offset > 0 && offset < s.length) {
                buf += s.substr(offset);
            }

            return buf;
        }
    });

    Object.defineProperty(EReg, 'escape', {
        value: function (s) {
            if (typeof s !== 'string') r = String(s);
            return s.replace(EReg.escapeRe, "\\$&");
        }
    });

    Object.defineProperty(EReg, 'escapeRe', {
        value: new RegExp("[.*+?^${}()|[\\]\\\\]", "g")
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                       Attach                                                       //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // domain
    utils.getHostName = getHostName;
    utils.getDomain = getDomain;

    // map
    utils.NATIVE_MAP_AVAILABLE = window.Map && typeof Map.prototype.keys === 'function' && typeof Map.prototype.values === 'function';
    utils.MapSimple = MapSimple;

    // gesture
    if (typeof utils.wasGesture === 'undefined') {
        utils.wasGesture = true;
    }

    // haxe
    utils.EReg = EReg;

})();