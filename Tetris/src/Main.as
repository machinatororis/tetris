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
		private var currentRotation: uint;				// вращение тетромино (от 0 до 3)
		private var tRow: int;							// вертикальное положение тетромино
		private var tCol: int;							// горизонтальное положение тетромино
		
		public function Main() 
		{
			generateField();   					// рисуем поле
			initTetrominoes();					// инициализируем массивы, связанные с тетромино
			generateTetromino();				// генерируем случайное тетромино на поле
			stage.addEventListener(KeyboardEvent.KEY_DOWN, onKDown);	// слушатель клавиатуры
		}
		
		private function onKDown(event:KeyboardEvent):void
		{
			switch (event.keyCode) 
			{
				case 37 :
					if (canFit(tRow, tCol - 1))	// проверяем, может ли тетромино поместиться в заданное положение или нет 
					{
						tCol--;
						placeTetromino();
					}
					break;
				case 39 :
					if (canFit(tRow, tCol + 1)) 
					{
						tCol++;
						placeTetromino();
					}
					break;
			}
		}
		
		private function canFit(row:int, col:int):Boolean	// может ли тетромино поместиться в новом положении
		{
			var ct: uint = currentTetromino;
			
			// циклами проверяем текущее положение тетромино
			for (var i: int = 0; i < tetrominoes[ct][currentRotation].length; i++) 
			{
				for (var j: int = 0; j < tetrominoes[ct][currentRotation][i].length; j++) 
				{
					// проверка того, чтобы тетромино было полностью внутри игрового поля
					if (tetrominoes[ct][currentRotation][i][j] == 1) 
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
					}
				}
			}
			return true;
		}
		
		private function generateTetromino():void				// генерируем случайное тетромино на поле
		{
			currentTetromino = Math.floor(Math.random() * 7);  	// генерируем случайное целое число от 0 до 6 (возможные тетромино)
			currentRotation = 0;	// начальное вращение
			tRow = 0;				// начальный ряд
			tCol = 3;				// всегда 3, потому что тетромино включены в массив из 4 элементов, поэтому, чтобы центрировать его в поле шириной 10 колонок, его начало должно быть в (10-4) / 2 = 3
			drawTetromino();		// рисуем тетромино
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