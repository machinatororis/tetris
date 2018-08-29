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
var global;
(function (global) {
    global.Bitmap = flash.display.Bitmap;
    global.BlendMode = flash.display.BlendMode;
    global.DisplayObject = flash.display.DisplayObject;
    global.Sprite = flash.display.Sprite;
    global.StageScaleMode = flash.display.StageScaleMode;
    global.Event = flash.events.Event;
    global.KeyboardEvent = flash.events.KeyboardEvent;
    global.MouseEvent = flash.events.MouseEvent;
    global.TimerEvent = flash.events.TimerEvent;
    global.TextField = flash.text.TextField;
    global.TextFieldAutoSize = flash.text.TextFieldAutoSize;
    global.TextFormat = flash.text.TextFormat;
    global.Timer = flash.utils.Timer;
    global.Timer = flash.utils.Timer;
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = this;
            _this.Picture === void 0 && (_this.Picture = asc.getMeta('Embed', [{ "key": "source", "value": "img/tetris.jpg" }]));
            _this.pictureStart === void 0 && (_this.pictureStart = asc.getMeta('Embed', [{ "key": "source", "value": "img/start.png" }]));
            _this.picturePause === void 0 && (_this.picturePause = asc.getMeta('Embed', [{ "key": "source", "value": "img/pause.png" }]));
            _this.pictureReplay === void 0 && (_this.pictureReplay = asc.getMeta('Embed', [{ "key": "source", "value": "img/replay.png" }]));
            _this.pause === void 0 && (_this.pause = as(new _this.picturePause(), global.Bitmap));
            _this.WIDTH === void 0 && (_this.WIDTH = _this.stage.stageWidth);
            _this.HEIGHT === void 0 && (_this.HEIGHT = _this.stage.stageHeight);
            _this.TS === void 0 && (_this.TS = 24);
            _this.fieldArray === void 0 && (_this.fieldArray = null);
            _this.fieldSprite === void 0 && (_this.fieldSprite = null);
            _this.interfaceSprite === void 0 && (_this.interfaceSprite = null);
            _this.startSprite === void 0 && (_this.startSprite = null);
            _this.pauseSprite === void 0 && (_this.pauseSprite = null);
            _this.replaySprite === void 0 && (_this.replaySprite = null);
            _this.txtPause === void 0 && (_this.txtPause = new global.TextField());
            _this.formatGameMessage === void 0 && (_this.formatGameMessage = new global.TextFormat());
            _this.tetrominoes === void 0 && (_this.tetrominoes = new Array());
            _this.colors === void 0 && (_this.colors = new Array());
            _this.tetromino === void 0 && (_this.tetromino = null);
            _this.currentTetromino === void 0 && (_this.currentTetromino = 0);
            _this.nextTetromino === void 0 && (_this.nextTetromino = 0);
            _this.currentRotation === void 0 && (_this.currentRotation = 0);
            _this.tRow === void 0 && (_this.tRow = 0);
            _this.tCol === void 0 && (_this.tCol = 0);
            _this.timeCount === void 0 && (_this.timeCount = new global.Timer(500));
            _this.gameOver === void 0 && (_this.gameOver = false);
            _this.gamePause === void 0 && (_this.gamePause = false);
            _this = _super.call(this) || this;
            _this.generateBackground();
            _this.generateField();
            _this.generateInterface();
            _this.initTetrominoes();
            _this.nextTetromino = ((Math.floor(Math.random() * 7)) >>> 0);
            _this.generateTetromino();
            _this.stage.addEventListener(global.KeyboardEvent.KEY_DOWN, _this.onKDown.__bind(_this));
            _this.fieldSprite.addEventListener(global.MouseEvent.CLICK, _this.onMouseClick.__bind(_this));
            _this.stage.scaleMode = global.StageScaleMode.NO_BORDER;
            return _this;
        }
        Main.prototype.onMouseClick = function (event) {
            event = strict(event, global.MouseEvent);
            if (!this.gameOver) {
                var ct = this.currentRotation;
                var rot = (((ct + 1) % this.tetrominoes[this.currentTetromino].length) >>> 0);
                if (this.canFit(this.tRow, this.tCol, rot)) {
                    this.currentRotation = rot;
                    this.fieldSprite.removeChild(this.tetromino);
                    this.drawTetromino();
                    this.placeTetromino();
                }
            }
        };
        Main.prototype.onKDown = function (event) {
            event = strict(event, global.KeyboardEvent);
            if (!this.gameOver) {
                switch (event.keyCode) {
                    case 37:
                        if (this.canFit(this.tRow, this.tCol - 1, this.currentRotation)) {
                            this.tCol--;
                            this.placeTetromino();
                        }
                        break;
                    case 38:
                        var ct = this.currentRotation;
                        var rot = (((ct + 1) % this.tetrominoes[this.currentTetromino].length) >>> 0);
                        if (this.canFit(this.tRow, this.tCol, rot)) {
                            this.currentRotation = rot;
                            this.fieldSprite.removeChild(this.tetromino);
                            this.drawTetromino();
                            this.placeTetromino();
                        }
                        break;
                    case 39:
                        if (this.canFit(this.tRow, this.tCol + 1, this.currentRotation)) {
                            this.tCol++;
                            this.placeTetromino();
                        }
                        break;
                    case 40:
                        if (this.canFit(this.tRow + 1, this.tCol, this.currentRotation)) {
                            this.tRow++;
                            this.placeTetromino();
                        }
                        else {
                            this.landTetromino();
                            this.generateTetromino();
                        }
                        break;
                }
            }
        };
        Main.prototype.landTetromino = function () {
            var ct = this.currentTetromino;
            var landed;
            for (var i = 0; i < this.tetrominoes[ct][this.currentRotation].length; i++) {
                for (var j = 0; j < this.tetrominoes[ct][this.currentRotation][i].length; j++) {
                    if (this.tetrominoes[ct][this.currentRotation][i][j] == 1) {
                        landed = new global.Sprite;
                        this.fieldSprite.addChild(landed);
                        landed.graphics.lineStyle(0, 0x000000);
                        landed.graphics.beginFill(this.colors[this.currentTetromino]);
                        landed.graphics.drawRect(this.TS * (this.tCol + j), this.TS * (this.tRow + i), this.TS, this.TS);
                        landed.graphics.endFill();
                        landed.name = "r" + (this.tRow + i) + "c" + (this.tCol + j);
                        this.fieldArray[this.tRow + i][this.tCol + j] = 1;
                    }
                }
            }
            this.fieldSprite.removeChild(this.tetromino);
            this.timeCount.removeEventListener(global.TimerEvent.TIMER, this.onTime.__bind(this));
            this.timeCount.stop();
            this.checkForLines();
        };
        Main.prototype.checkForLines = function () {
            for (var i = 0; i < 20; i++) {
                if (this.fieldArray[i].indexOf(0) == -1) {
                    for (var j = 0; j < 10; j++) {
                        this.fieldArray[i][j] = 0;
                        this.fieldSprite.removeChild(this.fieldSprite.getChildByName("r" + i + "c" + j));
                    }
                    for (j = i; j >= 0; j--) {
                        for (var k = 0; k < 10; k++) {
                            if (this.fieldArray[j][k] == 1) {
                                this.fieldArray[j][k] = 0;
                                this.fieldArray[j + 1][k] = 1;
                                this.fieldSprite.getChildByName("r" + j + "c" + k).y += this.TS;
                                this.fieldSprite.getChildByName("r" + j + "c" + k).name = "r" + (j + 1) + "c" + k;
                            }
                        }
                    }
                }
            }
        };
        Main.prototype.canFit = function (row, col, side) {
            row = ((row) >> 0);
            col = ((col) >> 0);
            side = ((side) >>> 0);
            var ct = this.currentTetromino;
            for (var i = 0; i < this.tetrominoes[ct][side].length; i++) {
                for (var j = 0; j < this.tetrominoes[ct][side][i].length; j++) {
                    if (this.tetrominoes[ct][side][i][j] == 1) {
                        if (col + j < 0) {
                            return false;
                        }
                        if (col + j > 9) {
                            return false;
                        }
                        if (row + i > 19) {
                            return false;
                        }
                        if (row + i < 0) {
                            return false;
                        }
                        if (this.fieldArray[row + i][col + j] == 1) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        Main.prototype.generateTetromino = function () {
            if (!this.gameOver) {
                this.currentTetromino = this.nextTetromino;
                this.nextTetromino = ((Math.floor(Math.random() * 7)) >>> 0);
                this.drawNext();
                this.currentRotation = 0;
                this.tRow = 0;
                if (this.tetrominoes[this.currentTetromino][0][0].indexOf(1) == -1) {
                    this.tRow = -1;
                }
                this.tCol = 3;
                this.drawTetromino();
                if (this.canFit(this.tRow, this.tCol, this.currentRotation)) {
                    this.timeCount.addEventListener(global.TimerEvent.TIMER, this.onTime.__bind(this));
                    this.timeCount.start();
                }
                else {
                    this.gameOver = true;
                    this.drawGameOver();
                }
            }
        };
        Main.prototype.drawNext = function () {
            if (this.fieldSprite.getChildByName("next") != null) {
                this.fieldSprite.removeChild(this.fieldSprite.getChildByName("next"));
            }
            var next_t = new global.Sprite;
            next_t.x = 270;
            next_t.y = 70;
            next_t.name = "next";
            this.fieldSprite.addChild(next_t);
            next_t.graphics.lineStyle(0, 0x000000);
            for (var i = 0; i < this.tetrominoes[this.nextTetromino][0].length; i++) {
                for (var j = 0; j < this.tetrominoes[this.nextTetromino][0][i].length; j++) {
                    if (this.tetrominoes[this.nextTetromino][0][i][j] == 1) {
                        next_t.graphics.beginFill(this.colors[this.nextTetromino]);
                        next_t.graphics.drawRect(this.TS * j, this.TS * i, this.TS, this.TS);
                        next_t.graphics.endFill();
                    }
                }
            }
        };
        Main.prototype.onTime = function (event) {
            event = strict(event, global.TimerEvent);
            if (this.canFit(this.tRow + 1, this.tCol, this.currentRotation)) {
                this.tRow++;
                this.placeTetromino();
            }
            else {
                this.landTetromino();
                this.generateTetromino();
            }
        };
        Main.prototype.drawTetromino = function () {
            var ct = this.currentTetromino;
            this.tetromino = new global.Sprite;
            this.fieldSprite.addChild(this.tetromino);
            this.tetromino.graphics.lineStyle(0, 0x000000);
            for (var i = 0; i < this.tetrominoes[ct][this.currentRotation].length; i++) {
                for (var j = 0; j < this.tetrominoes[ct][this.currentRotation][i].length; j++) {
                    if (this.tetrominoes[ct][this.currentRotation][i][j] == 1) {
                        this.tetromino.graphics.beginFill(this.colors[ct]);
                        this.tetromino.graphics.drawRect(this.TS * j, this.TS * i, this.TS, this.TS);
                        this.tetromino.graphics.endFill();
                    }
                }
            }
            this.placeTetromino();
        };
        Main.prototype.placeTetromino = function () {
            this.tetromino.x = this.tCol * this.TS;
            this.tetromino.y = this.tRow * this.TS;
        };
        Main.prototype.initTetrominoes = function () {
            this.tetrominoes[0] = [[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]];
            this.colors[0] = 0x00FFFF;
            this.tetrominoes[1] = [[[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];
            this.colors[1] = 0xAA00FF;
            this.tetrominoes[2] = [[[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]], [[1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]]];
            this.colors[2] = 0xFFA500;
            this.tetrominoes[3] = [[[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]]];
            this.colors[3] = 0x0000FF;
            this.tetrominoes[4] = [[[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];
            this.colors[4] = 0xFF0000;
            this.tetrominoes[5] = [[[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]]];
            this.colors[5] = 0x00FF00;
            this.tetrominoes[6] = [[[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]];
            this.colors[6] = 0xFFFF00;
        };
        Main.prototype.generateBackground = function () {
            var pic = as(new this.Picture(), global.Bitmap);
            pic.x = ((this.WIDTH / 2) - (2560 / 2));
            pic.y = ((this.HEIGHT / 2) - (1600 / 2));
            this.addChild(pic);
        };
        Main.prototype.generateField = function () {
            var colors = new Array("0x444444", "0x555555");
            this.fieldArray = new Array;
            this.fieldSprite = new global.Sprite;
            this.addChild(this.fieldSprite);
            this.fieldSprite.x = ((this.WIDTH / 2) - (5 * this.TS));
            this.fieldSprite.y = ((this.HEIGHT / 2) - (10 * this.TS));
            this.fieldSprite.graphics.lineStyle(0, 0x000000);
            for (var i = 0; i < 20; i++) {
                this.fieldArray[i] = new Array;
                for (var j = 0; j < 10; j++) {
                    this.fieldArray[i][j] = 0;
                    this.fieldSprite.graphics.beginFill(colors[(j % 2 + i % 2) % 2]);
                    this.fieldSprite.graphics.drawRect(this.TS * j, this.TS * i, this.TS, this.TS);
                    this.fieldSprite.graphics.endFill();
                }
            }
        };
        Main.prototype.generateInterface = function () {
            this.interfaceSprite = new global.Sprite;
            this.addChild(this.interfaceSprite);
            this.interfaceSprite.x = ((this.WIDTH / 2) - (5 * this.TS));
            this.interfaceSprite.y = ((this.HEIGHT / 2) - (10 * this.TS));
            this.startSprite = new global.Sprite;
            this.interfaceSprite.addChild(this.startSprite);
            var start = as(new this.pictureStart(), global.Bitmap);
            start.x = 280;
            start.y = 200;
            this.startSprite.addChild(start);
            this.startSprite.addEventListener(global.MouseEvent.CLICK, this.onStart.__bind(this));
            this.pauseSprite = new global.Sprite;
            this.interfaceSprite.addChild(this.pauseSprite);
            this.pause.x = 280;
            this.pause.y = 300;
            this.pauseSprite.addChild(this.pause);
            this.pauseSprite.addEventListener(global.MouseEvent.CLICK, this.onPause.__bind(this));
            this.replaySprite = new global.Sprite;
            this.interfaceSprite.addChild(this.replaySprite);
            var replay = as(new this.pictureReplay(), global.Bitmap);
            replay.x = 280;
            replay.y = 400;
            this.replaySprite.addChild(replay);
            this.replaySprite.addEventListener(global.MouseEvent.CLICK, this.onReplay.__bind(this));
            var formatNext = new global.TextFormat();
            formatNext.font = "Consolas";
            formatNext.size = 40;
            formatNext.color = 0x000000;
            var txtNext = new global.TextField();
            this.fieldSprite.addChild(txtNext);
            txtNext.text = "NEXT";
            txtNext.x = 270;
            txtNext.y = 10;
            txtNext.width = 800;
            txtNext.height = 100;
            txtNext.setTextFormat(formatNext);
        };
        Main.prototype.onStart = function (event) {
            event = strict(event, global.MouseEvent);
            if (this.gamePause) {
                this.gamePause = false;
                this.fieldSprite.removeChild(this.txtPause);
                this.timeCount.start();
            }
        };
        Main.prototype.onPause = function (event) {
            event = strict(event, global.MouseEvent);
            if (!this.gameOver) {
                this.gamePause = true;
                this.timeCount.stop();
                this.fieldSprite.addChild(this.txtPause);
                this.txtPause.background = true;
                this.txtPause.backgroundColor = 0x222222;
                this.txtPause.text = "PAUSE";
                this.txtPause.autoSize = global.TextFieldAutoSize.CENTER;
                this.txtPause.x = 0;
                this.txtPause.y = 200;
                this.txtPause.width = 240;
                this.txtPause.height = 61;
                this.setFormatGameMessage();
                this.txtPause.setTextFormat(this.formatGameMessage);
            }
        };
        Main.prototype.onReplay = function (event) {
            event = strict(event, global.MouseEvent);
            this.gameOver = false;
            this.timeCount.stop();
            this.fieldSprite.removeChild(this.fieldSprite.getChildByName("next"));
            this.generateField();
            this.generateTetromino();
            this.timeCount.start();
            this.fieldSprite.addEventListener(global.MouseEvent.CLICK, this.onMouseClick.__bind(this));
        };
        Main.prototype.setFormatGameMessage = function () {
            this.formatGameMessage.font = "Consolas";
            this.formatGameMessage.size = 48;
            this.formatGameMessage.color = 0xffffff;
        };
        Main.prototype.drawGameOver = function () {
            this.setFormatGameMessage();
            var txtGameOver = new global.TextField();
            this.fieldSprite.addChild(txtGameOver);
            txtGameOver.background = true;
            txtGameOver.backgroundColor = 0x222222;
            txtGameOver.text = "GAME OVER";
            txtGameOver.x = 0;
            txtGameOver.y = 200;
            txtGameOver.width = 240;
            txtGameOver.height = 61;
            txtGameOver.setTextFormat(this.formatGameMessage);
        };
        return Main;
    }(global.Sprite));
    global.Main = Main;
})(global || (global = {}));
//# sourceMappingURL=Main.js.map