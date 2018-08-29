/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../geom/Matrix.ts" />
/// <reference path="../../../../display/Scene.ts" />
/// <reference path="../../../../display/FrameLabel.ts" />
/// <reference path="../../../../display/DisplayObject.ts" />
/// <reference path="../timeline/FrameObject.ts" />
/// <reference path="../SWFTimelineContainer.ts" />
/// <reference path="../../../../../Main.ts" />

namespace flash.__native.format.swf.instance
{
	export import Main = global.Main;
	export import SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
	export import FrameObject = flash.__native.format.swf.timeline.FrameObject;
	export import DisplayObject = flash.display.DisplayObject;
	export import FrameLabel = flash.display.FrameLabel;
	export import Scene = flash.display.Scene;
	export import Matrix = flash.geom.Matrix;
	

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
	export  class MovieClip extends flash.display.MovieClip
	{
		/*[internal]*/ protected static sHelperMatrixTag : Matrix = asc.sti(MovieClip,()=>{ MovieClip.sHelperMatrixTag = new Matrix; });
		/*[internal]*/ protected static sHelperMatrixOffset : Matrix = asc.sti(MovieClip,()=>{ MovieClip.sHelperMatrixOffset = new Matrix; });
		
		/*[internal]*/ protected _data : SWFTimelineContainer;
		/*[internal]*/ protected _lastUpdate : number;
		/*[internal]*/ protected _lastEvaluate : number;
		/*[internal]*/ protected _playing : boolean;
		/*[internal]*/ protected _handling : boolean;
		/*[internal]*/ protected _frameScripts : any[];
		
		/*[internal]*/ protected _objectPool : any[][];
		/*[internal]*/ protected _objectPoolSize : number[];
		/*[internal]*/ protected _activeObjects : ChildObject[];
		/*[internal]*/ protected _activeObjectsSize : number;
		/*[internal]*/ protected _newActiveObjects : ChildObject[];
		/*[internal]*/ protected _newActiveObjectsSize : number;
		
		/*[internal]*/ protected _currentFrame : number;
		/*[internal]*/ protected _currentFrameLabel : string;
		/*[internal]*/ protected _totalFrames : number;
		/*[internal]*/ protected _currentLabel : string;
		/*[internal]*/ protected _currentLabels : FrameLabel[];
		
		/*[internal]*/ protected _currentConcatenatedMaxTotalFrames : number;
		
		/**
		 * Specifies the number of the frame in which the playhead is located in the timeline of the MovieClip instance. 
		 * @return 
		 * 
		 */		
		/*override*/ public get currentFrame () : number
		{
			return this._currentFrame;
		}
		
		/**
		 * The label at the current frame in the timeline of the MovieClip instance. 
		 * @return 
		 * 
		 */		
		/*override*/ public get currentFrameLabel () : string
		{
			return null;
		}
		
		/**
		 * The current label in which the playhead is located in the timeline of the MovieClip instance. 
		 * @return 
		 * 
		 */		
		/*override*/ public get currentLabel () : string
		{
			return this._currentLabel;
		}
		
		/**
		 * Returns an array of FrameLabel objects from the current scene. 
		 * @return 
		 * 
		 */		
		/*override*/ public get currentLabels () : any[]
		{
			return null;
		}
		
		/**
		 * The current scene in which the playhead is located in the timeline of the MovieClip instance. 
		 * @return 
		 * 
		 */		
		/*override*/ public get currentScene () : Scene
		{
			return null;
		}
		
		/**
		 * The number of frames that are loaded from a streaming SWF file. 
		 * @return 
		 * 
		 */		
		/*override*/ public get framesLoaded () : number
		{
			return 0;
		}
		
		/**
		 * A Boolean value that indicates whether a movie clip is curently playing. 
		 * @return 
		 * 
		 */		
		/*override*/ public get isPlaying () : boolean
		{
			return false;
		}
		
		/**
		 * An array of Scene objects, each listing the name, the number of frames, and the frame labels for a scene in the MovieClip instance. 
		 * @return 
		 * 
		 */		
		/*override*/ public get scenes () : any[]
		{
			return null;
		}
		
		/**
		 * The total number of frames in the MovieClip instance. 
		 * @return 
		 * 
		 */		
		/*override*/ public get totalFrames () : number
		{
			return this._totalFrames;
		}
		
