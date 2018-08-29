(function () {

    // this
    var _this = window.asc || (window.asc = {});

    // storage
    var storage = _this.storage || (_this.storage = {});

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                     IDBStorage                                                     //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function IDBStorage (h)
    {
        var Storage = {};

        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        var baseName = '__localStoragePolyfill', storeName = 'pairs';

        if (typeof indexedDB !== 'object') {

            setTimeout(h, 0);

            return {
                getItem: function (n) {

                    return this[n];

                },
                setItem: function (n, v) {

                    this[n] = v;

                },
                removeItem: function (n) {

                    delete this[n];

                }
            };

        }

        var updateBug = (navigator.userAgent || '')
            .indexOf('Edge') >= 0;

        connectDB(function (db) {

            getStorage(db, function (rows) {

                for (var i = 0, len = (rows || []).length; i < len; ++i) {

                    var o = rows[i];
                    Storage[o.n] = o.v;

                }

                h();

            });

        }, function () {

            h();

        });

        function connectDB (h, e) {

            var skipOne;

            var request = indexedDB.open(baseName, 1);
            request.onsuccess = function() {

                if (skipOne) {

                    skipOne = false;
                    return;

                }

                h(request.result);

            };
            request.onerror = e;
            request.onupgradeneeded = function(e) {

                skipOne = true;
                e.currentTarget.result.createObjectStore(storeName, { keyPath: 'n' });
                connectDB(h, e);

            };
        }

        function getStorage (db, h) {

            var rows = [],
                store = db.transaction([ storeName ], "readonly").objectStore(storeName);

            store.openCursor().onsuccess = function(e) {

                var cursor = e.target.result;

                if (cursor) {

                    rows.push(cursor.value);
                    cursor.continue();

                } else {

                    h(rows);

                }
            };

        }

        this.getItem = function (n) {

            if (n == null) {

                return null;

            }

            n = n + '';

            return Storage[n];

        };

        this.setItem = function (n, v) {

            if (n == null) {

                throw 'indexedDB Storage Error: at least one argument required';

            }

            n = n + '';
            v = v + '';

            if (Storage[n] === v) {

                return;

            }

            Storage[n] = v;

            connectDB(function(db) {

                if (updateBug) {

                    db.transaction([storeName], 'readwrite').objectStore(storeName).clear(n).onsuccess = function () {

                        for (n in Storage) {

                            db.transaction([storeName], 'readwrite').objectStore(storeName).put({ n: n, v: Storage[n] });

                        }

                    };
                    return;

                }

                db.transaction([storeName], 'readwrite').objectStore(storeName).put({ n: n, v: v });

            });
        };

        this.removeItem = function (n) {

            if (!n) {

                throw 'indexedDB Storage Error: at least one argument required';

            }

            n = n + '';

            delete Storage[n];

            connectDB(function(db) {

                db.transaction([storeName], 'readwrite').objectStore(storeName).delete(n);

            });

        };

        return this;
    }

    Object.defineProperty(IDBStorage, 'needToImplement', {
        value: function () {
            if (typeof window.localStorage === 'undefined') {

                return true;

            }

            try {

                localStorage.setItem('__storage_test__', '1');

                if (localStorage.getItem('__storage_test__') === '1') {

                    localStorage.removeItem('__storage_test__');
                    return false;

                }

            } catch (e) {

                return true;

            }
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                    //
    //                                                       Attach                                                       //
    //                                                                                                                    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    storage.IDBStorage = IDBStorage;

})();