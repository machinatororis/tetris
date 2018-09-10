package
{
	import flash.display.Sprite;
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
	
	import flashx.textLayout.tlf_internal;
	
	public class Control
	{
		private var upMouseX: Number;					// координаты нажатия мыши
		private var upMouseY: Number;					// координаты нажатия мыши
		private var downMouseX: Number;					// координаты отжатия мыши
		private var downMouseY: Number;					// координаты отжатия мыши
		
		public function Control()
		{
		}
		
		public function onKDown(event:KeyboardEvent):void
		{
			if(! Main.mainGame.gameOver)
			{
				switch (event.keyCode) 
				{
					case 37 :
						if (Main.mainGame.canFit(Main.tRow, Main.tCol - 1, Main.currentRotation))	// проверяем, может ли тетромино поместиться в заданное положение или нет 
						{
							moveLeft();
						}
						break;
					case 38 :
						var ct: uint = Main.currentRotation;
						var rot: uint = (ct + 1) % Main.tetromino.tetrominoes[Main.currentTetromino].length;	// вращение тетромино
						
						// проверяем текущую позицию при вращении, нарушает ли она границы
						if (Main.mainGame.canFit(Main.tRow, Main.tCol, rot)) 
						{
							Main.currentRotation = rot;				// если все ок, принимает текущее вращение
							Main.mainGame.fieldSprite.removeChild(Main.tetrominoSprite);		// текущее тетромино удаляем
							Main.mainGame.drawTetromino();			// рисуем тетромино в новом вращении, которое приняли
							Main.mainGame.placeTetromino();			// размещаем его на сцене
						}
						break;
					case 39 :
						if (Main.mainGame.canFit(Main.tRow, Main.tCol + 1, Main.currentRotation)) 
						{
							moveRight();
						}
						
						break;
					case 40 :
						if (Main.mainGame.canFit(Main.tRow + 1, Main.tCol, Main.currentRotation)) 
						{
							moveDown();
						}
						else									// если вниз больше двигаться некуда 
						{
							Main.mainGame.landTetromino();		// считаем тетромино посаженным
							Main.mainGame.generateTetromino();	// генерируем новый тетромино
						}
						break;
				}
			}
		}
		
		public function onMouseUp(event:MouseEvent):void
		{
			if(Main.mainGame.gameOver) return;
		
			upMouseX = event.localX;
			upMouseY = event.localY;				// запомнили координаты отжатия мышки
		
			if((upMouseX - downMouseX) >= 10)		// двигаемся вправо
			{
				moveRight();
			}
		
			if((upMouseX - downMouseX) <= (-10))	// двигаемся влево
			{
				moveLeft();
			}
		
			if((upMouseY - downMouseY) >= 10)		// двигаемся вниз
			{
				moveDown();
			}
		
			var ct: uint = Main.currentRotation;
			var rot: uint = (ct + 1) % Main.tetromino.tetrominoes[Main.currentTetromino].length;	// вращение тетромино
		
			// проверяем текущую позицию при вращении, нарушает ли она границы
			if (Main.mainGame.canFit(Main.tRow, Main.tCol, rot)) 
			{
				Main.currentRotation = rot;			// если все ок, принимает текущее вращение
				Main.mainGame.fieldSprite.removeChild(Main.tetrominoSprite);		// текущее тетромино удаляем
				Main.mainGame.drawTetromino();		// рисуем тетромино в новом вращении, которое приняли
				Main.mainGame.placeTetromino();		// размещаем его на сцене
			}	
		}
		
		public function onMouseDown(event:MouseEvent):void
		{
			downMouseX = event.localX;
			downMouseY = event.localY;				// запомнили координаты нажатия мышки
		}
		
		public function moveRight():void
		{
			if (Main.mainGame.canFit(Main.tRow, Main.tCol + 1, Main.currentRotation)) 
			{
				Main.tCol++;
				Main.mainGame.placeTetromino();
				return;
			}
		}
		
		public function moveLeft():void
		{
			if (Main.mainGame.canFit(Main.tRow, Main.tCol - 1, Main.currentRotation))	// проверяем, может ли тетромино поместиться в заданное положение или нет 
			{
				Main.tCol--;
				Main.mainGame.placeTetromino();
				return;
			}
		}
		
		public function moveDown():void
		{
			if (Main.mainGame.canFit(Main.tRow + 1, Main.tCol, Main.currentRotation)) 
			{
				Main.tRow++;
				Main.mainGame.placeTetromino();
				return;
			}
		}
	}
}