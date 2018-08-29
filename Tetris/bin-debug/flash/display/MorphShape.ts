/// <reference path="../../base.d.ts" />
﻿
namespace flash.display
{
	
	/**
	 * The MorphShape class represents MorphShape objects on the display list. 
	 * You cannot create MorphShape objects directly in ActionScript; they are created when you create a shape tween in the 
	 * Flash authoring tool.
	 * 
	 * @author pkulikov
	 */
	export  class MorphShape extends DisplayObject
	{
		/*override*/ public toString ():string
		{
			return '[object MorphShape]';
		}
	}
}