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
    var events;
    (function (events) {
        events.InteractiveObject = flash.display.InteractiveObject;
        var ContextMenuEvent = (function (_super) {
            __extends(ContextMenuEvent, _super);
            function ContextMenuEvent(type, bubbles, cancelable, mouseTarget, contextMenuOwner) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (mouseTarget === void 0) { mouseTarget = null; }
                if (contextMenuOwner === void 0) { contextMenuOwner = null; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                mouseTarget = strict(mouseTarget, events.InteractiveObject);
                contextMenuOwner = strict(contextMenuOwner, events.InteractiveObject);
                _this.contextMenuOwner === void 0 && (_this.contextMenuOwner = null);
                _this.isMouseTargetInaccessible === void 0 && (_this.isMouseTargetInaccessible = false);
                _this.mouseTarget === void 0 && (_this.mouseTarget = null);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this.mouseTarget = mouseTarget;
                _this.contextMenuOwner = contextMenuOwner;
                return _this;
            }
            ContextMenuEvent.prototype.clone = function () {
                return new ContextMenuEvent(this.type, this.bubbles, this.cancelable, this.mouseTarget, this.contextMenuOwner);
            };
            ContextMenuEvent.prototype.toString = function () {
                return this.formatToString("ContextMenuEvent", "type", "bubbles", "cancelable", "eventPhase", "mouseTarget", "contextMenuOwner");
            };
            ContextMenuEvent.MENU_ITEM_SELECT = "menuItemSelect";
            ContextMenuEvent.MENU_SELECT = "menuSelect";
            return ContextMenuEvent;
        }(events.Event));
        events.ContextMenuEvent = ContextMenuEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ContextMenuEvent.js.map