/// <reference path="base.d.ts" />
/// <reference path="flash/utils/Timer.ts" />
/// <reference path="flash/utils/Timer.ts" />
/// <reference path="flash/text/TextFormat.ts" />
/// <reference path="flash/text/TextFieldAutoSize.ts" />
/// <reference path="flash/text/TextField.ts" />
/// <reference path="flash/events/TimerEvent.ts" />
/// <reference path="flash/events/MouseEvent.ts" />
/// <reference path="flash/events/KeyboardEvent.ts" />
/// <reference path="flash/events/Event.ts" />
/// <reference path="flash/display/StageScaleMode.ts" />
/// <reference path="flash/display/Sprite.ts" />
/// <reference path="flash/display/DisplayObject.ts" />
/// <reference path="flash/display/BlendMode.ts" />
/// <reference path="flash/display/Bitmap.ts" />

namespace global
{
	
	export import Bitmap = flash.display.Bitmap;
	export import BlendMode = flash.display.BlendMode;
	export import DisplayObject = flash.display.DisplayObject;
	export import Sprite = flash.display.Sprite;
	export import StageScaleMode = flash.display.StageScaleMode;
	export import Event = flash.events.Event;
	export import KeyboardEvent = flash.events.KeyboardEvent;
	export import MouseEvent = flash.events.MouseEvent;
	export import TimerEvent = flash.events.TimerEvent;
	export import TextField = flash.text.TextField;
	export import TextFieldAutoSize = flash.text.TextFieldAutoSize;
	export import TextFormat = flash.text.TextFormat;
	export import Timer = flash.utils.Timer;
	export import Timer = flash.utils.Timer;
	
	
	//import flashx.textLayout.formats.TextAlign;
	
	export  class Main extends Sprite 
	{
		/*[Embed(source="img/tetris.jpg")]*/ private Picture: {new(...a)};
		/*[Embed(source="img/start.png")]*/ private pictureStart: {new(...a)};
		/*[Embed(source="img/pause.png")]*/ private picturePause: {new(...a)};
		/*[Embed(source="img/replay.png")]*/ private pictureReplay: {new(...a)};
		private pause: Bitmap;
		private WIDTH: number;		// ширина сцены
		private HEIGHT: number;	// высота сцены
		private TS: number;					// высота и ширина ячейки поля в пикселях
		private fieldArray: any[];					// массив, который будет численно представлять игровое поле
		private fieldSprite: Sprite;				// DisplayObject, который графически отобразит игровое поле
		private interfaceSprite: Sprite;			// спрайт для интерфейсных кнопок
		private startSprite: Sprite;				// спрайт кнопки start
		private pauseSprite: Sprite;				// спрайт кнопки pause
		private replaySprite: Sprite;				// спрайт кнопки replay
		private txtPause: TextField;
		private formatGameMessage: TextFormat;
		private tetrominoes: any[];  	// четырехмерный массив, содержащий всю информацию о тетромино
		private colors: any[];  		// цвета тетромино
		private tetromino: Sprite;					// DisplayObject тетромино
		private currentTetromino: number;				// число тетромино в игре (от 0 до 6)
		private nextTetromino: number;				// какое тетромино будет следующим
		private currentRotation: number;				// вращение тетромино (от 0 до 3)
		private tRow: number;							// вертикальное положение тетромино
		private tCol: number;							// горизонтальное положение тетромино
		private timeCount: Timer;	// будет запускать слушатель событий каждые 500 миллисекунд
		private gameOver: boolean;			// игра окончена или нет
		private gamePause: boolean;			// игра на паузе или нет

