package
{
	import flash.display.*;
	
	public class Field extends Sprite
	{
		public var fieldWidth:int;
		public var fieldHeight:int;
		public var fieldArray:Array = new Array();
		public var fieldSprite:Sprite = new Sprite();
		
		public function Field() 
		{
			fieldWidth = 10;										// ширина игрового поля
			fieldHeight = 20;										// высота игрового поля
			var colors: Array = new Array("0x444444", "0x555555");

			fieldSprite.graphics.lineStyle(0, 0x000000);			// задаем стиль линии: 0 - толщина линии в пикселях, 0x000000 - черный цвет 
			
			for (var i: uint = 0; i < fieldHeight; i++)				// поле игры fieldWidth * fieldHeight 
			{
				fieldArray[i] = new Array;
				for (var j: uint = 0; j < fieldWidth; j++) 			// двумя циклами рисуем fieldWidth * fieldHeight прямоугольников на игровом поле
				{
					fieldArray[i][j] = 0;
					
					// мы рисуем квадрат с TS-пиксельной стороной для каждого для итерации цикла
					fieldSprite.graphics.beginFill(colors [(j % 2 + i % 2) % 2]); 				// цвет заливки прямоугольников
					fieldSprite.graphics.drawRect(Main.TS * j, Main.TS * i, Main.TS, Main.TS);  // (fieldSprite, который в первой итерации циклов находится в координатах 0,0), ширина и высота прямоугольника.
					fieldSprite.graphics.endFill();												// применяем заливку ко всему, что вы нарисовали после вызова beginFill
				}	
			}
			this.addChild(fieldSprite);
		}
	}
}