		/**
		 * Creates a new MovieClip instance. 
		 * 
		 */		
		/*[internal]*/ constructor (data : SWFTimelineContainer)
		{
			// data = strict(data, SWFTimelineContainer);
			/**/ this._lastUpdate === void 0 && (this._lastUpdate = 0);
			/**/ this._lastEvaluate === void 0 && (this._lastEvaluate = 0);
			/**/ this._currentFrame === void 0 && (this._currentFrame = 0);
			/**/ this._totalFrames === void 0 && (this._totalFrames = 0);
			/**/ this._currentConcatenatedMaxTotalFrames === void 0 && (this._currentConcatenatedMaxTotalFrames = 0);
			super(); 
			if (!data) {
				
				return;
				
			}
			
			this._data = data;
			this._offStageEvents = false;
			
			this._currentFrame = 1;
			this._totalFrames =(( data._frames.length) >> 0);
			this._currentConcatenatedMaxTotalFrames = this._totalFrames;
			
			this._currentLabels = new Array;
			
			var __for0 = window.asc.in(data.frameLabels);
			for (var frame of __for0) {
				
				this._currentLabels.push (new FrameLabel (data.frameLabels.get(frame), frame + 1));
				
			}
			
			if (this._currentLabels.length > 0) {
				
				this._currentLabels.sort (function (a:FrameLabel, b:FrameLabel):number { return a.frame - b.frame }.__bind(this));
				
			}
			
			this._objectPool = new Array;
			this._objectPoolSize = new Array;
			this._activeObjects = new Array;
			this._activeObjectsSize = 0;
			this._newActiveObjects = new Array;
			this._newActiveObjectsSize = 0;
			
			this.__update ();
			
			if (this._totalFrames > 1) {
				
				this.play ();
				
			} else {
				
				this.__handle (true);
				
			}
		}
		
		/**
		 * Starts playing the SWF file at the specified frame. 
		 * @param frame
		 * @param scene
		 * 
		 */		
		/*override*/ public gotoAndPlay (frame:any, scene:string = null):void
		{
			/**/ scene = as(scene, 'String');
			this.play ();
			
			this._currentFrame = this.__getFrame (frame);
			this.__update ();
		}
		
		/**
		 * Brings the playhead to the specified frame of the movie clip and stops it there. 
		 * @param frame
		 * @param scene
		 * 
		 */		
		/*override*/ public gotoAndStop (frame:any, scene:string = null):void
		{
			/**/ scene = as(scene, 'String');
			this.stop ();
			
			this._currentFrame = this.__getFrame (frame);
			this.__update ();
		}
		
		/**
		 * Sends the playhead to the next frame and stops it. 
		 * 
		 */		
		/*override*/ public nextFrame():void
		{
			var next = this._currentFrame + 1;
			
			if (next > this._totalFrames) {
				
				next = this._totalFrames;
				
			}
			
			this.gotoAndStop (next);
		}
		
		/**
		 * Moves the playhead to the next scene of the MovieClip instance. 
		 * 
		 */		
		/*override*/ public nextScene():void
		{
			
		}
		
		/**
		 * Moves the playhead in the timeline of the movie clip. 
		 * 
		 */		
		/*override*/ public play ():void
		{
			if (this._totalFrames < 2) {
				
				return;
				
			}
			
			this._playing = true;
			
			if (!this._handling) {
				
				this.__handle (true);
				
			}
		}
		
		/**
		 * Sends the playhead to the previous frame and stops it. 
		 * 
		 */		
		/*override*/ public prevFrame():void
		{
			var previous = this._currentFrame - 1;
			
			if (previous < 1) {
				
				previous = 1;
				
			}
			
			this.gotoAndStop (previous);
		}
		
		/**
		 * Moves the playhead to the previous scene of the MovieClip instance. 
		 * 
		 */		
		/*override*/ public prevScene():void
		{
			
		}
		
		/**
		 * Stops the playhead in the movie clip. 
		 * 
		 */		
		/*override*/ public stop ():void
		{
			this._playing = false;
		}
		
		/*override*/ public stopAllMovieClips(unload:boolean = false):void
		{
			/**/ unload = Boolean(unload);
			super.stopAllMovieClips(unload);
			this.stop ();
		}
		
