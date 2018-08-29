var mx;
(function (mx) {
    var utils;
    (function (utils) {
        utils.DisplayObject = flash.display.DisplayObject;
        utils.getQualifiedClassName = flash.utils.getQualifiedClassName;
        utils.IRepeaterClient = mx.core.IRepeaterClient;
        var NameUtil = (function () {
            function NameUtil() {
            }
            NameUtil.displayObjectToString = function (param1) {
                param1 = strict(param1, utils.DisplayObject);
                var _loc2_ = null;
                var _loc4_ = null;
                var _loc5_ = null;
                var _loc3_ = param1;
                while (_loc3_ != null) {
                    if (_loc3_.parent && _loc3_.stage && _loc3_.parent == _loc3_.stage) {
                        break;
                    }
                    _loc4_ = _loc3_.name;
                    if (is(_loc3_, 'implements_mx_core_IRepeaterClient')) {
                        _loc5_ = utils.IRepeaterClient(_loc3_).instanceIndices;
                        if (_loc5_) {
                            _loc4_ = _loc4_ + ("[" + _loc5_.join("][") + "]");
                        }
                    }
                    _loc2_ = _loc2_ == null ? _loc4_ : _loc4_ + "." + _loc2_;
                    _loc3_ = _loc3_.parent;
                }
                return _loc2_;
            };
            NameUtil.createUniqueName = function (param1) {
                if (!param1) {
                    return null;
                }
                var _loc2_ = utils.getQualifiedClassName(param1);
                var _loc3_ = ((_loc2_.indexOf("::")) >> 0);
                if (_loc3_ != -1) {
                    _loc2_ = _loc2_.substr(_loc3_ + 2);
                }
                var _loc4_ = ((_loc2_.charCodeAt(_loc2_.length - 1)) >> 0);
                if (_loc4_ >= 48 && _loc4_ <= 57) {
                    _loc2_ = _loc2_ + "_";
                }
                return _loc2_ + NameUtil.counter++;
            };
            NameUtil.VERSION = "3.0.0.0";
            NameUtil.counter = 0;
            return NameUtil;
        }());
        utils.NameUtil = NameUtil;
    })(utils = mx.utils || (mx.utils = {}));
})(mx || (mx = {}));
//# sourceMappingURL=NameUtil.js.map