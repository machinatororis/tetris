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
	import flash.sensors.Accelerometer;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;
	import flash.utils.*;
	import flash.utils.Timer;
	
	public class Main extends Sprite 
	{
		public static var WIDTH: int;					// ширина сцены
		public static var HEIGHT: int;					// высота сцены
		public static const TS: uint = 24;				// высота и ширина ячейки поля в пикселях
		public static var mainGame:Game;
		public static var control:Control;
		
		public static var tetrominoSprite: Sprite;		// спрайт для тетромино
		public static var tetromino: Tetrominoes;		// объект тетромино
		public static var currentTetromino: uint;		// число тетромино в игре (от 0 до 6)
		public static var nextTetromino: uint;			// какое тетромино будет следующим
		public static var currentRotation: uint;		// вращение тетромино (от 0 до 3)
		public static var tRow: int;					// вертикальное положение тетромино
		public static var tCol: int;					// горизонтальное положение тетромино
		
		public function Main() 
		{
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			WIDTH = stage.stageWidth;					// ширина сцены
			HEIGHT = stage.stageHeight;					// высота сцены
			tetromino = new Tetrominoes();				// инициализируем массивы, связанные с тетромино
			mainGame = new Game();
			control = new Control();
			addChild(mainGame);
			stage.addEventListener(Event.RESIZE, mainGame.onResize);
			mainGame.generateBackground();				// рисуем bg
			mainGame.generateField();   				// рисуем поле
			mainGame.generateInterface();				// рисуем интерфейс
			tetrominoSprite = new Sprite();				// создаем объект тетромино
			
			nextTetromino = Math.floor(Math.random() * 7); // генерируем следующее тетромино
			mainGame.generateTetromino();				// генерируем случайное тетромино на поле
			stage.addEventListener(KeyboardEvent.KEY_DOWN, control.onKDown);	// слушатель клавиатуры
			mainGame.fieldSprite.addEventListener(MouseEvent.MOUSE_UP, control.onMouseUp);		// слушатель мышки
			mainGame.fieldSprite.addEventListener(MouseEvent.MOUSE_DOWN, control.onMouseDown);
			mainGame.gameInterface.startSprite.addEventListener(MouseEvent.CLICK, mainGame.gameInterface.onStart);	// слушатель кнопки старт
			mainGame.gameInterface.pauseSprite.addEventListener(MouseEvent.CLICK, mainGame.gameInterface.onPause); 	// слушатель кнопки пауза
			mainGame.gameInterface.replaySprite.addEventListener(MouseEvent.CLICK, mainGame.gameInterface.onReplay);// слушатель кнопки переиграть
		}
	}
}