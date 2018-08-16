package {
	import flash.display.Sprite;
	import flash.events.KeyboardEvent;
	import flash.events.TimerEvent;
	import flash.utils.Timer;
	
	public class Main extends Sprite 
	{
		private const TS: uint = 24;					// высота и ширина ячейки поля в пикселях
		private var fieldArray: Array;					// массив, который будет численно представлять игровое поле
		private var fieldSprite: Sprite;				// DisplayObject, который графически отобразит игровое поле.
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
		
		public function Main() 
		{
			generateField();   					// рисуем поле
			initTetrominoes();					// инициализируем массивы, связанные с тетромино
			nextTetromino = Math.floor(Math.random() * 7); // генерируем следующее тетромино
			generateTetromino();				// генерируем случайное тетромино на поле
			stage.addEventListener(KeyboardEvent.KEY_DOWN, onKDown);	// слушатель клавиатуры
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
							removeChild(tetromino);		// текущее тетромино удаляем
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
						addChild(landed);
						landed.graphics.lineStyle(0, 0x000000);
						landed.graphics.beginFill(colors[currentTetromino]);
						landed.graphics.drawRect(TS * (tCol + j), TS * (tRow + i), TS, TS);
						landed.graphics.endFill();
						landed.name = "r" + (tRow + i) + "c" + (tCol + j);		// имя части посаженого тетромино(часть в пятом столбце третьей строки будет r3c5)
						fieldArray[tRow + i][tCol + j] = 1;					// рисуем квадрат, где лежит тетромино
					}
				}	
			}
			removeChild(tetromino);				// обновляем массив
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
						removeChild(getChildByName("r" + i + "c" + j));	// удаляем соответствующий DisplayObject, определяем его по названию.
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
								getChildByName("r" + j + "c" + k).y += TS;						// перемещаем соответствующий DisplayObject по TS ячейкам поля
								getChildByName("r" + j + "c" + k).name = "r" + (j + 1) + "c" + k;	// изменяем соответствующее имя DisplayObject в соответствии с его новой позицией
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
				}
			}
		}
		
		private function drawNext():void			// рисуемт следующее тетромино таким же образом, как drawTetromino
		{
			if (getChildByName("next") != null) 
			{
				removeChild(getChildByName("next"));
			}
			var next_t: Sprite = new Sprite  ;
			next_t.x = 300;
			next_t.name = "next";
			addChild(next_t);
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
			} else 
			{
				landTetromino();
				generateTetromino();
			}
		}
		
		private function drawTetromino():void					// рисуем тетромино
		{
			var ct: uint = currentTetromino;	// укорачиваем имя currentTetromino до ct
			tetromino = new Sprite;				// создаем объект тетромино
			addChild(tetromino);				// добавляем на экран
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
		
		private function initTetrominoes():void					// инициализируем массивы, связанные с тетромино
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
		
		private function generateField():void	// функция отрисовки поля
		{
			var colors: Array = new Array("0x444444", "0x555555");
			fieldArray = new Array;
			var fieldSprite: Sprite = new Sprite;
			addChild(fieldSprite);				// создаем объекты массивов и добавляем на сцену
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
			
	}
}