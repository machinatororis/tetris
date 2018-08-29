var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var instance;
                (function (instance) {
                    instance.SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
                    instance.SWFButtonRecord = flash.__native.format.swf.data.SWFButtonRecord;
                    instance.TagDefineButton = flash.__native.format.swf.tags.TagDefineButton;
                    instance.TagDefineButton2 = flash.__native.format.swf.tags.TagDefineButton2;
                    instance.BlendMode = flash.display.BlendMode;
                    instance.DisplayObject = flash.display.DisplayObject;
                    instance.DisplayObjectContainer = flash.display.DisplayObjectContainer;
                    instance.Sprite = flash.display.Sprite;
                    var SimpleButton = (function (_super) {
                        __extends(SimpleButton, _super);
                        function SimpleButton(tag) {
                            var _this = this;
                            tag = strict(tag, instance.TagDefineButton2);
                            if (!tag) {
                                return;
                            }
                            _this.tag = tag;
                            _this.data = strict(tag.root, instance.SWFTimelineContainer);
                            _this = _super.call(this, _this.processState('upState', tag.getRecordsByState(instance.TagDefineButton.STATE_UP)), _this.processState('overState', tag.getRecordsByState(instance.TagDefineButton.STATE_OVER)), _this.processState('downState', tag.getRecordsByState(instance.TagDefineButton.STATE_DOWN)), _this.processState('hitTestState', tag.getRecordsByState(instance.TagDefineButton.STATE_HIT))) || this;
                            return _this;
                        }
                        SimpleButton.prototype.processState = function (field, recs) {
                            var container = new instance.Sprite;
                            for (var i = 0, len = recs.length; i < len; ++i) {
                                var rec = recs[i];
                                var displayObject = this.data.getDisplayObject(rec.characterId);
                                if (!displayObject) {
                                    continue;
                                }
                                this.placeButtonRecord(displayObject, rec, container);
                            }
                            return container;
                        };
                        SimpleButton.prototype.placeButtonRecord = function (displayObject, record, container) {
                            if (record.placeMatrix != null) {
                                displayObject.transform._matrix.__copyFrom(record.placeMatrix.matrix);
                            }
                            if (record.hasFilterList) {
                                displayObject.__setSWFFilters(record.filterList);
                            }
                            if (record.hasBlendMode) {
                                displayObject.blendMode = as(SimpleButton.blendModes[record.blendMode], 'String');
                            }
                            if (record.colorTransform != null) {
                                displayObject.transform.colorTransform = record.colorTransform.colorTransform;
                            }
                            container.__addChildAt(displayObject, (record.placeDepth < container._childrenLength) ? record.placeDepth - 1 : container._childrenLength);
                        };
                        SimpleButton.blendModes = asc.sti(SimpleButton, function () { SimpleButton.blendModes = new Array([instance.BlendMode.NORMAL, instance.BlendMode.NORMAL, instance.BlendMode.LAYER, instance.BlendMode.MULTIPLY, instance.BlendMode.SCREEN, instance.BlendMode.LIGHTEN, instance.BlendMode.DARKEN, instance.BlendMode.DIFFERENCE, instance.BlendMode.ADD, instance.BlendMode.SUBTRACT, instance.BlendMode.INVERT, instance.BlendMode.ALPHA, instance.BlendMode.ERASE, instance.BlendMode.OVERLAY, instance.BlendMode.HARDLIGHT, instance.BlendMode.SHADER]); });
                        return SimpleButton;
                    }(flash.display.SimpleButton));
                    instance.SimpleButton = SimpleButton;
                })(instance = swf.instance || (swf.instance = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SimpleButton.js.map