package
{
	import flash.display.*;
	
	public class Element extends Sprite
	{
		public function Element(tetromino:Tetrominoes, sprite:Sprite, uint1:uint, uint2:uint, x:int, y:int)
		{	
			sprite.graphics.beginFill(tetromino.colors[uint1]);
			sprite.graphics.drawRect(Main.TS * y, Main.TS * x, Main.TS, Main.TS);
			sprite.graphics.endFill();
					
		}
	}
}