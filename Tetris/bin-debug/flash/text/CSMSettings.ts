/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * The CSMSettings class contains properties for use with the TextRenderer.setAdvancedAntiAliasingTable() 
	 * method to provide continuous stroke modulation (CSM). CSM is the continuous modulation of both stroke weight and edge sharpness.
	 * @author pkulikov
	 * 
	 */	
	export  class CSMSettings
	{
		/**
		 * The size, in pixels, for which the settings apply. 
		 */		
		public fontSize:number = NaN;
		
		/**
		 * The inside cutoff value, above which densities are set to a maximum density value (such as 255). 
		 */		
		public insideCutoff:number = NaN;
		
		/**
		 * The outside cutoff value, below which densities are set to zero. 
		 */		
		public outsideCutoff:number = NaN;
		
		/**
		 * Creates a new CSMSettings object which stores stroke values for custom anti-aliasing settings. 
		 * @param fontSize
		 * @param insideCutoff
		 * @param outsideCutoff
		 * 
		 */		
		constructor(fontSize:number, insideCutoff:number, outsideCutoff:number)
		{
			/**/ fontSize = (+(fontSize)); insideCutoff = (+(insideCutoff)); outsideCutoff = (+(outsideCutoff));
			this.fontSize = fontSize;
			this.insideCutoff = insideCutoff;
			this.outsideCutoff = outsideCutoff;
		}
	}
}