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
        ui.NativeMenu = flash.display.NativeMenu;
        ui.Stage = flash.display.Stage;
        ui.ContextMenuEvent = flash.events.ContextMenuEvent;
        ui.MouseEvent = flash.events.MouseEvent;
        ui.URLRequest = flash.net.URLRequest;
        ui.Capabilities = flash.system.Capabilities;
        var ContextMenu = (function (_super) {
            __extends(ContextMenu, _super);
            function ContextMenu() {
                var _this = this;
                _this.builtInItems === void 0 && (_this.builtInItems = null);
                _this.clipboardItems === void 0 && (_this.clipboardItems = null);
                _this.clipboardMenu === void 0 && (_this.clipboardMenu = false);
                _this.customItems === void 0 && (_this.customItems = null);
                _this.link === void 0 && (_this.link = null);
                _this = _super.call(this) || this;
                var cl;
                if (typeof window.asc.menu == 'object' && typeof (cl = window.asc.menu.ContextMenu) == 'function') {
                    ContextMenu.sMenu = new cl;
                }
                ContextMenu.sDefaultBuiltInItems = ContextMenu.sDefaultBuiltInItems || new ui.ContextMenuBuiltInItems;
                _this.builtInItems = ContextMenu.sDefaultBuiltInItems;
                _this.customItems = [];
                return _this;
            }
            Object.defineProperty(ContextMenu, "isSupported", {
                get: function () {
                    return ui.Mouse.supportsCursor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ContextMenu, "isOpened", {
                get: function () {
                    return ContextMenu.sMenu && ContextMenu.sMenu.opened;
                },
                enumerable: true,
                configurable: true
            });
            ContextMenu.prototype.clone = function () {
                var ins = new ContextMenu;
                ins.link = this.link;
                if (this.customItems) {
                    ins.customItems = this.customItems.concat();
                }
                ins.clipboardMenu = this.clipboardMenu;
                return ins;
            };
            ContextMenu.prototype.hideBuiltInItems = function () { };
            ContextMenu.prototype.show = function (event) {
                event = strict(event, ui.MouseEvent);
                var base = event.base;
                if (!ContextMenu.sMenu || ui.Capabilities.isMobile || !base) {
                    return;
                }
                event.preventDefault();
                var items = this.customItems ? this.customItems.concat() : [];
                ContextMenu.sDefaultMenuItem = ContextMenu.sDefaultMenuItem || new ui.ContextMenuItem('', true, false);
                if (!ContextMenu.sDefaultMenuItem.caption || ContextMenu.sDefaultMenuItem.caption.length != ContextMenu.sDefaultMenuItemCaption.length) {
                    ContextMenu.sDefaultMenuItem.caption = ContextMenu.sDefaultMenuItemCaption.map(function (code) {
                        return String.fromCharCode(code);
                    }.__bind(this)).join('');
                }
                items.push(ContextMenu.sDefaultMenuItem);
                var ratio = ui.Capabilities.__getPixelAspectRatio();
                var div = ui.Stage.sCurrent.displayState == 'normal' ? document.body : ui.Stage.sCurrent.body;
                ContextMenu.sMenu.open(div, items, base.pageX * ratio, base.pageY * ratio);
                this.dispatchEvent(new ui.ContextMenuEvent(ui.ContextMenuEvent.MENU_SELECT));
            };
            ContextMenu.sMenu = null;
            ContextMenu.sDefaultBuiltInItems = null;
            ContextMenu.sDefaultMenuItem = null;
            ContextMenu.sDefaultMenuItemCaption = [
                65, 83, 67, 74, 83, 32, 98, 121, 32, 80, 101, 116,
                101, 114, 32, 75, 117, 108, 105, 107, 111, 118, 44,
                32, 112, 111, 119, 101, 114, 101, 100, 32, 98, 121,
                32, 65, 98, 115, 111, 108, 117, 116, 105, 115, 116,
                32, 76, 116, 100
            ];
            return ContextMenu;
        }(ui.NativeMenu));
        ui.ContextMenu = ContextMenu;
    })(ui = flash.ui || (flash.ui = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ContextMenu.js.map