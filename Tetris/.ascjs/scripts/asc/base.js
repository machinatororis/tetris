// typescript
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        Object.defineProperty(d, '__extends', {
            enumerable: false,
            configurable: false,
            value: b
        });
    };
})();

(function () {

    // this
    var _this = window.asc || (window.asc = {});

    // vanilla
    var vanilla = _this.vanilla || (_this.vanilla = {});

    // base
    var base = _this.base || (_this.base = {});

    // error
    errorUtils();

    // viewport
    configureViewport();

    // create tool
    constructTool();

    // extend JavaScript
    javaScriptProto();

    // extend ActionScript
    actionScriptProto();

    // export this
    _this.in = In;
    _this.of = of;
    _this.sti = sti;
    _this.stb = stb;
    _this.e2e = e2e;
    _this.iscl = iscl;
    _this.provide = provide;
    _this.kernel$ = kernel$;
    _this.font$ = font$;
    _this.embed$ = embed$;
    _this.getMimeType = getMimeType;
    _this.getSWFTag = getSWFTag;
    _this.getSWFClass = getSWFClass;
    _this.mapSWF = mapSWF;
    _this.getMeta = getMeta;
    _this.getCtx = getCtx;
    _this.getCanvas = getCanvas;
    _this.getLocalStorage = getLocalStorage;
    _this.createDisplayObject = createDisplayObject;
    _this.getErrorHTMLText = getErrorHTMLText;

    // export as3
    window.is = is;
    window.as = as;
    window.strict = strict;
    window.int = int;
    window.uint = uint;
    window.unbind = unbind;
    window.trace = traceLater;

    // viewport
    function configureViewport (content) {
        if (typeof content !== 'string') {
            content = 'width=device-width, height=device-height, initial-scale=1, user-scalable=no, viewport-fit=cover, minimal-ui';
        }

        var head = document.getElementsByTagName('head'), m;
        if (!head || !(head = head[0])) {
            return;
        }

        // all
        m = document.createElement('meta');
        m.setAttribute('name', 'viewport');
        m.setAttribute('content', content);
        head.appendChild(m);

        m = document.createElement('meta');
        m.setAttribute('name', 'full-screen');
        m.setAttribute('content', 'yes');
        head.appendChild(m);

        // apple
        m = document.createElement('meta');
        m.setAttribute('name', 'apple-mobile-web-app-capable');
        m.setAttribute('content', 'yes');
        head.appendChild(m);

        m = document.createElement('meta');
        m.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
        m.setAttribute('content', 'black-translucent');
        head.appendChild(m);
    }

    // title
    function configureTitle (content) {
        if (typeof content !== 'string') {
            return;
        }

        var head = document.getElementsByTagName('head'), m;
        if (!head || !(head = head[0])) {
            return;
        }

        m = document.createElement('meta');
        m.setAttribute('name', 'apple-mobile-web-app-title');
        m.setAttribute('content', content);
        head.appendChild(m);
    }

    // setup
    function provide(type, name, h) {
        base.provide.length = 0;
        if (!Array.isArray(name)) {
            name = [ name ];
        }
        var l = name.length;
        for (var i = 0; i < l; ++i) {
            one(name[i]);
        }
        if (_this.release === true) {
            if (typeof _this.include === 'object') {
                var st = base.init.state;
                base.init.state = 'initialize_load';
                try {
                    window.eval(decodeURI(atob(_this.include[type])));
                } catch (e) {
                    throwError(e);
                    return;
                }
                delete _this.include[type];
                base.init.state = st;
            }
        }
        initialize(h);

        function one (name) {
            var s = name.split('.'), c = s.pop(), p = s.join('.'), t = 'window';
            var l = s.length;
            for (var i = 0; i < l; ++i) if (!eval(t += '.' + s[i])) eval(t + '={}');
            base.provide.push(name);
            if (base.package.indexOf(p = eval(p)) === -1) {
                base.package.push(p);
            }
            if (s[0] === 'global') s.shift();
            var cn = (s.length ? s.join('.') + '::' : '') + c;
            Object.defineProperty(p, c, {
                enumerable: true,
                configurable: true,
                get: function () {
                    var st = base.init.state;
                    if (st === 'initialize_load' || st === 'initialize_idle') {
                        return {
                            __provide__: name
                        };
                    }
                    return undefined;
                },
                set: function (v) {
                    // prepare class
                    if (!Object.getOwnPropertyDescriptor(v, '__className')) {
                        // avmplus.getQualifiedClassName
                        Object.defineProperty(v, '__className', {
                            enumerable: false,
                            configurable: false,
                            value: cn
                        });

                        // accessors and methods
                        for (s in v.prototype) {
                            var pd = Object.getPropertyDescriptor(v.prototype, s);
                            if (pd === undefined) continue;
                            pd.enumerable = pd.configurable = false;
                            Object.defineProperty(v.prototype, s, pd);
                        }

                        // variables and constants
                        // ...
                    }

                    // cancel get / set
                    Object.defineProperty(p, c, {
                        enumerable: true,
                        configurable: true,
                        value: v
                    });
                }
            });
        }
    }

    // initialization
    function initialize(handler) {
        if (typeof base.init.error !== 'undefined') {
            trace('Initialization aborted');
            return;
        }
        base.init.async(initialize_resolve, function () {
            try {
                base.init.sync(initialize_imports);
                base.init.sync(initialize_validate);
                base.init.sync(initialize_static);
                base.init.complete();
                handler();
            } catch (e) {
                throwError(e);
            }
        })();
    }

    // check availability and load script if needed
    function initialize_resolve(h) {

        var list = [];
        var len = base.provide.length;
        for (var i = 0; i < len; ++i) {
            var v = base.provide[i], o;
            if ((o=eval(v)) && !o.__provide__) {
                continue;
            }
            if (_this.release === true) {
                continue;
            }
            list.push('./' + v.replace('global.', '').replace(/\./g, '/') + '.js');
        }
        base.init.async(initialize_load, h, list)();
    }

    // load scripts
    function initialize_load(h, list) {

        load();

        function load() {
            if (!list || !list.length) {
                onComplete();
                return;
            }
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.addEventListener('load', load);
            script.addEventListener('error', throwError);
            script.type = 'text/javascript';
            script.src = list.shift();
            head.appendChild(script);
        }

        function onComplete () {
            if (typeof h === 'function') {
                h();
            }
        }
    }

    function initialize_validate() {
        var provide = base.provide;
        while (provide.length) {
            try {
                if (eval(provide.shift()) == void 0) {
                    throw void 0;
                }
            } catch (e) {
                throw new Error(c + ' not loaded');
            }
        }
    }

    function initialize_imports() {
        var len = base.package.length;
        for (var i = 0; i < len; ++i) {
            var p = base.package[i];
            for (var c in p) {
                var d = p[c];
                if (d === undefined) {
                    continue;
                }
                if (!d.__provide__) {
                    continue;
                }
                var v = flash.utils.getDefinitionByName(d.__provide__);
                if (!v) {
                    continue;
                }
                p[c] = v;
            }
        }
    }

    function initialize_static () {
        var len = base.package.length;
        for (var i = 0; i < len; ++i) {
            var p = base.package[i];
            for (var c in p) {
                var v = p[c];
                if (v === undefined) {
                    continue;
                }
                if (!v.__className) {
                    continue;
                }
                (function (p, c, v) {
                    Object.defineProperty(p, c, {
                        enumerable: true,
                        configurable: true,
                        get: function () {
                            Object.defineProperty(p, c, {
                                enumerable: true,
                                configurable: true,
                                value: v
                            });
                            return st$(v);
                        }
                    });
                })(p, c, v);
            }
        }
    }

    function constructTool () {
        _this.startTime = Date.now();
        _this.cache = _this.cache || {};
        _this.cache_super = _this.cache_super || {}; // optimization
        _this.compiler = {};
        Object.defineProperty(_this.compiler, 'arguments', {
            configurable: true,
            set: function (v) {
                if (v === null || typeof v !== 'object') {
                    v = {};
                }
                configureTitle(v.title);
                Object.defineProperty(_this.compiler, 'arguments', {
                    value: v
                });
            },
            get: function () {
                return {};
            }
        });

        vanilla.set = vanilla.set || function (f, v) {
            if (typeof f !== 'string') {
                return undefined;
            }
            vanilla[f] = window[f];
            window[f] = v;
            return vanilla[f];
        };
        vanilla.get = vanilla.get || function (f) {
            if (typeof f !== 'string') {
                return undefined;
            }
            return vanilla[f] || window[f];
        };
        vanilla.set('escape', encodeURI);
        vanilla.set('unescape', decodeURI);

        // base
        base.provide = base.provide || [];
        base.package = base.package || [];
        base.classInfo = base.classInfo || {};
        base.init = base.init || {
            state: 'initialize_idle',
            complete: function () {
                window.trace = trace;
                base.init.debug.print();
                var queue = _this.cache.traceLater;
                while (queue && queue.length) {
                    trace.apply(null, queue.shift());
                }
                base.init.state = 'initialize_idle';
            },
            sync: function (t, p) {
                var s = base.init.state = t.name || 'anonymous';
                base.init.debug.temp[s] = new Date().time;
                t(p);
                base.init.debug.time[s] = base.init.debug.time[s] || 0;
                base.init.debug.time[s] += new Date().time - base.init.debug.temp[s];
            },
            async: function (t, h, p) {
                return function () {
                    var s = base.init.state = t.name || 'anonymous';
                    base.init.debug.temp[s] = new Date().time;
                    t(function () {
                        base.init.debug.time[s] = base.init.debug.time[s] || 0;
                        base.init.debug.time[s] += new Date().time - base.init.debug.temp[s];
                        if (typeof h === 'function') {
                            h();
                        }
                    }, p);
                };
            },
            debug: {
                temp: {},
                time: {},
                print: function () {
                    if (_this.release === true) {
                        return;
                    }
                    var s = '';
                    s += '----------------------------\n';
                    s += '            DEBUG\n';
                    s += '----------------------------\n';
                    for (var f in this.time) {
                        s += f + ': ' + this.time[f] + ' ms\n';
                    }
                    s += '----------------------------\n';
                    trace(s);
                }
            }
        };
        base.kernel = {
            db: {
                stage: {},
                utils: {}
            },
            init: function (h) {
                var IDBStorage;
                if (_this.storage && typeof (IDBStorage = _this.storage.IDBStorage) === 'function') {
                    if (IDBStorage.needToImplement() === true) {
                        base.kernel.db.utils.localStorage = new IDBStorage(h);
                        return;
                    }
                }
                _this.getCtx();
                h();
            }
        };
    }

    function javaScriptProto() {
        // bind -> __bind
        if (!Function.prototype.__bind) {
            Object__defineProperty(Function.prototype, '__bind', {
                enumerable: false,
                value: function (BoundThis) {
                    var BoundTargetFunction = this;
                    if (BoundTargetFunction.BoundThis == BoundThis) {
                        return BoundTargetFunction;
                    }
                    var wrapper = BoundTargetFunction.bind(BoundThis);
                    wrapper.BoundThis = BoundThis;
                    wrapper.BoundTargetFunction = BoundTargetFunction;
                    return wrapper;
                }
            });
        }

        // setPrototypeOf
        if (!Object.setPrototypeOf) {
            Object__defineProperty(Object, 'setPrototypeOf', {
                enumerable: false,
                configurable: false,
                value: function(obj, proto) {
                    obj.__proto__ = proto;
                    return obj;
                }
            });
        }

        // super get/set
        if (!Object.getPropertyDescriptor) {
            Object__defineProperty(Object, 'getPropertyDescriptor', {
                enumerable: false,
                configurable: false,
                value: function (subject, name) {
                    var pd = Object.getOwnPropertyDescriptor(subject, name);
                    var proto = Object.getPrototypeOf(subject);
                    while (pd === undefined && proto !== null) {
                        pd = Object.getOwnPropertyDescriptor(proto, name);
                        proto = Object.getPrototypeOf(proto);
                    }
                    return pd;
                }
            });
        }
        if (!{}.super) {
            Object__defineProperty(Object.prototype, 'super', {
                enumerable: false,
                configurable: false,
                value: function (c, p, v) {
                    var cl = _this.cache_super[c];
                    if (!cl) {
                        cl = _this.cache_super[c] = {};
                    }
                    var d = cl[p];
                    if (!d) {
                        d = cl[p] = Object.getPropertyDescriptor(flash.utils.getDefinitionByName(c).prototype, p);
                    }
                    if (arguments.length === 2) {
                        return d.get.call(this);
                    } else {
                        d.set.call(this, v);
                    }
                }
            });
        }

        // Array constants
        if (!Array.CASEINSENSITIVE || !Array.DESCENDING || !Array.UNIQUESORT || !Array.RETURNINDEXEDARRAY || !Array.NUMERIC) {
            Array.CASEINSENSITIVE = 1;
            Array.DESCENDING = 2;
            Array.UNIQUESORT = 4;
            Array.RETURNINDEXEDARRAY = 8;
            Array.NUMERIC = 16;
        }

        // Array.from
        // Шаги алгоритма ECMA-262, 6-е издание, 22.1.2.1
        // Ссылка: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
        if (!Array.from) {
            Array.from = (function() {
                var toStr = Object.prototype.toString;
                var isCallable = function(fn) {
                    return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
                };
                var toInteger = function (value) {
                    var number = Number(value);
                    if (isNaN(number)) { return 0; }
                    if (number === 0 || !isFinite(number)) { return number; }
                    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
                };
                var maxSafeInteger = Math.pow(2, 53) - 1;
                var toLength = function (value) {
                    var len = toInteger(value);
                    return Math.min(Math.max(len, 0), maxSafeInteger);
                };

                // Свойство length метода from равно 1.
                return function from(arrayLike/*, mapFn, thisArg */) {
                    // 1. Положим C равным значению this.
                    var C = this;

                    // 2. Положим items равным ToObject(arrayLike).
                    var items = Object(arrayLike);

                    // 3. ReturnIfAbrupt(items).
                    if (arrayLike == null) {
                        throw new TypeError('Array.from requires an array-like object - not null or undefined');
                    }

                    // 4. Если mapfn равен undefined, положим mapping равным false.
                    var mapFn = arguments[1];
                    if (typeof mapFn !== 'undefined') {
                        mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                        // 5. иначе
                        // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
                        if (!isCallable(mapFn)) {
                            throw new TypeError('Array.from: when provided, the second argument must be a function');
                        }

                        // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
                        if (arguments.length > 2) {
                            T = arguments[2];
                        }
                    }

                    // 10. Положим lenValue равным Get(items, "length").
                    // 11. Положим len равным ToLength(lenValue).
                    var len = toLength(items.length);

                    // 13. Если IsConstructor(C) равен true, то
                    // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
                    //     объекта C со списком аргументов, содержащим единственный элемент len.
                    // 14. a. Иначе, положим A равным ArrayCreate(len).
                    var A = isCallable(C) ? Object(new C(len)) : new Array(len);

                    // 16. Положим k равным 0.
                    var k = 0;
                    // 17. Пока k < len, будем повторять... (шаги с a по h)
                    var kValue;
                    while (k < len) {
                        kValue = items[k];
                        if (mapFn) {
                            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                        } else {
                            A[k] = kValue;
                        }
                        k += 1;
                    }
                    // 18. Положим putStatus равным Put(A, "length", len, true).
                    A.length = len;
                    // 20. Вернём A.
                    return A;
                };
            }());
        }

        // Array.sort
        if (![].__vanilla__sort) {
            Object__defineProperty(Array.prototype, '__vanilla__sort', Array.prototype.sort);
            Object__defineProperty(Array.prototype, 'sort', {
                enumerable: false,
                value: function (f) {
                    return is(f, 'uint') ?
                        this.sortOn(f) :
                        this.__vanilla__sort(f);
                }
            });
        }

        // Array.sortOn
        if (![].sortOn) {
            Object__defineProperty(Array.prototype, 'sortOn', {
                enumerable: false,
                value: function (fieldNames, options) {
                    var array = this;
                    if (arguments.length === 1 && is(fieldNames, 'Number')) {
                        options    = fieldNames;
                        fieldNames = undefined;
                    }

                    if (!Array.isArray(fieldNames)) fieldNames = [ fieldNames ];
                    if (!Array.isArray(options)) options = [ options ];

                    // Note: The fieldName and options arrays must have the same number of
                    // elements; otherwise, the options array is ignored.
                    // @see http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/Array.html#sortOn()
                    if (fieldNames.length !== options.length) {
                        options = new Array(fieldNames.length).fill(undefined);
                    }

                    var returnIndexedArray = options[0] & Array.RETURNINDEXEDARRAY;
                    if (returnIndexedArray) array = Array.from(array);

                    var functions = fieldNames.map( function (fieldName, index) {
                        return createComparisonFn(fieldName, options[index]);
                    });

                    var sorted = array.sort(function comparisonFn(a, b) {
                        return functions.reduce( function (result, fn) { return result || fn(a, b) }, 0);
                    });

                    return returnIndexedArray ? sorted.map(function (o) { return array.indexOf(o); }) : sorted;


                    function createComparisonFn(fieldName, options) {
                        options = options || 0;

                        if(options & Array.UNIQUESORT) throw new Error('UNIQUESORT is not implemented');

                        var transformations = [];

                        if (fieldName) transformations.push(
                            function getProperty() { return this[fieldName]; }
                        );

                        transformations.push(
                            (options & Array.NUMERIC)
                                ? function() { return as(this, 'Number'); }
                                : function() { return as(this, 'String'); }
                        );

                        if (options & Array.CASEINSENSITIVE) {
                            transformations.push(String.prototype.toLowerCase);
                        }

                        transformations.apply = Array.prototype.reduce.bind(
                            transformations,
                            function (value, transformation) { return transformation.apply(value) }
                        );

                        var AGreaterThanB = (options & Array.DESCENDING) ? -1 : 1;
                        var ALessThanB    = -AGreaterThanB;

                        return function comparisonFn(a, b) {
                            a = transformations.apply(a);
                            b = transformations.apply(b);

                            if ( a > b || (a != null && b == null) ) return AGreaterThanB;
                            if ( a < b || (a == null && b != null) ) return ALessThanB;

                            return 0;
                        }
                    }
                }
            });
        }

        // Array.insertAt
        if (![].insertAt) {
            Object__defineProperty(Array.prototype, 'insertAt', {
                enumerable: false,
                value: function (index, item) {
                    this.splice( index, 0, item );
                }
            });
        }

        // Array.removeAt
        if (![].removeAt) {
            Object__defineProperty(Array.prototype, 'removeAt', {
                enumerable: false,
                value: function (index) {
                    this.splice( index, 1 );
                }
            });
        }

        // Vector.fixed
        if ([].fixed !== false) {
            Object__defineProperty(Array.prototype, 'fixed', {
                enumerable: false,
                value: false
            });
        }

        // Array
        if (!Array.prototype.fill) {
            Array.prototype.fill = function(value) {
                if (this == null) {
                    throw new TypeError('this is null or not defined');
                }
                var O = Object(this);
                var len = O.length >>> 0;
                var start = arguments[1];
                var relativeStart = start >> 0;
                var k = relativeStart < 0 ?
                    Math.max(len + relativeStart, 0) :
                    Math.min(relativeStart, len);
                var end = arguments[2];
                var relativeEnd = end === undefined ?
                    len : end >> 0;
                var final = relativeEnd < 0 ?
                    Math.max(len + relativeEnd, 0) :
                    Math.min(relativeEnd, len);
                while (k < final) {
                    O[k] = value;
                    k++;
                }
                return O;
            };
        }

        // TypedArray.fill
        if (!Int8Array.prototype.fill) Int8Array.prototype.fill = Array.prototype.fill;
        if (!Uint8Array.prototype.fill) Uint8Array.prototype.fill = Array.prototype.fill;
        if (!Uint8ClampedArray.prototype.fill) Uint8ClampedArray.prototype.fill = Array.prototype.fill;
        if (!Int16Array.prototype.fill) Int16Array.prototype.fill = Array.prototype.fill;
        if (!Uint16Array.prototype.fill) Uint16Array.prototype.fill = Array.prototype.fill;
        if (!Int32Array.prototype.fill) Int32Array.prototype.fill = Array.prototype.fill;
        if (!Uint32Array.prototype.fill) Uint32Array.prototype.fill = Array.prototype.fill;
        if (!Float32Array.prototype.fill) Float32Array.prototype.fill = Array.prototype.fill;
        if (!Float64Array.prototype.fill) Float64Array.prototype.fill = Array.prototype.fill;

        // Date
        if (!new Date().date) {
            Object__defineProperty(Date.prototype, 'date', 			{ "get": function() { return this.getDate(); 			}, "set": function(v) { this.setDate(v); } });
            Object__defineProperty(Date.prototype, 'dateUTC', 		{ "get": function() { return this.getUTCDate(); 		}, "set": function(v) { this.setUTCDate(v); } });
            Object__defineProperty(Date.prototype, 'day', 			{ "get": function() { return this.getDay(); 			}, "set": function(v) { this.setDay(v); } });
            Object__defineProperty(Date.prototype, 'dayUTC', 			{ "get": function() { return this.getUTCDay(); 			}, "set": function(v) { this.setUTCDay(v); } });
            Object__defineProperty(Date.prototype, 'fullYear', 		{ "get": function() { return this.getFullYear(); 		}, "set": function(v) { this.setFullYear(v); } });
            Object__defineProperty(Date.prototype, 'fullYearUTC', 	{ "get": function() { return this.getUTCFullYear(); 	}, "set": function(v) { this.setUTCFullYear(v); } });
            Object__defineProperty(Date.prototype, 'hours', 			{ "get": function() { return this.getHours(); 			}, "set": function(v) { this.setHours(v); } });
            Object__defineProperty(Date.prototype, 'hoursUTC', 		{ "get": function() { return this.getUTCHours(); 		}, "set": function(v) { this.setUTCHours(v); } });
            Object__defineProperty(Date.prototype, 'milliseconds', 	{ "get": function() { return this.getMilliseconds(); 	}, "set": function(v) { this.setMilliseconds(v); } });
            Object__defineProperty(Date.prototype, 'millisecondsUTC', { "get": function() { return this.getUTCMilliseconds();	}, "set": function(v) { this.setUTCMilliseconds(v); } });
            Object__defineProperty(Date.prototype, 'minutes', 		{ "get": function() { return this.getMinutes(); 		}, "set": function(v) { this.setMinutes(v); } });
            Object__defineProperty(Date.prototype, 'minutesUTC', 		{ "get": function() { return this.getUTCMinutes(); 		}, "set": function(v) { this.setUTCMinutes(v); } });
            Object__defineProperty(Date.prototype, 'month', 			{ "get": function() { return this.getMonth(); 			}, "set": function(v) { this.setMonth(v); } });
            Object__defineProperty(Date.prototype, 'monthUTC', 		{ "get": function() { return this.getUTCMonth(); 		}, "set": function(v) { this.setUTCMonth(v); } });
            Object__defineProperty(Date.prototype, 'seconds', 		{ "get": function() { return this.getSeconds(); 		}, "set": function(v) { this.setSeconds(v); } });
            Object__defineProperty(Date.prototype, 'secondsUTC', 		{ "get": function() { return this.getUTCSeconds(); 		}, "set": function(v) { this.setUTCSeconds(v); } });
            Object__defineProperty(Date.prototype, 'time', 			{ "get": function() { return this.getTime(); 			}, "set": function(v) { this.setTime(v); } });
            Object__defineProperty(Date.prototype, 'timezoneOffset', 	{ "get": function() { return this.getTimezoneOffset(); 	} });
        }
    }

    function actionScriptProto () {
        // Number
        ['E','LN10','LN2','LOG10E','LOG2E','PI','SQRT1_2','SQRT2',
            'abs','acos','asin','atan','atan2','ceil','cos','exp','floor','log','max','min','pow','random','round','sin','sqrt','tan'
        ].forEach(function (n) { Object__defineProperty(Number, n, Math[n]); });

        // int
        Object__defineProperty(int.prototype, 'toExponential', function (precision) { return this.v.toExponential(precision); });
        Object__defineProperty(int.prototype, 'toFixed', function (fractionDigits) { return this.v.toFixed(fractionDigits); });
        Object__defineProperty(int.prototype, 'toPrecision', function (precision) { return this.v.toPrecision(precision); });
        Object__defineProperty(int.prototype, 'toString', function (radix) { return this.v.toString(radix); });
        Object__defineProperty(int.prototype, 'valueOf', function () { return this.v; });
        Object__defineProperty(int, 'MIN_VALUE', -0x80000000);
        Object__defineProperty(int, 'MAX_VALUE', 0x7fffffff);

        // uint
        Object__defineProperty(uint.prototype, 'toExponential', function (precision) { return this.v.toExponential(precision); });
        Object__defineProperty(uint.prototype, 'toFixed', function (fractionDigits) { return this.v.toFixed(fractionDigits); });
        Object__defineProperty(uint.prototype, 'toPrecision', function (precision) { return this.v.toPrecision(precision); });
        Object__defineProperty(uint.prototype, 'toString', function (radix) { return this.v.toString(radix); });
        Object__defineProperty(uint.prototype, 'valueOf', function () { return this.v; });
        Object__defineProperty(uint, 'MIN_VALUE', 0);
        Object__defineProperty(uint, 'MAX_VALUE', 0xffffffff);

        // *.name
        if (!int.name || int.name == '') Object__defineProperty(int, 'name', 'int');
        if (!uint.name || uint.name == '') Object__defineProperty(uint, 'name', 'uint');
        if (!Number.name || Number.name == '') Object__defineProperty(Number, 'name', 'Number');
        if (!Boolean.name || Boolean.name == '') Object__defineProperty(Boolean, 'name', 'Boolean');
        if (!String.name || String.name == '') Object__defineProperty(String, 'name', 'String');
        if (!Object.name || Object.name == '') Object__defineProperty(Object, 'name', 'Object');
        if (!Array.name || Array.name == '') Object__defineProperty(Array, 'name', 'Array');
        if (!Date.name || Date.name == '') Object__defineProperty(Date, 'name', 'Date');
        if (!Function.name || Function.name == '') Object__defineProperty(Function, 'name', 'Function');

        // Error
        var AS3Error = (function (_super) {
            __extends(AS3Error, _super);
            function AS3Error(message, id) {
                var _newTarget = this.constructor, _this = this;
                _this = _super.call(this, message) || this;
                Object.setPrototypeOf(_this, _newTarget.prototype);
                _this.id = id;
                return _this;
            }
            return AS3Error;
        }(Error));

        var JSError = vanilla.set('Error', AS3Error);
        AS3Error.prototype = Object.create(JSError.prototype);
        AS3Error.prototype.constructor = AS3Error;

        Object__defineProperty(AS3Error, 'throwError', function (type, index) {
            throw new type(AS3Error.getErrorMessage(index));
        });

        Object__defineProperty(AS3Error, 'getErrorMessage', function (index) {
            return 'Unknown error';
        });

        Object__defineProperty(AS3Error.prototype, 'errorID', {
            get: function () {
                return as(this.id || this.number, 'int') || 0;
            }
        });

        Object__defineProperty(AS3Error.prototype, 'getStackTrace', function () {
            // previous value
            if (this.as3stack) {
                return this.as3stack;
            }
            // Format to
            // Error msg 100 Error: msg
            //     at func3 (...\Class.as:39)
            //     at func2 (...\Class.as:29)
            //     at func1 (...\Class.as:19)
            var message = this.message, stack = this.stack;
            if (stack) {
                var _this = this;
                stack = stack.split('\n').map(function (l) {
                    l = l.trim();
                    // Chrome, Edge, Internet Explorer
                    var v1 = /^at\s/g.test(l);
                    // Firefox, Safari
                    var v2 = /@/g.test(l);
                    // switch
                    if (v1) {
                        if (l.indexOf('at ' + _this.name) === 0) return '';
                        if (l.indexOf('at new ' + _this.name) === 0) return '';
                        if (l.indexOf('at AS3Error') === 0) return '';
                        if (l.indexOf('at new AS3Error') === 0) return '';
                        if (l.indexOf('at wrapper') === 0) return '';
                    } else if (v2) {
                        if (l.indexOf(_this.name + '@') === 0) return '';
                        if (l.indexOf('AS3Error@') === 0) return '';
                        if (l.indexOf('wrapper@') === 0) return '';
                        var f = l.indexOf('@');
                        if (f === 0) l = 'at (' + l.substr(1) + ')';
                        else if (f > 0) l = 'at ' + l.substr(0, f) + ' (' + l.substr(f+1) + ')';
                    }
                    return l;
                }).filter(function (s) { return s !== ''; }).join('\n\t');
                // insert message
                if (message && stack.indexOf(message) === -1) {
                    stack = this.name + ': ' + message + '\n\t' + stack;
                }
            } else {
                stack = message;
            }
            return this.as3stack = stack;
        });

        vanilla.set('ArgumentError', (function(_super){__extends(ArgumentError,_super);function ArgumentError(message,id){var _newTarget=this.constructor,_this=this;_this=_super.call(this,message)||this;Object.setPrototypeOf(_this,_newTarget.prototype);_this.id=id;_this.name='ArgumentError';return _this;}return ArgumentError;}(AS3Error)));
        vanilla.set('DefinitionError', (function(_super){__extends(DefinitionError,_super);function DefinitionError(message,id){var _newTarget=this.constructor,_this=this;_this=_super.call(this,message)||this;Object.setPrototypeOf(_this,_newTarget.prototype);_this.id=id;_this.name='DefinitionError';return _this;}return DefinitionError;}(AS3Error)));
        vanilla.set('VerifyError', (function(_super){__extends(VerifyError,_super);function VerifyError(message,id){var _newTarget=this.constructor,_this=this;_this=_super.call(this,message)||this;Object.setPrototypeOf(_this,_newTarget.prototype);_this.id=id;_this.name='VerifyError';return _this;}return VerifyError;}(AS3Error)));
        vanilla.set('SecurityError', (function(_super){__extends(SecurityError,_super);function SecurityError(message,id){var _newTarget=this.constructor,_this=this;_this=_super.call(this,message)||this;Object.setPrototypeOf(_this,_newTarget.prototype);_this.id=id;_this.name='SecurityError';return _this;}return SecurityError;}(AS3Error)));
        vanilla.set('EvalError', (function(_super){__extends(EvalError,_super);function EvalError(message,id){var _newTarget=this.constructor,_this=this;_this=_super.call(this,message)||this;Object.setPrototypeOf(_this,_newTarget.prototype);_this.id=id;_this.name='EvalError';return _this;}return EvalError;}(AS3Error)));
        vanilla.set('RangeError', (function(_super){__extends(RangeError,_super);function RangeError(message,id){var _newTarget=this.constructor,_this=this;_this=_super.call(this,message)||this;Object.setPrototypeOf(_this,_newTarget.prototype);_this.id=id;_this.name='RangeError';return _this;}return RangeError;}(AS3Error)));
        vanilla.set('ReferenceError', (function(_super){__extends(ReferenceError,_super);function ReferenceError(message,id){var _newTarget=this.constructor,_this=this;_this=_super.call(this,message)||this;Object.setPrototypeOf(_this,_newTarget.prototype);_this.id=id;_this.name='ReferenceError';return _this;}return ReferenceError;}(AS3Error)));
        vanilla.set('SyntaxError', (function(_super){__extends(SyntaxError,_super);function SyntaxError(message,id){var _newTarget=this.constructor,_this=this;_this=_super.call(this,message)||this;Object.setPrototypeOf(_this,_newTarget.prototype);_this.id=id;_this.name='SyntaxError';return _this;}return SyntaxError;}(AS3Error)));
        vanilla.set('TypeError', (function(_super){__extends(TypeError,_super);function TypeError(message,id){var _newTarget=this.constructor,_this=this;_this=_super.call(this,message)||this;Object.setPrototypeOf(_this,_newTarget.prototype);_this.id=id;_this.name='TypeError';return _this;}return TypeError;}(AS3Error)));
        vanilla.set('URIError', (function(_super){__extends(URIError,_super);function URIError(message,id){var _newTarget=this.constructor,_this=this;_this=_super.call(this,message)||this;Object.setPrototypeOf(_this,_newTarget.prototype);_this.id=id;_this.name='URIError';return _this;}return URIError;}(AS3Error)));
    }

    function getCanvas (stageId) {
        stageId = stageId || 0;
        var db = base.kernel.db.stage[stageId] = base.kernel.db.stage[stageId] || {};
        var canvas = db.canvas;
        if (!canvas) {
            canvas = db.canvas = document.createElement('canvas');
            canvas.style.width = canvas.style.height = '100%';
            canvas.style.position = 'absolute';
            canvas.style.zIndex = '32';
        }
        return canvas;
    }

    function getCtx (stageId) {
        stageId = stageId || 0;
        var db = base.kernel.db.stage[stageId] = base.kernel.db.stage[stageId] || {};
        var ctx = db.ctx;
        if (!ctx) {
            var canvas = _this.getCanvas(stageId);
            ctx = db.ctx = new flash.__native.renderer.webgl.WebGLContext2D(canvas);
            canvas.width = flash.system.Capabilities.screenResolutionX;
            canvas.height = flash.system.Capabilities.screenResolutionY;
            ctx.context.configureBackBuffer(canvas.width, canvas.height, 0, false);
        }
        return ctx;
    }

    function getLocalStorage () {
        return base.kernel.db.utils.localStorage || window.localStorage;
    }

    function createDisplayObject (constr, args, parent, index, root, loaderInfo) {
        return new (function (_super) {
            __extends(DisplayObjectClass, _super);

            function DisplayObjectClass() {
                var _this = this;
                if (root) {
                    _this._name = 'root' + flash.display.DisplayObject.sID++;
                    _this._root = true;
                    _this._loaderInfo = loaderInfo;
                    loaderInfo._content = _this;
                }
                if (parent) {
                    parent.__addChildAt(_this, index);
                }
                _this = _super.apply(this, args) || this;
                if (parent) {
                    _this.__broadcastSetStage(_this._stage, _this._stageInternal, true);
                }
                return _this;
            }

            return DisplayObjectClass;
        }(constr));
    }

    // casting
    function is(v, t) {
        if (v == void 0) {
            return false;
        }
        if (typeof t === 'string') {
            switch (t) {
                case 'int':
                    return typeof v === 'number' && v >= -0x80000000 && v <= 0x7fffffff;
                case 'uint':
                    return typeof v === 'number' && v >= 0 && v <= 0xffffffff;
                case 'Number':
                    return typeof v === 'number';
                case 'Boolean':
                    return typeof v === 'boolean';
                case 'String':
                    return typeof v === 'string';
                case 'Function':
                case 'Class':
                    return typeof v === 'function';
                case 'Object':
                    return v != void 0;
                default:
                    return typeof v === 'object' && t in v;
            }
        }
        return v instanceof t;
    }

    function as(v, t) {
        switch (t) {
            case 'int':
                return v >> 0;
            case 'uint':
                return v >>> 0;
            case 'Number':
                return +v;
            case 'Boolean':
                return v === true || v === false ? v : Boolean(v);
            case 'String':
                return typeof v === 'string' ? v : (v == void 0 ? null : String(v));
            default:
                if (!is(v, t)) {
                    return null;
                }
        }
        return v;
    }

    function strict(v, t) {
        if (v == void 0) {
            return null;
        }
        if (!is(v, t)) {
            throw new TypeError(
                'Type Coercion failed: cannot convert ' + v + ' to ' + (t != void 0 && typeof t === 'function' ? t.name : t),
                1034
            );
        }
        return v;
    }

    // casting
    function iscl(v, t) {
        if (v == void 0) {
            return false;
        }
        if (typeof v === 'function') {
            while (v) {
                if (v === t) {
                    return true;
                }
                v = v.__extends;
            }
        }
        return false;
    }

    function In(v) {
        if (v == void 0) {
            return [];
        }
        if (typeof v === 'object' && typeof v.__iterator === 'function') {
            return v.__iterator(false);
        }
        var c = Object.keys(v);
        if (Array.isArray(v)) {
            if (v.__in__ == void 0) {
                Object.defineProperty(v, 'unshift', {
                    enumerable: false,
                    configurable: true,
                    value: function () {
                        if (this.__in__ != void 0) {
                            for (var i = 0, len = arguments.length; i < len; ++i) {
                                this.__in__.push(this.__in__.length.toString());
                            }
                        }
                        return Array.prototype.unshift.apply(this, arguments);
                    }.__bind(v)
                });
                Object.defineProperty(v, 'push', {
                    enumerable: false,
                    configurable: true,
                    value: function () {
                        if (this.__in__ != void 0) {
                            for (var i = 0, len = arguments.length; i < len; ++i) {
                                this.__in__.push(this.__in__.length.toString());
                            }
                        }
                        return Array.prototype.push.apply(this, arguments);
                    }.__bind(v)
                });
                Object.defineProperty(v, 'shift', {
                    enumerable: false,
                    configurable: true,
                    value: function () {
                        if (this.__in__ != void 0) {
                            this.__in__.pop();
                        }
                        return Array.prototype.shift.apply(this, arguments);
                    }.__bind(v)
                });
                Object.defineProperty(v, 'pop', {
                    enumerable: false,
                    configurable: true,
                    value: function () {
                        if (this.__in__ != void 0) {
                            this.__in__.pop();
                        }
                        return Array.prototype.pop.apply(this, arguments);
                    }.__bind(v)
                });
                Object.defineProperty(v, 'splice', {
                    enumerable: false,
                    configurable: true,
                    value: function () {
                        if (this.__in__ != void 0) {
                            var d = 0;
                            if (arguments[1] > 0) {
                                d -= arguments[1];
                            }
                            if (arguments.length > 2) {
                                d += arguments.length - 2;
                            }
                            if (d > 0) {
                                for (var i = 0, len = d; i < len; ++i) {
                                    this.__in__.push(this.__in__.length.toString());
                                }
                            } else if (d < 0) {
                                for (var i = 0, len = -d; i < len; ++i) {
                                    this.__in__.pop();
                                }
                            }
                        }
                        return Array.prototype.splice.apply(this, arguments);
                    }.__bind(v)
                });
            }
            Object.defineProperty(v, '__in__', {
                enumerable: false,
                configurable: true,
                value: c
            });
        }
        return c;
    }

    function of(v) {
        if (v == void 0) {
            return [];
        }
        if (typeof v === 'object' && typeof v.__iterator === 'function') {
            return v.__iterator(true);
        }
        return v;
    }

    function e2e(error_in) {
        var as3error;
        if (error_in !== null && error_in !== undefined) {
            // not need to convert
            if (error_in instanceof Error || (window.flash && flash.events && flash.events.ErrorEvent && error_in instanceof flash.events.ErrorEvent)) {
                as3error = error_in;
            }
            // from String
            else if (typeof error_in === 'string') {
                as3error = new Error(error_in);
            }
            // from JavaScript Error object
            else if (error_in != void 0) {
                var c = window[error_in.name];
                if (typeof c !== 'function') c = Error;
                as3error = new c(error_in.message);
                as3error.stack = error_in.stack; // NOTE: crossorigin problems
            }
        }
        return as3error || new Error;
    }

    // mime type
    function getMimeType (bytes) {
        if (bytes instanceof flash.utils.ByteArray) {
            // length
            var len = bytes.length, i = 0, byte,
                byte0 = len > 0 ? bytes.get(0) : 0,
                byte1 = len > 1 ? bytes.get(1) : 0,
                byte2 = len > 2 ? bytes.get(2) : 0;

            // swf
            if (len >= 3 &&
                (byte0 === 0x43 || byte0 === 0x46 || byte0 === 0x5A) && byte1 === 0x57 && byte2 === 0x53) {
                return 'application/x-shockwave-flash';
            }

            // jpeg
            else if (len >= 3 &&
                byte0 === 0xff && byte1 === 0xd8 && byte2 === 0xff) {
                return 'image/jpeg';
            }

            // gif
            else if (len >= 3 &&
                byte0 === 0x47 && byte1 === 0x49 && byte2 === 0x46) {
                return 'image/gif';
            }

            // png
            else if (len >= 8 &&
                byte0 === 0x89 && byte1 === 0x50 && byte2 === 0x4e && bytes.get(3) === 0x47 &&
                bytes.get(4) === 0x0d && bytes.get(5) === 0x0a && bytes.get(6) === 0x1a && bytes.get(7) === 0x0a) {
                return 'image/png';
            }

            // mp3
            else if (len >= 3 &&
                (byte0 === 73 && byte1 === 68 && byte2 === 51) ||
                (byte0 === 255 && (byte1 === 251 || byte1 === 250))) {
                return 'audio/mpeg';
            }

            // xml / svg
            else if (len >= 4) {
                // skip byte order mask and white space
                while (i < len) {
                    byte = bytes.get(i);
                    // byte order mask
                    if (i+3 <= len && byte === 0xef && bytes.get(i+1) === 0xbb && bytes.get(i+2) === 0xbf) {
                        i += 3;
                        continue;
                    }
                    // white space
                    if (byte === 0xa || byte === 0xd || byte === 0x9 || byte === 0x20) {
                        i++;
                        continue;
                    }
                    // <? <!
                    if ((byte === 0x3c && bytes.get(i+1) === 0x3f) || (byte === 0x3c && bytes.get(i+1) === 0x21)) {
                        i += 2;
                        while (i < len) {
                            byte = bytes.get(i);
                            if (byte !== 0x3e) {
                                i++;
                                continue;
                            }
                            break;
                        }
                        continue;
                    }
                    break;
                }

                // <
                if (bytes.get(i) === 0x3c) {
                    // svg
                    if (i+4 <= len && bytes.get(i+1) === 0x73 && bytes.get(i+2) === 0x76 && bytes.get(i+3) === 0x67) {
                        return 'image/svg-xml';
                    }
                    // xml
                    i = len-1;
                    while (i >= 0) {
                        byte = bytes.get(i);
                        // white space
                        if (byte === 0xa || byte === 0xd || byte === 0x9 || byte === 0x20) {
                            i--;
                            continue;
                        }
                        if (byte === 0x3e) {
                            return 'text/xml';
                        }
                        break;
                    }
                }
            }
        }

        return 'application/octet-stream';
    }

    // embed init
    function embed$(cb) {
        // embed list
        var list = _this.embedList;

        // validation
        if (list == void 0) {
            // nothing to create
            if (typeof cb === 'function') {
                cb();
            }
            return;
        }

        // decode
        verbose('start prepare files...');
        var count = 0;
        for (var file in list) {
            if (!list.hasOwnProperty(file)) {
                continue;
            }

            var e = list[file];
            if (!e) {
                continue;
            }
            var bytes = null;
            if (e.array instanceof Uint8Array) {
                bytes = e.bytes = new flash.utils.ByteArray().__fixed(true).__fromArrayBuffer(e.array.buffer);
                delete e.array;
            }
            else if (typeof e.base64 === 'string') {
                bytes = e.bytes = flash.__native.utils.Base64.decode(e.base64);
                delete e.base64;
            }
            if (!bytes) {
                continue;
            }

            var mimeType = getMimeType(bytes);
            switch (mimeType) {
                case 'application/octet-stream':
                    e.instance = bytes;
                    verbose('done', file);
                    break;
                case 'application/x-font':
                case 'application/x-font-truetype':
                    // not supported
                    break;
                case 'application/x-shockwave-flash':
                    decodeSWF(file, bytes);
                    break;
                case 'text/xml':
                    e.instance = bytes;
                    verbose('done', file);
                    break;
                case 'audio/mpeg':
                    decodeSound(file, bytes);
                    break;
                case 'image/gif':
                case 'image/jpeg':
                case 'image/png':
                case 'image/svg':
                case 'image/svg-xml':
                    decodeImage(file, bytes);
                    break;
            }
        }

        if (!count) {
            // sync complete
            if (typeof cb === 'function') {
                cb();
            }
        }

        function decodeSWF (file, bytes) {
            wait(file);

            try {
                var e = list[file];
                var swf = new flash.__native.format.swf.SWF(bytes);
                swf.addEventListener(flash.__native.format.swf.events.SWFProgressEvent.COMPLETE, h);
                swf.addEventListener(flash.__native.format.swf.events.SWFErrorEvent.ERROR, error);
                swf.decodeImageDataAsync();
                e.instance = swf; // flash.__native.format.swf.SWF
            } catch (e) {
                throwError(e);
            }

            function h (event) {
                verbose('done', file);
                release(event);
            }

            function error (event) {
                throwError('SWF decoding "' + file + '" failed with error: ' + event.reason);
            }
        }

        function decodeSound (file, bytes) {
            wait(file);

            try {
                var e = list[file];
                var sound = new flash.media.Sound;
                sound.addEventListener(flash.events.Event.COMPLETE, h);
                sound.addEventListener(flash.events.IOErrorEvent.IO_ERROR, throwError);
                sound.loadCompressedDataFromByteArray(bytes, bytes.length);
                e.instance = sound; // flash.media.Sound
            } catch (e) {
                throwError(e);
            }

            function h (event) {
                verbose('done', file);
                release(event);
            }
        }

        function decodeImage (file, bytes) {
            wait(file);

            try {
                var e = list[file];
                var width = e.width || 32;
                var height = e.height || 32;
                var transparent = mimeType !== 'image/jpeg';
                var bitmapData = new flash.__native.display.SystemBitmapData (flash.__native.display.SystemBitmapData.EMBED, width, height, transparent, 0x0, false);
                var loader = new flash.display.Loader;
                loader._predefinedData = bitmapData;
                loader.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE, h);
                loader.contentLoaderInfo.addEventListener(flash.events.IOErrorEvent.IO_ERROR, throwError);
                loader.loadBytes(bytes);
                e.instance = new flash.display.Bitmap(bitmapData); // flash.display.Bitmap
            } catch (e) {
                throwError(e);
            }

            function h (event) {
                verbose('done', file);
                release(event);
            }
        }

        function wait (file) {
            verbose('decoding...', file);
            count++;
        }

        function release (event) {
            if (--count > 0) {
                return;
            }
            if (typeof cb === 'function') {
                cb();
            }
        }

        function verbose (s, f) {
            if (_this.release === true) {
                return;
            }
            if (!f) {
                trace('[embed] ' + s);
                return;
            }
            trace('[embed] ' + f + ' ' + s);
        }
    }

    // hash:
    // `__` + md5(`${bytes.length}${string-of-first-256-bytes}${string-of-last-reversed-256-bytes}`)
    //
    // className:
    // a class name with package
    //
    // sourceType:
    // 1 - swc
    // 2 - swf
    // 3 - embed in swf
    function getSWFTag (callArguments, hash, className, sourceType) {
        if (callArguments) {
            var length = callArguments.length;
            for (var i = 0; i < length; ++i) {
                var arg = callArguments[i];
                if (arg == void 0) {
                    continue;
                }
                if (arg instanceof flash.__native.format.swf.SWFTimelineContainer || is(arg, 'implements_flash___native_format_swf_tags_ITag')) {
                    return arg;
                }
            }
        }
        var list = _this.embedList;
        if (list == void 0) {
            return null;
        }
        var info = list[hash];
        if (info == void 0) {
            return null;
        }
        var swf = info.instance;
        var id, asset, symbol;
        if (asset = swf.getSWFAsset(className)) {
            id = asset.characterId;
        } else if (symbol = swf.getSWFSymbol(className)) {
            id = symbol.tagId;
        }
        if (id == void 0) {
            return null;
        }
        return swf.getTag(id);
    }

    function getSWFClass (cl, args) {
        return function (_super) {
            __extends(class_Symbol, _super);
            function class_Symbol() {
                _super.apply(this, args);
            }
            return class_Symbol;
        }(cl);
    }

    function mapSWF (data) {
        var list = _this.embedList;
        if (list == void 0 || data == void 0) {
            return null;
        }
        var hash = data.bytes.hash;
        if (list[hash]) {
            return;
        }
        list[hash] = { instance: data };
    }

    // meta tags
    function getMeta(name, params) {
        if (name === 'Embed' && params instanceof Array) {
            // embed list
            var list = _this.embedList;
            // validation
            if (list == void 0) {
                return null;
            }
            var o = {
                mimeType: null,
                source: null,
                symbol: null,
                smoothing: null
            };
            for (var i = 0, len = params.length; i < len; ++i) {
                var p = params[i], n = p.key, v = p.value;
                if (n in o) {
                    o[n] = v;
                }
            }
            var source;
            if (typeof (source=o.source) !== 'string') {
                return null;
            }
            var e = list[source], bytes;
            if (!e || !((bytes=e.bytes) instanceof flash.utils.ByteArray)) {
                return null;
            }

            var mimeType = o.mimeType || getMimeType(bytes);
            switch (mimeType) {
                case 'application/octet-stream':
                    if (e.bytes instanceof flash.utils.ByteArray) {
                        return function (_super) {
                            __extends(class_ByteArray, _super);
                            function class_ByteArray() {
                                _super.call(this);
                                this.__fromByteArray(e.bytes, true);
                            }
                            return class_ByteArray;
                        }(flash.utils.ByteArray);
                    }
                    break;
                case 'application/x-font':
                case 'application/x-font-truetype':
                    // not supported
                    break;
                case 'application/x-shockwave-flash':
                    if (e.instance instanceof flash.__native.format.swf.SWFTimelineContainer) {
                        var data = e.instance;
                        if (typeof o.symbol === 'string') {
                            var id, asset, symbol;
                            if (asset = data.getSWFAsset(o.symbol)) {
                                id = asset.characterId;
                            } else if (symbol = data.getSWFSymbol(o.symbol)) {
                                id = symbol.tagId;
                            }
                            if (id == void 0) {
                                throwError("Can't find symbol \"" + o.symbol + "\" in \"" + source + "\".");
                            }
                            return data.getDisplayObjectConstructor(id);
                        }
                        return function (_super) {
                            __extends(class_Symbol, _super);
                            function class_Symbol() {
                                _super.call(this);
                                var loader = this.__addChildAt(new flash.display.Loader, this._childrenLength);
                                setTimeout(loader.__fromSWF.__bind(loader), 0, data);
                            }
                            return class_Symbol;
                        }(flash.__native.format.swf.instance.MovieClip);
                    }
                    break;
                case 'text/xml':
                    if (typeof e.instance === 'string' || e.instance instanceof flash.utils.ByteArray) {
                        return function (_super) {
                            __extends(class_XML, _super);
                            function class_XML() {
                                _super.call(this, e.instance);
                            }
                            return class_XML;
                        }(global.XML);
                    }
                    break;
                case 'audio/mpeg':
                    if (e.instance instanceof flash.media.Sound) {
                        return function (_super) {
                            __extends(class_Sound, _super);
                            function class_Sound() {
                                _super.call(this);
                                this.__fromAudioBuffer(e.instance._buffer);
                            }
                            return class_Sound;
                        }(flash.media.Sound);
                    }
                    break;
                case 'image/gif':
                case 'image/jpeg':
                case 'image/png':
                case 'image/svg':
                case 'image/svg-xml':
                    if (e.instance instanceof flash.display.Bitmap) {
                        return function (_super) {
                            __extends(class_Bitmap, _super);
                            function class_Bitmap() {
                                _super.call(this, e.instance.bitmapData.clone(), 'auto', as(o.smoothing, 'Boolean'));
                            }
                            return class_Bitmap;
                        }(flash.display.Bitmap);
                    }
                    break;
            }
        }
        return null;
    }

    // font init
    function font$(cb) {
        // font list
        var list = _this.fontList;

        // validation
        if (list == void 0) {
            // nothing to create
            release();
            return;
        }

        // FontFace
        var FontFaceAvailable = typeof document.fonts === 'object' && typeof window.FontFace === 'function';
        if (FontFaceAvailable) {
            document.fonts.ready.then(function() {
                var c = document.createElement('canvas');
                var ctx = c.getContext('2d');
                for (var font in list) {
                    if (!list.hasOwnProperty(font)) {
                        continue;
                    }
                    ctx.font = "1px " + font;
                    ctx.fillText(' ', 0, 0);
                }
                count = 0;
                setTimeout(release, 0);
            });
        }

        // decode
        var count = 0;
        for (var font in list) {
            if (!list.hasOwnProperty(font)) {
                continue;
            }
            var e = list[font], base64;
            if (!e || typeof (base64 = e.base64) !== 'string') {
                continue;
            }
            wait();
            // data
            var src = 'url("data:application/x-font-woff;charset=utf-8;base64,' + base64 + '")';
            // next gen
            if (FontFaceAvailable) {
                document.fonts.add(new FontFace(font, src));
                continue;
            }
            // old
            var styleElement = document.createElement('style');
            styleElement.type = "text/css";
            styleElement.innerHTML = '@font-face { font-family: "' + font + '"; src: ' + src + ' format("woff"); font-style: normal; font-weight: normal }';
            document.head.appendChild(styleElement);
            setTimeout(release, 0);
        }

        if (!count) {
            // sync complete
            release();
        }

        function wait () {
            count++;
        }

        function release (event) {
            if (--count > 0) {
                return;
            }
            if (typeof cb === 'function') {
                cb();
                cb = undefined;
            }
        }
    }

    // kernel init
    function kernel$(cb) {
        try {
            base.kernel.init(cb);
        } catch (e) {
            throwError(e);
        }
    }

    // static init
    var stiList;
    function sti(ins, fn) {
        if (!stiList) stiList = getMapIns();
        var list = stiList.get(ins);
        if (!list) stiList.set(ins, list = []);
        list[list.length] = fn;
    }

    // static block
    var stbList;
    function stb(ins, fn) {
        if (!stbList) stbList = getMapIns();
        var list = stbList.get(ins);
        if (!list) stbList.set(ins, list = []);
        list[list.length] = fn;
    }

    // static apply
    function st$(ins) {
        if (ins == null) {
            return ins;
        }

        var list;

        if (stiList) {
            list = stiList.get(ins);
            if (list && list.length) {
                stiList.delete(ins);
                list.forEach(callFn);
            }
        }

        if (stbList) {
            list = stbList.get(ins);
            if (list && list.length) {
                stbList.delete(ins);
                list.forEach(callFn);
            }
        }

        function callFn (fn) {
            fn();
        }

        return ins;
    }

    function getMapIns () {
        return _this.utils.NATIVE_MAP_AVAILABLE ? new Map : new _this.utils.MapSimple;
    }

    // trace
    function trace() {
        var a = [];
        for (var i = 0; i < arguments.length; i++) {
            var v = a[i] = arguments[i];
            if (typeof v === 'object' && v !== null) a[i] = v.toString();
        }
        if (window.console && window.console.log) {
            console.log.apply(console, a);
        }
    }
    function traceLater() {
        (_this.cache.traceLater = _this.cache.traceLater || []).push(arguments);
    }

    // unbind
    function unbind(value) {
        if (value === undefined) return value;
        if (typeof value === 'function') {
            var BoundTargetFunction = value;
            while (BoundTargetFunction.BoundTargetFunction) {
                BoundTargetFunction = BoundTargetFunction.BoundTargetFunction;
            }
            return BoundTargetFunction;
        }
        return value;
    }

    // int
    function int(v) {
        this.v = as(v, 'int');
    }

    // uint
    function uint(v) {
        this.v = as(v, 'uint');
    }

    function Object__defineProperty(t, n, v) {
        var o = v;
        if (typeof o !== 'object') {
            o = {
                value: v
            };
        }
        if (typeof o.enumerable === 'undefined') {
            o.enumerable = true;
        }
        Object.defineProperty(t, n, o);
    }

    function errorUtils () {
        _this.provide = _this.provide || h;
        _this.kernel$ = _this.kernel$ || h;
        _this.font$ = _this.font$ || h;
        _this.embed$ = _this.embed$ || h;

        window.createProject = window.createProject || createNonProject;

        Object.defineProperty(_this, 'onerror', {
            configurable: true,
            set: function (v) {
                Object.defineProperty(_this, 'onerror', {
                    enumerable: true,
                    configurable: true,
                    value: v
                });
                checkBrowser();
            },
            get: function () {
                return undefined;
            }
        });

        function h () {
            throwError(new Error('Fatal error'));
        }
    }

    function checkBrowser () {
        var c;
        if (!_this.system || !(c = _this.system.Capabilities)) {
            return;
        }

        var needUpdate;
        switch (c.browser) {
            case 'Chrome':
                if (c.os === 'Android' && parseFloat(c.browserVersion) == 65.0) {
                    needUpdate = true;
                }
                break;
        }

        if (needUpdate) {
            throwError('Please upgrade your browser to the latest version.');
        }
    }

    function throwError (e) {
        var forceStop = false;
        if (typeof _this.onerror === 'function') {
            forceStop = _this.onerror(e) !== true;
        }

        if (!forceStop) {
            return;
        }

        base.init.error = e;
    }

    function createNonProject (p, h) {
        if (p === null || typeof p !== 'object') {
            p = {};
        }

        var parentElement = typeof p.parent === 'string' ? document.getElementById(p.parent) : p.parent;
        if (typeof parentElement === 'object' && 'tagName' in parentElement) {
            parentElement.innerHTML = _this.getErrorHTMLText();
        }
    }

    function getErrorHTMLText (e) {
        var message = 'Requires a modern browser to run the application.';
        switch (typeof e) {
            case 'string':
                message = e;
                break;
            case 'object':
                if (e !== null) {
                    var details = e2e(e);
                    var debug = window.location.search.substr(1).indexOf('debug=true') >= 0;
                    if (!asc.release || debug) {
                        message = 'getStackTrace' in details ? details.getStackTrace() : (details.message || details.text || message);
                    } else {
                        switch (details.errorID) {
                            case 3710: // Aka: Requested Stage3D Operation failed to complete.
                                message = details.message || details.text || message;
                                break;
                        }
                    }
                }
                break;
        }
        var html = '<div style="position:fixed; display: flex; align-items: center; width:100%; height:100%; background: linear-gradient(to bottom right, white, Highlight);">';
        var textStyle = 'text-align:center; display:inline-block; margin-left:10%; width:80%; color:HighlightText;';
        if (_this.system.Capabilities) {
            textStyle += 'font-family: ' + _this.system.Capabilities.font + ';';
        }
        var h = asc.release ? 1 : 2;
        html += '<h' + h + ' style="' + textStyle + '">';
        html += message;
        html += '</h' + h + '>';
        html += '</div>';
        return html;
    }

    return _this;
})();