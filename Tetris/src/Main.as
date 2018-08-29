package {
	import flash.display.Bitmap;
	import flash.display.BlendMode;
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;
	import flash.utils.*;
	import flash.utils.Timer;
	
	//import flashx.textLayout.formats.TextAlign;
	
	public class Main extends Sprite 
	{
		[Embed(source="img/tetris.jpg")] private const Picture: Class;
		[Embed(source="img/start.png")] private const pictureStart: Class;
		[Embed(source="img/pause.png")] private const picturePause: Class;
		[Embed(source="img/replay.png")] private const pictureReplay: Class;
		private var baseWidth:Number = 800;
		private var baseHeight:Number = 600;
		private var WIDTH: int = stage.stageWidth;		// ширина сцены
		private var HEIGHT: int = stage.stageHeight;	// высота сцены
		private const TS: uint = 24;					// высота и ширина ячейки поля в пикселях
		private var fieldArray: Array;					// массив, который будет численно представлять игровое поле
		private var commonSprite: Sprite;
		private var bgSprite: Sprite;
		private var fieldSprite: Sprite;				// DisplayObject, который графически отобразит игровое поле
		private var interfaceSprite: Sprite;			// спрайт для интерфейсных кнопок
		private var startSprite: Sprite;				// спрайт кнопки start
		private var pauseSprite: Sprite;				// спрайт кнопки pause
		private var replaySprite: Sprite;				// спрайт кнопки replay
		private var txtPause: TextField = new TextField();
		private var formatGameMessage: TextFormat = new TextFormat();
		private var tetrominoes: Array = new Array();  	// четырехмерный массив, содержащий всю информацию о тетромино
		private var colors: Array = new Array();  		// цвета тетромино
		private var tetromino: Sprite;					// DisplayObject тетромино
		private var currentTetromino: uint;				// число тетромино в игре (от 0 до 6)
		private var nextTetromino: uint;				// какое тетромино будет следующим
		private var currentRotation: uint;				// вращение тетромино (от 0 до 3)
		private var tRow: int;							// вертикальное положение тетромино
		private var tCol: int;							// горизонтальное положение тетромино
		private var timeCount: Timer = new Timer(500);	// будет запускать слушатель событий каждые 500 миллисекунд
		private var gameOver: Boolean = false;			// игра окончена или нет
		private var gamePause: Boolean = false;			// игра на паузе или нет
		
		private var upMouseX: Number;				// координаты нажатия мыши
		private var upMouseY: Number;				// координаты нажатия мыши
		private var downMouseX: Number;					// координаты отжатия мыши
		private var downMouseY: Number;					// координаты отжатия мыши

		public function Main() 
		{
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			bgSprite = new Sprite();
			addChild(bgSprite);
			commonSprite = new Sprite();
			addChild(commonSprite);
			stage.addEventListener(Event.RESIZE, onResize);
			generateBackground();						// рисуем bg
			generateField();   							// рисуем поле
			generateInterface();						// рисуем интерфейс
			initTetrominoes();							// инициализируем массивы, связанные с тетромино
			nextTetromino = Math.floor(Math.random() * 7); // генерируем следующее тетромино
			generateTetromino();						// генерируем случайное тетромино на поле
			stage.addEventListener(KeyboardEvent.KEY_DOWN, onKDown);	// слушатель клавиатуры
			fieldSprite.addEventListener(MouseEvent.MOUSE_UP, onMouseUp);		// слушатель мышки
			fieldSprite.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
		}
		
		protected function onResize(event:Event):void
		{
			var realWidth:Number = stage.stageWidth;
			var realHeight:Number = stage.stageHeight;
			var sx:Number = realWidth / this.baseWidth;
			var sy:Number = realHeight / this.baseHeight;
			trace("resize");
			
			if (baseWidth / baseHeight >= realWidth / realHeight)
			{//landscape
				commonSprite.scaleX = commonSprite.scaleY = sx;
				bgSprite.scaleX = sx;
				bgSprite.scaleY = sy;
				commonSprite.x = Math.floor((realWidth - this.baseWidth * sx) / 2);
				commonSprite.y = Math.floor((realHeight - this.baseHeight * sx) / 2);
			}
			else 
			{//portrait
				commonSprite.scaleX = commonSprite.scaleY = sy;
				bgSprite.scaleX = sx;
				bgSprite.scaleY = sy;
				commonSprite.x = Math.floor((realWidth - this.baseWidth * sy) / 2);
				commonSprite.y = Math.floor((realHeight - this.baseHeight * sy) / 2);
			}
		}
		
		protected function onMouseUp(event:MouseEvent):void
		{
			if(gameOver) return;
			
				upMouseX = event.localX;
				upMouseY = event.localY;				// запомнили координаты отжатия мышки
				
				if((upMouseX - downMouseX) >= 10)		// двигаемся вправо
				{
					if (canFit(tRow, tCol + 1, currentRotation)) 
					{
						tCol++;
						placeTetromino();
						trace("tCol++");
						return;
					}
				}
				
				if((upMouseX - downMouseX) <= (-10))	// двигаемся влево
				{
					if (canFit(tRow, tCol - 1, currentRotation))	// проверяем, может ли тетромино поместиться в заданное положение или нет 
					{
						tCol--;
						placeTetromino();
						trace("tCol--");
						return;
					}
				}
			
				if((upMouseY - downMouseY) >= 10)		// двигаемся вниз
				{
					if (canFit(tRow + 1, tCol, currentRotation)) 
					{
						tRow++;
						placeTetromino();
						return;
					}	
				}
				
				
					var ct: uint = currentRotation;
					var rot: uint = (ct + 1) % tetrominoes[currentTetromino].length;	// вращение тетромино
					
					// проверяем текущую позицию при вращении, нарушает ли она границы
					if (canFit(tRow, tCol, rot)) 
					{
						currentRotation = rot;		// если все ок, принимает текущее вращение
						fieldSprite.removeChild(tetromino);		// текущее тетромино удаляем
						drawTetromino();			// рисуем тетромино в новом вращении, которое приняли
						placeTetromino();			// размещаем его на сцене
					}
				
			
		}
		
		protected function onMouseDown(event:MouseEvent):void
		{
			downMouseX = event.localX;
			downMouseY = event.localY;				// запомнили координаты нажатия мышки
		}

		private function onKDown(event:KeyboardEvent):void
		{
			if(! gameOver)
			{
				switch (event.keyCode) 
				{
					case 37 :
						if (canFit(tRow, tCol - 1, currentRotation))	// проверяем, может ли тетромино поместиться в заданное положение или нет 
						{
							tCol--;
							placeTetromino();
						}
						break;
					case 38 :
						var ct: uint = currentRotation;
						var rot: uint = (ct + 1) % tetrominoes[currentTetromino].length;	// вращение тетромино
						
						// проверяем текущую позицию при вращении, нарушает ли она границы
						if (canFit(tRow, tCol, rot)) 
						{
							currentRotation = rot;		// если все ок, принимает текущее вращение
							fieldSprite.removeChild(tetromino);		// текущее тетромино удаляем
							drawTetromino();			// рисуем тетромино в новом вращении, которое приняли
							placeTetromino();			// размещаем его на сцене
						}
						break;
					case 39 :
						if (canFit(tRow, tCol + 1, currentRotation)) 
						{
							tCol++;
							placeTetromino();
						}
						break;
					case 40 :
						if (canFit(tRow + 1, tCol, currentRotation)) 
						{
							tRow++;
							placeTetromino();
						}
						else						// если вниз больше двигаться некуда 
						{
							landTetromino();		// считаем тетромино посаженным
							generateTetromino();	// генерируем новый тетромино
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
		
		private function landTetromino():void		// когда тетромино садится на свое место, по сути перерисовываем его
		{
			var ct: uint = currentTetromino;
			var landed: Sprite;
			
			// циклами ищем частички тетромино (каждую из четырех)
			for (var i: int = 0; i < tetrominoes[ct][currentRotation].length; i++) 
			{
				for (var j: int = 0; j < tetrominoes[ct][currentRotation][i].length; j++) 
				{
					if (tetrominoes[ct][currentRotation][i][j] == 1)		// если нашли, то рисуем ее 
					{
						landed = new Sprite;
						fieldSprite.addChild(landed);
						landed.graphics.lineStyle(0, 0x000000);
						landed.graphics.beginFill(colors[currentTetromino]);
						landed.graphics.drawRect(TS * (tCol + j), TS * (tRow + i), TS, TS);
						landed.graphics.endFill();
						landed.name = "r" + (tRow + i) + "c" + (tCol + j);		// имя части посаженого тетромино(часть в пятом столбце третьей строки будет r3c5)
						fieldArray[tRow + i][tCol + j] = 1;					// рисуем квадрат, где лежит тетромино
					}
				}	
			}
			fieldSprite.removeChild(tetromino);				// обновляем массив
			timeCount.removeEventListener(TimerEvent.TIMER, onTime);
			timeCount.stop();
			checkForLines();					// проверяем завершенные линии
		}
		
		private function checkForLines():void
		{
			for (var i: int = 0; i < 20; i++)					// перебираем все строки игрового поля 
			{
				if (fieldArray[i].indexOf(0) == -1)				// завершенная строка должна быть полностью заполнена кусками тетромино, массив должен быть заполнен на 1, то есть не может быть никакого 0. 
				{
					for (var j: int = 0; j < 10; j++) 			// если строка завершена, перебираем все ее десять столбцов, чтобы удалить
					{
						fieldArray[i][j] = 0;					// очищаем ячейки 
						fieldSprite.removeChild(fieldSprite.getChildByName("r" + i + "c" + j));	// удаляем соответствующий DisplayObject, определяем его по названию.
					}
					
					// ищем все строки, выше удаленной строки i. Сместим их на одну вниз
					for (j = i; j >= 0; j--) 
					{
						for (var k: int = 0; k < 10; k++) 
						{
							if (fieldArray[j][k] == 1)			// есть ли тетрамино в k-м столбце первой j строки
							{
								fieldArray[j][k] = 0;			// устанавливаем k-й столбец j-й строки в 0
								fieldArray[j+1][k] = 1;			// устанавливаем k-й столбец (j+1)-й строки в 1. Таким образом мы перемещаемся по всей строке
								fieldSprite.getChildByName("r" + j + "c" + k).y += TS;						// перемещаем соответствующий DisplayObject по TS ячейкам поля
								fieldSprite.getChildByName("r" + j + "c" + k).name = "r" + (j + 1) + "c" + k;	// изменяем соответствующее имя DisplayObject в соответствии с его новой позицией
							}
						}
					}
				}
			}
		}
		
		private function canFit(row:int, col:int, side:uint):Boolean	// может ли тетромино поместиться в новом положении
		{
			var ct: uint = currentTetromino;
			
			// циклами проверяем текущее положение тетромино
			for (var i: int = 0; i < tetrominoes[ct][side].length; i++) 
			{
				for (var j: int = 0; j < tetrominoes[ct][side][i].length; j++) 
				{
					// проверка того, чтобы тетромино было полностью внутри игрового поля
					if (tetrominoes[ct][side][i][j] == 1) 
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
						if (fieldArray[row + i][col + j] == 1) 
						{
							return false;
						}
					}
				}
			}
			return true;
		}
		
		// когда пришло время генерировать текущее тетромино, присваиваем ему значение следующего и создаем следующее случайное тетромино
		private function generateTetromino():void				// генерируем случайное тетромино на поле
		{
			if (! gameOver)
			{
				currentTetromino = nextTetromino;
				nextTetromino = Math.floor(Math.random() * 7);
				drawNext();
				//currentTetromino = Math.floor(Math.random() * 7);  	// генерируем случайное целое число от 0 до 6 (возможные тетромино)
				currentRotation = 0;	// начальное вращение
				tRow = 0;				// начальный ряд
				
				if (tetrominoes[currentTetromino][0][0].indexOf(1) == -1) 
				{
					tRow = -1;
				}
				
				tCol = 3;				// всегда 3, потому что тетромино включены в массив из 4 элементов, поэтому, чтобы центрировать его в поле шириной 10 колонок, его начало должно быть в (10-4) / 2 = 3
				drawTetromino();		// рисуем тетромино
				
				if (canFit(tRow, tCol, currentRotation)) 
				{
					timeCount.addEventListener(TimerEvent.TIMER, onTime);
					timeCount.start();
				}
				else
				{
					gameOver=true;
					drawGameOver();
				}
			}
		}
		
		private function drawNext():void			// рисуем следующее тетромино таким же образом, как drawTetromino
		{
			if (fieldSprite.getChildByName("next") != null) 
			{
				fieldSprite.removeChild(fieldSprite.getChildByName("next"));
			}
			
			var next_t: Sprite = new Sprite;
			next_t.x = 270;
			next_t.y = 70;
			next_t.name = "next";
			fieldSprite.addChild(next_t);
			next_t.graphics.lineStyle(0, 0x000000);
			
			for (var i: int = 0; i < tetrominoes[nextTetromino][0].length; i++) 
			{
				for (var j: int = 0; j < tetrominoes[nextTetromino][0][i].length; j++) 
				{
					if (tetrominoes[nextTetromino][0][i][j] == 1) 
					{
						next_t.graphics.beginFill(colors[nextTetromino]);
						next_t.graphics.drawRect(TS * j, TS * i, TS, TS);
						next_t.graphics.endFill();
					}
				}
			}
		}
		
		private function onTime(event:TimerEvent):void			// опускаем тетрамино вниз по таймеру
		{
			if (canFit(tRow + 1, tCol, currentRotation)) 
			{
				tRow++;
				placeTetromino();
			} 
			
			else 
			{
				landTetromino();
				generateTetromino();
			}
		}
		
		private function drawTetromino():void					// рисуем тетромино
		{
			var ct: uint = currentTetromino;	// укорачиваем имя currentTetromino до ct
			tetromino = new Sprite();				// создаем объект тетромино
			fieldSprite.addChild(tetromino);				// добавляем на экран
			tetromino.graphics.lineStyle(0, 0x000000);
			
			// ищем один-й jэлемент в i-ой строке currentRotation-го вращения ct-те тетромино. Если он равен 1, мы должны нарисовать тетромино
			for (var i: int = 0; i < tetrominoes[ct][currentRotation].length; i++) 
			{
				for (var j: int = 0; j < tetrominoes[ct][currentRotation][i].length; j++) 
				{
					if (tetrominoes[ct][currentRotation][i][j]==1) 
					{
						tetromino.graphics.beginFill(colors[ct]);
						tetromino.graphics.drawRect(TS * j, TS * i, TS, TS);
						tetromino.graphics.endFill();
					}
				}
			}
			placeTetromino();					// помещаем тетромино в правильном месте в соответствии с tCol и tRow значениями
		}
		
		private function placeTetromino():void	// помещаем тетромино в правильном месте в соответствии с tCol и tRow значениями
		{
			tetromino.x = tCol * TS;
			tetromino.y = tRow * TS;
		}
		
		private function initTetrominoes():void	// инициализируем массивы, связанные с тетромино
		{
			// I
			tetrominoes[0]=[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]];
			colors[0]=0x00FFFF;					// цвет тетромино
			
			// T
			tetrominoes[1]=[[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],[[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]];
			colors[1]=0xAA00FF;
			
			// L
			tetrominoes[2]=[[[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],[[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]];
			colors[2]=0xFFA500;
			
			// J
			tetrominoes[3]=[[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],[[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]];
			colors[3]=0x0000FF;
			
			// Z
			tetrominoes[4]=[[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],[[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]];
			colors[4]=0xFF0000;
			
			// S
			tetrominoes[5]=[[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]]];
			colors[5]=0x00FF00;
			
			// O
			tetrominoes[6]=[[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]];
			colors[6]=0xFFFF00;
			
		}
		
		private function generateBackground():void	// функция отрисовки bg
		{
			var pic: Bitmap = new Picture() as Bitmap;
			pic.x = ((WIDTH / 2) - (pic.width / 2));		// 2560 - магические пиксели размера картинки
			pic.y = ((HEIGHT / 2) - (pic.height / 2));
			bgSprite.addChild(pic);
		}
		
		private function generateField():void	// функция отрисовки поля
		{
			var colors: Array = new Array("0x444444", "0x555555");
			fieldArray = new Array();
			fieldSprite = new Sprite();
			commonSprite.addChild(fieldSprite);				// создаем объекты массивов и добавляем на сцену
			fieldSprite.x = ((WIDTH / 2) - (5 * TS));
			fieldSprite.y = ((HEIGHT / 2) - (10 * TS));
			fieldSprite.graphics.lineStyle(0, 0x000000);	// задаем стиль линии: 0 - толщина линии в пикселях, 0x000000 - черный цвет
			for (var i: uint = 0; i < 20; i++)	// поле игры 20х10 сделать константами! 
			{
				fieldArray[i] = new Array;
				for (var j: uint = 0; j < 10; j++) 	// двумя циклами рисуем 20х10 прямоугольников на игровом поле
				{
					fieldArray[i][j] = 0;
					
					// мы рисуем квадрат с TS-пиксельной стороной для каждого для итерации цикла
					fieldSprite.graphics.beginFill(colors [(j % 2 + i % 2) % 2]); // цвет заливки прямоугольников
					fieldSprite.graphics.drawRect(TS * j, TS * i, TS, TS);  // (fieldSprite, который в первой итерации циклов находится в координатах 0,0), ширина и высота прямоугольника.
					fieldSprite.graphics.endFill();			// применяем заливку ко всему, что вы нарисовали после вызова beginFill
				}
			}
		}
		
		private function generateInterface():void
		{
			interfaceSprite = new Sprite;
			commonSprite.addChild(interfaceSprite);				// добавляем на сцену спрайт интерфейса
			interfaceSprite.x = ((WIDTH / 2) - (5 * TS));
			interfaceSprite.y = ((HEIGHT / 2) - (10 * TS));
			
			// кнопка старт
			startSprite = new Sprite;
			interfaceSprite.addChild(startSprite);
			var start: Bitmap = new pictureStart() as Bitmap;	
			start.x = 280;
			start.y = 200;
			startSprite.addChild(start);
			startSprite.addEventListener(MouseEvent.CLICK, onStart);
			
			// кнопка пауза
			pauseSprite = new Sprite;
			interfaceSprite.addChild(pauseSprite);
			var pause: Bitmap = new picturePause() as Bitmap;	
			pause.x = 280;
			pause.y = 300;
			pauseSprite.addChild(pause);
			pauseSprite.addEventListener(MouseEvent.CLICK, onPause); // слушатель кнопки пауза
			
			// кнопка переиграть
			replaySprite = new Sprite;
			interfaceSprite.addChild(replaySprite);
			var replay: Bitmap = new pictureReplay() as Bitmap;	
			replay.x = 280;
			replay.y = 400;
			replaySprite.addChild(replay);
			replaySprite.addEventListener(MouseEvent.CLICK, onReplay);
			
			var formatNext: TextFormat = new TextFormat();
			formatNext.font = "Consolas";
			formatNext.size = 40;
			formatNext.color = 0x000000;
			
			var txtNext: TextField = new TextField();
			fieldSprite.addChild(txtNext);
			txtNext.text = "NEXT";
			txtNext.x = 270;
			txtNext.y = 10;
			txtNext.width = 800;
			txtNext.height = 100;
			
			txtNext.setTextFormat(formatNext);
		}
		
		protected function onStart(event:MouseEvent):void	// обработчик событий кнопки старт
		{
			if (gamePause)									// если до этого игра была на паузе
			{
				gamePause = false;							// снимаем паузу
				fieldSprite.removeChild(txtPause);
				timeCount.start();
			}
		}
		
		protected function onPause(event:MouseEvent):void	// обработчик событий кнопки пауза		
		{
			if (! gameOver)
			{
				gamePause = true;							// ставим игру на паузу
				
				timeCount.stop();
				
				fieldSprite.addChild(txtPause);
				txtPause.background = true;
				txtPause.backgroundColor = 0x222222;
				txtPause.text = "PAUSE";
				txtPause.autoSize = TextFieldAutoSize.CENTER;
				txtPause.x = 0;
				txtPause.y = 200;
				txtPause.width = 240;
				txtPause.height = 61;
				
				setFormatGameMessage();							// ф-ция задания стиля игровым сообщениям
				txtPause.setTextFormat(formatGameMessage);
			}
		}
		
		protected function onReplay(event:MouseEvent):void	// обработчик событий кнопки переиграть
		{
			gameOver = false;
			timeCount.stop();
			fieldSprite.removeChild(fieldSprite.getChildByName("next"));
			generateField();
			generateTetromino();						// генерируем случайное тетромино на поле
			timeCount.start();
			fieldSprite.addEventListener(MouseEvent.MOUSE_UP, onMouseUp);		// слушатель мышки
			fieldSprite.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
		}
		
		private function setFormatGameMessage():void		// задаем стиль игровым сообщениям
		{
			formatGameMessage.font = "Consolas";
			formatGameMessage.size = 48;
			formatGameMessage.color = 0xffffff;
		}
		
		private function drawGameOver():void				// функция отрисовки сообщения о завершении игры
		{
			setFormatGameMessage();							// ф-ция задания стиля игровым сообщениям
			var txtGameOver: TextField = new TextField();
			fieldSprite.addChild(txtGameOver);
			txtGameOver.background = true;
			txtGameOver.backgroundColor = 0x222222;
			txtGameOver.text = "GAME OVER";
			txtGameOver.x = 0;
			txtGameOver.y = 200;
			txtGameOver.width = 240;
			txtGameOver.height = 61;
			
			txtGameOver.setTextFormat(formatGameMessage);
		}	
	}
}