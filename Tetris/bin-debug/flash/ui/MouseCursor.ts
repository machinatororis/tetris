/// <reference path="../../base.d.ts" />
/// <reference path="../system/Capabilities.ts" />

namespace flash.ui
{
	export import Capabilities = flash.system.Capabilities;
	

	/**
	 * The MouseCursor class is an enumeration of constant values used in setting the cursor property of the Mouse class. 
	 * @author pkulikov
	 * 
	 */	
	export  class MouseCursor
	{
		/** Used to specify that the cursor should be selected automatically based on the object under the mouse. */
		public static AUTO:string = "auto";
		
		/** Used to specify that the arrow cursor should be used. */
		public static ARROW:string = "arrow";
		
		/** Used to specify that the button pressing hand cursor should be used. */
		public static BUTTON:string = "button";
		
		/** Used to specify that the dragging hand cursor should be used. */
		public static HAND:string = "hand";
		
		/** Used to specify that the I-beam cursor should be used. */
		public static IBEAM:string = "ibeam";
		
		/**
		 * Is valid value  
		 * @return 
		 * 
		 */		
		public static isValid (name:string):boolean
		{
			/**/ name = as(name, 'String');
			return name == MouseCursor.AUTO || 
				name == MouseCursor.ARROW || 
				name == MouseCursor.BUTTON || 
				name == MouseCursor.HAND || 
				name == MouseCursor.IBEAM;
		}
		
		/**
		 * Convert flash type to css 
		 * @param name
		 * @return 
		 * 
		 */		
		public static toCSS (name:string):string
		{
			/**/ name = as(name, 'String');
			switch (name) {
				case MouseCursor.ARROW: return 'default';
				case MouseCursor.BUTTON: return 'pointer';
				case MouseCursor.HAND:
					return Capabilities.browser == 'Firefox' ? 'grab' : 'pointer'; // Browser compatibility
				case MouseCursor.IBEAM: return 'text';
			}
			return name;
		}
	}
}