		constructor() 
		{
			/**/ this.Picture === void 0 && (this.Picture = asc.getMeta('Embed', [{"key":"source","value":"img/tetris.jpg"}]));
			/**/ this.pictureStart === void 0 && (this.pictureStart = asc.getMeta('Embed', [{"key":"source","value":"img/start.png"}]));
			/**/ this.picturePause === void 0 && (this.picturePause = asc.getMeta('Embed', [{"key":"source","value":"img/pause.png"}]));
			/**/ this.pictureReplay === void 0 && (this.pictureReplay = asc.getMeta('Embed', [{"key":"source","value":"img/replay.png"}]));
			/**/ this.pause === void 0 && (this.pause = as(new this.picturePause() , Bitmap));
			/**/ this.WIDTH === void 0 && (this.WIDTH = this.stage.stageWidth);
			/**/ this.HEIGHT === void 0 && (this.HEIGHT = this.stage.stageHeight);
			/**/ this.TS === void 0 && (this.TS = 24);
			/**/ this.fieldArray === void 0 && (this.fieldArray = null);
			/**/ this.fieldSprite === void 0 && (this.fieldSprite = null);
			/**/ this.interfaceSprite === void 0 && (this.interfaceSprite = null);
			/**/ this.startSprite === void 0 && (this.startSprite = null);
			/**/ this.pauseSprite === void 0 && (this.pauseSprite = null);
			/**/ this.replaySprite === void 0 && (this.replaySprite = null);
			/**/ this.txtPause === void 0 && (this.txtPause = new TextField());
			/**/ this.formatGameMessage === void 0 && (this.formatGameMessage = new TextFormat());
			/**/ this.tetrominoes === void 0 && (this.tetrominoes = new Array());
			/**/ this.colors === void 0 && (this.colors = new Array());
			/**/ this.tetromino === void 0 && (this.tetromino = null);
			/**/ this.currentTetromino === void 0 && (this.currentTetromino = 0);
			/**/ this.nextTetromino === void 0 && (this.nextTetromino = 0);
			/**/ this.currentRotation === void 0 && (this.currentRotation = 0);
			/**/ this.tRow === void 0 && (this.tRow = 0);
			/**/ this.tCol === void 0 && (this.tCol = 0);
			/**/ this.timeCount === void 0 && (this.timeCount = new Timer(500));
			/**/ this.gameOver === void 0 && (this.gameOver = false);
			/**/ this.gamePause === void 0 && (this.gamePause = false);
			super(); 
			this.generateBackground();						// рисуем bg
			this.generateField();   							// рисуем поле
			this.generateInterface();						// рисуем интерфейс
			this.initTetrominoes();							// инициализируем массивы, связанные с тетромино
			this.nextTetromino =(( Math.floor(Math.random() * 7)) >>> 0); // генерируем следующее тетромино
			this.generateTetromino();						// генерируем случайное тетромино на поле
			this.stage.addEventListener(KeyboardEvent.KEY_DOWN, this.onKDown.__bind(this));	// слушатель клавиатуры
			this.fieldSprite.addEventListener(MouseEvent.CLICK, this.onMouseClick.__bind(this));		// слушатель мышки
			this.stage.scaleMode = StageScaleMode.NO_BORDER;
			//trace("stage.scaleMode:",stage.scaleMode);
		}
		
		protected onMouseClick(event:MouseEvent):void
		{
			/**/ event = strict(event, MouseEvent);
			if(! this.gameOver)
			{
				var ct: number = this.currentRotation;
				var rot: number =  (((ct + 1) % this.tetrominoes[this.currentTetromino].length) >>> 0);	// вращение тетромино
				
				// проверяем текущую позицию при вращении, нарушает ли она границы
				if (this.canFit(this.tRow, this.tCol, rot)) 
				{
					this.currentRotation = rot;		// если все ок, принимает текущее вращение
					this.fieldSprite.removeChild(this.tetromino);		// текущее тетромино удаляем
					this.drawTetromino();			// рисуем тетромино в новом вращении, которое приняли
					this.placeTetromino();			// размещаем его на сцене
				}
			}
		}

		private onKDown(event:KeyboardEvent):void
		{
			/**/ event = strict(event, KeyboardEvent);
			if(! this.gameOver)
			{
				switch (event.keyCode) 
				{
					case 37 :
						if (this.canFit(this.tRow, this.tCol - 1, this.currentRotation))	// проверяем, может ли тетромино поместиться в заданное положение или нет 
						{
							this.tCol--;
							this.placeTetromino();
						}
						break;
					case 38 :
						var ct: number = this.currentRotation;
						var rot: number =  (((ct + 1) % this.tetrominoes[this.currentTetromino].length) >>> 0);	// вращение тетромино
						
						// проверяем текущую позицию при вращении, нарушает ли она границы
						if (this.canFit(this.tRow, this.tCol, rot)) 
						{
							this.currentRotation = rot;		// если все ок, принимает текущее вращение
							this.fieldSprite.removeChild(this.tetromino);		// текущее тетромино удаляем
							this.drawTetromino();			// рисуем тетромино в новом вращении, которое приняли
							this.placeTetromino();			// размещаем его на сцене
						}
						break;
					case 39 :
						if (this.canFit(this.tRow, this.tCol + 1, this.currentRotation)) 
						{
							this.tCol++;
							this.placeTetromino();
						}
						break;
					case 40 :
						if (this.canFit(this.tRow + 1, this.tCol, this.currentRotation)) 
						{
							this.tRow++;
							this.placeTetromino();
						}
						else						// если вниз больше двигаться некуда 
						{
							this.landTetromino();		// считаем тетромино посаженным
							this.generateTetromino();	// генерируем новый тетромино
						}
						break;
				
					//case 38 :
						//if (canFit(tRow - 1, tCol)) 
						//{
							//tRow--;
							//placeTetromino();
						//}
						//break;
				}
			}
		}
		
