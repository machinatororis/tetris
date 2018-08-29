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
    var ui;
    (function (ui) {
        ui.NativeMenuItem = flash.display.NativeMenuItem;
        ui.ContextMenuEvent = flash.events.ContextMenuEvent;
        var ContextMenuItem = (function (_super) {
            __extends(ContextMenuItem, _super);
            function ContextMenuItem(caption, separatorBefore, enabled, visible) {
                if (separatorBefore === void 0) { separatorBefore = false; }
                if (enabled === void 0) { enabled = true; }
                if (visible === void 0) { visible = true; }
                var _this = this;
                caption = as(caption, 'String');
                separatorBefore = Boolean(separatorBefore);
                enabled = Boolean(enabled);
                visible = Boolean(visible);
                _this.caption === void 0 && (_this.caption = null);
                _this.separatorBefore === void 0 && (_this.separatorBefore = false);
                _this.visible === void 0 && (_this.visible = false);
                _this.enabled === void 0 && (_this.enabled = false);
                _this = _super.call(this) || this;
                _this.caption = caption;
                _this.separatorBefore = separatorBefore;
                _this.enabled = enabled;
                _this.visible = visible;
                return _this;
            }
            ContextMenuItem.prototype.clone = function () {
                return new ContextMenuItem(this.caption, this.separatorBefore, this.enabled, this.visible);
            };
            ContextMenuItem.prototype.click = function () {
                this.dispatchEvent(new ui.ContextMenuEvent(ui.ContextMenuEvent.MENU_ITEM_SELECT));
            };
            return ContextMenuItem;
        }(ui.NativeMenuItem));
        ui.ContextMenuItem = ContextMenuItem;
    })(ui = flash.ui || (flash.ui = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ContextMenuItem.js.map