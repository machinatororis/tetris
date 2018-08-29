/// <reference path="../../base.d.ts" />
/// <reference path="../display/DisplayObject.ts" />

namespace flash.geom
{
	export import DisplayObject = flash.display.DisplayObject;
	
	
	/**
	 * The Transform class provides access to color adjustment properties and two- or three-dimensional transformation objects 
	 * that can be applied to a display object.
	 * During the transformation, the color or the orientation and position of a display object is adjusted (offset) 
	 * from the current values or coordinates to new values or coordinates. 
	 * The Transform class also collects data about color and two-dimensional matrix transformations that are applied 
	 * to a display object and all of its parent objects. 
	 * You can access these combined transformations through the concatenatedColorTransform and concatenatedMatrix properties.
	 * To apply color transformations: create a ColorTransform object, set the color adjustments using the object's methods and properties, 
	 * and then assign the colorTransformation property of the transform property of the display object to the new ColorTransformation object.
	 * 
	 * To apply two-dimensional transformations: create a Matrix object, set the matrix's two-dimensional transformation, 
	 * and then assign the transform.matrix property of the display object to the new Matrix object.
	 * 
	 * To apply three-dimensional transformations: start with a three-dimensional display object. 
	 * A three-dimensional display object has a z property value other than zero. You do not need to create the Matrix3D object. 
	 * For all three-dimensional objects, a Matrix3D object is created automatically when you assign a z value to a display object. 
	 * You can access the display object's Matrix3D object through the display object's transform property. 
	 * Using the methods of the Matrix3D class, you can add to or modify the existing transformation settings. 
	 * Also, you can create a custom Matrix3D object, set the custom Matrix3D object's transformation elements, 
	 * and then assign the new Matrix3D object to the display object using the transform.matrix property.
	 * 
	 * To modify a perspective projection of the stage or root object: 
	 * use the transform.matrix property of the root display object to gain access to the PerspectiveProjection object. 
	 * Or, apply different perspective projection properties to a display object by setting the perspective projection properties 
	 * of the display object's parent. The child display object inherits the new properties. 
	 * Specifically, create a PerspectiveProjection object and set its properties, 
	 * then assign the PerspectiveProjection object to the perspectiveProjection property of the parent display object's transform property. 
	 * The specified projection transformation then applies to all the display object's three-dimensional children.
	 * 
	 * Since both PerspectiveProjection and Matrix3D objects perform perspective transformations, 
	 * do not assign both to a display object at the same time. 
	 * Use the PerspectiveProjection object for focal length and projection center changes. 
	 * For more control over the perspective transformation, create a perspective projection Matrix3D object.
	 * @author pkulikov
	 * 
	 */	
	export  class Transform
	{
		/*[internal]*/ private _matrix : Matrix;
		/*[internal]*/ private _matrixTmp : Matrix; // flash.__native.format.swf.instance.MovieClip
		/*[internal]*/ private _colorTransform : ColorTransform;
		/*[internal]*/ private _concatenatedColorTransform : ColorTransform;
		/*[internal]*/ private _displayObject : DisplayObject;
		/*[internal]*/ private _hasMatrix : boolean;
		
		/**
		 * Constructor
		 * @param displayObject
		 * 
		 */		
		constructor (displayObject : DisplayObject)
		{
			/**/ displayObject = strict(displayObject, DisplayObject);
			this._matrix = new Matrix;
			this._colorTransform = new ColorTransform;
			this._displayObject = displayObject;
			this._hasMatrix = true;
		}
		
		/**
		 * A Matrix object containing values that alter the scaling, rotation, and translation of the display object. 
		 * @return 
		 * 
		 */		
		public get matrix () : Matrix
		{
			if (this._hasMatrix) {
				
				return this._matrix.clone();
				
			}
			
			return null;
		}
		
		public set matrix (value : Matrix)
		{
			/**/ value = strict(value, Matrix);
			if (value == null) {
				
				this._hasMatrix = false;
				return null;
				
			}
			
			var e = this._matrix.__equals(value, false);
			this._matrix.__copyFrom(value);
			this._hasMatrix = true;
			
			if (this._displayObject) {
				
				this._displayObject.__setDirty(e ? 1 : 2);
				
			}
		}
		
		/**
		 * A ColorTransform object containing values that universally adjust the colors in the display object. 
		 * @return 
		 * 
		 */		
		public get colorTransform () : ColorTransform { return this._colorTransform; }
		public set colorTransform (v : ColorTransform) { /**/ v = strict(v, ColorTransform); this._colorTransform = v; }
		
		/**
		 * A Matrix object representing the combined transformation matrixes of the display object and all of its parent objects, 
		 * back to the root level. 
		 * @return 
		 * 
		 */		
		public get concatenatedMatrix () : Matrix
		{
			if (this._hasMatrix) {
			
				return this._displayObject.__getWorldTransform().clone ();
			
			}
			
			return null;
		}
		
		/**
		 * A ColorTransform object representing the combined color transformations applied to the display object and all of its parent objects, 
		 * back to the root level. 
		 * @return 
		 * 
		 */		
		public get concatenatedColorTransform () : ColorTransform
		{
			if (!this._concatenatedColorTransform) {
				
				this._concatenatedColorTransform = new ColorTransform;
				
			}
			
			this._concatenatedColorTransform.alphaOffset = this._colorTransform.alphaOffset;
			this._concatenatedColorTransform.alphaMultiplier = this._colorTransform.alphaMultiplier;
			this._concatenatedColorTransform.redOffset = this._colorTransform.redOffset;
			this._concatenatedColorTransform.redMultiplier = this._colorTransform.redMultiplier;
			this._concatenatedColorTransform.greenOffset = this._colorTransform.greenOffset;
			this._concatenatedColorTransform.greenMultiplier = this._colorTransform.greenMultiplier;
			this._concatenatedColorTransform.blueOffset = this._colorTransform.blueOffset;
			this._concatenatedColorTransform.blueMultiplier = this._colorTransform.blueMultiplier;
			
			var parent = this._displayObject._renderParent || this._displayObject._parent;
			if (parent) {
				
				this._concatenatedColorTransform.concat(parent.transform.concatenatedColorTransform);
				
			}
			
			return this._concatenatedColorTransform;
		}
		
		/**
		 * A Rectangle object that defines the bounding rectangle of the display object on the stage. 
		 * @return 
		 * 
		 */		
		public get pixelBounds () : Rectangle
		{
			if (!this._displayObject) {
				
				return null;
				
			}
			
			return this._displayObject.getBounds(this._displayObject._stage);
		}
		
		/**
		 * Provides access to the Matrix3D object of a three-dimensional display object. 
		 * @return 
		 * 
		 */		
		public get matrix3D () : Matrix3D  { return null; }
		public set matrix3D (value : Matrix3D)  {/**/ value = strict(value, Matrix3D);/**/ }
		
		/**
		 * Returns a Matrix3D object, which can transform the space of a specified display object in relation 
		 * to the current display object's space. 
		 * @param param1
		 * @return 
		 * 
		 */		
		public getRelativeMatrix3D (value : DisplayObject) : Matrix3D  { /**/ value = strict(value, DisplayObject); return null; }
		
		/**
		 * Provides access to the PerspectiveProjection object of a three-dimensional display object. 
		 * @return 
		 * 
		 */		
		public get perspectiveProjection ():PerspectiveProjection  { return null; }
		public set perspectiveProjection (value : PerspectiveProjection)  {/**/ value = strict(value, PerspectiveProjection);/**/ }
	}

}