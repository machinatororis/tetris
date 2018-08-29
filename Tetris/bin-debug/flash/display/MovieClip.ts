/// <reference path="../../base.d.ts" />
﻿
namespace flash.display
{
	
	/**
	 * The MovieClip class inherits from the following classes: Sprite, DisplayObjectContainer, InteractiveObject, DisplayObject, 
	 * and EventDispatcher.
	 * Unlike the Sprite object, a MovieClip object has a timeline.
	 * 
	 * >In Flash Professional, the methods for the MovieClip class provide the same functionality as actions that target movie clips. 
	 * Some additional methods do not have equivalent actions in the Actions toolbox in the Actions panel in the Flash authoring tool.
	 * 
	 * Children instances placed on the Stage in Flash Professional cannot be accessed by code from within the constructor of a parent 
	 * instance since they have not been created at that point in code execution. Before accessing the child, the parent must instead 
	 * either create the child instance by code or delay access to a callback function that listens for the child to dispatch its 
	 * Event.ADDED_TO_STAGE event.
	 * 
	 * If you modify any of the following properties of a MovieClip object that contains a motion tween, the playhead is stopped in that 
	 * MovieClip object: alpha, blendMode, filters, height, opaqueBackground, rotation, scaleX, scaleY, scale9Grid, scrollRect, transform, 
	 * visible, width, x, or y. However, it does not stop the playhead in any child MovieClip objects of that MovieClip object.
	 * 
	 * Note:Flash Lite 4 supports the MovieClip.opaqueBackground property only if FEATURE_BITMAPCACHE is defined. 
	 * The default configuration of Flash Lite 4 does not define FEATURE_BITMAPCACHE. To enable the MovieClip.opaqueBackground property 
	 * for a suitable device, define FEATURE_BITMAPCACHE in your project.
	 * 
	 * @author pkulikov
	 */
	export  class MovieClip extends Sprite
	{
		/**
		 * Specifies the number of the frame in which the playhead is located in the timeline of the MovieClip instance. 
		 * @return 
		 * 
		 */		
		public get currentFrame () : number
		{
			return 0;
		}

		/**
		 * The label at the current frame in the timeline of the MovieClip instance. 
		 * @return 
		 * 
		 */		
		public get currentFrameLabel () : string
		{
			return null;
		}

		/**
		 * The current label in which the playhead is located in the timeline of the MovieClip instance. 
		 * @return 
		 * 
		 */		
		public get currentLabel () : string
		{
			return null;
		}

		/**
		 * Returns an array of FrameLabel objects from the current scene. 
		 * @return 
		 * 
		 */		
		public get currentLabels () : any[]
		{
			return null;
		}

		/**
		 * The current scene in which the playhead is located in the timeline of the MovieClip instance. 
		 * @return 
		 * 
		 */		
		public get currentScene () : Scene
		{
			return null;
		}

		/**
		 * A Boolean value that indicates whether a movie clip is enabled. 
		 */		
		public enabled : boolean;

		/**
		 * The number of frames that are loaded from a streaming SWF file. 
		 * @return 
		 * 
		 */		
		public get framesLoaded () : number
		{
			return 0;
		}

		/**
		 * A Boolean value that indicates whether a movie clip is curently playing. 
		 * @return 
		 * 
		 */		
		public get isPlaying () : boolean
		{
			return false;
		}

		/**
		 * An array of Scene objects, each listing the name, the number of frames, and the frame labels for a scene in the MovieClip instance. 
		 * @return 
		 * 
		 */		
		public get scenes () : any[]
		{
			return null;
		}

		/**
		 * The total number of frames in the MovieClip instance. 
		 * @return 
		 * 
		 */		
		public get totalFrames () : number
		{
			return 0;
		}

		/**
		 * Indicates whether other display objects that are SimpleButton or MovieClip objects can receive mouse release events or 
		 * other user input release events. 
		 */		
		public trackAsMenu : boolean;
		
		/**
		 * Creates a new MovieClip instance. 
		 * 
		 */		
		constructor()
		{
			/**/ this.enabled === void 0 && (this.enabled = false);
			/**/ this.trackAsMenu === void 0 && (this.trackAsMenu = false);
			super(); 
			
		}
		
		/**
		 * Add frame script. 
		 * @param index
		 * @param method
		 * 
		 */		
		public addFrameScript (...params):void
		{
			
		}
		
		/**
		 * Starts playing the SWF file at the specified frame. 
		 * @param frame
		 * @param scene
		 * 
		 */		
		public gotoAndPlay(frame:any, scene:string = null):void
		{
			
		/**/ scene = as(scene, 'String');
			
		}

		/**
		 * Brings the playhead to the specified frame of the movie clip and stops it there. 
		 * @param frame
		 * @param scene
		 * 
		 */		
		public gotoAndStop(frame:any, scene:string = null):void
		{
			
		/**/ scene = as(scene, 'String');
			
		}

		/**
		 * Sends the playhead to the next frame and stops it. 
		 * 
		 */		
		public nextFrame():void
		{
			
		}

		/**
		 * Moves the playhead to the next scene of the MovieClip instance. 
		 * 
		 */		
		public nextScene():void
		{
			
		}

		/**
		 * Moves the playhead in the timeline of the movie clip. 
		 * 
		 */		
		public play():void
		{
			
		}

		/**
		 * Sends the playhead to the previous frame and stops it. 
		 * 
		 */		
		public prevFrame():void
			
		{
			
		}
		/**
		 * Moves the playhead to the previous scene of the MovieClip instance. 
		 * 
		 */		
		public prevScene():void
		{
			
		}

		/**
		 * Stops the playhead in the movie clip. 
		 * 
		 */		
		public stop():void
		{
			
		}
		
		/*override*/ public toString ():string
		{
			return '[object MovieClip]';
		}
	}	
}