		/*override*/ public addFrameScript (...params):void
		{
			for (var i = 0, len = params.length; i < len; i += 2) {
				
				var index = params[i] | 0;
				var method:Function = params[i + 1];
				if (index < 0 || !method) {
					
					continue;
					
				}
				
				this._frameScripts =this._frameScripts || [];
				this._frameScripts[index] =this._frameScripts[index] || [];
				this._frameScripts[index].push(method.__bind(this));
				
			}
		}
		
		/*[internal]*/ protected __applyTween (start:number, end:number, ratio:number):number
		{
			// start = (+(start)); end = (+(end)); ratio = (+(ratio));
			return start + ((end - start) * ratio);
		}
		
		/*[internal]*/ protected __getFrame (frame:any):number
		{
			var value = 1;
			
			if (is(frame , 'int')) {
				
				value = frame;
				if (value < 1) value = 1;
				if (value > this._totalFrames) value = this._totalFrames;
				
			} else if (is(frame , 'String')) {
				
				if (this._data.frameIndexes.get(frame)) value = this._data.frameIndexes.get(frame);
				else value = 1;
				
			}
			
			return value;
		}
		
		/*[internal]*/ protected __update ():void
		{
			if (this._lastUpdate == this._currentFrame) {
				
				return;
				
			}
			
			var frameIndex = this._currentFrame - 1;
			
			if (frameIndex > -1) {
				
				this._currentFrameLabel =as( this._data._frames[frameIndex].label, 'String');
				
				if (this._currentFrameLabel != null) {
					
					this._currentLabel = this._currentFrameLabel;
					
				}
				
				this.__renderFrame (frameIndex);
				
			}
			
			this._lastUpdate = this._currentFrame;
			
		}
		
		/*[internal]*/ protected __handle (value:boolean):void
		{
			// value = Boolean(value);
			if (this._handling = value) {
				
				DisplayObject.__addTimelineObject(this);
				
			} else {
				
				DisplayObject.__removeTimelineObject(this);
				
			}
		}
		
		/*[internal]*/ protected __evaluate ():void
		{
			if (this._lastEvaluate == this._currentFrame) {
				
				return;
				
			}
			
			var frameIndex = this._currentFrame - 1;
			
			if (frameIndex > -1) {
				
				this.__evaluateFrameScripts (frameIndex);
				
			}
			
			this._lastEvaluate = this._currentFrame;
			
		}
		
		/*[internal]*/ protected __evaluateFrameScripts (frame : number) : void
		{
			// frame = ((frame) >> 0);
			var arr;
			if (!this._frameScripts || !(arr = this._frameScripts[frame])) {
				
				return;
				
			}
			
			var len = arr.length;
			for (var i = 0; i < len; ++i) {
				
				arr[i]();
				
			}
		}
		
		/*[internal]*/ /*override*/ protected __exitInternal (nextFrame : number) : void
		{
			// nextFrame = ((nextFrame) >> 0);
			var frame = this._currentFrame;
			
			this.__evaluate ();
			
			if (nextFrame == 1) {
				
				if (this._playing) {
					
					if (frame == this._currentFrame) {
						
						this._currentFrame++;
						
						if (this._currentFrame > this._totalFrames) {
							
							this._currentFrame = 1;
							
						}
						
						this.__update ();
						
					}
					
				} else if (this._handling) {
					
					this.__handle (false);
					
				}
				
			}
		}
		