		private landTetromino():void		// когда тетромино садится на свое место, по сути перерисовываем его
		{
			var ct: number = this.currentTetromino;
			var landed: Sprite;
			
			// циклами ищем частички тетромино (каждую из четырех)
			for (var i: number = 0; i < this.tetrominoes[ct][this.currentRotation].length; i++) 
			{
				for (var j: number = 0; j < this.tetrominoes[ct][this.currentRotation][i].length; j++) 
				{
					if (this.tetrominoes[ct][this.currentRotation][i][j] == 1)		// если нашли, то рисуем ее 
					{
						landed = new Sprite;
						this.fieldSprite.addChild(landed);
						landed.graphics.lineStyle(0, 0x000000);
						landed.graphics.beginFill(this.colors[this.currentTetromino]);
						landed.graphics.drawRect(this.TS * (this.tCol + j), this.TS * (this.tRow + i), this.TS, this.TS);
						landed.graphics.endFill();
						landed.name = "r" + (this.tRow + i) + "c" + (this.tCol + j);		// имя части посаженого тетромино(часть в пятом столбце третьей строки будет r3c5)
						this.fieldArray[this.tRow + i][this.tCol + j] = 1;					// рисуем квадрат, где лежит тетромино
					}
				}	
			}
			this.fieldSprite.removeChild(this.tetromino);				// обновляем массив
			this.timeCount.removeEventListener(TimerEvent.TIMER, this.onTime.__bind(this));
			this.timeCount.stop();
			this.checkForLines();					// проверяем завершенные линии
		}
		
		private checkForLines():void
		{
			for (var i: number = 0; i < 20; i++)					// перебираем все строки игрового поля 
			{
				if (this.fieldArray[i].indexOf(0) == -1)				// завершенная строка должна быть полностью заполнена кусками тетромино, массив должен быть заполнен на 1, то есть не может быть никакого 0. 
				{
					for (var j: number = 0; j < 10; j++) 			// если строка завершена, перебираем все ее десять столбцов, чтобы удалить
					{
						this.fieldArray[i][j] = 0;					// очищаем ячейки 
						this.fieldSprite.removeChild(this.fieldSprite.getChildByName("r" + i + "c" + j));	// удаляем соответствующий DisplayObject, определяем его по названию.
					}
					
					// ищем все строки, выше удаленной строки i. Сместим их на одну вниз
					for (j = i; j >= 0; j--) 
					{
						for (var k: number = 0; k < 10; k++) 
						{
							if (this.fieldArray[j][k] == 1)			// есть ли тетрамино в k-м столбце первой j строки
							{
								this.fieldArray[j][k] = 0;			// устанавливаем k-й столбец j-й строки в 0
								this.fieldArray[j+1][k] = 1;			// устанавливаем k-й столбец (j+1)-й строки в 1. Таким образом мы перемещаемся по всей строке
								this.fieldSprite.getChildByName("r" + j + "c" + k).y += this.TS;						// перемещаем соответствующий DisplayObject по TS ячейкам поля
								this.fieldSprite.getChildByName("r" + j + "c" + k).name = "r" + (j + 1) + "c" + k;	// изменяем соответствующее имя DisplayObject в соответствии с его новой позицией
							}
						}
					}
				}
			}
		}
		
