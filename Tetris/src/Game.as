package
{
	import flash.display.Bitmap;
	import flash.display.BlendMode;
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	import flash.display.Stage;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.sensors.Accelerometer;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;
	import flash.utils.*;
	import flash.utils.Timer;
	

	
	public class Game extends Sprite 
	{
		[Embed(source="img/tetris.jpg")] private const Picture: Class;
		 
		public var baseWidth:Number = 800;
		public var baseHeight:Number = 600;
		public var gamefield: Field;			// игровое поле
		public var gameInterface: Interface;
		public var timeCount: Timer; 			// будет запускать слушатель событий каждые 500 миллисекунд
		public var gameOver: Boolean;			// игра окончена или нет
		public var gamePause: Boolean;			// игра на паузе или нет
		public var commonSprite: Sprite;
		public var bgSprite: Sprite;
		public var fieldSprite: Sprite;			// DisplayObject, который графически отобразит игровое поле
		public var interfaceSprite: Sprite;		// спрайт для интерфейсных кнопок
		
		public function Game()
		{
			timeCount = new Timer(500);
			gameOver  = false;
			gamePause = false;
			
			commonSprite = new Sprite();
			bgSprite = new Sprite();
			
			this.addChild(bgSprite);
			this.addChild(commonSprite);
		}
		
		public function generateBackground():void	// функция отрисовки bg
		{
			var pic: Bitmap = new Picture() as Bitmap;
			pic.x = ((Main.WIDTH / 2) - (pic.width / 2));
			pic.y = ((Main.HEIGHT / 2) - (pic.height / 2));
			bgSprite.addChild(pic);
		}
		
		public function generateField():void		// функция отрисовки поля
		{
			fieldSprite = new Sprite();
			gamefield = new Field();
			commonSprite.addChild(fieldSprite);		// создаем объекты массивов и добавляем на сцену
			fieldSprite.addChild(gamefield);
			fieldSprite.x = ((Main.WIDTH / 2)  - ((gamefield.fieldWidth / 2) * Main.TS));
			fieldSprite.y = ((Main.HEIGHT / 2) - ((gamefield.fieldHeight / 2) * Main.TS));
		}
		
		public function generateInterface():void
		{
			interfaceSprite = new Sprite();
			gameInterface = new Interface();
			commonSprite.addChild(interfaceSprite);	// добавляем на сцену спрайт интерфейса
			interfaceSprite.addChild(gameInterface);
			interfaceSprite.x = ((Main.WIDTH / 2)  - ((gamefield.fieldWidth / 2) * Main.TS));
			interfaceSprite.y = ((Main.HEIGHT / 2) - ((gamefield.fieldHeight / 2) * Main.TS));
		}
		
		// когда пришло время генерировать текущее тетромино, присваиваем ему значение следующего и создаем следующее случайное тетромино
		public function generateTetromino():void			// генерируем случайное тетромино на поле
		{
			if (!gameOver)
			{
				Main.currentTetromino = Main.nextTetromino;
				Main.nextTetromino = Math.floor(Math.random() * 7);
				drawNext();
				Main.currentRotation = 0;					// начальное вращение
				Main.tRow = 0;								// начальный ряд
				
				if (Main.tetromino.tetrominoes[Main.currentTetromino][0][0].indexOf(1) == -1) 
				{
					Main.tRow = -1;
				}
				
				Main.tCol = (gamefield.fieldWidth - 4) / 2;	// 3, потому что тетромино включены в массив из 4 элементов, поэтому, чтобы центрировать его в поле шириной fieldWidth колонок, его начало должно быть в (fieldWidth-4) / 2 = 3
				drawTetromino();							// рисуем тетромино
				
				if (canFit(Main.tRow, Main.tCol, Main.currentRotation)) 
				{
					timeCount.addEventListener(TimerEvent.TIMER, Main.mainGame.onTime);
					timeCount.start();
				}
				else
				{
					gameOver=true;
					gameInterface.drawGameOver();
				}
			}
		}
		
		public function drawTetromino():void				// рисуем тетромино
		{
			var ct: uint = Main.currentTetromino;			// укорачиваем имя currentTetromino до ct
			
			Main.tetrominoSprite = new Sprite();			// создаем объект тетромино
			fieldSprite.addChild(Main.tetrominoSprite);		// добавляем на экран
			Main.tetromino.drawElementTetromino(Main.tetromino, Main.tetrominoSprite, ct, Main.currentRotation);
			placeTetromino();								// помещаем тетромино в правильном месте в соответствии с tCol и tRow значениями
		}
		
		public function drawNext():void						// рисуем следующее тетромино таким же образом, как drawTetromino
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
			Main.tetromino.drawElementTetromino(Main.tetromino, next_t, Main.nextTetromino, 0);
		}
		
		public function onTime(event:TimerEvent):void		// опускаем тетрамино вниз по таймеру
		{
			if (canFit(Main.tRow + 1, Main.tCol, Main.currentRotation)) 
			{
				Main.tRow++;
				placeTetromino();
			} 
				
			else 
			{
				landTetromino();
				generateTetromino();
			}
		}
		
		public function onResize(event:Event):void
		{
			var realWidth:Number = stage.stageWidth;
			var realHeight:Number = stage.stageHeight;
			var sx:Number = realWidth / this.baseWidth;
			var sy:Number = realHeight / this.baseHeight;
			
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
		
		public function canFit(row:int, col:int, side:uint):Boolean	// может ли тетромино поместиться в новом положении
		{
			var ct: uint = Main.currentTetromino;
			
			// циклами проверяем текущее положение тетромино
			for (var i: int = 0; i < Main.tetromino.tetrominoes[ct][side].length; i++) 
			{
				for (var j: int = 0; j < Main.tetromino.tetrominoes[ct][side][i].length; j++) 
				{
					// проверка того, чтобы тетромино было полностью внутри игрового поля
					if (Main.tetromino.tetrominoes[ct][side][i][j] == 1) 
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
						// если на этом месте уже есть другое тетромино
						if (gamefield.fieldArray[row + i][col + j] == 1) 
						{
							return false;
						}
					}
				}
			}
			return true;
		}
		
		
		
		public function placeTetromino():void		// помещаем тетромино в правильном месте в соответствии с tCol и tRow значениями
		{
			Main.tetrominoSprite.x = Main.tCol * Main.TS;
			Main.tetrominoSprite.y = Main.tRow * Main.TS;
		}
		
		public function landTetromino():void		// когда тетромино садится на свое место, по сути перерисовываем его
		{
			var ct: uint = Main.currentTetromino;
			var landed: Sprite;
			
			// циклами ищем частички тетромино (каждую из четырех)
			for (var i: int = 0; i < Main.tetromino.tetrominoes[ct][Main.currentRotation].length; i++) 
			{
				for (var j: int = 0; j < Main.tetromino.tetrominoes[ct][Main.currentRotation][i].length; j++) 
				{
					if (Main.tetromino.tetrominoes[ct][Main.currentRotation][i][j] == 1)	// если нашли, то рисуем ее 
					{
						landed = new Sprite;
						fieldSprite.addChild(landed);
						landed.graphics.lineStyle(0, 0x000000);
						landed.graphics.beginFill(Main.tetromino.colors[Main.currentTetromino]);
						landed.graphics.drawRect(Main.TS * (Main.tCol + j), Main.TS * (Main.tRow + i), Main.TS, Main.TS);
						landed.graphics.endFill();
						landed.name = "r" + (Main.tRow + i) + "c" + (Main.tCol + j);		// имя части посаженого тетромино(часть в пятом столбце третьей строки будет r3c5)
						gamefield.fieldArray[Main.tRow + i][Main.tCol + j] = 1;				// рисуем квадрат, где лежит тетромино
					}
				}	
			}
			fieldSprite.removeChild(Main.tetrominoSprite);		// обновляем массив
			timeCount.removeEventListener(TimerEvent.TIMER, onTime);
			timeCount.stop();
			checkForLines();									// проверяем завершенные линии
		}
		
		public function checkForLines():void
		{
			for (var i: int = 0; i < gamefield.fieldHeight; i++)					// перебираем все строки игрового поля 
			{
				if (gamefield.fieldArray[i].indexOf(0) == -1)	// завершенная строка должна быть полностью заполнена кусками тетромино, массив должен быть заполнен на 1, то есть не может быть никакого 0. 
				{
					for (var j: int = 0; j < gamefield.fieldWidth; j++) 			// если строка завершена, перебираем все ее десять столбцов, чтобы удалить
					{
						gamefield.fieldArray[i][j] = 0;			// очищаем ячейки 
						fieldSprite.removeChild(Main.mainGame.fieldSprite.getChildByName("r" + i + "c" + j));	// удаляем соответствующий DisplayObject, определяем его по названию.
					}
					
					// ищем все строки, выше удаленной строки i. Сместим их на одну вниз
					for (j = i; j >= 0; j--) 
					{
						for (var k: int = 0; k < gamefield.fieldWidth; k++) 
						{
							if (gamefield.fieldArray[j][k] == 1)	// есть ли тетрамино в k-м столбце первой j строки
							{
								gamefield.fieldArray[j][k] = 0;		// устанавливаем k-й столбец j-й строки в 0
								gamefield.fieldArray[j+1][k] = 1;	// устанавливаем k-й столбец (j+1)-й строки в 1. Таким образом мы перемещаемся по всей строке
								fieldSprite.getChildByName("r" + j + "c" + k).y += Main.TS;						// перемещаем соответствующий DisplayObject по TS ячейкам поля
								fieldSprite.getChildByName("r" + j + "c" + k).name = "r" + (j + 1) + "c" + k;	// изменяем соответствующее имя DisplayObject в соответствии с его новой позицией
							}
						}
					}
				}
			}
		}
	}
}