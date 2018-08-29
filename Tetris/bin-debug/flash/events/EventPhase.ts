/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	/**
	 * @author pkulikov
	 */
	export  class EventPhase
	{
		/**
		 * Фаза захвата, первая фаза потока событий.
		 */
		public static CAPTURING_PHASE : number = 1;
		
		/**
		 * Фаза назначения, вторая фаза потока событий.
		 */		
		public static AT_TARGET : number = 2;
			
		/**
		 * Фаза восходящей цепочки, третья фаза потока событий.
		 */
		public static BUBBLING_PHASE : number = 3;
		
		/**
		 * Constructor
		 */		
		constructor()
		{
			throw new Error('Abstract class error');
		}
	}	
}