		private canFit(row:number, col:number, side:number):boolean	// может ли тетромино поместиться в новом положении
		{
			/**/ row = ((row) >> 0); col = ((col) >> 0); side = ((side) >>> 0);
			var ct: number = this.currentTetromino;
			
			// циклами проверяем текущее положение тетромино
			for (var i: number = 0; i < this.tetrominoes[ct][side].length; i++) 
			{
				for (var j: number = 0; j < this.tetrominoes[ct][side][i].length; j++) 
				{
					// проверка того, чтобы тетромино было полностью внутри игрового поля
					if (this.tetrominoes[ct][side][i][j] == 1) 
					{
						// граница слева
						if (col + j < 0) 
						{
							return false;
						}
						// граница справа
						if (col + j > 9) 
						{
							return false;
						}
						// нижняя граница
						if (row + i > 19) 
						{
							return false;
						}
						// верхняя граница
						if (row + i < 0) 
						{
							return false;
						}
						//if (row + i < 0)  // для движения вверх
						//{
							//return false;
						//}
						
						// если на этом месте уже есть другое тетромино
						if (this.fieldArray[row + i][col + j] == 1) 
						{
							return false;
						}
					}
				}
			}
			return true;
		}
		
		// когда пришло время генерировать текущее тетромино, присваиваем ему значение следующего и создаем следующее случайное тетромино
		private generateTetromino():void				// генерируем случайное тетромино на поле
		{
			if (! this.gameOver)
			{
				this.currentTetromino = this.nextTetromino;
				this.nextTetromino =(( Math.floor(Math.random() * 7)) >>> 0);
				this.drawNext();
				//currentTetromino = Math.floor(Math.random() * 7);  	// генерируем случайное целое число от 0 до 6 (возможные тетромино)
				this.currentRotation = 0;	// начальное вращение
				this.tRow = 0;				// начальный ряд
				
				if (this.tetrominoes[this.currentTetromino][0][0].indexOf(1) == -1) 
				{
					this.tRow = -1;
				}
				
				this.tCol = 3;				// всегда 3, потому что тетромино включены в массив из 4 элементов, поэтому, чтобы центрировать его в поле шириной 10 колонок, его начало должно быть в (10-4) / 2 = 3
				this.drawTetromino();		// рисуем тетромино
				
				if (this.canFit(this.tRow, this.tCol, this.currentRotation)) 
				{
					this.timeCount.addEventListener(TimerEvent.TIMER, this.onTime.__bind(this));
					this.timeCount.start();
				}
				else
				{
					this.gameOver=true;
					this.drawGameOver();
				}
			}
		}
		
		private drawNext():void			// рисуем следующее тетромино таким же образом, как drawTetromino
		{
			if (this.fieldSprite.getChildByName("next") != null) 
			{
				this.fieldSprite.removeChild(this.fieldSprite.getChildByName("next"));
			}
			
			var next_t: Sprite = new Sprite;
			next_t.x = 270;
			next_t.y = 70;
			next_t.name = "next";
			this.fieldSprite.addChild(next_t);
			next_t.graphics.lineStyle(0, 0x000000);
			
			for (var i: number = 0; i < this.tetrominoes[this.nextTetromino][0].length; i++) 
			{
				for (var j: number = 0; j < this.tetrominoes[this.nextTetromino][0][i].length; j++) 
				{
					if (this.tetrominoes[this.nextTetromino][0][i][j] == 1) 
					{
						next_t.graphics.beginFill(this.colors[this.nextTetromino]);
						next_t.graphics.drawRect(this.TS * j, this.TS * i, this.TS, this.TS);
						next_t.graphics.endFill();
					}
				}
			}
		}
		
		private onTime(event:TimerEvent):void			// опускаем тетрамино вниз по таймеру
		{
			/**/ event = strict(event, TimerEvent);
			if (this.canFit(this.tRow + 1, this.tCol, this.currentRotation)) 
			{
				this.tRow++;
				this.placeTetromino();
			} 
			
			else 
			{
				this.landTetromino();
				this.generateTetromino();
			}
		}
		