		/*[internal]*/ protected __placeObject (displayObject : DisplayObject, frameObject : FrameObject):void
		{
			// displayObject = strict(displayObject, DisplayObject); frameObject = strict(frameObject, FrameObject);
			var index;
			var tags = this._data._tags;
			var firstTag = tags [frameObject.placedAtIndex];
			var lastNameTag;
			var lastMatrixTag;
			var lastColorTransformTag;
			var lastFilterListTag;
			var lastRatioTag;
			
			if ((index = frameObject.lastModifiedNameAtIndex) > -1) {
				
				lastNameTag = tags [index];
				
			}
			
			if ((index = frameObject.lastModifiedMatrixAtIndex) > -1) {
				
				lastMatrixTag = tags [index];
				
			}
			
			if ((index = frameObject.lastModifiedColorTransformAtIndex) > -1) {
				
				lastColorTransformTag = tags [index];
				
			}
			
			if ((index = frameObject.lastModifiedFilterListAtIndex) > -1) {
				
				lastFilterListTag = tags [index];
				
			}
			
			if ((index = frameObject.lastModifiedRatioAtIndex) > -1) {
				
				lastRatioTag = tags [index];
				
			}
			
			if (lastNameTag) {
				
				displayObject._name =as( lastNameTag.instanceName, 'String');
				
			} else if (firstTag.hasName) {
				
				displayObject._name =as( firstTag.instanceName, 'String');
				
			}
			
			//var hasTimeline = displayObject is flash.display.MovieClip;
			//var hasScale9BitmapGrid, oldScaleX, oldScaleY;
			
			//if (hasTimeline) {
				
			//	if (hasScale9BitmapGrid = displayObject.scale9BitmapGrid != null) {
					
			//		oldScaleX = displayObject.scaleX;
			//		oldScaleY = displayObject.scaleY;
					
			//	}
				
			//}
			
			var matrix;
			if (lastMatrixTag) {
				
				matrix = lastMatrixTag.matrix.matrix;
				
			} else if (firstTag.hasMatrix) {
				
				matrix = firstTag.matrix.matrix;
				
			}
			
			var tr = displayObject.transform;
			if (matrix) {
				
				var m = tr._matrix;
				var mt = tr._matrixTmp;
				
				if (!mt || m.__equals(mt)) {
					
					if (is(displayObject , DynamicText)) {
						
						var offset = MovieClip.sHelperMatrixOffset;
						
						offset.__copyFrom(displayObject.offset);
						offset.__concat (matrix);
						matrix = offset;
						
					}
					
					if (!m.__equals(matrix)) {
						
						m.__copyFrom(matrix);
						
						if (!displayObject._dirty) {
							
							displayObject.__setDirty(1);
							
						}
						
					}
					
					if (!mt) {
						
						mt = tr._matrixTmp = new Matrix;
						
					}
					
					mt.__copyFrom(m);
					
				}
				
			}
			
			
			//if (hasTimeline) {
				
			//	var mt;
			//	if (hasScale9BitmapGrid && ((mt = displayObject.transform._matrix).a != oldScaleX || mt.d != oldScaleY)) {
					
			//		displayObject._scale9ScaleX = mt.a;
			//		displayObject._scale9ScaleY = mt.d;
					
			//		mt.a = 1;
			//		mt.d = 1;
					
			//		displayObject.drawScale9BitmapData();
					
			//	}
				
			//}
			
			if (lastColorTransformTag) {
				
				tr._colorTransform = lastColorTransformTag.colorTransform.colorTransform;
				
			} else if (firstTag.hasColorTransform) {
				
				tr._colorTransform = firstTag.colorTransform.colorTransform;
				
			}
			
			if (lastFilterListTag) {
				
				displayObject.__setSWFFilters(lastFilterListTag.surfaceFilterList);
				
			} else if (firstTag.hasFilterList) {
				
				displayObject.__setSWFFilters(firstTag.surfaceFilterList);
				
			}
			
			if (is(displayObject , MorphShape)) {

				if (lastRatioTag) {
					
					displayObject._newRatio = lastRatioTag.ratio / 65536.0;
					
				} else if (firstTag.hasRatio) {
					
					displayObject._newRatio = firstTag.ratio / 65536.0;
					
				} else {
					
					displayObject._newRatio = 0;
					
				}
				
			}
			
			this[displayObject._name] = displayObject;
		}
		
