/// <reference path="../../base.d.ts" />
﻿
namespace flash.display
{
	
	/**
	 * The Scene class includes properties for identifying the name, labels, and number of frames in a scene. 
	 * A Scene object instance is created in Flash Professional, not by writing ActionScript code. 
	 * The MovieClip class includes a currentScene property, which is a Scene object that identifies the scene in which the playhead is 
	 * located in the timeline of the MovieClip instance. The scenes property of the MovieClip class is an array of Scene objects. 
	 * Also, the gotoAndPlay() and gotoAndStop() methods of the MovieClip class use Scene objects as parameters.
	 * 
	 * @author pkulikov
	 */
	export  class Scene
	{
		/**
		 * An array of FrameLabel objects for the scene. 
		 * @return 
		 * 
		 */		
		public get labels () : any[]
		{
			return null;
		}

		/**
		 * The name of the scene. 
		 * @return 
		 * 
		 */		
		public get name () : string
		{
			return null;
		}

		/**
		 * The number of frames in the scene. 
		 * @return 
		 * 
		 */		
		public get numFrames () : number
		{
			return 0;
		}
	}	
}