		private drawTetromino():void					// рисуем тетромино
		{
			var ct: number = this.currentTetromino;	// укорачиваем имя currentTetromino до ct
			this.tetromino = new Sprite;				// создаем объект тетромино
			this.fieldSprite.addChild(this.tetromino);				// добавляем на экран
			this.tetromino.graphics.lineStyle(0, 0x000000);
			
			// ищем один-й jэлемент в i-ой строке currentRotation-го вращения ct-те тетромино. Если он равен 1, мы должны нарисовать тетромино
			for (var i: number = 0; i < this.tetrominoes[ct][this.currentRotation].length; i++) 
			{
				for (var j: number = 0; j < this.tetrominoes[ct][this.currentRotation][i].length; j++) 
				{
					if (this.tetrominoes[ct][this.currentRotation][i][j]==1) 
					{
						this.tetromino.graphics.beginFill(this.colors[ct]);
						this.tetromino.graphics.drawRect(this.TS * j, this.TS * i, this.TS, this.TS);
						this.tetromino.graphics.endFill();
					}
				}
			}
			this.placeTetromino();					// помещаем тетромино в правильном месте в соответствии с tCol и tRow значениями
		}
		
		private placeTetromino():void	// помещаем тетромино в правильном месте в соответствии с tCol и tRow значениями
		{
			this.tetromino.x = this.tCol * this.TS;
			this.tetromino.y = this.tRow * this.TS;
		}
		
		private initTetrominoes():void	// инициализируем массивы, связанные с тетромино
		{
			// I
			this.tetrominoes[0]=[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]];
			this.colors[0]=0x00FFFF;					// цвет тетромино
			