		/*[internal]*/ protected __renderFrame (index : number) : void
		{
			// index = ((index) >> 0);
			var frame = this._data._frames[index];
			if (frame) {
				
				var frameObject = null;
				
				this._newActiveObjectsSize = 0;
				
				// Check previously active objects (Maintain or remove)
				
				for (var i = 0; i < this._activeObjectsSize; ++i) {
					
					var activeObject = this._activeObjects[i];
					var activeFrameObject = activeObject.frameObject;
					
					frameObject = frame.objects[activeFrameObject.depth];
					
					var activeCharacterId = activeFrameObject.characterId;
					
					if (frameObject == null || frameObject.characterId != activeCharacterId) {
						
						// The The frameObject isn't the same as the active
						// Return object to pool
						
						var sameCharIdList = this._objectPool[activeCharacterId];
						
						if (!sameCharIdList) {
	
							sameCharIdList = this._objectPool[activeCharacterId] = [];
							this._objectPoolSize[activeCharacterId] = 0;
							
						}
						
						sameCharIdList[this._objectPoolSize[activeCharacterId]++] = activeObject;
						
						// Remove the object from the display list
						this.__removeChildAt(this._children.indexOf(activeObject.object));
						
						// Update notStagedFrames in all GLCacheDisplayObject
						// TODO
						//var maxFrameCount = _totalFrames;
						//_totalFrames
						
						var activeName = activeObject.object._name;
						if (activeName != null && activeName in this) {
							
							delete this[activeName];
							
						}
						
					} else {
						
						this._newActiveObjects[this._newActiveObjectsSize++] = activeObject;
						
					}
				}
				
				for (var i = 0; i < this._newActiveObjectsSize; ++i) {
					
					this._activeObjects[i] = this._newActiveObjects[i];
					
				}
				
				this._activeObjectsSize = this._newActiveObjectsSize;
				
				// Check possible new objects
				// For each FrameObject inside the frame, check if it already exists in the activeObjects array, then check in the Pool, and if it's not there, create the DisplayObject
				var displayObject;
				var child;
				var childMask = null;
				var activeIdx;
				var sortedObjects = frame.getObjectsSortedByDepth();
				var currentIndex = 0;
				for (var s = 0, sLen = sortedObjects.length; s < sLen; ++s) {
					
					var object = sortedObjects[s];
					
					child = null;
					displayObject = null;
					activeIdx = this._activeObjectsSize - 1;
					
					// Check if it's in the active objects
					if (activeIdx > -1) {
						
						while (activeIdx > -1 && ((activeCharacterId = (activeFrameObject = this._activeObjects[activeIdx].frameObject).characterId) != object.characterId || ( activeCharacterId == object.characterId && activeFrameObject.depth != object.depth))) {
							
							activeIdx--;
							
						}
						
					}
					
					if (activeIdx > -1) {
						
						// Object in the activeObjects Array, no need to create, just set the frameObject
						child = this._activeObjects[activeIdx];
						child.frameObject = object;
						displayObject = child.object;
						
					} else {
						
						// Not in the active objects, search in the Pool (For each char ID there's a list of ChildObjects, because the same symbol may be instantiated more than once)
						
						var characterId = object.characterId;
						var sameCharIdList = this._objectPool[characterId], sameCharIdListSize;
						if (sameCharIdList && (sameCharIdListSize = this._objectPoolSize[characterId])) {
							
							// Object already created and in the pool
							
							for (var i = 0; i < sameCharIdListSize; ++i) {
								
								var ch = sameCharIdList[i];
								if (object.placedAtIndex == ch.frameObject.placedAtIndex) {
									
									child = ch;
									
									for (var j = i + 1; j < sameCharIdListSize; ++j) {
									
										sameCharIdList[j - 1] = sameCharIdList[j];
									
									}
									
									this._objectPoolSize[characterId]--;
									break;
									
								}
								
							}
							
							if (!child) {
								
								child = sameCharIdList[--this._objectPoolSize[characterId]];
								
							}
							
							child.frameObject = object;
							this._activeObjects[this._activeObjectsSize++] = child;
							displayObject = child.object;
							
						} else {
							
							// We have to create it
							displayObject = this._data.getDisplayObject(object.characterId, this, this._childrenLength); // TODO : currentIndex
							
							if (displayObject != null) {
								
								child = this._activeObjects[this._activeObjectsSize++] = new ChildObject(displayObject, object);
								
							}
							
						}
					}
					
					if (displayObject != null) {
						
						this.__placeObject (displayObject, object);
						
						if (childMask != null) {
							
							if (childMask.frameObject.clipDepth < object.depth) {
								
								childMask = null;
								
							} else if (displayObject._mask != childMask.object) {
								
								displayObject.__setMask(childMask.object);
								
							}
							
						} else if (displayObject._mask) {
							
							displayObject.__setMask(null);
							
						}
						
						if (object.clipDepth != 0) {
							
							childMask = child;
							displayObject.visible = false;
							
						}
						
						this.__addChildAt (displayObject, this._childrenLength); // TODO : currentIndex++
						
						// Calculate concatenated max total frames of all parents
						// TODO
						//_currentConcatenatedMaxTotalFrames = ???;
						
					}
					
				}
				
			}
		}
	}	
}