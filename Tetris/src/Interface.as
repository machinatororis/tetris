package
{
	import flash.display.*;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.sensors.Accelerometer;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;
	
	public class Interface extends Sprite
	{
		[Embed(source="img/start.png")] private const pictureStart: Class;
		[Embed(source="img/pause.png")] private const picturePause: Class;
		[Embed(source="img/replay.png")] private const pictureReplay: Class;
		
		public var startSprite: Sprite;				// спрайт кнопки start
		public var pauseSprite: Sprite;				// спрайт кнопки pause
		public var replaySprite: Sprite;			// спрайт кнопки replay
		
		public var interfaceSprite: Sprite;			// спрайт для интерфейсных кнопок
		
		public var txtPause: TextField = new TextField();
		public var formatGameMessage: TextFormat = new TextFormat();
		
		public function Interface()
		{
			interfaceSprite = new Sprite();
			
			// кнопка старт
			startSprite = new Sprite();
			interfaceSprite.addChild(startSprite);
			var start: Bitmap = new pictureStart() as Bitmap;	
			start.x = 280;
			start.y = 200;
			startSprite.addChild(start);
			
			// кнопка пауза
			pauseSprite = new Sprite();
			interfaceSprite.addChild(pauseSprite);
			var pause: Bitmap = new picturePause() as Bitmap;	
			pause.x = 280;
			pause.y = 300;
			pauseSprite.addChild(pause);
			
			// кнопка переиграть
			replaySprite = new Sprite();
			interfaceSprite.addChild(replaySprite);
			var replay: Bitmap = new pictureReplay() as Bitmap;	
			replay.x = 280;
			replay.y = 400;
			replaySprite.addChild(replay);
			
			var formatNext: TextFormat = new TextFormat();
			formatNext.font = "Consolas";
			formatNext.size = 40;
			formatNext.color = 0x000000;
			
			var txtNext: TextField = new TextField();
			interfaceSprite.addChild(txtNext);
			txtNext.text = "NEXT";
			txtNext.x = 270;
			txtNext.y = 10;
			txtNext.width = 800;
			txtNext.height = 100;
			
			txtNext.setTextFormat(formatNext);
			
			this.addChild(interfaceSprite);
		}
		
		public function drawGameOver():void				// функция отрисовки сообщения о завершении игры
		{
			setFormatGameMessage();						// ф-ция задания стиля игровым сообщениям
			var txtGameOver: TextField = new TextField();
			
			interfaceSprite.addChild(txtGameOver);
			txtGameOver.background = true;
			txtGameOver.backgroundColor = 0x222222;
			txtGameOver.text = "GAME OVER";
			txtGameOver.x = 0;
			txtGameOver.y = 200;
			txtGameOver.width = 240;
			txtGameOver.height = 61;
			
			txtGameOver.setTextFormat(formatGameMessage);
			
			this.addChild(interfaceSprite);
		}
		
		public function setFormatGameMessage():void		// задаем стиль игровым сообщениям
		{
			formatGameMessage.font = "Consolas";
			formatGameMessage.size = 48;
			formatGameMessage.color = 0xffffff;
		}
		
		public function onStart(event:MouseEvent):void	// обработчик событий кнопки старт
		{
			if (Main.mainGame.gamePause)				// если до этого игра была на паузе
			{
				Main.mainGame.gamePause = false;		// снимаем паузу
				Main.mainGame.fieldSprite.removeChild(Main.mainGame.gameInterface.txtPause);
				Main.mainGame.timeCount.start();
			}
		}
		
		public function onPause(event:MouseEvent):void	// обработчик событий кнопки пауза		
		{
			if (!Main.mainGame.gameOver)
			{
				Main.mainGame.gamePause = true;			// ставим игру на паузу
				Main.mainGame.timeCount.stop();
				Main.mainGame.fieldSprite.addChild(Main.mainGame.gameInterface.txtPause);
				Main.mainGame.gameInterface.txtPause.background = true;
				Main.mainGame.gameInterface.txtPause.backgroundColor = 0x222222;
				Main.mainGame.gameInterface.txtPause.text = "PAUSE";
				Main.mainGame.gameInterface.txtPause.autoSize = TextFieldAutoSize.CENTER;
				Main.mainGame.gameInterface.txtPause.x = 0;
				Main.mainGame.gameInterface.txtPause.y = 200;
				Main.mainGame.gameInterface.txtPause.width = 240;
				Main.mainGame.gameInterface.txtPause.height = 61;
				
				Main.mainGame.gameInterface.setFormatGameMessage();		// ф-ция задания стиля игровым сообщениям
				Main.mainGame.gameInterface.txtPause.setTextFormat(Main.mainGame.gameInterface.formatGameMessage);
			}
		}
		
		public function onReplay(event:MouseEvent):void	// обработчик событий кнопки переиграть
		{
			Main.mainGame.gameOver = false;
			Main.mainGame.timeCount.stop();
			Main.mainGame.fieldSprite.removeChild(Main.mainGame.fieldSprite.getChildByName("next"));
			Main.mainGame.generateField();
			Main.mainGame.generateInterface();
			Main.mainGame.generateTetromino();			// генерируем случайное тетромино на поле
			Main.mainGame.timeCount.start();
			Main.mainGame.fieldSprite.addEventListener(MouseEvent.MOUSE_UP, Main.control.onMouseUp);						// слушатель мышки
			Main.mainGame.fieldSprite.addEventListener(MouseEvent.MOUSE_DOWN, Main.control.onMouseDown);
			Main.mainGame.gameInterface.startSprite.addEventListener(MouseEvent.CLICK, Main.mainGame.gameInterface.onStart);// слушатель кнопки старт
			Main.mainGame.gameInterface.pauseSprite.addEventListener(MouseEvent.CLICK, Main.mainGame.gameInterface.onPause);// слушатель кнопки пауза
			Main.mainGame.gameInterface.replaySprite.addEventListener(MouseEvent.CLICK, Main.mainGame.gameInterface.onReplay);// слушатель кнопки переиграть
		}
	}
}