			// T
			this.tetrominoes[1]=[[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],[[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]];
			this.colors[1]=0xAA00FF;
			
			// L
			this.tetrominoes[2]=[[[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],[[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]];
			this.colors[2]=0xFFA500;
			
			// J
			this.tetrominoes[3]=[[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],[[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]];
			this.colors[3]=0x0000FF;
			
			// Z
			this.tetrominoes[4]=[[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],[[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]];
			this.colors[4]=0xFF0000;
			
			// S
			this.tetrominoes[5]=[[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]]];
			this.colors[5]=0x00FF00;
			
			// O
			this.tetrominoes[6]=[[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]];
			this.colors[6]=0xFFFF00;
			
		}
		
		private generateBackground():void	// функция отрисовки bg
		{
			var pic: Bitmap = as(new this.Picture() , Bitmap);
			pic.x = ((this.WIDTH / 2) - (2560 / 2));		// 2560 - магические пиксели размера картинки
			pic.y = ((this.HEIGHT / 2) - (1600 / 2));
			this.addChild(pic);
		}
		
		private generateField():void	// функция отрисовки поля
		{
			var colors: any[] = new Array("0x444444", "0x555555");
			this.fieldArray = new Array;
			this.fieldSprite = new Sprite;
			this.addChild(this.fieldSprite);				// создаем объекты массивов и добавляем на сцену
			this.fieldSprite.x = ((this.WIDTH / 2) - (5 * this.TS));
			this.fieldSprite.y = ((this.HEIGHT / 2) - (10 * this.TS));
			this.fieldSprite.graphics.lineStyle(0, 0x000000);	// задаем стиль линии: 0 - толщина линии в пикселях, 0x000000 - черный цвет
			for (var i: number = 0; i < 20; i++)	// поле игры 20х10 сделать константами! 
			{
				this.fieldArray[i] = new Array;
				for (var j: number = 0; j < 10; j++) 	// двумя циклами рисуем 20х10 прямоугольников на игровом поле
				{
					this.fieldArray[i][j] = 0;
					
					// мы рисуем квадрат с TS-пиксельной стороной для каждого для итерации цикла
					this.fieldSprite.graphics.beginFill(colors [(j % 2 + i % 2) % 2]); // цвет заливки прямоугольников
					this.fieldSprite.graphics.drawRect(this.TS * j, this.TS * i, this.TS, this.TS);  // (fieldSprite, который в первой итерации циклов находится в координатах 0,0), ширина и высота прямоугольника.
					this.fieldSprite.graphics.endFill();			// применяем заливку ко всему, что вы нарисовали после вызова beginFill
				}
			}
		}
		
		private generateInterface():void
		{
			this.interfaceSprite = new Sprite;
			this.addChild(this.interfaceSprite);				// добавляем на сцену спрайт интерфейса
			this.interfaceSprite.x = ((this.WIDTH / 2) - (5 * this.TS));
			this.interfaceSprite.y = ((this.HEIGHT / 2) - (10 * this.TS));
			
			// кнопка старт
			this.startSprite = new Sprite;
			this.interfaceSprite.addChild(this.startSprite);
			var start: Bitmap = as(new this.pictureStart() , Bitmap);	
			start.x = 280;
			start.y = 200;
			this.startSprite.addChild(start);
			this.startSprite.addEventListener(MouseEvent.CLICK, this.onStart.__bind(this));
			
			// кнопка пауза
			this.pauseSprite = new Sprite;
			this.interfaceSprite.addChild(this.pauseSprite);
			//var pause: Bitmap = new picturePause() as Bitmap;	
			this.pause.x = 280;
			this.pause.y = 300;
			this.pauseSprite.addChild(this.pause);
			this.pauseSprite.addEventListener(MouseEvent.CLICK, this.onPause.__bind(this)); // слушатель кнопки пауза
			
			// кнопка переиграть
			this.replaySprite = new Sprite;
			this.interfaceSprite.addChild(this.replaySprite);
			var replay: Bitmap = as(new this.pictureReplay() , Bitmap);	
			replay.x = 280;
			replay.y = 400;
			this.replaySprite.addChild(replay);
			this.replaySprite.addEventListener(MouseEvent.CLICK, this.onReplay.__bind(this));
			
			var formatNext: TextFormat = new TextFormat();
			formatNext.font = "Consolas";
			formatNext.size = 40;
			formatNext.color = 0x000000;
			
			var txtNext: TextField = new TextField();
			this.fieldSprite.addChild(txtNext);
			txtNext.text = "NEXT";
			txtNext.x = 270;
			txtNext.y = 10;
			txtNext.width = 800;
			txtNext.height = 100;
			
			txtNext.setTextFormat(formatNext);
		}
		
		protected onStart(event:MouseEvent):void	// обработчик событий кнопки старт
		{
			/**/ event = strict(event, MouseEvent);
			if (this.gamePause)									// если до этого игра была на паузе
			{
				this.gamePause = false;							// снимаем паузу
				this.fieldSprite.removeChild(this.txtPause);
				this.timeCount.start();
			}
		}
		
		protected onPause(event:MouseEvent):void	// обработчик событий кнопки пауза		
		{
			/**/ event = strict(event, MouseEvent);
			if (! this.gameOver)
			{
				this.gamePause = true;							// ставим игру на паузу
				
				this.timeCount.stop();
				
				this.fieldSprite.addChild(this.txtPause);
				this.txtPause.background = true;
				this.txtPause.backgroundColor = 0x222222;
				this.txtPause.text = "PAUSE";
				this.txtPause.autoSize = TextFieldAutoSize.CENTER;
				this.txtPause.x = 0;
				this.txtPause.y = 200;
				this.txtPause.width = 240;
				this.txtPause.height = 61;
				
				this.setFormatGameMessage();							// ф-ция задания стиля игровым сообщениям
				this.txtPause.setTextFormat(this.formatGameMessage);
			}
		}
		
		protected onReplay(event:MouseEvent):void	// обработчик событий кнопки переиграть
		{
			/**/ event = strict(event, MouseEvent);
			this.gameOver = false;
			this.timeCount.stop();
			this.fieldSprite.removeChild(this.fieldSprite.getChildByName("next"));
			this.generateField();
			this.generateTetromino();						// генерируем случайное тетромино на поле
			this.timeCount.start();
			this.fieldSprite.addEventListener(MouseEvent.CLICK, this.onMouseClick.__bind(this));
		}
		
		private setFormatGameMessage():void		// задаем стиль игровым сообщениям
		{
			this.formatGameMessage.font = "Consolas";
			this.formatGameMessage.size = 48;
			this.formatGameMessage.color = 0xffffff;
		}
		
		private drawGameOver():void				// функция отрисовки сообщения о завершении игры
		{
			this.setFormatGameMessage();							// ф-ция задания стиля игровым сообщениям
			var txtGameOver: TextField = new TextField();
			this.fieldSprite.addChild(txtGameOver);
			txtGameOver.background = true;
			txtGameOver.backgroundColor = 0x222222;
			txtGameOver.text = "GAME OVER";
			txtGameOver.x = 0;
			txtGameOver.y = 200;
			txtGameOver.width = 240;
			txtGameOver.height = 61;
			
			txtGameOver.setTextFormat(this.formatGameMessage);
		}	
	}
}